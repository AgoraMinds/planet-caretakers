import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page',
  admin: {
    group: 'Pages',
    description: 'Manage content on the home page.',
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      fields: [
        { name: 'tagline', type: 'text', required: true, defaultValue: 'Every. Action. Counts.' },
        { name: 'subtitle', type: 'textarea', defaultValue: 'Join a global community dedicated to cleaning up our planet, one action at a time.' },
        { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
        {
          name: 'primaryCta',
          type: 'group',
          label: 'Primary Button',
          fields: [
            { name: 'label', type: 'text', defaultValue: 'Become a Volunteer' },
            { name: 'url', type: 'text', defaultValue: '/contact' },
          ],
        },
        {
          name: 'secondaryCta',
          type: 'group',
          label: 'Secondary Button',
          fields: [
            { name: 'label', type: 'text', defaultValue: 'Become a Partner' },
            { name: 'url', type: 'text', defaultValue: '/partners' },
          ],
        },
      ],
    },
    {
      name: 'impactStats',
      type: 'array',
      label: 'Impact Statistics',
      minRows: 1,
      maxRows: 6,
      admin: { description: 'The big numbers displayed below the hero.' },
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
        { name: 'suffix', type: 'text', admin: { description: 'e.g., "+" to display after number' } },
      ],
    },
    {
      name: 'whatWeDo',
      type: 'group',
      label: 'What We Do Section',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'What We Do' },
        { name: 'description', type: 'textarea', defaultValue: 'Planet Caretakers is a global nonprofit born in Portugal in 2021, focused on community cleanups, education, and international collaboration.' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'priorities',
      type: 'array',
      label: 'Our Priorities',
      maxRows: 8,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'icon', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'eventsSection',
      type: 'group',
      label: 'Events Section',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Upcoming Events' },
        { name: 'description', type: 'textarea' },
        { name: 'maxEventsToShow', type: 'number', defaultValue: 6, admin: { description: 'Number of upcoming events to display.' } },
      ],
    },
    {
      name: 'partnershipSection',
      type: 'group',
      label: 'Partnership Section',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Why Partner With Us' },
        { name: 'volunteerHeading', type: 'text', defaultValue: 'Why Volunteer With Us' },
        {
          name: 'benefits',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea', required: true },
            { name: 'icon', type: 'upload', relationTo: 'media' },
          ],
        },
      ],
    },
    {
      name: 'newsSection',
      type: 'group',
      label: 'Latest News Section',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Latest News' },
        { name: 'maxPostsToShow', type: 'number', defaultValue: 3 },
      ],
    },
    {
      name: 'videoSection',
      type: 'group',
      label: 'Video Section',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: false },
        { name: 'heading', type: 'text', defaultValue: 'Turning Care Into Action' },
        { name: 'subtitle', type: 'textarea' },
        { name: 'videoUrl', type: 'text', admin: { description: 'YouTube embed URL or other video platform embed URL' } },
      ],
    },
    {
      name: 'fundraising',
      type: 'group',
      label: 'Fundraising Progress',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: false },
        { name: 'heading', type: 'text' },
        { name: 'subtitle', type: 'textarea' },
        {
          name: 'projects',
          type: 'array',
          maxRows: 4,
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'raised', type: 'number', required: true },
            { name: 'goal', type: 'number', required: true },
            { name: 'currency', type: 'text', defaultValue: '$' },
          ],
        },
      ],
    },
    {
      name: 'testimonials',
      type: 'group',
      label: 'Testimonials Section',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: false },
        { name: 'heading', type: 'text', defaultValue: 'Words From Volunteers' },
        { name: 'subtitle', type: 'textarea' },
        {
          name: 'items',
          type: 'array',
          maxRows: 6,
          fields: [
            { name: 'quote', type: 'textarea', required: true },
            { name: 'author', type: 'text', required: true },
            { name: 'role', type: 'text' },
            { name: 'photo', type: 'upload', relationTo: 'media' },
          ],
        },
      ],
    },
    {
      name: 'recruitmentCta',
      type: 'group',
      label: 'Recruitment CTA',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: false },
        { name: 'heading', type: 'text', defaultValue: 'Become a Planet Caretaker' },
        { name: 'description', type: 'textarea' },
        { name: 'buttonLabel', type: 'text', defaultValue: 'Join Us Today' },
        { name: 'buttonUrl', type: 'text', defaultValue: '/contact' },
      ],
    },
    {
      name: 'contactCta',
      type: 'group',
      label: 'Contact CTA Section',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Get In Touch' },
        { name: 'description', type: 'textarea' },
        { name: 'showForm', type: 'checkbox', defaultValue: true },
      ],
    },
  ],
}
