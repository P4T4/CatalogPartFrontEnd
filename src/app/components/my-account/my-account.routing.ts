import { Routes } from "@angular/router";

import { UserRoleGuard } from "app/shared/guards/user-role.guard";
import { config } from "config";
import { MyAccountComponent } from "./my-account.component";

export const MyAccountRoutes: Routes = [
    //   {
    //     path: "marca-suzuki",
    //     component: reference-trade-markuzukiComponent,
    //     data: { title: "Suzuki", breadcrumb: "Suzuki" }
    //   }
    { path: '**', component: MyAccountComponent }
];
