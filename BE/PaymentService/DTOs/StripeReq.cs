namespace PaymentService.DTOs
{
    public class StripeReq
    {
        public decimal Amount { get; set; }
        public string Currency { get; } = "USD";
        public Guid UserId { get; set; }
    }
}
