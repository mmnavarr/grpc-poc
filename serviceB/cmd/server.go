package main

import (
	"context"
	"io"
	"log"

	"google.golang.org/grpc"

	pb "grpc-poc/protos/golang/proto"
)

const (
	address = "localhost:50051"
)

// Service B (Client)
func main() {
	// Set up a connection to the server
	conn, err := grpc.Dial(address, grpc.WithInsecure(), grpc.WithBlock())
	if err != nil {
		log.Fatalf("gRPC connecgion failed: %v", err)
	}
	defer conn.Close()

	// Connect to service A client
	client := pb.NewServiceAClient(conn)

	// Unary calls
	unaryRes1, err := client.SayHello(context.Background(), &pb.SayHelloRequest{Name: "Satoshi"})
	if err != nil {
		log.Fatalf("Could call gRPC method greet: %v", err)
	}
	log.Printf("Greeting: %s", unaryRes1.GetMessage())
	unaryRes2, err := client.SayHello(context.Background(), &pb.SayHelloRequest{Name: "Vitalik"})
	if err != nil {
		log.Fatalf("Could call gRPC method greet: %v", err)
	}
	log.Printf("Greeting: %s", unaryRes2.GetMessage())

	// Streaming
	in := &pb.FetchNamesRequest{Id: 1}
	stream, err := client.FetchNames(context.Background(), in)
	if err != nil {
		log.Fatalf("Open FetchNames() stream error: %v", err)
	}

	done := make(chan bool)

	go func() {
		// Look through received streamed messages until io.EOF
		for {
			resp, err := stream.Recv()
			if err == io.EOF {
				done <- true // Means stream is finished
				return
			}
			if err != nil {
				log.Fatalf("Error receiving stream response: %v", err)
			}
			log.Printf("Stream response received: %s", resp.Result)
		}
	}()

	<-done // We will wait until all responses are received
	log.Printf("Service B finished")
}
