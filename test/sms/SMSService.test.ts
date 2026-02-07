import { SMSService, type SendSMSResponse } from '../../src/sms/SMSService';
import { HttpClient } from '../../src/client/HttpClient';

// Mock fetch globally
global.fetch = jest.fn();

describe('SMSService', () => {
  let service: SMSService;
  let client: HttpClient;

  beforeEach(() => {
    client = new HttpClient({ apiKey: 'test-key', timeout: 10000 });
    service = new SMSService(client);
    jest.clearAllMocks();
  });

  describe('sendQuickBulkSMS', () => {
    it('should format single recipient as array and make proper API call', async () => {
      const mockResponse: SendSMSResponse = {
        status: 'success',
        code: '200',
        message: 'Message sent',
        summary: {
          _id: '123',
          message_id: 'msg_123',
          type: 'sms',
          total_sent: 1,
          contacts: 1,
          total_rejected: 0,
          numbers_sent: ['233200000000'],
          credit_used: 1,
          credit_left: 99,
        },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await service.sendQuickBulkSMS({
        recipient: '233200000000',
        sender: 'Test',
        message: 'Hello',
      });

      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/sms/quick'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Authorization': 'test-key',
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify({
            recipient: ['233200000000'],
            sender: 'Test',
            message: 'Hello',
            is_schedule: false,
            schedule_date: '',
          }),
        })
      );
    });

    it('should handle API errors properly', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        json: async () => ({
          status: 'error',
          code: '400',
          message: 'Invalid sender ID',
        }),
      });

      await expect(
        service.sendQuickBulkSMS({
          recipient: '233200000000',
          sender: 'Invalid',
          message: 'Hello',
        })
      ).rejects.toThrow('Invalid sender ID');
    });
  });

  describe('getSMSStatus', () => {
    it('should fetch campaign status correctly', async () => {
      const mockResponse = {
        status: 'success',
        report: [
          {
            _id: 1,
            recipient: '233200000000',
            message: 'Hello',
            sender: 'Test',
            status: 'delivered',
            date_sent: '2023-08-20T12:00:00Z',
            campaign_id: 'camp_123',
            retries: 1,
          },
        ],
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await service.getSMSStatus('camp_123');
      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/campaign/camp_123/null'),
        expect.any(Object)
      );
    });
  });
});