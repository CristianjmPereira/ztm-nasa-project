const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieSession = require("cookie-session");
const api = require("./routes/api");
const { configuredPassport, authRouter } = require("./routes/auth/auth.router");

const app = express();

app.use(helmet());

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.COOKIE_KEY1, process.env.COOKIE_KEY2],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use(configuredPassport.initialize());
app.use(configuredPassport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(morgan("combined"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/auth", authRouter);
app.use("/v1", api);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
