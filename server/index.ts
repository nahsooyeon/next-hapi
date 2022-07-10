import next from "next";
import Hapi from "@hapi/hapi";
import { nextHandlerWrapper } from "./next-wrapper";
import { helloRoutes, sendJson } from "./routes/hello";
import Hoek from "@hapi/hoek";

import CatboxRedis from "@hapi/catbox-redis";

const port = parseInt(process.env.PORT as string, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const server = new Hapi.Server({
  port,
  cache: [
    {
      name: "my_cache",
      provider: {
        constructor: CatboxRedis,
        options: {
          partition: "my_cached_data",
          host: "127.0.0.1",
          port: 6379,
          db: 0,
        },
      },
    },
  ],
});

const sessionOptions = {
  maxCookieSize: 0, // force server-side storage
  cache: {
    cache: "my_cache",
  },
  cookieOptions: {
    password: "abcdefghijklmnodfjlskafjlsdfjlslsfjldsf", // cookie password
    isSecure: false, // allow non HTTPS
  },
};

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
    await server.register({
      plugin: require("@hapi/yar"),
      options: sessionOptions,
    });
    await server.start();
    console.log(`> Ready on http://localhost:${port}`);
  } catch (error) {
    console.log("Error starting server");
    console.log(error);
  }
});
