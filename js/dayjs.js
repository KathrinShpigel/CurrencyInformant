function formatDate(date, formatIN, formatOUT) {
  return dayjs(date, formatIN).format(formatOUT);
}

function getToday() {
  return dayjs().format('YYYY-MM-DD');
}