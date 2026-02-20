import requests
from bs4 import BeautifulSoup

url = "https://bimasislam.kemenag.go.id/jadwalimsakiyah"
headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}
response = requests.get(url, headers=headers)
print("Status Code:", response.status_code)

soup = BeautifulSoup(response.text, 'html.parser')

print("=== Scripts ===")
scripts = soup.find_all('script')
for idx, script in enumerate(scripts):
    if script.string:
        if 'ajax' in script.string.lower() or 'fetch' in script.string.lower() or 'url' in script.string.lower() or 'api' in script.string.lower():
            print(f"--- Script {idx} with keywords ---")
            print(script.string[:500] + "..." if len(script.string) > 500 else script.string)
