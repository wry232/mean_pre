console.log('friends controller');
// WE NEED TO ADD A FEW lines of code here!
// How does a controller talk to mongoose and get a model?
// Build out the methods in the friendsControllers below
var mongoose = require('mongoose');
var Answer = mongoose.model('Answer');
var Question = mongoose.model('Question');


function AnswersController(){
//   this.index = function(req,res){
//     //your code here
//     Answer.find({}, false, true).populate('answers').exec(function(err, questions){
//     console.log(questions);
// 	      res.json(questions);
// 	});
// };
  this.create = function(req,res){
    console.log("inside answer create");
    console.log(req.body);
    console.log(req.params.id);
    Question.findOne({_id:req.params.id},function(err,question){
      var answer = new Answer({user:req.body.user, text:req.body.text});
      answer._question = question._id;
      question.answers.push(answer);
      answer.save(function(err){
        question.save(function(err){
          if(err){
            console.log("err in answer create:",err);
          }else{
            console.log("successfully added the answer!!!")
            res.json(question);
          }
        })
      })


    })

    //   Answer.create(req.body, function(err,result){
    //   if(err){
    //     console.log(err)
    //   }else{
    //     res.json(result)
    //   }
    // })
    // res.json({placeholder:'create'});
  };
  // this.update = function(req,res){
  //   console.log('req.body', req.body);
  //   //your code here
  //   Question.findOne({_id:req.params.id},function(err,friend){
  //     if(err){
  //       console.log(err)
  //     }else{
  //       Question.firstName = req.body.firstName;
  //       Question.lastName = req.body.lastName;
  //       Question.birthday = req.body.birthday;
  //       Question.save(function(err,updatedFriend){
  //         if(err){
  //           console.log(err);
  //         }else{
  //           res.json(updatedFriend);
  //         }
  //       })
  //     }
  //   })
  //   // res.json({placeholder:'update'});
  // };
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

  this.update = function(req, res) {
    console.log('update answer');

    console.log(req.params.id);
    console.log('req.body', req.body);
    var likes = req.body.likes;

    Answer.update(
      {_id: req.params.id},
      { $set: { likes: likes } },
      function(err, result){
        if(err){
          console.log(err);
        }
        res.json(result);
    });
  };

  this.delete = function(req, res) {
    console.log(req.params.id);
        Answer.remove({_id: req.params.id}, function(err){
            if(err){console.log(err);}
            res.json();
        });
    };
  this.show = function(req,res){
    //your code here
    Answer.findOne({_id:req.params.id}, function(err,result){
      res.json(result);
    })

  };
}
module.exports = new AnswersController(); // what does this export?
