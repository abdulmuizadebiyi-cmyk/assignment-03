var mongoose = require('mongoose');

var assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  dueDate: {
    type: Date,
    required: true
  },
  priority: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Assignment', assignmentSchema);