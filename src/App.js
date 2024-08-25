import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse(null);

    try {
      // Validate JSON
      JSON.parse(input);

      // Call API
      const result = await axios.post('https://backend-bajaj-yhmv.vercel.app/api/bfhl', JSON.parse(input));
      setResponse(result.data);
    } catch (err) {
      setError('Invalid JSON input or API error');
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOptions(prev => 
      prev.includes(option) 
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const renderResponse = () => {
    if (!response) return null;

    let filteredResponse = {};

    if (selectedOptions.includes('Alphabets')) {
      filteredResponse.alphabets = response.alphabets;
    }
    if (selectedOptions.includes('Numbers')) {
      filteredResponse.numbers = response.numbers;
    }
    if (selectedOptions.includes('Highest lowercase alphabet')) {
      filteredResponse.highestLowercase = response.highestLowercase;
    }

    return (
      <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
    );
  };

  return (
    <div className="App">
      <h1>JSON Processor</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON (e.g., { "data": ["A","C","z"] })'
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
      {response && (
        <div>
          <h2>Select options to display:</h2>
          <div>
            <label>
              <input
                type="checkbox"
                checked={selectedOptions.includes('Alphabets')}
                onChange={() => handleOptionChange('Alphabets')}
              />
              Alphabets
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={selectedOptions.includes('Numbers')}
                onChange={() => handleOptionChange('Numbers')}
              />
              Numbers
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={selectedOptions.includes('Highest lowercase alphabet')}
                onChange={() => handleOptionChange('Highest lowercase alphabet')}
              />
              Highest lowercase alphabet
            </label>
          </div>
          <h2>Response:</h2>
          {renderResponse()}
        </div>
      )}
    </div>
  );
}

export default App;