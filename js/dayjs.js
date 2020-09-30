function formatDate(date, formatIN, formatOUT) {
  return dayjs(date, formatIN).format(formatOUT);
}