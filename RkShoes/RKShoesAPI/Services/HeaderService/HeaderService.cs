using RKShoesAPI.Models.Pages.Header;
using RKShoesAPI.Services.Brand;
using RKShoesAPI.Services.Category;
using RKShoesAPI.Services.Product;

namespace RKShoesAPI.Services.HeaderService
{
    public class HeaderService
    {
        public HeaderModel GetData()
        {
            ProductService productService = new ProductService();
            BrandService brandService = new BrandService();
            CategoryService categoryService = new CategoryService();
            var listPro = productService.GetProducts();

            var model = new HeaderModel
            {
                products = listPro,
                brand = brandService.GetBrands(),
                category = categoryService.GetCategories(),
            };
            return model;
        }
    }
}
