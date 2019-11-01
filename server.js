const express = require("express");
const helmet = require('helmet');
const cors = require("cors");

const actionRouter = require("./data/helpers/actionRouter.js");
const projectRouter = require("./data/helpers/projectRouter.js");


const server = express();

server.use(helmet());
server.use(logger);
server.use(express.json());
server.use(cors());


server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);


server.get("/", (req, res) => {
    res.send(`
      HELLO THERE
    `);
  });


//custom middleware
function logger(req, res, next) {
    console.log(req.method, req.url, Date.now())
    next();
  }



  module.exports = server;

