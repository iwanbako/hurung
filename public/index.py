# indexnow-submit.py
import json
import urllib.request
import urllib.error
import xml.etree.ElementTree as ET

# --- KONFIGURASI KERABATWEB.COM ---
DOMAIN = "kerabatweb.com"
INDEXNOW_KEY = "e881f42fe4d749538b7e95195a6c9da0"

SITEMAP_URL = f"https://{DOMAIN}/sitemap.xml"
KEY_LOCATION = f"https://{DOMAIN}/{INDEXNOW_KEY}.txt"
INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow"

# Batas maksimum URL per batch IndexNow
BATCH_SIZE = 1000


# ============================================================
# FETCH: Ambil URL dari sitemap.xml
# - Kalau <sitemapindex>  -> rekursif baca semua sub-sitemap
# - Kalau <urlset>        -> langsung ambil semua <loc>
# ============================================================
def fetch_urls_from_sitemap(sitemap_url, _seen=None):
    if _seen is None:
        _seen = set()

    if sitemap_url in _seen:
        return []
    _seen.add(sitemap_url)

    print(f"📖 Mengambil sitemap: {sitemap_url}")
    req = urllib.request.Request(
        sitemap_url, headers={"User-Agent": "IndexNow-Sitemap-Fetcher"}
    )

    try:
        with urllib.request.urlopen(req) as response:
            xml_content = response.read()
            root = ET.fromstring(xml_content)
    except Exception as e:
        print(f"❌ Gagal mengambil sitemap: {e}")
        return []

    root_tag = root.tag.lower()
    urls = []

    # ============================================
    # A. SITEMAP INDEX -> rekursif ambil sub-sitemap
    # ============================================
    if "sitemapindex" in root_tag:
        sub_sitemaps = [
            elem.text.strip()
            for elem in root.iter()
            if elem.tag.endswith("loc") and elem.text
        ]
        print(f"   ↳ sitemap index berisi {len(sub_sitemaps)} sub-sitemap")

        for sub in sub_sitemaps:
            urls.extend(fetch_urls_from_sitemap(sub, _seen=_seen))

        return urls

    # ============================================
    # B. URLSET -> ambil semua <loc> sebagai URL
    # ============================================
    for elem in root.iter():
        if elem.tag.endswith("loc") and elem.text:
            urls.append(elem.text.strip())

    print(f"   ↳ urlset berisi {len(urls)} URL")
    return urls


# ============================================================
# KIRIM BATCH KE INDEXNOW
# ============================================================
def submit_batch_to_indexnow(url_batch, batch_index, total_batches):
    payload = {
        "host": DOMAIN,
        "key": INDEXNOW_KEY,
        "keyLocation": KEY_LOCATION,
        "urlList": url_batch,
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
                print(f"[Batch {batch_index}/{total_batches}] ✅ Sukses ({status_code}): {len(url_batch)} URL.")
            else:
                print(f"[Batch {batch_index}/{total_batches}] ⚠️ Status ({status_code}).")
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="ignore")
        status = e.code

        msg = {
            400: "Bad Request",
            403: "Forbidden (key tidak valid?)",
            422: "Unprocessable (URL beda host?)",
            429: "Too Many Requests (rate limit)",
        }.get(status, f"HTTP {status}")

        print(f"[Batch {batch_index}/{total_batches}] ❌ {msg} -> {body}")
    except Exception as e:
        print(f"[Batch {batch_index}/{total_batches}] ❌ Error: {e}")


def submit_urls_in_batches(urls):
    if not urls:
        print("⚠️ Tidak ada URL untuk disubmit.")
        return

    # Filter unik (hindari kirim duplikat)
    urls = list(dict.fromkeys(urls))

    total = len(urls)
    batches = [urls[i:i + BATCH_SIZE] for i in range(0, total, BATCH_SIZE)]
    total_batches = len(batches)

    print(f"\n🚀 Mengirim {total} URL unik dalam {total_batches} batch "
          f"(maks. {BATCH_SIZE} URL/batch)...\n")

    for idx, batch in enumerate(batches, start=1):
        submit_batch_to_indexnow(batch, idx, total_batches)


# ============================================================
# MAIN
# ============================================================
if __name__ == "__main__":
    urls = fetch_urls_from_sitemap(SITEMAP_URL)
    if urls:
        print(f"\n📊 Total URL terkumpul: {len(urls)}")
        submit_urls_in_batches(urls)
    else:
        print("❌ Tidak ada URL yang ditemukan dari sitemap.")