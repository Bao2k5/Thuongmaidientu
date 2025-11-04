require('dotenv').config();
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const testCollectionUpload = async () => {
  try {
    console.log('🔐 Step 1: Login as admin...');
    const loginRes = await axios.post('http://localhost:3000/api/auth/login', {
      email: 'admin@example.com',
      password: 'admin123'
    });
    
    const token = loginRes.data.token;
    console.log('✅ Login successful, token:', token.substring(0, 20) + '...');
    
    // Find a test image in uploads folder
    const uploadsDir = path.join(__dirname, '../BE/uploads');
    const files = fs.readdirSync(uploadsDir);
    const testImage = files.find(f => f.endsWith('.png') || f.endsWith('.jpg'));
    
    if (!testImage) {
      console.log('❌ No test image found in uploads folder');
      return;
    }
    
    console.log('\n📤 Step 2: Upload image...');
    const formData = new FormData();
    formData.append('image', fs.createReadStream(path.join(uploadsDir, testImage)));
    
    const uploadRes = await axios.post('http://localhost:3000/api/upload/image', formData, {
      headers: {
        ...formData.getHeaders(),
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('✅ Image uploaded:', uploadRes.data);
    const imageUrl = uploadRes.data.url;
    
    console.log('\n📝 Step 3: Get collections...');
    const collectionsRes = await axios.get('http://localhost:3000/api/collections');
    const collections = collectionsRes.data.collections || collectionsRes.data;
    
    if (collections.length === 0) {
      console.log('❌ No collections found');
      return;
    }
    
    const firstCollection = collections[0];
    console.log('Found collection:', firstCollection.name);
    
    console.log('\n✏️ Step 4: Update collection with new image...');
    const updateRes = await axios.put(
      `http://localhost:3000/api/collections/${firstCollection._id}`,
      {
        name: firstCollection.name,
        slug: firstCollection.slug,
        description: firstCollection.description,
        image: imageUrl
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    console.log('✅ Collection updated:', updateRes.data);
    console.log('\n🎉 Test successful! Collection image updated to:', imageUrl);
    
  } catch (error) {
    console.error('❌ Test failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error(error.message);
    }
  }
};

testCollectionUpload();
