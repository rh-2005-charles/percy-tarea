import { Category } from './../../../../shared/models/category';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../shared/services/categories/category.service';
import { FormBuilder, Validators } from '@angular/forms';
import { PagedDto } from '../../../../shared/models/pagedDto';
import { TableComponent } from '../../../../shared/components/table.component'; // Importamos la clase base

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent
  extends TableComponent<Category>
  implements OnInit
{
  // Propiedades adicionales para manejar categorías seleccionadas
  selectedCategory: Category | null = null;
  //imagePreview: string | null = null; // Para previsualizar la imagen
  //selectedImage: File | null = null;

  constructor(fb: FormBuilder, private categoryService: CategoryService) {
    super(fb); // Llamamos al constructor de la clase base
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      imagePath: [null],
    });
  }

  ngOnInit(): void {
    this.loadItems(); // Usamos el método de la clase base para cargar datos
  }

  override loadItems(): void {
    this.cargaDatos = 'loading';
    this.categoryService
      .getCategories()
      .subscribe({
        next: (pagedResult: Category[]) => {
          console.log('Datos recibidos:', pagedResult); 
          this.tableData = pagedResult;

          console.log('Datos después de asignar:', this.tableData);
          
          this.cargaDatos = 'done';
        },
        error: () => {
          this.cargaDatos = 'error';
        },
      });
  }

  override showPopup(
    action: 'create' | 'edit' | 'view' | 'delete',
    category?: Category
  ): void {
    this.actionType = action; // Establecer el tipo de acción
    this.selectedCategory = category || null; // Si hay categoría, la asignamos

    super.showPopup(action, category); // Llamamos a la lógica de la clase base

    // Configurar el formulario dependiendo de la acción
    if (action === 'edit' && category) {
      //this.selectedCategory = category; // Asignamos la categoría seleccionada
      this.form.patchValue({
        name: category.nombre,
        description: category.descripcion,
        //imagePath: category.imagePath,
      });
      //this.imagePreview = category.imagePath;
    } else if (action === 'view' && category) {
      this.selectedCategory = category; // Asignamos la categoría seleccionada para mostrar detalles
    }

    this.isPopupVisible = true; // Mostrar el popup
    this.popupTitle =
      action === 'edit'
        ? 'Editar Categoría'
        : action === 'create'
        ? 'Crear Categoría'
        : action === 'view'
        ? 'Ver Categoría'
        : 'Eliminar Categoría';
  }

  // Método para manejar la selección de imagen
  /* onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      this.imagePreview = URL.createObjectURL(file); // Creamos una URL para previsualizar la imagen
    }
  } */

  override onSubmit(): void {
    if (this.form.valid) {
      const category: Category={
        id: this.selectedCategory?.id??0,
        nombre: this.form.get('name')?.value,
        descripcion: this.form.get('description')?.value,
        //imagePath: this.selectedImage?.name,
      }
      //formData.append('name', this.form.get('name')?.value);
      //formData.append('description', this.form.get('description')?.value);
  
      /* if (this.selectedImage) {
        formData.append('imagePath', this.selectedImage, this.selectedImage.name);
      } */
  
      this.createState = 'loading'; // Cambia el estado a "cargando"
  
      if (this.actionType === 'edit' && this.selectedCategory) {
        // Asegúrate de que se está enviando el ID correcto
        this.categoryService.updateCategory(this.selectedCategory.id, category).subscribe({
          next: () => {
            this.createState = 'done';
            this.loadItems();
            this.hidePopup();
          },
          error: () => {
            console.error("Error al actualizar la categoría");
            this.createState = 'error';
          },
        });
      } else if (this.actionType === 'create') {
        this.categoryService.createCategory(category).subscribe({
          next: (data) => {
            this.createState = 'done';
            this.tableData.push(data);
            this.loadItems();
            this.hidePopup();
          },
          error: () => {
            console.error("Error al crear la categoría");
            this.createState = 'error';
          },
        });
      } else {
        console.error("Formulario no válido o acción no soportada");
      }
    }
  }
  

  override confirmDelete(): void {
    if (this.selectedCategory) {
      this.categoryService.deleteCategory(this.selectedCategory.id).subscribe({
        next: () => {
          // Elimina la categoría de la lista local
          this.tableData = this.tableData.filter(
            (category) => category.id !== this.selectedCategory?.id
          );
          this.hidePopup(); // Oculta el popup
        },
        error: () => {
          console.error('Error al eliminar la categoría');
        },
      });
    } else {
      console.error('No hay categoría seleccionada para eliminar');
    }
  }
}
