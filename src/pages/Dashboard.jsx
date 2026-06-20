import { useMemo, useState } from 'react'
import MealForm from '../components/MealForm.jsx'
import MealTable from '../components/MealTable.jsx'
import { getWeekNumber } from '../interfaces/MealItem.jsx'

export default function Dashboard({ meals, addMeal, updateMeal, deleteMeal }) {
  const [selectedMeal, setSelectedMeal] = useState(null)

  const stats = useMemo(() => {
    const currentWeek = getWeekNumber(new Date().toISOString().split('T')[0])
    const totalMeals = meals.length
    const currentWeekMeals = meals.filter((meal) => meal.weekNumber === currentWeek)

    return {
      totalMeals,
      currentWeekMeals: currentWeekMeals.length,
      currentWeek,
    }
  }, [meals])

  const handleSubmit = (mealData) => {
    if (selectedMeal) {
      updateMeal(mealData)
      setSelectedMeal(null)
      return
    }

    addMeal(mealData)
  }

  const handleEdit = (meal) => {
    setSelectedMeal(meal)
  }

  const handleCancel = () => {
    setSelectedMeal(null)
  }

  return (
    <div className="container py-5">
      <header className="mb-4 text-center text-md-start">
        <h1 className="page-title">Yemekhane Kontrol Dashboard</h1>
        <p className="page-subtitle">
          Haftalık yemek listelerini yönetin. Kayıtları ekleyin, düzenleyin ve silin.
        </p>
      </header>

      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div className="card card-custom shadow-sm h-100">
            <div className="card-body">
              <h2 className="h5">Yemek Ekle / Düzenle</h2>
              <p className="text-muted mb-4">
                Yeni bir öğün ekleyin veya mevcut kaydı düzenleyin. Tarih seçerken otomatik olarak hafta hesaplanır.
              </p>
              <MealForm selectedMeal={selectedMeal} onSubmit={handleSubmit} onCancel={handleCancel} />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card card-custom shadow-sm mb-3">
            <div className="card-body">
              <h3 className="h6 mb-3">📊 Genel İstatistikler</h3>
              <div className="row g-2">
                <div className="col-12">
                  <div className="p-3 bg-light rounded text-center">
                    <div className="text-muted small">Toplam Kayıt</div>
                    <strong className="fs-4 d-block mt-1">{stats.totalMeals}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card card-custom shadow-sm">
            <div className="card-body">
              <h3 className="h6 mb-3">📅 Bu Hafta</h3>
              <div className="alert alert-info mb-0" role="alert">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{stats.currentWeek}. hafta</strong>
                    <p className="mb-0 small mt-1">
                      {stats.currentWeekMeals} kayıt bulunuyor
                    </p>
                  </div>
                  <div className="badge bg-info rounded-pill fs-6" style={{padding: '0.5rem 0.75rem'}}>
                    {stats.currentWeekMeals}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card card-custom shadow-sm">
        <div className="card-body">
          <h2 className="h5 mb-3">📋 Haftalık Yemek Listesi</h2>
          <p className="text-muted small mb-3">
            Kayıtlar haftaya göre gruplandırılmıştır. Her hafta için başlangıç ve bitiş tarihleri gösterilmektedir.
          </p>
          <div>
            <MealTable meals={meals} onEdit={handleEdit} onDelete={deleteMeal} />
          </div>
        </div>
      </div>

      <footer className="mt-5 pt-4 border-top text-center text-muted small">
        <p>Yemekhane Kontrol Dashboard © 2026 - React + Bootstrap 5</p>
      </footer>
    </div>
  )
}
