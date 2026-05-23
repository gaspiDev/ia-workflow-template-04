import { Link } from "react-router"
import { ArrowRight, Sparkles, Database, Zap } from "lucide-react"

export default function Home() {
  return (
    <div className="px-6 pt-10 pb-20 lg:pb-32">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-sm mb-4 animate-float">
          <Sparkles className="w-4 h-4" />
          <span>BETA ACCESS: THE FUTURE OF DATA EXPLORATION</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-7xl md:text-9xl font-serif font-bold leading-tight mb-12 tracking-tighter">
          Agentic <br />
          <span className="text-primary italic">Explorer</span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-xl md:text-3xl text-foreground/60 max-w-4xl mb-16 font-medium leading-relaxed">
          The <span className="text-foreground font-bold underline decoration-primary decoration-4 underline-offset-8">Alto Rosario Shopping</span> database is our featured example.
          Experience the future of SaaS where our AI agents transform any raw schema into actionable insights.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-8 mb-32">
          <Link
            to="/chat"
            className="group relative px-12 py-6 bg-primary text-primary-foreground font-black text-2xl rounded-3xl groovy-shadow transition-all duration-300 hover:translate-y-[-4px] active:translate-y-[2px] flex flex-col items-center gap-1"
          >
            <span className="flex items-center gap-3">
              Try Free Demo <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
            </span>
            <span className="text-xs opacity-80 font-bold uppercase tracking-widest">No setup required</span>
          </Link>
          <a
            href="/setup"
            target="_blank"
            rel="noopener noreferrer"
            className="px-12 py-6 bg-white border-4 border-primary text-primary font-black text-2xl rounded-3xl transition-all duration-300 hover:bg-primary hover:text-white hover:scale-105 active:scale-95 shadow-[8px_8px_0px_rgba(var(--primary),0.1)] hover:shadow-[12px_12px_0px_rgba(var(--primary),0.2)] flex items-center justify-center"
          >
            Configure Your DB
          </a>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full mt-20">
          <FeatureCard
            icon={<Database className="w-12 h-12 text-primary" />}
            title="Any Database"
            description="While we use Alto Rosario as an example, our future SaaS will connect to any PostgreSQL, MySQL, or Snowflake instance."
          />
          <FeatureCard
            icon={<Zap className="w-12 h-12 text-primary" />}
            title="Agentic Reasoning"
            description="No more writing SQL manually. Our agents understand your schema and intent, formulating queries on the fly."
          />
          <FeatureCard
            icon={<Sparkles className="w-12 h-12 text-primary" />}
            title="Maximalist Power"
            description="A bold interface for bold insights. Data exploration shouldn't be boring. It should be groovy."
          />
        </div>

        {/* Secondary Info Section */}
        <div className="mt-40 p-12 md:p-24 glass-card rounded-4xl border-4 border-primary/20 relative overflow-hidden text-left">
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8">Not just a demo.</h2>
            <p className="text-2xl md:text-3xl text-foreground/70 font-medium leading-relaxed">
              We are building the actual future of SaaS data analysis.
              The AI explorer will eventually scale to enterprise-level complexity,
              maintaining the same intuitive conversational interface you see here.
            </p>
          </div>
          {/* Decorative Circle */}
          <div className="absolute top-[-50px] right-[-50px] w-64 h-64 border-[20px] border-primary/10 rounded-full" />
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-12 glass-card rounded-4xl border-2 border-primary/10 flex flex-col items-center text-center transition-all duration-500 hover:scale-105 hover:border-primary/30 group">
      <div className="mb-8 p-6 bg-primary/5 rounded-3xl transition-transform duration-500 group-hover:rotate-12">
        {icon}
      </div>
      <h3 className="text-3xl font-serif font-bold mb-6">{title}</h3>
      <p className="text-xl text-foreground/50 font-medium leading-relaxed">{description}</p>
    </div>
  )
}
