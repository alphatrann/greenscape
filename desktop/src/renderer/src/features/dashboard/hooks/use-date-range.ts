import { useState } from 'react'

interface State {
  start?: Date
  end?: Date
}

export const useDateRange = (initial?: State) => {
  const [from, setFrom] = useState<Date | undefined>(initial?.start)
  const [to, setTo] = useState<Date | undefined>(initial?.end)

  const onFromChange = (date?: Date) => {
    setFrom(date)
  }

  const onToChange = (date?: Date) => {
    setTo(date)
  }

  return { from, to, onFromChange, onToChange }
}
