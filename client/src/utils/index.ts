export const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleDateString('ru', { month: 'long', day: 'numeric' })
}
