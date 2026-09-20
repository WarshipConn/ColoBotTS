import http from "node:http";

const port = Number(process.env.PORT) || 3000;

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  console.log(req.url);

  const path = req.url?.split("?")[0] ?? "/";

  console.log(path);
  
  if (req.method === "GET" && (path === "/" || path === "/health")) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true }));
    return;
  }
  else if (req.method === "GET" && (path === "/hello")) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ field1: "hello test", field2: "yeah"}));
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Listening on ${port}`);
});
