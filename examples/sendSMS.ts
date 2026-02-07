import { MNotify } from '../src';

/**
 * Example usage of the mNotify SDK
 * 
 * To run this example:
 * 1. Set your API key as an environment variable:
 *    export MNOTIFY_API_KEY=your_api_key_here
 * 2. Run with ts-node:
 *    npm run example:sms
 */
async function main() {
  // Validate API key is set
  const apiKey = process.env.MNOTIFY_API_KEY;
  if (!apiKey) {
    throw new Error('MNOTIFY_API_KEY environment variable is required');
  }

  // Initialize the SDK with your API key
  const mnotify = new MNotify({ apiKey });

  try {
    // Example 1: Send SMS
    console.log('Sending SMS...');
    const smsResponse = await mnotify.sms.sendQuickBulkSMS({
      recipient: ['0541559369'],
      sender: 'Salem Inc.',
      message: 'Hello from mNotify SDK!'
    });
    console.log('SMS sent successfully:', smsResponse.summary);

    // Example 2: Check balance
    console.log('\nChecking account balance...');
    const balance = await mnotify.account.getBalance();
    console.log('Account balance:', balance);

    // Example 3: Create contact
    console.log('\nCreating contact...');
    const contact = await mnotify.contacts.createContact({
      phone: '233200000000',
      firstname: 'John',
      lastname: 'Doe',
    });
    console.log('Contact created:', contact);

    // Example 4: Check delivery status after a delay
    setTimeout(async () => {
      console.log('\nChecking delivery status...');
      const status = await mnotify.sms.getSMSStatus(smsResponse.summary._id);
      console.log('Delivery status:', status.report);
    }, 5000);

  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : error);
  }
}

main();