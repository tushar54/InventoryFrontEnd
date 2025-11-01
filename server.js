import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Correct path to Angular build
const distPath = path.join(__dirname, "dist/inventory_FrontEnd");

// Serve static files
app.use(express.static(distPath));

// Catch all routes
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Frontend server running on port ${PORT}`);
});
