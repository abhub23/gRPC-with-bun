import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

const PROTO_PATH = path.join(import.meta.dir, "../proto/hello.proto");

const packageDef = protoLoader.loadSync(PROTO_PATH, {});
const grpcObj = grpc.loadPackageDefinition(packageDef) as any;

const greeterService = grpcObj.hello.Greeter.service;

function sayHello(call: any, callback: any) {
  const name = call.request.name || "Anonymous";
  callback(null, { message: `Hello, ${name}!` });
}

const server = new grpc.Server();
server.addService(greeterService, { SayHello: sayHello });

server.bindAsync("0.0.0.0:50051", grpc.ServerCredentials.createInsecure(), () => {
  server.start();
  console.log("✅ gRPC server running at 0.0.0.0:50051");
});
