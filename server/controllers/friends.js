console.log('friends controller');
// WE NEED TO ADD A FEW lines of code here!
// How does a controller talk to mongoose and get a model?
// Build out the methods in the friendsControllers below
var mongoose = require('mongoose');
var User = mongoose.model('User');

function UsersController(){
  this.index = function(req,res){
    //your code here
    User.find({},function(err,results){
      res.json(results);
    })
    // res.json({placeholder:'index'});
  };
  this.create = function(req,res){
    console.log(req.body);
    User.create(req.body, function(err,result){
      if(err){
        console.log(err)
      }else{
        res.json(result)
      }
    })
    // res.json({placeholder:'create'});
  };
  this.update = function(req,res){
    console.log('req.body', req.body);
    //your code here
    Friend.findOne({_id:req.params.id},function(err,friend){
      if(err){
        console.log(err)
      }else{
        Question.firstName = req.body.firstName;
        Question.lastName = req.body.lastName;
        Question.birthday = req.body.birthday;
        Question.save(function(err,updatedFriend){
          if(err){
            console.log(err);
          }else{
            res.json(updatedFriend);
          }
        })
      }
    })
    // res.json({placeholder:'update'});
  };
  // this.delete = function(req,res){
  //   //your code here
  //   Friend.remove({_id:req.params.id}, function(err){
  //     if(err){
  //       console.log(err);
  //     }else{
  //       res.json({message:"Friend deleted"});
  //     }
  //   })
  //
  // };
  this.delete = function(req, res) {
    console.log(req.params.id);
        Question.remove({_id: req.params.id}, function(err){
            if(err){console.log(err);}
            res.json();
        });
    };
  this.show = function(req,res){
    //your code here
    Question.findOne({_id:req.params.id}, function(err,result){
      res.json(result);
    })

  };
}
module.exports = new UsersController(); // what does this export?
