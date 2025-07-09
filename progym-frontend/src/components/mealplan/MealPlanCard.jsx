import MealItem from './MealItem';

{items.map((item, idx) => (
  <MealItem key={idx} name={item.name} grams={item.grams} />
))}
