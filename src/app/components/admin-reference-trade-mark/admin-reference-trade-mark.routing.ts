import { Routes } from "@angular/router";

import { UserRoleGuard } from "app/shared/guards/user-role.guard";
import { config } from "config";
import { AdminReferenceTradeMarkComponent } from "./admin-reference-trade-mark.component";

export const AdminReferenceTradeMarkRoutes: Routes = [
    //   {
    //     path: "marca-suzuki",
    //     component: reference-trade-markuzukiComponent,
    //     data: { title: "Suzuki", breadcrumb: "Suzuki" }
    //   }
    { path: '**', component: AdminReferenceTradeMarkComponent }
];
