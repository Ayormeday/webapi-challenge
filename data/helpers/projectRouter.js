const express = require('express');
const Projects = require('./projectModel.js');



const router = express.Router();

router.get('/', (req, res, next) => {
    Projects.get()
    .then(actions => {
        res.send(actions);
    })
    .catch(next);
 });

 router.get('/:id', validateProjectId, (req, res) => {
     res.status(200).json(req.project)
 })

 router.post('/', validateProjectPost, (req, res) => {
    const { name, description } = req.body;
    const newPost = {
        name, description
    }
    Projects.insert(newPost)
    .then(post => {
        res.status(201).json(post)
    })
    .catch(error => {
        res.status(500).json({
            message: `There was an error creating this project post: ${error}`
        })
    })

    res.send(newPost);
})



router.delete('/:id',validateProjectId , (req, res, next) => {
    const { id } = req.params.id;
    Projects.remove(id).then(() => {
      res.status(200).json({message: "This user has been successfully deleted"});
    }).catch(next);
  });

  router.put('/:id', validateProjectId, (req, res, next) => {
    const { name, description } = req.body;
    Projects.update(req.project.id, { name, description }).then(updated => {
      res.status(200).json({ ...req.project, name, description });
    }).catch(next);
  });
  

 // custom middleware

function validateProjectId(req, res, next) {
    const { id } = req.params;
    Projects.get(id).then(project => {
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(400).json({ message: "invalid project id" });
      }
    }).catch(next);
  }



function validateProjectPost(req, res, next) {
    if (Object.keys(req.body).length) {
      const { name, description } = req.body;
      if (name) {
        next();
      } else if (description) {
          next();
      }
      else {
        res.status(400).json({ message: "missing required field" });
      }
    } else {
      res.status(400).json({ message: "missing project data" });
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