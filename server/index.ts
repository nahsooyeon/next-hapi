import next from "next";
import Hapi from "@hapi/hapi";
import { nextHandlerWrapper } from "./next-wrapper";

const port = parseInt(process.env.PORT as string, 10) || 4000;
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

  server.route({
    method: "*",
    path: "/{p*}" /* catch all route */,
    handler: nextHandlerWrapper(app),
  });

  try {
    await server.start();
    console.log(`> Ready on http://localhost:${port}`);
  } catch (error) {
    console.log("Error starting server");
    console.log(error);
  }
});
