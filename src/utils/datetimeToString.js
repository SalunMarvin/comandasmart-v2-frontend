const addZero = input => {
  return input.length < 2 ? `0${input}` : input
}

export const datetimeToString = input => {
  const day = addZero(input.getDate().toString())
  const month = addZero((input.getMonth() + 1).toString())
  const year = input.getFullYear().toString()

  const hour = addZero(input.getHours().toString())
  const minute = addZero(input.getMinutes().toString())

  const date = `${day}/${month}/${year}`
  const time = `${hour}:${minute}`

  return `${date} às ${time}`
}
