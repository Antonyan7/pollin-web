import { isDate } from 'date-fns';
import { format, formatInTimeZone } from 'date-fns-tz';

type DateAcceptableType = Date | string;

const label = `EST`;
const fullDateISO3339Format = "yyyy-MM-dd'T'HH:mm:ss+00:00"; // workaround for date-fns handling of UTC 0 time zone to show only Z
const fullDateISO8601Format = 'yyyy-MM-dd HH:mm:ssXXX';
const dateOnlyValueFormat = 'yyyy-MM-dd';
const timeOnlyValueFormat = 'HH:mm:ss';

export const dateTimeDisplayFormat = `MMM dd, yyyy HH:mm ['${label}']`;
export const dateOnlyDisplayFormat = 'MMM dd, yyyy';
export const timeOnlyDisplayFormat = `HH:mm ['${label}']`;

const timeZoneOffsetFormat = 'XXX';

export class DateUtil {
  public static initialize(clinicTimeZone: string): void {
    this.clinicTimeZone = clinicTimeZone;
    this.localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  private static clinicTimeZone: string;

  private static localTimeZone: string;

  private static getTimeZoneOffsetString(timeZone: string, date: Date): string {
    return formatInTimeZone(date, timeZone, timeZoneOffsetFormat);
  }

  protected static getClinicTimeZoneOffset(date: Date): string {
    return this.getTimeZoneOffsetString(this.clinicTimeZone, date);
  }

  protected static getLocalTimeZoneOffset(date: Date): string {
    return this.getTimeZoneOffsetString(this.localTimeZone, date);
  }

  // replaces the time zone offsets depending on daylight switch logic, everything is dynamic
  protected static convertFromLocalToClinic(date: Date): string {
    const dateString: string = this.getLocalIsoString(date);
    const clinicTimeZoneOffset = this.getClinicTimeZoneOffset(date);
    const localTimeZoneOffset = this.getLocalTimeZoneOffset(date);

    return dateString.replace(localTimeZoneOffset, clinicTimeZoneOffset);
  }

  // handles Date (in local time zone) | String (in local time zone) | String (in clinic time zone)
  protected static getLocalDateInstance(date: DateAcceptableType): Date {
    if (isDate(date)) {
      return date as Date;
    }

    const convertedFromClinic = this.convertFromClinic(date as string);

    return new Date(convertedFromClinic);
  }

  // provides iso string with local time zone offset
  public static getLocalIsoString(date: DateAcceptableType): string {
    const dateInstance: Date = isDate(date) ? (date as Date) : new Date(date);

    return formatInTimeZone(dateInstance, this.localTimeZone, fullDateISO8601Format);
  }

  // expects date in clinic time zone
  public static convertFromClinic(date: string): string {
    const clinicTimeZoneOffset = this.getClinicTimeZoneOffset(new Date(date));
    const localTimeZoneOffset = this.getLocalTimeZoneOffset(new Date(date));

    return date.replace(clinicTimeZoneOffset, localTimeZoneOffset);
  }

  // expects date in local time zone
  public static convertFromLocal(date: DateAcceptableType): string {
    const dateInstance: Date = isDate(date) ? (date as Date) : new Date(date);
    const clinicDate: string = this.convertFromLocalToClinic(dateInstance);

    return formatInTimeZone(new Date(clinicDate), 'UTC', fullDateISO3339Format);
  }

  public static convertToDateOnly(date: DateAcceptableType): string {
    const dateInstance: Date = this.getLocalDateInstance(date);

    return format(dateInstance, dateOnlyValueFormat);
  }

  public static convertToTimeOnly(date: DateAcceptableType): string {
    const dateInstance: Date = this.getLocalDateInstance(date);

    return format(dateInstance, timeOnlyValueFormat);
  }

  // expects date in local time zone
  public static formatFullDate(date: DateAcceptableType): string {
    const dateInstance: Date = this.getLocalDateInstance(date);
    const clinicDate: string = this.convertFromLocalToClinic(dateInstance);
    const convertedDate: Date = new Date(clinicDate); // this will change the values depending to local time zone

    return formatInTimeZone(convertedDate, this.clinicTimeZone, dateTimeDisplayFormat); // this will change back to clinic time zone
  }

  // expects date in local time zone
  public static formatDateOnly(date: DateAcceptableType): string {
    const dateInstance: Date = this.getLocalDateInstance(date);

    return format(dateInstance, dateOnlyDisplayFormat);
  }

  // expects date in local time zone
  public static formatTimeOnlyFromDate(date: DateAcceptableType): string {
    const dateInstance: Date = this.getLocalDateInstance(date);

    return format(dateInstance, timeOnlyDisplayFormat);
  }

  // expects time string
  public static formatTimeOnly(timeString: string): string {
    return timeString ? `${timeString} [${label}]` : '';
  }
}
