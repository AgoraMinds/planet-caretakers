import type { GlobalConfig } from 'payload'

export const DonatePage: GlobalConfig = {
  slug: 'donate-page',
  label: 'Donate Page',
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
        { name: 'heading', type: 'text', defaultValue: 'Support Our Mission' },
        { name: 'subtitle', type: 'textarea', defaultValue: 'Every donation helps us clean, protect, and restore our planet.' },
        { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'impactTiers',
      type: 'array',
      label: 'Impact Tiers',
      maxRows: 6,
      fields: [
        { name: 'amount', type: 'number', required: true },
        { name: 'currency', type: 'text', defaultValue: '€' },
        { name: 'label', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
    {
      name: 'bankTransfer',
      type: 'group',
      label: 'Bank Transfer Details',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        { name: 'heading', type: 'text', defaultValue: 'Bank Transfer' },
        { name: 'description', type: 'textarea' },
        { name: 'iban', type: 'text' },
        { name: 'swift', type: 'text' },
        { name: 'accountName', type: 'text' },
      ],
    },
    {
      name: 'paypal',
      type: 'group',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: false },
        { name: 'heading', type: 'text', defaultValue: 'PayPal' },
        { name: 'paypalUrl', type: 'text' },
      ],
    },
    {
      name: 'taxBenefits',
      type: 'group',
      label: 'Tax Benefits',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Tax Benefits' },
        { name: 'description', type: 'textarea', defaultValue: 'As a registered nonprofit, your donations may be tax-deductible.' },
        { name: 'nif', type: 'text', defaultValue: '516305280' },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Every action counts.' },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
}
