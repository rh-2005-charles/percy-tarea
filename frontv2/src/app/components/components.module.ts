import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { ButtonComponent } from './button/button.component';
import { PopupComponent } from './popup/popup.component';



@NgModule({
  declarations: [
    CardComponent,
    ButtonComponent,
    PopupComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardComponent,
    ButtonComponent,
    PopupComponent  // Exportamos los componentes para que otros módulos puedan usarlos
  ]
})
export class ComponentsModule { }
