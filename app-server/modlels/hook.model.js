var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema;

var hookSchema = new Schema({
  _id: String,
  background: String,
  hooks: [
    {
      pictures: [
        {
          location: String
        }
      ],
      passage: String,
      comments: [
        {
          from: String,
          to: String,
          content: String,
          time: String
        }
      ]
    }
  ]
});

var hook = Mongoose.model('Hook', hookSchema);

module.exports = hook;
