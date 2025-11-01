import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve static files from Angular dist folder
const distPath = path.join(__dirname, "dist/Inventory_FrontEnd");
app.use(express.static(distPath));

// Handle all other routes (MUST be '*' not '/*' in Express v5)
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Frontend server running on port ${PORT}`);
});
