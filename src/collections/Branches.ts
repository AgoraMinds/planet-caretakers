import type { CollectionConfig } from 'payload'

export const Branches: CollectionConfig = {
  slug: 'branches',
  labels: { singular: 'Branch', plural: 'Branches' },
  admin: { group: 'Content', useAsTitle: 'name' },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
    { name: 'country', type: 'text', required: true },
    { name: 'description', type: 'richText' },
    { name: 'leaders', type: 'relationship', relationTo: 'volunteer-leaders', hasMany: true },
    { name: 'projects', type: 'relationship', relationTo: 'projects', hasMany: true },
    {
      name: 'donationTarget',
      type: 'group',
      fields: [
        { name: 'goal', type: 'number' },
        { name: 'raised', type: 'number' },
        { name: 'currency', type: 'text', defaultValue: 'EUR' },
      ],
    },
    { name: 'contactEmail', type: 'email' },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        { name: 'instagram', type: 'text' },
        { name: 'facebook', type: 'text' },
        { name: 'website', type: 'text' },
      ],
    },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
