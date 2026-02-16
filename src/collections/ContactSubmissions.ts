import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'subject',
    defaultColumns: ['name', 'email', 'subject', 'readStatus', 'createdAt'],
    group: 'Admin',
    description: 'Contact form submissions from website visitors.',
  },
  access: {
    read: ({ req: { user } }) => !!user,
    create: () => true,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'subject', type: 'text', required: true },
    { name: 'message', type: 'textarea', required: true },
    {
      name: 'readStatus',
      type: 'select',
      defaultValue: 'unread',
      options: [
        { label: 'Unread', value: 'unread' },
        { label: 'Read', value: 'read' },
        { label: 'Replied', value: 'replied' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Internal Notes',
      admin: { position: 'sidebar', description: 'Notes for the team (not visible to submitter).' },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation === 'create') {
          try {
            await req.payload.sendEmail({
              to: 'contact@planetcaretakers.org',
              subject: `New Contact Form: ${doc.subject}`,
              html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${doc.name}</p>
                <p><strong>Email:</strong> ${doc.email}</p>
                <p><strong>Phone:</strong> ${doc.phone || 'Not provided'}</p>
                <p><strong>Subject:</strong> ${doc.subject}</p>
                <p><strong>Message:</strong></p>
                <p>${doc.message}</p>
              `,
            })
          } catch (err) {
            console.error('Failed to send contact notification email:', err)
          }
        }
      },
    ],
  },
}
