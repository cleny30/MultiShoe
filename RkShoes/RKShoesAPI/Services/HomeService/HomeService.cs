using RKShoesAPI.Constants;
using RKShoesAPI.Models.Pages.Home;
using RKShoesAPI.Services.Brand;
using RKShoesAPI.Services.Category;
using RKShoesAPI.Services.Product;

namespace RKShoesAPI.Services.HomeService
{
    public class HomeService
    {
        public HomeModel GetData(int deviceType)
        {
            ProductService productService = new ProductService();
            BrandService brandService = new BrandService();
            CategoryService categoryService = new CategoryService();
            var listPro = productService.GetProducts();

            var takeCount = deviceType == 0 ? (int)DeviceType.PCTakeCount : (int)DeviceType.MobileTakeCount;

            var model = new HomeModel
            {
                products = listPro,
                feature = listPro.Take(takeCount).ToList(),
                sneaker = productService.GetProductByCateId((int)CategoryType.Sneaker).Take(takeCount).ToList(),
                sandal = productService.GetProductByCateId((int)CategoryType.Sandal).Take(takeCount).ToList(),
                brand = brandService.GetBrands(),
                category = categoryService.GetCategories(),
            };
            return model;
        }
    }
}
