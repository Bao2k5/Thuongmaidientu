// Test OTP Email System
// Usage: node scripts/test_otp_email.js

const axios = require('axios');

const API_URL = 'http://localhost:3000';
const TEST_EMAIL = 'leduongbao@gmail.com'; // Change to your test email

async function testOTPSystem() {
  console.log('🧪 Testing OTP Email System...\n');

  try {
    // Step 1: Send OTP to email
    console.log('📧 Step 1: Sending OTP to', TEST_EMAIL);
    const sendResponse = await axios.post(`${API_URL}/api/auth/send-reset-code`, {
      email: TEST_EMAIL
    });
    console.log('✅ Response:', sendResponse.data);
    console.log('\n📬 Check your email for the OTP code!\n');

    // Wait for user to input OTP
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('🔢 Enter the OTP from your email: ', async (otp) => {
      rl.question('🔑 Enter new password: ', async (newPassword) => {
        try {
          // Step 2: Verify OTP and reset password
          console.log('\n🔄 Step 2: Verifying OTP and resetting password...');
          const verifyResponse = await axios.post(`${API_URL}/api/auth/verify-reset-code`, {
            email: TEST_EMAIL,
            code: otp,
            newPassword: newPassword
          });
          console.log('✅ Response:', verifyResponse.data);
          console.log('\n🎉 Password reset successful! You can now login with the new password.\n');
        } catch (error) {
          console.error('❌ Error:', error.response?.data || error.message);
        } finally {
          rl.close();
        }
      });
    });

  } catch (error) {
    console.error('❌ Error in Step 1:', error.response?.data || error.message);
  }
}

// Run test
testOTPSystem();
