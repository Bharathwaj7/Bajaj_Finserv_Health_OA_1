# BFHL API

REST API for VIT assignment that processes arrays and returns categorized data.

## What it does

Takes an array with mixed data types and separates everything into different categories. Returns odd numbers, even numbers, alphabets, special chars, sum of numbers, and some concatenated string thing.

## API Details

**POST** `/bfhl`

Request:
```json
{
  "data": ["a","1","334","4","R", "$"]
}
```

Response:
```json
{
  "is_success": true,
  "user_id": "bharathwaj_21092001",
  "email": "tvlbharath.waj@vitstudent.ac.in", 
  "roll_number": "22BAI1349",
  "odd_numbers": ["1"],
  "even_numbers": ["334","4"],
  "alphabets": ["A","R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

## Running locally

```bash
npm install
npm start
```

Server runs on http://localhost:3000

Test with:
```bash
curl -X POST http://localhost:3000/bfhl -H "Content-Type: application/json" -d '{"data": ["a","1","334","4","R", "$"]}'
```

## Config

Change your details in server.js:
```javascript
const USER_INFO = {
  user_id: "your_name_ddmmyyyy",
  email: "your_email@vitstudent.ac.in",
  roll_number: "YOUR_ROLL"
};
```

## Deployment

Can deploy on Railway, Render, Vercel or whatever. Just make sure PORT env variable is set properly.

## Notes
- All numbers returned as strings
- Basic error handling included
- Health check at GET /health
