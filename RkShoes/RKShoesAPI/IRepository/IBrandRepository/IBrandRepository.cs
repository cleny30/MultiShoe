using RKShoesAPI.Models.Pages.Brand;

namespace RKShoesAPI.IRepository.IBrandRepository
{
    public interface IBrandRepository
    {
        public List<BrandModel> GetBrands();
        public BrandModel GetBrandById(int id);
    }
}
