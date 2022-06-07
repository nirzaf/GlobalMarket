using GlobalMarketAPI.Settings;
using GlobalMarketAPI.Services;

var builder = WebApplication.CreateBuilder(args);
ConfigurationManager configuration = builder.Configuration;
// Add services to the container.
builder.Services.AddTransient(p =>
{
    YahooFinanceSettings settings = configuration.GetSection(nameof(YahooFinanceSettings)).Get<YahooFinanceSettings>();

    return settings;
});
builder.Services.AddTransient<IFinanceService, FinanceService>();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
