import express from "express";

const app = express();
const port = Number(process.env.PORT) || 3000;

// Optional: parse JSON request bodies (useful once you add POST/PUT routes)
app.use(express.json());

app.get(["/", "/health"], (_req, res) => {
  res.json({ ok: true });
});

app.get("/hello", (_req, res) => {
  res.json({ field1: "hello test", field2: "yeah" });
});

// Catch-all for unmatched routes (Express 5: use middleware, not app.all("*"))
app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Listening on ${port}`);
});
