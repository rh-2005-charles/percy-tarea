import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { DiscountsComponent } from './pages/discounts/discounts.component';

const routes: Routes = [
  {path:'', component:LayoutComponent, children:[
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redirección automática a dashboard
    {path:'dashboard',component:DashboardComponent},
    {path:'product',component:ProductsComponent},
    {path:'category',component:CategoriesComponent},
    {path:'discount',component:DiscountsComponent},
    { path: '**', redirectTo: 'dashboard' }  // Redirige a la raíz del layout (a Dashboard por defecto)
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
