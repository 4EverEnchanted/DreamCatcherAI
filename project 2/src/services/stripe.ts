import { loadStripe } from '@stripe/stripe-js';

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

export const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

export const createCheckoutSession = async () => {
  try {
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe failed to initialize');

    // Create checkout session
    const response = await fetch(`${import.meta.env.VITE_API_URL}/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId: 'price_premium_monthly',
      }),
    });

    const { sessionId } = await response.json();

    // Redirect to checkout
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });

    if (error) throw error;
  } catch (error) {
    console.error('Error in createCheckoutSession:', error);
    throw error;
  }
};