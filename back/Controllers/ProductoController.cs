using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using back.Data;
using back.Dtos;
using back.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductoController:ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        public ProductoController(AppDbContext context,IMapper mapper)
        {
           _context = context;
           _mapper = mapper; 
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var productos = await _context.Productos.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<ProductoDto>>(productos));
        }

        [HttpPost]
        public async Task<IActionResult> Create(ProductoDto productoDto)
        {
            var producto = _mapper.Map<Producto>(productoDto);
            _context.Productos.Add(producto);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = producto.Id }, _mapper.Map<ProductoDto>(producto));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var producto = await _context.Productos.FindAsync(id);
            if (producto == null) return NotFound();
            return Ok(_mapper.Map<ProductoDto>(producto));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, ProductoDto productoDto)
        {
            if (id != productoDto.Id) return BadRequest();
            var producto = await _context.Productos.FindAsync(id);
            if (producto == null) return NotFound();

            _mapper.Map(productoDto, producto);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var producto = await _context.Productos.FindAsync(id);
            if (producto == null) return NotFound();

            _context.Productos.Remove(producto);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}