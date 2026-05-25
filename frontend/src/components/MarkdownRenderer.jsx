import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'

/**
 * Custom components for ReactMarkdown to match the project's Groovy/70s aesthetic.
 */
const MarkdownComponents = {
  // Table implementation with glass-card effect and responsiveness
  table: ({ node, ...props }) => (
    <div className="my-6 overflow-x-auto rounded-3xl border border-primary/20 shadow-xl">
      <table className="w-full border-collapse bg-white/50 backdrop-blur-md" {...props} />
    </div>
  ),
  thead: ({ node, ...props }) => (
    <thead className="bg-primary/10 font-serif text-primary" {...props} />
  ),
  th: ({ node, ...props }) => (
    <th className="px-6 py-4 font-bold border-b border-primary/20" {...props} />
  ),
  td: ({ node, ...props }) => (
    <td className="px-6 py-4 border-b border-primary/10 transition-colors hover:bg-primary/5" {...props} />
  ),
  // Text formatting
  strong: ({ node, ...props }) => (
    <strong className="font-bold text-inherit" {...props} />
  ),
  em: ({ node, ...props }) => (
    <em className="italic text-inherit" {...props} />
  ),
  // Inline and Block code
  code: ({ node, className, children, ...props }) => {
    const isBlock = /language-(\w+)/.exec(className || '') || (node?.position?.start.line !== node?.position?.end.line);
    return isBlock ? (
      <code
        className={cn(
          "block p-4 my-4 overflow-x-auto bg-slate-950 text-slate-50 rounded-xl font-mono text-sm",
          className
        )}
        {...props}
      >
        {children}
      </code>
    ) : (
      <code
        className={cn(
          "bg-primary/10 text-primary px-1.5 py-0.5 rounded-md font-mono text-sm",
          className
        )}
        {...props}
      >
        {children}
      </code>
    )
  },
  // Links
  a: ({ node, ...props }) => (
    <a className="text-primary underline underline-offset-4 hover:text-primary/70 transition-colors" {...props} />
  )
}

/**
 * MarkdownRenderer component to safely render markdown content.
 * Supports GitHub Flavored Markdown (GFM) via remark-gfm.
 */
export default function MarkdownRenderer({ children, className }) {
  if (!children) return null;

  return (
    <div className={cn("markdown-content", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={MarkdownComponents}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
