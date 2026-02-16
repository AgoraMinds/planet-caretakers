import type { GlobalConfig } from 'payload'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Contact Page',
  admin: { group: 'Pages' },
  access: {
    read: () => true,
    update: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Contact Us' },
        { name: 'subtitle', type: 'textarea', defaultValue: 'Have a question or want to get involved? We would love to hear from you.' },
      ],
    },
    {
      name: 'contactInfo',
      type: 'group',
      label: 'Contact Information',
      fields: [
        { name: 'address', type: 'textarea', defaultValue: 'Sobreda, Portugal' },
        { name: 'email', type: 'email', defaultValue: 'contact@planetcaretakers.org' },
        { name: 'phone', type: 'text', defaultValue: '+351 960 238 484' },
        { name: 'officeHours', type: 'textarea', defaultValue: 'Monday - Friday, 9am - 7pm\nClosed weekends', admin: { description: 'Office hours display text.' } },
      ],
    },
  ],
}
