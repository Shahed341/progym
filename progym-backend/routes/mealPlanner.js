const express = require('express');
const router  = express.Router();
const { getMealPlan, saveMealPlan, addWater } = require('../controllers/mealPlannerController');

// GET  /api/mealplan?userId=…&mealsPerDay=…
router.get('/', getMealPlan);

// POST /api/mealplan/save
router.post('/save', saveMealPlan);

// POST /api/mealplan/water
router.post('/water', addWater);

module.exports = router;
