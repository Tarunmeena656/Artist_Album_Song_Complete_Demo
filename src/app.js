require("dotenv").config();
const express = require("express");
const createError = require("http-errors");
const connectDatabase = require("./database/conn");
const indexRouter = require("./routes/indexRouter");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");
const app = express();
const port = parseInt(process.env.PORT || 8000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routing

app.use(indexRouter);

app.use("/Demo", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

//default routing
app.use((req, res) => {
  res.status(404).json("This Page is Not Found");
});

//error handling
app.use((err, req, res, next) => {
  const { status = 500, message = "Oops ! Something went wrong" } = err;
  res.status(status).send(message);
});

//connection
connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running and up at port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
