# Yemekhane Kontrol Dashboard

Bu proje, okul yemekhane haftalık menülerini yönetmek için hazırlanmış küçük bir React uygulamasıdır. Vite ile geliştirme deneyimi ve hızlı üretim yapısı kullanır. Aşağıda proje hakkında kısa bilgiler ve nasıl çalıştırılacağı yer alır.

Özellikler
- Haftalık yemek kayıtları oluşturma, düzenleme ve silme
- Haftalara göre listeleme ve hafta tarih aralığını gösterme
- Yerelde kalıcı saklama için `localStorage` kullanımı (kullanıcı verileri tarayıcıda saklanır)

Teknolojiler
- React (JSX)
- Vite (dev sunucusu ve build)
- Bootstrap 5 (stil)
- ESLint (kod kalitesi)
- Netlify (barındırma / deploy)

Yerel Kurulum
1. Depoyu klonla veya proje klasörüne git:

```powershell
cd "c:\Users\edaoz\OneDrive\Masaüstü\SoftwarePersona\Javascript\yemekhane_kontrol_dashborad_app"
```

2. Bağımlılıkları yükle:

```powershell
npm install
```

3. Geliştirme sunucusunu başlat:

```powershell
npm run dev
```

Tarayıcıda `http://localhost:5173/` adresine gidin.

Üretim (build)

```powershell
npm run build
```

Çıktı `dist/` klasöründe oluşur; bu klasörü Netlify gibi bir servisle dağıtabilirsiniz.

Netlify Deploy Notları
- Netlify yapılandırması `netlify.toml` dosyasında bulunur. Değişiklik yaptıktan sonra GitHub'a pushlarsanız Netlify otomatik olarak yeniden dağıtım yapacaktır.
- Kullanıcı verileri şu anda `localStorage`'da saklanır; birden çok kullanıcı veya paylaşılan kalıcılık isterseniz Firebase/Supabase/Airtable gibi bir backend bağlamanızı öneririm.

Katkıda Bulunma
- Değişiklik yapıp göndermek için bir branch açın, değişikliklerinizi commit edip pushlayın ve pull request oluşturun.

Sorun bildirimi
- Projeyi çalıştırırken veya deploy ederken hata alırsanız, terminal çıktısını ve Netlify build loglarını paylaşın; yardımcı olurum.

----
Güncel kod ve çalışma talimatları için `src/` altındaki dosyalara bakabilirsiniz.
