import jsonServer from "json-server";
import data from ".";

const server = jsonServer.create();
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const router = jsonServer.router(require("./index")());
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(3000, function () {
  console.log("JSON Server is running");
});
