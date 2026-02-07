import type { HttpClient } from '../client/HttpClient';
import { isObject, isString, isArray, validateRequired, ValidationError } from '../utils/validation';
import type { Result } from '../types/Result';
import { ok, err } from '../types/Result';
import { MNotifyError } from '../errors/MNotifyError';

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
   * Creates a new SMS template (railway-oriented programming)
   * @param input - Template data
   * @returns Result containing created template or error
   *
   * @example
   * ```typescript
   * const result = await templateService.createTemplateSafe({
   *   name: 'Welcome Message',
   *   content: 'Welcome {{name}} to our service!'
   * });
   * result.match({
   *   ok: (template) => console.log('Template created:', template),
   *   err: (error) => console.error('Failed to create template:', error)
   * });
   * ```
   */
  public async createTemplateSafe(input: CreateTemplateInput): Promise<Result<Template, MNotifyError>> {
    const result = await this.client.requestSafe<Template>({
      method: 'POST',
      url: '/templates',
      data: input,
    });

    if (result.isErr()) {
      return result;
    }

    if (!validateTemplate(result.value)) {
      return err(new MNotifyError('Invalid template response format', 0));
    }

    return ok(result.value);
  }

  /**
   * Creates a new SMS template (throws on error - legacy API)
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
    const result = await this.createTemplateSafe(input);
    return result.unwrap();
  }

  /**
   * Retrieves all templates (railway-oriented programming)
   * @returns Result containing array of templates or error
   *
   * @example
   * ```typescript
   * const result = await templateService.getTemplatesSafe();
   * if (result.isOk()) {
   *   console.log('Templates:', result.value);
   * }
   * ```
   */
  public async getTemplatesSafe(): Promise<Result<Template[], MNotifyError>> {
    const result = await this.client.requestSafe<Template[]>({
      method: 'GET',
      url: '/templates',
    });

    if (result.isErr()) {
      return result;
    }

    if (!isArray(result.value)) {
      return err(new MNotifyError('Invalid templates response format', 0));
    }

    return ok(result.value);
  }

  /**
   * Retrieves all templates (throws on error - legacy API)
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
    const result = await this.getTemplatesSafe();
    return result.unwrap();
  }

  /**
   * Retrieves a specific template by ID (railway-oriented programming)
   * @param id - Template ID
   * @returns Result containing template details or error
   *
   * @example
   * ```typescript
   * const result = await templateService.getTemplateSafe('template_123');
   * result.match({
   *   ok: (template) => console.log('Template:', template),
   *   err: (error) => console.error('Failed to get template:', error)
   * });
   * ```
   */
  public async getTemplateSafe(id: string): Promise<Result<Template, MNotifyError>> {
    const result = await this.client.requestSafe<Template>({
      method: 'GET',
      url: `/templates/${id}`,
    });

    if (result.isErr()) {
      return result;
    }

    if (!validateTemplate(result.value)) {
      return err(new MNotifyError('Invalid template response format', 0));
    }

    return ok(result.value);
  }

  /**
   * Retrieves a specific template by ID (throws on error - legacy API)
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
    const result = await this.getTemplateSafe(id);
    return result.unwrap();
  }

  /**
   * Deletes a template (railway-oriented programming)
   * @param id - Template ID
   * @returns Result containing deletion confirmation or error
   *
   * @example
   * ```typescript
   * const result = await templateService.deleteTemplateSafe('template_123');
   * if (result.isOk()) {
   *   console.log('Template deleted successfully');
   * }
   * ```
   */
  public async deleteTemplateSafe(id: string): Promise<Result<{ status: string; message: string }, MNotifyError>> {
    const result = await this.client.requestSafe<{ status: string; message: string }>({
      method: 'DELETE',
      url: `/templates/${id}`,
    });

    if (result.isErr()) {
      return result;
    }

    if (!isObject(result.value)) {
      return err(new MNotifyError('Invalid delete response format', 0));
    }

    return ok(result.value);
  }

  /**
   * Deletes a template (throws on error - legacy API)
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
    const result = await this.deleteTemplateSafe(id);
    return result.unwrap();
  }
}
