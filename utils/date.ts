const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]
export const getHumanDate = (date: Date | undefined) =>
  date
    ? `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    : 'N/A'
