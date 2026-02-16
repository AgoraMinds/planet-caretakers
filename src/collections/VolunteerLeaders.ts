import type { CollectionConfig } from 'payload'

export const VolunteerLeaders: CollectionConfig = {
  slug: 'volunteer-leaders',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'region', 'location', 'order'],
    group: 'People',
    description: 'Regional volunteer team leaders.',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'location', type: 'text', required: true, label: 'City / Area' },
    {
      name: 'region',
      type: 'select',
      required: true,
      options: [
        { label: 'Portugal', value: 'portugal' },
        { label: 'Worldwide', value: 'worldwide' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'country', type: 'text', required: true },
    {
      name: 'contact',
      type: 'group',
      fields: [
        { name: 'instagram', type: 'text' },
        { name: 'email', type: 'email' },
      ],
    },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
