type Tier = {
  amount: number
  currency: string
  label: string
  description: string
}

export function DonationTiers({ tiers }: { tiers: Tier[] }) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-brand-teal-dark text-center mb-4">
          Your Impact
        </h2>
        <p className="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Every contribution makes a real difference. See what your donation can achieve.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.amount}
              className="group rounded-2xl bg-white border border-gray-200 p-8 text-center transition-all duration-300 hover:shadow-xl hover:border-brand-teal hover:-translate-y-1"
            >
              <div className="mb-4">
                <span className="text-lg font-medium text-brand-teal">{tier.currency}</span>
                <span className="text-5xl font-extrabold text-brand-teal-dark">{tier.amount}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{tier.label}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{tier.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
