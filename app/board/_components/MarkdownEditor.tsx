"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  Bold,
  Italic,
  Heading,
  List,
  Link2,
  Quote,
  Code,
  Smile,
  Eye,
  Pencil,
} from "lucide-react";
import MarkdownView from "./MarkdownView";

// emoji-picker-react は window 参照があるので SSR を切る
const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  minHeight?: number;
}

export default function MarkdownEditor({
  value,
  onChange,
  placeholder = "マークダウンで書けます。絵文字も使えます 😊",
  minHeight = 180,
}: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [showEmoji, setShowEmoji] = useState(false);

  const surround = (before: string, after = before) => {
    const ta = ref.current;
    if (!ta) {
      onChange(value + before + after);
      return;
    }
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const sel = value.slice(start, end);
    const next = value.slice(0, start) + before + sel + after + value.slice(end);
    onChange(next);
    requestAnimationFrame(() => {
      ta.focus();
      ta.selectionStart = start + before.length;
      ta.selectionEnd = end + before.length;
    });
  };

  const prefixLine = (prefix: string) => {
    const ta = ref.current;
    if (!ta) {
      onChange(value + "\n" + prefix);
      return;
    }
    const start = ta.selectionStart;
    const lineStart = value.lastIndexOf("\n", start - 1) + 1;
    const next = value.slice(0, lineStart) + prefix + value.slice(lineStart);
    onChange(next);
    requestAnimationFrame(() => {
      ta.focus();
      const pos = start + prefix.length;
      ta.selectionStart = ta.selectionEnd = pos;
    });
  };

  const insertText = (text: string) => {
    const ta = ref.current;
    if (!ta) {
      onChange(value + text);
      return;
    }
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const next = value.slice(0, start) + text + value.slice(end);
    onChange(next);
    requestAnimationFrame(() => {
      ta.focus();
      const pos = start + text.length;
      ta.selectionStart = ta.selectionEnd = pos;
    });
  };

  const ToolBtn = ({
    onClick,
    title,
    children,
  }: {
    onClick: () => void;
    title: string;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-sumi-500 hover:bg-sakura-50 hover:text-sakura-600 transition-colors"
    >
      {children}
    </button>
  );

  return (
    <div className="rounded-2xl border border-sumi-200 bg-white">
      {/* tabs */}
      <div className="flex items-center gap-1 border-b border-sumi-100 px-2 py-1.5">
        <button
          type="button"
          onClick={() => setTab("write")}
          className={`inline-flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-medium ${
            tab === "write" ? "bg-sumi-100 text-sumi-800" : "text-sumi-400"
          }`}
        >
          <Pencil className="h-3.5 w-3.5" /> 編集
        </button>
        <button
          type="button"
          onClick={() => setTab("preview")}
          className={`inline-flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-medium ${
            tab === "preview" ? "bg-sumi-100 text-sumi-800" : "text-sumi-400"
          }`}
        >
          <Eye className="h-3.5 w-3.5" /> プレビュー
        </button>

        {tab === "write" && (
          <div className="ml-1 flex items-center gap-0.5 border-l border-sumi-100 pl-1">
            <ToolBtn title="太字" onClick={() => surround("**")}>
              <Bold className="h-4 w-4" />
            </ToolBtn>
            <ToolBtn title="斜体" onClick={() => surround("*")}>
              <Italic className="h-4 w-4" />
            </ToolBtn>
            <ToolBtn title="見出し" onClick={() => prefixLine("## ")}>
              <Heading className="h-4 w-4" />
            </ToolBtn>
            <ToolBtn title="リスト" onClick={() => prefixLine("- ")}>
              <List className="h-4 w-4" />
            </ToolBtn>
            <ToolBtn title="引用" onClick={() => prefixLine("> ")}>
              <Quote className="h-4 w-4" />
            </ToolBtn>
            <ToolBtn title="コード" onClick={() => surround("`")}>
              <Code className="h-4 w-4" />
            </ToolBtn>
            <ToolBtn title="リンク" onClick={() => surround("[", "](url)")}>
              <Link2 className="h-4 w-4" />
            </ToolBtn>
            <div className="relative">
              <ToolBtn title="絵文字" onClick={() => setShowEmoji((s) => !s)}>
                <Smile className="h-4 w-4" />
              </ToolBtn>
              {showEmoji && (
                <div className="absolute z-50 mt-1">
                  <EmojiPicker
                    onEmojiClick={(e: { emoji: string }) => {
                      insertText(e.emoji);
                      setShowEmoji(false);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* body */}
      {tab === "write" ? (
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ minHeight }}
          className="block w-full resize-y rounded-b-2xl px-4 py-3 text-sm focus:outline-none"
        />
      ) : (
        <div style={{ minHeight }} className="px-4 py-3">
          {value.trim() ? (
            <MarkdownView>{value}</MarkdownView>
          ) : (
            <p className="text-sm text-sumi-400">プレビューする内容がありません。</p>
          )}
        </div>
      )}
    </div>
  );
}
