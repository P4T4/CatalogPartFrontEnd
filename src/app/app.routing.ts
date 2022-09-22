import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { FinancingComponent } from './components/financing/financing.component';
import { AuthenticationRoutes } from './components/authentication/authentication.routing';

export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  /*{
    path: 'home',
    loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule),
    data: { title: 'Choose A Demo' }
  },*/
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./components/authentication/authentication.module').then(m => m.AuthenticationModule),
        data: { title: 'Authentication' }
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    //canActivate: [AuthGuard],
    children: [
      {
        path: 'inicio',
        loadChildren: () => import('./components/main/main.module').then(m => m.MainModule),
        data: { title: 'Inicio', breadcrumb: 'INICIO' }
      },
      {
        path: 'inicio/:loading',
        loadChildren: () => import('./components/main/main.module').then(m => m.MainModule),
        data: { title: 'Inicio', breadcrumb: 'INICIO' }
      },
      {
        path: 'register',
        loadChildren: () => import('./components/authentication/register/register.module').then(m => m.RegisterModule),
        data: { title: 'Registro', breadcrumb: 'REGISTRO' }
      },
      {
        path: 'nosotros',
        loadChildren: () => import('./components/company/company.module').then(m => m.CompanyModule),
        data: { title: 'Nosotros', breadcrumb: 'NOSOTROS' }
      },
      {
        path: 'garantia',
        loadChildren: () => import('./components/warranty/warranty.module').then(m => m.WarrantyModule),
        data: { title: 'Garantía', breadcrumb: 'GARANTÍA' }
      },
      {
        path: 'contactenos',
        loadChildren: () => import('./components/contact/contact.module').then(m => m.ContactModule),
        data: { title: 'Financiación', breadcrumb: 'FINANCIACIÓN' }
      },
      {
        path: 'orders',
        loadChildren: () => import('./components/orders/orders.module').then(m => m.OrdersModule),
        data: { title: 'Mis pedidos', breadcrumb: 'MIS PEDIDOS' }
      },
      {
        path: 'coupons',
        loadChildren: () => import('./components/coupons/coupons.module').then(m => m.CouponsModule),
        data: { title: 'Mis cupones', breadcrumb: 'MIS CUPONES' }
      },
      {
        path: 'financiacion',
        loadChildren: () => import('./components/financing/financing.module').then(m => m.FinancingModule),
        data: { title: 'Financiación', breadcrumb: 'FINANCIACIÓN' }
      },
      {
        path: 'marcas',
        loadChildren: () => import('./components/brands/brands.module').then(m => m.BrandModule),
        data: { title: 'Marcas', breadcrumb: 'MARCAS' }
      },
      {
        path: 'marcas/admin-marcas',
        loadChildren: () => import('./components/admin-brands/admin-brands.module').then(m => m.AdminBrandModule),
        data: { title: 'Administrador de marcas', breadcrumb: 'ADMINMARCAS' }
      },
      {
        path: 'marcas/admin-references',
        loadChildren: () => import('./components/admin-reference-trade-mark/admin-reference-trade-mark.module').then(m => m.AdminReferenceTradeMarkModule),
        data: { title: 'Administrador de marcas', breadcrumb: 'ADMINMARCAS' }
      },
      {
        path: 'marcas/admin-products',
        loadChildren: () => import('./components/admin-product/admin-product.module').then(m => m.AdminProductModule),
        data: { title: 'Administrador de marcas', breadcrumb: 'ADMINMARCAS' }
      },
      {
        path: 'marcas/manage',
        loadChildren: () => import('./components/manage/manage.module').then(m => m.ManageModule),
        data: { title: 'Administrar', breadcrumb: 'ADMINISTRAR' }
      },
      {
        path: 'marcas/admin-inventory',
        loadChildren: () => import('./components/inventory/inventory.module').then(m => m.InventoryModule),
        data: { title: 'Marcas', breadcrumb: 'MARCAS' }
      },
      {
        path: 'catalogo',
        loadChildren: () => import('./components/catalogue/catalogue.module').then(m => m.CatalogueModule),
        data: { title: 'Cátalogo', breadcrumb: 'CÁTALOGO' },
        // canActivate: [AuthGuard]
      },
      {
        path: 'myAccount',
        loadChildren: () => import('./components/my-account/my-account.module').then(m => m.MyAccountModule),
        data: { title: 'My cuenta', breadcrumb: 'MYACCOUNT' },
        canActivate: [AuthGuard]
      },
      {
        path: 'catalogo/:reload',
        loadChildren: () => import('./components/catalogue/catalogue.module').then(m => m.CatalogueModule),
        data: { title: 'Cátalogo', breadcrumb: 'CÁTALOGO' },
        canActivate: [AuthGuard]
      },
      {
        path: 'modelos/:markID',
        loadChildren: () => import('./components/modelMark/modelMark.module').then(m => m.ModelMarkModule),
        data: { title: 'Modelos', breadcrumb: 'MODELOS' },
        canActivate: [AuthGuard]
      },
      {
        path: 'productos/:modeloID/:markID',
        loadChildren: () => import('./components/productModel/productModel.module').then(m => m.ProductModel),
        data: { title: 'Productos', breadcrumb: 'PRODUCTOS' },
        canActivate: [AuthGuard]
      },
      {
        path: 'detproducto/:productID/:modelID',
        loadChildren: () => import('./components/productCart/productCart.module').then(m => m.ProductCartModule),
        data: { title: 'Detalle de producto', breadcrumb: 'DETPRODUCTO' },
        canActivate: [AuthGuard]
      },
      {
        path: 'shop',
        loadChildren: () => import('./components/shop/shop.module').then(m => m.ShopModule),
        data: { title: 'Shop', breadcrumb: 'SHOP' },
        canActivate: [AuthGuard]
      },
      {
        path: ':marca/:codigo',
        loadChildren: () => import('./components/productCartByCatalogue/productCartByCatalogue.module').then(m => m.ProductCartByCatalogueModule),
        data: { title: 'Detalle de producto', breadcrumb: 'DETPRODUCTO' },
        canActivate: [AuthGuard]
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
        data: { title: 'Dashboard', breadcrumb: 'DASHBOARD' }
      },
      {
        path: 'material',
        loadChildren: () => import('./views/material-example-view/material-example-view.module').then(m => m.MaterialExampleViewModule),
        data: { title: 'Material', breadcrumb: 'MATERIAL' }
      },
      {
        path: 'dialogs',
        loadChildren: () => import('./views/app-dialogs/app-dialogs.module').then(m => m.AppDialogsModule),
        data: { title: 'Dialogs', breadcrumb: 'DIALOGS' }
      },
      {
        path: 'profile',
        loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfileModule),
        data: { title: 'Profile', breadcrumb: 'PROFILE' }
      },
      {
        path: 'others',
        loadChildren: () => import('./views/others/others.module').then(m => m.OthersModule),
        data: { title: 'Others', breadcrumb: 'OTHERS' }
      },
      {
        path: 'tables',
        loadChildren: () => import('./views/tables/tables.module').then(m => m.TablesModule),
        data: { title: 'Tables', breadcrumb: 'TABLES' }
      },
      {
        path: 'tour',
        loadChildren: () => import('./views/app-tour/app-tour.module').then(m => m.AppTourModule),
        data: { title: 'Tour', breadcrumb: 'TOUR' }
      },
      {
        path: 'forms',
        loadChildren: () => import('./views/forms/forms.module').then(m => m.AppFormsModule),
        data: { title: 'Forms', breadcrumb: 'FORMS' }
      },
      {
        path: 'chart',
        loadChildren: () => import('./views/chart-example-view/chart-example-view.module').then(m => m.ChartExampleViewModule),
        data: { title: 'Charts', breadcrumb: 'CHARTS' }
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/charts/charts.module').then(m => m.AppChartsModule),
        data: { title: 'Charts', breadcrumb: 'CHARTS' }
      },
      {
        path: 'map',
        loadChildren: () => import('./views/map/map.module').then(m => m.AppMapModule),
        data: { title: 'Map', breadcrumb: 'MAP' }
      },
      {
        path: 'dragndrop',
        loadChildren: () => import('./views/dragndrop/dragndrop.module').then(m => m.DragndropModule),
        data: { title: 'Drag and Drop', breadcrumb: 'DND' }
      },
      {
        path: 'inbox',
        loadChildren: () => import('./views/app-inbox/app-inbox.module').then(m => m.AppInboxModule),
        data: { title: 'Inbox', breadcrumb: 'INBOX' }
      },
      {
        path: 'calendar',
        loadChildren: () => import('./views/app-calendar/app-calendar.module').then(m => m.AppCalendarModule),
        data: { title: 'Calendar', breadcrumb: 'CALENDAR' }
      },
      {
        path: 'chat',
        loadChildren: () => import('./views/app-chats/app-chats.module').then(m => m.AppChatsModule),
        data: { title: 'Chat', breadcrumb: 'CHAT' }
      },
      {
        path: 'cruds',
        loadChildren: () => import('./views/cruds/cruds.module').then(m => m.CrudsModule),
        data: { title: 'CRUDs', breadcrumb: 'CRUDs' }
      },
      /*{
        path: 'shop', 
        loadChildren: () => import('./views/shop/shop.module').then(m => m.ShopModule), 
        data: { title: 'Shop', breadcrumb: 'SHOP'}
      },*/
      {
        path: 'search',
        loadChildren: () => import('./views/search-view/search-view.module').then(m => m.SearchViewModule)
      },
      {
        path: 'invoice',
        loadChildren: () => import('./views/invoice/invoice.module').then(m => m.InvoiceModule)
      },
      {
        path: 'todo',
        loadChildren: () => import('./views/todo/todo.module').then(m => m.TodoModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('./views/order/order.module').then(m => m.OrderModule),
        data: { title: 'Orders', breadcrumb: 'Orders' }
      },
      {
        path: 'page-layouts',
        loadChildren: () => import('./views/page-layouts/page-layouts.module').then(m => m.PageLayoutsModule)
      },
      {
        path: 'utilities',
        loadChildren: () => import('./views/utilities/utilities.module').then(m => m.UtilitiesModule)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/mat-icons/mat-icons.module').then(m => m.MatIconsModule),
        data: { title: 'Icons', breadcrumb: 'MATICONS' }
      },
      {
        path: 'admin-purchase',
        loadChildren: () => import('./components/admin-purchase/admin-purchase.module').then(m => m.AdminPurchaseModule),
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'sessions/404'
  }
];

