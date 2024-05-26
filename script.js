async function fetchLiveData() {
    try {
        const response = await fetch('https://stratton-web-dusky.vercel.app/api/hotpools');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        console.log('Fetched live data:', data);
        return data.data; // Adjust this based on the actual response structure
    } catch (error) {
        console.error('Error fetching live data:', error.message);
        return generateFakeData(); // Fallback to fake data in case of error
    }
}

function generateFakeData() {
    console.log('Generating fake data as fallback');
    return [
        {
            rank: 14,
            creationTime: "2024-04-27T13:02:54.955Z",
            exchange: {
                name: "Raydium"
            },
            address: "2bfy6r43NzZwEMGnLkvxTdA5HnHmWueJE84a2BmaUtim",
            mainToken: {
                symbol: "ANDY"
            },
            sideToken: {
                symbol: "SOL"
            }
        }
    ];
}

function populateTickers(pairs) {
    console.log('Populating tickers with pairs:', pairs);
    const tickerSection = document.getElementById('ticker-section');
    const tickerSectionDuplicate = document.getElementById('ticker-section-duplicate');
    tickerSection.innerHTML = '';
    tickerSectionDuplicate.innerHTML = '';

    pairs.forEach(pair => {
        const ticker = document.createElement('div');
        ticker.className = 'ticker';
        ticker.innerText = `${pair.rank} | ${pair.mainToken.symbol}/${pair.sideToken.symbol} | Exchange: ${pair.exchange.name} | Created: ${new Date(pair.creationTime).toLocaleString()}`;
        tickerSection.appendChild(ticker);
        tickerSectionDuplicate.appendChild(ticker.cloneNode(true));
    });
}

async function initializeTicker() {
    const pairs = await fetchLiveData();
    console.log('Initial pairs:', pairs);
    populateTickers(pairs);
}

window.addEventListener('load', initializeTicker);
