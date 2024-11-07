const express = require("express");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const app = express();
const PORT = process.env.PORT || 3000;

const users = [
  { username: "testuser", password: "$2a$10$abc..." }, // hashed password
];

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up express session
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// Route to serve the login page
app.get("/login", (req, res) => {
  res.send(`
    <form method="POST" action="/login">
      <input type="text" name="username" placeholder="Username" required>
      <input type="password" name="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
  `);
});

// Handle login form submission
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  
  // Find the user by username
  const user = users.find((user) => user.username === username);
  
  if (!user) {
    return res.status(400).send("Invalid username or password");
  }

  // Compare the password
  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) {
      return res.status(400).send("Invalid username or password");
    }

    // Start a session and set session user
    req.session.user = user;
    res.redirect("/"); // Redirect to homepage or dashboard after successful login
  });
});

// Handle logout
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error logging out");
    }
    res.redirect("/"); // Redirect to home page after logging out
  });
});

// Middleware to check if the user is logged in
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  } else {
    res.redirect("/login"); // Redirect to login if not logged in
  }
}

// Protected route example (e.g., dashboard)
app.get("/dashboard", isAuthenticated, (req, res) => {
  res.send(`Welcome ${req.session.user.username}, <a href="/logout">Logout</a>`);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
