import type { HttpClient } from '../client/HttpClient';
import { validateSMSResponse, validateDeliveryReport, ValidationError } from '../utils/validation';
import { toArray } from '../utils/helpers';

/**
 * Response type for SMS send operations
 */
export interface SendSMSResponse {
  status: string;
  code: string;
  message: string;
  summary: {
    _id: string;
    message_id: string;
    type: string;
    total_sent: number;
    contacts: number;
    total_rejected: number;
    numbers_sent: string[];
    credit_used: number;
    credit_left: number;
  };
}

/**
 * Delivery report type for SMS status checks
 */
export interface SmsDeliveryReport {
  status: string;
  report: Array<{
    _id: number;
    recipient: string;
    message: string;
    sender: string;
    status: string;
    date_sent: string;
    campaign_id?: string;
    retries: number;
  }>;
}

/**
 * Options for sending SMS messages
 * @property {string|string[]} recipient - Single number or array of numbers
 * @property {string} sender - Registered sender ID
 * @property {string} message - Content to send (160 chars max)
 * @property {boolean} [is_schedule=false] - Flag for scheduled messages
 * @property {string} [schedule_date] - ISO date for scheduled sends
 */
export interface SendSMSOptions {
  recipient: string | string[];
  sender: string;
  message: string;
  is_schedule?: boolean;
  schedule_date?: string;
}

/**
 * Service for managing SMS operations with mNotify BMS API
 */
export class SMSService {
  /**
   * Creates an instance of SMSService
   * @param {HttpClient} client - Configured API client instance
   */
  constructor(private readonly client: HttpClient) {}

  /**
   * Sends bulk SMS messages to one or more recipients
   * @param {SendSMSOptions} options - SMS configuration
   * @returns {Promise<SendSMSResponse>} Detailed send report
   * @throws {MNotifyError} On API failure or validation errors
   *
   * @example
   * ```typescript
   * await smsService.sendQuickBulkSMS({
   *   recipient: ['233200000000', '233244444444'],
   *   sender: 'MyApp',
   *   message: 'Hello from mNotify!'
   * });
   * ```
   */
  public async sendQuickBulkSMS(
    options: SendSMSOptions
  ): Promise<SendSMSResponse> {
    const payload = {
      recipient: toArray(options.recipient),
      sender: options.sender,
      message: options.message,
      is_schedule: options.is_schedule || false,
      schedule_date: options.schedule_date || '',
    };

    const response = await this.client.request<SendSMSResponse>({
      method: 'POST',
      url: '/sms/quick',
      data: payload,
    });

    if (!validateSMSResponse(response)) {
      throw new ValidationError('Invalid SMS response format');
    }

    return response;
  }

  /**
   * Retrieves delivery status for a sent SMS campaign
   * @param {string} campaignId - ID from send response
   * @param {string} [status='null'] - Optional status filter
   * @returns {Promise<SmsDeliveryReport>} Detailed delivery report
   * @throws {MNotifyError} On API failure or invalid campaign ID
   *
   * @example
   * ```typescript
   * const report = await smsService.getSMSStatus('campaign_123');
   * console.log(report.status); // 'delivered', 'failed', etc.
   * ```
   */
  public async getSMSStatus(
    campaignId: string,
    status = 'null'
  ): Promise<SmsDeliveryReport> {
    const response = await this.client.request<SmsDeliveryReport>({
      method: 'GET',
      url: `/campaign/${campaignId}/${status}`,
    });

    if (!validateDeliveryReport(response)) {
      throw new ValidationError('Invalid delivery report format');
    }

    return response;
  }
}