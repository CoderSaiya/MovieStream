namespace SharedLibrary.Security;

public static class Endpoint
{
    public static readonly IReadOnlyDictionary<Role, Dictionary<string, string[]>> AllowedEndpoints =
        new Dictionary<Role, Dictionary<string, string[]>>
        {
            [Role.User] = new()
            {
                ["PUT"] =
                [
                    "User/private/**"
                ],

                ["POST"] =
                [
                    "Payment/private/webhook",
                    "Payment/private/create-payment-intent",
                    "Payment/private/vnpay-payment",
                ]
            },

            [Role.Admin] = new()
            {
                ["*"] = new[]
                {
                    "User/private/**",
                    "Auth/private/**",
                    "Movie/private/**",
                    "Payment/private/**",
                    "Recommendation/private/**",
                },
            },

            [Role.Moderator] = new()
            {
                ["DELETE"] =
                [
                    "Movie/private/**",
                    "User/private/**",
                ],
            }
        };
}