namespace PaymentService.DTOs
{
    public class VNPayReq
    {
        public Guid UserId { get; }
        public double Amount { get; }
        public string Currency { get; } = "VND";
        public string TransactionInfo { get; } = string.Empty;
    }
}
