export default function ContactPage() {
  return (
    <section className="px-6 py-16 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold text-slate-900 mb-6">Contact</h1>
      <p className="text-slate-600 mb-8 leading-relaxed">
        Have a project in mind, or just want to say hi? I'd love to hear
        from you.
      </p>
      <ul className="space-y-3">
        <li>
          <a
            href="mailto:teddymbayaki@gmail.com"
            className="text-blue-700 font-medium hover:text-blue-800"
          >
            Email — teddymbayaki@gmail.com
          </a>
        </li>
        <li>
          <a
            href="https://github.com/037teddy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 font-medium hover:text-blue-800"
          >
            GitHub
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/teddy-ijaka-631a77412/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 font-medium hover:text-blue-800"
          >
            LinkedIn
          </a>
        </li>
      </ul>
    </section>
  );
}