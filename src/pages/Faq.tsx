import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ScrollReveal, faqs, serviceCities, townPath } from '../shared'
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
    <>
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

      {/* Texto SEO + cobertura */}
      <section className="py-8 lg:py-10 bg-gray-50">
        <details className="group max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <summary className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 cursor-pointer list-none">
            <h2 className="text-base sm:text-lg font-semibold text-gray-700">
              Tienda de tecnología Apple y Android en Tunja, Boyacá y Bogotá
            </h2>
            <span className="inline-flex items-center gap-1 shrink-0 text-sm font-medium text-purple-700">
              <span className="group-open:hidden">Ver más</span>
              <span className="hidden group-open:inline">Ver menos</span>
              <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
            </span>
          </summary>
        <div className="grid lg:grid-cols-5 gap-10 mt-6">
          <ScrollReveal className="lg:col-span-3">
            <div className="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
              <p>
                En iSphone vendemos <Link to="/categoria/iphone" className="text-purple-700 font-medium hover:underline">iPhone</Link>,{' '}
                <Link to="/categoria/android" className="text-purple-700 font-medium hover:underline">celulares Samsung y Android</Link>, iPad, MacBook,
                computadores portátiles y <Link to="/categoria/accesorios" className="text-purple-700 font-medium hover:underline">accesorios</Link>,
                nuevos y de exhibición, siempre con garantía y con el precio en pesos colombianos visible por capacidad y color.
              </p>
              <p>
                Un equipo de exhibición es un dispositivo 100% original que estuvo en vitrina: prácticamente nuevo, revisado por nuestros técnicos
                y a un precio menor que uno sellado. Es la alternativa inteligente a comprar un celular de segunda.
              </p>
              <p>
                Además ofrecemos <Link to="/trade-in" className="text-purple-700 font-medium hover:underline">Trade-In</Link> (tu equipo usado como parte de pago),{' '}
                <Link to="/reparaciones" className="text-purple-700 font-medium hover:underline">servicio técnico</Link> para iPhone, iPad, Laptop, Apple Watch y Android, y{' '}
                <Link to="/envios" className="text-purple-700 font-medium hover:underline">envíos con pago contra entrega</Link>.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="lg:col-span-2">
            <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 h-full">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Dónde atendemos</h3>
              <ul className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                {serviceCities.map(c => (
                  <li key={c} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-600" />{townPath(c) ? <Link to={townPath(c)!} className="hover:text-purple-700">{c}</Link> : c}</li>
                ))}
              </ul>
              <p className="text-xs text-gray-500 mt-4">Y envíos a todo Boyacá y Colombia.</p>
            </div>
          </ScrollReveal>
        </div>
        </details>
      </section>
    </>
  )
}
