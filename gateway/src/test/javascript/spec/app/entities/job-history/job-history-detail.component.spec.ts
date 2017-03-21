import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils } from 'ng-jhipster';
import { JhiLanguageService } from 'ng-jhipster';
import { MockLanguageService } from '../../../helpers/mock-language.service';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { JobHistoryDetailComponent } from '../../../../../../main/webapp/app/entities/job-history/job-history-detail.component';
import { JobHistoryService } from '../../../../../../main/webapp/app/entities/job-history/job-history.service';
import { JobHistory } from '../../../../../../main/webapp/app/entities/job-history/job-history.model';

describe('Component Tests', () => {

    describe('JobHistory Management Detail Component', () => {
        let comp: JobHistoryDetailComponent;
        let fixture: ComponentFixture<JobHistoryDetailComponent>;
        let service: JobHistoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [JobHistoryDetailComponent],
                providers: [
                    MockBackend,
                    BaseRequestOptions,
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    {
                        provide: Http,
                        useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                            return new Http(backendInstance, defaultOptions);
                        },
                        deps: [MockBackend, BaseRequestOptions]
                    },
                    {
                        provide: JhiLanguageService,
                        useClass: MockLanguageService
                    },
                    JobHistoryService
                ]
            }).overrideComponent(JobHistoryDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JobHistoryDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobHistoryService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new JobHistory(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.jobHistory).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
