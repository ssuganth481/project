from google import genai

client = genai.Client(api_key="AIzaSyDpA2OWxBAvLdtQFwS6Rk6fQp2g3mugNNs")

response = client.models.generate_content(
    model="gemini-3-flash-preview",
    contents="Create an Instagram reel idea on home workout with caption and hashtags."
)

print(response.text)