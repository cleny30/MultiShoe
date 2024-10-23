using RKShoesAPI.Models.Pages.Brand;
using RKShoesAPI.Models.Pages.Category;
using RKShoesAPI.Models.Pages.Review;

namespace RKShoesAPI.Models.Pages.Product
{
    public class ProductDetailModel
    {
        public List<ProductModel> productList { get; set; }
        public ProductModel? Product { get; set; }
        public BrandModel? BrandModel { get; set; }
        public List<ProductModel>? Pro_cate { get; set; }
        public List<ReviewModel>? Reviews { get; set; }
        public List<CategoryModel>? Category { get; set; }
        public List<BrandModel>? Brand { get;set; }
        public int ReviewCount { get; set; }
        public List<RatingDistribution>? RatingDistribution { get; set; }
    }
}
