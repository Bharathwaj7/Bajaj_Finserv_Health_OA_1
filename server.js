const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const USER_INFO = {
  user_id: "BharathWaj",
  email: "tvlbharath.waj@vitstudent.ac.in",
  roll_number: "22BAI1349"
};

function isNumeric(str) {
  return !isNaN(str) && !isNaN(parseFloat(str));
}

function isAlphabet(str) {
  return /^[a-zA-Z]+$/.test(str);
}

function hasSpecialChars(str) {
  return /[^a-zA-Z0-9]/.test(str);
}

function createAlternatingCase(chars) {
  return chars.map((char, index) => {
    return index % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
  }).join('');
}

app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;
    
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        error: "Invalid input: 'data' must be an array"
      });
    }

    const oddNumbers = [];
    const evenNumbers = [];
    const alphabets = [];
    const specialCharacters = [];
    let numberSum = 0;
    const allAlphabetChars = [];

    data.forEach(item => {
      const itemStr = String(item);
      
      if (isNumeric(itemStr)) {
        const num = parseInt(itemStr);
        if (num % 2 === 0) {
          evenNumbers.push(itemStr);
        } else {
          oddNumbers.push(itemStr);
        }
        numberSum += num;
      } else if (isAlphabet(itemStr)) {
        alphabets.push(itemStr.toUpperCase());
        for (let char of itemStr) {
          allAlphabetChars.push(char);
        }
      } else if (hasSpecialChars(itemStr)) {
        specialCharacters.push(itemStr);
      }
    });

    const reversedAlphabetChars = allAlphabetChars.reverse();
    const concatString = createAlternatingCase(reversedAlphabetChars);

    const response = {
      is_success: true,
      user_id: USER_INFO.user_id,
      email: USER_INFO.email,
      roll_number: USER_INFO.roll_number,
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
      special_characters: specialCharacters,
      sum: numberSum.toString(),
      concat_string: concatString
    };

    res.status(200).json(response);

  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({
      is_success: false,
      error: "Internal server error"
    });
  }
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// Default route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'BFHL API Server is running',
    endpoints: {
      'POST /bfhl': 'Main processing endpoint',
      'GET /health': 'Health check endpoint'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(` BFHL API Server running on port ${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/bfhl`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

module.exports = app;