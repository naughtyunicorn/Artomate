import React, { useState } from 'react';
import Icon from '../ui/Icon.jsx';
import Button from '../ui/Button.jsx';

const PaymentModal = ({ onClose, onSuccess, campaignData }) => {
  const [selectedPlan, setSelectedPlan] = useState('per-campaign');
  const [loading, setLoading] = useState(false);

  const plans = [
    {
      id: 'per-campaign',
      name: 'Pay Per Campaign',
      price: '$2.00',
      description: 'One-time payment for this campaign',
      features: ['Publish this campaign', 'Download all assets', 'Valid for 30 days'],
      popular: false
    },
    {
      id: 'pro-subscription',
      name: 'Pro Subscription',
      price: '$10.00',
      period: '/month',
      description: 'Unlimited campaigns and premium features',
      features: [
        'Unlimited campaign publishing',
        'Priority AI generation',
        'Advanced analytics',
        'Priority support',
        'Custom branding'
      ],
      popular: true
    }
  ];

  const handlePayment = async () => {
    setLoading(true);
    
    try {
      if (selectedPlan === 'per-campaign') {
        // Redirect to Stripe Checkout for one-time payment
        await redirectToStripeCheckout('per-campaign');
      } else {
        // Redirect to Stripe Checkout for subscription
        await redirectToStripeCheckout('subscription');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const redirectToStripeCheckout = async (planType) => {
    try {
      // In a real app, you'd create a checkout session on your backend
      // For now, we'll simulate the Stripe redirect
      
      if (planType === 'per-campaign') {
        // Simulate Stripe Checkout redirect
        console.log('Redirecting to Stripe Checkout for per-campaign payment...');
        
        // Simulate successful payment
        setTimeout(() => {
          alert('Payment successful! Your campaign has been published.');
          onSuccess();
        }, 2000);
        
      } else {
        // Simulate Stripe Checkout redirect for subscription
        console.log('Redirecting to Stripe Checkout for subscription...');
        
        // Simulate successful subscription
        setTimeout(() => {
          alert('Subscription successful! You now have unlimited publishing.');
          onSuccess();
        }, 2000);
      }
      
    } catch (error) {
      throw new Error(`Stripe checkout failed: ${error.message}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Choose Your Plan</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Icon name="close" className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-2">
              Ready to Publish Your Campaign?
            </h3>
            <p className="text-gray-400">
              Choose how you'd like to unlock publishing for "{campaignData?.theme}"
            </p>
          </div>

          {/* Plan Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedPlan === plan.id
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-secondary text-gray-900 px-3 py-1 rounded-full text-xs font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center">
                  <h4 className="text-lg font-semibold text-white mb-2">{plan.name}</h4>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-white">{plan.price}</span>
                    {plan.period && (
                      <span className="text-gray-400">{plan.period}</span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                  
                  <ul className="text-left space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-300">
                        <Icon name="check" className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Radio Button */}
                <div className="absolute top-4 right-4">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedPlan === plan.id
                      ? 'border-primary bg-primary'
                      : 'border-gray-500'
                  }`}>
                    {selectedPlan === plan.id && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Payment Info */}
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Selected Plan:</span>
              <span className="text-white font-medium">
                {plans.find(p => p.id === selectedPlan)?.name}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-gray-400">Total:</span>
              <span className="text-white font-bold text-lg">
                {plans.find(p => p.id === selectedPlan)?.price}
                {plans.find(p => p.id === selectedPlan)?.period}
              </span>
            </div>
          </div>

          {/* Security Notice */}
          <div className="text-center text-sm text-gray-400">
            <div className="flex items-center justify-center mb-2">
              <Icon name="shield-check" className="w-4 h-4 mr-2" />
              Secure payment powered by Stripe
            </div>
            <p>Your payment information is encrypted and secure</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handlePayment}
              loading={loading}
              className="px-8"
            >
              {selectedPlan === 'per-campaign' ? 'Pay & Publish' : 'Subscribe & Publish'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal; 