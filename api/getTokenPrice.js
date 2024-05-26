const axios = require('axios');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        const response = await axios.get(`https://public-api.dextools.io/trial/v2/pool/solana/AXTKvoNDZQ1hyg6HuuRnDohPaFtfxKaG8oDA21N12jhe/price`, {
            headers: {
                'accept': 'application/json',
                'X-API-Key': process.env.API_KEY
            }
        });
        
        console.log('API response data:', response.data);
        
        // Assuming the price information is within the data structure
        // Adjust the following line based on the actual response structure
        const tokenPrice = response.data.data.price;  // Adjust this line as per actual response structure
        
        res.status(200).json({ price: tokenPrice });
    } catch (error) {
        console.error('Error fetching token price:', error.message);
        if (error.response) {
            console.error('Error response data:', error.response.data);
            res.status(error.response.status).json({ error: error.response.data });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};
