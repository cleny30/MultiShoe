using Microsoft.EntityFrameworkCore;
using RKShoesAPI.IRepository.IProductRepository;
using RKShoesAPI.Models.Entities;
using RKShoesAPI.Models.Pages.Product;
using RKShoesAPI.Repository.ProductRepository;
using RKShoesAPI.Services.Brand;
using RKShoesAPI.Services.Category;
using RKShoesAPI.Services.ProductImage;
using RKShoesAPI.Services.ProductSize;
using RKShoesAPI.Services.Review;
namespace RKShoesAPI.Services.Product
{
    public class ProductService
    {
        private readonly IProductRepository _productRepository;
        public ProductService()
        {
            _productRepository = new ProductRepository();
        }
        public List<ProductModel> GetProducts()
        {
            ProductImageService _productImageService = new ProductImageService();
            ProductSizeService _productSizeService = new ProductSizeService();
            List<ProductModel> products = _productRepository.GetProduct();
            List<ProductImageModel> imgs = _productImageService.GetProductImage();
            List<ProductSizeModel> sizes = _productSizeService.GetProductSize();

            foreach (ProductModel product in products)
            {
                product.ProImg = imgs
                       .Where(img => img.ProId == product.ProId)
                       .Select(img => img.ProImg)
                       .ToList();
                product.Size = sizes.Where(size => size.ProId == product.ProId)
                        .Select(size => size.Size)
                        .ToList();
            }
            return products;
        }
        public List<ProductModel> GetProductByCateId(int cateId)
        {
            ProductImageService _productImageService = new ProductImageService();
            var list = _productRepository.GetProductByCateId(cateId);
            foreach (var proCate in list)
            {
                proCate.ProImg = _productImageService.GetProductImageForProduct(proCate.ProId).Select(img => img.ProImg).ToList();
            }
            return list;
        }
        public List<ProductModel> GetProductWithSameCateId(int cateId, string proId)
        {
            ProductImageService _productImageService = new ProductImageService();

            var proCateList = GetProductByCateId(cateId).Where(p => p.ProId != proId).ToList();

            return proCateList;
        }
        public ProductModel GetProductById(string proId)
        {
            ProductImageService _productImageService = new ProductImageService();
            ProductSizeService _productSizeService = new ProductSizeService();
            List<ProductImageModel> imgs = _productImageService.GetProductImageForProduct(proId);
            List<ProductSizeModel> sizes = _productSizeService.GetProductSizeForProduct(proId);

            var product = _productRepository.GetProductById(proId);
            product.ProImg = product.ProImg = imgs.Select(img => img.ProImg).ToList();
            product.Size = product.Size = sizes.Select(s => s.Size).ToList();

            return product;
        }
        public ProductDetailModel GetProductDetail(string proId)
        {
            ReviewService reviewService = new ReviewService();
            BrandService brandService = new BrandService();
            CategoryService categoryService = new CategoryService();
            var reviews = reviewService.GetReviewsByProId(proId);
            var product = GetProductById(proId);

            float ratingAverage = 0;
            if (reviews.Any())
            {
                ratingAverage = (float)reviews.Average(r => r.Rating);
            }
            product.RatingAverage = (float)Math.Round(ratingAverage, 1);

            var productDetailModel = new ProductDetailModel
            {
                productList = GetProducts(),
                Product = product,
                BrandModel = brandService.GetBrandNameByBrandId(product.BrandId),
                Pro_cate = GetProductWithSameCateId(product.CateId, proId),
                Reviews = reviews,
                Category = categoryService.GetCategories(),
                ReviewCount = reviewService.GetReviewCountByProductID(proId),
                RatingDistribution = reviewService.GetRatingDistribution(proId),
                Brand = brandService.GetBrands()
            };
            return productDetailModel;
        }
        public void AddProduct(ProductModel product)
        {
            string newProId = GetNewProductID(product.CateId);
            product.ProId = newProId;
            _productRepository.AddProduct(product);
        }
        public void UpdateProduct(ProductModel updatedProduct)
        {
            _productRepository.UpdateProduct(updatedProduct);
        }
        public void DeleteProduct(string productId)
        {
            _productRepository.DeleteProduct(productId);
        }
        public string GetNewProductID(int cateId)
        {
            return _productRepository.GetNewProductID(cateId);
        }
        public bool UpdateQuantityProduct(ProductModel product)
        {
            return _productRepository.UpdateQuantityProduct(product);
        }
    }
}

