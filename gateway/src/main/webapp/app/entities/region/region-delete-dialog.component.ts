import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Region } from './region.model';
import { RegionPopupService } from './region-popup.service';
import { RegionService } from './region.service';

@Component({
    selector: 'jhi-region-delete-dialog',
    templateUrl: './region-delete-dialog.component.html'
})
export class RegionDeleteDialogComponent {

    region: Region;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private regionService: RegionService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['region']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.regionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'regionListModification',
                content: 'Deleted an region'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-region-delete-popup',
    template: ''
})
export class RegionDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private regionPopupService: RegionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.regionPopupService
                .open(RegionDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
