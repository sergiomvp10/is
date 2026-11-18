import { useState, useEffect } from 'react'
import { useParams, Link, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Smartphone } from 'lucide-react'
import { ScrollReveal, API_URL, Product, Category, productPath, fetchProducts, DEFAULT_ANDROID_BRANDS, AndroidBrand } from '../shared'
import { useSeo, SITE_URL } from '../seo'
import Breadcrumbs from '../components/Breadcrumbs'

type CategoryCopy = { title: string; description: string }

const CATEGORY_COPY: Record<string, CategoryCopy> = {
  iphone: {
    title: 'iPhone nuevos y de exhibición en Tunja y Boyacá — precio en Colombia',
    description: 'Tienda de iPhone en Tunja y Boyacá: iPhone 18, 17, 16 y 15 nuevos y de exhibición con garantía. Precios en pesos colombianos por capacidad, Trade-In y contra entrega en Bogotá, Chía y Cajicá.',
  },
  android: {
    title: 'Samsung y Android en Tunja y Boyacá — precio en Colombia',
    description: 'Samsung Galaxy S26 Ultra, S25 Ultra, A57, A37, A17 y más, nuevos y con garantía. Precio en Colombia por capacidad, Trade-In y envío contra entrega en Tunja, Boyacá, Bogotá, Chía y Cajicá.',
  },
  accesorios: {
    title: 'Accesorios Apple y celulares en Tunja y Boyacá: AirPods, cargadores, fundas',
    description: 'Accesorios originales para iPhone, iPad, Mac y Android: AirPods, cargadores, cables, fundas y protectores. Compra en Tunja, Boyacá, Bogotá, Chía y Cajicá con envío contra entrega.',
  },
}

function categoryCopy(slug: string, name: string): CategoryCopy {
  return CATEGORY_COPY[slug] ?? {
    title: `${name} nuevos y de exhibición en Tunja, Boyacá y Bogotá`,
    description: `Compra ${name} en iSphone: equipos nuevos y de exhibición con garantía, precio en Colombia y envío contra entrega en Tunja, Boyacá, Bogotá, Chía y Cajicá.`,
  }
}

function resolveImage(img: string): string {
  if (!img) return img
  if (img.startsWith('http')) return img
  if (img.startsWith('/api/')) return `${API_URL}${img}`
  return img.replace(/\.png$/i, '.webp')
}

function priceValue(p: Product): number {
  const digits = (p.priceRange || '').replace(/[^\d]/g, '')
  return digits ? parseInt(digits, 10) : 0
}

const PHONE_NAME = /^(iphone|galaxy|samsung|xiaomi|redmi|motorola|moto|poco|honor)\b/i

const TIER_RANK: [RegExp, number][] = [
  [/ultra/i, 5],
  [/pro\s*max/i, 4],
  [/pro/i, 3],
  [/plus/i, 2],
  [/\d+\s*e\b/i, 0],
]

// Serie Samsung: gama alta (S, Z) por encima de la media (A, M, F).
const SERIES_RANK: Record<string, number> = { z: 3, s: 3, a: 2, m: 1, f: 1 }

// Generación del modelo (17 Pro Max > 17 Pro > 17 > 17e > 16 ...; S26 Ultra > S26 > S25 > A57 ...).
// Solo aplica a equipos; el resto queda en 0 y se ordena por precio.
function modelRank(p: Product): number {
  const name = p.name || ''
  if (!PHONE_NAME.test(name)) return 0
  const match = name.match(/(?:\b([a-z]))?\s*(\d+)/i)
  const generation = match?.[2] ? parseInt(match[2], 10) : 0
  const series = match?.[1] ? SERIES_RANK[match[1].toLowerCase()] ?? 2 : 2
  const tier = TIER_RANK.find(([re]) => re.test(name))?.[1] ?? 1
  return series * 10000 + generation * 10 + tier
}

// Evita que dos productos del mismo modelo (misma foto) queden seguidos:
// toma siempre el siguiente que no repita el nombre anterior.
function spreadDuplicates(items: Product[]): Product[] {
  const pending = items.slice()
  const out: Product[] = []
  while (pending.length) {
    const next = pending.findIndex((p) => p.name !== out[out.length - 1]?.name)
    out.push(...pending.splice(next === -1 ? 0 : next, 1))
  }
  return out
}

export default function CategoriaDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [products, setProducts] = useState<Product[]>([])
  const [category, setCategory] = useState<Category | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [conditionFilter, setConditionFilter] = useState<'Todos' | 'Nuevo' | 'Exhibición'>('Nuevo')
  const [brands, setBrands] = useState<AndroidBrand[]>(DEFAULT_ANDROID_BRANDS)
  const [searchParams, setSearchParams] = useSearchParams()
  const isAndroid = slug === 'android'
  const brandFilter = isAndroid ? searchParams.get('marca') : null

  useEffect(() => {
    if (!isAndroid) return
    fetch(`${API_URL}/api/site-content`)
      .then(r => r.json())
      .then(data => { if (Array.isArray(data.android_brands) && data.android_brands.length) setBrands(data.android_brands) })
      .catch(() => {})
  }, [isAndroid])

  const selectBrand = (b: string) => {
    const next = new URLSearchParams(searchParams)
    if (brandFilter === b) next.delete('marca')
    else next.set('marca', b)
    setSearchParams(next, { replace: true })
  }
  const brandName = (b: string) => brands.find(x => x.slug === b)?.name ?? b

  useEffect(() => {
    Promise.all([
      fetchProducts<Product & { price_range: string }>(),
      fetch(`${API_URL}/api/categories`).then(r => r.json()),
    ])
      .then(([prods, cats]) => {
        const mapped = prods.map((p: Product & { price_range: string }) => ({
          ...p,
          priceRange: p.price_range,
          image: resolveImage(p.image),
        }))
        const ofCategory = mapped.filter((p: Product) => p.category === slug)
        setProducts(ofCategory)
        setConditionFilter(ofCategory.some((p: Product) => p.condition === 'Nuevo') ? 'Nuevo' : 'Todos')
        const cat = cats.find((c: Category) => c.slug === slug)
        setCategory(cat || null)
        setLoaded(true)
      })
      .catch(() => setLoaded(true))
  }, [slug])

  const catName = category?.name || (slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : 'Categoría')
  const copy = categoryCopy(slug ?? '', catName)
  const crumbs = [{ label: 'Inicio', to: '/' }, { label: 'Catálogo', to: '/catalogo' }, { label: catName }]
  useSeo({
    title: copy.title,
    description: copy.description,
    path: `/categoria/${slug ?? ''}`,
    image: category?.cover_image,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: c.label,
          ...(c.to ? { item: `${SITE_URL}${c.to}` } : {}),
        })),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: copy.title,
        url: `${SITE_URL}/categoria/${slug ?? ''}`,
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: products.length,
          itemListElement: products.slice(0, 30).map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: p.name,
            url: `${SITE_URL}${productPath(p)}`,
          })),
        },
      },
    ],
  })

  const brandProducts = brandFilter ? products.filter((p) => p.brand === brandFilter) : products
  const hasMixedConditions = new Set(brandProducts.map((p) => p.condition)).size > 1

  const sorted = (
    conditionFilter === 'Todos' || !hasMixedConditions
      ? brandProducts
      : brandProducts.filter((p) => p.condition === conditionFilter)
  )
    .slice()
    .sort((a, b) => modelRank(b) - modelRank(a) || priceValue(b) - priceValue(a))

  const filteredProducts = conditionFilter === 'Todos' ? spreadDuplicates(sorted) : sorted

  if (!loaded) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <img src="/images/apple-logo.webp" alt="Cargando..." className="w-16 h-16 object-contain animate-pulse-logo" />
      </div>
    )
  }

  return (
    <section className="py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={crumbs} className="mb-4" />
        {/* Category header with cover */}
        {category && (
          <ScrollReveal>
            <div className="relative rounded-3xl overflow-hidden mb-8 sm:mb-12 w-full aspect-[8/3]">
              <img
                src={resolveImage(category.header_image || category.cover_image)}
                alt={category.name}
                className="w-full h-full object-cover"
              />
              {category.header_image ? (
                <h1 className="sr-only">{category.name}</h1>
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10">
                    <Link
                      to="/catalogo"
                      className="inline-flex items-center gap-1 text-white/80 text-sm mb-3 hover:text-white transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Volver al catálogo
                    </Link>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                      {category.name}
                    </h1>
                  </div>
                </>
              )}
            </div>
          </ScrollReveal>
        )}

        {!category && (
          <div className="mb-8">
            <Link
              to="/catalogo"
              className="inline-flex items-center gap-1 text-purple-700 text-sm mb-4 hover:text-purple-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al catálogo
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Categoría no encontrada</h1>
          </div>
        )}

        {isAndroid && category && brands.length > 0 && (
          <div className="mb-8 sm:mb-12">
            <h2 className="text-center text-base sm:text-2xl font-bold tracking-wide uppercase text-gray-900 mb-5 sm:mb-8">
              Las mejores marcas están aquí
            </h2>
            <div className="overflow-hidden -mx-4 sm:mx-0">
              <div className="flex w-max animate-marquee py-2" style={{ animationDuration: `${Math.max(brands.length, 4) * 6}s` }}>
              {[0, 1, 2, 3].flatMap((copy) => brands.map((b) => (
                <button
                  key={`${copy}-${b.slug}`}
                  type="button"
                  onClick={() => selectBrand(b.slug)}
                  aria-pressed={brandFilter === b.slug}
                  aria-hidden={copy > 0 || undefined}
                  tabIndex={copy > 0 ? -1 : undefined}
                  className={`shrink-0 mr-3 sm:mr-5 w-36 sm:w-56 aspect-square rounded-2xl bg-white shadow-sm border-2 flex items-center justify-center overflow-hidden transition-all hover:shadow-md ${
                    brandFilter === b.slug ? 'border-purple-600' : 'border-transparent'
                  }`}
                >
                  {b.logo ? (
                    <img src={b.logo} alt={b.name} className="w-full h-full object-contain" loading="lazy" />
                  ) : (
                    <span className="text-xl sm:text-3xl font-extrabold tracking-widest uppercase text-gray-900">{b.name}</span>
                  )}
                </button>
              )))}
              </div>
            </div>
          </div>
        )}

        {/* Condition filter */}
        {hasMixedConditions && (
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
            {(['Todos', 'Nuevo', 'Exhibición'] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => setConditionFilter(opt)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${
                  conditionFilter === opt
                    ? 'bg-purple-700 text-white border-purple-700'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300 hover:text-purple-700'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {/* Products grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product, i) => (
              <ScrollReveal key={product.id} delay={i * 0.05}>
                <Link
                  to={productPath(product)}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover cursor-pointer block"
                >
                  <div className="relative bg-gray-50 p-5 sm:p-6 aspect-square flex items-center justify-center overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.badge && (
                      <span className="absolute top-3 left-3 bg-purple-700 text-white text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full">
                        {product.badge}
                      </span>
                    )}
                    {product.condition === 'Exhibición' && (
                      <span className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full">
                        Exhibición
                      </span>
                    )}
                    {product.condition === 'Nuevo' && (
                      <span className="absolute top-3 right-3 bg-green-600 text-white text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full">
                        Nuevo
                      </span>
                    )}
                  </div>
                  <div className="p-4 sm:p-5">
                    {product.brand !== 'apple' && (
                      <p className="text-[11px] sm:text-xs text-purple-600 font-semibold uppercase tracking-wide mb-1">
                        {brandName(product.brand)}
                      </p>
                    )}
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 group-hover:text-purple-700 transition-colors line-clamp-2 min-h-[3rem] sm:min-h-[3.5rem]">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-1">{product.storage.join(' • ')}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-700 font-bold text-sm sm:text-base">{product.priceRange}</span>
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-purple-700 transition-colors" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        ) : brandFilter && brandProducts.length === 0 ? (
          <div className="text-center py-16">
            <Smartphone className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Pronto tendremos productos {brandName(brandFilter)}</p>
            <button
              onClick={() => selectBrand(brandFilter)}
              className="inline-flex items-center gap-2 mt-4 text-purple-700 font-medium hover:text-purple-900 transition-colors"
            >
              Ver todas las marcas
            </button>
          </div>
        ) : products.length > 0 ? (
          <div className="text-center py-16">
            <Smartphone className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">
              No hay productos {conditionFilter === 'Nuevo' ? 'nuevos' : 'de exhibición'} en esta categoría
            </p>
            <button
              onClick={() => setConditionFilter('Todos')}
              className="inline-flex items-center gap-2 mt-4 text-purple-700 font-medium hover:text-purple-900 transition-colors"
            >
              Ver todos
            </button>
          </div>
        ) : (
          <div className="text-center py-16">
            <Smartphone className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No hay productos en esta categoría aún</p>
            <Link
              to="/catalogo"
              className="inline-flex items-center gap-2 mt-4 text-purple-700 font-medium hover:text-purple-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Ver todo el catálogo
            </Link>
          </div>
        )}

      </div>
    </section>
  )
}
