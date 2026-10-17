import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const pagePath = fileURLToPath(new URL("../app/index.html", import.meta.url));
const server = createServer(async (request, response) => {
  const pathname = new URL(request.url ?? "/", "http://127.0.0.1").pathname;
  if (pathname !== "/" && pathname !== "/index.html") {
    response.writeHead(404).end("Not found");
    return;
  }

  try {
    const page = await readFile(pagePath);
    response.writeHead(200, { "content-type": "text/html; charset=utf-8" }).end(page);
  } catch (error) {
    console.error("Unable to serve the demo page:", error);
    response.writeHead(500).end("Unable to serve demo");
  }
});

server.listen(4173, "127.0.0.1", () => {
  console.log("Demo app listening at http://127.0.0.1:4173");
});
