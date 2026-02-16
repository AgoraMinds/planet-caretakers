import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import path from 'path'
import fs from 'fs'

export const maxDuration = 300

export async function POST() {
  try {
    const payload = await getPayload({ config })

    console.log('\u{1f30d} Seeding Planet Caretakers...')

    // 1. Create admin user
    console.log('Creating admin user...')
    try {
      await payload.create({
        collection: 'users',
        data: {
          email: 'admin@planetcaretakers.org',
          password: 'PlanetAdmin2024!',
          role: 'admin',
          firstName: 'Admin',
          lastName: 'User',
        },
      })
    } catch (e) {
      console.log('Admin user may already exist, skipping...')
    }

    // 2. Upload images helper
    const uploadImage = async (filePath: string, alt: string) => {
      const fullPath = path.resolve(process.cwd(), 'public', filePath)
      if (!fs.existsSync(fullPath)) {
        console.log(`  Skipping missing file: ${filePath}`)
        return null
      }
      try {
        const result = await payload.create({
          collection: 'media',
          data: { alt },
          file: {
            data: fs.readFileSync(fullPath),
            name: path.basename(fullPath),
            mimetype: fullPath.endsWith('.png') ? 'image/png' : 'image/jpeg',
            size: fs.statSync(fullPath).size,
          },
        })
        console.log(`  Uploaded: ${alt}`)
        return result
      } catch (e) {
        console.log(`  Failed to upload ${filePath}: ${e}`)
        return null
      }
    }

    // 3. Upload all images
    console.log('Uploading images...')

    const logo = await uploadImage('images/logo/logo-full.png', 'Planet Caretakers Logo')
    const logoSmall = await uploadImage('images/logo/logo-small.png', 'Planet Caretakers Logo Small')
    const heroLanding = await uploadImage('images/hero/events-team-landing.jpg', 'Team volunteering at beach cleanup')
    const heroSaveWorld = await uploadImage('images/hero/save-the-world.jpg', 'Save the world environmental concept')
    const heroTeamwork = await uploadImage('images/hero/volunteer-teamwork.jpg', 'Volunteers planting seedlings in forest')
    const heroCommunity = await uploadImage('images/hero/community-photo.jpg', 'Planet Caretakers community gathering')
    const heroFavela = await uploadImage('images/hero/brasil-favela-kids.jpg', 'Community work with children in Brazil')
    const deboraSignature = await uploadImage('images/hero/debora-signature.png', 'D\u00e9bora S\u00e1 signature')
    const deboraFounder = await uploadImage('images/team/debora-founder.png', 'D\u00e9bora S\u00e1, Founder')

    const actUnderwater = await uploadImage('images/activities/underwater-cleanup.jpg', 'Underwater cleanup diving')
    const actSimultaneous = await uploadImage('images/activities/simultaneous-cleanups.jpg', 'Simultaneous global cleanups')
    const actBottles = await uploadImage('images/activities/water-bottles.jpg', 'Water bottles art concept')
    const actBeach = await uploadImage('images/activities/beach-cleanup.jpg', 'Beach cleanup volunteers')

    // Team photos
    const teamDebora = await uploadImage('images/team/debora-sa.jpg', 'D\u00e9bora S\u00e1')
    const teamPedroO = await uploadImage('images/team/pedro-olivenca.jpg', 'Pedro Oliven\u00e7a')
    const teamFernando = await uploadImage('images/team/fernando-amaral.jpeg', 'Fernando Amaral')
    const teamFilipe = await uploadImage('images/team/filipe-sa.jpeg', 'Filipe S\u00e1')
    const teamGustavo = await uploadImage('images/team/gustavo-schmidt.jpg', 'Gustavo Schmidt')
    const teamPedroF = await uploadImage('images/team/pedro-freitas.jpeg', 'Pedro de Freitas')
    const teamEdgar = await uploadImage('images/team/edgar-antunes.jpeg', 'Edgar Antunes')
    const teamMarta = await uploadImage('images/team/marta-iva.jpeg', 'Marta Iva')

    // Volunteer photos
    const volDiogo = await uploadImage('images/volunteers/diogo-amaral.jpg', 'Diogo Amaral')
    const volTania = await uploadImage('images/volunteers/tania-garfinho.jpeg', 'T\u00e2nia Garfinho')
    const volMaddie = await uploadImage('images/volunteers/maddie-howarth.jpg', 'Maddie Howarth')

    // Partner logos
    const partOmoceans = await uploadImage('images/partners/omoceans.png', 'OmoOceans')
    const partStudio51 = await uploadImage('images/partners/studio51.png', 'Studio51')
    const partBrigada = await uploadImage('images/partners/brigada-do-mar.png', 'Brigada do Mar')
    const partBrands4 = await uploadImage('images/partners/brands-4.png', 'Partner Brand')
    const partBrands1 = await uploadImage('images/partners/brands-1.png', 'Partner Brand')
    const partTrash = await uploadImage('images/partners/trash-traveler.png', 'The Trash Traveler')
    const partJardim = await uploadImage('images/partners/jardim-sonoro.png', 'Jardim Sonoro')
    const partSeaShepherd = await uploadImage('images/partners/sea-shepherd.png', 'Sea Shepherd Portugal')

    const blogImage = await uploadImage('images/blog/latest-post.jpeg', 'Latest blog post image')

    // 4. Create Team Members
    console.log('Creating team members...')
    const teamData = [
      { name: 'D\u00e9bora S\u00e1', role: 'Founder & CEO', photo: teamDebora?.id, order: 1, isFounder: true, socialLinks: { instagram: 'https://instagram.com/deboralexsa', linkedin: 'https://linkedin.com/in/deboralexsa' } },
      { name: 'Pedro Oliven\u00e7a', role: 'ECO (Earth Conscious Officer)', photo: teamPedroO?.id, order: 2, isFounder: false, socialLinks: { instagram: 'https://instagram.com/pedroolivenca', linkedin: 'https://linkedin.com/in/pedroolivenca' } },
      { name: 'Fernando Amaral', role: 'Strategic Adviser', photo: teamFernando?.id, order: 3, isFounder: false, socialLinks: { linkedin: 'https://linkedin.com/in/fernandoamaral' } },
      { name: 'Filipe S\u00e1', role: 'CSE (Chief Software Engineer)', photo: teamFilipe?.id, order: 4, isFounder: false, socialLinks: { linkedin: 'https://linkedin.com/in/filipesa' } },
      { name: 'Gustavo Schmidt', role: 'HADS', photo: teamGustavo?.id, order: 5, isFounder: false, socialLinks: {} },
      { name: 'Pedro de Freitas', role: 'EMP (Executive Mission Partner)', photo: teamPedroF?.id, order: 6, isFounder: false, socialLinks: {} },
      { name: 'Edgar Antunes', role: 'Planet Designer', photo: teamEdgar?.id, order: 7, isFounder: false, socialLinks: {} },
      { name: 'Marta Iva', role: 'Volunteer Manager', photo: teamMarta?.id, order: 8, isFounder: false, socialLinks: {} },
    ]

    for (const member of teamData) {
      await payload.create({ collection: 'team-members', data: member as any })
    }

    // 5. Create Partners
    console.log('Creating partners...')
    const partnersData: any[] = [
      { name: 'OmoOceans', logo: partOmoceans?.id, url: 'https://omoceans.com', tier: 'community', order: 1 },
      { name: 'Studio51', logo: partStudio51?.id, tier: 'community', order: 2 },
      { name: 'Brigada do Mar', logo: partBrigada?.id, url: 'https://brigadadomar.org', tier: 'community', order: 3 },
      { name: 'The Trash Traveler', logo: partTrash?.id, tier: 'community', order: 4 },
      { name: 'Jardim Sonoro', logo: partJardim?.id, tier: 'community', order: 5 },
      { name: 'Sea Shepherd Portugal', logo: partSeaShepherd?.id, url: 'https://seashepherd.org', tier: 'community', order: 6 },
    ]
    if (partBrands4) partnersData.push({ name: 'Partner', logo: partBrands4.id, tier: 'community', order: 7 })
    if (partBrands1) partnersData.push({ name: 'Partner 2', logo: partBrands1.id, tier: 'community', order: 8 })

    for (const partner of partnersData) {
      await payload.create({ collection: 'partners', data: partner })
    }

    // 6. Create Activity Categories
    console.log('Creating activity categories...')
    const categories = [
      { title: 'Beach Cleanups', slug: 'beach-cleanups', description: 'Preserving our beaches, protecting marine life.', icon: actBeach?.id, image: actBeach?.id, order: 1 },
      { title: 'Forest Cleanups', slug: 'forest-cleanups', description: 'Defend the woods: clearing paths, protecting wildlife.', icon: heroTeamwork?.id, image: heroTeamwork?.id, order: 2 },
      { title: 'Urban Cleanups', slug: 'urban-cleanups', description: 'Clearing the streets, one cigarette at a time.', icon: heroCommunity?.id, image: heroCommunity?.id, order: 3 },
      { title: 'Reforestation', slug: 'reforestation', description: 'Planting the future: growing forests, restoring life.', icon: heroTeamwork?.id, image: heroTeamwork?.id, order: 4 },
      { title: 'Illegal Dumping', slug: 'illegal-dumping', description: 'Take back our land: cleaning up, one illegal dump at a time.', icon: actSimultaneous?.id, image: actSimultaneous?.id, order: 5 },
      { title: 'Removal of Invasive Plants', slug: 'invasive-removal', description: 'Rescuing nature\'s balance for a healthier ecosystem.', icon: heroTeamwork?.id, image: heroTeamwork?.id, order: 6 },
    ]

    for (const cat of categories) {
      await payload.create({ collection: 'activity-categories', data: cat as any })
    }

    // 7. Create Featured Projects
    console.log('Creating projects...')
    const projects = [
      {
        title: 'Underwater Caretakers',
        slug: 'underwater-caretakers',
        subtitle: 'Working as one to save our oceans',
        description: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', text: 'The project operates with a well-coordinated system involving experienced divers, local fishermen, surfers, and land volunteers to manage and process marine waste effectively. We host educational workshops and activities that raise awareness about marine pollution and inspire participants to become advocates for ocean conservation.' }] }, { type: 'paragraph', children: [{ type: 'text', text: 'By engaging the public, the Underwater Caretakers project not only benefits the environment but also strengthens community involvement and corporate social responsibility.' }] }] } },
        featuredImage: actUnderwater?.id,
        isFeatured: true,
        order: 1,
        stats: [{ label: 'Editions', value: '2' }, { label: 'Divers', value: '50+' }],
      },
      {
        title: 'Simultaneous Cleanups',
        slug: 'simultaneous-cleanups',
        subtitle: 'Overcoming geographical barriers for a common cause',
        description: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', text: 'This project unites countries across the world on the same day, same time, fostering global collaboration for a shared cause \u2013 environmental stewardship. Our aim is to involve diverse communities, raising awareness about environmental issues, and inspiring lasting change.' }] }, { type: 'paragraph', children: [{ type: 'text', text: 'By inviting NGOs, volunteers, and environmentalists from various nations we showcase the power of collective action and emphasize that environmental challenges know no borders.' }] }] } },
        featuredImage: actSimultaneous?.id,
        isFeatured: true,
        order: 2,
        stats: [{ label: 'Countries', value: '8' }, { label: 'Cleanups', value: '300+' }],
      },
      {
        title: 'Water Bottles Concept',
        slug: 'water-bottles-concept',
        subtitle: 'Turning the tide on single-use plastic water bottles',
        description: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', text: 'Tragically, discarded single-use plastic bottles often find their way into rivers and oceans, where they stubbornly persist for approximately 400 years, breaking down into toxic micro-plastics.' }] }, { type: 'paragraph', children: [{ type: 'text', text: 'We identified a crucial battleground for change: events! Whether it be playful gatherings, sports spectacles, or vibrant music festivals, the problem of single-use plastic water bottles remains prevalent. By ingeniously transforming disposable waste into captivating art, we are aiming to send a resounding message of awareness against single-use plastics and the pressing need for reuse.' }] }] } },
        featuredImage: actBottles?.id,
        isFeatured: true,
        order: 3,
      },
    ]

    for (const project of projects) {
      await payload.create({ collection: 'projects', data: project as any })
    }

    // 8. Create Volunteer Leaders
    console.log('Creating volunteer leaders...')
    const volunteers = [
      { name: 'Ana Brites', location: 'Ericeira', country: 'Portugal', region: 'portugal', order: 1, contact: { instagram: 'https://instagram.com/anabrites' } },
      { name: 'B\u00e1rbara Cam\u00f5es', location: 'Cascais', country: 'Portugal', region: 'portugal', order: 2, contact: { instagram: 'https://instagram.com/barbaracamoes' } },
      { name: 'Andreia', location: 'Sintra', country: 'Portugal', region: 'portugal', order: 3, contact: { instagram: 'https://instagram.com/andreia' } },
      { name: 'Diana Tavares', location: 'Almada', country: 'Portugal', region: 'portugal', order: 4, contact: { instagram: 'https://instagram.com/dianatavares', email: 'diana@planetcaretakers.org' } },
      { name: 'Diogo Amaral', location: 'Figueira da Foz', country: 'Portugal', region: 'portugal', photo: volDiogo?.id, order: 5, contact: { instagram: 'https://instagram.com/xibanga79', email: 'diogo@planetcaretakers.org' } },
      { name: 'Filipa Marques', location: 'Oeiras', country: 'Portugal', region: 'portugal', order: 6, contact: { instagram: 'https://instagram.com/filipamarques' } },
      { name: 'Katia', location: 'Meco', country: 'Portugal', region: 'portugal', order: 7, contact: { instagram: 'https://instagram.com/katia' } },
      { name: 'Kristine', location: 'Fonte da Telha', country: 'Portugal', region: 'portugal', order: 8, contact: { instagram: 'https://instagram.com/kristine' } },
      { name: 'Maria Gabriela', location: 'Ericeira', country: 'Portugal', region: 'portugal', order: 9, contact: { instagram: 'https://instagram.com/mariagabriela' } },
      { name: 'Marta Iva', location: 'Monte da Caparica', country: 'Portugal', region: 'portugal', photo: teamMarta?.id, order: 10, contact: { email: 'marta@planetcaretakers.org' } },
      { name: 'Pedro Trevidic', location: 'Set\u00fabal', country: 'Portugal', region: 'portugal', order: 11, contact: { instagram: 'https://instagram.com/pedrotrevidic' } },
      { name: 'Rita Martins', location: 'Lisboa', country: 'Portugal', region: 'portugal', order: 12, contact: { instagram: 'https://instagram.com/ritamartins' } },
      { name: 'T\u00e2nia Garfinho', location: 'Trafaria', country: 'Portugal', region: 'portugal', photo: volTania?.id, order: 13, contact: { email: 'tania@planetcaretakers.org' } },
      { name: 'Maddie Howarth', location: 'United Kingdom', country: 'United Kingdom', region: 'worldwide', photo: volMaddie?.id, order: 1, contact: { instagram: 'https://instagram.com/maddiejhowarth' } },
      { name: 'Pike', location: 'Malawi', country: 'Malawi', region: 'worldwide', order: 2, contact: { instagram: 'https://instagram.com/pike' } },
      { name: 'Modou', location: 'Gambia', country: 'Gambia', region: 'worldwide', order: 3, contact: { instagram: 'https://instagram.com/modou' } },
      { name: 'Himal', location: 'Nepal', country: 'Nepal', region: 'worldwide', order: 4, contact: { instagram: 'https://instagram.com/himal' } },
    ]

    for (const vol of volunteers) {
      await payload.create({ collection: 'volunteer-leaders', data: vol as any })
    }

    // 9. Create sample blog post
    console.log('Creating sample blog post...')
    if (blogImage) {
      await payload.create({
        collection: 'blog-posts',
        data: {
          title: '2nd Edition of Underwater Caretakers - A Huge Success',
          slug: 'underwater-caretakers-2nd-edition',
          featuredImage: blogImage.id,
          excerpt: 'Our second Underwater Caretakers event brought together divers, fishermen, surfers, and land volunteers for an incredible day of ocean cleanup.',
          content: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', text: 'The second edition of Underwater Caretakers was a resounding success, bringing together our largest team yet for an underwater and coastal cleanup operation. Experienced divers worked alongside local fishermen, surfers, and land volunteers in a coordinated effort to remove debris from the ocean floor and coastline.' }] }, { type: 'paragraph', children: [{ type: 'text', text: 'Together, we removed over 200kg of waste including fishing nets, plastic bottles, tires, and other debris that threatened marine life. This event demonstrates the power of community collaboration in protecting our oceans.' }] }] } },
          categories: ['news', 'events'],
          publishedDate: new Date().toISOString(),
          _status: 'published',
        } as any,
      })
    }

    // 10. Update Globals
    console.log('Updating Home Page global...')
    await payload.updateGlobal({
      slug: 'home-page',
      data: {
        hero: {
          tagline: 'Every. Action. Counts.',
          subtitle: 'Real Change Starts With Small Actions. Together, we clean, protect, and inspire.',
          backgroundImage: heroLanding?.id || null,
          primaryCta: { label: 'Become a Volunteer', url: '/contact' },
          secondaryCta: { label: 'Become a Partner', url: '/partners' },
        },
        impactStats: [
          { value: '1000', label: 'Volunteers', suffix: '+' },
          { value: '44', label: 'Tons of Garbage', suffix: '' },
          { value: '8', label: 'Countries Worldwide', suffix: '+' },
          { value: '300', label: 'Cleaning Actions', suffix: '+' },
        ],
        whatWeDo: {
          heading: 'What is Planet Caretakers about?',
          description: 'Planet Caretakers is a global nonprofit born in Portugal in 2021, committed to protecting nature through community cleanups, education, and international collaboration. We remove waste from beaches, forests, rivers and cities \u2014 but more than that, we raise awareness and empower people and companies to take climate action. Because caring for the planet is everyone\u2019s responsibility.',
          image: heroSaveWorld?.id || null,
        },
        priorities: [
          { title: 'Educate & Empower', description: 'We teach people how to care for the planet \u2014 and give them tools to act.' },
          { title: 'Restore Nature', description: 'From cleanups to reforestation, we help ecosystems heal.' },
          { title: 'Join Forces', description: 'We team up with NGOs, businesses, and governments to go further, faster.' },
          { title: 'Think Global', description: 'We inspire worldwide responsibility \u2014 because Earth belongs to all of us.' },
          { title: 'Act for the Future', description: 'Our work is built for impact that lasts. No shortcuts, just solutions.' },
          { title: 'Be Creative', description: 'We rethink waste. We reuse. We turn trash into powerful messages.' },
          { title: 'Mobilize People', description: 'We build a network of changemakers ready to act \u2014 locally and globally.' },
        ],
        partnershipSection: {
          heading: 'Why become a partner?',
          volunteerHeading: 'Why become a Caretaker?',
          benefits: [
            { title: 'Lead Visible Change', description: 'Your organization becomes part of the solution \u2014 leading visible change in ecosystems and communities.' },
            { title: 'Purpose-Driven Brand', description: 'Partnership brings purpose to your brand, connecting it to tangible environmental restoration and social engagement.' },
            { title: 'Amplify Your Reach', description: 'Together, we amplify reach, share knowledge, and create sustainable pathways for future generations.' },
            { title: 'Invest in the Planet', description: 'You invest in the planet\u2019s well-being \u2014 and inspire others to do the same.' },
          ],
        },
        eventsSection: { heading: 'Planet Caretakers Events' },
        newsSection: { heading: 'Latest News & Article', maxPostsToShow: 3 },
        contactCta: { heading: 'Get In Touch', description: 'Ready to make a difference? Join our community of planet caretakers.', showForm: true },
      } as any,
    })

    console.log('Updating About Page global...')
    await payload.updateGlobal({
      slug: 'about-page',
      data: {
        hero: {
          heading: 'Planet Caretakers',
          subtitle: 'Protecting our planet begins with small actions that inspire global change.',
          backgroundImage: heroCommunity?.id || null,
        },
        founderStory: {
          heading: 'The Birth of Planet Caretakers',
          content: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', text: 'D\u00e9bora S\u00e1, a Network Management Technician and Yoga Instructor based in Costa da Caparica, discovered her environmental calling through childhood involvement with the Portuguese Scouts, where she learned the importance of respecting the environment.' }] }, { type: 'paragraph', children: [{ type: 'text', text: 'Her journey to founding the organization developed gradually rather than through a single pivotal moment. In early 2020, a planned three-month Brazil trip extended to six months due to COVID-19. During this period, she helped a poor community on Itaparica Island, mobilizing Portuguese friends to fundraise for basic necessities. This experience demonstrated the power of collective action and planted the seeds for Planet Caretakers.' }] }, { type: 'paragraph', children: [{ type: 'text', text: 'Upon returning to Portugal, D\u00e9bora organized a cleanup at Fonte da Telha. Despite modest initial turnout, she expanded recruitment for subsequent events. This momentum led to creating Planet Caretakers as a platform for environmentally passionate individuals. The initiative grew substantially, forming 25 active teams conducting 300 cleanups that removed 44 tons of waste over three years.' }] }, { type: 'paragraph', children: [{ type: 'text', text: 'Planet Caretakers aims to build a global network of environmental stewards, inspiring individuals to take action in preserving the planet.' }] }] } },
          founderImage: deboraFounder?.id || null,
          founderName: 'D\u00e9bora S\u00e1',
          founderTitle: 'Founder & CEO',
        },
        vision: {
          heading: 'A Sustainable Future',
          content: 'We envision a future where communities unite in collective action, driven by environmental responsibility. Our goal is to establish a global caretaker network actively engaged in environmental solutions, focusing on ecosystem restoration, pollution reduction, and cultivating respect for nature worldwide.',
          image: heroTeamwork?.id || null,
        },
        priorityAreas: [
          { title: 'Community Education', description: 'Empower individuals and communities through education and hands-on involvement, promoting sustainable practices and environmental awareness.' },
          { title: 'Ecosystem Restoration', description: 'Target natural ecosystem restoration and protection via cleanups, invasive species removal, and reforestation.' },
          { title: 'Institutional Engagement', description: 'Build partnerships with NGOs, businesses, and governments to amplify conservation impact and share best practices.' },
          { title: 'Awareness Cleanups', description: 'Organize cleanups at beaches, forests, rivers, and vital ecosystems to reduce human environmental footprint.' },
        ],
        teamSection: { heading: 'Our Team', description: 'Meet the passionate people behind Planet Caretakers.' },
      } as any,
    })

    console.log('Updating Activities Page global...')
    await payload.updateGlobal({
      slug: 'activities-page',
      data: {
        hero: { heading: 'Activities', subtitle: 'Planet Caretakers promotes and participates on a diverse range of activities.', backgroundImage: actBeach?.id || null },
        featuredProjectsSection: { heading: 'Featured Projects', description: 'Our flagship initiatives making the biggest impact.' },
        categoriesSection: { heading: 'What We Do', description: 'Explore our different types of environmental activities.' },
        eventsSection: { heading: 'Upcoming Events' },
      } as any,
    })

    console.log('Updating Volunteers Page global...')
    await payload.updateGlobal({
      slug: 'volunteers-page',
      data: {
        hero: { heading: 'Our Team', subtitle: "Choosing eco-friendly isn't just a choice; it's a commitment to a brighter, greener tomorrow.", backgroundImage: heroTeamwork?.id || null },
        portugalSection: { heading: 'Portugal Team Leaders' },
        worldwideSection: { heading: 'Worldwide Leaders' },
        recruitmentCta: { heading: 'Want to get involved?', description: 'Together, we can turn awareness into action \u2014 starting right now.', button: { label: 'Become a Volunteer', url: '/contact' } },
      } as any,
    })

    console.log('Updating Partners Page global...')
    await payload.updateGlobal({
      slug: 'partners-page',
      data: {
        hero: { heading: 'Causes', subtitle: "Choosing eco-friendly isn't just a choice; it's a commitment to a brighter, greener tomorrow.", backgroundImage: heroSaveWorld?.id || null },
        partnershipPitch: { heading: "Let's Take Action", content: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', text: 'Speak up and take action for nature, for a sustainable future. Be the brand that acts \u2014 not just talks. Join us in restoring the planet.' }] }] } } },
        benefits: [
          { title: 'Restore Nature', description: 'Healing the Earth begins with one seed, one tree, one act of care.' },
          { title: 'Unite The Society', description: 'Partnership is how we turn social responsibility into shared regeneration.' },
          { title: 'Make Big Impact', description: "The planet needs bold moves \u2014 not small steps. Let's make impact count." },
        ],
        cta: { heading: 'When we act together, help becomes healing.', description: 'Every effort \u2014 big or small \u2014 creates ripples of change.', buttonLabel: "Let's Go!", buttonUrl: '/contact' },
      } as any,
    })

    console.log('Updating Contact Page global...')
    await payload.updateGlobal({
      slug: 'contact-page',
      data: {
        hero: { heading: 'Get in touch', subtitle: 'Want to become a volunteer or looking for a partnership?' },
        contactInfo: { address: 'Sobreda, Portugal', email: 'info@planetcaretakers.org', phone: '+351 960 238 484', officeHours: 'Mon-Fri: 09am-07pm\nSat-Sun: Closed' },
      } as any,
    })

    console.log('Updating Site Settings...')
    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        siteName: 'Planet Caretakers',
        logo: logo?.id || null,
        logoLight: logo?.id || null,
        defaultSeo: { title: 'Planet Caretakers - Every Action Counts', description: 'Planet Caretakers is a nonprofit organization dedicated to environmental cleanups and conservation worldwide.' },
        donationInfo: { nif: '516305280', description: 'Consign your IRS to Planet Caretakers' },
        whatsappWidget: { enabled: true, phoneNumber: '+351960238484', message: 'Hello! I would like to know more about Planet Caretakers.' },
        socialLinks: { instagram: 'https://instagram.com/planetcaretakers', facebook: 'https://facebook.com/planetcaretakers', linkedin: 'https://linkedin.com/company/planetcaretakers', youtube: 'https://youtube.com/@planetcaretakerss' },
      } as any,
    })

    console.log('Updating Navigation...')
    await payload.updateGlobal({
      slug: 'navigation',
      data: {
        headerLinks: [
          { label: 'Home', url: '/' },
          { label: 'About Us', url: '/about' },
          { label: 'Activities', url: '/activities' },
          { label: 'Volunteers', url: '/volunteers' },
          { label: 'Partners', url: '/partners' },
          { label: 'Contact', url: '/contact' },
        ],
        footerLinks: [
          { columnTitle: 'Quick Links', links: [{ label: 'Home', url: '/' }, { label: 'About Us', url: '/about' }, { label: 'Activities', url: '/activities' }, { label: 'Blog', url: '/blog' }] },
          { columnTitle: 'Get Involved', links: [{ label: 'Become a Volunteer', url: '/contact' }, { label: 'Corporate Partners', url: '/partners' }, { label: 'Upcoming Events', url: '/activities' }] },
        ],
        ctaButton: { label: 'Get Involved', url: '/contact' },
      } as any,
    })

    console.log('\u2705 Seeding complete!')
    return NextResponse.json({ success: true, message: 'Seeding complete!' })
  } catch (error) {
    console.error('\u274c Seed failed:', error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
