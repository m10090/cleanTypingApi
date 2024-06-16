const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("./util/db");
const morgan = require("morgan");
const passport = require("passport");

require("./util/passport_auth");

const authRoute = require("./routes/auth");
const _private = require("./routes/private");

const corsOptions = {
  origin: process.env.FRONTEND_URL.slice(0, -1),
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
      ttl: 60 * 60 * 24 * 7,
    }),
  }),
);

app.use(morgan("tiny"));
app.use(cookieParser(process.env.SECRET_KEY));
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/private", _private);

app.get("/", (req, res) => {
  console.log("I am working ");
  res.status(200).json({ mes: "hello world", user: req.user });
});

app.listen(process.env.PORT ?? 3000, () => {
  console.log("listening on port 3000");
});
