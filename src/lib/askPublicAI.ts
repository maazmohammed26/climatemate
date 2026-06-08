export async function askPublicAI(
  prompt: string,
  model = "tinyllama",
): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch("https://mlvoca.com/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        model,
        prompt,
        stream: false,
        format: "json",
        options: { temperature: 0.2 },
      }),
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error("AI service is currently busy.");
    }

    const data = await response.json();
    return data.response || "";
  } catch (error) {
    clearTimeout(timeout);
    console.error("AI Error:", error);
    throw new Error("Unable to generate AI response.");
  }
}
