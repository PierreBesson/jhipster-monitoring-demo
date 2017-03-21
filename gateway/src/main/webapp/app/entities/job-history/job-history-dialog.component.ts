import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { JobHistory } from './job-history.model';
import { JobHistoryPopupService } from './job-history-popup.service';
import { JobHistoryService } from './job-history.service';
import { Job, JobService } from '../job';
import { Department, DepartmentService } from '../department';
import { Employee, EmployeeService } from '../employee';

@Component({
    selector: 'jhi-job-history-dialog',
    templateUrl: './job-history-dialog.component.html'
})
export class JobHistoryDialogComponent implements OnInit {

    jobHistory: JobHistory;
    authorities: any[];
    isSaving: boolean;

    jobs: Job[];

    departments: Department[];

    employees: Employee[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private jobHistoryService: JobHistoryService,
        private jobService: JobService,
        private departmentService: DepartmentService,
        private employeeService: EmployeeService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['jobHistory', 'language']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.jobService.query({filter: 'jobhistory-is-null'}).subscribe((res: Response) => {
            if (!this.jobHistory.jobId) {
                this.jobs = res.json();
            } else {
                this.jobService.find(this.jobHistory.jobId).subscribe((subRes: Job) => {
                    this.jobs = [subRes].concat(res.json());
                }, (subRes: Response) => this.onError(subRes.json()));
            }
        }, (res: Response) => this.onError(res.json()));
        this.departmentService.query({filter: 'jobhistory-is-null'}).subscribe((res: Response) => {
            if (!this.jobHistory.departmentId) {
                this.departments = res.json();
            } else {
                this.departmentService.find(this.jobHistory.departmentId).subscribe((subRes: Department) => {
                    this.departments = [subRes].concat(res.json());
                }, (subRes: Response) => this.onError(subRes.json()));
            }
        }, (res: Response) => this.onError(res.json()));
        this.employeeService.query({filter: 'jobhistory-is-null'}).subscribe((res: Response) => {
            if (!this.jobHistory.employeeId) {
                this.employees = res.json();
            } else {
                this.employeeService.find(this.jobHistory.employeeId).subscribe((subRes: Employee) => {
                    this.employees = [subRes].concat(res.json());
                }, (subRes: Response) => this.onError(subRes.json()));
            }
        }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.jobHistory.id !== undefined) {
            this.jobHistoryService.update(this.jobHistory)
                .subscribe((res: JobHistory) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.jobHistoryService.create(this.jobHistory)
                .subscribe((res: JobHistory) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: JobHistory) {
        this.eventManager.broadcast({ name: 'jobHistoryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError (error) {
        this.isSaving = false;
        this.onError(error);
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }

    trackJobById(index: number, item: Job) {
        return item.id;
    }

    trackDepartmentById(index: number, item: Department) {
        return item.id;
    }

    trackEmployeeById(index: number, item: Employee) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-job-history-popup',
    template: ''
})
export class JobHistoryPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private jobHistoryPopupService: JobHistoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.jobHistoryPopupService
                    .open(JobHistoryDialogComponent, params['id']);
            } else {
                this.modalRef = this.jobHistoryPopupService
                    .open(JobHistoryDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
