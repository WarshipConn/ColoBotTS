import express from "express";
import type { Request, Response } from "express";
import { get } from "http";

const app = express();
const port = Number(process.env.PORT) || 3000;

// Optional: parse JSON request bodies (useful once you add POST/PUT routes)
app.use(express.json());

const UNIVERSE_ID = process.env.UNIVERSE_ID;

app.get("/FWstatus", async (_req :Request, res: Response) => {
  try {
    const params = new URLSearchParams(
      {
      "datastoreName": "SycoraxWarStatus",
      "entryKey": "1"
      }
    )

    const rblxResponse = await fetch(`https://apis.roblox.com/datastores/v1/universes/${UNIVERSE_ID}/standard-datastores/datastore/entries/entry?${params}`,
      {
        method: "GET",
        headers: {
          "x-api-key": process.env.RBLX_API_KEY
        },
      }
    );

    res.json(await rblxResponse.json());
  }
  catch (error) {
    console.error('Failed to fetch external data:', error);
    res.status(500).json({ error: "Roblox API call failed" });
  }
})

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
