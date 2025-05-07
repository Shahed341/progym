const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');

router.post('/', workoutController.addWorkout);
router.get('/', workoutController.getWorkouts);
router.delete('/:id', workoutController.deleteWorkout);

module.exports = router;
