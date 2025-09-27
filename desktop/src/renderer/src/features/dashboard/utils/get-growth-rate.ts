export const getGrowthRate = (curMonth: number, prevMonth: number) => {
  return (curMonth / prevMonth - 1) * 100
}
