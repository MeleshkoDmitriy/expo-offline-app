export const formatDate = (isoString: string | Date) => {
  const date = new Date(isoString);

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };
  
  const prettyDate = date.toLocaleDateString('en-En', dateOptions);
  const localTime = date.toLocaleTimeString('en-En', timeOptions);

  return { prettyDate, localTime };
};