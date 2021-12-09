var Post = require("../models/Post");

;
var express = require('express');





//save posts
exports.createNewPost = (req, res) => {

    if (req.user){

        var thisauthor= req.user.username

        var opt = {
            title: req.body.title,
            subtitle: req.body.subtitle,
            content: req.body.content,
            prevImage:req.body.prevImage,
            posttags:req.body.posttags,
            author:req.user.usernam,
            state:"true"
          }
        let newPost = new Post(opt);
           
        newPost.save((error, post) => {
            if(error){
                res.status(500).send(err);
                // res.redirect('/write');
            }
            res.status(200).send(post);
            console.log(post)
            // res.redirect('/admin')
            
        });

    }



    
}


//Save drafts
exports.createNewDraft = (req, res) => {

    if(req.user){

        var thisauthor= req.user.username


        var opt = {
            title: req.body.title,
            subtitle: req.body.subtitle,
            content: req.body.content,
            prevImage:req.body.prevImage,
            posttags:req.body.posttags,
            author:thisauthor,
            state:"false"
          }
        let newDraft = new Post(opt);
           
        newDraft.save((error, draft) => {
            if(error){
                res.status(500).send(err);
                // res.redirect('/write');
            }
            res.status(200).send(draft);
            console.log(draft)
            // res.redirect('/admin')
            
        });

    }
       
    
}

//from  Database
exports.findAllDrafts =(req,res)=>{
  

    

        Post.find({state:"false"})
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving Posts."
        });
      });

    
    
    

}

// Find all published Posts
exports.findAllPublished = (req, res) => {
    
    Post.find({state:"true"})
    .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Posts."
        });
      });
  
};




//with id
exports.findOnePost = (req,res)=>{

    const id = req.params.id;

    Post.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Blog with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Blog with id=" + id });
      });

}

// Update by the id in the request
exports.updatePost = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Post.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
        if (!data) {
            res.status(404).send({
            message: `Cannot update Post with id=${id}. Maybe Post was not found!`
            });
        } else res.send({ message: "Post was updated successfully." });
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating Post with id=" + id
        });
        });


};


// Delete with the specified id in the request
exports.deletePost = (req, res) => {

    const id = req.params.id;

    Post.findByIdAndRemove(id)
    .then(data => {
      if (!dataTutorial) {
        res.status(404).send({
          message: `Cannot delete with id=${id}. Maybe Post was not found!`
        });
      } else {
        res.send({
          message: "Post was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Post with id=" + id
      });
    });
  
};





