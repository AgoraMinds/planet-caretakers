type Benefit = {
  title: string
  description: string
  icon?: { url: string; alt?: string } | null
}

export function PartnershipBenefits({ benefits, heading = 'Why Partner With Us' }: { benefits: Benefit[]; heading?: string }) {
  if (!benefits || benefits.length === 0) return null

  return (
    <section className="py-20 bg-brand-teal-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white text-center mb-12">{heading}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => (
            <div key={i} className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
              {benefit.icon && (
                <img src={benefit.icon.url} alt={benefit.icon.alt} className="h-10 w-10 mb-4" />
              )}
              <h3 className="text-lg font-bold text-white">{benefit.title}</h3>
              <p className="mt-2 text-sm text-gray-300 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
