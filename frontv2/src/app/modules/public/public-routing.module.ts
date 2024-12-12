import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { LandingComponent } from './pages/landing/landing.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
      { path: '', component: LandingComponent },  // Ruta principal (Landing)
      { path: 'home', component: HomeComponent }  // Ruta para Home
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
