import express from "express";
import redis from "redis";

const app = express();
app.use(express.json());

const client = redis.createClient({
    url : "redis://localhost:6379"
});
client.on("error", (err) => console.error("redis client error:", err));

app.post("/submission", async (req, res) => {
  const problemId = req.body.problemId;
  const code = req.body.code;
  const language = req.body.language;
  try {
    await client.lPush("submissions", JSON.stringify({ code, language, problemId }));
    res.json({
      message: "submission received",
    });
  } catch (err) {
    res.status(401).json({
      message: "error while submission",
      err,
    });
  }
});

async function main() {
  try {
    await client.connect();
    app.listen(3000);
  } catch (err) {
    console.error("Error while connecting:", err)
  }
}

main()
