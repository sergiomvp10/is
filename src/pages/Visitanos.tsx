import { MapPin, Clock, Star, Camera } from 'lucide-react'
import { ScrollReveal, WHATSAPP_LINK, testimonials } from '../shared'
import { useSeo } from '../seo'

const CONTACT_LINKS = [
  { label: 'WhatsApp', href: WHATSAPP_LINK, path: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' },
  { label: 'Llamar', href: 'tel:+573186823290', path: 'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z' },
  { label: 'Instagram', href: 'https://www.instagram.com/isphone_sas', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
  { label: 'Facebook', href: 'https://www.facebook.com/share/1LQ2kyQA8z/?mibextid=wwXIfr', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
]

// TODO: reemplazar por la dirección exacta y las fotos reales de la sede.
const ADDRESS = 'Ramiriquí, Boyacá'
const HOURS = 'Lunes a sábado'
const PHOTOS = [1, 2, 3, 4, 5, 6]
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Lo que dicen nuestros clientes</h2>
            <a
              href={GOOGLE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start sm:self-auto inline-flex items-center gap-2 rounded-full border border-gray-200 hover:border-purple-300 bg-white px-5 py-2 text-sm font-medium text-gray-900 transition-colors"
            >
              <Star className="w-4 h-4 text-amber-400 fill-current" /> Ver reseñas en Google
            </a>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {testimonials.map(t => (
              <div key={t.name} className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5">
                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">“{t.text}”</p>
                <p className="mt-4 text-sm font-semibold text-gray-900">{t.name} <span className="font-normal text-gray-500">· {t.city}</span></p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Contacto */}
        <ScrollReveal className="mt-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Contáctanos</h2>
          <div className="mt-6 flex justify-center items-center gap-8 text-gray-900">
            {CONTACT_LINKS.map(c => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={c.label}
                className="w-10 h-10 flex items-center justify-center hover:text-purple-700 transition-colors"
              >
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d={c.path} /></svg>
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
