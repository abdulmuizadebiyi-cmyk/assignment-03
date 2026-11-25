var express = require('express');
var router = express.Router();
var Assignment = require('../models/assignment');

// Display all assignments
router.get('/', async function(req, res, next) {
  try {
    var assignments = await Assignment.find();

    res.render('assignments/index', {
      title: 'Assignments',
      assignments: assignments
    });
  } catch (err) {
    next(err);
  }
});

// Display add assignment form
router.get('/add', function(req, res) {
  res.render('assignments/add', {
    title: 'Add Assignment'
  });
});

// Create a new assignment
router.post('/add', async function(req, res, next) {
  try {
    await Assignment.create({
      title: req.body.title,
      course: req.body.course,
      description: req.body.description,
      dueDate: req.body.dueDate,
      priority: req.body.priority,
      status: req.body.status
    });

    res.redirect('/assignments');
  } catch (err) {
    next(err);
  }
});

// Display edit assignment form
router.get('/edit/:id', async function(req, res, next) {
  try {
    var assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.sendStatus(404);
    }

    res.render('assignments/edit', {
      title: 'Edit Assignment',
      assignment: assignment
    });
  } catch (err) {
    next(err);
  }
});

// Update an assignment
router.post('/edit/:id', async function(req, res, next) {
  try {
    await Assignment.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      course: req.body.course,
      description: req.body.description,
      dueDate: req.body.dueDate,
      priority: req.body.priority,
      status: req.body.status
    }, { runValidators: true });

    res.redirect('/assignments');
  } catch (err) {
    next(err);
  }
});

// Delete an assignment
router.post('/delete/:id', async function(req, res, next) {
  try {
    await Assignment.findByIdAndDelete(req.params.id);

    res.redirect('/assignments');
  } catch (err) {
    next(err);
  }
});

module.exports = router;