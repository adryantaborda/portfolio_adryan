"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import portraitSrc from "../adryan_taborda.png";
import logoSrc from "../logoadryantaborda.png";

const spring = {
  type: "spring" as const,
  stiffness: 120,
  damping: 20,
  mass: 0.7
} satisfies Transition;

const sectionVariants = {
  initial: { opacity: 0, y: 32 },
  enter: { opacity: 1, y: 0 }
};

const cardVariants = {
  initial: { opacity: 0, y: 16 },
  enter: { opacity: 1, y: 0 }
};

function useSectionProgress() {
  const ref = useRef<HTMLDivElement | null>(null);
  return { ref };
}

export default function LandingPage() {
  const [sections, setSections] = useState<HTMLElement[]>([]);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const found = Array.from(
      document.querySelectorAll<HTMLElement>(".page-shell .section")
    );
    setSections(found);
  }, []);

  const handleWheel: React.WheelEventHandler<HTMLDivElement> = (event) => {
    if (!sections.length) return;

    // Impede que o navegador faça o scroll “normal”
    event.preventDefault();

    if (isScrolling) return;

    const delta = event.deltaY;
    if (Math.abs(delta) < 10) return;

    const viewportCenter = window.innerHeight / 2;
    const currentIndex =
      sections.findIndex((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= viewportCenter && rect.bottom >= viewportCenter;
      }) || 0;

    const direction = delta > 0 ? 1 : -1;
    const nextIndex = Math.min(
      sections.length - 1,
      Math.max(0, currentIndex + direction)
    );

    if (nextIndex === currentIndex) return;

    setIsScrolling(true);
    sections[nextIndex].scrollIntoView({ behavior: "smooth" });
    window.setTimeout(() => setIsScrolling(false), 750);
  };

  return (
    <main className="page-shell" onWheel={handleWheel}>
      <HeroSection />
      <ScrollTestSection />
    </main>
  );
}

function HeroSection() {
  const { ref } = useSectionProgress();

  return (
    <section className="section section-hero-only" ref={ref}>
      <motion.div
        className="section-inner section-inner-hero"
        variants={sectionVariants}
        initial="initial"
        animate="enter"
        transition={spring}
      >
        <div className="hero-scroll-indicator" aria-hidden="true">
          <div className="hero-scroll-mouse">
            <span className="hero-scroll-wheel" />
          </div>
        </div>
        <Image
          src={logoSrc}
          alt="Adryan Taborda logo"
          width={140}
          height={140}
          className="hero-logo-floating"
          priority={false}
        />
        <div className="hero-portfolio-wrapper">
          <div className="hero-portfolio-name">ADRYAN TABORDA</div>
          <h1 className="hero-portfolio-heading hero-portfolio-heading-only">
            PORTFOLIO
          </h1>
          <Image
            src={portraitSrc}
            alt="Portrait of Adryan Taborda"
            priority
            width={1080}
            height={1100}
            quality={100}
            sizes="(min-width: 1200px) 860px, (min-width: 768px) 600px, 92vw"
            className="hero-portfolio-portrait"
          />
        </div>
      </motion.div>
    </section>
  );
}

function ScrollTestSection() {
  const { ref } = useSectionProgress();

  return (
    <section className="section" ref={ref}>
      <div className="section-inner section-inner-empty" />
    </section>
  );
}

function AboutSection() {
  const { ref } = useSectionProgress();

  return (
    <section className="section" ref={ref}>
      <motion.div
        className="section-inner"
        variants={sectionVariants}
        initial="initial"
        whileInView="enter"
        viewport={{ once: true, amount: 0.5 }}
        transition={spring}
      >
        <div>
          <div className="section-label">
            <span className="section-label-dot" />
            <span>ABOUT</span>
          </div>
          <h2 className="heading-xl">Less noise. More signal.</h2>
          <p className="heading-sub">
            My work sits between product design and engineering: translating
            messy industrial processes into calm, inspectable interfaces that
            operators can trust.
          </p>
          <div className="section-divider" />
          <p className="section-body section-body-strong">
            I focus on slim, opinionated layouts, stress-tested typography and
            motion that respects the operator&apos;s attention span. No hero
            carousels. No surprise states. Only elements that earn their place
            on screen.
          </p>
        </div>

        <div className="section-columns">
          <div className="section-body">
            <strong>What I bring</strong>
            <br />
            - Tight integration between UX decisions and implementation.
            <br />
            - Strong bias towards static rendering, predictable performance and
            small dependency surface.
            <br />- Hands-on with design systems, grids and typographic rhythm
            tuned for dense data.
          </div>
          <div className="section-body">
            <strong>Ideal problems</strong>
            <br />
            - Clean-tech control systems and monitoring dashboards.
            <br />
            - Industrial SaaS where operators live in the UI for hours.
            <br />- Migration from legacy, cluttered tooling to quiet, focused
            interfaces.
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function ProjectsSection() {
  const { ref } = useSectionProgress();

  const projects = [
    {
      title: "Load balance console",
      type: "Energy / Grid",
      description:
        "Operator console for balancing distributed energy resources. Designed for at-a-glance state with tight latencies and clear fallback modes.",
      metrics: ["Sub-50ms navigation", "Zero CLS", "Dark-room verified"]
    },
    {
      title: "Field diagnostics UI",
      type: "Industrial / IIoT",
      description:
        "Tablet-first diagnostic tooling for technicians. Sparse UI, aggressive caching, and motion reserved for system-critical transitions.",
      metrics: ["Offline-ready", "Touch-optimized", "Low ambient light"]
    },
    {
      title: "Emissions dashboard",
      type: "Clean-tech / Reporting",
      description:
        "Data-dense dashboard for emissions data. Structured grid, frozen headers and scroll-synced charts with micro-interactions only on focus.",
      metrics: ["High-density layout", "Static charts shell", "Live overlays"]
    },
    {
      title: "Maintenance planner",
      type: "Industrial / Planning",
      description:
        "Planner UI for recurring maintenance windows. Timeline-based layout, gentle zooming and keyboard-first navigation.",
      metrics: ["Keyboard-first", "Predictable zoom", "A11y reviewed"]
    }
  ];

  return (
    <section className="section" ref={ref}>
      <motion.div
        className="section-inner"
        variants={sectionVariants}
        initial="initial"
        whileInView="enter"
        viewport={{ once: true, amount: 0.4 }}
        transition={spring}
      >
        <div>
          <div className="section-label">
            <span className="section-label-dot" />
            <span>PROJECTS</span>
          </div>
          <h2 className="heading-xl">Selected work.</h2>
          <p className="heading-sub">
            Reference projects that show how clean visuals, strict grids and
            conservative motion can still feel sharp and contemporary.
          </p>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <motion.article
              key={project.title}
              className="project-card"
              variants={cardVariants}
              initial="initial"
              whileInView="enter"
              viewport={{ once: true, amount: 0.3 }}
              transition={spring}
            >
              <div className="project-header">
                <h3 className="project-title">{project.title}</h3>
                <span className="project-metadata">{project.type}</span>
              </div>
              <p className="project-body">{project.description}</p>
              <div className="project-foot">
                <div className="project-metrics">
                  {project.metrics.map((metric) => (
                    <span
                      key={metric}
                      className="project-metric-pill"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
                <span className="project-cta">Details on request</span>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function ContactSection() {
  const { ref } = useSectionProgress();

  return (
    <section className="section" ref={ref}>
      <motion.div
        className="section-inner"
        variants={sectionVariants}
        initial="initial"
        whileInView="enter"
        viewport={{ once: true, amount: 0.5 }}
        transition={spring}
      >
        <div>
          <div className="section-label">
            <span className="section-label-dot" />
            <span>CONTACT</span>
          </div>
          <h2 className="heading-xl">Light touch, deep work.</h2>
          <p className="heading-sub">
            If you&apos;re building tools where clarity, uptime and operator
            trust matter more than marketing gloss, I&apos;d like to hear about
            it.
          </p>
          <div className="section-divider" />
          <p className="section-body">
            I usually work directly with founders, product leads or small
            industrial teams. I&apos;m happy to join existing design systems or
            help harden one that already exists.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-meta">
            <div>
              <div className="contact-row-label">Email</div>
              <div className="contact-row-value">
                <a href="mailto:hello@adryan.dev">hello@adryan.dev</a>
              </div>
            </div>
            <div>
              <div className="contact-row-label">Signals</div>
              <div className="contact-row-value">
                Concise briefs, real constraints, and a rough sense of how the
                interface will be used day-to-day.
              </div>
            </div>
            <div>
              <div className="contact-row-label">Collaboration</div>
              <div className="contact-row-value">
                Short exploratory calls first; then a small, well-defined slice
                of work before long engagements.
              </div>
            </div>
          </div>

          <div>
            <div className="contact-row-label">Links</div>
            <div className="contact-links">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="contact-link-pill"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="contact-link-pill"
              >
                LinkedIn
              </a>
              <a
                href="https://dribbble.com/"
                target="_blank"
                rel="noreferrer"
                className="contact-link-pill"
              >
                Visual exploration
              </a>
            </div>
            <p className="contact-footnote">
              The page is built with Next.js, statically rendered where
              possible, and uses subtle motion tuned with a spring of stiffness{" "}
              120 / damping 20 for low-distraction transitions.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

