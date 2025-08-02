import express from 'express';
import paypal from '@paypal/checkout-server-sdk';

const router = express.Router();

// Configure PayPal environment
const configureEnvironment = () => {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  return process.env.NODE_ENV === 'production'
    ? new paypal.core.LiveEnvironment(clientId, clientSecret)
    : new paypal.core.SandboxEnvironment(clientId, clientSecret);
};

const client = new paypal.core.PayPalHttpClient(configureEnvironment());

// Verify payment endpoint
router.post('/verify-payment', async (req, res) => {
  const { orderID } = req.body;
  
  try {
    const request = new paypal.orders.OrdersGetRequest(orderID);
    const response = await client.execute(request);
    
    res.json({
      status: response.result.status,
      details: response.result
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;