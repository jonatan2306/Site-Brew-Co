import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "À propos — Brew & Co",
  description: "L'histoire de Sarah Mitchell et Kofi Mensah, les fondateurs de Brew & Co, café de spécialité à Shoreditch depuis 2018.",
};

const timeline = [
  { year: '2016', event: 'Sarah et Kofi se rencontrent au London Coffee Festival, Tobacco Dock. Ils repartent avec une idée et un numéro de téléphone.' },
  { year: '2017', event: 'Signature du bail au 47 Redchurch Street, dans une ancienne quincaillerie. Huit mois de travaux : chêne massif récupéré, carreaux portugais ramenés d\'un voyage à Porto.' },
  { year: '2018', event: 'Ouverture de Brew & Co le 14 mars. Quatre-vingt couverts, une machine à espresso, et une file d\'attente dès le premier jour.' },
  { year: '2019', event: '"Meilleur café indépendant" décerné par Time Out London. L\'équipe grandit à sept personnes.' },
  { year: '2020', event: 'Survie au confinement grâce à un abonnement de grains lancé en 72 heures. 340 abonnés en deux semaines.' },
  { year: '2022', event: 'Expansion : salle de dégustation privée ajoutée à l\'arrière. Les séances de tasting du samedi matin commencent.' },
  { year: '2024', event: 'Le café natural de Kofi, issu de la région Volta au Ghana, remporte le Prix Meilleure Origine Africaine aux UK Coffee Awards.' },
];

const values = [
  {
    title: 'Qualité sans compromis',
    body: 'Chaque grain est sélectionné, chaque tasse est préparée à la commande. Nous ne faisons pas de compromis sur l\'essentiel — même quand ça ralentit le service.',
  },
  {
    title: 'La communauté d\'abord',
    body: 'Brew & Co est un lieu de vie avant d\'être un commerce. L\'Open Mic du vendredi est gratuit. Personne ne vous pressera jamais de partir.',
  },
  {
    title: 'Durabilité sérieuse',
    body: 'Commerce équitable certifié, emballages compostables, relations directes avec les producteurs. Pas de greenwashing — juste des décisions cohérentes.',
  },
];

const founders = [
  {
    name: 'Sarah Mitchell',
    role: 'Co-fondatrice · Barista en chef',
    imageSrc: '/images/pexels-1239291.webp',
    imagePosition: 'object-[50%_20%]',
    bio1: 'Née à Bristol en 1986, Sarah a grandi dans la boulangerie familiale "Mitchell\'s of Clifton". Après une formation à Melbourne (St Ali, Market Lane Coffee, 2010–2013), elle rejoint Monmouth Coffee à Londres, puis se perfectionne auprès du champion du monde de barista Tim Wendelboe à Oslo en 2015.',
    bio2: 'C\'est elle qui définit les recettes, forme l\'équipe, et choisit les assemblages qui composent notre carte. Son obsession ? La constance dans la tasse.',
  },
  {
    name: 'Kofi Mensah',
    role: 'Co-fondateur · Sourcing & Relations producteurs',
    imageSrc: '/images/pexels-2379005.webp',
    imagePosition: 'object-[50%_20%]',
    bio1: 'Né à Accra en 1984, Kofi arrive à Londres à 12 ans. Après des études d\'économie à King\'s College London, il se lance dans l\'importation de café de spécialité depuis une arche de chemin de fer à Bermondsey.',
    bio2: 'Ses relations directes avec les producteurs d\'Éthiopie (Yirgacheffe, Guji) et du Ghana (région Volta) garantissent la traçabilité totale de chaque grain que nous servons.',
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-96 flex items-center justify-center overflow-hidden">
        <Image
          src="/images/pexels-851555.webp"
          alt="Intérieur de Brew & Co, Shoreditch"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[var(--color-espresso)]/65" />
        <div className="relative z-10 text-center container-site">
          <p className="eyebrow text-[var(--color-honey)] mb-4">Notre histoire</p>
          <h1
            className="text-5xl md:text-6xl font-bold text-[var(--color-cream)]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            À propos de Brew & Co
          </h1>
        </div>
      </section>

      {/* Pull quote + intro */}
      <section className="section-padding bg-[var(--color-snow)]">
        <div className="container-site max-w-3xl mx-auto text-center">
          <div className="relative mb-12">
            <span
              className="absolute -top-8 left-1/2 -translate-x-1/2 text-8xl text-[var(--color-caramel)]/20 leading-none select-none"
              style={{ fontFamily: 'var(--font-display)' }}
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <blockquote
              className="text-2xl md:text-3xl font-light text-[var(--color-espresso)] leading-relaxed relative z-10"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Un bon café peut changer une journée. Pas besoin de rituels
              compliqués. Juste des grains traçables, un barista attentif,
              et un espace où vous pouvez souffler.
            </blockquote>
          </div>
          <div className="w-12 h-px bg-[var(--color-caramel)] mx-auto mb-8" />
          <p className="eyebrow mb-3">Shoreditch, depuis 2018</p>
          <p className="text-[var(--color-text-muted)] leading-relaxed">
            Depuis le 14 mars 2018, nous occupons l&apos;ancienne quincaillerie du 47 Redchurch Street.
            Les poutres en chêne massif sont d&apos;origine. Les carreaux portugais, on les a ramenés
            d&apos;un voyage à Porto. La machine à espresso, on a mis deux ans à la choisir.
          </p>
        </div>
      </section>

      {/* Founders — layout alterné */}
      <section className="section-padding bg-[var(--color-latte)]" aria-labelledby="founders-title">
        <div className="container-site">
          <div className="text-center mb-16">
            <p className="eyebrow mb-3">Les visages derrière les tasses</p>
            <h2
              id="founders-title"
              className="text-4xl md:text-5xl font-light text-[var(--color-espresso)]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Les fondateurs
            </h2>
          </div>

          <div className="space-y-20 max-w-5xl mx-auto">
            {founders.map((founder, index) => (
              <div
                key={founder.name}
                className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center ${
                  index % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
                }`}
              >
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={founder.imageSrc}
                    alt={founder.name}
                    fill
                    className={`object-cover ${founder.imagePosition}`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div>
                  <h3
                    className="text-3xl font-bold text-[var(--color-espresso)] mb-1"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {founder.name}
                  </h3>
                  <p className="eyebrow text-[var(--color-caramel)] mb-5">{founder.role}</p>
                  <div className="w-10 h-0.5 bg-[var(--color-caramel)] mb-6" />
                  <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">{founder.bio1}</p>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">{founder.bio2}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-[var(--color-espresso)]" aria-labelledby="timeline-title">
        <div className="container-site max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="eyebrow text-[var(--color-honey)] mb-3">Notre parcours</p>
            <h2
              id="timeline-title"
              className="text-4xl font-light text-[var(--color-cream)]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              De 2016 à aujourd&apos;hui
            </h2>
          </div>

          <div className="space-y-0">
            {timeline.map((item, index) => (
              <div key={item.year} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-14 text-right pt-1">
                  <span
                    className="text-lg font-bold text-[var(--color-honey)]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {item.year}
                  </span>
                </div>
                <div className="relative flex-shrink-0 flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-[var(--color-caramel)] ring-4 ring-[var(--color-caramel)]/20 mt-1 flex-shrink-0" />
                  {index < timeline.length - 1 && (
                    <div className="w-px flex-1 bg-[var(--color-roast)] mt-1 min-h-[3rem]" />
                  )}
                </div>
                <p className="text-[var(--color-almond)] leading-relaxed pt-0.5 pb-8">
                  {item.event}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values + CTA */}
      <section className="section-padding bg-[var(--color-snow)]">
        <div className="container-site">
          <div className="text-center mb-16">
            <p className="eyebrow mb-3">Ce en quoi nous croyons</p>
            <h2
              className="text-4xl md:text-5xl font-light text-[var(--color-espresso)]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Nos valeurs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
            {values.map(value => (
              <div key={value.title} className="bg-white rounded-2xl p-8 border border-[var(--color-border-muted)] shadow-[var(--shadow-card)] text-center">
                <div className="w-8 h-0.5 bg-[var(--color-caramel)] mx-auto mb-5" />
                <h3
                  className="text-xl font-semibold text-[var(--color-espresso)] mb-3"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {value.title}
                </h3>
                <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
                  {value.body}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/#reservation"
              className="inline-flex items-center justify-center h-13 px-8 text-base font-semibold rounded-full bg-[var(--color-caramel)] text-white hover:bg-[var(--color-honey)] hover:text-[var(--color-espresso)] hover:shadow-[var(--shadow-glow-caramel)] transition-all duration-300"
            >
              Réserver une table
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
