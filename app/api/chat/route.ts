import { NextRequest, NextResponse } from "next/server";

const SYSTEM_CONTEXT = `
You are a helpful assistant embedded on Teddy Mbayaki's personal portfolio website.
Answer visitor questions about Teddy using ONLY the information below. Keep answers
short, calm, and professional. If asked something outside this info, say you don't
have that detail and suggest they use the Contact page.

About Teddy:
- Frontend developer building AI-powered interfaces.
- Based in Nairobi, Kenya. Available for freelance projects, full-time roles, and collaborations.
- Skills: Next.js, React, TypeScript, Tailwind CSS, Node.js, Python, Flutter, Firebase.

Featured project — Weather Dashboard:
- A weather app with real-time conditions, a 5-day forecast, saved locations, and a
  conversational AI chat layer.
- Built four core views: Dashboard, Forecast, Saved Locations, Health, plus a station
  lookup for searching any location.
- Includes an AI weather chat so visitors can ask natural-language questions instead
  of reading charts directly.
- Live at https://weather-dashboard-ai-tau.vercel.app/

Contact:
- Email: teddymbayaki@gmail.com
- GitHub: https://github.com/037teddy
- LinkedIn: https://www.linkedin.com/in/teddy-ijaka-631a77412/
`;

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Missing message" }, { status: 400 });
    }

    const openaiKey =
      process.env.OPENAI_API_KEY || process.env.OPENAI_AI_API_KEY;
    const geminiKey =
      process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!openaiKey && !geminiKey) {
      return NextResponse.json(
        { error: "Server missing API key" },
        { status: 500 }
      );
    }

    const geminiModel =
      process.env.GEMINI_MODEL || "gemini-3.5-flash";
    const openAIModel = process.env.OPENAI_MODEL || "gpt-4o-mini";

    let reply = "Sorry, I couldn't generate a response.";

    if (geminiKey) {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `${SYSTEM_CONTEXT}\n\nVisitor question: ${message}`,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        console.error("Gemini error:", errText);
        return NextResponse.json(
          { error: "Failed to get response from Gemini", detail: errText },
          { status: 500 }
        );
      }

      const data = await response.json();
      reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't generate a response.";
    } else {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model: openAIModel,
          messages: [
            { role: "system", content: SYSTEM_CONTEXT },
            { role: "user", content: message },
          ],
          temperature: 0.2,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error("OpenAI error:", errText);
        return NextResponse.json(
          { error: "Failed to get response from OpenAI", detail: errText },
          { status: 500 }
        );
      }

      const data = await response.json();
      reply =
        data?.choices?.[0]?.message?.content?.trim() ||
        "Sorry, I couldn't generate a response.";
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}