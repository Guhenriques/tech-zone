const express = require('express');
const Stripe = require('stripe');

const Order = require('../models/order');

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY);

const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {

  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      cart: JSON.stringify(req.body.cartItems),

    }
  })
  const line_items = req.body.cartItems.map(item => {
    return {
      price_data: {
        currency: "GBP",
        product_data: {
          name: item.name,
          images: [item.image],
          metadata: {
            id: item.id
          }
        },
        unit_amount: item.price * 100,
      },
      quantity: item.cartQuantity,
    }
  })
  const session = await stripe.checkout.sessions.create({
    shipping_address_collection: {
      allowed_countries: ['US', 'CA', 'GB', 'BR'],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 0,
            currency: 'GBP',
          },
          display_name: 'Free shipping',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 3,
            },
            maximum: {
              unit: 'business_day',
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 1500,
            currency: 'GBP',
          },
          display_name: 'Next day air',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 1,
            },
            maximum: {
              unit: 'business_day',
              value: 1,
            },
          },
        },
      },
    ],

    phone_number_collection: {
      enabled: true,
    },
    customer: customer.id,

    line_items,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  res.send({ url: session.url });
});

// Create Order
const createOrder = async (customer, data) => {
  const Items = JSON.parse(customer.metadata.cart);

  const newOrder = new Order({
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    products: Items,
    subtotal: data.amount_subtotal,
    total: data.amount_total,
    shipping: data.customer_details,
    payment_status: data.payment_status,
  });

  try {
    const savedOrder = await newOrder.save();

    console.log("Processed Order:", savedOrder);
  } catch (err) {
    console.log(err);
  }
};

// Stripe Webhook

// This is your Stripe CLI webhook secret for testing endpoint locally.
let endpointSecret;

router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];

  let data;
  let eventType;

  if (endpointSecret) {
    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      console.log("Webhook verified.")
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`)
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    data = event.data.object;
    eventType = event.type;

  } else {
    data = req.body.data.object;
    eventType = req.body.type;
  }

  // Handle the event

  if (eventType === "checkout.session.completed") {
    stripe.customers.retrieve(data.customer).then(
      (customer) => {
        createOrder(customer, data);
      }
    ).catch(err => console.log(err.message));
  }


  // Return a 200 res to acknowledge receipt of the event
  res.send().end();
});

// Backend API endpoint to fetch order details by ID
router.get('/orders/:orderId', async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const order = await Order.findById(orderId);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to fetch order details' });
  }
});


module.exports = router;


