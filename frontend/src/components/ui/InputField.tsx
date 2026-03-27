import type { InputHTMLAttributes } from 'react'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

export function InputField({ label, error, className = '', id, ...props }: InputFieldProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <input
        id={id}
        className={`h-11 rounded-2xl border border-slate-300 bg-white px-4 text-sm outline-none ring-0 transition focus:border-brand-600 ${className}`}
        {...props}
      />
      {error ? <span className="text-sm text-rose-600">{error}</span> : null}
    </label>
  )
}
