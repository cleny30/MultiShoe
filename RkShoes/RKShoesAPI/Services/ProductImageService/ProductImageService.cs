using RKShoesAPI.IRepository.IProductImageRepository;
using RKShoesAPI.Models.Entities;
using RKShoesAPI.Models.Pages.Product;
using RKShoesAPI.Repository.ProductImageRepository;
using RKShoesAPI.Repository.ProductRepository;

namespace RKShoesAPI.Services.ProductImage
{
    public class ProductImageService
    {
        
        private readonly IProductImageRepository _productImageRepository;
        public ProductImageService()
        {
            _productImageRepository = new ProductImageRepository();
        }

        public List<ProductImageModel> GetProductImage()
        {
            return _productImageRepository.GetProductImage();
        }
        public List<ProductImageModel> GetProductImageForProduct(string proId)
        {
            List<ProductImageModel> imgs = GetProductImage();
            ProductRepository productRepository = new ProductRepository();

            var product = productRepository.GetProductById(proId);
            var productImages = imgs.Where(img => img.ProId == proId).ToList();
            product.ProImg = productImages.Select(img => img.ProImg).ToList();

            return productImages;
        }
    }
}
