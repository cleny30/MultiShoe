using RKShoesAPI.Models.Pages.DeliveryAddress;

namespace RKShoesAPI.IRepository.IDeliveryAddressRepository
{
    public interface IDeliveryAddressRepository
    {
        public bool AddNewAddress(DeliveryAddressModel deliAddressModel);
        public List<DeliveryAddressModel> GetAddressByUsername(string username);
        public bool UpdateAddress(DeliveryAddressModel deliveryAddressModel);
        public bool DeleteAddress(string username, int id);
        public DeliveryAddressModel? FindExistingAddressItem(string username, string phoneNumber, string address, string fullname);
    }
}
