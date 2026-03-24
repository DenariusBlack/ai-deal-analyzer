const http = require('http');
const fs = require('fs');
const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const server = http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(fs.readFileSync('index.html'));
  } else if (req.method === 'POST' && req.url === '/analyze') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const message = await client.messages.create({
          model: 'claude-sonnet-4-5',
          max_tokens: 1024,
          messages: [{
            role: 'user',
            content: 'Analyze this B2B deal and return JSON only:\n\nProduct: ' + data.product + '\nSupplier: ' + data.supplier + '\nUnit Price: $' + data.price + '\nQuantity: ' + data.quantity + '\nNotes: ' + data.notes + '\n\nReturn exactly this JSON structure:\n{\n  "risk_level": "Low/Medium/High",\n  "estimated_margin": "percentage range",\n  "recommendation": "one sentence recommendation",\n  "key_factors": "2-3 key factors"\n}'
          }]
        });
        const text = message.content[0].text;
        const clean = text.replace(/```json|```/g, '').trim();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(clean);
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(3000, () => console.log('Running on http://localhost:3000'));
