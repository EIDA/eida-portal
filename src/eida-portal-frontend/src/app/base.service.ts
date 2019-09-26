import { Subject } from 'rxjs';
import { ProgressNotification } from './modules/models';

export class BaseService {
    public progressReporter = new Subject<ProgressNotification>();

    constructor() {}

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
