import { ca } from 'zod/v4/locales';
import type { MNotifyClient } from '../client/MNotifyClient';
import { z } from 'zod';

const SendSMSResponseSchema = z.object({
  status: z.enum(['success', 'error']),
  code: z.string(),
  message: z.string(),
  summary: z.object({
  _id: z.string(),
  message_id: z.string(),
  type:z.string(),
  total_sent: z.number(),
  contacts:z.number(),
  total_rejected: z.number(),
  numbers_sent: z.array(z.string()),
  credit_used: z.number(),
  credit_left: z.number(),
 })
});

const SmsDeliveryReportSchema = z.object({
  status: z.enum(['success', 'error']),
  report: z.array(z.object({
    _id: z.number(),
    recipient: z.string(),
    message: z.string(),
    sender: z.string(),
    status: z.string(),
    date_sent: z.string(),
    campaign_id: z.string().optional(),
    retries: z.number()
  }))
});

export type SendSMSResponse = z.infer<typeof SendSMSResponseSchema>;
export type SmsDeliveryReport = z.infer<typeof SmsDeliveryReportSchema>;

export type SendSMSOptions = {
  recipient: string|string[];
  sender: string;
  message: string;
  is_schedule?: boolean;
  schedule_date?: string;
};

export class SMSService {
  constructor(private readonly client: MNotifyClient) {}

  public async sendQuickBulkSMS(options: SendSMSOptions) {
    const recipients = Array.isArray(options.recipient) 
      ? options.recipient 
      : [options.recipient];

    const payload = {
      recipient: recipients,
      sender: options.sender,
      message: options.message,
      is_schedule: options.is_schedule || false,
      schedule_date: options.schedule_date || ''
    };

    const response = await this.client.request<SendSMSResponse>({
      method: 'POST',
      url: '/sms/quick',
      data: payload
    });

    console.log('SMS sent response:', response);

    return SendSMSResponseSchema.parse(response);
  }

  public async getSMSStatus(campaignId: string,status='null') {
    const response = await this.client.request<SmsDeliveryReport>({
      method: 'GET',
      url: `/campaign/${campaignId}/${status}`
    });

    return SmsDeliveryReportSchema.parse(response);
  }
}