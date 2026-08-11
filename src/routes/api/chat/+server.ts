import { json } from '@sveltejs/kit';
import { GEMINI_API_KEY } from '$env/static/private';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY
});

const rateLimit = new Map();

const systemInstruction = `
Sen Diyetisyen Ayşenur Doğan'ın web sitesindeki profesyonel beslenme asistanı Hera isimli kedisin.

Kimliğin:
- Adın yalnızca Hera.
- Bir kedisin.
- Kendini hiçbir zaman Tavşan, Misket veya başka bir isimle tanıtma.
- Kullanıcı selam verdiğinde kısa ve profesyonel biçimde karşılık ver.

Yalnızca şu konularda yardımcı ol:
- Sağlıklı beslenme
- Diyet süreçleri
- Kilo verme ve kilo alma
- Besinler ve porsiyonlar
- Öğün planlama
- Sağlıklı tarifler
- Diyetisyen hizmetleri hakkında genel bilgi

Beslenme dışındaki konularda şu anlama gelen kısa bir yanıt ver:
"Ben Hera, yalnızca beslenme ve sağlıklı yaşam konularında yardımcı olan bir asistanım. 🐱"

Yanıtların:
- Türkçe
- Kısa ve profesyonel
- Samimi fakat çocukça olmayan
- Gereksiz emoji kullanmayan
- En fazla 4 kısa paragraf
- Tıbbi teşhis veya tedavi önermeyen

Kullanıcı ciddi sağlık sorunu, yeme bozukluğu, hamilelik, kronik hastalık, ilaç kullanımı veya acil durumdan bahsederse doktora ya da diyetisyene yönlendir.
`;

export async function POST({ request, getClientAddress }) {
    try {
        const ip = getClientAddress();
        const now = Date.now();
        const userLimit = rateLimit.get(ip);

        if (userLimit) {
            if (now - userLimit.startTime < 60000) {
                if (userLimit.count >= 5) {
                    return json(
                        { reply: 'Çok fazla mesaj gönderdiniz. Lütfen bir dakika bekleyip tekrar deneyin. 🐱' },
                        { status: 429 }
                    );
                }
                userLimit.count += 1;
            } else {
                rateLimit.set(ip, { count: 1, startTime: now });
            }
        } else {
            rateLimit.set(ip, { count: 1, startTime: now });
        }

        const body = await request.json();
        const message =
            typeof body?.message === 'string' ? body.message.trim() : '';

        if (!message) {
            return json(
                {
                    reply: 'Lütfen beslenmeyle ilgili sorunuzu yazın. 🐱'
                },
                {
                    status: 400
                }
            );
        }

        const response = await ai.models.generateContent({
            model: 'gemini-3.1-flash-lite',
            contents: message,
            config: {
                systemInstruction,
                temperature: 0.45,
                topP: 0.85,
                maxOutputTokens: 450
            }
        });

        const reply = response.text?.trim();

        if (!reply) {
            throw new Error('Model boş yanıt döndürdü.');
        }

        return json({ reply });
    } catch (error) {
        console.error('Gemini Hatası:', error);

        return json(
            {
                reply: 'Şu anda yanıt oluşturamıyorum. Lütfen kısa bir süre sonra tekrar deneyin. 🐱'
            },
            {
                status: 503
            }
        );
    }
}