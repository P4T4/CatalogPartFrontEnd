import { Routes } from "@angular/router";

import { BrandHyundaiComponent } from "./brandHyundai/brandHyundai.component";
import { BrandKiaComponent } from "./brandKia/brandKia.component";
import { BrandSuzukiComponent } from "./brandSuzuki/brandSuzuki.component";
import { UserRoleGuard } from "app/shared/guards/user-role.guard";
import { config } from "config";

export const BrandsRoutes: Routes = [
  {
    path: "marca-hyundai",
    component: BrandHyundaiComponent,
    //canActivate: [UserRoleGuard],
    //data: { title: "Default", breadcrumb: "Default", roles: config.authRoles.sa }
    data: { title: "Hyundai", breadcrumb: "Hyundai" }
  },
  {
    path: "marca-kia",
    component: BrandKiaComponent,
    data: { title: "Kia", breadcrumb: "Kia" }
  },
  {
    path: "marca-suzuki",
    component: BrandSuzukiComponent,
    data: { title: "Suzuki", breadcrumb: "Suzuki" }
  }
];
