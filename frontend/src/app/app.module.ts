import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ToastComponent } from './components/toast/toast.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FilterPanelComponent } from './components/filter-panel/filter-panel.component';

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
import { FavoritesPage } from './pages/favorites/favorites.page';
import { OrderDetailPage } from './pages/order-detail/order-detail.page';
import { ProductImagePipe } from './pipes/product-image.pipe';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        FooterComponent,
        SidebarComponent,
        LoaderComponent,
        ToastComponent,
        ProductCardComponent,
        SearchBarComponent,
        FilterPanelComponent,
        HomePage,
        LoginPage,
        RegisterPage,
        ForgotPasswordPage,
        CatalogPage,
        ProductDetailPage,
        CartPage,
        CheckoutPage,
        ProfilePage,
        OrdersPage,
        AdminDashboardPage,
        AdminProductsPage,
        AdminCategoriesPage,
        AdminBrandsPage,
        AdminUsersPage,
        AdminOrdersPage,
        AdminInventoryPage,
        AdminReportsPage,
        FavoritesPage,
        OrderDetailPage,
        ProductImagePipe
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
