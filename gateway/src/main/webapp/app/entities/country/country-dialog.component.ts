import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Country } from './country.model';
import { CountryPopupService } from './country-popup.service';
import { CountryService } from './country.service';
import { Region, RegionService } from '../region';

@Component({
    selector: 'jhi-country-dialog',
    templateUrl: './country-dialog.component.html'
})
export class CountryDialogComponent implements OnInit {

    country: Country;
    authorities: any[];
    isSaving: boolean;

    regions: Region[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private countryService: CountryService,
        private regionService: RegionService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['country']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.regionService.query({filter: 'country-is-null'}).subscribe((res: Response) => {
            if (!this.country.regionId) {
                this.regions = res.json();
            } else {
                this.regionService.find(this.country.regionId).subscribe((subRes: Region) => {
                    this.regions = [subRes].concat(res.json());
                }, (subRes: Response) => this.onError(subRes.json()));
            }
        }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.country.id !== undefined) {
            this.countryService.update(this.country)
                .subscribe((res: Country) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.countryService.create(this.country)
                .subscribe((res: Country) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Country) {
        this.eventManager.broadcast({ name: 'countryListModification', content: 'OK'});
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

    trackRegionById(index: number, item: Region) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-country-popup',
    template: ''
})
export class CountryPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private countryPopupService: CountryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.countryPopupService
                    .open(CountryDialogComponent, params['id']);
            } else {
                this.modalRef = this.countryPopupService
                    .open(CountryDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
