export function sortByDate(a: { date: string }, b: { date: string }) {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return dateA.getTime() - dateB.getTime();
}
