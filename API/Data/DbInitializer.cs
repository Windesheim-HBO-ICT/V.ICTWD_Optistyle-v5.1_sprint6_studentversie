using API.Models;

namespace API.Data
{
    public static class DbInitializer
    {
        public static void Seed(OptistyleDbContext context)
        {
            if (!context.Glasses.Any())
            {
                context.Glasses.AddRange(
                    new Glasses
                    {
                        SKU = 1,
                        Name = "Moderne ronde bril",
                        Price = 129,
                        ImageUrl = "image/products/bril2.jpg",
                        ImageAlt = "Moderne ronde bril met een overwegend dun montuur en middelgrote ronde glazen. Het montuur is subtiel en de kleur is licht blauwgrijs en enigszins doorzichtig, waardoor de bril een eigentijdse en vriendelijke uitstraling heeft.",
                        Description = "Een moderne ronde bril, perfect voor een eigentijdse look."
                    },
                    new Glasses
                    {
                        SKU = 2,
                        Name = "Stijlvolle zwarte bril",
                        Price = 99,
                        ImageUrl = "image/products/bril1.jpg",
                        ImageAlt = "De bril heeft een volledig zwart, glanzend, kunststof montuur met rond-ovale glazen. Het montuur is tussen dik en dun in en heeft een stijlvolle zakelijke uitstraling. Door de kleur en de dikte van het montuur is de bril minder geschikt voor mensen met een hele lichte huid- en haarkleur.",
                        Description = "Stijlvolle zwarte bril voor een zakelijke look."
                    },
                    new Glasses
                    {
                        SKU = 3,
                        Name = "Trendy aviator bril",
                        Price = 149,
                        ImageUrl = "image/products/bril3.jpg",
                        ImageAlt = "Trendy bril met een dun, metalen montuur in goudkleur en grote, lichtbruine glazen. De bril heeft een dubbele neusbrug en brede pootjes, wat zorgt voor een stoere en retro uitstraling. De glazen zijn rechthoekig tot ovaal.",
                        Description = "Trendy aviator bril voor een stoere retro look."
                    }
                );
                context.SaveChanges();
            }
        }
    }
}