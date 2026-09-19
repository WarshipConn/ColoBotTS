import http from "node:http";

const port = Number(process.env.PORT) || 3000;

const server = http.createServer((req, res) => {
  const path = req.url?.split("?")[0] ?? "/";

  if (req.method === "GET" && (path === "/" || path === "/health")) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Listening on ${port}`);
});
