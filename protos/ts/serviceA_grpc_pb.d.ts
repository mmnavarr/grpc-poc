// package: protobuf
// file: serviceA.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as serviceA_pb from "./serviceA_pb";

interface IServiceAService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    sayHello: IServiceAService_ISayHello;
}

interface IServiceAService_ISayHello extends grpc.MethodDefinition<serviceA_pb.HelloRequest, serviceA_pb.HelloReply> {
    path: "/protobuf.ServiceA/SayHello";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<serviceA_pb.HelloRequest>;
    requestDeserialize: grpc.deserialize<serviceA_pb.HelloRequest>;
    responseSerialize: grpc.serialize<serviceA_pb.HelloReply>;
    responseDeserialize: grpc.deserialize<serviceA_pb.HelloReply>;
}

export const ServiceAService: IServiceAService;

export interface IServiceAServer {
    sayHello: grpc.handleUnaryCall<serviceA_pb.HelloRequest, serviceA_pb.HelloReply>;
}

export interface IServiceAClient {
    sayHello(request: serviceA_pb.HelloRequest, callback: (error: grpc.ServiceError | null, response: serviceA_pb.HelloReply) => void): grpc.ClientUnaryCall;
    sayHello(request: serviceA_pb.HelloRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: serviceA_pb.HelloReply) => void): grpc.ClientUnaryCall;
    sayHello(request: serviceA_pb.HelloRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: serviceA_pb.HelloReply) => void): grpc.ClientUnaryCall;
}

export class ServiceAClient extends grpc.Client implements IServiceAClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public sayHello(request: serviceA_pb.HelloRequest, callback: (error: grpc.ServiceError | null, response: serviceA_pb.HelloReply) => void): grpc.ClientUnaryCall;
    public sayHello(request: serviceA_pb.HelloRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: serviceA_pb.HelloReply) => void): grpc.ClientUnaryCall;
    public sayHello(request: serviceA_pb.HelloRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: serviceA_pb.HelloReply) => void): grpc.ClientUnaryCall;
}
