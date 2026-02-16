import { getPayload } from '@/lib/payload'
import { HeroSection } from '@/components/sections/HeroSection'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { RichTextRenderer } from '@/components/rich-text/RichTextRenderer'
import { formatDate } from '@/lib/formatDate'
import type { Metadata } from 'next'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Press Kit | Planet Caretakers',
  description: 'Media resources, brand assets, and press information for Planet Caretakers.',
}

export default async function PressKitPage() {
  let pressKitPage: any = {}

  try {
    const payload = await getPayload()
    pressKitPage = await payload.findGlobal({ slug: 'press-kit-page' })
  } catch (error) {
    console.error('Failed to fetch data from Payload CMS:', error)
    // Continue with empty/fallback data
  }

  const hero = pressKitPage.hero as Record<string, unknown> | undefined
  const brandAssets = pressKitPage.brandAssets as Record<string, unknown> | undefined
  const founderBio = pressKitPage.founderBio as Record<string, unknown> | undefined
  const mediaMentions = (pressKitPage.mediaMentions as { outlet: string; title: string; url?: string; date?: string }[]) || []
  const approvedPhotos = (pressKitPage.approvedPhotos as { photo: { url: string; alt?: string }; caption?: string; credit?: string }[]) || []
  const howToTalkAboutUs = pressKitPage.howToTalkAboutUs as Record<string, unknown> | undefined
  const pressContact = pressKitPage.pressContact as Record<string, string> | undefined
  const logos = (brandAssets?.logos as { label: string; file: { url: string; alt?: string } }[]) || []

  return (
    <>
      <HeroSection
        tagline={(hero?.heading as string) || 'Press Kit'}
        subtitle={(hero?.subtitle as string) || 'Resources for media and press coverage of Planet Caretakers.'}
      />

      {/* Brand Assets */}
      <section className="py-20">
        <Container>
          <SectionHeading
            title={(brandAssets?.heading as string) || 'Brand Assets'}
            subtitle={(brandAssets?.description as string) || 'Download official logos, brand guidelines, and visual assets.'}
          />
          {logos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {logos.map((logo, i) => (
                <div key={i} className="rounded-2xl bg-brand-sand-light p-6 text-center">
                  <div className="relative mx-auto mb-4 h-32 w-full flex items-center justify-center bg-white rounded-xl p-4">
                    <img
                      src={logo.file.url}
                      alt={logo.file.alt || logo.label}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <h3 className="text-sm font-bold text-brand-teal-dark mb-2">{logo.label}</h3>
                  <a
                    href={logo.file.url}
                    download
                    className="inline-flex items-center text-sm text-brand-green hover:text-brand-green-light transition-colors font-medium"
                  >
                    Download
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              <div className="rounded-2xl bg-brand-sand-light p-8">
                <p className="text-gray-700 leading-relaxed">
                  Planet Caretakers is a global environmental nonprofit focused on community cleanups, education, and conservation. Our visual identity reflects our connection to the Earth through natural tones of teal, green, and sand.
                </p>
                <p className="mt-4 text-gray-700 leading-relaxed">
                  For official logos and brand guidelines, please contact our press office at{' '}
                  <a href="mailto:info@planetcaretakers.org" className="text-brand-green hover:text-brand-green-light transition-colors font-medium">
                    info@planetcaretakers.org
                  </a>.
                </p>
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* Founder Bio */}
      <section className="py-20 bg-brand-sand-light">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                title={(founderBio?.heading as string) || 'Founder'}
                align="left"
              />
              <h3 className="text-2xl font-bold text-brand-teal-dark">
                {(founderBio?.name as string) || 'Débora Sá'}
              </h3>
              <p className="text-brand-teal font-medium mt-1 mb-6">
                {(founderBio?.title as string) || 'Founder & CEO'}
              </p>
              {founderBio?.bio ? (
                <RichTextRenderer content={founderBio.bio as SerializedEditorState} />
              ) : (
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    Débora Sá is a Network Management Technician and Yoga Instructor who founded Planet Caretakers in 2021. Driven by a deep connection to nature and a belief that every person can make a difference, she built Planet Caretakers from the ground up — starting with local beach cleanups in Portugal and growing it into a global movement.
                  </p>
                  <p className="mt-4">
                    Her vision combines hands-on environmental action with community building, education, and wellness. Under her leadership, Planet Caretakers has expanded to multiple countries, mobilizing thousands of volunteers worldwide.
                  </p>
                </div>
              )}
            </div>
            {founderBio?.photo && typeof founderBio.photo === 'object' ? (() => {
              const photo = founderBio.photo as Record<string, string>
              return (
                <div className="relative h-96 rounded-2xl overflow-hidden">
                  <img
                    src={photo.url}
                    alt={photo.alt || (founderBio?.name as string) || 'Founder'}
                    className="w-full h-full object-cover"
                  />
                </div>
              )
            })() : null}
          </div>
        </Container>
      </section>

      {/* How to Talk About Us */}
      <section className="py-20">
        <Container>
          <SectionHeading
            title={(howToTalkAboutUs?.heading as string) || 'How to Talk About Us'}
          />
          <div className="max-w-3xl mx-auto">
            {howToTalkAboutUs?.content ? (
              <RichTextRenderer content={howToTalkAboutUs.content as SerializedEditorState} />
            ) : (
              <div className="space-y-6">
                <div className="rounded-2xl bg-brand-sand-light p-8">
                  <h3 className="text-lg font-bold text-brand-teal-dark mb-3">Official Name</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Always use &ldquo;Planet Caretakers&rdquo; as two words with capital letters. Do not abbreviate to &ldquo;PC&rdquo; or use &ldquo;PlanetCaretakers&rdquo; as one word.
                  </p>
                </div>
                <div className="rounded-2xl bg-brand-sand-light p-8">
                  <h3 className="text-lg font-bold text-brand-teal-dark mb-3">Boilerplate</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Planet Caretakers is a global nonprofit organization founded in Portugal in 2021, dedicated to environmental conservation through community cleanups, education, and sustainable partnerships. Operating across multiple countries, Planet Caretakers mobilizes volunteers to clean, protect, and restore natural spaces — from beaches and forests to underwater ecosystems.
                  </p>
                </div>
                <div className="rounded-2xl bg-brand-sand-light p-8">
                  <h3 className="text-lg font-bold text-brand-teal-dark mb-3">Key Facts</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-brand-green flex-shrink-0" />
                      <span>Founded in 2021 in Portugal</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-brand-green flex-shrink-0" />
                      <span>Registered nonprofit (NIF 516305280)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-brand-green flex-shrink-0" />
                      <span>Activities include beach cleanups, forest restoration, underwater dives, and education</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-brand-green flex-shrink-0" />
                      <span>Global presence across multiple countries</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Media Mentions */}
      {mediaMentions.length > 0 && (
        <section className="py-20 bg-brand-sand-light">
          <Container>
            <SectionHeading title="Media Mentions" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {mediaMentions.map((mention, i) => (
                <div key={i} className="rounded-2xl bg-white p-6">
                  <p className="text-sm font-semibold text-brand-teal uppercase tracking-wide">{mention.outlet}</p>
                  {mention.url ? (
                    <a
                      href={mention.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 block text-lg font-bold text-brand-teal-dark hover:text-brand-green transition-colors"
                    >
                      {mention.title}
                    </a>
                  ) : (
                    <h3 className="mt-2 text-lg font-bold text-brand-teal-dark">{mention.title}</h3>
                  )}
                  {mention.date && (
                    <p className="mt-2 text-sm text-gray-500">
                      {formatDate(mention.date)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Approved Photos */}
      {approvedPhotos.length > 0 && (
        <section className="py-20">
          <Container>
            <SectionHeading
              title="Approved Photos"
              subtitle="These images are approved for press use. Please include credit where specified."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {approvedPhotos.map((item, i) => (
                <div key={i} className="rounded-2xl overflow-hidden">
                  <div className="relative h-64">
                    <img
                      src={item.photo.url}
                      alt={item.photo.alt || item.caption || 'Planet Caretakers'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {(item.caption || item.credit) && (
                    <div className="bg-brand-sand-light p-4">
                      {item.caption && <p className="text-sm text-gray-700">{item.caption}</p>}
                      {item.credit && <p className="text-xs text-gray-500 mt-1">Credit: {item.credit}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Press Contact */}
      <section className="py-20 bg-brand-teal">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Press Contact</h2>
            <p className="text-lg text-gray-200 mb-8">
              For media inquiries, interviews, or additional resources, please contact:
            </p>
            <div className="inline-block rounded-2xl bg-white/10 backdrop-blur-sm p-8">
              <p className="text-xl font-bold text-white">
                {pressContact?.name || 'Planet Caretakers Press Office'}
              </p>
              <a
                href={`mailto:${pressContact?.email || 'info@planetcaretakers.org'}`}
                className="mt-2 block text-lg text-brand-green hover:text-brand-green-light transition-colors font-medium"
              >
                {pressContact?.email || 'info@planetcaretakers.org'}
              </a>
              {pressContact?.phone && (
                <a
                  href={`tel:${pressContact.phone}`}
                  className="mt-1 block text-lg text-gray-300 hover:text-white transition-colors"
                >
                  {pressContact.phone}
                </a>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
