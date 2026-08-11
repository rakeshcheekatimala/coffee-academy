import Link from 'next/link';
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  FlaskConical,
  Gauge,
  Layers3,
} from 'lucide-react';

const curriculum = [
  {
    number: '01',
    title: 'Origin',
    description: 'Understand variety, altitude, processing, and why place changes the cup.',
    href: '/levels/1',
  },
  {
    number: '02',
    title: 'Roast',
    description: 'Read roast development without reducing coffee to light, medium, or dark.',
    href: '/articles',
  },
  {
    number: '03',
    title: 'Extraction',
    description: 'Control grind, ratio, water, and time with a repeatable brewing method.',
    href: '/lab',
  },
  {
    number: '04',
    title: 'Taste',
    description: 'Build a useful sensory vocabulary and make better decisions in the cup.',
    href: '/levels/5',
  },
];

const library = [
  {
    title: 'The case for weighing your water',
    meta: 'Technique · 6 min',
    href: '/articles',
  },
  {
    title: 'A better starting point for V60',
    meta: 'Recipe · 4 min',
    href: '/recipes',
  },
  {
    title: 'How grind size changes the cup',
    meta: 'Science · 8 min',
    href: '/lab',
  },
];

export default function HomePage() {
  return (
    <main className="home-page">
      <section className="home-hero page-shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Independent coffee education</p>
          <h1 id="hero-title">
            Coffee,
            <br />
            <em>understood.</em>
          </h1>
          <p className="hero-intro">
            A precise, practical education in better coffee—from origin and roasting
            to extraction and taste.
          </p>
          <div className="hero-actions">
            <Link className="button-primary" href="/levels/1">
              Start with the basics <ArrowUpRight aria-hidden="true" />
            </Link>
            <Link className="text-link" href="/lab">
              Open the brew lab <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        <div className="brew-plate" aria-label="Pour-over brew reference">
          <div className="plate-heading">
            <span>BREW NOTE / 01</span>
            <span>POUR OVER</span>
          </div>
          <div className="coffee-orbit" aria-hidden="true">
            <div className="orbit-axis" />
            <div className="coffee-surface">
              <span>1:16.7</span>
            </div>
            <span className="orbit-label orbit-label-top">96°C</span>
            <span className="orbit-label orbit-label-side">MED–FINE</span>
          </div>
          <div className="plate-stats">
            <div><strong>18g</strong><span>Coffee</span></div>
            <div><strong>300g</strong><span>Water</span></div>
            <div><strong>3:15</strong><span>Target</span></div>
          </div>
        </div>

        <a className="scroll-cue" href="#curriculum" aria-label="Scroll to the curriculum">
          <ArrowDown aria-hidden="true" />
          <span>Explore the curriculum</span>
        </a>
      </section>

      <section id="curriculum" className="curriculum-section page-shell">
        <div className="section-heading">
          <p className="eyebrow"><span /> The curriculum</p>
          <h2>Learn coffee as a craft,<br />not a checklist.</h2>
          <p>
            Four connected disciplines. Clear explanations, useful experiments, and
            enough theory to know why your brew changed.
          </p>
        </div>

        <div className="curriculum-list">
          {curriculum.map((item) => (
            <Link className="curriculum-item" href={item.href} key={item.number}>
              <span className="curriculum-number">{item.number}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <section className="feature-section page-shell" aria-labelledby="feature-title">
        <Link className="feature-story" href="/lab">
          <div className="feature-story-topline">
            <span>Interactive study</span>
            <span>02 / Extraction</span>
          </div>
          <div className="feature-story-icon" aria-hidden="true">
            <Gauge />
          </div>
          <div>
            <p className="feature-kicker">The Brew Lab</p>
            <h2 id="feature-title">Extraction without guesswork.</h2>
            <p>
              Change grind size, temperature, ratio, and time. See what each variable
              does before you waste another good bag.
            </p>
            <span className="feature-action">Enter the lab <ArrowUpRight /></span>
          </div>
        </Link>

        <div className="library-panel">
          <div className="library-heading">
            <div>
              <p className="eyebrow"><span /> Field notes</p>
              <h2>Read with your coffee.</h2>
            </div>
            <BookOpen aria-hidden="true" />
          </div>
          <div className="library-list">
            {library.map((item, index) => (
              <Link href={item.href} key={item.title}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.meta}</p>
                </div>
                <ArrowUpRight aria-hidden="true" />
              </Link>
            ))}
          </div>
          <Link className="library-all" href="/articles">
            View the full library <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="principles-section page-shell">
        <div className="principles-mark" aria-hidden="true">
          <FlaskConical />
          <Layers3 />
        </div>
        <div>
          <p className="eyebrow"><span /> Our approach</p>
          <blockquote>
            Better coffee is not about collecting gear. It is about learning to notice.
          </blockquote>
          <p className="principles-copy">
            Coffee Academy turns complicated ideas into practical judgment. No jargon
            for its own sake. No magic recipes. Just the tools to taste, adjust, and brew
            with intent.
          </p>
          <Link className="text-link" href="/wizard">
            Find your starting point <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section className="closing-section page-shell">
        <p className="eyebrow"><span /> Begin here</p>
        <h2>Your next cup<br />can be better.</h2>
        <Link className="button-primary" href="/levels/1">
          Start learning <ArrowUpRight aria-hidden="true" />
        </Link>
      </section>

    </main>
  );
}
