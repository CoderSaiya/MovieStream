﻿using Elastic.Clients.Elasticsearch;
using Elastic.Clients.Elasticsearch.QueryDsl;
using SearchService.DTOs;
using SharedLibrary.RabbitMQ.Events;

namespace SearchService.Services
{
    public class SearchService : ISearch
    {
        private readonly Elastic.Clients.Elasticsearch.ElasticsearchClient _client;
        public SearchService(ElasticsearchClient client)
        {
            _client = client.Client;
        }
        public async Task IndexMovieAsync(object movieDocument)
        {
            await _client.IndexAsync(movieDocument, idx => idx.Index("movies"));
        }
        public async Task CreateIndex(string index)
        {
            if(!_client.Indices.Exists(index).Exists)
            {
                await _client.CreateAsync(index);
            };
        }
        public async Task<bool> AddOrUpdateMovie(MovieDocument movie) 
        {
            var response = await _client.IndexAsync(movie, idx => 
                idx.Index("movies")
                   .OpType(OpType.Index));
            return response.IsValidResponse;
        }
        public async Task<SearchResponse<SearchMovieDocument>> SearchMoviesAsync(string query, bool filterByGenre = false, string genre = null, int? year = null)
        {
            var boolQuery = new BoolQuery
            {
                Must = new List<Query>
                {
                    new MatchQuery("title") { Query = query }
                }
            };

            if (filterByGenre && !string.IsNullOrEmpty(genre)) {
                boolQuery.Filter.Add(new TermQuery("genre")
                { 
                    Value = genre
                });
            }

            if (year.HasValue)
            {
                boolQuery.Filter.Add(new TermQuery("year")
                {
                    Value = year.Value
                });
            }

            var searchRequest = new SearchRequest("movies")
            {
                Query = boolQuery
            };

            var searchResponse = await _client.SearchAsync<SearchMovieDocument>(searchRequest);

            return searchResponse;

        }
        public async Task DeleteMovieAsync(string movieId)
        {
            await _client.DeleteAsync<SearchMovieDocument>(movieId, d => d.Index("movies"));
        }
    }
}
