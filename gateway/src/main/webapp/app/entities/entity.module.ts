import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GatewayCountryModule } from './country/country.module';
import { GatewayDepartmentModule } from './department/department.module';
import { GatewayEmployeeModule } from './employee/employee.module';
import { GatewayJobModule } from './job/job.module';
import { GatewayJobHistoryModule } from './job-history/job-history.module';
import { GatewayLocationModule } from './location/location.module';
import { GatewayRegionModule } from './region/region.module';
import { GatewayTaskModule } from './task/task.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GatewayCountryModule,
        GatewayDepartmentModule,
        GatewayEmployeeModule,
        GatewayJobModule,
        GatewayJobHistoryModule,
        GatewayLocationModule,
        GatewayRegionModule,
        GatewayTaskModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEntityModule {}
