"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ProductImage } from "./ProductImage";

export function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={sectionRef} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-[family-name:var(--font-mono)] text-wooster-orange text-xs tracking-[0.4em] uppercase mb-4">
            Tested in the Field
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl tracking-[0.1em] text-white">
            BUILT BY RIDERS
          </h2>
          <p className="text-wooster-steel mt-4 max-w-2xl mx-auto">
            Months of real-world testing. Multiple material iterations. Built by
            riders, for riders.
          </p>
        </motion.div>

        {/* Timeline / Process */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20"
        >
          {[
            {
              step: "01",
              title: "CONCEPT",
              desc: "Identified the need for a better performance handle",
            },
            {
              step: "02",
              title: "PROTOTYPE",
              desc: "Rapid 3D printing iterations testing materials and geometry",
            },
            {
              step: "03",
              title: "TEST",
              desc: "Real-world testing in harsh ocean conditions",
            },
            {
              step: "04",
              title: "REFINE",
              desc: "Multiple revisions based on rider feedback",
            },
          ].map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.15 }}
              className="relative p-6 bg-wooster-charcoal/30 border border-white/5 rounded-lg hover:border-wooster-orange/20 transition-colors group"
            >
              <span className="font-[family-name:var(--font-display)] text-4xl text-wooster-orange/20 group-hover:text-wooster-orange/40 transition-colors">
                {item.step}
              </span>
              <h3 className="font-[family-name:var(--font-display)] text-lg tracking-[0.1em] text-white mt-2">
                {item.title}
              </h3>
              <p className="text-sm text-wooster-steel mt-2">{item.desc}</p>

              {/* Connector chevron */}
              {index < 3 && (
                <svg
                  className="hidden md:block absolute top-1/2 -right-[18px] -translate-y-1/2 w-3 h-3 text-wooster-orange/30 z-10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Packaging showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20 relative mx-auto max-w-3xl"
        >
          <ProductImage
            src="/images/product-boxes.jpg"
            alt="Wooster Core product packaging - premium matte black boxes engineered by Arty Design"
            width={1200}
            height={900}
            className="w-full h-auto rounded-lg"
            sizes="(max-width: 768px) 100vw, 700px"
          />
          <div className="absolute inset-0 rounded-lg ring-1 ring-white/5" />
          <p className="text-center font-[family-name:var(--font-mono)] text-xs tracking-[0.3em] text-wooster-steel/40 uppercase mt-4">
            Premium Packaging — Ready to Ship
          </p>
        </motion.div>

        {/* Rider testimonials removed 2 Oct 2026 (site_issues 105): the three
            quotes had no source. Add real, attributed quotes only. */}
      </div>
    </section>
  );
}
