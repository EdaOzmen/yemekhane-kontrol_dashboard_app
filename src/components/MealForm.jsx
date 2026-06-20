import { useEffect, useState } from 'react'
import { createMealItem, getWeekNumber, getWeekDateRange } from '../interfaces/MealItem.jsx'

export default function MealForm({ selectedMeal, onSubmit, onCancel }) {
  const [menu, setMenu] = useState('')
  const [date, setDate] = useState('')
  const [weekNumber, setWeekNumber] = useState(null)
  const [weekRange, setWeekRange] = useState(null)

  useEffect(() => {
    if (selectedMeal) {
      setMenu(selectedMeal.menu)
      setDate(selectedMeal.date)
      const week = getWeekNumber(selectedMeal.date)
      setWeekNumber(week)
      setWeekRange(getWeekDateRange(week, new Date().getFullYear()))
      return
    }

    setMenu('')
    setDate('')
    setWeekNumber(null)
    setWeekRange(null)
  }, [selectedMeal])

  const handleDateChange = (e) => {
    const newDate = e.target.value
    setDate(newDate)

    if (newDate) {
      const week = getWeekNumber(newDate)
      setWeekNumber(week)
      setWeekRange(getWeekDateRange(week, new Date().getFullYear()))
    } else {
      setWeekNumber(null)
      setWeekRange(null)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!menu.trim() || !date || !weekNumber) {
      return
    }

    const mealData = createMealItem(
      selectedMeal?.id ?? `meal-${Date.now()}`,
      `${weekNumber}. hafta Yemeği`,
      menu.trim(),
      date,
      weekNumber,
    )

    onSubmit(mealData)
    setMenu('')
    setDate('')
    setWeekNumber(null)
    setWeekRange(null)
  }

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      <div className="col-12">
        <label htmlFor="mealDate" className="form-label">
          📅 Tarih Seçin
        </label>
        <input
          id="mealDate"
          type="date"
          className="form-control"
          value={date}
          onChange={handleDateChange}
          required
        />
      </div>

      {weekNumber && weekRange && (
        <div className="col-12">
            <div className="alert alert-info mb-0 py-2">
            <strong>📌 {weekNumber}. hafta</strong>
            <span className="text-muted ms-2 small">
              {weekRange.start} - {weekRange.end}
            </span>
          </div>
        </div>
      )}

      <div className="col-12">
        <label htmlFor="mealMenu" className="form-label">
          🍽️ Yemek Menüsü
        </label>
        <textarea
          id="mealMenu"
          className="form-control"
          rows="3"
          placeholder="Örnek: Mercimek çorbası, sebzeli pilav, ayran, tatlı"
          value={menu}
          onChange={(e) => setMenu(e.target.value)}
          required
        />
      </div>

      <div className="col-12 d-flex align-items-end justify-content-end gap-2 pt-2">
        {selectedMeal ? (
          <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>
            Vazgeç
          </button>
        ) : null}
        <button type="submit" className="btn btn-primary" disabled={!weekNumber}>
          {selectedMeal ? '🔄 Güncelle' : '➕ Kaydet'}
        </button>
      </div>
    </form>
  )
}
