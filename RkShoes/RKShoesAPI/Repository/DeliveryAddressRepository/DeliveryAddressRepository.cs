using ISUZU_NEXT.Server.Core.Extentions;
using RKShoesAPI.IRepository.IDeliveryAddressRepository;
using RKShoesAPI.Models.Entities;
using RKShoesAPI.Models.Pages.Cart;
using RKShoesAPI.Models.Pages.DeliveryAddress;

namespace RKShoesAPI.Repository.DeliveryAddressRepository
{
    public class DeliveryAddressRepository : IDeliveryAddressRepository
    {
        /// <summary>
        /// Method to Add new Address for customer
        /// </summary>
        /// <param name="deliAddressModel"></param>
        public bool AddNewAddress(DeliveryAddressModel deliAddressModel)
        {
            try
            {
                using (var dbContext = new AppDbContext())
                {
                    DeliveryAddress deliveryAddress = new DeliveryAddress();
                    deliveryAddress.CopyProperties(deliAddressModel);
                    dbContext.DeliveryAddress.Add(deliveryAddress);
                    dbContext.SaveChanges();
                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }
        /// <summary>
        /// Get User's address list 
        /// </summary>
        /// <param name="username"></param>
        /// <returns></returns>
        public List<DeliveryAddressModel> GetAddressByUsername(string username)
        {
            using (var context = new AppDbContext())
            {
                var addresses = context.DeliveryAddress.Where(c => c.UserName == username).ToList();
                List<DeliveryAddressModel> addressModels = new List<DeliveryAddressModel>();
                foreach (var address in addresses)
                {
                    var addressModel = new DeliveryAddressModel();
                    addressModel.CopyProperties(address);
                    addressModels.Add(addressModel);
                }
                return addressModels;
            }
        }
        /// <summary>
        /// Method use to check existed address in user's address list
        /// </summary>
        /// <param name="username"></param>
        /// <param name="phoneNumber"></param>
        /// <param name="address"></param>
        /// <param name="fullname"></param>
        /// <returns></returns>
        public DeliveryAddressModel? FindExistingAddressItem(string username,string phoneNumber, string address, string fullname)
        {
            using (var context = new AppDbContext())
            {
                var deliveryAddress = context.DeliveryAddress.FirstOrDefault(c =>c.UserName== username && c.PhoneNumber == phoneNumber && c.Address == address && c.Fullname == fullname);
                if (deliveryAddress != null)
                {
                    DeliveryAddressModel deliveryAddressModel = new DeliveryAddressModel();
                    deliveryAddressModel.CopyProperties(deliveryAddress);
                    return deliveryAddressModel;
                }
                return null;
            }
        }
        /// <summary>
        /// Update user's Address
        /// </summary>
        /// <param name="deliveryAddressModel"></param>
        public bool UpdateAddress(DeliveryAddressModel deliveryAddressModel)
        {
            try
            {
                using (var context = new AppDbContext())
                {
                    var existingAddress = context.DeliveryAddress.FirstOrDefault(p => p.Id == deliveryAddressModel.Id);
                    if (existingAddress != null)
                    {
                        // Update product information
                        existingAddress.Fullname = deliveryAddressModel.Fullname;
                        existingAddress.PhoneNumber = deliveryAddressModel.PhoneNumber;
                        existingAddress.Address = deliveryAddressModel.Address;
                        existingAddress.SpecificAddress = deliveryAddressModel.SpecificAddress;

                        // Check if isDefault is being set to true
                        if (deliveryAddressModel.isDefault)
                        {
                            // Find all addresses with the same username and set their isDefault to false
                            var otherAddresses = context.DeliveryAddress.Where(p => p.UserName == deliveryAddressModel.UserName && p.Id != existingAddress.Id).ToList();
                            foreach (var address in otherAddresses)
                            {
                                address.isDefault = false;
                            }
                        }

                        existingAddress.isDefault = deliveryAddressModel.isDefault;
                        context.SaveChanges();
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        /// <summary>
        /// Delete user's address.
        /// </summary>
        /// <param name="username"></param>
        /// <param name="id"></param>
        public bool DeleteAddress(string username, int id)
        {
            try
            {
                using (var context = new AppDbContext())
                {
                    var deliveryAddress = context.DeliveryAddress.FirstOrDefault(ca => ca.UserName == username && ca.Id == id);
                    if (deliveryAddress != null)
                    {
                        context.DeliveryAddress.Remove(deliveryAddress);
                        context.SaveChanges();
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
            catch (Exception)
            {

                return false;
            }

        }
    }
}

