import { MNotify } from '../src';

async function main() {
  const mnotify = new MNotify({
			apiKey: process.env.MNOTIFY_API_KEY!,
		});

  try {
    // Send SMS
    const smsResponse = await mnotify.sms.sendQuickBulkSMS({
      recipient: ['0541559369'],
      sender: 'Salem Inc.',
      message: 'Hello from mNotify SDK!'
    });


    // Check status after 5 seconds
    setTimeout(async () => {
      const status = await mnotify.sms.getSMSStatus(smsResponse.summary._id);
      console.log('Delivery status:', status.report);
    }, 5000);

    // Create contact
    const contact = await mnotify.contacts.createContact({
      phone: '233200000000',
      firstname: 'John',
      lastname: 'Doe',
    });
    console.log('Contact created:', contact);
    
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : error);
  }
}

main();