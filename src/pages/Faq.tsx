import { ChevronDown } from 'lucide-react'
import { ScrollReveal, faqs } from '../shared'
import { useSeo } from '../seo'

export default function Faq() {
  useSeo({
    title: 'Preguntas frecuentes | iSphone',
    description: 'Resolvemos tus dudas sobre iPhone y celulares de exhibición, garantía, precios, Trade-In, servicio técnico y envíos con pago contra entrega en Tunja, Ramiriquí y todo Boyacá.',
    path: '/faq',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  })
  return (
    <section className="py-12 lg:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 text-center">Preguntas frecuentes</h1>
        </ScrollReveal>
        <div className="divide-y divide-gray-100">
          {faqs.map((f, i) => (
            <ScrollReveal key={f.q} delay={i * 0.03}>
              <details className="group py-4">
                <summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-gray-900 text-sm sm:text-base">
                  {f.q}
                  <ChevronDown className="w-5 h-5 text-gray-400 transition-transform group-open:rotate-180 shrink-0 ml-4" />
                </summary>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-3">{f.a}</p>
              </details>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
