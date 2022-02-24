using creditcardapplication.Data;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("CORSPolicy",
        builder =>
        {
            builder
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithOrigins("http://localhost:3000");
        });
});

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(swaggerGenOptions =>
{
    swaggerGenOptions.SwaggerDoc("v1", new OpenApiInfo { Title = "Credit Card App", Version = "v1" });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(swaggerUIOptions =>
{
    swaggerUIOptions.DocumentTitle = "Credit Card App";
    swaggerUIOptions.SwaggerEndpoint("/swagger/v1/swagger.json", "Web API.");
    swaggerUIOptions.RoutePrefix = string.Empty;
});

app.UseHttpsRedirection();

app.UseCors("CORSPolicy");

app.MapGet("/get-all-cards", async () => await CreditCardRepository.GetCreditCardsAsync()).WithTags("Cards Endpoints");

app.MapGet("/get-card-by-id/{cardId}", async (int cardId) =>
{
    CreditCard creditCard = await CreditCardRepository.GetCreditCardByIdAsync(cardId);

    if (creditCard != null)
    {
        return Results.Ok(creditCard);
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Cards Endpoints");

app.MapPost("/add-card", async (CreditCard cardId) =>
{
    bool cardAded = await CreditCardRepository.AddCreditCardsAsync(cardId);

    if (cardAded)
    {
        return Results.Ok("Card Added Successfully");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Cards Endpoints");

app.MapPut("/update-card", async (CreditCard cardId) =>
{
    bool cardUpdated = await CreditCardRepository.UpdateCreditCardsAsync(cardId);

    if (cardUpdated)
    {
        return Results.Ok("Card Updated Successfully");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Cards Endpoints");

app.MapDelete("/delete-card-by-id/{cardId}", async (int cardId) =>
{
    bool cardDeleted = await CreditCardRepository.DeleteCreditCardsAsync(cardId);

    if (cardDeleted)
    {
        return Results.Ok("Card Deleted Successfully");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Cards Endpoints");

app.Run();
