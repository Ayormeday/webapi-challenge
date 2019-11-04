const express = require("express");
const Actions = require("./actionModel.js");
const Projects = require("./projectModel.js");

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

router.post("/", validateProjectId, validateActionPost, (req, res) => {
  const { notes, description } = req.body;
  const newAction = {
    notes,
    description
  };
  Projects.insert(newAction)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      res.status(500).json({
        message: `There was an error creating this Action: ${error}`
      });
    });

  res.send(newAction);
});

router.delete('/:id',validateProjectId , validateActionId, (req, res, next) => {
    const { id } = req.params.id;
    Actions.remove(id).then(() => {
      res.status(200).json({message: "This Actions has been successfully deleted"});
    }).catch(next);
  });

router.put('/:id', validateProjectId, validateActionId, (req, res, next) => {
    const { title, description } = req.body;
    Actions.update(req.action.id, { title, description }).then(updated => {
      res.status(200).json({ ...req.action, title, description });
    }).catch(next);
  });


//   middleware

function validateProjectId(req, res, next) {
  const { id } = req.params;
  Projects.get(id)
    .then(project => {
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(400).json({ message: "invalid project id" });
      }
    })
    .catch(next);
}

function validateActionId(req, res, next) {
  const { id } = req.params;
  Actions.get(id)
    .then(action => {
      if (action) {
        req.action = action;
        next();
      } else {
        res.status(400).json({ message: "invalid action id" });
      }
    })
    .catch(next);
}

function validateActionPost(req, res, next) {
  if (Object.keys(req.body).length) {
    const { notes, description } = req.body;
    if (notes) {
      next();
    } else if (description) {
      next();
    } else {
      res.status(400).json({ message: "missing required action field" });
    }
  } else {
    res.status(400).json({ message: "missing actiom data" });
  }
}

router.use((error, req, res) => {
    res.status(500).json({
      file: 'projectRouter',
      method: req.method,
      url: req.url,
      message: error.message
    });
  });


module.exports = router;
