 console.log('Questions model');
var mongoose = require('mongoose');
// build your friend schema and add it to the mongoose.models
// var Schema = mongoose.Schema;
var Schema = mongoose.Schema;


  var AnswerSchema = new mongoose.Schema({
   _question: {type: Schema.Types.ObjectId, ref: 'Question'},
   user: { type: String },
   // _user:{type:Schema.Types.ObjectId, ref:'User'},
   text: {type: String, required: false },
   likes: {type: Number, default: 0}
  }, {timestamp: true });
  mongoose.model('Answer', AnswerSchema);
