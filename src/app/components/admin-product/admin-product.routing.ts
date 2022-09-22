import { Routes } from "@angular/router";

import { UserRoleGuard } from "app/shared/guards/user-role.guard";
import { config } from "config";
import { AdminProductComponent } from "./admin-product.component";

export const AdminProductRoutes: Routes = [
    //   {
    //     path: "marca-suzuki",
    //     component: productuzukiComponent,
    //     data: { title: "Suzuki", breadcrumb: "Suzuki" }
    //   }
    { path: '**', component: AdminProductComponent }
];
