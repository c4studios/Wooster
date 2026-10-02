import Link from "next/link";

export default function CheckoutSuccess() {
  return (
    <div className="material-lid flex min-h-[100svh] items-center justify-center px-4 pb-16 pt-[calc(var(--nav-h)+2rem)] sm:px-6">
      <div className="surface-slip w-full max-w-xl bg-slip px-6 py-9 text-lid shadow-[0_30px_60px_-30px_rgb(0_0_0/0.7)] sm:px-10">
        <div className="flex items-center gap-3">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="11" stroke="#222531" strokeWidth="1.5" />
            <polyline
              className="check-draw"
              points="17 8.5 10.5 15 7 11.5"
              stroke="#222531"
              strokeWidth="1.8"
              strokeLinecap="square"
            />
          </svg>
          <p className="type-label text-[0.6875rem] text-lid/75">Packing slip</p>
        </div>

        <h1 className="type-wide mt-4 text-[clamp(1.9rem,6vw,2.8rem)] font-extrabold uppercase leading-[0.95]">
          Order confirmed
        </h1>

        <p className="mt-5 text-[1rem] leading-relaxed">
          Thanks for your order. Your Wooster Core system is being prepared for shipping, and a
          confirmation email is on its way.
        </p>

        <p className="mt-4 border-t-2 border-lid pt-4 text-[0.9375rem] leading-relaxed text-lid/85">
          Your parts join the print queue. Once they are quality-checked, they are packed in the
          Wooster Core box and shipped to you.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Link href="/" className="btn btn-signal">
            Back to Wooster Core
          </Link>
          <p className="text-[0.875rem] text-lid/80">
            Questions about your order?{" "}
            <a href="mailto:hello@artydesign.com.au" className="underline underline-offset-4 hover:text-lid">
              hello@artydesign.com.au
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
