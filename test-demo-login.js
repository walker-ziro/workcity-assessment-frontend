// Simple test to verify demo authentication works
const { authService } = require('./src/lib/auth.ts');

// Mock localStorage for Node.js environment
global.localStorage = {
  setItem: (key, value) => console.log(`localStorage.setItem(${key}, ${value})`),
  getItem: (key) => {
    console.log(`localStorage.getItem(${key})`);
    if (key === 'authToken') return 'demo-token-123';
    if (key === 'user') return JSON.stringify({
      id: 'demo-user-1',
      email: 'demo@workcity.com',
      firstName: 'Demo',
      lastName: 'User',
      role: 'user'
    });
    return null;
  },
  removeItem: (key) => console.log(`localStorage.removeItem(${key})`),
};

async function testDemoLogin() {
  try {
    console.log('Testing demo login...');
    const result = await authService.login({
      email: 'demo@workcity.com',
      password: 'demo123'
    });
    
    console.log('Demo login successful!');
    console.log('User:', result.user);
    console.log('Token:', result.token);
    return true;
  } catch (error) {
    console.error('Demo login failed:', error.message);
    return false;
  }
}

testDemoLogin();
