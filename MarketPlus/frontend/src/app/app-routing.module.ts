import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

import { HomePage } from './pages/home/home.page';
import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';
import { ForgotPasswordPage } from './pages/forgot-password/forgot-password.page';
import { CatalogPage } from './pages/catalog/catalog.page';
import { ProductDetailPage } from './pages/product-detail/product-detail.page';
import { CartPage } from './pages/cart/cart.page';
import { CheckoutPage } from './pages/checkout/checkout.page';
import { ProfilePage } from './pages/profile/profile.page';
import { OrdersPage } from './pages/orders/orders.page';
import { AdminDashboardPage } from './pages/admin/dashboard/dashboard.page';
import { AdminProductsPage } from './pages/admin/products/products.page';
import { AdminCategoriesPage } from './pages/admin/categories/categories.page';
import { AdminBrandsPage } from './pages/admin/brands/brands.page';
import { AdminUsersPage } from './pages/admin/users/users.page';
import { AdminOrdersPage } from './pages/admin/orders/orders.page';
import { AdminInventoryPage } from './pages/admin/inventory/inventory.page';
import { AdminReportsPage } from './pages/admin/reports/reports.page';

const routes: Routes = [
    { path: '', component: HomePage },
    { path: 'login', component: LoginPage },
    { path: 'register', component: RegisterPage },
    { path: 'forgot-password', component: ForgotPasswordPage },
    { path: 'catalogo', component: CatalogPage },
    { path: 'producto/:slug', component: ProductDetailPage },
    { path: 'carrito', component: CartPage },
    { path: 'checkout', component: CheckoutPage, canActivate: [AuthGuard] },
    { path: 'mi-perfil', component: ProfilePage, canActivate: [AuthGuard] },
    { path: 'mis-pedidos', component: OrdersPage, canActivate: [AuthGuard] },
    { path: 'admin', component: AdminDashboardPage, canActivate: [AdminGuard] },
    { path: 'admin/productos', component: AdminProductsPage, canActivate: [AdminGuard] },
    { path: 'admin/categorias', component: AdminCategoriesPage, canActivate: [AdminGuard] },
    { path: 'admin/marcas', component: AdminBrandsPage, canActivate: [AdminGuard] },
    { path: 'admin/usuarios', component: AdminUsersPage, canActivate: [AdminGuard] },
    { path: 'admin/pedidos', component: AdminOrdersPage, canActivate: [AdminGuard] },
    { path: 'admin/inventario', component: AdminInventoryPage, canActivate: [AdminGuard] },
    { path: 'admin/reportes', component: AdminReportsPage, canActivate: [AdminGuard] },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot({ scrollPositionRestoration: 'top' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
