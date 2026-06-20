import { getWeekDateRange } from '../interfaces/MealItem.jsx'

export default function MealTable({ meals, onEdit, onDelete }) {
  if (meals.length === 0) {
    return <p className="text-muted mb-0">Henüz kayıtlı yemek bulunmuyor.</p>
  }

  // Group meals by week
  const groupedByWeek = meals.reduce((acc, meal) => {
    const week = meal.weekNumber
    if (!acc[week]) {
      acc[week] = []
    }
    acc[week].push(meal)
    return acc
  }, {})

  // Sort weeks in descending order
  const sortedWeeks = Object.keys(groupedByWeek)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <div className="weekly-meals">
      {sortedWeeks.map((weekNumber) => {
        const weekMeals = groupedByWeek[weekNumber]
        const year = new Date().getFullYear()
        const { start, end } = getWeekDateRange(weekNumber, year)

        return (
          <div key={weekNumber} className="week-group mb-4">
            <div className="week-header mb-3 pb-2 border-bottom">
              <h5 className="mb-1">
                <span className="badge bg-info me-2">{weekNumber}. hafta</span>
              </h5>
              <small className="text-muted">
                {start} - {end}
              </small>
            </div>
            <div>
              <table className="table table-hover align-middle table-sm">
                <thead className="table-light">
                  <tr>
                    <th scope="col">Hafta</th>
                    <th scope="col">Menü</th>
                    <th scope="col">Tarih</th>
                    <th scope="col" className="text-end">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {weekMeals.map((meal) => (
                    <tr key={meal.id}>
                      <td>
                        <strong>{meal.title}</strong>
                      </td>
                      <td className="text-muted">{meal.menu}</td>
                      <td>
                        <small>{meal.date}</small>
                      </td>
                      <td className="text-end">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary me-2"
                          onClick={() => onEdit(meal)}
                          title="Düzenle"
                        >
                          ✎ Düzenle
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => {
                            if (confirm(`${meal.title} kaydını silmek istediğinize emin misiniz?`)) {
                              onDelete(meal.id)
                            }
                          }}
                          title="Sil"
                        >
                          🗑 Sil
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      })}
    </div>
  )
}
