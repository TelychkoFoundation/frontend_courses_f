export default function isNewCourse(updatedAt: string | Date) {
  const updated = new Date(updatedAt);
  const now = new Date();
  const diffInMs = now.getTime() - updated.getTime();
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  return diffInDays < 14;
}
