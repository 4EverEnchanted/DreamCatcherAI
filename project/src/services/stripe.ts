import { loadStripe } from '@stripe/stripe-js';

const STRIPE_PUBLIC_KEY = 'pk_live_51R2GejBZV4sMzH2qrSYxX2ekFWyaLU7u5SMlOFHuaSwEoPasFfRmRtHvfXpWnyM5CRHZBk9LrnOtnqZSvi9DGt4L00YMYvAuIU';

export const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

export const createCheckoutSession = async () => {
  try {
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe failed to initialize');

    // In a real implementation, this would make a call to your backend
    // to create a Checkout Session and return the sessionId
    const mockSessionId = 'mock_session_id';

    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: 'price_premium_monthly', // This would be your actual Stripe price ID
          quantity: 1,
        },
      ],
      mode: 'subscription',
      successUrl: `${window.location.origin}/dashboard?success=true`,
      cancelUrl: `${window.location.origin}/dashboard?success=false`,
      sessionId: mockSessionId,
    });

    if (error) throw error;
  } catch (error) {
    console.error('Error in createCheckoutSession:', error);
    throw error;
  }
};