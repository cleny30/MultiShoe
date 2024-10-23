using RKShoesAPI.Models.Pages.Order;

namespace RKShoesAPI.IRepository.IOrderRepository
{
    public interface IOrderRepository
    {
        public string GetNewOrderID();
        public bool AddNewOrder(OrderModel orderModel);
        public bool AddOrderDetail(OrderDetailModel orderDetailModel);
        public List<OrderDataModel> GetOrdersByCustomer(string username);
        public OrderModel? GetOrderByOrderID(string orderId);
        public void AcceptOrder(string orderId, int managerId);
        public void CancelOrder(string orderId);
        public void ShippingOrder(string orderId);
        public void CompletedOrder(string orderId);
        public void ReturnProduct(string orderId);
    }
}
