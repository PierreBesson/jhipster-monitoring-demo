import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JobHistory } from './job-history.model';
import { JobHistoryService } from './job-history.service';

@Component({
    selector: 'jhi-job-history-detail',
    templateUrl: './job-history-detail.component.html'
})
export class JobHistoryDetailComponent implements OnInit, OnDestroy {

    jobHistory: JobHistory;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private jobHistoryService: JobHistoryService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['jobHistory', 'language']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.jobHistoryService.find(id).subscribe(jobHistory => {
            this.jobHistory = jobHistory;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
