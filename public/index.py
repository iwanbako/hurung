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
            for elem in root.iter():
                if elem.tag.endswith("loc"):
                    if elem.text:
                        urls.append(elem.text.strip())
            return urls
    except Exception as e:
        print(f"Gagal mengambil atau memparsing sitemap: {e}")
        return []


def submit_single_url_to_indexnow(url, total_urls, current_index):
    # PERBAIKAN: Gunakan 'urlList' berupa list yang berisi 1 URL agar sesuai dengan aturan IndexNow
    payload = {
        "host": DOMAIN,
        "key": INDEXNOW_KEY,
        "keyLocation": KEY_LOCATION,
        "urlList": [url],
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
                print(f"[{current_index}/{total_urls}] Sukses ({status_code}): {url}")
            else:
                print(f"[{current_index}/{total_urls}] Status ({status_code}): {url}")

    except urllib.error.HTTPError as e:
        error_body = e.read().decode("utf-8", errors="ignore")
        status = e.code

        if status == 400:
            print(f"[{current_index}/{total_urls}] Error 400 (Bad Request): {url} -> {error_body}")
        elif status == 403:
            print(f"[{current_index}/{total_urls}] Error 403 (Forbidden): {url} -> {error_body}")
        elif status == 422:
            print(f"[{current_index}/{total_urls}] Error 422 (Unprocessable): {url} -> {error_body}")
        elif status == 429:
            print(f"[{current_index}/{total_urls}] Error 429 (Too Many Requests): {url} -> {error_body}")
        else:
            print(f"[{current_index}/{total_urls}] HTTP Error {status}: {url} -> {error_body}")

    except Exception as e:
        print(f"[{current_index}/{total_urls}] Error: {url} -> {e}")


def submit_all_urls_one_by_one(urls):
    if not urls:
        print("Tidak ada URL yang ditemukan untuk disubmit.")
        return

    total = len(urls)
    print(f"\nMulai mengirim {total} URL satu per satu ke IndexNow...\n")

    for idx, url in enumerate(urls, start=1):
        submit_single_url_to_indexnow(url, total, idx)


if __name__ == "__main__":
    urls = fetch_urls_from_sitemap(SITEMAP_URL)
    print(f"Ditemukan {len(urls)} URL di dalam sitemap.")
    if urls:
        submit_all_urls_one_by_one(urls)