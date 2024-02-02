const express = require("express");
const app = express();
const passport = require("passport");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

require("./util/passport_auth");

const authRoute = require("./routes/auth");
const private_ = require("./routes/private");

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(
  require("express-session")({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  }),
);
app.use(morgan("tiny"));
app.use(cookieParser(process.env.SECRET_KEY));
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/private", private_);

app.get("/", (req, res) => {
  res.status(200).json({ mes: "hello world", user: req.user });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
