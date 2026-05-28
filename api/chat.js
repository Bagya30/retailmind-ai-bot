export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { messages } = req.body;
  if (!messages) return res.status(400).json({ error: 'No messages provided' });
  const SYSTEM = `You are RetailMind v2, an intelligent AI customer care assistant for a retail e-commerce store. Be helpful, empathetic, and concise.
You help with: order tracking, returns (7-day policy), refunds (14-day full refund), product questions, complaints, product recommendations.
MOCK ORDERS:
- #12345: Nike Air Max sneakers, Shipped, ETA 2 days, Rs.4999
- #67890: Samsung earbuds, Delivered 2 days ago, Rs.2499
- #11111: Laptop stand, Processing, ETA 5 days, Rs.1299
PRODUCTS: Nike Air Force 1 Rs.6999, boAt Rockerz 450 Rs.1499, Adjustable Desk Rs.3499, Sony Earphones Rs.2999
If user asks for recommendations, add [RECOMMEND] tag in your reply.
At END of every reply add exactly one: {"s":"happy"} or {"s":"neutral"} or {"s":"frustrated"}
If user is very upset or demands human, add [ESCALATE] before sentiment tag.`;
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 500, system: SYSTEM, messages })
    });
    const data = await response.json();
    if (data.error) return res.status(500).json({ error: data.error.message });
    return res.status(200).json({ reply: data.content[0].text });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
