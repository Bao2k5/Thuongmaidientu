require('dotenv').config({ path: './BE/.env' });
const { sendMail } = require('./BE/src/utils/mailer');

async function testEmail() {
  console.log('Testing email send...');
  console.log('SMTP Config:');
  console.log('  Host:', process.env.SMTP_HOST);
  console.log('  Port:', process.env.SMTP_PORT);
  console.log('  User:', process.env.SMTP_USER);
  console.log('  Pass:', process.env.SMTP_PASS ? '***' + process.env.SMTP_PASS.slice(-4) : 'NOT SET');
  console.log('  From:', process.env.EMAIL_FROM);
  console.log('\nSending test email...');

  try {
    const result = await sendMail({
      to: 'leduongbao2019@gmail.com',
      subject: 'Test OTP từ HM Jewelry',
      html: '<h1>Test OTP: 123456</h1><p>Đây là email test.</p>',
      text: 'Test OTP: 123456'
    });

    if (!result) {
      console.log('\n❌ sendMail returned null - SMTP not configured!');
      process.exit(1);
    }

    console.log('\n✅ Email sent successfully!');
    console.log('Message ID:', result.messageId);
    console.log('Response:', result.response);
    process.exit(0);
  } catch (error) {
    console.log('\n❌ Email send failed!');
    console.log('Error:', error.message);
    console.log('Full error:', error);
    process.exit(1);
  }
}

testEmail();
