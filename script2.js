// Fake data generator
function generateFakeData() {
    const pairs = [];
    const symbols = ['ETH', 'BTC', 'USDT', 'BNB', 'ADA', 'DOGE', 'XRP', 'SOL', 'DOT', 'LTC'];

    for (let i = 0; i < 10; i++) { // Reduce number of pairs to 10
        const token0 = symbols[Math.floor(Math.random() * symbols.length)];
        const token1 = symbols[Math.floor(Math.random() * symbols.length)];
        const reserve0 = (Math.random() * 1000).toFixed(2);
        const reserve1 = (Math.random() * 1000).toFixed(2);
        const volumeUSD = (Math.random() * 10000).toFixed(2);
        const reserveUSD = (Math.random() * 100000).toFixed(2);
        const priceChange = (Math.random() * 10 - 5).toFixed(2);

        pairs.push({
            token0,
            token1,
            reserve0,
            reserve1,
            volumeUSD,
            reserveUSD,
            priceChange
        });
    }

    return pairs;
}

// Populate ticker section with fake data
function populateTickers() {
    const tickerSection = document.getElementById('ticker-section');
    const pairs = generateFakeData();

    pairs.forEach(pair => {
        const ticker = document.createElement('div');
        ticker.className = 'ticker';

        const tickerTitle = document.createElement('div');
        tickerTitle.className = 'ticker-title';
        tickerTitle.innerText = `${pair.token0}/${pair.token1}`;

        const tickerData = document.createElement('div');
        tickerData.className = 'ticker-data';

        const reserve0 = document.createElement('span');
        reserve0.innerText = `Res0: ${pair.reserve0}`;

        const reserve1 = document.createElement('span');
        reserve1.innerText = `Res1: ${pair.reserve1}`;

        const volumeUSD = document.createElement('span');
        volumeUSD.innerText = `Vol: $${pair.volumeUSD}`;

        const reserveUSD = document.createElement('span');
        reserveUSD.innerText = `Res: $${pair.reserveUSD}`;

        const priceChange = document.createElement('span');
        priceChange.innerText = `${pair.priceChange}%`;
        priceChange.className = pair.priceChange >= 0 ? 'positive' : 'negative';

        tickerData.appendChild(reserve0);
        tickerData.appendChild(reserve1);
        tickerData.appendChild(volumeUSD);
        tickerData.appendChild(reserveUSD);
        tickerData.appendChild(priceChange);

        ticker.appendChild(tickerTitle);
        ticker.appendChild(tickerData);

        tickerSection.appendChild(ticker);
    });
}

window.addEventListener('load', populateTickers);
