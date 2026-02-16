import type { GlobalConfig } from 'payload'

export const PressKitPage: GlobalConfig = {
  slug: 'press-kit-page',
  label: 'Press Kit Page',
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
        { name: 'heading', type: 'text', defaultValue: 'Press Kit' },
        { name: 'subtitle', type: 'textarea', defaultValue: 'Resources for media and press coverage of Planet Caretakers.' },
      ],
    },
    {
      name: 'brandAssets',
      type: 'group',
      label: 'Brand Assets',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Brand Assets' },
        { name: 'description', type: 'textarea', defaultValue: 'Download official logos, brand guidelines, and visual assets.' },
        {
          name: 'logos',
          type: 'array',
          label: 'Logos',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'file', type: 'upload', relationTo: 'media', required: true },
          ],
        },
      ],
    },
    {
      name: 'founderBio',
      type: 'group',
      label: 'Founder Bio',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Founder' },
        { name: 'name', type: 'text', defaultValue: 'Débora Sá' },
        { name: 'title', type: 'text', defaultValue: 'Founder & CEO' },
        { name: 'bio', type: 'richText' },
        { name: 'photo', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'mediaMentions',
      type: 'array',
      label: 'Media Mentions',
      fields: [
        { name: 'outlet', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'url', type: 'text' },
        { name: 'date', type: 'date' },
      ],
    },
    {
      name: 'approvedPhotos',
      type: 'array',
      label: 'Approved Photos',
      fields: [
        { name: 'photo', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text' },
        { name: 'credit', type: 'text' },
      ],
    },
    {
      name: 'howToTalkAboutUs',
      type: 'group',
      label: 'How to Talk About Us',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'How to Talk About Us' },
        { name: 'content', type: 'richText' },
      ],
    },
    {
      name: 'pressContact',
      type: 'group',
      label: 'Press Contact',
      fields: [
        { name: 'name', type: 'text', defaultValue: 'Planet Caretakers Press Office' },
        { name: 'email', type: 'text', defaultValue: 'info@planetcaretakers.org' },
        { name: 'phone', type: 'text' },
      ],
    },
  ],
}
