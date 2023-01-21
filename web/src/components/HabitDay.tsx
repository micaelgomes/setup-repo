import * as Popover from '@radix-ui/react-popover';

import { ProgressBar } from './ProgressBar';
import clsx from 'clsx'
import dayjs from 'dayjs';
import { HabitList } from './HabitList';
import { useState } from 'react';

interface HabitDayProps {
  date: Date;
  defaultCompleted?: number;
  amount?: number;
}

export function HabitDay({ amount = 0, defaultCompleted = 0, date }: HabitDayProps) {
  const [completed, setCompleted] = useState(defaultCompleted);
  const completePercentation = amount > 0 ? Math.round((completed / amount) * 100) : 0;

  const dayAndMonth = dayjs(date).format('DD/MM')
  const dayOfWeek = dayjs(date).format('dddd')
  const dayOfWeekFormatted = dayOfWeek[0].toUpperCase() + dayOfWeek.substring(1, dayOfWeek.length)

  function updateCompletedValue(newValue: number) {
    setCompleted(newValue)
  }

  return (
    <Popover.Root>
      <Popover.Trigger className={clsx(" rounded-lg border-2 h-10 w-10 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-800 focus:ring-offset-2 focus:ring-offset-background", {
        'bg-zinc-900 border-zinc-800': completePercentation === 0,
        'bg-violet-900 border-violet-700': completePercentation > 0 && completePercentation < 20,
        'bg-violet-800 border-violet-600': completePercentation >= 20 && completePercentation < 40,
        'bg-violet-700 border-violet-500': completePercentation >= 40 && completePercentation < 60,
        'bg-violet-600 border-violet-500': completePercentation >= 60 && completePercentation < 80,
        'bg-violet-500 border-violet-400': completePercentation >= 80,
      })} />
      <Popover.Portal>
        <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col'>
          <Popover.Arrow width={8} height={16} className='fill-zinc-900' />

          <span className='font-semibold text-zinc-400'>{dayOfWeekFormatted}</span>
          <span className='mt-1 font-extrabold leading-tight text-3xl'>{dayAndMonth}</span>

          <ProgressBar progressValue={completePercentation} />

          <HabitList date={date} onCompletedChange={updateCompletedValue} />

        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export function HabitDayPlaceholder() {
  return <div className="bg-zinc-900 cursor-not-allowed opacity-40 border-zinc-800 rounded-lg border-2 h-10 w-10" />;
}
