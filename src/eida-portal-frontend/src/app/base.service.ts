import { Subject } from 'rxjs';
import { ProgressNotification } from './modules/models';

export class BaseService {
  public progressReporter = new Subject<ProgressNotification>();

  constructor() {}

  /**
   * Report the download progress to the listeners
   * @param dividend {number} Dividend
   * @param divisor {number} Divisor
   * @param completed {boolean} True for completer, false otherwise
   * @param error {boolean} True for error, false otherwise
   * @param indeterminate {boolean} True if progress is uknown, false otherwise
   * @param message {string} Message to be rendered on the screen
   */
  protected reportProgress(
    dividend,
    divisor,
    completed = false,
    error = false,
    indeterminate = false,
    message = ''
  ): void {
    const pb = new ProgressNotification();
    pb.dividend = dividend;
    pb.divisor = divisor;
    pb.completed = completed;
    pb.error = error;
    pb.indeterminate = indeterminate;
    pb.message = message;
    this.progressReporter.next(pb);
  }
}
