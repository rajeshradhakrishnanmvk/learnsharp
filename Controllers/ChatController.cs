using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;


namespace learnsharp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly string  _apiUrl;
        private readonly string _apiKey;

        private readonly ILogger<ChatController> _logger;
        public ChatController(ILogger<ChatController> logger, HttpClient httpClient,IOptions<AppSettings> appSettings)
        {
            _logger = logger;
            _httpClient = httpClient;
            _apiKey = appSettings.Value.ApiKey;
            _apiUrl = appSettings.Value.ApiUrl;
        }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] ChatRequest request)
    {
        try
        {
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _apiKey);
            _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var json = JsonSerializer.Serialize(new
            {
                inputs = request.Inputs,
                parameters = new
                {
                    max_new_tokens = 100,
                    temperature = 0.9
                }
            });

            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync(_apiUrl, content);
            response.EnsureSuccessStatusCode();

            var responseJson = await response.Content.ReadAsStringAsync();
            List<ChatResponse> responses = JsonSerializer.Deserialize<List<ChatResponse>>(responseJson);

            ChatResponse translation = responses.FirstOrDefault();

            var data = RemoveSpecialCharacters(translation.generated_text);
            //_logger.LogInformation(data);
            return Ok(new {output = data});
        }
        catch (Exception ex)
        {
            _logger.LogError("Error in ChatController" + ex.Message);
            return BadRequest(ex.Message);
        }
    }
    string RemoveSpecialCharacters(string input)
    {
        // Remove special characters using regex pattern
        string pattern = "[^a-zA-Z0-9 ]";
        string result = Regex.Replace(input, pattern, "");
        
        // Remove comma, semi-colon, and newline
        result = result.Replace(",", "").Replace(";", "").Replace("\n", "");
        
        return result;
    }
    }
    public class ChatRequest
    {
        public string Inputs { get; set; }
    }

    public class ChatResponse
    {
        public string generated_text { get; set; }
    }

}
