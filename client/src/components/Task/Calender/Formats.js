

export const Formats = {
    dayFormat: (date, culture, localizer) => {
      const dayOfMonth = localizer.format(date, 'DD', culture);
      const dayOfWeek = localizer.format(date, 'ddd', culture);
      return `${dayOfMonth}\n${dayOfWeek}`;
    },
    timeGutterFormat: (date, culture, localizer) =>
          localizer.format(date, 'HH:mm ', culture)
  };
