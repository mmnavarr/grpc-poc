import { ServiceAClient } from "../protos/ts/serviceA_grpc_pb";
import { HelloReply, HelloRequest } from "../protos/ts/serviceA_pb";
import { ChannelCredentials, credentials } from "grpc";

// Has to match Service A's port
const PORT = 50051;
// FIXME: https://github.com/grpc/grpc/issues/10786
const creds = credentials.createInsecure() as ChannelCredentials;
console.log("🚀 ~ file: index.ts ~ line 8 ~ creds", creds);

// Define service A client connection
const serviceAClient = new ServiceAClient(`localhost:${PORT}`, creds);

const greet = (name: string = "world") => {
  return new Promise<HelloReply>((resolve, reject) => {
    const request = new HelloRequest();

    request.setName(name);

    serviceAClient.sayHello(request, (error, response) => {
      if (error) reject(error);

      resolve(response);
    });
  });
};

const main = async () => {
  const helloReply = await greet("world");
  console.log(`Greet response: ${helloReply}`);
};

main();
