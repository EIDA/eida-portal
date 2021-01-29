// Created manually
import moment from 'moment';

export class DateHelper {
  private useUTC: boolean;

  /**
   * DateHelper class constructor
   * @param useUTC {boolean} Whether or not to use UTC
   */
  constructor(useUTC: boolean = true) {
    this.useUTC = useUTC;
  }

  public now(): moment.Moment {
    return moment();
  }

  /**
   * Get the moment instance from datetime string
   * @param t {string} String representation of date
   */
  public getDate(t: string): moment.Moment {
    return moment(t);
  }

  public getTimestamp(): string {
    const m = moment();
    return m.format('YYYY-MM-DD HH:mm:ss');
  }

  /**
   * Get the future/past datetime as string after applying year/month/offset
   * on current date
   * @param yearOffset {number} Year offset from current date -
   * positive for future and negative for past dates
   * @param monthOffset {number} Month offset from current date -
   * positive for future and negative for past dates
   * @param dayOffset {number} Day offset from current date -
   * positive for future and negative for past dates
   */
  public getDateTimeWithOffset(
    yearOffset = 0,
    monthOffset = 0,
    dayOffset = 0
  ): string {
    if (!yearOffset) { yearOffset = 0; }
    if (!monthOffset) { monthOffset = 0; }
    if (!dayOffset) { dayOffset = 0; }

    const m = moment();
    if (this.useUTC) { m.utc(); }
    m.add(yearOffset, 'years');
    m.add(monthOffset, 'months');
    m.add(dayOffset, 'days');
    return m.format('YYYY-MM-DDTHH:mm:ss');
  }

  /**
   * Get the future/past date as string after applying year/month/offset
   * on current date
   * @param yearOffset {number} Year offset from current date -
   * positive for future and negative for past dates
   * @param monthOffset {number} Month offset from current date -
   * positive for future and negative for past dates
   * @param dayOffset {number} Day offset from current date -
   * positive for future and negative for past dates
   */
  public getDateWithOffset(
    yearOffset = 0,
    monthOffset = 0,
    dayOffset = 0
  ): string {
    if (!yearOffset) { yearOffset = 0; }
    if (!monthOffset) { monthOffset = 0; }
    if (!dayOffset) { dayOffset = 0; }

    const m = moment();
    m.add(yearOffset, 'years');
    m.add(monthOffset, 'months');
    m.add(dayOffset, 'days');
    return m.format('YYYY-MM-DD');
  }

  /**
   * Get the future/past year as string after applying year/month/offset
   * on current date
   * @param yearOffset {number} Year offset from current date -
   * positive for future and negative for past dates
   */
  public getYearWithOffset(yearOffset = 0): string {
    if (!yearOffset) { yearOffset = 0; }

    const m = moment();
    m.add(yearOffset, 'years');
    return m.format('YYYY');
  }
}
