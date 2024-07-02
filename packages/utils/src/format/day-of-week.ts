export const formatDayOfWeek = /*#__PURE__*/ (day => {
  if (typeof day === 'number')
    switch (day) {
      case 1:
        return '一'
      case 2:
        return '二'
      case 3:
        return '三'
      case 4:
        return '四'
      case 5:
        return '五'
      case 6:
        return '六'
      case 7:
        return '日'
      default:
        break
    }
  else if (typeof day === 'string') {
    switch (day) {
      case '一':
        return 1
      case '二':
        return 2
      case '三':
        return 3
      case '四':
        return 4
      case '五':
        return 5
      case '六':
        return 6
      case '日':
        return 7
      default:
        break
    }
  }
  return day
}) as {
  (day: number): string
  (day: string): number
}
