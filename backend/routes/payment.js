const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');

// Using a mock Stripe approach or load real if env presents
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_mock');

// @route   POST api/payment/create-checkout-session
// @desc    Create Stripe Checkout Session to upgrade to Pro
// @access  Private
router.post('/create-checkout-session', auth, async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'subscription',
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'LearnMate Pro Scholar',
                            description: 'Unlimited AI Roadmaps & Priority Mock Interviews',
                        },
                        unit_amount: 1500, // $15.00
                        recurring: {
                            interval: 'month',
                        },
                    },
                    quantity: 1,
                },
            ],
            success_url: `http://localhost:5173/dashboard?payment_success=true`,
            cancel_url: `http://localhost:5173/pricing?payment_canceled=true`,
            client_reference_id: req.user.id,
        });

        res.json({ url: session.url });
    } catch (err) {
        console.error("Stripe Error:", err.message);
        // Fallback for demo if stripe is mock and fails
        if (err.message.includes('sk_test_mock')) {
             console.log("Mock Stripe environment. Auto Upgrading user for demo.");
             const user = await User.findById(req.user.id);
             if (user) {
                 user.isPro = true;
                 user.credits = 999;
                 await user.save();
             }
             return res.json({ url: 'http://localhost:5173/dashboard?mock_payment=true' });
        }
        res.status(500).json({ msg: 'Payment processing failed' });
    }
});

module.exports = router;
