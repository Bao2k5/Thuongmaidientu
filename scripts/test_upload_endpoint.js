require('dotenv').config({ path: '../BE/.env' });
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

async function testUpload() {
  try {
    console.log('🧪 Testing upload endpoint...\n');

    // 1. Login as admin
    console.log('1️⃣ Logging in as admin...');
    const loginResponse = await axios.post('http://localhost:3000/api/auth/login', {
      email: 'admin@example.com',
      password: 'admin123'
    });

    const token = loginResponse.data.token;
    console.log('✅ Login successful, token:', token.substring(0, 20) + '...\n');

    // 2. Test upload endpoint without file
    console.log('2️⃣ Testing POST /api/upload/image without file...');
    try {
      await axios.post('http://localhost:3000/api/upload/image', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      if (error.response) {
        console.log(`Response: ${error.response.status} - ${JSON.stringify(error.response.data)}\n`);
      } else {
        console.log(`Error: ${error.message}\n`);
      }
    }

    // 3. Create a simple test image (1x1 pixel PNG)
    console.log('3️⃣ Creating test image...');
    const testImagePath = path.join(__dirname, 'test-upload.png');
    // Minimal 1x1 PNG file
    const pngBuffer = Buffer.from([
      0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 
      0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52,
      0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
      0x08, 0x06, 0x00, 0x00, 0x00, 0x1F, 0x15, 0xC4,
      0x89, 0x00, 0x00, 0x00, 0x0A, 0x49, 0x44, 0x41,
      0x54, 0x78, 0x9C, 0x63, 0x00, 0x01, 0x00, 0x00,
      0x05, 0x00, 0x01, 0x0D, 0x0A, 0x2D, 0xB4, 0x00,
      0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE,
      0x42, 0x60, 0x82
    ]);
    fs.writeFileSync(testImagePath, pngBuffer);

    // 4. Test upload endpoint with file
    console.log('4️⃣ Testing POST /api/upload/image with file...');
    const form = new FormData();
    form.append('image', fs.createReadStream(testImagePath));

    try {
      const uploadResponse = await axios.post('http://localhost:3000/api/upload/image', form, {
        headers: {
          ...form.getHeaders(),
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('✅ Upload successful:', uploadResponse.data);
    } catch (error) {
      if (error.response) {
        console.log(`❌ Response: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
      } else {
        console.log(`❌ Error: ${error.message}`);
      }
    }

    // Cleanup
    if (fs.existsSync(testImagePath)) {
      fs.unlinkSync(testImagePath);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
  }
}

testUpload();
