# Setup
Voer de volgende commando's uit in de **Package Manager Console** voordat je de API voor het eerst start.
Voor het aanmaken van de database optistyle.db: `update-database -Context OptistyleDbContext`
Voor het aanmaken van de authenticatie database auth.db:`update-database InitAuthDb -Context AuthDbContext`. 

Eventueel kun je via de **terminal** deze alternatieve commands gebruiken:
- `dotnet ef database update --project API --context OptistyleDbContext`
- `dotnet ef database update --project API --context AuthDbContext`

# Optistyle Database
De Optistyle database wordt automatisch geseed met enkele producten wanneer je de API voor het eerst start.
Je kunt de database bekijken met behulp van een SQLite/SQL Server Compact Toolbox of een soortgelijke tool.
SQLite/SQL Server Compact Toolbox moet je installeren als een extensie in Visual Studio.

# Auth Database
Deze database wordt niet automatisch geseed, dus je moet zelf een gebruiker aanmaken. De makkelijkste manier is
via de Swagger UI. Ga naar `POST /api/auth/register` en zet het volgende in de body om met die gegevens in te kunnen loggen:
`{ "email": "test@example.com", "password": "P@ssw0rd!" }`

# Bepalen wat anonieme/ingelogde bezoekers mogen zien
Doordat Identity ingeregeld is op de API, kunnen we kiezen wie we toegang geven tot endpoints (en dus tot de data).
De meest eenvoudige manier is basic authorization en dit volstaat voor nu. Door `[Authorize]` toe te voegen aan een
API controller of methode in de controller, kunnen we aangeven dat het endpoint alleen beschikbaar is voor authenticated 
entities. Een voorbeeld:

   `[ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class GlassesController : ControllerBase
    {
        ...`

Door dit attribuut toe te voegen zullen de brillen op de `/glasses` pagina alleen nog maar getoond worden als de gebruiker
ingelogd is. Als we de console log bekijken in DevTools, dan zie je dat we in dat geval een 401 unauthorized
terugkrijgen van de API. 

Dit voorbeeld toont aan dat authenticatie in de basis werkt. Uiteraard is dit niet in lijn met de requirement die 
stelt dat bezoekers zich moeten kunnen oriënteren op brillen, dus als het goed is tref je geen
`[Authorize]` attribuut aan in GlassesController. 😉
