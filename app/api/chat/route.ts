import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Mesaj gerekli" },
        { status: 400 }
      )
    }

    // Burada lokal bir AI modeli entegre edilebilir
    // Şimdilik basit bir yanıt üretici kullanıyoruz
    // Gerçek bir lokal AI için burada Ollama, LM Studio veya başka bir lokal model API'si kullanılabilir

    // Basit bir mock response (gerçek bir lokal AI entegrasyonu için değiştirilebilir)
    const response = await generateResponse(message, history || [])

    return NextResponse.json({ response })
  } catch (error) {
    console.error("Chat API hatası:", error)
    return NextResponse.json(
      { error: "Bir hata oluştu" },
      { status: 500 }
    )
  }
}

// Basit bir yanıt üretici (gerçek bir lokal AI modeli ile değiştirilebilir)
async function generateResponse(
  message: string,
  history: Array<{ role: string; content: string }>
): Promise<string> {
  // Bu fonksiyon gerçek bir lokal AI modeli API çağrısı ile değiştirilebilir
  // Örnek: Ollama, LM Studio, veya başka bir lokal model

  const lowerMessage = message.toLowerCase()

  // Basit pattern matching (örnek amaçlı)
  if (lowerMessage.includes("merhaba") || lowerMessage.includes("selam")) {
    return "Merhaba! Size nasıl yardımcı olabilirim?"
  }

  if (lowerMessage.includes("nasılsın")) {
    return "Teşekkür ederim, iyiyim! Size nasıl yardımcı olabilirim?"
  }

  if (lowerMessage.includes("adın") || lowerMessage.includes("kimsin")) {
    return "Ben lokal AI asistanınızım. Size yardımcı olmak için buradayım."
  }

  if (lowerMessage.includes("yardım")) {
    return "Size nasıl yardımcı olabilirim? Sorularınızı sorabilir, sohbet edebiliriz. Gerçek bir lokal AI modeli entegre edildiğinde daha kapsamlı yanıtlar alabilirsiniz."
  }

  // Varsayılan yanıt
  return `"${message}" hakkında düşünüyorum. Bu basit bir mock yanıttır. Gerçek bir lokal AI modeli (örneğin Ollama, LM Studio) entegre edildiğinde daha detaylı ve bağlamsal yanıtlar alabilirsiniz.`
}

