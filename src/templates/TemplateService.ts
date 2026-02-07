import type { HttpClient } from '../client/HttpClient';
import { isObject, isString, isArray, validateRequired, ValidationError } from '../utils/validation';

/**
 * SMS Template
 */
export interface Template {
  id: string;
  name: string;
  content: string;
  status: 'approved' | 'pending' | 'rejected';
  created_at: string;
  updated_at: string;
}

/**
 * Template creation input
 */
export interface CreateTemplateInput {
  name: string;
  content: string;
}

/**
 * Validates template response
 */
const validateTemplate = (data: unknown): data is Template => {
  if (!isObject(data)) return false;
  validateRequired(data, ['id', 'name', 'content', 'status']);
  return (
    isString(data.id) &&
    isString(data.name) &&
    isString(data.content) &&
    isString(data.status)
  );
};

/**
 * Service for managing SMS templates with mNotify API
 */
export class TemplateService {
  constructor(private readonly client: HttpClient) {}

  /**
   * Creates a new SMS template
   * @param input - Template data
   * @returns Created template
   * @throws {MNotifyError} On API failure
   *
   * @example
   * ```typescript
   * const template = await templateService.createTemplate({
   *   name: 'Welcome Message',
   *   content: 'Welcome {{name}} to our service!'
   * });
   * ```
   */
  public async createTemplate(input: CreateTemplateInput): Promise<Template> {
    const response = await this.client.request<Template>({
      method: 'POST',
      url: '/templates',
      data: input,
    });

    if (!validateTemplate(response)) {
      throw new ValidationError('Invalid template response format');
    }

    return response;
  }

  /**
   * Retrieves all templates
   * @returns Array of templates
   * @throws {MNotifyError} On API failure
   *
   * @example
   * ```typescript
   * const templates = await templateService.getTemplates();
   * console.log('Templates:', templates);
   * ```
   */
  public async getTemplates(): Promise<Template[]> {
    const response = await this.client.request<Template[]>({
      method: 'GET',
      url: '/templates',
    });

    if (!isArray(response)) {
      throw new ValidationError('Invalid templates response format');
    }

    return response;
  }

  /**
   * Retrieves a specific template by ID
   * @param id - Template ID
   * @returns Template details
   * @throws {MNotifyError} On API failure
   *
   * @example
   * ```typescript
   * const template = await templateService.getTemplate('template_123');
   * console.log('Template:', template);
   * ```
   */
  public async getTemplate(id: string): Promise<Template> {
    const response = await this.client.request<Template>({
      method: 'GET',
      url: `/templates/${id}`,
    });

    if (!validateTemplate(response)) {
      throw new ValidationError('Invalid template response format');
    }

    return response;
  }

  /**
   * Deletes a template
   * @param id - Template ID
   * @returns Deletion confirmation
   * @throws {MNotifyError} On API failure
   *
   * @example
   * ```typescript
   * await templateService.deleteTemplate('template_123');
   * ```
   */
  public async deleteTemplate(id: string): Promise<{ status: string; message: string }> {
    const response = await this.client.request<{ status: string; message: string }>({
      method: 'DELETE',
      url: `/templates/${id}`,
    });

    if (!isObject(response)) {
      throw new ValidationError('Invalid delete response format');
    }

    return response;
  }
}
