# San-TSG Use Case

## Proje Özeti

Bu proje, React 18, TypeScript, Vite, React Router 6 ve TanStack React Query 5 ile geliştirilmiş, **kullanıcı yetkilendirme** ve **çok dillilik** (i18n) destekli modern bir SPA'dır. Tüm backend işlemleri [JSONPlaceholder](https://jsonplaceholder.typicode.com/) ile simüle edilir. Amaç, temiz mimariyle, merkezi yönlendirme ve yetki kontrolü sağlayan bir örnek uygulama sunmaktır.

---

## Kurulum ve Çalıştırma

1. **Projeyi klonlayın:**
   ```sh
   git clone https://github.com/yunusgnc/SAN-TSG-UseCase.git
   cd san-tsg-usecase
   ```

2. **Bağımlılıkları yükleyin:**
   ```sh
   npm install
   ```

3. **Projeyi başlatın:**
   ```sh
   npm run dev
   ```

4. **Tarayıcıda açın:**
   ```
   http://localhost:5173
   ```

---

## Login Ekranı ve İzinler

- **Login ekranında** kullanıcı adı otomatik olarak "John Doe" gelir.
- Giriş yapmadan önce, **kullanıcı izinlerinizi seçmeniz gerekir**:
  - **Gönderileri Görüntüle (VIEW_POSTS):** Zorunlu ve değiştirilemez.
  - **Yorumları Görüntüle (VIEW_COMMENTS):** Zorunlu ve değiştirilemez.
  - **Gönderileri Düzenle (EDIT_POST):** Opsiyonel, isterseniz seçebilirsiniz.
- Zorunlu izinler işaretli ve pasif (değiştirilemez) olarak gelir. Sadece "Gönderileri Düzenle" izni aktif olarak seçilebilir/deseçilebilir.
- Giriş yaptıktan sonra, seçtiğiniz izinlere göre uygulamanın farklı bölümlerine erişebilirsiniz.

---

## Uygulama Özellikleri

- **Yetkilendirme:**  
  Her sayfa ve aksiyon için gerekli izinler merkezi olarak tanımlanmıştır. Kullanıcının yetkisi yoksa otomatik olarak 403 sayfasına yönlendirilir.

- **Çok Dillilik (i18n):**  
  Sağ üstteki dil menüsünden Türkçe ve İngilizce arasında geçiş yapabilirsiniz. Tüm metinler anında güncellenir.

- **Dashboard:**  
  Giriş yaptıktan sonra son 5 gönderi ve son 5 yorumu görebilirsiniz. Yetkiniz varsa yeni gönderi oluşturabilir, düzenleyebilir veya silebilirsiniz.

- **Gönderiler:**  
  - Gönderi listesinde arama yapabilirsiniz.
  - Sadece ilk 5 gönderi listelenir.
  - Her gönderinin detayına gidebilir, yetkiniz varsa düzenleyebilir veya silebilirsiniz.
  - Silme işlemi için modern bir modal ile onay alınır (alert kullanılmaz).
  - Silme, ekleme ve güncelleme işlemleri **optimistic update** ile anında arayüze yansır.

- **Yorumlar:**  
  Her gönderinin detayında, "Yorumlar" sekmesinden ilgili yorumları görebilirsiniz. Yorumları görüntülemek için "Yorumları Görüntüle" izni gereklidir.

- **Navigasyon:**  
  - Tüm yönlendirme (route) tanımları tek bir dosyada merkezi olarak tutulur.
  - Programatik olarak sayfa geçişleri yapılabilir ve izin kontrolü otomatik olarak sağlanır.
  - Geri gitmek için "Geri" butonları veya tarayıcı geri özelliği kullanılabilir.

- **Çıkış:**  
  Sağ üstteki menüden çıkış yapabilirsiniz. Çıkış yaptıktan sonra tekrar login ekranına yönlendirilirsiniz.

---

## Yetki ve Sayfa Erişim Tablosu

| Sayfa/Aksiyon         | VIEW_POSTS | VIEW_COMMENTS | EDIT_POST |
|---------------------- |:----------:|:-------------:|:---------:|
| Dashboard             |      ✔      |       ✔       |     -     |
| Gönderi Listesi       |      ✔      |       -       |     -     |
| Gönderi Detayı        |      ✔      |       -       |     -     |
| Yorumlar Sekmesi      |      ✔      |       ✔       |     -     |
| Gönderi Oluştur       |      ✔      |       -       |     ✔     |
| Gönderi Düzenle/Sil   |      ✔      |       -       |     ✔     |

---


## Katkı ve Geliştirme

- Kodunuzu forkladıktan sonra PR gönderebilirsiniz.
- Her türlü öneri ve hata bildirimi için issue açabilirsiniz.

---

## Kısayol Akışı

1. Giriş ekranında izinlerinizi seçin.
2. Dashboard'da son gönderi ve yorumları inceleyin.
3. Gönderiler sekmesinden detay, düzenleme ve silme işlemlerini deneyin.
4. Sağ üstten dil değiştirin ve çıkış yapın.

---

**Proje Sahibi:**  
[Yunus Genç](https://github.com/yunusgnc)

---
