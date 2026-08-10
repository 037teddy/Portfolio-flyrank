export default function CaseStudiesPage() {
  return (
    <section className="px-6 py-16 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold text-slate-900 mb-10">Work</h1>

      <article className="border border-slate-200 rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">
          Weather Dashboard
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          A weather app built to go beyond a simple forecast — real-time
          conditions, a multi-day outlook, saved locations, and a
          conversational AI layer, all in one dashboard.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          I built four core views — Dashboard, Forecast, Saved Locations,
          and Health — plus a station lookup for searching any location.
          The dashboard surfaces live conditions (temperature, sky state,
          wind) alongside a 5-day forecast with highs, lows, and
          precipitation chance. On top of the data layer sits a weather
          chat: an AI agent visitors can ask natural-language questions to,
          instead of parsing charts themselves.
        </p>
        <a
          href="https://weather-dashboard-ai-tau.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 font-medium hover:text-blue-800"
        >
          View live project →
        </a>
      </article>
    </section>
  );
}