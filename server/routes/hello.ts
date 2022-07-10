import {
  Request,
  ResponseToolkit,
  ResponseObject,
  ServerRoute,
} from "@hapi/hapi";

export const sendJson = async (request: Request, h: ResponseToolkit) => {
  var data = {
    key: "value",
    another: false,
    number: 10,
    func: function () {
      return this.number * 10;
    },
  };
  return data;
};

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
