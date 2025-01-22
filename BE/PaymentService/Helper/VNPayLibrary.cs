using System.Security.Cryptography;
using System.Text;

namespace PaymentService.Helper
{
    public class VNPayLibrary
    {
        private readonly SortedList<string, string> _requestData = new();
        public void AddRequestData(string key, string value)
        {
            if (string.IsNullOrEmpty(key)) _requestData.Add(key, value);
        }

        public string CreateUrl(string baseUrl, string secretKey)
        {
            var data = new StringBuilder();
            foreach (var kv in _requestData)
            {
                if(data.Length > 0) data.Append("&");
                data.Append($"{kv.Key}={Uri.EscapeDataString(kv.Value)}");
            }
            var signData = HmacSHA512(secretKey, data.ToString());
            return $"{baseUrl}?{data}&vnp_SecureHash={signData}";
        }

        private static string HmacSHA512(string key, string data)
        {
            using var hmac = new HMACSHA512(Encoding.UTF8.GetBytes(key));
            var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(data));
            return BitConverter.ToString(hash).Replace("-", "").ToUpper();
        }
    }
}
