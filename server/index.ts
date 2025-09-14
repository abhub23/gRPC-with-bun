// server.ts
import { Hono } from "hono";
import { cors } from "hono/cors";
import client from "./grpcClient";

const port = 4000;
const app = new Hono();

app.use("*", cors());

app.get("/", (c) => {
  return c.json({ message: "Server is alive" }, 200);
});

// gRPC route
app.get("/hello/:name", async (c) => {
  const name = c.req.param("name");

  return new Promise((resolve) => {
    client.SayHello({ name }, (err: any, response: any) => {
      if (err) {
        resolve(c.json({ error: err.message }, 500));
      } else {
        resolve(c.json({ message: response.message }, 200));
      }
    });
  });
});

Bun.serve({
  fetch: app.fetch,
  port,
});

console.log(`🚀 Hono server running at http://localhost:${port}`);
