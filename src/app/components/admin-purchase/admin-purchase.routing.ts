import { Routes } from "@angular/router";

import { UserRoleGuard } from "app/shared/guards/user-role.guard";
import { config } from "config";
import { AdminPurchaseComponent } from "./admin-purchase.component";

export const AdminPurchaseRoutes: Routes = [
    //   {
    //     path: "marca-suzuki",
    //     component: productuzukiComponent,
    //     data: { title: "Suzuki", breadcrumb: "Suzuki" }
    //   }
    { path: '**', component: AdminPurchaseComponent }
];
