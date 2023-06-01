using System;
using System.IO;
using System.Linq;
using System.Text;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using System.Net.Http.Headers;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace learnsharp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SaveChatController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly string  _apiUrl;
        private readonly string _apiKey;
        private readonly ILogger<SaveChatController> _logger;

        public SaveChatController(ILogger<SaveChatController> logger, HttpClient httpClient,IOptions<AppSettings> appSettings)
        {
            _logger = logger;
            _httpClient = httpClient;
            _apiKey = appSettings.Value.ApiKey;
            _apiUrl = appSettings.Value.ApiUrl;
        }
        [HttpGet]
        public IActionResult SaveChat()
        {
            try
            {
                 
                // Define the file path of the chat state JSON file
                var filePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "chat_state.json");
                _logger.LogInformation("Fetch Chat: " + filePath);
                // Read the content of the JSON file
                var chatStateJson = System.IO.File.ReadAllText(filePath);

                // Return the JSON content as the API response
                return Content(chatStateJson, "application/json");
            }
            catch (Exception ex)
            {
                // Failed to read the chat state JSON file
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPost]
        public IActionResult SaveChat([FromBody] List<ChatMessage> previousChat)
        {
            try
            {
                //_logger.LogInformation(previousChat);
                // Convert the previousChat state to JSON string
                var chatStateJson = JsonSerializer.Serialize(previousChat);
                //_logger.LogInformation(chatStateJson);
                // Define the file path to save the chat state JSON file
                var filePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "chat_state.json");

                // Save the chat state JSON string to the file
                        // Create a FileStream to write the chat state JSON file
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                using (var streamWriter = new StreamWriter(fileStream))
                {
                    // Write the chat state JSON to the file
                    streamWriter.Write(chatStateJson);
                }
                _logger.LogInformation("Post Chat: " + filePath);
                // Successfully saved the chat state
                return Ok();
            }
            catch (Exception ex)
            {
                // Failed to save the chat state
                return StatusCode(500, ex.Message);
            }
        }

        public class ChatMessage{
            public string title {get; set;}
            public string role {get; set;}
            public string content {get; set;}
        }
    }
}