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
    public class TransController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly string  _apiUrl;

        private readonly ILogger<TransController> _logger;
        public TransController(ILogger<TransController> logger, HttpClient httpClient,IOptions<AppSettings> appSettings)
        {
            _logger = logger;
            _httpClient = httpClient;
            _apiUrl = appSettings.Value.TransUrl;
        }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] TransRequest request)
    {
        try
        {
            //_httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _apiKey);
            _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var json = JsonSerializer.Serialize(new
            {
                text = request.Text,
                lang = request.Lang
            });

            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync(_apiUrl, content);
            response.EnsureSuccessStatusCode();

            var responseJson = await response.Content.ReadAsStringAsync();
            var responseData = Encoding.UTF8.GetString(Encoding.Default.GetBytes(responseJson));

            TransResponse responses = JsonSerializer.Deserialize<TransResponse>(responseData);

            var data = responses.output;
            
            return Ok(new {output = data});
        }
        catch (Exception ex)
        {
            _logger.LogError("Error in TransController" + ex.Message);
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
    public class TransRequest
    {
        public string Text { get; set; }
        public string Lang { get; set; }
    }

    public class TransResponse
    {
        public string output { get; set; }
    }

}
