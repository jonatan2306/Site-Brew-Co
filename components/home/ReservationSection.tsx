'use client';

import { useState, useMemo, type FormEvent } from "react";

interface FormData {
  name: string;
  partySize: string;
  date: string;
  time: string;
}

const TIME_SLOTS = Array.from({ length: 28 }, (_, i) => {
  const totalMinutes = 8 * 60 + i * 30;
  const h = Math.floor(totalMinutes / 60).toString().padStart(2, '0');
  const m = (totalMinutes % 60).toString().padStart(2, '0');
  return `${h}:${m}`;
});

const hours = [
  { label: 'Lun–Ven', value: '6h00–20h00' },
  { label: 'Samedi', value: '9h00–18h00' },
  { label: 'Dimanche', value: '10h00–16h00' },
];

export default function ReservationSection() {
  const [form, setForm] = useState<FormData>({ name: '', partySize: '', date: '', time: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const today = useMemo(() => new Date().toISOString().split('T')[0], []);

  function validate(): boolean {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = 'Requis';
    if (!form.partySize) e.partySize = 'Requis';
    if (!form.date) e.date = 'Requis';
    if (!form.time) e.time = 'Requis';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  }

  const inputClass = "w-full h-11 px-4 rounded-xl border border-[var(--color-border)] focus:border-[var(--color-caramel)] focus:outline-none focus:ring-2 focus:ring-[var(--color-caramel)]/20 transition-all duration-200 text-[var(--color-text)] bg-[var(--color-snow)]";
  const labelClass = "block text-sm font-semibold text-[var(--color-espresso)] mb-1.5";

  return (
    <section id="reservation" className="section-padding bg-[var(--color-parchment)]">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">

          {/* Colonne info */}
          <div>
            <p className="eyebrow mb-4">Venez nous voir</p>
            <h2
              className="text-4xl md:text-5xl font-light text-[var(--color-espresso)] mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Réserver une table
            </h2>
            <div className="w-12 h-0.5 bg-[var(--color-caramel)] mb-8" />
            <p className="text-[var(--color-text-muted)] leading-relaxed mb-10">
              Un bon café mérite une bonne table. Réservez la vôtre et
              laissez-nous vous accueillir comme il se doit.
            </p>

            <div className="space-y-4 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--color-caramel)]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-[var(--color-caramel)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-espresso)] text-sm">Adresse</p>
                  <p className="text-[var(--color-text-muted)] text-sm">47 Redchurch Street, Shoreditch<br />London E2 7DJ</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--color-caramel)]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-[var(--color-caramel)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-espresso)] text-sm">Horaires</p>
                  {hours.map(h => (
                    <p key={h.label} className="text-[var(--color-text-muted)] text-sm">
                      <span className="text-[var(--color-espresso)] font-medium">{h.label}</span> · {h.value}
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--color-caramel)]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-[var(--color-caramel)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-espresso)] text-sm">Téléphone</p>
                  <a href="tel:+442079460127" className="text-[var(--color-text-muted)] text-sm hover:text-[var(--color-caramel)] transition-colors duration-200">
                    +44 20 7946 0127
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne formulaire */}
          <div>
            {submitted ? (
              <div className="bg-[var(--color-success-bg)] border border-[var(--color-success-border)] rounded-2xl p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-[var(--color-success)] flex items-center justify-center mx-auto mb-5">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3
                  className="text-2xl font-light text-[var(--color-espresso)] mb-3"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Réservation reçue !
                </h3>
                <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
                  Merci {form.name.split(' ')[0]}. Nous avons bien reçu votre demande pour{' '}
                  {form.partySize} personne{Number(form.partySize) > 1 ? 's' : ''} le{' '}
                  {new Date(form.date + 'T12:00:00').toLocaleDateString('fr-FR', {
                    weekday: 'long', day: 'numeric', month: 'long',
                  })}{' '}
                  à {form.time}.
                </p>
                <p className="text-[var(--color-text-subtle)] text-xs mt-3">
                  Nous vous contacterons par téléphone pour confirmer.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-[var(--shadow-card)] space-y-5" noValidate>
                <div>
                  <label htmlFor="res-name" className={labelClass}>Nom complet</label>
                  <input
                    id="res-name"
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Sarah Mitchell"
                    autoComplete="name"
                    className={inputClass}
                  />
                  {errors.name && <p className="text-[var(--color-error)] text-xs mt-1" role="alert">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="res-party" className={labelClass}>Nombre de personnes</label>
                  <select
                    id="res-party"
                    value={form.partySize}
                    onChange={e => setForm({ ...form, partySize: e.target.value })}
                    className={inputClass}
                  >
                    <option value="">Sélectionner...</option>
                    {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
                      <option key={n} value={n}>{n} personne{n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                  {errors.partySize && <p className="text-[var(--color-error)] text-xs mt-1" role="alert">{errors.partySize}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="res-date" className={labelClass}>Date</label>
                    <input
                      id="res-date"
                      type="date"
                      value={form.date}
                      min={today}
                      onChange={e => setForm({ ...form, date: e.target.value })}
                      className={inputClass}
                    />
                    {errors.date && <p className="text-[var(--color-error)] text-xs mt-1" role="alert">{errors.date}</p>}
                  </div>
                  <div>
                    <label htmlFor="res-time" className={labelClass}>Heure</label>
                    <select
                      id="res-time"
                      value={form.time}
                      onChange={e => setForm({ ...form, time: e.target.value })}
                      className={inputClass}
                    >
                      <option value="">Heure...</option>
                      {TIME_SLOTS.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    {errors.time && <p className="text-[var(--color-error)] text-xs mt-1" role="alert">{errors.time}</p>}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full h-13 text-base font-semibold rounded-full bg-[var(--color-caramel)] text-white hover:bg-[var(--color-honey)] hover:text-[var(--color-espresso)] hover:shadow-[var(--shadow-glow-caramel)] active:scale-[0.98] transition-all duration-300 cursor-pointer mt-2"
                >
                  Confirmer la réservation
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
