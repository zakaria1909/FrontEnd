const app = express();
const PORT = 3000;
const hostname = "0.0.0.0";

// Set view engine EJS
app.set("view engine", "ejs");

// Folder public (buat CSS, JS, gambar, dll)
app.use(express.static(path.join(__dirname, "public")));

// Route utama
app.get("/", (req, res) => {
  res.render("index"); // render file views/index.ejs
});

// Jalankan server
// Jalankan server
app.listen(PORT, hostname, () => {
  console.log(`Server running on http://${hostname}:${PORT}`);
});
