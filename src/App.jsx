import { useState } from 'react'
import Dashboard from './pages/Dashboard.jsx'
import { createMealItem, getWeekNumber } from './interfaces/MealItem.jsx'

const initialMeals = [
  createMealItem(
    'meal-001',
    `${getWeekNumber('2026-06-20')}. hafta Yemeği`,
    'Mercimek Çorbası, Izgara Tavuk, Salata',
    '2026-06-20',
    getWeekNumber('2026-06-20'),
  ),
  createMealItem(
    'meal-002',
    `${getWeekNumber('2026-06-20')}. hafta Yemeği`,
    'Karnıyarık, Pilav, Yoğurt',
    '2026-06-20',
    getWeekNumber('2026-06-20'),
  ),
  createMealItem(
    'meal-003',
    `${getWeekNumber('2026-06-21')}. hafta Yemeği`,
    'Sebzeli Makarna, Ayran',
    '2026-06-21',
    getWeekNumber('2026-06-21'),
  ),
]

function App() {
  const [meals, setMeals] = useState(initialMeals)

  const addMeal = (meal) => {
    setMeals((current) => [meal, ...current])
  }

  const updateMeal = (updatedMeal) => {
    setMeals((current) =>
      current.map((meal) => (meal.id === updatedMeal.id ? updatedMeal : meal)),
    )
  }

  const deleteMeal = (id) => {
    setMeals((current) => current.filter((meal) => meal.id !== id))
  }

  return (
    <Dashboard
      meals={meals}
      addMeal={addMeal}
      updateMeal={updateMeal}
      deleteMeal={deleteMeal}
    />
  )
}

export default App
