export default function Home() {
  return (
    <section className="px-6 py-24 max-w-3xl mx-auto">
      <h1 className="text-4xl font-semibold text-slate-900 mb-4">
        Teddy Mbayaki
      </h1>
      <p className="text-xl text-slate-700 mb-6">
        Frontend developer. I ship interfaces with AI actually built in.
      </p>
      <p className="text-base text-slate-600 mb-8 leading-relaxed">
        I design and ship interfaces where AI is a real part of the
        experience — not a bolt-on. Clean code, thoughtful interaction,
        production-ready.
      </p>
      <a
        href="/case-studies"
        className="inline-block bg-slate-900 text-white px-6 py-3 rounded-md hover:bg-slate-700 transition"
      >
        View My Work
      </a>
    </section>
  );
}