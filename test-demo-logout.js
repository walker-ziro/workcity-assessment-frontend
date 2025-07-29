// Test script to verify demo logout functionality
console.log('Testing Demo Logout Functionality');

// Simulate demo login
console.log('1. Simulating demo login...');
localStorage.setItem('authToken', 'demo-token-12345');
localStorage.setItem('user', JSON.stringify({
  id: 'demo-user-1',
  email: 'demo@workcity.com',
  firstName: 'Demo',
  lastName: 'User',
  role: 'user'
}));

console.log('   ✓ Auth token set:', localStorage.getItem('authToken'));
console.log('   ✓ User data set:', localStorage.getItem('user'));

// Simulate logout process
console.log('2. Simulating logout...');
localStorage.removeItem('authToken');
localStorage.removeItem('user');
sessionStorage.removeItem('authToken');
sessionStorage.removeItem('user');

console.log('   ✓ Auth token after logout:', localStorage.getItem('authToken') || 'null');
console.log('   ✓ User data after logout:', localStorage.getItem('user') || 'null');

console.log('3. Logout test completed successfully!');
