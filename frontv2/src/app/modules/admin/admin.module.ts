import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CategoriesComponent } from './pages/categories/categories.component';
import { DiscountsComponent } from './pages/discounts/discounts.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Para el uso de [(ngModel)]
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    LayoutComponent,
    DashboardComponent,
    ProductsComponent,
    CategoriesComponent,
    DiscountsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
})
export class AdminModule {}
