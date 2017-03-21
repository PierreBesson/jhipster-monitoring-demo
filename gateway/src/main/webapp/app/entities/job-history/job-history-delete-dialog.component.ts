import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { JobHistory } from './job-history.model';
import { JobHistoryPopupService } from './job-history-popup.service';
import { JobHistoryService } from './job-history.service';

@Component({
    selector: 'jhi-job-history-delete-dialog',
    templateUrl: './job-history-delete-dialog.component.html'
})
export class JobHistoryDeleteDialogComponent {

    jobHistory: JobHistory;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private jobHistoryService: JobHistoryService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['jobHistory', 'language']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.jobHistoryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'jobHistoryListModification',
                content: 'Deleted an jobHistory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-job-history-delete-popup',
    template: ''
})
export class JobHistoryDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private jobHistoryPopupService: JobHistoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.jobHistoryPopupService
                .open(JobHistoryDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
