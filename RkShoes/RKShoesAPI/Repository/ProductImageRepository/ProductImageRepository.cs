using ISUZU_NEXT.Server.Core.Extentions;
using RKShoesAPI.IRepository.IProductImageRepository;
using RKShoesAPI.Models.Entities;
using RKShoesAPI.Models.Pages.Product;

namespace RKShoesAPI.Repository.ProductImageRepository
{
    public class ProductImageRepository : IProductImageRepository
    {
        public List<ProductImageModel> GetProductImage()
        {
            List<ProductImage> productImage = AppDbContext.Instance.ProductImage.ToList();
            List<ProductImageModel> productImageModels = new List<ProductImageModel>();

            foreach (var o in productImage)
            {
                ProductImageModel data = new ProductImageModel();
                data.CopyProperties(o);
                productImageModels.Add(data);
            }
            return productImageModels;
        }
    }
}
