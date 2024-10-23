using RKShoesAPI.IRepository.IBrandRepository;
using RKShoesAPI.IRepository.IOrderRepository;
using RKShoesAPI.Models.Entities;
using RKShoesAPI.Models.Pages.Cart;
using RKShoesAPI.Models.Pages.Order;
using RKShoesAPI.Models.Pages.Product;
using RKShoesAPI.Repository.OrderRepository;
using RKShoesAPI.Services.Cart;
using RKShoesAPI.Services.Email;
using RKShoesAPI.Services.Product;
using System.Reflection;
using System.Resources;

namespace RKShoesAPI.Services.OrderService
{
    public class OrderService
    {
        private readonly IOrderRepository _orderRepository;
        public OrderService()
        {
            _orderRepository = new OrderRepository();
        }

        public bool Checkout(OrderModel orderModel)
        {
            EmailService emailService = new EmailService();
            ProductService productService = new ProductService();
            CartService cartService = new CartService();

           var cartId = orderModel.cartId.Split(',');

            var cart = cartService.GetCartByUsername(orderModel.UserName).Where(c=>cartId.Contains(c.CartId.ToString()));

            if (cart != null && cart.Any())
            {
                foreach (var cartItem in cart)
                {
                    var product = productService.GetProductById(cartItem.ProId);
                    if (product.Quantity <= 0 || product.Quantity < cartItem.Quantity)
                    {
                        return false;
                    }
                }

                string orderId = _orderRepository.GetNewOrderID();
                string resxFilePath = "RKShoesAPI.Resources.EmailTemplate.VerifyEmailTemplate";

                ResourceManager resourceManager = new ResourceManager(resxFilePath, Assembly.GetExecutingAssembly());
                string tr_tag = resourceManager.GetString("tr_tag");
                int index = 1;
                string table_content = "";

                foreach (var cartItem in cart)
                {
                    var product = productService.GetProductById(cartItem.ProId);
                    var updateQuantity = product.Quantity - cartItem.Quantity;
                    product.Quantity = updateQuantity;
                    productService.UpdateQuantityProduct(product);
             
                    string tmp = tr_tag;

                    string formattedIndex = index.ToString("D2");

                    tmp = tmp.Replace("@param01", product.ProName);
                    tmp = tmp.Replace("@param02", cartItem.Quantity.ToString());
                    tmp = tmp.Replace("@param03", cartItem.Price.ToString());

                    table_content += tmp;
                    index++; 

                    OrderDetailModel orderDetailModel = new OrderDetailModel
                    {
                        OrderId = orderId,
                        ProId = cartItem.ProId,
                        UserName = orderModel.UserName,
                        ProName=cartItem.ProName,
                        Quantity = cartItem.Quantity,
                        Price = cartItem.Price,
                        Size = cartItem.Size
                    };
                    _orderRepository.AddOrderDetail(orderDetailModel);
                }

                orderModel.OrderId = orderId;
                orderModel.Status = 1; // 1 is Ordered, waiting for accept
                orderModel.EndDate = null; // time will be set when order come to customer
                _orderRepository.AddNewOrder(orderModel);
                cartService.DeleteCartById(orderModel.cartId);

                emailService.Invoice(orderModel, table_content);
                return true;
            }
            else
            {
                return false;
            }
        }

        public List<OrderDataModel> GetOrdersByCustomer(string username)
        {
            return _orderRepository.GetOrdersByCustomer(username);
        }
        public bool AcceptOrder(string orderID, int managerId)
        {
            try
            {
                var order = _orderRepository.GetOrderByOrderID(orderID);
                if (order == null)
                {
                    return false;
                }
                else
                {
                    _orderRepository.AcceptOrder(orderID, managerId);
                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool CancelOrder(string orderID)
        {
            try
            {
                var order = _orderRepository.GetOrderByOrderID(orderID);
                if (order == null)
                {
                    return false;
                }
                else
                {
                    _orderRepository.CancelOrder(orderID);
                    _orderRepository.ReturnProduct(orderID);
                    return true;
                }
               
            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool ShippingOrder(string orderID)
        {
            try
            {
                var order = _orderRepository.GetOrderByOrderID(orderID);
                if (order == null)
                {
                    return false;
                }
                else
                {
                    _orderRepository.ShippingOrder(orderID);
                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool CompleteOrder(string orderID)
        {
            try
            {
                var order = _orderRepository.GetOrderByOrderID(orderID);
                if (order == null)
                {
                    return false;
                }
                else
                {
                    _orderRepository.CompletedOrder(orderID);
                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
