# Golang gRPC Proof of Concept

- Unary-unary server-client req/res
- Unary-streams server-side streaming of names
  - Server receives request number and sends client back names in memory
- Both client and server handle context errors (try to close client during send)

## Requirements

- go 1.14
- protobuf installed
- go support for protobuf installed

## Installation

### MacOS

```bash
brew install go
brew install protobuf
go get -u github.com/golang/protobuf/protoc-gen-go
```

Make sure `protoc-gen-go` added in PATH

## Generate Golang protobuf definitions

In the `protos/`s directory, run:

```bash
make gen_golang
```

This should create the definitions in the `golang/proto/` dir

## Use

#### Start the Server (Service A)

In the `serviceA/` directory, run:

```bash
go run cmd/server.go
```

#### Start the Client (Service B) in another terminal

In the `serviceB/` directory, run:

```bash
go run cmd/server.go
```

Sever output:

```bash
❯ go run cmd/server.go
2021/05/31 21:46:14 Starting Service A gRPC Server on port:50051
2021/05/31 21:46:18 Received: Satoshi
2021/05/31 21:46:18 Received: Vitalik
2021/05/31 21:46:18 Fetching request for id: 1
2021/05/31 21:46:22 Stream finished
```

Client output:

```bash
❯ go run cmd/server.go
2021/05/31 21:46:18 Greeting: Hello Satoshi
2021/05/31 21:46:18 Greeting: Hello Vitalik
2021/05/31 21:46:18 Stream response received: John sending hello on response number: 0
2021/05/31 21:46:19 Stream response received: Kevin sending hello on response number: 1
2021/05/31 21:46:20 Stream response received: Darrell sending hello on response number: 2
2021/05/31 21:46:21 Stream response received: Larry sending hello on response number: 3
2021/05/31 21:46:22 Stream response received: Tony sending hello on response number: 4
2021/05/31 21:46:22 Service B finished
```

## TODO

1. Generate golang protobuf defs straight in `golang/` without being nested into `/proto`
2. Resolve credentials error in TS service trying to connect to Service A
3. Add Mutual TLS to secure gRPC connections
