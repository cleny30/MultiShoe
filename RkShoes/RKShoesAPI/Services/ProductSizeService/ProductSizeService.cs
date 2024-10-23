using RKShoesAPI.IRepository.IProductSizeRepository;
using RKShoesAPI.Models.Pages.Product;
using RKShoesAPI.Repository.ProductRepository;
using RKShoesAPI.Repository.ProductSizeRepository;

namespace RKShoesAPI.Services.ProductSize
{
    public class ProductSizeService
    {
        private readonly IProductSizeRepository _productSizeRepository;
        public ProductSizeService()
        {
            _productSizeRepository = new ProductSizeRepository();
        }

        public List<ProductSizeModel> GetProductSize() {
            return _productSizeRepository.GetProductSize();
        }
        public List<ProductSizeModel> GetProductSizeForProduct(string proId)
        {
            List<ProductSizeModel> sizes = GetProductSize();
            ProductRepository productRepository = new ProductRepository();

            var product = productRepository.GetProductById(proId);
            var productSizes = sizes.Where(size => size.ProId == proId).ToList();
            product.Size = productSizes.Select(size => size.Size).ToList();

            return productSizes;
        }
    }
}
