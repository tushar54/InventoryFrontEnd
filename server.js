import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve Angular build files
app.use(express.static(path.join(__dirname, "dist/inventory-front-end")));

// Redirect all routes to index.html
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/inventory-front-end/index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Frontend server running on port ${PORT}`);
});
