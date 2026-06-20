"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/** マークダウンを安全に表示（HTMLは無効＝XSS対策。GFM対応） */
export default function MarkdownView({ children }: { children: string }) {
  return (
    <div className="md-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // リンクは新規タブ＋安全属性
          a: ({ node, ...props }) => (
            <a {...props} target="_blank" rel="noopener noreferrer" />
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
