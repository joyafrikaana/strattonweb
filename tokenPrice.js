async function fetchTokenPrice() {
    try {
        const url = `https://stratton-web-dusky.vercel.app/api/getTokenPrice`;
        console.log('Fetching from URL:', url); // Log the URL
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        console.log('Fetched token price:', data); // Log the entire data to verify its structure
        if (data && data.price !== undefined) {
            return data.price; // Ensure this path correctly points to the price value
        } else {
            throw new Error('Price data is undefined');
        }
    } catch (error) {
        console.error('Error fetching token price:', error.message);
        return generateFakePrice(); // Fallback to fake data in case of error
    }
}

function generateFakePrice() {
    console.log('Generating fake price as fallback');
    return 0.0009999; // Example fake price
}

function displayTokenPrice(price) {
    console.log('Displaying token price:', price);
    const priceDisplay = document.createElement('div');
    priceDisplay.className = 'price-display';
    priceDisplay.innerText = `Token Price: $${price}`;
    document.querySelector('.top').appendChild(priceDisplay);
}

async function initializeTokenPrice() {
    const price = await fetchTokenPrice();
    console.log('Initial token price:', price);
    displayTokenPrice(price);
}

window.addEventListener('load', initializeTokenPrice);
