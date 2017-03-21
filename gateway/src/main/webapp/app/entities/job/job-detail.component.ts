import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Job } from './job.model';
import { JobService } from './job.service';

@Component({
    selector: 'jhi-job-detail',
    templateUrl: './job-detail.component.html'
})
export class JobDetailComponent implements OnInit, OnDestroy {

    job: Job;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private jobService: JobService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['job']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.jobService.find(id).subscribe(job => {
            this.job = job;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
