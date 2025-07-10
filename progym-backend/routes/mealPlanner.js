const express = require('express');
const router = express.Router();
const { getMealPlan, saveMealPlan } = require('../controllers/mealPlannerController');

// Generate meal plan
router.get('/', getMealPlan);

// Save meal plan and water intake
router.post('/save', saveMealPlan);

module.exports = router;
