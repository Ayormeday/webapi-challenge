const express = require('express');
const Actions = require('./actionModel.js');



const router = express.Router();

router.get("/", (req, res) => {
    Actions.get()
      .then(action => {
        res.status(200).json(action);
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: "Error retrieving the actions"
        });
      });
  });





module.exports = router;