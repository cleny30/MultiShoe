using RKShoesAPI.IRepository.IDeliveryAddressRepository;
using RKShoesAPI.Models.Entities;
using RKShoesAPI.Models.Pages.DeliveryAddress;
using RKShoesAPI.Repository.DeliveryAddressRepository;

namespace RKShoesAPI.Services.DeliveryAddressService
{
    public class DeliveryAddressService
    {
        private readonly IDeliveryAddressRepository _deliveryAddressRepository;
        public DeliveryAddressService()
        {
            _deliveryAddressRepository = new DeliveryAddressRepository();
        }
        public List<DeliveryAddressModel> GetAddressByUsername(string username)
        {
            return _deliveryAddressRepository.GetAddressByUsername(username);
        }
        public bool AddNewAddress(DeliveryAddressModel deliveryAddressModel)
        {

            var existingAddressItem = _deliveryAddressRepository.FindExistingAddressItem(deliveryAddressModel.UserName ,deliveryAddressModel.PhoneNumber, deliveryAddressModel.Address, deliveryAddressModel.Fullname);
            if (existingAddressItem != null)
            {
                return false; // address already exist 
            }
            else
            {
                int newestAddressId = AppDbContext.Instance.DeliveryAddress.OrderByDescending(a => a.Id).Select(a => a.Id).FirstOrDefault();
                deliveryAddressModel.Id = newestAddressId + 1;
                _deliveryAddressRepository.AddNewAddress(deliveryAddressModel);
                return true;
            }
        }
        public bool UpdateAddress(DeliveryAddressModel deliveryAddressModel)
        {
            var existingAddressItem = _deliveryAddressRepository.FindExistingAddressItem(deliveryAddressModel.UserName, deliveryAddressModel.PhoneNumber, deliveryAddressModel.Address, deliveryAddressModel.Fullname);
            if (existingAddressItem != null)
            {
                return false; // Address already exist 
            }
            else
            {
                _deliveryAddressRepository.UpdateAddress(deliveryAddressModel);
                return true;
            }
        }
        public bool DeleteAddress(string username, int id)
        {
            return _deliveryAddressRepository.DeleteAddress(username, id);
        }
        public List<DeliveryAddressModel> GetAddressListByUsername(string userName)
        {
            List<DeliveryAddressModel> AddressList = _deliveryAddressRepository.GetAddressByUsername(userName).OrderByDescending(address => address.isDefault).ToList();
            return AddressList;
        }
    }
}

