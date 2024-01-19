//---------------------------------------------------------------------------------------------------------------------
using System.Reflection;
using Lotus.Account;
using Lotus.Web;
//---------------------------------------------------------------------------------------------------------------------

var builder = WebApplication.CreateBuilder(args);

//
// Базовые сервисы для работы
//
builder.Services.AddCors(x => x.AddDefaultPolicy(builder => builder
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowAnyOrigin()));
builder.Services.AddOptions();
builder.Services.AddHttpContextAccessor();

//
// Сервисы контролеров и сессии
//
builder.Services.AddControllers();
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession();

//
// Сервисы базы данных
//
builder.Services.AddLotusCommonServices();
builder.Services.AddLotusAccountDatabaseServices(builder.Configuration);

//
// Сервисы аутентификации и авторизации
//
builder.Services.AddAuthentication();
builder.Services.AddAuthorization();
builder.Services.AddLotusAccountServices();
builder.Services.AddLotusAccountOpenIddictServices(null);
builder.Services.AddLotusPermissionsExtension();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
	var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
	options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
});

var app = builder.Build();

//---------------------------------------------------------------------------------------------------------------------
//
// Конфигурация конвейера обработки запроса
//
//---------------------------------------------------------------------------------------------------------------------
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
	app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Error");

    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseSession();

app.UseCors();

app.UseRouting();

app.UseAuthentication();

app.UseAuthorization();

app.UseWebSockets();

await app.InitLotusAccountDatabase();

#pragma warning disable ASP0014
app.UseEndpoints(configure: endpoints =>
{
	endpoints.MapControllers();
	endpoints.MapFallbackToFile("index.html");
});
#pragma warning restore ASP0014

app.Run();
