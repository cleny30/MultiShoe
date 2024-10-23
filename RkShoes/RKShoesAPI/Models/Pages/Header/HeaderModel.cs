using RKShoesAPI.Models.Pages.Brand;
using RKShoesAPI.Models.Pages.Category;
using RKShoesAPI.Models.Pages.Product;

namespace RKShoesAPI.Models.Pages.Header
{
    public class HeaderModel
    {
        public List<ProductModel> products { get; set; }
        public List<BrandModel>? brand { get; set; }
        public List<CategoryModel>? category { get; set; }

    }
}
