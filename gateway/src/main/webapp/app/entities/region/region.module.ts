import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';

import {
    RegionService,
    RegionPopupService,
    RegionComponent,
    RegionDetailComponent,
    RegionDialogComponent,
    RegionPopupComponent,
    RegionDeletePopupComponent,
    RegionDeleteDialogComponent,
    regionRoute,
    regionPopupRoute,
} from './';

let ENTITY_STATES = [
    ...regionRoute,
    ...regionPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        RegionComponent,
        RegionDetailComponent,
        RegionDialogComponent,
        RegionDeleteDialogComponent,
        RegionPopupComponent,
        RegionDeletePopupComponent,
    ],
    entryComponents: [
        RegionComponent,
        RegionDialogComponent,
        RegionPopupComponent,
        RegionDeleteDialogComponent,
        RegionDeletePopupComponent,
    ],
    providers: [
        RegionService,
        RegionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayRegionModule {}
