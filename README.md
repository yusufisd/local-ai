# Local AI - Ollama Entegrasyonlu Chat Uygulaması

Bu proje, lokal olarak çalışan Ollama AI modellerini kullanan bir Next.js chat uygulamasıdır.

## Özellikler

- 🤖 Ollama ile lokal AI desteği
- 💬 Modern chat arayüzü
- 📱 Responsive tasarım
- 🎨 shadcn/ui componentleri

## Kurulum

### 1. Bağımlılıkları Yükleyin

```bash
npm install
# veya
yarn install
# veya
pnpm install
```

### 2. Ollama'yı Kurun ve Başlatın

[Ollama'yı resmi web sitesinden](https://ollama.org/) indirip kurun. Kurulumdan sonra Ollama'yı başlatın:

```bash
# Ollama'nın çalıştığını kontrol edin
curl http://localhost:11434/api/tags
```

### 3. Bir Model İndirin

Kullanmak istediğiniz bir modeli indirin (örnekler):

```bash
ollama pull llama3.2
# veya
ollama pull mistral
# veya
ollama pull codellama
```

Mevcut modelleri görmek için:
```bash
ollama list
```

### 4. Ortam Değişkenlerini Ayarlayın

`.env.local` dosyası oluşturun (`.env.local.example` dosyasını referans alarak):

```bash
cp .env.local.example .env.local
```

`.env.local` dosyasını düzenleyin:

```env
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2  # İndirdiğiniz model adını buraya yazın
```

### 5. Geliştirme Sunucusunu Başlatın

```bash
npm run dev
# veya
yarn dev
# veya
pnpm dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## Kullanım

1. Ollama'nın çalıştığından emin olun (`http://localhost:11434`)
2. Uygulamayı açın ve sohbet etmeye başlayın!
3. Sidebar'dan sohbet geçmişinize ve ayarlara erişebilirsiniz

## Yapılandırma

### Farklı Bir Model Kullanma

`.env.local` dosyasındaki `OLLAMA_MODEL` değerini değiştirin:

```env
OLLAMA_MODEL=mistral
```

### Farklı Bir Ollama URL'i

Eğer Ollama farklı bir portta çalışıyorsa:

```env
OLLAMA_BASE_URL=http://localhost:11435
```

## Sorun Giderme

### Ollama'ya Bağlanılamıyor

- Ollama'nın çalıştığından emin olun: `curl http://localhost:11434/api/tags`
- `.env.local` dosyasındaki `OLLAMA_BASE_URL` değerini kontrol edin
- Firewall ayarlarını kontrol edin

### Model Bulunamadı

- Modelin indirildiğinden emin olun: `ollama list`
- `.env.local` dosyasındaki `OLLAMA_MODEL` adının doğru olduğunu kontrol edin

## Teknolojiler

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Ollama](https://ollama.org/)
