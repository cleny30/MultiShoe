using RKShoesAPI.Models.Pages.Brand;
using RKShoesAPI.Models.Pages.Category;
using RKShoesAPI.Models.Pages.Product;

namespace RKShoesAPI.Models.Pages.Home
{
    public class HomeModel
    {
        public List<ProductModel> products { get; set; }
        public List<ProductModel>? feature { get; set; }
        public List<ProductModel>? sneaker { get; set;}
        public List<ProductModel>? sandal { get; set; }
        public List<BrandModel>? brand { get; set; }
        public List<CategoryModel>? category { get; set; }
    }
}
