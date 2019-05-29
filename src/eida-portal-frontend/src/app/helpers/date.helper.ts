// Created manually
import moment from 'moment';

export class DateHelper {

    constructor() {
    }

    public getDate(t: string): moment.Moment {
        return moment(t);
    }
}