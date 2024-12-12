import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
})
export class PopupComponent {
  // Propiedad para controlar la visibilidad del popup
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();

  // Método para cerrar el popup
  closePopup() {
    this.close.emit();
  }
}
