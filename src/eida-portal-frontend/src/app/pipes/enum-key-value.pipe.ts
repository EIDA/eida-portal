import { Pipe, PipeTransform } from '@angular/core';

import * as _ from 'lodash';

@Pipe({ name: 'enumKeyValueList' })
export class EnumKeyValueListPipe implements PipeTransform {
    transform(value: any, args: any[]): any {
        value = value || {};
        const keys = Object.getOwnPropertyNames(value);

        const results = _(keys)
            .filter(key => !isNaN(key))
            .uniq()
            .map(key => { return { key: key, value: value[key] } })
            .value();
    }
}