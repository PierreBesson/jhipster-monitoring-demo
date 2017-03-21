import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { JobComponent } from './job.component';
import { JobDetailComponent } from './job-detail.component';
import { JobPopupComponent } from './job-dialog.component';
import { JobDeletePopupComponent } from './job-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class JobResolvePagingParams implements Resolve<any> {

  constructor(private paginationUtil: PaginationUtil) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      let page = route.queryParams['page'] ? route.queryParams['page'] : '1';
      let sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
      return {
          page: this.paginationUtil.parsePage(page),
          predicate: this.paginationUtil.parsePredicate(sort),
          ascending: this.paginationUtil.parseAscending(sort)
    };
  }
}

export const jobRoute: Routes = [
  {
    path: 'job',
    component: JobComponent,
    resolve: {
      'pagingParams': JobResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatewayApp.job.home.title'
    }
  }, {
    path: 'job/:id',
    component: JobDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatewayApp.job.home.title'
    }
  }
];

export const jobPopupRoute: Routes = [
  {
    path: 'job-new',
    component: JobPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatewayApp.job.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'job/:id/edit',
    component: JobPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatewayApp.job.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'job/:id/delete',
    component: JobDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatewayApp.job.home.title'
    },
    outlet: 'popup'
  }
];
