# AI Deal Analyzer

Analyze any B2B deal for risk level, estimated margin, and AI recommendation.

## How It Works

1. Enter deal details (product, supplier, price, quantity)
2. Claude AI analyzes risk factors and margin potential
3. Get structured output: Risk Level, Estimated Margin, Recommendation

## Tech Stack

- Claude API (Anthropic)
- Node.js
- HTML/CSS (no framework, keep it simple)

## How to Run

```bash
ANTHROPIC_API_KEY=your_key node server.js
```

Open http://localhost:3000 in your browser.

## Example Output

```json
{
  "risk_level": "Medium",
  "estimated_margin": "18-24%",
  "recommendation": "Proceed with caution — request product samples before full order.",
  "key_factors": "New supplier, competitive pricing, high demand product"
}
```
