import { AuditForm } from "@/components/AuditForm"

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400 mb-2">
            Free Security Audit
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Is your site ready{" "}
            <span className="text-indigo-400">to ship?</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Instant security audit. Checks HTTPS, security headers, and exposed sensitive files —
            before your users find them.
          </p>
        </div>

        <AuditForm />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          {[
            {
              icon: "🔒",
              title: "Security Headers",
              desc: "CSP, HSTS, X-Frame-Options, and more",
            },
            {
              icon: "🔍",
              title: "Exposed Files",
              desc: ".env, .git/config, credentials — publicly accessible?",
            },
            {
              icon: "🌐",
              title: "HTTPS Enforcement",
              desc: "TLS enabled, HTTP redirects correctly",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="text-sm font-semibold text-zinc-200 mb-1">{item.title}</div>
              <div className="text-xs text-zinc-500">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
