using ISUZU_NEXT.Server.Core.Extentions;
using Microsoft.EntityFrameworkCore;
using RKShoesAPI.IRepository.IOrderRepository;
using RKShoesAPI.Models.Entities;
using RKShoesAPI.Models.Pages.Order;
using RKShoesAPI.Models.Pages.Product;


namespace RKShoesAPI.Repository.OrderRepository
{
    public class OrderRepository : IOrderRepository
    {
        /// <summary>
        /// Method to get newest OrderID
        /// </summary>
        /// <returns></returns>
        public string GetNewOrderID()
        {
            var lastOrder = AppDbContext.Instance.Orders.OrderByDescending(o => o.OrderId).FirstOrDefault();

            if (lastOrder == null)
            {
                return "OD001"; // Assuming the first order ID starts with "OD001"
            }
            else
            {
                string numericPart = lastOrder.OrderId.Substring(2);
                int currentNumber = int.Parse(numericPart);
                int newNumber = currentNumber + 1;
                string newOrderId = $"OD{newNumber:D3}";
                return newOrderId;
            }
        }
        /// <summary>
        /// Method use to add new Order
        /// </summary>
        /// <param name="orderModel"></param>
        /// <returns></returns>
        public bool AddNewOrder(OrderModel orderModel)
        {
            try
            {
                using (var dbContext = new AppDbContext())
                {
                    Order order = new Order();
                    order.CopyProperties(orderModel);
                    dbContext.Orders.Add(order);
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
        /// Add Order Detail for that Order
        /// </summary>
        /// <param name="orderDetailModel"></param>
        /// <returns></returns>
        public bool AddOrderDetail(OrderDetailModel orderDetailModel)
        {
            try
            {
                using (var dbContext = new AppDbContext())
                {
                    OrderDetail orderDetail = new OrderDetail();
                    orderDetail.CopyProperties(orderDetailModel);
                    dbContext.OrderDetail.Add(orderDetail);
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
        /// Get Order List of customer
        /// </summary>
        /// <param name="username"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public List<OrderDataModel> GetOrdersByCustomer(string username)
        {
            try
            {
                using (var dbContext = new AppDbContext())
                {
                    var orders = dbContext.Orders.Where(o => o.UserName == username).ToList();
                    List<OrderDataModel> orderModels = new List<OrderDataModel>();
                    foreach (var order in orders)
                    {
                        var orderModel = new OrderDataModel();
                        orderModel.CopyProperties(order);
                        orderModel.orderDetail = GetOrdersDetailByCustomer(order.OrderId);
                        orderModels.Add(orderModel);
                    }
                    return orderModels;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        /// <summary>
        /// Get Order Detail in Order
        /// </summary>
        /// <param name="orderId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public List<OrderDetailModel> GetOrdersDetailByCustomer(string orderId)
        {
            try
            {
                using (var dbContext = new AppDbContext())
                {
                    var orders = dbContext.OrderDetail.Where(o => o.OrderId == orderId).ToList();
                    List<OrderDetailModel> orderDetailModels = new List<OrderDetailModel>();
                    foreach (var order in orders)
                    {
                        var orderDetailModel = new OrderDetailModel();
                        orderDetailModel.CopyProperties(order);
                        orderDetailModels.Add(orderDetailModel);

                    }
                    return orderDetailModels;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public OrderModel? GetOrderByOrderID(string orderId)
        {
            try
            {
                using (var dbContext = new AppDbContext())
                {
                    var order = dbContext.Orders.FirstOrDefault(o => o.OrderId == orderId);
                    if (order != null)
                    {
                        OrderModel orderlModel = new OrderModel();
                        orderlModel.CopyProperties(order);
                        return orderlModel;
                    }
                    return null;
                }
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        /// <summary>
        /// Set status of Order = 0, Cancel Order
        /// </summary>
        /// <param name="orderId"></param>
        public void CancelOrder(string orderId)
        {
            using (var context = new AppDbContext())
            {
                var order = context.Orders.FirstOrDefault(o => o.OrderId == orderId);
                if (order != null)
                {
                    order.Status = 0;
                    context.SaveChanges();
                }
            }
        }
        /// <summary>
        /// Set status's Order = 2, Order Accepted 
        /// </summary>
        /// <param name="orderId"></param>
        /// <param name="managerId"></param>
        public void AcceptOrder(string orderId, int managerId)
        {
            using (var context = new AppDbContext())
            {
                var order = context.Orders.FirstOrDefault(o => o.OrderId == orderId);
                if (order != null)
                {
                    order.Status = 2;
                    order.ManagerId = managerId;
                    context.SaveChanges();
                }
            }
        }
        /// <summary>
        /// Set status's Order = 3, Change to ship for customer
        /// </summary>
        /// <param name="orderId"></param>
        public void ShippingOrder(string orderId)
        {
            using (var context = new AppDbContext())
            {
                var order = context.Orders.FirstOrDefault(o => o.OrderId == orderId);
                if (order != null)
                {
                    order.Status = 3;
                    context.SaveChanges();
                }
            }
        }
        /// <summary>
        /// Set status's Order = 4, Completed Order
        /// </summary>
        /// <param name="orderId"></param>
        public void CompletedOrder(string orderId)
        {
            using (var context = new AppDbContext())
            {
                var order = context.Orders.FirstOrDefault(o => o.OrderId == orderId);
                if (order != null)
                {
                    order.Status = 4;
                    order.EndDate = DateTime.Now;
                    context.SaveChanges();
                }
            }
        }
        /// <summary>
        /// If Customer cancel Order, quantity in Product will return back
        /// </summary>
        /// <param name="orderId"></param>
        public void ReturnProduct(string orderId)
        {
            using (var context = new AppDbContext())
            {
                var orderDetails = context.OrderDetail.Where(od => od.OrderId == orderId).ToList();

                foreach (var orderDetail in orderDetails)
                {
                    var product = context.Product.FirstOrDefault(p => p.ProId == orderDetail.ProId);
                    if (product != null)
                    {
                        product.Quantity += orderDetail.Quantity;
                    }
                }
                context.SaveChanges();
            }
        }
    }
}
