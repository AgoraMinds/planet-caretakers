import { getPayload } from '@/lib/payload'
import { HeroSection } from '@/components/sections/HeroSection'
import { CTABanner } from '@/components/sections/CTABanner'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { RichTextRenderer } from '@/components/rich-text/RichTextRenderer'
import type { Metadata } from 'next'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Governance & Transparency | Planet Caretakers',
  description: 'Learn about Planet Caretakers governance, policies, and commitment to transparency and accountability.',
}

const fallbackPolicies: { title: string; description: string; documentUrl?: string }[] = [
  { title: 'Environmental Policy', description: 'Our commitment to minimizing environmental impact in all operations, ensuring sustainable practices across every cleanup, event, and partnership.' },
  { title: 'Volunteer Safety Policy', description: 'Comprehensive guidelines to ensure the health and safety of all volunteers during activities, including risk assessments and safety equipment protocols.' },
  { title: 'Data Protection Policy', description: 'How we collect, store, and protect personal data in compliance with GDPR and Portuguese data protection regulations.' },
  { title: 'Code of Conduct', description: 'The behavioral standards expected of all team members, volunteers, and partners representing Planet Caretakers.' },
]

const fallbackBoardMembers: { name: string; role: string; bio?: string; photo?: { url: string; alt?: string } }[] = [
  { name: 'Débora Sá', role: 'Founder & CEO', bio: 'Network Management Technician and Yoga Instructor. Founded Planet Caretakers in 2021 with a mission to unite communities around environmental action.' },
]

export default async function GovernancePage() {
  let governancePage: any = {}

  try {
    const payload = await getPayload()
    governancePage = await payload.findGlobal({ slug: 'governance-page' })
  } catch (error) {
    console.error('Failed to fetch data from Payload CMS:', error)
    // Continue with empty/fallback data
  }

  const hero = governancePage.hero as Record<string, unknown> | undefined
  const orgInfo = governancePage.organizationInfo as Record<string, unknown> | undefined
  const boardAndStructure = governancePage.boardAndStructure as Record<string, unknown> | undefined
  const policies = (governancePage.policies as { title: string; description: string; documentUrl?: string }[])?.length
    ? (governancePage.policies as { title: string; description: string; documentUrl?: string }[])
    : fallbackPolicies
  const safeguarding = governancePage.safeguarding as Record<string, unknown> | undefined
  const partnerEthics = governancePage.partnerEthics as Record<string, unknown> | undefined
  const annualReports = (governancePage.annualReports as { year: number; title: string; fileUrl?: string; summary?: string }[]) || []
  const boardMembers = (boardAndStructure?.members as { name: string; role: string; bio?: string; photo?: { url: string; alt?: string } }[])?.length
    ? (boardAndStructure!.members as { name: string; role: string; bio?: string; photo?: { url: string; alt?: string } }[])
    : fallbackBoardMembers

  return (
    <>
      <HeroSection
        tagline={(hero?.heading as string) || 'Governance & Transparency'}
        subtitle={(hero?.subtitle as string) || 'Committed to accountability, transparency, and ethical environmental action.'}
      />

      {/* Organization Info */}
      <section className="py-20">
        <Container>
          <SectionHeading
            title={(orgInfo?.heading as string) || 'Our Organization'}
          />
          <div className="max-w-4xl mx-auto">
            {orgInfo?.description ? (
              <div className="mb-8">
                <RichTextRenderer content={orgInfo.description as SerializedEditorState} />
              </div>
            ) : (
              <p className="text-center text-lg text-gray-600 mb-8">
                Planet Caretakers is a registered nonprofit organization dedicated to environmental conservation through community action. We operate with full transparency and accountability to our supporters, volunteers, and the communities we serve.
              </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="rounded-2xl bg-brand-sand-light p-6 text-center">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Legal Name</p>
                <p className="mt-2 text-lg font-bold text-brand-teal-dark">
                  {(orgInfo?.legalName as string) || 'Planet Caretakers'}
                </p>
              </div>
              <div className="rounded-2xl bg-brand-sand-light p-6 text-center">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">NIF</p>
                <p className="mt-2 text-lg font-bold text-brand-teal-dark">
                  {(orgInfo?.nif as string) || '516305280'}
                </p>
              </div>
              <div className="rounded-2xl bg-brand-sand-light p-6 text-center">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Founded</p>
                <p className="mt-2 text-lg font-bold text-brand-teal-dark">
                  {(orgInfo?.foundedYear as number) || 2021}
                </p>
              </div>
              <div className="rounded-2xl bg-brand-sand-light p-6 text-center">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Registration</p>
                <p className="mt-2 text-lg font-bold text-brand-teal-dark">
                  {(orgInfo?.registrationType as string) || 'Registered nonprofit in Portugal'}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Board & Structure */}
      <section className="py-20 bg-brand-sand-light">
        <Container>
          <SectionHeading
            title={(boardAndStructure?.heading as string) || 'Board & Structure'}
            subtitle={(boardAndStructure?.description as string) || 'The people guiding our mission and ensuring accountability.'}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {boardMembers.map((member, i) => (
              <div key={i} className="rounded-2xl bg-white p-6 text-center">
                <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full bg-gray-200 mb-4">
                  {member.photo && typeof member.photo === 'object' && (
                    <img
                      src={member.photo.url}
                      alt={member.photo.alt || member.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                <p className="text-sm text-brand-teal font-medium">{member.role}</p>
                {member.bio && (
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">{member.bio}</p>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Policies */}
      <section className="py-20">
        <Container>
          <SectionHeading
            title="Policies"
            subtitle="The policies and standards that guide our work."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {policies.map((policy, i) => (
              <div key={i} className="rounded-2xl bg-brand-sand-light p-6">
                <h3 className="text-lg font-bold text-brand-teal-dark mb-2">{policy.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{policy.description}</p>
                {policy.documentUrl && (
                  <a
                    href={policy.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center text-sm text-brand-green hover:text-brand-green-light transition-colors font-medium"
                  >
                    View Document
                  </a>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Safeguarding */}
      <section className="py-20 bg-brand-sand-light">
        <Container>
          <SectionHeading
            title={(safeguarding?.heading as string) || 'Safeguarding'}
          />
          <div className="max-w-3xl mx-auto">
            {safeguarding?.content ? (
              <RichTextRenderer content={safeguarding.content as SerializedEditorState} />
            ) : (
              <div className="rounded-2xl bg-white p-8">
                <p className="text-gray-700 leading-relaxed">
                  Planet Caretakers is committed to the safety and wellbeing of all individuals involved in our activities, with special attention to vulnerable groups including children and young people. We maintain strict safeguarding protocols across all our operations.
                </p>
                <p className="mt-4 text-gray-700 leading-relaxed">
                  All volunteers and staff undergo appropriate screening and training. We have clear reporting procedures for any concerns, and we work with local authorities to ensure compliance with all relevant safeguarding legislation.
                </p>
                <p className="mt-4 text-gray-700 leading-relaxed">
                  If you have any safeguarding concerns, please contact us immediately at{' '}
                  <a href="mailto:info@planetcaretakers.org" className="text-brand-green hover:text-brand-green-light transition-colors font-medium">
                    info@planetcaretakers.org
                  </a>.
                </p>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Partner Ethics */}
      <section className="py-20">
        <Container>
          <SectionHeading
            title={(partnerEthics?.heading as string) || 'Partner Ethics'}
          />
          <div className="max-w-3xl mx-auto">
            {partnerEthics?.content ? (
              <RichTextRenderer content={partnerEthics.content as SerializedEditorState} />
            ) : (
              <div className="rounded-2xl bg-brand-sand-light p-8">
                <p className="text-gray-700 leading-relaxed">
                  Planet Caretakers carefully vets all partnerships to ensure alignment with our environmental mission and ethical standards. We do not accept partnerships with organizations whose core activities conflict with environmental sustainability.
                </p>
                <p className="mt-4 text-gray-700 leading-relaxed">
                  Our partners are expected to uphold the same standards of integrity, transparency, and environmental responsibility that guide our own operations. We regularly review partnerships to ensure continued alignment with our values.
                </p>
                <p className="mt-4 text-gray-700 leading-relaxed">
                  We believe in honest, transparent communication about the impact of our joint initiatives and ensure that all partnership claims are verifiable and accurate.
                </p>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Annual Reports */}
      {annualReports.length > 0 && (
        <section className="py-20 bg-brand-sand-light">
          <Container>
            <SectionHeading
              title="Annual Reports"
              subtitle="Full transparency on our operations, finances, and impact."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {annualReports.map((report, i) => (
                <div key={i} className="rounded-2xl bg-white p-6">
                  <p className="text-4xl font-extrabold text-brand-teal-dark">{report.year}</p>
                  <h3 className="mt-2 text-lg font-bold text-gray-900">{report.title}</h3>
                  {report.summary && (
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">{report.summary}</p>
                  )}
                  {report.fileUrl && (
                    <a
                      href={report.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center text-sm text-brand-green hover:text-brand-green-light transition-colors font-medium"
                    >
                      Download Report
                    </a>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTABanner
        heading="Questions about our governance?"
        description="We believe in full transparency. Reach out if you have any questions about how we operate."
        buttonLabel="Contact Us"
        buttonUrl="/contact"
      />
    </>
  )
}
