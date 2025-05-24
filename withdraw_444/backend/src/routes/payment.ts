import express from 'express';
import Stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const stripe = new Stripe("sk_test_51RSGbBH2gjm5gdJ1LG9prXn4fQjeVdhPSg6pCF6D7k2hEZuTWEwyAMh7r04nEUKERXziSjKzQRpANCLw5Wjsi52L00oH6BaKY3", {
  apiVersion: '2022-11-15',
});

const paymentTokens = new Map<string, { created: number }>();

// Génère un token de paiement
router.get('/generate-token', (req, res) => {
  const token = uuidv4();
  paymentTokens.set(token, { created: Date.now() });
  res.json({ token });
});

// Vérifie un token et déclenche un paiement Stripe
router.post('/verify-token', async (req, res) => {
  const { token } = req.body;
  if (!paymentTokens.has(token)) {
    return res.status(400).json({ status: 'error', message: 'Token invalide ❌' });
  }

  try {
    // Paiement Stripe - test de 5€
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 500, // en centimes
      currency: 'eur',
      payment_method_types: ['card'],
    });

    paymentTokens.delete(token);
    res.json({ status: 'success', message: 'Paiement déclenché ✅', paymentIntentId: paymentIntent.id });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Erreur Stripe ❌', error: err.message });
  }
});

export default router;