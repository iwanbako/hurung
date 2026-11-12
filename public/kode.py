import xml.etree.ElementTree as ET

def extract_urls_from_sitemap(sitemap_path, output_txt_path):
    try:
        # Membaca file sitemap.xml
        tree = ET.parse(sitemap_path)
        root = tree.getroot()
        
        # Namespace standar sitemap XML
        namespace = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
        
        urls = []
        
        # Mencari semua tag <loc> di dalam <url>
        for url in root.findall('ns:url', namespace):
            loc = url.find('ns:loc', namespace)
            if loc is not None and loc.text:
                urls.append(loc.text.strip())
                
        # Alternatif jika namespace tidak terdeteksi secara persis
        if not urls:
            for loc in root.iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc'):
                if loc.text:
                    urls.append(loc.text.strip())

        # Menyimpan daftar URL ke file .txt
        with open(output_txt_path, 'w', encoding='utf-8') as f:
            for url in urls:
                f.write(url + '\n')
                
        print(f"Sukses! Berhasil mengekstrak {len(urls)} URL ke file '{output_txt_path}'.")
        
    except Exception as e:
        print(f"Terjadi kesalahan saat memproses file: {e}")

# Contoh Penggunaan:
# Pastikan file sitemap.xml berada di folder yang sama atau sesuaikan path-nya
extract_urls_from_sitemap('sitemap.xml', 'output_url.txt')