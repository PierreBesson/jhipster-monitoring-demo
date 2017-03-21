
const enum Language {
    'FRENCH',
    'ENGLISH',
    'SPANISH'

};
export class JobHistory {
    constructor(
        public id?: number,
        public startDate?: any,
        public endDate?: any,
        public language?: Language,
        public jobId?: number,
        public departmentId?: number,
        public employeeId?: number,
    ) {
    }
}
