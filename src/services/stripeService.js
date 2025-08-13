// Stripe Service for Artomate
// This service handles all payment processing and subscription management

// Configuration - Replace with your actual Stripe keys
const STRIPE_PUBLISHABLE_KEY = 'pk_test_YOUR_STRIPE_PUBLISHABLE_KEY';
const STRIPE_SECRET_KEY = 'sk_test_YOUR_STRIPE_SECRET_KEY';

// Price IDs from your Stripe dashboard
const PRICE_IDS = {
  PER_CAMPAIGN: 'price_YOUR_PER_CAMPAIGN_PRICE_ID',
  PRO_SUBSCRIPTION: 'price_YOUR_PRO_SUBSCRIPTION_PRICE_ID'
};

// Redirect URLs for successful payments
const SUCCESS_URLS = {
  PER_CAMPAIGN: 'https://univesst.cloud/campaign-success',
  SUBSCRIPTION: 'https://univesst.cloud/subscription-success'
};

// Cancel URLs for failed/cancelled payments
const CANCEL_URLS = {
  PER_CAMPAIGN: 'https://univesst.cloud/campaign-cancel',
  SUBSCRIPTION: 'https://univesst.cloud/subscription-cancel'
};

/**
 * Initialize Stripe
 */
export const initializeStripe = () => {
  if (typeof window !== 'undefined' && window.Stripe) {
    return window.Stripe(STRIPE_PUBLISHABLE_KEY);
  }
  throw new Error('Stripe not loaded');
};

/**
 * Create a checkout session for per-campaign payment
 */
export const createPerCampaignCheckout = async (campaignData, userId) => {
  try {
    // In a real app, this would be a call to your backend
    // The backend would create a Stripe checkout session
    
    const checkoutData = {
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{
        price: PRICE_IDS.PER_CAMPAIGN,
        quantity: 1,
      }],
      metadata: {
        campaignId: campaignData.id || 'temp-id',
        userId: userId,
        campaignType: campaignData.contentType,
        campaignTheme: campaignData.theme
      },
      success_url: SUCCESS_URLS.PER_CAMPAIGN,
      cancel_url: CANCEL_URLS.PER_CAMPAIGN,
      customer_email: campaignData.userEmail,
      allow_promotion_codes: true,
      billing_address_collection: 'required'
    };

    // For now, we'll simulate the backend call
    console.log('Creating per-campaign checkout session:', checkoutData);
    
    // In a real implementation, you would:
    // 1. Call your backend API
    // 2. Backend creates Stripe checkout session
    // 3. Return session URL for redirect
    
    return {
      success: true,
      sessionId: 'mock_session_id',
      url: 'https://checkout.stripe.com/mock_session_url'
    };

  } catch (error) {
    console.error('Error creating per-campaign checkout:', error);
    throw new Error(`Checkout creation failed: ${error.message}`);
  }
};

/**
 * Create a checkout session for subscription
 */
export const createSubscriptionCheckout = async (userId, userEmail) => {
  try {
    const checkoutData = {
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{
        price: PRICE_IDS.PRO_SUBSCRIPTION,
        quantity: 1,
      }],
      metadata: {
        userId: userId,
        planType: 'pro'
      },
      success_url: SUCCESS_URLS.SUBSCRIPTION,
      cancel_url: CANCEL_URLS.SUBSCRIPTION,
      customer_email: userEmail,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      subscription_data: {
        metadata: {
          userId: userId,
          planType: 'pro'
        }
      }
    };

    console.log('Creating subscription checkout session:', checkoutData);
    
    return {
      success: true,
      sessionId: 'mock_subscription_session_id',
      url: 'https://checkout.stripe.com/mock_subscription_session_url'
    };

  } catch (error) {
    console.error('Error creating subscription checkout:', error);
    throw new Error(`Subscription checkout creation failed: ${error.message}`);
  }
};

/**
 * Redirect to Stripe Checkout
 */
export const redirectToCheckout = async (checkoutData) => {
  try {
    const stripe = initializeStripe();
    
    if (checkoutData.url) {
      // Redirect to the checkout URL
      window.location.href = checkoutData.url;
    } else {
      // Use Stripe's redirectToCheckout method
      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutData.sessionId
      });
      
      if (error) {
        throw new Error(error.message);
      }
    }
  } catch (error) {
    console.error('Error redirecting to checkout:', error);
    throw new Error(`Checkout redirect failed: ${error.message}`);
  }
};

/**
 * Handle successful payment webhook
 */
export const handlePaymentSuccess = async (sessionId, userId) => {
  try {
    // In a real app, this would be called from your backend webhook handler
    // Verify the payment with Stripe and update user status
    
    console.log('Payment successful for session:', sessionId);
    console.log('Updating user status for:', userId);
    
    // Update user subscription status
    // This would typically be done in your backend
    
    return {
      success: true,
      message: 'Payment processed successfully'
    };
    
  } catch (error) {
    console.error('Error handling payment success:', error);
    throw new Error(`Payment processing failed: ${error.message}`);
  }
};

/**
 * Handle subscription webhook
 */
export const handleSubscriptionUpdate = async (subscriptionId, userId, status) => {
  try {
    console.log('Subscription update:', { subscriptionId, userId, status });
    
    // Update user subscription status based on webhook
    // This would typically be done in your backend
    
    return {
      success: true,
      message: 'Subscription updated successfully'
    };
    
  } catch (error) {
    console.error('Error handling subscription update:', error);
    throw new Error(`Subscription update failed: ${error.message}`);
  }
};

/**
 * Get customer portal URL for subscription management
 */
export const getCustomerPortalUrl = async (customerId) => {
  try {
    // In a real app, this would call your backend to create a portal session
    
    console.log('Creating customer portal session for:', customerId);
    
    return {
      success: true,
      url: 'https://billing.stripe.com/mock_portal_url'
    };
    
  } catch (error) {
    console.error('Error creating customer portal session:', error);
    throw new Error(`Portal session creation failed: ${error.message}`);
  }
};

/**
 * Cancel subscription
 */
export const cancelSubscription = async (subscriptionId) => {
  try {
    // In a real app, this would call your backend to cancel the subscription
    
    console.log('Cancelling subscription:', subscriptionId);
    
    return {
      success: true,
      message: 'Subscription cancelled successfully'
    };
    
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    throw new Error(`Subscription cancellation failed: ${error.message}`);
  }
};

/**
 * Get payment history for a user
 */
export const getPaymentHistory = async (userId) => {
  try {
    // In a real app, this would fetch from your backend/database
    
    console.log('Fetching payment history for user:', userId);
    
    // Mock payment history
    return [
      {
        id: 'pi_mock_1',
        amount: 200,
        currency: 'usd',
        status: 'succeeded',
        created: Date.now() - 86400000, // 1 day ago
        description: 'Campaign Publishing - Summer Vibes EP'
      },
      {
        id: 'pi_mock_2',
        amount: 1000,
        currency: 'usd',
        status: 'succeeded',
        created: Date.now() - 2592000000, // 30 days ago
        description: 'Pro Subscription - Monthly'
      }
    ];
    
  } catch (error) {
    console.error('Error fetching payment history:', error);
    throw new Error(`Payment history fetch failed: ${error.message}`);
  }
};

// Development/Testing helpers
export const simulatePayment = async (type, delay = 2000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        sessionId: `mock_${type}_session_${Date.now()}`,
        message: `${type} payment simulated successfully`
      });
    }, delay);
  });
};

// Export configuration for easy access
export const STRIPE_CONFIG = {
  publishableKey: STRIPE_PUBLISHABLE_KEY,
  priceIds: PRICE_IDS,
  successUrls: SUCCESS_URLS,
  cancelUrls: CANCEL_URLS
}; 