/**
 * Example demonstrating Railway-Oriented Programming with Result types
 * 
 * This example shows how to use the new Safe methods that return Result<T, Error>
 * instead of throwing exceptions, enabling more functional and predictable error handling.
 */

import { MNotify, Result, MNotifyError } from '../src';

// Initialize MNotify client
const mnotify = new MNotify({
  apiKey: process.env.MNOTIFY_API_KEY || 'your-api-key-here'
});

/**
 * Example 1: Pattern matching with Result
 */
async function examplePatternMatching() {
  console.log('\n=== Example 1: Pattern Matching ===');
  
  const result = await mnotify.account.getBalanceSafe();
  
  const message = result.match({
    ok: (balance) => `Your balance is ${balance.balance} ${balance.currency}`,
    err: (error) => `Failed to get balance: ${error.message}`
  });
  
  console.log(message);
}

/**
 * Example 2: Chaining operations with map and andThen
 */
async function exampleChaining() {
  console.log('\n=== Example 2: Chaining Operations ===');
  
  // Chain multiple operations
  const result = await mnotify.account.getBalanceSafe()
    .then(r => r.map(balance => balance.balance))
    .then(r => r.map(amount => amount > 0 ? 'Sufficient' : 'Insufficient'));
  
  if (result.isOk()) {
    console.log('Balance status:', result.value);
  }
}

/**
 * Example 3: Safe defaults with unwrapOr
 */
async function exampleSafeDefaults() {
  console.log('\n=== Example 3: Safe Defaults ===');
  
  const result = await mnotify.account.getBalanceSafe();
  
  // Provide a default value if operation fails
  const balance = result
    .map(b => b.balance)
    .unwrapOr(0);
  
  console.log('Balance (with default):', balance);
}

/**
 * Example 4: Composing multiple operations
 */
async function exampleComposition() {
  console.log('\n=== Example 4: Composing Operations ===');
  
  // Send SMS only if balance is sufficient
  const balanceResult = await mnotify.account.getBalanceSafe();
  
  if (balanceResult.isErr()) {
    console.error('Could not check balance:', balanceResult.error.message);
    return;
  }
  
  const balance = balanceResult.value;
  
  if (balance.balance < 1) {
    console.log('Insufficient balance, skipping SMS send');
    return;
  }
  
  // Balance is sufficient, send SMS
  const smsResult = await mnotify.sms.sendQuickBulkSMSSafe({
    recipient: ['233200000000'],
    sender: 'MyApp',
    message: 'Hello from Railway-Oriented Programming!'
  });
  
  smsResult.match({
    ok: (response) => console.log('SMS sent successfully!', response.summary),
    err: (error) => console.error('Failed to send SMS:', error.message)
  });
}

/**
 * Example 5: Error recovery with unwrapOrElse
 */
async function exampleErrorRecovery() {
  console.log('\n=== Example 5: Error Recovery ===');
  
  const result = await mnotify.account.getBalanceSafe();
  
  // Compute a fallback value based on the error
  const balance = result.unwrapOrElse((error) => {
    console.log('Using fallback due to error:', error.message);
    return { balance: 0, currency: 'GHS' };
  });
  
  console.log('Balance:', balance);
}

/**
 * Example 6: Handling multiple operations
 */
async function exampleMultipleOperations() {
  console.log('\n=== Example 6: Multiple Operations ===');
  
  // Get balance and sender IDs in parallel
  const [balanceResult, sendersResult] = await Promise.all([
    mnotify.account.getBalanceSafe(),
    mnotify.account.getSenderIdsSafe()
  ]);
  
  // Check both results
  if (balanceResult.isOk() && sendersResult.isOk()) {
    console.log('Balance:', balanceResult.value);
    console.log('Sender IDs:', sendersResult.value);
  } else {
    if (balanceResult.isErr()) {
      console.error('Balance error:', balanceResult.error.message);
    }
    if (sendersResult.isErr()) {
      console.error('Senders error:', sendersResult.error.message);
    }
  }
}

/**
 * Example 7: Creating a contact with validation
 */
async function exampleContactCreation() {
  console.log('\n=== Example 7: Contact Creation ===');
  
  const result = await mnotify.contacts.createContactSafe({
    phone: '233200000000',
    firstname: 'John',
    lastname: 'Doe',
    email: ['john@example.com']
  });
  
  result.match({
    ok: (contact) => {
      console.log('Contact created:', contact._id);
      // Chain another operation - add to group
      return mnotify.groups.addContactToGroupSafe('group_id', contact._id);
    },
    err: (error) => {
      console.error('Failed to create contact:', error.message);
    }
  });
}

/**
 * Main function to run all examples
 */
async function main() {
  console.log('Railway-Oriented Programming Examples\n');
  console.log('Note: These examples require a valid MNOTIFY_API_KEY environment variable\n');
  
  try {
    await examplePatternMatching();
    await exampleChaining();
    await exampleSafeDefaults();
    await exampleComposition();
    await exampleErrorRecovery();
    await exampleMultipleOperations();
    await exampleContactCreation();
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Run examples if this file is executed directly
if (require.main === module) {
  main().catch(console.error);
}
