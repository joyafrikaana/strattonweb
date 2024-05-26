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
        console.log('Fetching data from Dextools API');
        const response = await axios.get('https://public-api.dextools.io/trial/v2/ranking/solana/hotpools', {
            headers: {
                'accept': 'application/json',
                'X-API-Key': process.env.API_KEY
            }
        });
        console.log('Data fetched successfully');
        res.status(200).json(response.data);
    } catch (error) {
        if (error.response) {
            console.error('Error response:', error.response.data);
            res.status(error.response.status).json({ error: error.response.data });
        } else {
            console.error('Error message:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
};
