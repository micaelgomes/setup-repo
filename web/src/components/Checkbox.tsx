import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";

interface CheckBoxProps extends Checkbox.CheckboxProps {
  label: string;
}

export function CheckBox({ label, ...props }: CheckBoxProps) {
  return (
    <Checkbox.Root className='flex items-center gap-3 group ' {...props}>
      <div className='h-8 w-8 rounded-lg flex items-center transition-colors justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500'>
        <Checkbox.Indicator>
          <Check className='text-white' size={20} weight='bold' />
        </Checkbox.Indicator>
      </div>

      <span className='font-semibold text-xl leading-tight text-white group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>{label}</span>
    </Checkbox.Root>
  )
}