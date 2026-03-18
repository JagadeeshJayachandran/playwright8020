import { test, expect } from '@playwright/test';
test('Demonstrate toPass with a flaky API', async ({ request }) => {
  
  // The toPass block will keep retrying this entire function
  await expect(async () => {
    console.log('Sending request to API...');
    
    // This API randomly fails or succeeds
    const response = await request.get('https://httpbin.org/status/200,500');
    
    // If it's a 500, this assertion fails and triggers the retry!
    expect(response).toBeOK(); 
    
    console.log('Success! The API finally returned 200 OK.');
  }).toPass({ 
    timeout: 10000,   // Stop trying after 10 seconds
    intervals: [1000] // Wait 1 second between each try
  });

});