import { NextRequest, NextResponse } from "next/server"

// Ollama yapılandırması
const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "http://localhost:11434"
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3"

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Mesaj gerekli" },
        { status: 400 }
      )
    }

    // Ollama API'sine istek gönder
    const response = await generateOllamaResponse(message, history || [])

    return NextResponse.json({ response })
  } catch (error) {
    console.error("Chat API hatası:", error)
    
    // Ollama bağlantı hatası kontrolü
    if (error instanceof Error && error.message.includes("fetch failed")) {
      return NextResponse.json(
        { 
          error: "Ollama'ya bağlanılamadı. Lütfen Ollama'nın çalıştığından emin olun (http://localhost:11434)" 
        },
        { status: 503 }
      )
    }

    // Ollama model hatası kontrolü
    if (error instanceof Error && error.message.includes("model")) {
      return NextResponse.json(
        { 
          error: `Model bulunamadı: ${OLLAMA_MODEL}. Lütfen 'ollama list' komutu ile mevcut modelleri kontrol edin veya .env.local dosyasındaki OLLAMA_MODEL değerini güncelleyin.` 
        },
        { status: 400 }
      )
    }

    // Detaylı hata mesajı
    const errorMessage = error instanceof Error ? error.message : "Bilinmeyen bir hata oluştu"
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

// Ollama API'sini kullanarak yanıt üret
async function generateOllamaResponse(
  message: string,
  history: Array<{ role: string; content: string }>
): Promise<string> {
  // Mesaj geçmişini Ollama formatına çevir
  const messages = [
    ...history.map((msg) => ({
      role: msg.role === "user" ? "user" : "assistant",
      content: msg.content,
    })),
    {
      role: "user",
      content: message,
    },
  ]

  try {
    const response = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages: messages,
        stream: false, // Streaming'i false yapıyoruz, tek seferde yanıt alıyoruz
      }),
    })

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}`
      try {
        const errorData = await response.json()
        errorMessage = errorData.error || errorData.message || errorMessage
      } catch {
        const errorText = await response.text()
        errorMessage = errorText || errorMessage
      }
      throw new Error(errorMessage)
    }

    const data = await response.json()

    // Ollama yanıt formatı: { message: { content: "...", role: "assistant" }, ... }
    if (data.message && data.message.content) {
      return data.message.content
    }

    throw new Error("Ollama'dan beklenmeyen yanıt formatı")
  } catch (error) {
    console.error("Ollama API çağrı hatası:", error)
    throw error
  }
}

