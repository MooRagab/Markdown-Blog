import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, "./config/.env") });
import express from "express";
import articleRouter from "./routes/articles.js";
import methodOverride from "method-override";
import { articleModel } from "./DB/models/article.js";
import connectDB from "./DB/connection.js";
const app = express();
const port = 5000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const articles = await articleModel.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articleRouter);
connectDB();
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
