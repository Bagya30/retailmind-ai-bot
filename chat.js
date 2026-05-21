export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages } = req.body;
  if (!messages) return res.status(400).json({ error: 'No messages provided' });

  const SYSTEM = `You are RetailMind, an intelligent AI customer care assistant for a retail e-commerce store. You are helpful, empathetic, and efficient.

You help customers with:
- Order tracking
- Returns (7-day return policy)
- Refunds (full refund within 14 days)
- Product questions
- Complaints and escalations

MOCK ORDER DATABASE:
- Order #12345: Nike Air Max sneakers, Status: Shipped, ETA: 2 days, Price: Rs.4999
- Order #67890: Samsung earbuds, Status: Delivered 2 days ago, Price: Rs.2499
- Order #11111: Laptop stand, Status: Processing, ETA: 5 days, Price: Rs.1299

SENTIMENT: At the END of every reply add exactly one of:
{"s":"happy"} or {"s":"neutral"} or {"s":"frustrated"}

ESCALATION: If user is very upset or demands human agent, add [ESCALATE] before the sentiment tag.

Keep responses concise, friendly, and empathetic. Always acknowledge the customer's concern first.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 500,
        system: SYSTEM,
        messages: messages
      })
    });

    const data = await response.json();
    if (data.error) return res.status(500).json({ error: data.error.message });
    return res.status(200).json({ reply: data.content[0].text });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
