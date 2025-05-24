import express from 'express';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

const router = express.Router();

const config = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV || 'sandbox'],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID || '',
      'PLAID-SECRET': process.env.PLAID_SECRET || '',
    },
  },
});

const client = new PlaidApi(config);

// Route pour créer un lien token
router.post('/create_link_token', async (req, res) => {
  try {
    const response = await client.linkTokenCreate({
      user: { client_user_id: 'user-id-123' },
      client_name: 'Your App Name',
      products: ['transactions'],
      country_codes: ['US'],
      language: 'en',
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating link token');
  }
});

// Route pour échanger un public token contre un access token
router.post('/exchange_public_token', async (req, res) => {
  const { public_token } = req.body;
  try {
    const response = await client.itemPublicTokenExchange({ public_token });
    const access_token = response.data.access_token;
    res.json({ access_token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error exchanging token');
  }
});

export default router;