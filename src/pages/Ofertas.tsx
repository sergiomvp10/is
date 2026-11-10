import { useState, useEffect } from 'react'
import { ScrollReveal, WHATSAPP_LINK, API_URL } from '../shared'
import { useSeo } from '../seo'

type Offer = {
  id: number; title: string; description: string; badge?: string | null
  icon?: string | null; featured: boolean; active: boolean
}

const defaultOffers: Offer[] = [
  { id: 1, title: 'Regalo primera compra', description: 'Compras mayores a $250.000 reciben un regalo sorpresa. Válido para clientes nuevos.', icon: 'gift', featured: true, active: true },
  { id: 2, title: 'Trade-In con descuento extra', description: 'Trae tu equipo anterior y recibe un descuento adicional sobre el valor de Trade-In.', icon: 'percent', featured: false, active: true },
  { id: 3, title: 'Equipos de exhibición', description: 'Equipos como nuevos con hasta 30% de descuento. Garantía incluida en todos.', icon: 'tag', featured: false, active: true },
]

export default function Ofertas() {
  useSeo({
    title: 'Ofertas en celulares y accesorios',
    description: 'Promociones y descuentos en iPhone, Samsung, iPad y accesorios en iSphone. Ofertas vigentes con garantía y contra entrega en Tunja, Boyacá y Bogotá.',
    path: '/ofertas',
  })
  const [offers, setOffers] = useState<Offer[]>(defaultOffers)

  useEffect(() => {
    fetch(`${API_URL}/api/offers`)
      .then(r => r.json())
      .then(data => { if (data.length > 0) setOffers(data) })
      .catch(() => {})
  }, [])

  const activeOffers = offers.filter(o => o.active)
  const featured = activeOffers.find(o => o.featured)

  return (
    <section className="py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Ofertas y Promociones
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Aprovecha nuestras ofertas especiales en equipos nuevos y de exhibición
            </p>
          </div>
        </ScrollReveal>

        {/* Featured promo */}
        {featured && (
          <ScrollReveal>
            <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
              <div className="absolute inset-0">
                <div className="absolute top-10 right-10 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]" />
              </div>
              <div className="relative z-10 text-center">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                  {featured.title}
                </h2>
                <p className="text-lg text-purple-200 max-w-lg mx-auto mb-6">
                  {featured.description}
                </p>
                <a href={`${WHATSAPP_LINK}?text=Hola!%20Quiero%20aprovechar%20la%20promo%20de%20${encodeURIComponent(featured.title)}`} target="_blank" rel="noopener noreferrer"
                  className="animate-shake inline-flex items-center gap-2 bg-green-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-600 transition-colors shadow-lg">
                  Reclamar oferta
                </a>
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}
