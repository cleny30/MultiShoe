using ISUZU_NEXT.Server.Core.Extentions;
using RKShoesAPI.IRepository.IProductSizeRepository;
using RKShoesAPI.Models.Entities;
using RKShoesAPI.Models.Pages.Product;

namespace RKShoesAPI.Repository.ProductSizeRepository
{
    public class ProductSizeRepository : IProductSizeRepository
    {
        public List<ProductSizeModel> GetProductSize()
        {
            List<ProductSize> productSize = AppDbContext.Instance.ProductSize.ToList();
            List<ProductSizeModel> productSizeModels = new List<ProductSizeModel>();

            foreach (var o in productSize)
            {
                ProductSizeModel data = new ProductSizeModel();
                data.CopyProperties(o);
                productSizeModels.Add(data);
            }
            return productSizeModels;
        }
    }
}
