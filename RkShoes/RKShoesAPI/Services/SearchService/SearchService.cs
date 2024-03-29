using RKShoesAPI.Models.Pages.Product;
using RKShoesAPI.Models.Pages.Search;
using RKShoesAPI.Services.Brand;
using RKShoesAPI.Services.Category;
using RKShoesAPI.Services.Product;

namespace RKShoesAPI.Services.SearchService
{
    public class SearchService
    {
        public SearchModel GetData(string searchTerm)
        {
            ProductService productService = new ProductService();
            BrandService brandService = new BrandService();
            CategoryService categoryService = new CategoryService();
            var listPro = productService.GetProducts();

            var model = new SearchModel
            {
                products = listPro,
                product = listPro.Where(product => product.ProName.Contains(searchTerm, StringComparison.OrdinalIgnoreCase)).ToList(),
                brand = brandService.GetBrands(),
                category = categoryService.GetCategories(),
                saleAmount = productService.GetProducts().Count(p => p.Discount > 0),

            };
            return model;
        }
    }
}
