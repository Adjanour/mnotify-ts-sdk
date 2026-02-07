/**
 * Lightweight validation utilities for API responses
 * Replaces heavy validation libraries with simple, focused validators
 */

export class ValidationError extends Error {
  constructor(message: string, public readonly field?: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

/**
 * Validates that a value is a string
 */
export const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};

/**
 * Validates that a value is a number
 */
export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' && !isNaN(value);
};

/**
 * Validates that a value is an array
 */
export const isArray = <T>(value: unknown): value is T[] => {
  return Array.isArray(value);
};

/**
 * Validates that a value is an object
 */
export const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

/**
 * Validates required fields in an object
 */
export function validateRequired(
  obj: unknown,
  fields: string[]
): asserts obj is Record<string, unknown> {
  if (!isObject(obj)) {
    throw new ValidationError('Expected object');
  }

  for (const field of fields) {
    if (!(field in obj) || obj[field] === undefined || obj[field] === null) {
      throw new ValidationError(`Missing required field: ${field}`, field);
    }
  }
}

/**
 * Validates SMS send response
 */
export const validateSMSResponse = (data: unknown): data is {
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
} => {
  if (!isObject(data)) return false;

  validateRequired(data, ['status', 'code', 'message', 'summary']);

  const summary = data.summary;
  if (!isObject(summary)) return false;

  validateRequired(summary, [
    '_id',
    'message_id',
    'type',
    'total_sent',
    'contacts',
    'total_rejected',
    'numbers_sent',
    'credit_used',
    'credit_left',
  ]);

  return (
    isString(data.status) &&
    isString(data.code) &&
    isString(data.message) &&
    isString(summary._id) &&
    isString(summary.message_id) &&
    isString(summary.type) &&
    isNumber(summary.total_sent) &&
    isNumber(summary.contacts) &&
    isNumber(summary.total_rejected) &&
    isArray(summary.numbers_sent) &&
    isNumber(summary.credit_used) &&
    isNumber(summary.credit_left)
  );
};

/**
 * Validates SMS delivery report response
 */
export const validateDeliveryReport = (data: unknown): data is {
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
} => {
  if (!isObject(data)) return false;

  validateRequired(data, ['status', 'report']);

  if (!isArray(data.report)) return false;

  return data.report.every((item) => {
    if (!isObject(item)) return false;
    return (
      isNumber(item._id) &&
      isString(item.recipient) &&
      isString(item.message) &&
      isString(item.sender) &&
      isString(item.status) &&
      isString(item.date_sent) &&
      isNumber(item.retries)
    );
  });
};
