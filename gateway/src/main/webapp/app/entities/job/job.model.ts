export class Job {
    constructor(
        public id?: number,
        public jobTitle?: string,
        public minSalary?: number,
        public maxSalary?: number,
        public employeeId?: number,
        public taskId?: number,
    ) {
    }
}
