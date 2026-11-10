import { ScrollReveal, WHATSAPP_LINK } from '../shared'
import { useSeo } from '../seo'

export default function TradeIn() {
  useSeo({
    title: 'Trade-In en Tunja y Boyacá: entrega tu iPhone o Samsung usado y estrena',
    description: 'Recibimos tu iPhone, Samsung o Android usado como parte de pago por un equipo nuevo o de exhibición. Valoración en 15 minutos en Tunja, Ramiriquí, Boyacá, Bogotá, Chía y Cajicá.',
    path: '/trade-in',
  })
  return (
    <section className="py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <ScrollReveal>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Trade-In:
                <span className="block gradient-text">Actualiza tu equipo</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Trae tu teléfono anterior y recibe descuento en tu nuevo equipo.
                Valoramos tu dispositivo al mejor precio del mercado. Proceso rápido y sencillo.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  'Evaluación gratuita de tu equipo actual',
                  'Descuento inmediato en tu nueva compra',
                  'Aceptamos cualquier marca y modelo',
                  'Proceso en menos de 15 minutos',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-700 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <a href={`${WHATSAPP_LINK}?text=Hola!%20Quiero%20información%20sobre%20el%20Trade-In`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-purple-700 text-white px-8 py-4 rounded-full font-semibold hover:bg-purple-800 transition-colors shadow-lg shadow-purple-700/25">
                Consultar Trade-In
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
