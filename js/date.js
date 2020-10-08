function formatDate(date, formatIN = 'YYYY-MM-DD', formatOUT = 'YYYY-MM-DD') {
  return dayjs(date, formatIN).format(formatOUT);
}

function getToday() {
  return dayjs().format('YYYY-MM-DD');
}

function subtractInerval(date, interval = { count: 7, deg: 'day'}) {
  return dayjs(date).subtract(interval.count, interval.deg).format('YYYY-MM-DD');
}