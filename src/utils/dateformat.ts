export function formatDate(date: string | number | Date) {
    return new Date(date).toLocaleTimeString('en-us', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  }