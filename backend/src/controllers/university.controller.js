import University from '../models/university.model.js';
import { ExpressError } from '../lib/ExpressError.js';
import { wrapAsync } from '../lib/wrapAsync.js';
import { generateOTP, sendOTPEmail } from '../lib/emailService.js';

// Step 1: University Signup (Initial Registration)
export const signup = wrapAsync(async (req, res) => {
    const { name, email, website } = req.body;

    // Check if university already exists
    const existingUniversity = await University.findOne({ 
        $or: [{ email: email.toLowerCase() }, { name }] 
    });

    if (existingUniversity) {
        throw new ExpressError(409, 'University with this email or name already exists');
    }

    // Generate 6-digit OTP and store as verificationToken
    const otp = generateOTP();
    const verificationTokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create university with pending status
    const university = new University({
        name,
        email: email.toLowerCase(),
        website,
        verificationToken: otp, // Store OTP in verificationToken field
        verificationTokenExpiry,
        status: 'pending',
        emailVerified: false
    });

    await university.save();

    // Send OTP email
    try {
        await sendOTPEmail(email, otp);
    } catch (error) {
        console.error('Failed to send OTP email:', error);
        // Don't throw error - university is created, can resend OTP later
    }

    res.status(201).json({
        success: true,
        message: 'Registration successful. Please check your email for OTP verification.',
        data: {
            universityId: university._id,
            email: university.email,
            name: university.name,
            status: university.status
        }
    });
});



