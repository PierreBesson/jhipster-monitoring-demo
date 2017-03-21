import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Region } from './region.model';
import { RegionService } from './region.service';

@Component({
    selector: 'jhi-region-detail',
    templateUrl: './region-detail.component.html'
})
export class RegionDetailComponent implements OnInit, OnDestroy {

    region: Region;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private regionService: RegionService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['region']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.regionService.find(id).subscribe(region => {
            this.region = region;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
