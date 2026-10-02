/**
 * "Built by riders", laid into the foam insert. What the repo already states
 * sits in filled cut-outs; the facts Arty Design has not supplied yet sit in
 * open cut-outs marked [PLACEHOLDER] (Caleb, 2 Oct 2026). Do not replace a
 * placeholder with anything that has not come from Arty Design.
 */
const STEPS = [
  {
    title: "Concept",
    known: "Started from the need for a better performance handle.",
    gap: "Who designed it, and what was wrong with the handle they rode before.",
    span: "md:col-span-7",
  },
  {
    title: "Prototype",
    known: "Printed and reprinted to test materials and geometry.",
    gap: "How many rounds it took, and what changed between them.",
    span: "md:col-span-5",
  },
  {
    title: "Test",
    known: "Ridden in real ocean conditions.",
    gap: "Where it was ridden, by whom, and for how long.",
    span: "md:col-span-5",
  },
  {
    title: "Refine",
    known: "Revised on rider feedback, across multiple versions.",
    gap: "What the riders asked for, and what this version changed.",
    span: "md:col-span-7",
  },
];

export function RiderStory() {
  return (
    <section id="riders" aria-labelledby="riders-title" className="material-foam">
      <div className="mx-auto max-w-[90rem] px-4 py-16 sm:px-6 md:py-24 lg:px-12">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <h2
            id="riders-title"
            className="type-wide text-[clamp(2rem,5vw,3.4rem)] font-extrabold uppercase leading-[0.9] text-silver-hi md:col-span-7"
          >
            Built by riders
          </h2>
          <p className="max-w-[30rem] text-[1rem] leading-relaxed text-silver md:col-span-5">
            Tested by riders, refined through months of real-world feedback.
          </p>
        </div>

        <ol className="mt-10 grid gap-4 md:grid-cols-12">
          {STEPS.map((step) => (
            <li key={step.title} className={`foam-cut flex flex-col gap-4 p-5 sm:p-6 ${step.span}`}>
              <h3 className="type-wide text-[1.15rem] font-extrabold uppercase text-silver-hi">
                {step.title}
              </h3>
              <p className="max-w-[34rem] text-[0.9375rem] leading-relaxed text-silver">{step.known}</p>
              <p className="foam-cut-open mt-auto px-3 py-2.5 text-[0.875rem] leading-relaxed text-silver">
                <span className="type-mono mr-1.5 text-[0.6875rem] text-signal">[PLACEHOLDER]</span>
                {step.gap}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
