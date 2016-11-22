console.log('Questions model');
var mongoose = require('mongoose');
// build your friend schema and add it to the mongoose.models
// var Schema = mongoose.Schema;
var Schema = mongoose.Schema;

var QuestionSchema = new mongoose.Schema({
  text: {type: String },
  user:{type: String},
  category:{type:String},
  answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}]
}, {timestamps: true });

mongoose.model('Question', QuestionSchema);
