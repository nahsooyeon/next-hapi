import {
  Request,
  ResponseToolkit,
  ResponseObject,
  ServerRoute,
} from "@hapi/hapi";

const sayHello = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
  const name: string = request.params.name || "World";
  const data = {
    value: `Hello ${name}`,
  };
  const response = h.response("Hello " + name);
  response.header("X-Custom", "some-value");
  return response;
};

export const helloRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/hello",
    handler: sayHello,
  },
  {
    method: "GET",
    path: "/hello/{name}",
    handler: sayHello,
  },
];
