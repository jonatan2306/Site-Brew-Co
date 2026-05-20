import Image from "next/image";

const events = [
  {
    day: 'Chaque vendredi',
    time: '19h00',
    title: 'Open Mic Friday',
    description: 'Scène ouverte aux musiciens du quartier. Bonne musique, meilleur café. Entrée libre, tout le monde est le bienvenu.',
    badge: 'Musique · Gratuit',
  },
  {
    day: 'Chaque samedi',
    time: '10h00',
    title: 'Dégustation de café',
    description: 'Kofi vous guide à travers 5 origines différentes. Découvrez pourquoi le terroir, l\'altitude et la fermentation changent tout.',
    badge: 'Formation · 12 £/pers.',
  },
];

export default function EventsSection() {
  return (
    <section className="relative section-padding overflow-hidden" aria-labelledby="events-title">
      <Image
        src="/images/pexels-1813466.webp"
        alt="Ambiance soirée Brew & Co"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[var(--color-espresso)]/85" />

      <div className="relative z-10 container-site">
        <div className="text-center mb-16">
          <p className="eyebrow text-[var(--color-honey)] mb-4">Ce qui nous anime</p>
          <h2
            id="events-title"
            className="text-4xl md:text-5xl font-light text-[var(--color-cream)]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Événements à venir
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {events.map(event => (
            <div
              key={event.title}
              className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-2xl p-8 hover:bg-white/12 transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="eyebrow text-[var(--color-honey)]">{event.day}</span>
                <span className="text-[var(--color-almond)]/50 text-sm">·</span>
                <span className="text-[var(--color-almond)] text-sm font-medium">{event.time}</span>
              </div>
              <h3
                className="text-2xl font-light text-[var(--color-cream)] mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {event.title}
              </h3>
              <div className="w-8 h-px bg-[var(--color-caramel)] mb-4" />
              <p className="text-[var(--color-almond)] text-sm leading-relaxed mb-6">
                {event.description}
              </p>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-[var(--color-caramel)]/15 text-[var(--color-honey)] border border-[var(--color-caramel)]/25">
                {event.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
