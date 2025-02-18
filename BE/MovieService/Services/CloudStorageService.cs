﻿using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;

namespace MovieService.Services
{
    public class CloudStorageService
    {
        private readonly string _bucketName;
        private readonly IAmazonS3 _client;

        public CloudStorageService(IConfiguration configuration)
        {
            _bucketName = configuration["CloudStorage:BucketName"] ?? "bucketname";
            _client = new AmazonS3Client(
                configuration["CloudStorage:AccessKey"],
                configuration["CloudStorage:SecretKey"],
                Amazon.RegionEndpoint.GetBySystemName(configuration["CloudStorage:Region"])
            );
        }

        public async Task<string> UploadVideoAsync(Stream videoStream, string fileName)
        {
            string key = $"movieflix/video/{fileName}";
            var transferUtility = new TransferUtility(_client);
            await transferUtility.UploadAsync(videoStream, _bucketName, key);
            return $"https://{_bucketName}.s3.amazonaws.com/{key}";
        }

        public async Task<string> UploadImageAsync(Stream imageStream, string fileName)
        {
            string key = $"movieflix/image/{fileName}";
            var transferUtility = new TransferUtility(_client);
            await transferUtility.UploadAsync(imageStream, _bucketName, key);
            return $"https://{_bucketName}.s3.amazonaws.com/{key}";
        }

        public string GeneratePreSignedUrl(string fileName)
        {
            var request = new GetPreSignedUrlRequest
            {
                BucketName = _bucketName,
                Key = fileName,
                Expires = DateTime.UtcNow.AddHours(1),
                Verb = HttpVerb.GET,
            };

            return _client.GetPreSignedURL(request);
        }
    }
}
