using RKShoesAPI.Models.Pages.Shop;
using RKShoesAPI.Services.Brand;
using RKShoesAPI.Services.Category;
using RKShoesAPI.Services.Product;

namespace RKShoesAPI.Services.Shop
{
    public class ShopService
    {
        public ShopModel GetData()
        {
            ProductService productService = new ProductService();
            BrandService brandService = new BrandService();
            CategoryService categoryService = new CategoryService();
            var model = new ShopModel
            {
                product = productService.GetProducts(),
                brand = brandService.GetBrands(),
                category = categoryService.GetCategories(),
                saleAmount = productService.GetProducts().Count(p => p.Discount > 0),
                
            };
            return model;
        }
    }
}
