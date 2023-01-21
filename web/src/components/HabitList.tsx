import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { CheckBox } from "./Checkbox";

interface HabitListProps {
  date: Date;
  onCompletedChange: (newValue: number) => void;
}

interface HabitsInfo {
  possibleHabits: Array<{
    id: string;
    title: string;
    created_at: string;
  }>;
  completedHabits: string[];
}

export function HabitList({ date, onCompletedChange }: HabitListProps) {
  const [habits, setHabits] = useState<HabitsInfo>();
  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date())

  async function handleToogleHabit(habitId: string) {
    await api.patch(`/habits/${habitId}/toogle`)

    const isHabitAlreadyCompleted = habits!.completedHabits.includes(habitId)
    let newCompletedHabits = [] as string[]

    if (isHabitAlreadyCompleted) {
      newCompletedHabits = habits!.completedHabits.filter(id => id !== habitId)
    } else {
      newCompletedHabits = [...habits!.completedHabits, habitId]
    }

    setHabits({
      possibleHabits: habits!.possibleHabits,
      completedHabits: newCompletedHabits
    })

    onCompletedChange(newCompletedHabits.length)
  }

  useEffect(() => {
    api.get('/day', {
      params: {
        date: date.toISOString()
      }
    }).then(res => {
      setHabits(res.data)
    })
  }, [])

  return (
    <div className='mt-6 flex flex-col gap-3'>
      {habits?.possibleHabits.map(habit => (
        <CheckBox
          key={habit.id}
          label={habit.title}
          disabled={isDateInPast}
          checked={habits.completedHabits.includes(habit.id)}
          onCheckedChange={() => handleToogleHabit(habit.id)}
        />
      ))}
    </div>
  )
}