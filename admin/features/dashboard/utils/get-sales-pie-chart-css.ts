export const getSalesPieChartCss = (
  salesByCountries: {
    name?: string;
    value: number;
    color: string;
  }[],
) => {
  const totalValue = salesByCountries.reduce((a, b) => a + b.value, 0);
  const convertToPercent = (num: number) =>
    Math.round((num / totalValue) * 100);
  const convertToDegrees = (num: number) => Math.round((num / 100) * 360);

  const css_string = salesByCountries
    .reduce((items: any[], item: any, index, array: any[]) => {
      items.push(item);

      item.count = item.count || 0;
      item.count += array[index - 1]?.count || item.count;
      item.start_value = array[index - 1]?.count ? array[index - 1].count : 0;
      item.end_value = item.count += item.value;
      item.start_percent = convertToPercent(item.start_value);
      item.end_percent = convertToPercent(item.end_value);
      item.start_degrees = convertToDegrees(item.start_percent);
      item.end_degrees = convertToDegrees(item.end_percent);

      return items;
    }, [])
    .map((chart) => {
      const { color, start_degrees, end_degrees } = chart;
      return ` ${color} ${start_degrees}deg ${end_degrees}deg`;
    })
    .join();
  return css_string;
};
