using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back.Models;
using Microsoft.EntityFrameworkCore;

namespace back.Data.Seeds
{
    public static class ModelBuilderExtensions
    {
        public static void Seeds(this ModelBuilder modelBuilder)
        {
            // Semillas para Categorías
            modelBuilder.Entity<Categoria>().HasData(
                new Categoria { Id = 1, Nombre = "Camisas", Descripcion = "Diversas camisas para hombre y mujer." },
                new Categoria { Id = 2, Nombre = "Pantalones", Descripcion = "Pantalones, jeans y chinos para todas las ocasiones." },
                new Categoria { Id = 3, Nombre = "Chaquetas", Descripcion = "Chaquetas de cuero, lana, y más para todo tipo de clima." },
                new Categoria { Id = 4, Nombre = "Sombreros", Descripcion = "Sombreros y gorras para el sol y el estilo." },
                new Categoria { Id = 5, Nombre = "Zapatos", Descripcion = "Zapatos y calzado de cuero, deportivos, casuales y formales." }
            );

            // Semillas para Productos
            modelBuilder.Entity<Producto>().HasData(
                new Producto { Id = 1, CategoriaId = 1, Nombre = "Camisa de algodón", Precio = 25.99m, Descripcion = "Camisa básica de algodón para hombre, talla M." },
                new Producto { Id = 2, CategoriaId = 2, Nombre = "Pantalones de mezclilla", Precio = 49.99m, Descripcion = "Pantalones de mezclilla, corte regular, color azul." },
                new Producto { Id = 3, CategoriaId = 3, Nombre = "Chaqueta de cuero", Precio = 120.00m, Descripcion = "Chaqueta de cuero genuino, estilo moto, color negro." },
                new Producto { Id = 4, CategoriaId = 4, Nombre = "Sombrero de paja", Precio = 19.99m, Descripcion = "Sombrero de paja para el verano, color beige." },
                new Producto { Id = 5, CategoriaId = 5, Nombre = "Zapatos de cuero", Precio = 89.99m, Descripcion = "Zapatos de cuero para hombre, color marrón, talla 42." }
            );
        }
    }
}