export default function PageFooter() {
  return (
    <footer
      className="
        relative z-10 mx-auto flex w-full max-w-7xl
        flex-col justify-between gap-4
        border-t border-border px-5 py-6
        sm:flex-row sm:items-center
        sm:px-10
        lg:px-16
      "
    >
      <p
        className="
          text-[10px] uppercase
          tracking-[0.25em] text-subtle
        "
      >
        Based in Indonesia
      </p>

      <p
        className="
          text-[10px] uppercase
          tracking-[0.25em] text-subtle
        "
      >
        Web Development · Creative Technology
      </p>

      <p
        className="
          text-[10px] uppercase
          tracking-[0.25em] text-accent
        "
      >
        © 2026 Fathan Al Ashraf
      </p>
    </footer>
  );
}
