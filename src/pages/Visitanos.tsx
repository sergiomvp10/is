import { MapPin, Clock, Star, Camera } from 'lucide-react'
import { ScrollReveal } from '../shared'
import { useSeo } from '../seo'

// TODO: reemplazar por la dirección exacta y las fotos reales de la sede.
const ADDRESS = 'Ramiriquí, Boyacá'
const HOURS = 'Lunes a sábado'
const PHOTOS = [1, 2, 3, 4, 5, 6]

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
const GOOGLE_PROFILE_URL = 'https://share.google/UxvAsVYdQhpDfiQ2U'
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Isphone S.A.S Ramiriquí')}`

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

        {/* Sede */}
        <ScrollReveal className="mt-10 grid lg:grid-cols-5 gap-6">
          <div className="relative lg:col-span-3 overflow-hidden rounded-3xl bg-gray-100 aspect-[4/3] lg:aspect-auto lg:min-h-[360px]">
            <iframe
              title="Ubicación de iSphone"
              src={`https://www.google.com/maps?q=${encodeURIComponent('Isphone S.A.S Ramiriquí')}&output=embed`}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" aria-label="Abrir en Google Maps" className="absolute inset-0" />
          </div>
          <div className="lg:col-span-2 rounded-3xl bg-purple-50 p-6 sm:p-8 flex flex-col justify-center gap-5">
            <h2 className="text-2xl font-bold text-gray-900">Nuestra sede</h2>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-gray-700 hover:text-purple-700 underline-offset-4 hover:underline"><MapPin className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />{ADDRESS}</a>
            <p className="flex items-start gap-3 text-gray-700"><Clock className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />{HOURS}</p>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start rounded-full bg-purple-700 hover:bg-purple-800 text-white font-medium px-6 py-2.5 transition-colors"
            >
              Cómo llegar
            </a>
          </div>
        </ScrollReveal>

        {/* Fotos */}
        <ScrollReveal className="mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Fotos de la tienda</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {PHOTOS.map(n => (
              <div key={n} className="aspect-[4/3] rounded-2xl bg-gray-100 flex items-center justify-center text-gray-300">
                <Camera className="w-8 h-8" />
              </div>
            ))}
          </div>
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
          <p className="mt-5 text-center">
            <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-purple-700 hover:underline underline-offset-4">
              Ver en Google
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
