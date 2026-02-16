import { getPayload } from '@/lib/payload'
import { HeroSection } from '@/components/sections/HeroSection'
import { ContactForm } from '@/components/sections/ContactForm'
import { Container } from '@/components/layout/Container'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | Planet Caretakers',
  description: 'Get in touch with Planet Caretakers. Send us a message or find our contact details.',
}

export default async function ContactPage() {
  const payload = await getPayload()
  const contactPage = await payload.findGlobal({ slug: 'contact-page' })

  const hero = contactPage.hero as Record<string, unknown> | undefined
  const contactInfo = contactPage.contactInfo as Record<string, string> | undefined

  return (
    <>
      <HeroSection
        tagline={(hero?.heading as string) || 'Contact Us'}
        subtitle={hero?.subtitle as string}
      />

      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <ContactForm heading="Send us a message" />

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-brand-teal-dark mb-3">Address</h3>
                <p className="text-gray-600">{contactInfo?.address || 'Sobreda, Portugal'}</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-brand-teal-dark mb-3">Email</h3>
                <a
                  href={`mailto:${contactInfo?.email || 'contact@planetcaretakers.org'}`}
                  className="text-brand-green hover:text-brand-green-light transition-colors"
                >
                  {contactInfo?.email || 'contact@planetcaretakers.org'}
                </a>
              </div>

              <div>
                <h3 className="text-lg font-bold text-brand-teal-dark mb-3">Phone</h3>
                <a
                  href={`tel:${contactInfo?.phone || '+351960238484'}`}
                  className="text-brand-green hover:text-brand-green-light transition-colors"
                >
                  {contactInfo?.phone || '+351 960 238 484'}
                </a>
              </div>

              <div>
                <h3 className="text-lg font-bold text-brand-teal-dark mb-3">Office Hours</h3>
                <p className="text-gray-600 whitespace-pre-line">
                  {contactInfo?.officeHours || 'Monday - Friday, 9am - 7pm\nClosed weekends'}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-brand-teal-dark mb-3">Tax Donation</h3>
                <p className="text-gray-600">
                  NIF 516305280 - Consign your IRS to Planet Caretakers
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
