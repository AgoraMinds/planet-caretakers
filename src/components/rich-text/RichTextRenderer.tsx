import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText } from '@payloadcms/richtext-lexical/react'

export function RichTextRenderer({ content }: { content: SerializedEditorState }) {
  if (!content) return null
  return (
    <div className="prose prose-lg max-w-none prose-headings:text-brand-teal-dark prose-a:text-brand-green hover:prose-a:text-brand-green-light">
      <RichText data={content} />
    </div>
  )
}
