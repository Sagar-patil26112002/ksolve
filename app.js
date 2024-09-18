if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

const express = require("express");
const router = express.Router({mergeParams: true});
const app = express();
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const path = require("path");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const passport = require("passport");
const passportConfig = require('./config/passportConfig');
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const MongoStore = require("connect-mongo");
const loginAndRegister = require("./routes/loginAndRegister.js");
const CloudRouter = require('./routes/cloudManage.js');
const instructorRouter = require('./routes/instructor.js');
const classRoutes = require('./routes/classRoute.js'); 
const lectureRoute = require('./routes/lectureRouter.js');  
const Instructor = require("./models/instructor.js");
const Student = require("./models/user.js");
const multer = require('multer');
const dbUrl = process.env.ATLASDB_URL;
//const geoApi = process.env.GEO_API;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views/"));
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// MongoDB Connection
main().then(() => console.log("Connection successful")).catch(console.error);

async function main() {
    await mongoose.connect(dbUrl);
}

const Store = MongoStore.create({
    mongoUrl: dbUrl,  // Ensure dbUrl is loaded and correct
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600, // 1 day
});


Store.on("error", (error) => {
    console.log("ERROR in MONGO SESSION STORE", error); // Fixed the error object
});

// Session Configuration
const sessionOptions = {
    store: Store,  // Note the lowercase `store`
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
        httpOnly: true
    }
};
app.use(session(sessionOptions));

// Flash Messages
app.use(flash());

// Passport Configuration
app.use(passport.initialize());
app.use(passport.session());

// Global Middleware for Flash Messages and User Data
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user; // Set currUser to the logged-in user
    next();
});

app.use("/", loginAndRegister);
app.use("/upload", CloudRouter);
app.use("/instructor", instructorRouter);
app.use('/classes', classRoutes);
app.use('/lectures', lectureRoute);

app.get("/", (req, res)=>{
    res.render("demo/empty.ejs");
})

// Start Server
app.listen(3030, () => {
    console.log("Listening on port 3030");
});
