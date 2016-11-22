console.log('Questions model');
var mongoose = require('mongoose');
// build your friend schema and add it to the mongoose.models
// var Schema = mongoose.Schema;
var Schema = mongoose.Schema;




  var UserSchema = new mongoose.Schema({
    name: {type: String},
    questions: [{type: Schema.Types.ObjectId, ref: 'Question'}],
    answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}]
    }, {timestamps: true });
    mongoose.model('User', UserSchema);
