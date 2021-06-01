package main

import (
	"context"
	"fmt"
	"log"
	"net"
	"sync"
	"time"

	"google.golang.org/grpc"

	pb "grpc-poc/protos/golang/proto"
)

const (
	port = ":50051"
)

// Server is used to implement serviceA.GreeterServer.
type Server struct {
	pb.UnimplementedServiceAServer
}

// SayHello implements serviceA.GreeterServer
func (s *Server) SayHello(ctx context.Context, req *pb.SayHelloRequest) (*pb.SayHelloResponse, error) {
	log.Printf("Received: %v", req.GetName())
	return &pb.SayHelloResponse{Message: "Hello " + req.GetName()}, nil
}

func (s *Server) FetchNames(in *pb.FetchNamesRequest, srv pb.ServiceA_FetchNamesServer) error {
	log.Printf("Fetching request for id: %d", in.Id)

	names := [5]string{"John", "Kevin", "Darrell", "Larry", "Tony"}

	// Use wait group to allow process to be concurrent
	var wg sync.WaitGroup
	for i := 0; i < len(names); i++ {
		wg.Add(1)
		go func(responseNo int64) {
			defer wg.Done()

			// Time sleep to simulate server process time
			time.Sleep(time.Duration(responseNo) * time.Second)
			response := pb.FetchNamesResponse{Result: fmt.Sprintf("%v sending hello on response number: %d", names[responseNo], responseNo)}
			if err := srv.Send(&response); err != nil {
				log.Printf("Send response error: %v", err)
			}
		}(int64(i))
	}

	wg.Wait()
	log.Println("Stream finished")
	return nil
}

func main() {
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}

	// Instantiate grpc server and register for method impls
	s := grpc.NewServer()
	pb.RegisterServiceAServer(s, &Server{})

	log.Printf("Starting Service A gRPC Server on port%v", port)
	if err := s.Serve(lis); err != nil {
		log.Fatalf("Failed to serve: %v", err)
	}
}
