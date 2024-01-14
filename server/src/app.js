const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieSession = require("cookie-session");
const api = require("./routes/api");
const { configuredPassport, authRouter } = require("./routes/auth/auth.router");
const startApolloServer = require("./routes/graphql/graphql.router");

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [
          "'self'",
          "apollo-server-landing-page.cdn.apollographql.com",
        ],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          "unpkg.com",
          "cdn.jsdelivr.net",
          "apollo-server-landing-page.cdn.apollographql.com",
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "unpkg.com",
          "cdn.jsdelivr.net",
          "fonts.googleapis.com",
        ],
        imgSrc: [
          "'self'",
          "data:",
          "unpkg.com",
          "cdn.jsdelivr.net",
          "apollo-server-landing-page.cdn.apollographql.com",
        ],
        connectSrc: ["'self'", "http://localhost:8000/graphql"],
        fontSrc: [
          "'self'",
          "unpkg.com",
          "cdn.jsdelivr.net",
          "fonts.googleapis.com",
          "fonts.gstatic.com",
        ],
        objectSrc: ["'none'"],
        manifestSrc: [
          "'self'",
          "apollo-server-landing-page.cdn.apollographql.com",
        ],
        upgradeInsecureRequests: [],
      },
    },
  })
);

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
    origin: ["http://localhost:3000", "https://studio.apollographql.com"],
  })
);

app.use(morgan("combined"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/auth", authRouter);
app.use("/v1", api);

startApolloServer().then((server) => {
  server.applyMiddleware({ app, path: "/graphql" });

  // This should be placed here because it will catch all requests that are not including the apollo server paths
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
  });
});

module.exports = app;
