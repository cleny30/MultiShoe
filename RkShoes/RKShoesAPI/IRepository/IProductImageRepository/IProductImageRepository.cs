using RKShoesAPI.Models.Entities;
using RKShoesAPI.Models.Pages.Product;

namespace RKShoesAPI.IRepository.IProductImageRepository
{
    public interface IProductImageRepository
    {
        public List<ProductImageModel> GetProductImage();
    }
}
