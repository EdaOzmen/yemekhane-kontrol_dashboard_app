/**
 * @typedef {Object} MealItem
 * @property {string} id
 * @property {string} title
 * @property {string} menu
 * @property {string} date
 * @property {number} weekNumber
 */

/**
 * Create a meal item record.
 * @param {string} id
 * @param {string} title
 * @param {string} menu
 * @param {string} date
 * @param {number} weekNumber
 * @returns {MealItem}
 */
export function createMealItem(id, title, menu, date, weekNumber) {
  return { id, title, menu, date, weekNumber }
}

/**
 * Get week number from date
 * @param {string} dateString - ISO format date (YYYY-MM-DD)
 * @returns {number}
 */
export function getWeekNumber(dateString) {
  const date = new Date(dateString)
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
}

/**
 * Get week start and end dates
 * @param {number} weekNumber
 * @param {number} year
 * @returns {{start: string, end: string}}
 */
export function getWeekDateRange(weekNumber, year) {
  const simple = new Date(year, 0, 1 + (weekNumber - 1) * 7)
  const dow = simple.getDay()
  const ISOweekStart = simple
  if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1)
  else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay())

  const weekEnd = new Date(ISOweekStart)
  weekEnd.setDate(weekEnd.getDate() + 6)

  return {
    start: ISOweekStart.toISOString().split('T')[0],
    end: weekEnd.toISOString().split('T')[0],
  }
}
