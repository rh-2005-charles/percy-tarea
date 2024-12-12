import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class TableComponent<T> {
  cargaDatos: 'none' | 'loading' | 'done' | 'error' = 'none';
  createState: 'none' | 'loading' | 'done' | 'error' = 'none';
  tableData: T[] = [];
  //totalCount: number = 0;
  //pageNumber: number = 1;
  //pageSize: number = 20;
  selectedItem: T | null = null;
  isPopupVisible: boolean = false;
  popupTitle: string = '';
  actionType: 'create' | 'edit' | 'view' | 'delete' = 'create';
  form: FormGroup | any;

  constructor(protected fb: FormBuilder) {}

  // Método para cargar los datos, debe ser implementado en los componentes hijos
  loadItems(): void {
    // Lógica de carga de datos
  }

  // Método para mostrar el formulario en el popup
  showPopup(action: 'create' | 'edit' | 'view' | 'delete', item?: T): void {
    // Lógica para mostrar el popup según la acción
  }

  // Método para cerrar el popup
  hidePopup(): void {
    this.form.reset();
    this.isPopupVisible = false;
  }

  // Método para manejar el envío del formulario
  onSubmit(): void {
    if (this.form.valid) {
      // Lógica para enviar el formulario
    }
  }

  // Método para manejar la eliminación de un item
  confirmDelete(): void {
    // Lógica para eliminar un item
  }
}
