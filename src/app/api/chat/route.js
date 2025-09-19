export async function POST(request) {
  try {
    const body = await request.json();
    const { message, systemPrompt } = body;
    
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

    const finalMessages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: message }
    ];

    // console.log("Final Messages:", finalMessages);
    
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-small-3.2-24b-instruct-2506:free",
          messages: finalMessages,
        }),
      },
    );

    const data = await response.json();
    // console.log("OpenRouter Response Data:", data);
    
    const assistantReply = data?.choices?.[0]?.message?.content;

    return Response.json({ response: assistantReply });
  } catch (err) {
    console.error("OpenRouter error:", err);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
