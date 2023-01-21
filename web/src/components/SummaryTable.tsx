import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { generateDatesFromYearBeginningBetween } from "../utils/generateDatesFromYearBeginningBetween"
import { HabitDay, HabitDayPlaceholder } from "./HabitDay"

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const summaryDates = generateDatesFromYearBeginningBetween();

const minimunSumaryDatesSizes = 18 * 7; // 18 week
const amountDaysToFill = minimunSumaryDatesSizes - summaryDates.length;

type SummaryProps = Array<{
  id: string;
  date: Date;
  amount: number;
  completed: number;
}>

export function SummaryTable() {
  const [summary, setSummary] = useState<SummaryProps>();

  useEffect(() => {
    api.get('/summary').then(res => {
      setSummary(res.data)
    })
  }, [])

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((day, i) => (
          <div key={`${day}-${i}`} className="text-zinc-400 font-bold text-xl h-10 w-10 flex items-center justify-center">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summary && summaryDates.map(date => {
          const dayInSummary = summary?.find(day => dayjs(day.date).isSame(date, 'day'))

          return (
            <HabitDay key={date.toString()} date={date} amount={dayInSummary?.amount} defaultCompleted={dayInSummary?.completed} />
          )
        })}

        {amountDaysToFill > 0 && Array.from({ length: amountDaysToFill }).map((_, i) => (
          <HabitDayPlaceholder key={i} />
        ))}
      </div>
    </div>
  )
}