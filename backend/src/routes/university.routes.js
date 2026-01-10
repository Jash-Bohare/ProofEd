import express from 'express';
import {
    signup,
    resendOTP,
    verifyEmail,
    connectWallet,
    getSignupStatus
} from '../controllers/university.controller.js';
import { validateInstitutionalEmail } from '../middleware/validateEmail.js';
import { validateWalletFormat, checkWalletExists } from '../middleware/validateWallet.js';

const router = express.Router();

// Step 1: University Signup
router.post('/signup', validateInstitutionalEmail, signup);

// Step 2a: Resend OTP
router.post('/resend-otp', resendOTP);

// Step 2b: Verify Email with OTP
router.post('/verify-email', verifyEmail);

// Step 3: Connect Wallet
router.post('/connect-wallet', validateWalletFormat, checkWalletExists, connectWallet);

// Step 4: Get Signup Status (for UI to check progress)
router.get('/signup-status', getSignupStatus);

export default router;