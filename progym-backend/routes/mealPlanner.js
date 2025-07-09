const express = require('express');
const router = express.Router();
const mealPlannerController = require('../controllers/mealPlannerController');

router.get('/', mealPlannerController.getPersonalizedMealPlan);

module.exports = router;
