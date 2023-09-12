import moment from 'moment';

/**
 * День недели
 */
export enum TDayOfWeek 
{
    /**
     * Понедельник
     */
    Monday = 1,

    /**
     * Вторник
     */
    Tuesday,

    /**
     * Среда
     */
    Wednesday,

    /**
     * Четверг
     */
    Thursday,

    /**
     * Пятница
     */
    Friday,

    /**
     * Суббота
     */
    Saturday,

    /**
     * Воскресенье
     */
    Sunday,
}

export const DATE_DEFAULT_FORMAT = 'DD.MM.YYYY';
export const DATE_FULL_TIME_FORMAT = 'DD.MM.YYYY HH:mm';
export const DATE_YEAR_ONLY_FORMAT = 'YYYY';
export const DATE_FRIENDLY_FORMAT = 'D MMMM';
export const DATE_FRIENDLY_WITH_YEAR_FORMAT = 'D MMMM YYYY';
export const DATE_FULL_MONTH_WITH_YEAR_FORMAT = 'MMMM YYYY';

export const MONTH_NAME_ONLY_FORMAT = 'MMMM';
export const MONTH_ONLY_SHORT_FORMAT = 'MMM';
export const MONTH_NUMBER_FORMAT = 'M';

export const TIME_DEFAULT_FORMAT = 'HH:mm';

export type UnixTime = number & { _type: 'UnixTime' };

export type DateTime = string | Date | moment.Moment;

export const getMinDate = (): moment.Moment => 
{
  return moment('01-01-1900', DATE_DEFAULT_FORMAT);
}

export const getNowDateUtc = (): DateTime => 
{
  return moment.utc();
}

export const addDays = (date: DateTime, days: number): DateTime =>
{
  return moment.utc(date).add(days, 'd');
}

export const addYears = (date: DateTime, years: number): DateTime =>
{
  return moment.utc(date).add(years, 'year');
}

export const getDayOfMonth = (date: DateTime): number =>
{
  return moment.utc(date).date();
}

export const lastDayOfMonth = (date: DateTime) => 
{
  return moment.utc(date).endOf('month');
}
  
export const getDayOfWeek = (date: DateTime): TDayOfWeek => 
{
  const dateString = date.toString();
  return moment.utc(dateString).day();
};

export const firstDayOfMonth = (date: DateTime): DateTime =>
{
  return moment.utc(date).set('date', 1);
}

export const getOnlyDate = (date: DateTime): DateTime =>
{
  return moment.utc(date).startOf('day');
}
  
export const isBeforeToday = (date: DateTime):boolean =>
{
  return moment.utc(date).isBefore(getNowDateUtc());
}

export const isSameOrBeforeToday = (date: DateTime):boolean =>
{
  return moment.utc(date).isSameOrBefore(getNowDateUtc());
}

export const isAfterToday = (date: DateTime):boolean =>
{
  return moment.utc(date).isAfter(getNowDateUtc());
}

export const isAfter = (date1: DateTime, date2: DateTime):boolean =>
{
  return moment.utc(date1).isAfter(date2);
}

export const isSameOrAfterToday = (date: DateTime):boolean =>
{
  return moment.utc(date).isSameOrAfter(getNowDateUtc());
}

export const isSameDay = (date1: DateTime, date2: DateTime):boolean =>
{
  return moment.utc(date1).isSame(moment.utc(date2), 'day');
}

export const isToday = (date: DateTime):boolean => 
{
  return isSameDay(getNowDateUtc(), date);
}

export const isTomorrow = (date: DateTime):boolean =>
{
  return isSameDay(getNowDateUtc(), moment.utc(date).subtract(1, 'day'));
}

export const isYesterday = (date: DateTime):boolean =>
{
  return isSameDay(getNowDateUtc(), moment.utc(date).add(1, 'day'));
}

export const isDayBeforeYesterday = (date: DateTime):boolean =>
{
  return isSameDay(getNowDateUtc(), moment.utc(date).add(2, 'day'));
}

export const isCurrentYear = (date: DateTime):boolean =>
{
  return moment.utc(getNowDateUtc()).isSame(moment.utc(date), 'year');
}

export const formatDateTime = (dateTime: DateTime, format = DATE_FULL_TIME_FORMAT):string =>
{
  return moment.utc(dateTime).format(format);
}

export const formatDateTimeDirect = (year:number, monthIndex: number, date?: number | undefined, hours?: number | undefined,
  minutes?: number | undefined, seconds?: number | undefined, format = DATE_FULL_TIME_FORMAT):string =>
{
  var dateTime= moment({ year: year, month: monthIndex, date: 1, hours:hours, minutes: minutes, seconds:seconds});
  return moment.utc(dateTime).format(format);
}

export const formatDate = (dateTime: DateTime, format = DATE_DEFAULT_FORMAT):string =>
{
  return moment.utc(dateTime).format(format);
}

export const formatDateFullRu = (date: Date | string):string =>
{
  const options = { year: 'numeric', month: 'long', day: '2-digit' };
  const val = new Date(date);
  return val.toLocaleDateString('ru-RU', options as Intl.DateTimeFormatOptions);
};

export const formatDateFriendly = (dateTime: DateTime, formatNearestDateAsString = true) => 
{
  dateTime = moment.utc(dateTime);
  if (formatNearestDateAsString) 
  {
    if (isToday(dateTime)) 
    {
      return 'Сегодня';
    }
    else if (isYesterday(dateTime)) 
    {
      return 'Вчера';
    }
    else if (isDayBeforeYesterday(dateTime)) 
    {
      return 'Позавчера';
    }
    else if (isTomorrow(dateTime)) 
    {
      return 'Завтра';
    }
  }
  
  return formatDate(
    dateTime,
    isCurrentYear(dateTime)
      ? DATE_FRIENDLY_FORMAT
      : DATE_FRIENDLY_WITH_YEAR_FORMAT
  );
};

export const formatDateTimeFriendly = (dateTime: DateTime): string =>
{
  return isCurrentYear(dateTime)
    ? `${formatDateFriendly(dateTime)} в ${formatDate(dateTime, TIME_DEFAULT_FORMAT)}` : formatDateFriendly(dateTime);
}

export const formatMonthAndYearFriendly = (dateTime: DateTime): string =>
{
  return formatDate(dateTime,
    isCurrentYear(dateTime)
      ? MONTH_NAME_ONLY_FORMAT
      : DATE_FULL_MONTH_WITH_YEAR_FORMAT
  );
}

export const formatMonthAndYear = (dateTime: DateTime): string =>
{
  return formatDate(dateTime, DATE_FULL_MONTH_WITH_YEAR_FORMAT);
}

export const formatMonthAndYearFull = (dateTime: DateTime): string =>
{
  return formatDate(dateTime, DATE_FULL_MONTH_WITH_YEAR_FORMAT);
}

export const formatMonthAsNumberAndYear = (dateTime: DateTime):string =>
{
  return moment.utc(dateTime).format('MM.YYYY');
};

export const formatTime = (dateTime: DateTime, format = TIME_DEFAULT_FORMAT): string =>
{
  if(moment.utc(dateTime).isValid())
  {
    return moment.utc(dateTime).format(format);
  }
  else
  {
    return moment.utc(dateTime, DATE_FULL_TIME_FORMAT).format(format);
  }
}
