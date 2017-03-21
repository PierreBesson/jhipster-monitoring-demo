import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { RegionComponent } from './region.component';
import { RegionDetailComponent } from './region-detail.component';
import { RegionPopupComponent } from './region-dialog.component';
import { RegionDeletePopupComponent } from './region-delete-dialog.component';

import { Principal } from '../../shared';


export const regionRoute: Routes = [
  {
    path: 'region',
    component: RegionComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatewayApp.region.home.title'
    }
  }, {
    path: 'region/:id',
    component: RegionDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatewayApp.region.home.title'
    }
  }
];

export const regionPopupRoute: Routes = [
  {
    path: 'region-new',
    component: RegionPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatewayApp.region.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'region/:id/edit',
    component: RegionPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatewayApp.region.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'region/:id/delete',
    component: RegionDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatewayApp.region.home.title'
    },
    outlet: 'popup'
  }
];
