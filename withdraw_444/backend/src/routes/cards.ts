import express from 'express';
import Stripe from 'stripe';

const router = express.Router();
const stripe = new Stripe("sk_test_51RSGbBH2gjm5gdJ1LG9prXn4fQjeVdhPSg6pCF6D7k2hEZuTWEwyAMh7r04nEUKERXziSjKzQRpANCLw5Wjsi52L00oH6BaKY3", {
  apiVersion: '2022-11-15',
});

// Création d’un cardholder + carte virtuelle
router.post('/create', async (req, res) => {
  try {
    const cardholder = await stripe.issuing.cardholders.create({
      name: 'Test User',
      email: 'testuser@example.com',
      phone_number: '+33600000000',
      billing: {
        address: {
          line1: '123 Rue Exemple',
          city: 'Paris',
          country: 'FR',
          postal_code: '75001',
        },
      },
      type: 'individual',
    });

    const card = await stripe.issuing.cards.create({
      cardholder: cardholder.id,
      currency: 'eur',
      type: 'virtual',
    });

    const cardDetails = await stripe.issuing.cards.retrieve(card.id, {
      expand: ['number', 'cvc'],
    });

    res.json({
      card: {
        card_number: cardDetails.number,
        exp_month: cardDetails.exp_month,
        exp_year: cardDetails.exp_year,
        cvc: cardDetails.cvc,
        last4: cardDetails.last4,
      },
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Erreur Issuing ❌', error: err.message });
  }
});

export default router;