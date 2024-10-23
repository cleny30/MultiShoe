using RKShoesAPI.Models.Pages.Brand;
using RKShoesAPI.Models.Pages.Category;
using RKShoesAPI.Models.Pages.Product;

namespace RKShoesAPI.Models.Pages.Shop
{
    public class ShopModel
    {
        public List<ProductModel>? product { get; set; }
        public List<BrandModel>? brand { get; set; }
        public List<CategoryModel>? category { get; set; }
        public int saleAmount { get; set; }
    }
}
