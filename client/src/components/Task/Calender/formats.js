

const formats = {
    dayFormat: (date, culture, localizer) => {
      const dayOfMonth = localizer.format(date, 'DD', culture);
      const dayOfWeek = localizer.format(date, 'ddd', culture);
  
      return `${dayOfMonth}\n${dayOfWeek}`;
    },
  };
  
  export default formats;
  