import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import sharp from 'sharp'

// Collections
import { Users } from '@/collections/Users'
import { Media } from '@/collections/Media'
import { BlogPosts } from '@/collections/BlogPosts'
import { Events } from '@/collections/Events'
import { TeamMembers } from '@/collections/TeamMembers'
import { VolunteerLeaders } from '@/collections/VolunteerLeaders'
import { Partners } from '@/collections/Partners'
import { ActivityCategories } from '@/collections/ActivityCategories'
import { Projects } from '@/collections/Projects'
import { ContactSubmissions } from '@/collections/ContactSubmissions'
import { Branches } from '@/collections/Branches'

// Globals
import { SiteSettings } from '@/globals/SiteSettings'
import { Navigation } from '@/globals/Navigation'
import { HomePage } from '@/globals/HomePage'
import { AboutPage } from '@/globals/AboutPage'
import { ActivitiesPage } from '@/globals/ActivitiesPage'
import { VolunteersPage } from '@/globals/VolunteersPage'
import { PartnersPage } from '@/globals/PartnersPage'
import { ContactPage } from '@/globals/ContactPage'
import { DonatePage } from '@/globals/DonatePage'
import { PressKitPage } from '@/globals/PressKitPage'
import { GovernancePage } from '@/globals/GovernancePage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' | Planet Caretakers CMS',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    BlogPosts,
    Events,
    TeamMembers,
    VolunteerLeaders,
    Partners,
    ActivityCategories,
    Projects,
    ContactSubmissions,
    Branches,
  ],
  globals: [
    SiteSettings,
    Navigation,
    HomePage,
    AboutPage,
    ActivitiesPage,
    VolunteersPage,
    PartnersPage,
    ContactPage,
    DonatePage,
    PressKitPage,
    GovernancePage,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'default-secret-change-me-in-production',
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },
  db: process.env.DATABASE_URL
    ? postgresAdapter({
        pool: { connectionString: process.env.DATABASE_URL },
        push: true,
      })
    : sqliteAdapter({
        client: {
          url: process.env.DATABASE_URI || 'file:./planet-caretakers.db',
        },
      }),
  sharp,
  plugins: [
    seoPlugin({
      collections: ['blog-posts', 'events'],
      globals: ['home-page', 'about-page', 'activities-page', 'volunteers-page', 'partners-page', 'contact-page', 'donate-page', 'press-kit-page', 'governance-page'],
      tabbedUI: true,
      generateTitle: ({ doc }) => `${(doc as Record<string, unknown>)?.title || 'Planet Caretakers'} | Planet Caretakers`,
      generateDescription: ({ doc }) => {
        const d = doc as Record<string, unknown>
        return (d?.excerpt || d?.description || '') as string
      },
    }),
    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? [
          vercelBlobStorage({
            collections: { media: true },
            token: process.env.BLOB_READ_WRITE_TOKEN,
          }),
        ]
      : []),
  ],
})
