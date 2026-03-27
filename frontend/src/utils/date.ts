export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat('ko-KR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

export function toApiDateTime(value: string) {
  return new Date(value).toISOString().slice(0, 19)
}
