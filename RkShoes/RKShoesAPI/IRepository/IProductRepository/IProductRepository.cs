using RKShoesAPI.Models.Entities;
using RKShoesAPI.Models.Pages.Product;

namespace RKShoesAPI.IRepository.IProductRepository
{
    public interface IProductRepository
    {
        public List<ProductModel> GetProduct();
        public ProductModel GetProductById(string id);
        public List<ProductModel> GetProductByCateId(int cateId);
        public void AddProduct(ProductModel product);
        public void UpdateProduct(ProductModel updatedProduct);
        public void DeleteProduct(string productId);
        public string GetNewProductID(int cateId);
        public bool UpdateQuantityProduct(ProductModel productModel);
    }
}
