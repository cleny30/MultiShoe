using System.Net.Mail;
using System.Net;
using System.Resources;
using System.Reflection;
using RKShoesAPI.Services.Account;
using RKShoesAPI.Models.Pages.Order;
using RKShoesAPI.Services.Cart;
using RKShoesAPI.Services.Product;

namespace RKShoesAPI.Services.Email
{
    public class EmailService
    {
        public string VerifyEmail(string UserName, string email)
        {
            try
            {
                var configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json") // Adjust the path if necessary
                .Build();

                string fromEmail = configuration["EmailSettings:FromEmail"];
                string password = configuration["EmailSettings:EmailPassword"];

                string reciever = email;

                Random random = new Random();

                string otp = random.Next(100000, 999999).ToString();

                DateTime date = DateTime.Now;

                string resxFilePath = "RKShoesAPI.Resources.EmailTemplate.VerifyEmailTemplate";

                ResourceManager resourceManager = new ResourceManager(resxFilePath, Assembly.GetExecutingAssembly());


                string htmlContent = resourceManager.GetString("EmailTemplate");
                htmlContent = htmlContent.Replace("@param01", date.ToString());
                htmlContent = htmlContent.Replace("@param02", UserName);
                htmlContent = htmlContent.Replace("@param03", otp);
                htmlContent = htmlContent.Replace("@param04", fromEmail);

                MailMessage message = new MailMessage();
                message.From = new MailAddress(fromEmail);
                message.Subject = "The OTP to reset password";
                message.To.Add(new MailAddress(reciever));
                message.Body = htmlContent;
                message.IsBodyHtml = true;

                var smtpClient = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = new NetworkCredential(fromEmail, password),
                    EnableSsl = true,
                };

                // Send the email
                try
                {
                    smtpClient.Send(message);
                    return otp;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error sending email: {ex.Message}");
                    Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                }

                return otp;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Unexpected error: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                return null;
            }
        }

        public void Invoice(OrderModel orderModel, string table_content)
        {
            try
            {
                AccountService _acc = new AccountService();
                CartService cartService = new CartService();
                ProductService productService = new ProductService();

                var account = _acc.getAccount(orderModel.UserName);

                var configuration = new ConfigurationBuilder()
                   .AddJsonFile("appsettings.json") // Adjust the path if necessary
                   .Build();

                string fromEmail = configuration["EmailSettings:FromEmail"];
                string password = configuration["EmailSettings:EmailPassword"];

                string reciever = account.Email;

                string resxFilePath = "RKShoesAPI.Resources.EmailTemplate.VerifyEmailTemplate";

                ResourceManager resourceManager = new ResourceManager(resxFilePath, Assembly.GetExecutingAssembly());

                string styleContent = resourceManager.GetString("style_invoice");

                string htmlContent = resourceManager.GetString("invoice_template");

                //htmlContent = htmlContent.Replace("@param00", styleContent);
                htmlContent = htmlContent.Replace("@param01", orderModel.OrderId);
                htmlContent = htmlContent.Replace("@param02", orderModel.StartDate.ToString());
                htmlContent = htmlContent.Replace("@param03", orderModel.TotalPrice.ToString());
                htmlContent = htmlContent.Replace("@param04", orderModel.FullName);
                htmlContent = htmlContent.Replace("@param05", orderModel.PhoneNumber);
                htmlContent = htmlContent.Replace("@param06", orderModel.Address);

                htmlContent = htmlContent.Replace("@param07", table_content);

                MailMessage message = new MailMessage();
                message.From = new MailAddress(fromEmail);
                message.Subject = "Invoice";
                message.To.Add(new MailAddress(reciever));
                message.Body = htmlContent;
                message.IsBodyHtml = true;

                var smtpClient = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = new NetworkCredential(fromEmail, password),
                    EnableSsl = true,
                };
                smtpClient.Send(message);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Unexpected error: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");
            }
        }
    }
}
