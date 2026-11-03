import { useEffect, useState } from 'react'
import { Star, Camera, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { ScrollReveal } from '../shared'
import { useSeo } from '../seo'

// TODO: agregar las URLs de las fotos reales de la sede.
const PHOTOS: string[] = []
const PLACEHOLDER_COUNT = 5

const GOOGLE_REVIEWS = [
  { name: 'Nicol Plazas', text: 'Muy buen servicio, sus productos son de excelente calidad.' },
  { name: 'Santiago Mora', text: 'Recomendados muy serios con las entregas y excelentes productos' },
  { name: 'Vanessa Pinzon', text: 'Me encantó, llegó todo a tiempo y en perfecto estado súper recomendado para comprar sus celulares.' },
  { name: 'Andrés Quiroga', text: 'Excelente lugar, muy buenos precios, excelente calidad de sus productos y gran variedad, recomendado' },
  { name: 'Danna Noguera', text: 'Excelente atención, me ayudaron de forma amable y rápida, explicaron todo con claridad y el servicio fue muy bueno. Totalmente recomendado.' },
  { name: 'William Ricardo Medina', text: 'Gran atención calidad en sus productos y servicios.' },
  { name: 'Willmer Ricardo Mora', text: 'Exelente atención. Muy buena variedad de productos y el almacén es muy bonito' },
  { name: 'Cristian Sarmiento', text: 'Compré un iPhone hace unos años y todo perfecto y este año regresé a hacer el cambio por uno más nuevo y me recibieron el anterior en parte de pago todo súper ágil y seguro' },
]
const GOOGLE_REVIEW_COUNT = 52
const GOOGLE_PROFILE_URL = 'https://share.google/UxvAsVYdQhpDfiQ2U'
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Isphone S.A.S Ramiriquí')}`

function PhotoCarousel() {
  const count = PHOTOS.length || PLACEHOLDER_COUNT
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setIndex(i => (i + 1) % count), 4000)
    return () => window.clearInterval(id)
  }, [paused, count])

  const go = (i: number) => setIndex((i + count) % count)

  return (
    <div
      className="group relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gray-100 shadow-sm aspect-[4/3] sm:aspect-[16/10]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex h-full transition-transform duration-700 ease-out" style={{ transform: `translateX(-${index * 100}%)` }}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="w-full h-full shrink-0" aria-hidden={i !== index}>
            {PHOTOS[i] ? (
              <img src={PHOTOS[i]} alt={`Tienda iSphone en Ramiriquí, foto ${i + 1}`} className="w-full h-full object-cover" loading={i === 0 ? 'eager' : 'lazy'} />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-gray-100 to-purple-50 text-gray-300">
                <Camera className="w-10 h-10" />
                <span className="text-sm text-gray-400">Foto {i + 1}</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <button type="button" onClick={() => go(index - 1)} aria-label="Foto anterior" className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center text-gray-800 hover:scale-105 transition sm:opacity-0 sm:group-hover:opacity-100">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button type="button" onClick={() => go(index + 1)} aria-label="Foto siguiente" className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center text-gray-800 hover:scale-105 transition sm:opacity-0 sm:group-hover:opacity-100">
        <ChevronRight className="w-5 h-5" />
      </button>
      <a
        href={MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-lg bg-white/95 px-3 py-2 text-sm font-medium text-gray-900 shadow hover:bg-white"
      >
        Abrir en Maps <ExternalLink className="w-4 h-4 text-blue-600" />
      </a>
      <div className="absolute bottom-4 inset-x-0 flex justify-center gap-1.5">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => go(i)}
            aria-label={`Ver foto ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${i === index ? 'w-4 bg-white' : 'w-1.5 bg-white/60'} shadow`}
          />
        ))}
      </div>
    </div>
  )
}

export default function Visitanos() {
  useSeo({
    title: 'Visítanos | Tienda iSphone en Ramiriquí, Boyacá',
    description: 'Conoce nuestra tienda física de iPhone y celulares en Ramiriquí, Boyacá: ubicación, fotos, reseñas de clientes y contacto por WhatsApp.',
    path: '/visitanos',
  })
  return (
    <section className="py-12 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 text-center">Visítanos</h1>
          <p className="mt-3 text-center text-gray-600">Ven a conocer los equipos en persona y recibe asesoría personalizada.</p>
        </ScrollReveal>

        {/* Fotos */}
        <ScrollReveal className="mt-10">
          <PhotoCarousel />
        </ScrollReveal>

        {/* Reseñas */}
        <ScrollReveal className="mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Lo que dicen nuestros clientes</h2>
          <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
            <div className="animate-reviews flex w-max gap-4 py-1 hover:[animation-play-state:paused]">
              {[...GOOGLE_REVIEWS, ...GOOGLE_REVIEWS].map((r, i) => (
                <div key={i} aria-hidden={i >= GOOGLE_REVIEWS.length} className="w-72 shrink-0 flex flex-col rounded-2xl bg-white border border-gray-100 shadow-sm p-5">
                  <div className="flex gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="mt-3 flex-1 text-sm text-gray-600 leading-relaxed">“{r.text}”</p>
                  <p className="mt-4 text-sm font-semibold text-gray-900">{r.name} <span className="font-normal text-gray-500">· Google</span></p>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-5">
            <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-900 hover:underline underline-offset-4">
              Ver en Google ({GOOGLE_REVIEW_COUNT})
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
