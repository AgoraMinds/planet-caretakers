import type { GlobalConfig } from 'payload'

export const GovernancePage: GlobalConfig = {
  slug: 'governance-page',
  label: 'Governance Page',
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
        { name: 'heading', type: 'text', defaultValue: 'Governance & Transparency' },
        { name: 'subtitle', type: 'textarea', defaultValue: 'Committed to accountability, transparency, and ethical environmental action.' },
      ],
    },
    {
      name: 'organizationInfo',
      type: 'group',
      label: 'Organization Info',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Our Organization' },
        { name: 'legalName', type: 'text', defaultValue: 'Planet Caretakers' },
        { name: 'nif', type: 'text', defaultValue: '516305280' },
        { name: 'foundedYear', type: 'number', defaultValue: 2021 },
        { name: 'registrationType', type: 'text', defaultValue: 'Registered nonprofit in Portugal' },
        { name: 'description', type: 'richText' },
      ],
    },
    {
      name: 'boardAndStructure',
      type: 'group',
      label: 'Board & Structure',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Board & Structure' },
        { name: 'description', type: 'textarea' },
        {
          name: 'members',
          type: 'array',
          label: 'Board Members',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'role', type: 'text', required: true },
            { name: 'bio', type: 'textarea' },
            { name: 'photo', type: 'upload', relationTo: 'media' },
          ],
        },
      ],
    },
    {
      name: 'policies',
      type: 'array',
      label: 'Policies',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'documentUrl', type: 'text' },
      ],
    },
    {
      name: 'safeguarding',
      type: 'group',
      label: 'Safeguarding',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Safeguarding' },
        { name: 'content', type: 'richText' },
      ],
    },
    {
      name: 'partnerEthics',
      type: 'group',
      label: 'Partner Ethics',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Partner Ethics' },
        { name: 'content', type: 'richText' },
      ],
    },
    {
      name: 'annualReports',
      type: 'array',
      label: 'Annual Reports',
      fields: [
        { name: 'year', type: 'number', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'fileUrl', type: 'text' },
        { name: 'summary', type: 'textarea' },
      ],
    },
  ],
}
