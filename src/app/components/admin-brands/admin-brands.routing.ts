import { Routes } from "@angular/router";

import { UserRoleGuard } from "app/shared/guards/user-role.guard";
import { config } from "config";
import { AdminBrandsComponent } from "./admin-brands.component";

export const AdminBrandsRoutes: Routes = [
    //   {
    //     path: "marca-suzuki",
    //     component: BrandSuzukiComponent,
    //     data: { title: "Suzuki", breadcrumb: "Suzuki" }
    //   }
    { path: '**', component: AdminBrandsComponent }
];
