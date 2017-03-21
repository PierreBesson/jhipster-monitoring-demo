import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Department } from './department.model';
import { DepartmentPopupService } from './department-popup.service';
import { DepartmentService } from './department.service';
import { Location, LocationService } from '../location';
import { Employee, EmployeeService } from '../employee';

@Component({
    selector: 'jhi-department-dialog',
    templateUrl: './department-dialog.component.html'
})
export class DepartmentDialogComponent implements OnInit {

    department: Department;
    authorities: any[];
    isSaving: boolean;

    locations: Location[];

    employees: Employee[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private departmentService: DepartmentService,
        private locationService: LocationService,
        private employeeService: EmployeeService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['department']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.locationService.query({filter: 'department-is-null'}).subscribe((res: Response) => {
            if (!this.department.locationId) {
                this.locations = res.json();
            } else {
                this.locationService.find(this.department.locationId).subscribe((subRes: Location) => {
                    this.locations = [subRes].concat(res.json());
                }, (subRes: Response) => this.onError(subRes.json()));
            }
        }, (res: Response) => this.onError(res.json()));
        this.employeeService.query().subscribe(
            (res: Response) => { this.employees = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.department.id !== undefined) {
            this.departmentService.update(this.department)
                .subscribe((res: Department) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.departmentService.create(this.department)
                .subscribe((res: Department) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Department) {
        this.eventManager.broadcast({ name: 'departmentListModification', content: 'OK'});
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

    trackLocationById(index: number, item: Location) {
        return item.id;
    }

    trackEmployeeById(index: number, item: Employee) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-department-popup',
    template: ''
})
export class DepartmentPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private departmentPopupService: DepartmentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.departmentPopupService
                    .open(DepartmentDialogComponent, params['id']);
            } else {
                this.modalRef = this.departmentPopupService
                    .open(DepartmentDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
