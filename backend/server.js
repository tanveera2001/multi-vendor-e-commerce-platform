const express = require("express");

const app = express();
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { dbConnect } = require("./utils/db");
require("dotenv").config();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5000"],
    credentials: true,
  }),
);

app.use(bodyParser.json());
app.use(cookieParser());

// app.use("/api", require("./routes/chatRoutes"));

// app.use("/api", require("./routes/paymentRoutes"));
// app.use("/api", require("./routes/bannerRoutes"));
// app.use("/api", require("./routes/dashboard/dashboardIndexRoutes"));

// app.use("/api/home", require("./routes/home/homeRoutes"));
// app.use("/api", require("./routes/order/orderRoutes"));
app.use("/api", require("./routes/home/cardRoutes"));
// app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/home/customerAuthRoutes"));
// app.use("/api", require("./routes/dashboard/sellerRoutes"));
// app.use("/api", require("./routes/dashboard/categoryRoutes"));
// app.use("/api", require("./routes/dashboard/productRoutes"));
app.get("/", (req, res) => res.send("Hello World!"));

const port = process.env.PORT;
dbConnect();
app.listen(port, () => console.log(`Server is running on port ${port}!`));
