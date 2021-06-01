// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var serviceA_pb = require('./serviceA_pb.js');

function serialize_protobuf_HelloReply(arg) {
  if (!(arg instanceof serviceA_pb.HelloReply)) {
    throw new Error('Expected argument of type protobuf.HelloReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_protobuf_HelloReply(buffer_arg) {
  return serviceA_pb.HelloReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_protobuf_HelloRequest(arg) {
  if (!(arg instanceof serviceA_pb.HelloRequest)) {
    throw new Error('Expected argument of type protobuf.HelloRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_protobuf_HelloRequest(buffer_arg) {
  return serviceA_pb.HelloRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// The greeting service definition.
var ServiceAService = exports.ServiceAService = {
  // Sends a greeting
sayHello: {
    path: '/protobuf.ServiceA/SayHello',
    requestStream: false,
    responseStream: false,
    requestType: serviceA_pb.HelloRequest,
    responseType: serviceA_pb.HelloReply,
    requestSerialize: serialize_protobuf_HelloRequest,
    requestDeserialize: deserialize_protobuf_HelloRequest,
    responseSerialize: serialize_protobuf_HelloReply,
    responseDeserialize: deserialize_protobuf_HelloReply,
  },
};

exports.ServiceAClient = grpc.makeGenericClientConstructor(ServiceAService);
