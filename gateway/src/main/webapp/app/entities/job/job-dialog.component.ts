import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Job } from './job.model';
import { JobPopupService } from './job-popup.service';
import { JobService } from './job.service';
import { Employee, EmployeeService } from '../employee';
import { Task, TaskService } from '../task';

@Component({
    selector: 'jhi-job-dialog',
    templateUrl: './job-dialog.component.html'
})
export class JobDialogComponent implements OnInit {

    job: Job;
    authorities: any[];
    isSaving: boolean;

    employees: Employee[];

    tasks: Task[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private jobService: JobService,
        private employeeService: EmployeeService,
        private taskService: TaskService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['job']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.employeeService.query().subscribe(
            (res: Response) => { this.employees = res.json(); }, (res: Response) => this.onError(res.json()));
        this.taskService.query().subscribe(
            (res: Response) => { this.tasks = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.job.id !== undefined) {
            this.jobService.update(this.job)
                .subscribe((res: Job) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.jobService.create(this.job)
                .subscribe((res: Job) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Job) {
        this.eventManager.broadcast({ name: 'jobListModification', content: 'OK'});
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

    trackEmployeeById(index: number, item: Employee) {
        return item.id;
    }

    trackTaskById(index: number, item: Task) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-job-popup',
    template: ''
})
export class JobPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private jobPopupService: JobPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.jobPopupService
                    .open(JobDialogComponent, params['id']);
            } else {
                this.modalRef = this.jobPopupService
                    .open(JobDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
