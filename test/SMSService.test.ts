import { MNotifyClient } from '../src/client/MNotifyClient';
import { SMSService } from '../src/sms/SMSService';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('SMSService', () => {
  let mockAxios: MockAdapter;
  let client: MNotifyClient;
  let smsService: SMSService;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    client = new MNotifyClient({ apiKey: 'test-key' });
    smsService = new SMSService(client);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('should send quick SMS successfully', async () => {
    const mockResponse = {
      status: 'success',
      code: 200,
      message: 'Message sent',
      summary:{
        status: 'success',
          code: '200',
          message: 'Message sent',
          summary: {
          _id: 'z12345',
          message_id: '12345',
          type: 'quick',
          total_sent: 2,
          contacts: 2,
          total_rejected: 0,
          numbers_sent: ['233200000000', '233200000001'],
          credit_used: 1.5,
          credit_left: 8.5,
      }
    }
    };

    mockAxios.onPost('/sms/quick').reply(200, mockResponse);

    const response = await smsService.sendQuickBulkSMS({
      recipient: ['233200000000'],
      sender: 'Test',
      message: 'Hello'
    });

    expect(response.summary.message_id).toBe('12345');
    expect(response.summary.total_sent).toBe(2);
  });
});