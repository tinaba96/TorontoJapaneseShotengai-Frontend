"use client";

import { REACTION_EMOJIS, type ReactionCount } from "@/app/types/board";

interface Props {
  reactions: ReactionCount[];
  myReactions: string[];
  onToggle: (emoji: string) => void;
  disabled?: boolean;
}

export default function ReactionBar({
  reactions,
  myReactions,
  onToggle,
  disabled = false,
}: Props) {
  const countFor = (emoji: string) =>
    reactions.find((r) => r.emoji === emoji)?.count ?? 0;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {REACTION_EMOJIS.map((emoji) => {
        const mine = myReactions.includes(emoji);
        const c = countFor(emoji);
        return (
          <button
            key={emoji}
            type="button"
            disabled={disabled}
            onClick={() => onToggle(emoji)}
            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-sm transition-all ${
              mine
                ? "border-sakura-400 bg-sakura-50"
                : "border-sumi-200 hover:bg-sumi-50"
            } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
          >
            <span className="leading-none">{emoji}</span>
            {c > 0 && <span className="text-xs text-sumi-500">{c}</span>}
          </button>
        );
      })}
    </div>
  );
}
