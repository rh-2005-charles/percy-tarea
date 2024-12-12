import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './pages/layout/layout.component';
import { LandingComponent } from './pages/landing/landing.component';
import { PublicRoutingModule } from './public-routing.module';
import { HomeComponent } from './pages/home/home.component';



@NgModule({
  declarations: [
    LayoutComponent,
    LandingComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
