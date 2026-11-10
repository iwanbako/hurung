import json
import urllib.request
import xml.etree.ElementTree as ET

# --- KONFIGURASI KERABATWEB.COM ---
DOMAIN = "kerabatweb.com"
INDEXNOW_KEY = "e881f42fe4d749538b7e95195a6c9da0"

SITEMAP_URL = f"https://{DOMAIN}/sitemap.xml"
KEY_LOCATION = f"https://{DOMAIN}/{INDEXNOW_KEY}.txt"
INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow"


def fetch_urls_from_sitemap(sitemap_url):
  print(f"Mengambil sitemap dari: {sitemap_url}")
  req = urllib.request.Request(
      sitemap_url, headers={"User-Agent": "IndexNow-Sitemap-Fetcher"}
  )
  try:
    with urllib.request.urlopen(req) as response:
      xml_content = response.read()
      root = ET.fromstring(xml_content)

      urls = []
      # Parsing tag <loc> di dalam sitemap
      for elem in root.iter():
        if elem.tag.endswith("loc"):
          if elem.text:
            urls.append(elem.text.strip())
      return urls
  except Exception as e:
    print(f"Gagal mengambil atau memparsing sitemap: {e}")
    return []


def submit_to_indexnow(urls):
  if not urls:
    print("Tidak ada URL yang ditemukan untuk disubmit.")
    return

  payload = {
      "host": DOMAIN,
      "key": INDEXNOW_KEY,
      "keyLocation": KEY_LOCATION,
      "urlList": urls,
  }

  data = json.dumps(payload).encode("utf-8")
  req = urllib.request.Request(
      INDEXNOW_ENDPOINT,
      data=data,
      headers={
          "Content-Type": "application/json; charset=utf-8",
          "User-Agent": "IndexNow-Python-Script",
      },
      method="POST",
  )

  try:
    with urllib.request.urlopen(req) as response:
      status_code = response.getcode()
      if status_code in [200, 202]:
        print(
            f"Sukses! Status: {status_code} - {len(urls)} URL dari kerabatweb.com"
            " berhasil dikirim ke IndexNow."
        )
      else:
        print(f"Respon server: Status {status_code}")
  except urllib.error.HTTPError as e:
    print(
        f"Gagal mengirim ke IndexNow. HTTP Error {e.code}:"
        f" {e.read().decode('utf-8')}"
    )
  except Exception as e:
    print(f"Terjadi kesalahan: {e}")


if __name__ == "__main__":
  urls = fetch_urls_from_sitemap(SITEMAP_URL)
  print(f"Ditemukan {len(urls)} URL di dalam sitemap.")
  if urls:
    submit_to_indexnow(urls)