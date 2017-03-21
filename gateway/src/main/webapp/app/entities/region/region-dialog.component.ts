import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Region } from './region.model';
import { RegionPopupService } from './region-popup.service';
import { RegionService } from './region.service';

@Component({
    selector: 'jhi-region-dialog',
    templateUrl: './region-dialog.component.html'
})
export class RegionDialogComponent implements OnInit {

    region: Region;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private regionService: RegionService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['region']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.region.id !== undefined) {
            this.regionService.update(this.region)
                .subscribe((res: Region) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.regionService.create(this.region)
                .subscribe((res: Region) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Region) {
        this.eventManager.broadcast({ name: 'regionListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-region-popup',
    template: ''
})
export class RegionPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private regionPopupService: RegionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.regionPopupService
                    .open(RegionDialogComponent, params['id']);
            } else {
                this.modalRef = this.regionPopupService
                    .open(RegionDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
