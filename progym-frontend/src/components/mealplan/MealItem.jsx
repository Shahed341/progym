import React from 'react';

function MealItem({ name, grams }) {
  return (
    <li style={styles.item}>
      <span style={styles.foodName}>{name}</span>
      <span style={styles.grams}>{grams}g</span>
    </li>
  );
}

const styles = {
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px dashed #ccc',
  },
  foodName: {
    fontWeight: '500',
    color: '#1A3636',
  },
  grams: {
    fontStyle: 'italic',
    color: '#677D6A',
  },
};

export default MealItem;
