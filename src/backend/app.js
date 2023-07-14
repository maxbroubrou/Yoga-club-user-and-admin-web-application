const express = require('express');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

const invoiceRoutes = require('./route/invoice');
const membershipRoutes = require('./route/membership');
const userRoutes = require('./route/user');
const db = require('./database_config');

const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('db valid'))
.catch(() => console.log('db invalid'))

const options = {
    definition: {
      openapi: "3.0.1",
      info: {
        title: "Yoga Club Express API with Swagger",
        version: "0.1.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
        contact: {
          name: "Maxime Broussart",
          email: "",
        },
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
    apis: ["./docs/*.js"],
  };
  
const specs = swaggerJsdoc(options);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/invoice', invoiceRoutes)
app.use('/membership', membershipRoutes);
app.use('/user', userRoutes);

module.exports = app;
