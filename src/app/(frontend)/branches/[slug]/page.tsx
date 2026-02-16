import { getPayload } from '@/lib/payload'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { RichTextRenderer } from '@/components/rich-text/RichTextRenderer'
import { HeroSection } from '@/components/sections/HeroSection'
import { CTABanner } from '@/components/sections/CTABanner'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  try {
    const payload = await getPayload()
    const branches = await payload.find({
      collection: 'branches',
      limit: 100,
      depth: 0,
    })
    return branches.docs.map((branch) => ({ slug: branch.slug as string }))
  } catch (error) {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  try {
    const payload = await getPayload()
    const branches = await payload.find({
      collection: 'branches',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
    })
    const branch = branches.docs[0]
    if (branch) {
      return {
        title: `${branch.name} | Planet Caretakers`,
        description: `Planet Caretakers ${branch.country} branch — ${branch.name}`,
      }
    }
  } catch (error) {
    console.error('Failed to fetch metadata from Payload CMS:', error)
  }

  return { title: 'Branch | Planet Caretakers' }
}

export default async function BranchPage({ params }: Props) {
  const { slug } = await params

  let branch: any = null

  try {
    const payload = await getPayload()
    const branches = await payload.find({
      collection: 'branches',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 2,
    })
    branch = branches.docs[0]
  } catch (error) {
    console.error('Failed to fetch data from Payload CMS:', error)
  }

  if (!branch) {
    notFound()
  }

  const featuredImage =
    branch.featuredImage && typeof branch.featuredImage === 'object'
      ? (branch.featuredImage as Record<string, string>)
      : null

  const leaders = Array.isArray(branch.leaders)
    ? branch.leaders.filter((l: any) => l && typeof l === 'object')
    : []

  const projects = Array.isArray(branch.projects)
    ? branch.projects.filter((p: any) => p && typeof p === 'object')
    : []

  const donationTarget = branch.donationTarget as {
    goal?: number | null
    raised?: number | null
    currency?: string | null
  } | null

  const socialLinks = branch.socialLinks as {
    instagram?: string | null
    facebook?: string | null
    website?: string | null
  } | null

  const hasSocialLinks =
    socialLinks?.instagram || socialLinks?.facebook || socialLinks?.website

  const donationGoal = donationTarget?.goal ?? 0
  const donationRaised = donationTarget?.raised ?? 0
  const donationCurrency = donationTarget?.currency || 'EUR'
  const donationPercentage =
    donationGoal > 0 ? Math.min(100, Math.round((donationRaised / donationGoal) * 100)) : 0

  return (
    <article>
      {/* Hero */}
      <HeroSection
        tagline={branch.name as string}
        subtitle={branch.country as string}
        backgroundImageUrl={featuredImage?.url}
      />

      {/* Description */}
      {branch.description && (
        <section className="py-16">
          <Container>
            <div className="max-w-3xl mx-auto">
              <RichTextRenderer content={branch.description as never} />
            </div>
          </Container>
        </section>
      )}

      {/* Donation Progress */}
      {donationGoal > 0 && (
        <section className="py-16 bg-brand-sand-light">
          <Container>
            <SectionHeading
              title="Fundraising Progress"
              subtitle={`Help us reach our goal for ${branch.name as string}`}
            />
            <div className="max-w-xl mx-auto">
              <div className="rounded-2xl bg-white p-8 shadow-sm">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-brand-teal">
                    {donationCurrency}
                    {donationRaised.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-600">
                    of {donationCurrency}
                    {donationGoal.toLocaleString()} goal
                  </span>
                </div>
                <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-brand-green rounded-full transition-all duration-500"
                    style={{ width: `${donationPercentage}%` }}
                  />
                </div>
                <p className="mt-3 text-sm font-medium text-brand-teal">
                  {donationPercentage}% raised
                </p>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Leaders */}
      {leaders.length > 0 && (
        <section className="py-16">
          <Container>
            <SectionHeading
              title="Branch Leaders"
              subtitle="Meet the people leading our efforts in this region."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {leaders.map((leader: any) => {
                const photo =
                  leader.photo && typeof leader.photo === 'object'
                    ? (leader.photo as Record<string, string>)
                    : null
                const contact = leader.contact as {
                  instagram?: string | null
                  email?: string | null
                } | null

                return (
                  <div
                    key={leader.id || leader.name}
                    className="rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow p-6 text-center"
                  >
                    {photo ? (
                      <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                        <Image
                          src={photo.url}
                          alt={photo.alt || (leader.name as string)}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-brand-sand-light flex items-center justify-center">
                        <svg
                          className="h-10 w-10 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                          />
                        </svg>
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-brand-teal-dark">
                      {leader.name as string}
                    </h3>
                    {leader.location && (
                      <p className="mt-1 text-sm text-gray-600">{leader.location as string}</p>
                    )}
                    {contact?.instagram && (
                      <a
                        href={contact.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block text-sm text-brand-green hover:text-brand-green-light transition-colors"
                      >
                        Instagram
                      </a>
                    )}
                  </div>
                )
              })}
            </div>
          </Container>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="py-16 bg-gray-50">
          <Container>
            <SectionHeading
              title="Our Projects"
              subtitle="Active initiatives in this branch."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project: any) => {
                const projectImage =
                  project.featuredImage && typeof project.featuredImage === 'object'
                    ? (project.featuredImage as Record<string, string>)
                    : null

                return (
                  <Link
                    key={project.id || project.slug}
                    href={`/projects/${project.slug as string}`}
                    className="group rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                  >
                    {projectImage ? (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={projectImage.url}
                          alt={projectImage.alt || (project.title as string)}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-brand-sand-light flex items-center justify-center">
                        <svg
                          className="h-12 w-12 text-gray-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                          />
                        </svg>
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-brand-teal-dark group-hover:text-brand-teal transition-colors">
                        {project.title as string}
                      </h3>
                      {project.subtitle && (
                        <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                          {project.subtitle as string}
                        </p>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          </Container>
        </section>
      )}

      {/* Social Links & Contact */}
      {(hasSocialLinks || branch.contactEmail) && (
        <section className="py-16">
          <Container>
            <SectionHeading
              title="Get in Touch"
              subtitle={`Connect with ${branch.name as string}`}
            />
            <div className="max-w-lg mx-auto text-center space-y-6">
              {/* Social Links */}
              {hasSocialLinks && (
                <div className="flex items-center justify-center gap-4">
                  {socialLinks?.instagram && (
                    <a
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-brand-sand-light px-5 py-2.5 text-sm font-semibold text-brand-teal-dark hover:bg-brand-teal hover:text-white transition-colors"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                      Instagram
                    </a>
                  )}
                  {socialLinks?.facebook && (
                    <a
                      href={socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-brand-sand-light px-5 py-2.5 text-sm font-semibold text-brand-teal-dark hover:bg-brand-teal hover:text-white transition-colors"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      Facebook
                    </a>
                  )}
                  {socialLinks?.website && (
                    <a
                      href={socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-brand-sand-light px-5 py-2.5 text-sm font-semibold text-brand-teal-dark hover:bg-brand-teal hover:text-white transition-colors"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                        />
                      </svg>
                      Website
                    </a>
                  )}
                </div>
              )}

              {/* Contact Email */}
              {branch.contactEmail && (
                <p className="text-gray-600">
                  Email us at{' '}
                  <a
                    href={`mailto:${branch.contactEmail as string}`}
                    className="font-semibold text-brand-green hover:text-brand-green-light transition-colors"
                  >
                    {branch.contactEmail as string}
                  </a>
                </p>
              )}
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <CTABanner
        heading="Want to join this branch?"
        description="Get involved with your local Planet Caretakers community."
        buttonLabel="Contact Us"
        buttonUrl="/contact"
      />

      {/* Back Link */}
      <section className="py-12">
        <Container>
          <Link
            href="/"
            className="inline-flex items-center text-sm font-semibold text-brand-green hover:text-brand-green-light transition-colors"
          >
            &larr; Back to Home
          </Link>
        </Container>
      </section>
    </article>
  )
}
