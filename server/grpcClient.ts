// grpcClient.ts
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "node:path";

const PROTO_PATH = path.join(__dirname, "../proto/hello.proto");

// Load proto definition
const packageDef = protoLoader.loadSync(PROTO_PATH, {
	keepCase: true,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: true,
});

const grpcObj = grpc.loadPackageDefinition(packageDef) as any;
const client = new grpcObj.hello.Greeter(
	"localhost:50051", // gRPC server address
	grpc.credentials.createInsecure(),
);

export default client;
