# negerekvar.github.io

p5.js demoları. İstediğin herhangi birini tıkla. Son 4 demoyu ai yazdı.

## Geliştirme

1. Gerekli paketleri yükle: `npm install`
2. Derle: `npm run build`
3. Statik olarak servis et: `python3 -m http.server 8000 --bind 127.0.0.1` ve tarayıcıdan `http://127.0.0.1:8000` adresine git.

Kaynak kodu `src/` altında TypeScript olarak duruyor; çıktılar `build/` klasörüne yazılıyor. Demo HTML dosyaları otomatik olarak `build/` altındaki dosyalara işaret eder.

## Dağıtım (GitHub Pages)

`.github/workflows/pages.yml` dosyası, `main` dalına her push sonrası otomatik derleyip Pages’e gönderir. Repoda Pages kaynağını **GitHub Actions** olarak ayarlamak yeterli.
