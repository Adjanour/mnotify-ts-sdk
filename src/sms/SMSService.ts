import type { HttpClient } from '../client/HttpClient';
import { validateSMSResponse, validateDeliveryReport, ValidationError } from '../utils/validation';
import { toArray } from '../utils/helpers';
import type { Result } from '../types/Result';
import { ok, err } from '../types/Result';
import { MNotifyError } from '../errors/MNotifyError';

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
   * Sends bulk SMS messages to one or more recipients (railway-oriented programming)
   * @param {SendSMSOptions} options - SMS configuration
   * @returns {Promise<Result<SendSMSResponse, MNotifyError>>} Result containing send report or error
   *
   * @example
   * ```typescript
   * const result = await smsService.sendQuickBulkSMSSafe({
   *   recipient: ['233200000000', '233244444444'],
   *   sender: 'MyApp',
   *   message: 'Hello from mNotify!'
   * });
   * 
   * if (result.isOk()) {
   *   console.log('SMS sent:', result.value);
   * } else {
   *   console.error('Failed to send SMS:', result.error);
   * }
   * ```
   */
  public async sendQuickBulkSMSSafe(
    options: SendSMSOptions
  ): Promise<Result<SendSMSResponse, MNotifyError>> {
    const payload = {
      recipient: toArray(options.recipient),
      sender: options.sender,
      message: options.message,
      is_schedule: options.is_schedule || false,
      schedule_date: options.schedule_date || '',
    };

    const result = await this.client.requestSafe<SendSMSResponse>({
      method: 'POST',
      url: '/sms/quick',
      data: payload,
    });

    if (result.isErr()) {
      return result;
    }

    if (!validateSMSResponse(result.value)) {
      return err(new MNotifyError('Invalid SMS response format', 0));
    }

    return ok(result.value);
  }

  /**
   * Sends bulk SMS messages to one or more recipients (throws on error - legacy API)
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
    const result = await this.sendQuickBulkSMSSafe(options);
    return result.unwrap();
  }

  /**
   * Retrieves delivery status for a sent SMS campaign (railway-oriented programming)
   * @param {string} campaignId - ID from send response
   * @param {string} [status='null'] - Optional status filter
   * @returns {Promise<Result<SmsDeliveryReport, MNotifyError>>} Result containing delivery report or error
   *
   * @example
   * ```typescript
   * const result = await smsService.getSMSStatusSafe('campaign_123');
   * result.match({
   *   ok: (report) => console.log('Status:', report.status),
   *   err: (error) => console.error('Error:', error.message)
   * });
   * ```
   */
  public async getSMSStatusSafe(
    campaignId: string,
    status = 'null'
  ): Promise<Result<SmsDeliveryReport, MNotifyError>> {
    const result = await this.client.requestSafe<SmsDeliveryReport>({
      method: 'GET',
      url: `/campaign/${campaignId}/${status}`,
    });

    if (result.isErr()) {
      return result;
    }

    if (!validateDeliveryReport(result.value)) {
      return err(new MNotifyError('Invalid delivery report format', 0));
    }

    return ok(result.value);
  }

  /**
   * Retrieves delivery status for a sent SMS campaign (throws on error - legacy API)
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
    const result = await this.getSMSStatusSafe(campaignId, status);
    return result.unwrap();
  }
}