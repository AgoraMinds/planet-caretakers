import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Settings',
    description: 'Global settings that apply across the entire website.',
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    { name: 'siteName', type: 'text', required: true, defaultValue: 'Planet Caretakers' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'logoLight', type: 'upload', relationTo: 'media', label: 'Logo (Light Version)', admin: { description: 'White/light version for dark backgrounds.' } },
    {
      name: 'defaultSeo',
      type: 'group',
      label: 'Default SEO',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Planet Caretakers - Every Action Counts' },
        { name: 'description', type: 'textarea', defaultValue: 'Planet Caretakers is a nonprofit organization dedicated to environmental cleanups and conservation worldwide.' },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'donationInfo',
      type: 'group',
      label: 'Donation Info',
      fields: [
        { name: 'nif', type: 'text', defaultValue: '516305280', label: 'NIF (Tax Number)' },
        { name: 'description', type: 'textarea', defaultValue: 'Consign your IRS to Planet Caretakers' },
      ],
    },
    {
      name: 'whatsappWidget',
      type: 'group',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        { name: 'phoneNumber', type: 'text', defaultValue: '+351960238484' },
        { name: 'message', type: 'text', defaultValue: 'Hello! I would like to know more about Planet Caretakers.' },
      ],
    },
    {
      name: 'socialLinks',
      type: 'group',
      label: 'Social Media Links',
      fields: [
        { name: 'instagram', type: 'text' },
        { name: 'facebook', type: 'text' },
        { name: 'linkedin', type: 'text' },
        { name: 'youtube', type: 'text' },
      ],
    },
    {
      name: 'analytics',
      type: 'group',
      admin: { description: 'Tracking codes and analytics IDs.' },
      fields: [
        { name: 'googleAnalyticsId', type: 'text', label: 'Google Analytics ID' },
        { name: 'facebookPixelId', type: 'text', label: 'Facebook Pixel ID' },
      ],
    },
  ],
}
