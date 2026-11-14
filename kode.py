# generate-sitemap.py
import json
import os
import re
import datetime

# ==========================================
# KONFIGURASI
# ==========================================
SITE_URL = "https://kerabatweb.com"
TODAY = datetime.datetime.now().strftime("%Y-%m-%d")

# Path file (sudah disesuaikan dengan folder data/)
WILAYAH_FILE = "data/wilayah_indonesia.json"
BLOG_FILE = "data/blog-posts.ts"
OUTPUT_DIR = "public"
OUTPUT_FILE = os.path.join(OUTPUT_DIR, "sitemap.xml")

# ==========================================
# FUNGSI BANTUAN: Membangun URL dengan trailing slash
# ==========================================
def build_url(*parts):
    """
    Menggabungkan bagian URL dan memastikan diakhiri dengan trailing slash.
    """
    cleaned = [str(p).strip("/") for p in parts if p]
    path = "/".join(cleaned)
    if path:
        return f"{SITE_URL}/{path}/"
    return f"{SITE_URL}/"

# ==========================================
# 1. URL STATIS (Halaman Utama & Layanan)
# ==========================================
urls = [
    {"loc": build_url(), "changefreq": "daily", "priority": "1.0"},
    {"loc": build_url("blog"), "changefreq": "daily", "priority": "0.9"},
    {"loc": build_url("tentang-kami"), "changefreq": "monthly", "priority": "0.8"},
    {"loc": build_url("kontak"), "changefreq": "monthly", "priority": "0.7"},
    {"loc": build_url("kebijakan-privasi"), "changefreq": "yearly", "priority": "0.5"},
    {"loc": build_url("syarat-ketentuan"), "changefreq": "yearly", "priority": "0.5"},
]

# ==========================================
# 2. URL BLOG (dari data/blog-posts.ts)
# ==========================================
print(f"📖 Membaca file blog: {BLOG_FILE}")
if os.path.exists(BLOG_FILE):
    with open(BLOG_FILE, "r", encoding="utf-8") as f:
        content = f.read()

    blog_slugs = re.findall(r'slug:\s*["\']([^"\']+)["\']', content)
    blog_slugs = sorted(list(set(blog_slugs)))

    print(f"✅ Ditemukan {len(blog_slugs)} artikel blog.")
    for slug in blog_slugs:
        urls.append({
            "loc": build_url("blog", slug),
            "changefreq": "weekly",
            "priority": "0.8"
        })
else:
    print(f"⚠️ File {BLOG_FILE} tidak ditemukan. Lewati bagian blog.")

# ==========================================
# 3. URL PROVINSI, KABUPATEN, & KECAMATAN
# ==========================================
print(f"📖 Membaca file wilayah: {WILAYAH_FILE}")
if os.path.exists(WILAYAH_FILE):
    with open(WILAYAH_FILE, "r", encoding="utf-8") as f:
        wilayah_data = json.load(f)

    total_provinsi = 0
    total_kabupaten = 0
    total_kecamatan = 0

    for provinsi in wilayah_data:
        prov_slug = provinsi.get("slug")
        if not prov_slug:
            continue

        # ---- URL Provinsi: /aceh/ ----
        urls.append({
            "loc": build_url(prov_slug),
            "changefreq": "weekly",
            "priority": "0.8"
        })
        total_provinsi += 1

        for kabupaten in provinsi.get("regencies", []):
            kab_slug = kabupaten.get("slug")
            if not kab_slug:
                continue

            # ---- URL Kabupaten/Kota: /aceh/simeulue/ ----
            urls.append({
                "loc": build_url(prov_slug, kab_slug),
                "changefreq": "weekly",
                "priority": "0.7"
            })
            total_kabupaten += 1

            # ---- URL Kecamatan: /aceh/simeulue/teupah-selatan/ ----
            for kecamatan in kabupaten.get("districts", []):
                kec_slug = kecamatan.get("slug")
                if not kec_slug:
                    continue

                urls.append({
                    "loc": build_url(prov_slug, kab_slug, kec_slug),
                    "changefreq": "monthly",
                    "priority": "0.6"
                })
                total_kecamatan += 1

    print(f"✅ Ditemukan {total_provinsi} provinsi, "
          f"{total_kabupaten} kabupaten/kota, "
          f"{total_kecamatan} kecamatan.")
else:
    print(f"❌ File {WILAYAH_FILE} tidak ditemukan. Gagal melanjutkan.")
    exit(1)

# ==========================================
# 4. GENERATE XML
# ==========================================
print(f"⏳ Membuat sitemap.xml...")

xml_content = '<?xml version="1.0" encoding="UTF-8"?>\n'
xml_content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

for item in urls:
    xml_content += "  <url>\n"
    xml_content += f"    <loc>{item['loc']}</loc>\n"
    xml_content += f"    <lastmod>{TODAY}</lastmod>\n"
    xml_content += f"    <changefreq>{item['changefreq']}</changefreq>\n"
    xml_content += f"    <priority>{item['priority']}</priority>\n"
    xml_content += "  </url>\n"

xml_content += '</urlset>\n'

os.makedirs(OUTPUT_DIR, exist_ok=True)

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    f.write(xml_content)

print(f"✅ Selesai! File sitemap berhasil dibuat di: {OUTPUT_FILE}")
print(f"🔗 Total URL dimasukkan: {len(urls)}")