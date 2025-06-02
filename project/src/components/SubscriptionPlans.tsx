import React from 'react';
import { Check } from 'lucide-react';
import { useUserContext } from '../context/UserContext';
import { createCheckoutSession } from '../services/stripe';
import type { SubscriptionPlan } from '../types';

const plans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free Tier',
    price: 0,
    features: [
      '3 dream art generations per month',
      'Basic dream journal',
      'Community gallery access',
    ],
    generationsPerMonth: 3,
  },
  {
    id: 'premium',
    name: 'Premium Tier',
    price: 9.99,
    features: [
      'Unlimited dream art generations',
      'Advanced dream analysis',
      'Priority processing',
      'Custom art styles',
      'Private dream collection',
    ],
    generationsPerMonth: Infinity,
  },
];

export default function SubscriptionPlans() {
  const { user, updateSubscription } = useUserContext();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubscribe = async (planId: string) => {
    if (planId === 'premium') {
      try {
        setIsLoading(true);
        await createCheckoutSession();
        // Note: The actual subscription update would happen after successful payment
        // This is just for demo purposes
        await updateSubscription('premium');
      } catch (error) {
        console.error('Subscription error:', error);
        alert('Failed to process subscription. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className={`relative bg-white/5 backdrop-blur-lg rounded-xl p-6 border ${
            user?.subscription === plan.id
              ? 'border-purple-500'
              : 'border-white/10'
          }`}
        >
          {user?.subscription === plan.id && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500 text-white px-4 py-1 rounded-full text-sm">
              Current Plan
            </div>
          )}

          <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
          <div className="mb-4">
            <span className="text-3xl font-bold text-white">${plan.price}</span>
            <span className="text-white/70">/month</span>
          </div>

          <ul className="space-y-3 mb-6">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-center text-white/80">
                <Check className="w-5 h-5 text-purple-400 mr-2" />
                {feature}
              </li>
            ))}
          </ul>

          <button
            onClick={() => handleSubscribe(plan.id)}
            disabled={user?.subscription === plan.id || isLoading}
            className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
              user?.subscription === plan.id
                ? 'bg-purple-500/50 text-white/50 cursor-not-allowed'
                : plan.id === 'premium'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {isLoading
              ? 'Processing...'
              : user?.subscription === plan.id
              ? 'Current Plan'
              : plan.id === 'free'
              ? 'Free Tier'
              : 'Upgrade Now'}
          </button>
        </div>
      ))}
    </div>
  );
}