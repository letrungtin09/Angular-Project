import { Routes } from '@angular/router';
import { HomeComponent } from './pages/site/home/home.component';
import { DetailProductComponent } from './pages/site/detail-product/detail-product.component';
import { AllProductComponent } from './pages/site/all-product/all-product.component';
import { DetailCategoryComponent } from './pages/site/detail-category/detail-category.component';
import { CartComponent } from './pages/site/cart/cart.component';
import { SearchProductComponent } from './pages/site/search-product/search-product.component';
import { LoginComponent } from './pages/site/login/login.component';
import { RegisterComponent } from './pages/site/register/register.component';
import { ForgotPasswordComponent } from './pages/site/forgot-password/forgot-password.component';
import { AdminCateComponent } from './pages/admin/admin-cate/admin-cate.component';
import { AdminProductComponent } from './pages/admin/admin-product/admin-product.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { FormAddCateComponent } from './pages/admin/form-add-cate/form-add-cate.component';
import { FormAddPDComponent } from './pages/admin/form-add-pd/form-add-pd.component';
import { FormUpdateCateComponent } from './pages/admin/form-update-cate/form-update-cate.component';
import { FormUpdatePDComponent } from './pages/admin/form-update-pd/form-update-pd.component';
import { PayComponent } from './pages/site/pay/pay.component';
import { OrderHistoryComponent } from './pages/site/order-history/order-history.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  { path: 'allProduct', component: AllProductComponent, title: 'All Product' },
  {
    path: 'detailProduct/:id/:idCate',
    component: DetailProductComponent,
    title: 'Detail Product',
  },
  {
    path: 'detailCategory/:id',
    component: DetailCategoryComponent,
    title: 'Detail Category',
  },
  {
    path: 'searchProduct/:keyword',
    component: SearchProductComponent,
    title: 'Search Product',
  },
  { path: 'cart', component: CartComponent, title: 'Cart' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'register', component: RegisterComponent, title: 'Register' },
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent,
    title: 'Forgot Password',
  },
  {
    path: 'pay',
    component: PayComponent,
    title: 'Pay Cart',
  },
  {
    path: 'orderHistory',
    component: OrderHistoryComponent,
    title: 'Order History',
  },
  {
    path: 'admin',
    component: DashboardComponent,
    title: 'Dashboard Admin',
    canActivate: [AuthGuard],
  },
  {
    path: 'adminCate',
    component: AdminCateComponent,
    title: 'Admin Category',
    canActivate: [AuthGuard],
  },
  {
    path: 'adminProduct',
    component: AdminProductComponent,
    title: 'Admin Product',
    canActivate: [AuthGuard],
  },
  {
    path: 'formAddCate',
    component: FormAddCateComponent,
    title: 'Add Category',
    canActivate: [AuthGuard],
  },
  {
    path: 'formAddPd',
    component: FormAddPDComponent,
    title: 'Add Product',
    canActivate: [AuthGuard],
  },
  {
    path: 'formUpdateCate/:id',
    component: FormUpdateCateComponent,
    title: 'Update Category',
    canActivate: [AuthGuard],
  },
  {
    path: 'formUpdatePd/:id',
    component: FormUpdatePDComponent,
    title: 'Update Product',
    canActivate: [AuthGuard],
  },
];
