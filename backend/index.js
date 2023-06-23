const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 3031;
//mongodb
console.log(process.env.MONGODB_URL);
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("connect to Database"))
  .catch(() => console.log(err));
//Schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
  image: String,
});
//
const userModel = mongoose.model("user", userSchema);
//api
app.get("/", (req, res) => {
  res.send("Server is running");
});
//api signup
app.post("/signup", async (req, res) => {
  console.log(req.body);
  const { email } = req.body;

  userModel
    .findOne({ email: email })
    .then((result) => {
      console.log(result);
      if (result) {
        res.send({ message: "Email id is already registered", alert: fasle });
      } else {
        const data = new userModel(req.body);
        return data.save();
      }
    })
    .then(() => {
      res.send({ message: "Registration is successful", alert: true });
    })
    .catch((error) => {
      console.error(error);
      console.log({ message: "err" });
    });
});
// api login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  userModel
    .findOne({ email: email })
    .then((result) => {
      if (result) {
        // Kiểm tra mật khẩu
        if (result.password === password) {
          const dataSend = {
            _id: result._id,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            image: result.image,
          };
          res.send({
            message: "Login is successful",
            alert: true,
            data: dataSend,
          });
        } else {
          // Xử lý khi mật khẩu sai
          res.send({
            message: "Login failed. Incorrect email or password.",
            alert: false,
          });
        }
      } else {
        // Xử lý khi không tìm thấy email
        res.send({
          message: "Email is not available, please sign up",
          alert: false,
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res.send({
        message: "Login failed. An error occurred.",
        alert: false,
      });
    });
});
const schemaProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});
const productModel = mongoose.model("product", schemaProduct);

//save product in data
//api
app.post("/uploadProduct", async (req, res) => {
  // console.log(req.body)
  const data = await productModel(req.body);
  const datasave = await data.save();
  res.send({ message: "Upload successfully" });
});

//
app.get("/product", async (req, res) => {
  const data = await productModel.find({});
  res.send(JSON.stringify(data));
});
app.listen(PORT, () => console.log("Server is running at port :" + PORT));
