import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ClarityModule } from '@clr/angular';
import { SharedModule } from '../shared/shared.module';

import { VmwComponentsModule } from "@vmw/ngx-components";
import { VmwDevCenterModule } from "@vmw/ngx-dev-center";
import { LogModule } from '../log/log.module';

import { provideForRootGuard } from "../../../node_modules/@angular/router/src/router_module";
import { DevCenterComponent } from "./dev-center.component";

@NgModule({
    imports: [
        CommonModule,
        LogModule,
        SharedModule,
        RouterModule.forChild([{
            path: "**",
            component: DevCenterComponent,
        }]),
        VmwDevCenterModule.forRoot(),
        ClarityModule.forRoot(),
        VmwComponentsModule.forChild(),
    ],
    declarations: [
        DevCenterComponent,
    ],
})
export class DeveloperCenterModule {}
