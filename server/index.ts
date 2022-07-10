import next from "next";
import Hapi from "@hapi/hapi";
import { nextHandlerWrapper } from "./next-wrapper";
import { helloRoutes, sendJson } from "./routes/hello";

const port = parseInt(process.env.PORT as string, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const server = new Hapi.Server({
  port,
});

app.prepare().then(async () => {
  server.route({
    method: "GET",
    path: "/_next/{p*}" /* next specific routes */,
    handler: nextHandlerWrapper(app),
  });

  server.route(helloRoutes);

  server.route({
    method: "*",
    path: "/{p*}" /* catch all route */,
    handler: nextHandlerWrapper(app),
  });

  server.route({
    method: "GET",
    path: "/sendjson",
    handler: sendJson,
  });

  server.route({
    method: "GET",
    path: "/sample",
    handler: (request, h) => {
      return { value: "Hello World ! sample" };
    },
  });

  try {
    await server.start();
    console.log(`> Ready on http://localhost:${port}`);
  } catch (error) {
    console.log("Error starting server");
    console.log(error);
  }
});
