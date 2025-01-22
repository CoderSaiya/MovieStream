using Microsoft.AspNetCore.Mvc;
using PaymentService.DTOs;
using PaymentService.Helper;
using PaymentService.Repository;
using Stripe;

namespace PaymentService.Controllers
{
    public class PaymentController : ControllerBase
    {
        private readonly IPayment _payment;
        private readonly IConfiguration _configuration;
        public PaymentController(IPayment payment, IConfiguration configuration)
        {
            _payment = payment;
            _configuration = configuration;
        }

        [HttpPost("private/vnpay-payment")]
        public IActionResult CreateVNPayPayment([FromBody] VNPayReq request)
        {
            try
            {
                var vnp_TmnCode = _configuration["Payment:VNPay:TmnCode"];
                var vnp_SecretCode = _configuration["Payment:VNPay:HashSecret"];
                var vnp_Url = _configuration["Payment:VNPay:Url"];
                var vnp_ReturnUrl = _configuration["Payment:VNPay:ReturnUrl"];

                var vnp = new VNPayLibrary();
                vnp.AddRequestData("vnp_Version", "2.1.0");
                vnp.AddRequestData("vnp_Command", "pay");
                vnp.AddRequestData("vnp_TmnCode", vnp_TmnCode);
                vnp.AddRequestData("vnp_Amount", ConvertToVND(request.Amount, request.Currency).ToString());
                vnp.AddRequestData("vnp_CurrCode", request.Currency);
                vnp.AddRequestData("vnp_TxnRef", DateTime.Now.Ticks.ToString());
                vnp.AddRequestData("vnp_OrderInfo", request.TransactionInfo);
                vnp.AddRequestData("vnp_ReturnUrl", vnp_ReturnUrl);
                vnp.AddRequestData("vnp_IpAddr", HttpContext.Connection.RemoteIpAddress?.ToString() ?? "");
                vnp.AddRequestData("vnp_CreateDate", DateTime.Now.ToString("yyyyMMddHHmmss"));

                var paymentUrl = vnp.CreateUrl(vnp_Url, vnp_SecretCode);

                _payment.CreateTractionAsync(request.UserId, request.Amount, request.TransactionInfo);

                return Ok(new { URL = paymentUrl });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private double ConvertToVND(double amount, string currency)
        {
            // tạm thời set cứng, update gọi api sau
            var exchangeRates = new Dictionary<string, double>
            {
                { "VND", 1 },
                { "USD", 23400 },
                { "EUR", 25000 }
            };

            if (!exchangeRates.ContainsKey(currency))
                throw new Exception("Unsupported currency");

            return amount * exchangeRates[currency];
        }

        [HttpPost("private/create-payment-intent")]
        public async Task<IActionResult> CreatePaymentIntent([FromBody] StripeReq request)
        {
            StripeConfiguration.ApiKey = _configuration["Payment:Stripe:SecretKey"];

            var options = new PaymentIntentCreateOptions
            {
                Amount = (long)(request.Amount * 100),
                Currency = "usd",
                PaymentMethodTypes = new List<string> { "card" },
            };

            var service = new PaymentIntentService();
            var paymentIntent = await service.CreateAsync(options);

            return Ok(new { ClientSecret = paymentIntent.ClientSecret });
        }

        [HttpPost("private/webhook")]
        public async Task<IActionResult> StripeWebhook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            var stripeEvent = EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"], _configuration["Payment:Stripe:WebhookSecret"]);

            if (stripeEvent.Type == "payment_intent.succeeded")
            {
                var paymentIntent = stripeEvent.Data.Object as PaymentIntent;
                var userId = Guid.Parse(paymentIntent.Metadata["UserId"]);
                var amount = paymentIntent.Amount / 100.0;
                var genre = paymentIntent.Metadata["info"];

                await _payment.CreateTractionAsync(userId, amount, genre);
            }

            return Ok();
        }
    }
}
