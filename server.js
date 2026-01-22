import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());
app.use(express.static("public"));

const BIN_ID = "697133f6d0ea881f407b77ea";
const MASTER_KEY = "$2a$10$dOqsIjK0tpNJaWmhrWpgw.AshEhOSBv0IF8YFqmeXMMnzAMvv.Jou";

app.get("/reports", async (req, res) => {
  const r = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: { "X-Master-Key": MASTER_KEY }
  });
  const data = await r.json();
  res.json(data.record || {});
});

app.post("/reports", async (req, res) => {
  await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": MASTER_KEY
    },
    body: JSON.stringify(req.body)
  });
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("Server running → http://localhost:3000");
});
