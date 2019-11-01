const express = require('express');
const Projects = require('./projectRouter.js');



const router = express.Router();

router.get('/', (req, res, next) => {
    Projects.get().then(project => {
      res.status(200).json(project)
    }).catch(next);
  });


module.exports = router;