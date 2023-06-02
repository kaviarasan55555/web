
async function fetchNationality(name) {
    const response = await fetch(`https://api.nationalize.io/?name=${name}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch nationality for ${name}`);
    }
    return response.json();
  }
  
 
  function displayResults(data) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
  
    if (data.country && data.country.length > 0) {
      const topTwoCountries = data.country.slice(0, 2);
      topTwoCountries.forEach((country) => {
        const countryElement = document.createElement('div');
        countryElement.innerHTML = `<p>Country: ${country.country_id}</p>
                                    <p>Probability: ${country.probability.toFixed(2)}</p>`;
        resultsContainer.appendChild(countryElement);
      });
    } else {
      resultsContainer.innerHTML = '<p>No nationality data available.</p>';
    }
  }
  
  
  function highlightSearchText(text, search) {
    const regex = new RegExp(`(${search})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }
  
  
  document.getElementById('searchButton').addEventListener('click', async () => {
    try {
      const nameInput = document.getElementById('nameInput');
      const name = nameInput.value.trim();
  
      if (name === '') {
        return;
      }
  
      const data = await fetchNationality(name);
      displayResults(data);
  
      
      const resultsContainer = document.getElementById('results');
      resultsContainer.innerHTML = highlightSearchText(resultsContainer.innerHTML, name);
    } catch (error) {
      console.error(error);
    }
  });