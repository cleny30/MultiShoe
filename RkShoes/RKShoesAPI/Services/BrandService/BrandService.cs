using RKShoesAPI.IRepository.IBrandRepository;
using RKShoesAPI.Models.Pages.Brand;
using RKShoesAPI.Repository.BrandRepository;
using RKShoesAPI.Services.Product;
using RKShoesAPI.Services.Review;

namespace RKShoesAPI.Services.Brand
{
    public class BrandService
    {
        private readonly IBrandRepository _brandRepository;
        public BrandService()
        {
            _brandRepository = new BrandRepository();
        }
        public List<BrandModel> GetBrands()
        {
            ProductService _productService = new ProductService();
            List<BrandModel> brands = _brandRepository.GetBrands();
            var list = _productService.GetProducts();

            foreach (BrandModel brand in brands)
            {
                brand.AmountProduct = list.Count(pro => pro.BrandId == brand.BrandId);
            }
            return brands;
        }
        public BrandModel GetBrandNameByBrandId(int id)
        {
            return _brandRepository.GetBrandById(id);
        }
    }
}
