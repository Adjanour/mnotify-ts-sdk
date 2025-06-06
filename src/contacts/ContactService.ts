import { z } from 'zod';
import { MNotifyClient } from '../client/MNotifyClient';

const ContactSchema = z.object({
  _id: z.string(),
  phone: z.string(),
  title: z.string().optional(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.array(z.string()).optional(),
  dbo:z.string().optional(),
});

export type Contact = z.infer<typeof ContactSchema>;
export type CreateContact = Omit<Contact, '_id'>;

export class ContactService {
  constructor(private readonly client: MNotifyClient) {}

  public async createContact(contact: Omit<Contact,"_id">) {
    const response = await this.client.request<CreateContact>({
      method: 'POST',
      url: '/contacts',
      data: contact
    });

    return ContactSchema.parse(response);
  }

  public async getContacts() {
    const response = await this.client.request({
      method: 'GET',
      url: '/contacts'
    });

    return z.array(ContactSchema).parse(response);
  }
}