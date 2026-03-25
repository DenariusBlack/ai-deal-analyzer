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

## Scoring Engine (deterministic logic before AI)

Before any Claude API call, the server applies deterministic scoring rules:

- Margin threshold check: if estimated margin falls below 10%, the deal is flagged as high risk regardless of AI output
- Supplier age heuristic: new suppliers (unverified history) automatically increase risk score by one level
- Quantity-to-price ratio: unusually low unit prices for high quantities trigger a fraud-risk flag
- Category risk multiplier: certain product categories (electronics, supplements) carry a baseline risk premium

These rules run first. The AI then receives the pre-scored deal as context, which anchors its reasoning rather than relying on general inference alone.

## Structured Output (JSON example)

The API returns a consistent JSON structure on every request:

```json
{
  "risk_level": "Medium",
  "estimated_margin": "18-24%",
  "recommendation": "Proceed with caution — request product samples before full order.",
  "key_factors": "New supplier, competitive pricing, high demand product",
  "flags": ["unverified_supplier", "margin_near_threshold"],
  "confidence": "high"
}
```

Fields are validated server-side before returning to the client. Malformed AI responses are retried once before returning an error.

## System Design Flow

```
User Input (product, supplier, price, quantity)
        ↓
Deterministic Scoring Engine (margin check, supplier flags, category risk)
        ↓
Claude API Call (pre-scored context injected into prompt)
        ↓
JSON Response Parsing + Validation
        ↓
Structured Output → Frontend Display
```
