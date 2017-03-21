import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Location } from './location.model';
import { LocationPopupService } from './location-popup.service';
import { LocationService } from './location.service';
import { Country, CountryService } from '../country';

@Component({
    selector: 'jhi-location-dialog',
    templateUrl: './location-dialog.component.html'
})
export class LocationDialogComponent implements OnInit {

    location: Location;
    authorities: any[];
    isSaving: boolean;

    countries: Country[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private locationService: LocationService,
        private countryService: CountryService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['location']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.countryService.query({filter: 'location-is-null'}).subscribe((res: Response) => {
            if (!this.location.countryId) {
                this.countries = res.json();
            } else {
                this.countryService.find(this.location.countryId).subscribe((subRes: Country) => {
                    this.countries = [subRes].concat(res.json());
                }, (subRes: Response) => this.onError(subRes.json()));
            }
        }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.location.id !== undefined) {
            this.locationService.update(this.location)
                .subscribe((res: Location) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.locationService.create(this.location)
                .subscribe((res: Location) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Location) {
        this.eventManager.broadcast({ name: 'locationListModification', content: 'OK'});
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

    trackCountryById(index: number, item: Country) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-location-popup',
    template: ''
})
export class LocationPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private locationPopupService: LocationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.locationPopupService
                    .open(LocationDialogComponent, params['id']);
            } else {
                this.modalRef = this.locationPopupService
                    .open(LocationDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
