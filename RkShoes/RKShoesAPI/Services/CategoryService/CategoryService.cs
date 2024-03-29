using RKShoesAPI.IRepository.ICategoryRepository;
using RKShoesAPI.Models.Pages.Category;
using RKShoesAPI.Repository.CategoryRepository;
using RKShoesAPI.Services.Product;

namespace RKShoesAPI.Services.Category
{
    public class CategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly ProductService _productService;
        public CategoryService()
        {
            _categoryRepository = new CategoryRepository();
            _productService = new ProductService();
        }
        public List<CategoryModel> GetCategories()
        {
            ProductService _productService = new ProductService();
            List<CategoryModel> categoryList = _categoryRepository.GetCategories();
            var list = _productService.GetProducts();
            foreach (CategoryModel category in categoryList)
            {
                category.AmountProduct = list.Count(pro => pro.CateId == category.CateId);
            }
            return categoryList;
        }

    }
}
