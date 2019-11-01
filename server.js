const express = require("express");
const helmet = require('helmet');
const cors = require("cors");

// const router = require("./data/db-router.js");


const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());


server.use("/api/posts", router);


server.get("/", (req, res) => {
    res.send(`
      HELLO THERE
    `);
  });





  module.exports = app;

