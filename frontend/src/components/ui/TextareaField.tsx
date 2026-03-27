import type { TextareaHTMLAttributes } from 'react'

type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
  error?: string
}

export function TextareaField({
  label,
  error,
  className = '',
  id,
  ...props
}: TextareaFieldProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <textarea
        id={id}
        className={`min-h-28 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-600 ${className}`}
        {...props}
      />
      {error ? <span className="text-sm text-rose-600">{error}</span> : null}
    </label>
  )
}
