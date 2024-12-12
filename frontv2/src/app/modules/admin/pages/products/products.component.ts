import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table.component';
import { Product } from '../../../../shared/models/product';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../../../shared/services/products/product.service';
import { Category } from '../../../../shared/models/category';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent
  extends TableComponent<Product>
  implements OnInit
{
  selectedProduct: Product | null = null;
  categories: Category[] = []; // Array para almacenar las categorías
  isLoadingCategories = true; // Estado de carga de categorías

  constructor(fb: FormBuilder, private productService: ProductService) {
    super(fb);
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [''],
      categoryId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadItems();
    this.loadCategories(); // Cargar categorías al inicio
  }

  override loadItems(): void {
    this.cargaDatos = 'loading';
    this.productService.getProducts().subscribe({
      next: (pagedResult: Product[]) => {
        console.log('Datos recibidos:', pagedResult);
        this.tableData = pagedResult;
        this.cargaDatos = 'done';
      },
      error: () => {
        console.error('Error al cargar los datos');
        this.cargaDatos = 'error';
      },
    });
  }

  // Método para cargar categorías
  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.isLoadingCategories = false;
      },
      error: () => {
        console.error('Error al cargar las categorías');
        this.isLoadingCategories = false;
      },
    });
  }

  /* // Actualizar la lista local de productos
  const index = this.tableData.findIndex((p) => p.id === product.id);
  if (index !== -1) {
    // Reemplazar el producto actualizado en la lista
    this.tableData[index] = product;
  } */

  getCategoryNameById(id: number): string {
    const category = this.categories.find((c) => c.id === id);
    return category ? category.nombre : 'Sin categoría'; // Devuelve el nombre o un valor por defecto
  }

  override showPopup(
    action: 'create' | 'edit' | 'view' | 'delete',
    product?: Product
  ): void {
    this.actionType = action;
    this.selectedProduct = product || null;

    super.showPopup(action, product);

    if (action === 'edit' && product) {
      this.form.patchValue({
        name: product.nombre,
        description: product.descripcion,
        price: product.precio,
        categoryId: product.categoriaId,
      });
    } else if (action === 'view' && product) {
      this.selectedProduct = product;
    }

    this.isPopupVisible = true;
    this.popupTitle =
      action === 'edit'
        ? 'Editar Producto'
        : action === 'create'
        ? 'Crear Producto'
        : action === 'view'
        ? 'Ver Producto'
        : 'Eliminar Producto';
  }

  override onSubmit(): void {
    if (this.form.valid) {
      const product: Product = {
        id: this.selectedProduct?.id || 0,
        nombre: this.form.get('name')?.value,
        descripcion: this.form.get('description')?.value,
        precio: Number(this.form.get('price')?.value),
        categoriaId: this.form.get('categoryId')?.value,
      };

      this.createState = 'loading';

      if (this.actionType === 'edit' && this.selectedProduct) {
        this.productService.updateProduct(product.id, product).subscribe({
          next: () => {
            console.log('Producto actualizado con éxito');
            this.createState = 'done';
            this.hidePopup();
            // Recargar productos desde el backend para asegurarte de que los datos sean consistentes.
            this.loadItems();
          },
          error: () => {
            console.error('Error al actualizar el producto');
            this.createState = 'error';
          },
        });
      } else if (this.actionType === 'create') {
        this.productService.createProduct(product).subscribe({
          next: (data) => {
            this.createState = 'done';
            this.tableData.push(data);
            this.loadItems();
            this.hidePopup();
          },
          error: () => {
            console.error('Error al crear el producto');
            this.createState = 'error';
          },
        });
      } else {
        console.error('Formulario no válido o acción no soportada');
      }
    }
  }

  override confirmDelete(): void {
    if (this.selectedProduct) {
      this.productService.deleteProduct(this.selectedProduct.id).subscribe({
        next: () => {
          this.tableData = this.tableData.filter(
            (product) => product.id !== this.selectedProduct?.id
          );
          this.hidePopup();
        },
        error: () => {
          console.error('Error al eliminar el producto');
        },
      });
    } else {
      console.error('No hay producto seleccionado para eliminar');
    }
  }
}
