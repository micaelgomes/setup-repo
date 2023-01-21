import { Check } from "phosphor-react";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";
import { CheckBoxForm } from "./CheckBoxForm";

export function NewHabitForm() {
  const weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

  const [title, setTitle] = useState('');
  const [weekDaysSelect, setWeekDaysSelect] = useState<number[]>([]);

  async function createNewHabit(event: FormEvent) {
    event.preventDefault();

    if (!title || !weekDays.length) {
      return;
    }

    await api.post('/habits', {
      title,
      weekDays: weekDaysSelect
    })

    setTitle('')
    setWeekDaysSelect([])

    alert('Criado com sucesso!')
  }

  function handleToogleWeekDay(dayToEdid: number) {
    if (weekDaysSelect.includes(dayToEdid)) {
      const newWeekDaysWithRemovedOne = weekDaysSelect.filter(day => day != dayToEdid)
      setWeekDaysSelect(newWeekDaysWithRemovedOne)
    } else {
      const newWeekDays = [...weekDaysSelect, dayToEdid]
      setWeekDaysSelect(newWeekDays)
    }
  }

  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>

      <input
        id="title"
        type="text"
        placeholder="Exercícios, dormir bem, etc..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        autoFocus
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <label htmlFor="title" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>

      <div className='mt-6 flex flex-col gap-2'>
        {weekDays.map((day, i) => (
          <CheckBoxForm key={day} label={day} checked={weekDaysSelect.includes(i)} onCheckedChange={() => handleToogleWeekDay(i)} />
        ))}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  )
}