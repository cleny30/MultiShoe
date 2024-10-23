using RKShoesAPI.Models.Pages.Product;

namespace RKShoesAPI.IRepository.IProductSizeRepository
{
    public interface IProductSizeRepository
    {
        public List<ProductSizeModel> GetProductSize();
    }
}
