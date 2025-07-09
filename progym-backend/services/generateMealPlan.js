function calculateTDEE({ weight_kg, height_cm, age, gender }) {
  const bmr =
    gender === 'female'
      ? 10 * weight_kg + 6.25 * height_cm - 5 * age - 161
      : 10 * weight_kg + 6.25 * height_cm - 5 * age + 5;

  return bmr * 1.55; // moderate activity
}

function getMacroSplit(goal) {
  switch (goal) {
    case 'cutting':
      return { protein: 0.4, carbs: 0.3, fat: 0.3 };
    case 'bulking':
      return { protein: 0.3, carbs: 0.5, fat: 0.2 };
    default:
      return { protein: 0.3, carbs: 0.4, fat: 0.3 };
  }
}

function groupIntoMeals(items, mealsPerDay) {
  const meals = Array.from({ length: mealsPerDay }, () => []);
  let mealIndex = 0;
  for (const item of items) {
    meals[mealIndex].push(item);
    mealIndex = (mealIndex + 1) % mealsPerDay;
  }
  return meals.map((items, i) => ({ meal: i + 1, items }));
}

function generateMealPlan(user, mealsPerDay, foods) {
  const tdee = calculateTDEE(user);
  const calorieTarget =
    user.goal === 'cutting'
      ? tdee - 500
      : user.goal === 'bulking'
      ? tdee + 300
      : tdee;

  const macroSplit = getMacroSplit(user.goal);
  const totalProtein = Math.round((calorieTarget * macroSplit.protein) / 4);
  const totalCarbs = Math.round((calorieTarget * macroSplit.carbs) / 4);
  const totalFat = Math.round((calorieTarget * macroSplit.fat) / 9);

  const perMeal = {
    calories: Math.round(calorieTarget / mealsPerDay),
    protein: Math.round(totalProtein / mealsPerDay),
    carbs: Math.round(totalCarbs / mealsPerDay),
    fat: Math.round(totalFat / mealsPerDay),
  };

  // Simple greedy selector
  const selectedFoods = [];
  let proteinLeft = totalProtein;
  let carbsLeft = totalCarbs;
  let fatLeft = totalFat;

  for (const food of foods) {
    if (proteinLeft <= 0 && carbsLeft <= 0 && fatLeft <= 0) break;

    let score =
      food.protein_per_100g * 2 +
      food.carbs_per_100g * 1 +
      food.fat_per_100g * 0.5;

    if (score < 10) continue; // skip low-quality foods

    const maxQuantity = 200; // max 200g per food
    const p = food.protein_per_100g;
    const c = food.carbs_per_100g;
    const f = food.fat_per_100g;

    const quantity = Math.min(
      maxQuantity,
      proteinLeft / p * 100 || 0,
      carbsLeft / c * 100 || 0,
      fatLeft / f * 100 || 0
    );

    if (quantity > 0 && isFinite(quantity)) {
      selectedFoods.push({
        food_id: food.id,
        name: food.name,
        grams: Math.round(quantity),
      });

      proteinLeft -= (quantity / 100) * p;
      carbsLeft -= (quantity / 100) * c;
      fatLeft -= (quantity / 100) * f;
    }
  }

  const meals = groupIntoMeals(selectedFoods, mealsPerDay);

  return {
    calorieTarget: Math.round(calorieTarget),
    mealsPerDay,
    perMealMacros: perMeal,
    suggestedMeals: meals,
  };
}

module.exports = generateMealPlan;
