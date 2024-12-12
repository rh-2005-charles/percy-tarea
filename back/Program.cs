using back.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();

// Configure your database connection string in appsettings.json
builder.Services.AddDbContext<AppDbContext>(options =>
{
    var useMySQL = builder.Configuration.GetValue<bool>("UseMySQL");
    if (useMySQL)
        options.UseMySql(builder.Configuration.GetConnectionString("MySQL"), ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("MySQL")));
    else
        options.UseSqlite(builder.Configuration.GetConnectionString("SQLite"));
});

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(Program));

// Configuración de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        // Asegúrate de reemplazar "http://localhost:4200" con la URL de tu frontend
        policy.WithOrigins("http://localhost:4200") // Frontend URL
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Usar CORS
app.UseCors("AllowFrontend");
app.UseHttpsRedirection();
app.MapControllers();


app.Run();

