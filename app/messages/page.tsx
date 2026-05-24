"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import {
  Send,
  MessageCircle,
  User,
  Clock,
  Search,
  Home,
  Sparkles,
} from "lucide-react";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

function MessagesContent() {
  const searchParams = useSearchParams();
  const ownerParam = searchParams.get("owner");
  const propertyParam = searchParams.get("property");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "田中太郎",
      content: "こんにちは！TJSについて質問があります。",
      timestamp: new Date("2024-01-15T10:30:00"),
      isRead: true,
    },
    {
      id: "2",
      sender: "佐藤花子",
      content: "イベントの詳細を教えてください。",
      timestamp: new Date("2024-01-14T15:45:00"),
      isRead: false,
    },
    {
      id: "3",
      sender: "山田次郎",
      content: "求人情報について詳しく知りたいです。",
      timestamp: new Date("2024-01-13T09:20:00"),
      isRead: true,
    },
    {
      id: "4",
      sender: "鈴木美咲",
      content: "賃貸物件の見学予約をお願いします。",
      timestamp: new Date("2024-01-12T14:15:00"),
      isRead: false,
    },
    {
      id: "5",
      sender: "高橋健一",
      content: "フリマの出店について相談があります。",
      timestamp: new Date("2024-01-11T11:30:00"),
      isRead: true,
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (ownerParam) {
      const ownerMessage = messages.find((msg) => msg.sender === ownerParam);
      if (ownerMessage) {
        setSelectedMessage(ownerMessage);
      }
    }
  }, [ownerParam, messages]);

  const filteredMessages = useMemo(() => {
    if (!searchQuery.trim()) return messages;

    return messages.filter(
      (message) =>
        message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [messages, searchQuery]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: "あなた",
        content: newMessage,
        timestamp: new Date(),
        isRead: false,
      };
      setMessages([message, ...messages]);
      setNewMessage("");
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleString("ja-JP", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const unreadCount = messages.filter((msg) => !msg.isRead).length;

  return (
    <div className="min-h-screen flex flex-col bg-washi-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 lg:px-8 py-10">
        <div className="overflow-hidden rounded-[2rem] border border-sumi-100 bg-white shadow-elegant">
          {/* Header bar */}
          <div className="relative overflow-hidden bg-gradient-sumi text-washi-50 p-6 md:p-8">
            <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-sakura-500/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 left-1/3 h-60 w-60 rounded-full bg-gold-500/20 blur-3xl" />
            <div className="relative flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-sakura text-white shadow-glow">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-300">
                    <Sparkles className="h-3 w-3 inline -mt-0.5 mr-1" />
                    Inbox · メッセージ
                  </div>
                  <h1 className="mt-1 font-display text-3xl md:text-4xl font-extrabold text-washi-50">
                    Messages
                  </h1>
                  <p className="mt-1 text-sm text-washi-100/75">
                    コミュニティメンバーとの交流
                  </p>
                  {ownerParam && propertyParam && (
                    <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-xs text-washi-100/85 backdrop-blur">
                      <Home className="h-3.5 w-3.5 text-gold-300" />
                      {propertyParam} · {ownerParam}様
                    </div>
                  )}
                </div>
              </div>
              {unreadCount > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-gradient-gold text-sumi-900 px-3 py-1.5 text-xs font-bold shadow-glow-gold">
                  {unreadCount}件 未読
                </span>
              )}
            </div>
          </div>

          {/* Two-column chat */}
          <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] h-[600px]">
            {/* Left: list */}
            <aside className="border-r border-sumi-100 bg-washi-50/60 flex flex-col">
              <div className="p-4 border-b border-sumi-100">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-sumi-400" />
                  <input
                    type="text"
                    placeholder="メッセージを検索..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-full border border-sumi-200 bg-white text-sm focus:outline-none focus:border-sakura-300 focus:ring-2 focus:ring-sakura-200/40 transition-all"
                  />
                </div>
              </div>
              <div className="overflow-y-auto flex-1">
                {filteredMessages.length > 0 ? (
                  filteredMessages.map((message) => {
                    const isActive = selectedMessage?.id === message.id;
                    const isOwner = ownerParam && message.sender === ownerParam;
                    return (
                      <button
                        key={message.id}
                        onClick={() => setSelectedMessage(message)}
                        className={`group w-full text-left p-4 border-b border-sumi-100/60 transition-all ${
                          isActive
                            ? "bg-gradient-to-r from-sakura-50 to-transparent"
                            : "hover:bg-sumi-50/60"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`relative grid h-10 w-10 shrink-0 place-items-center rounded-full text-white shadow-glow-soft ${
                              isOwner
                                ? "bg-gradient-gold text-sumi-900"
                                : "bg-gradient-sakura"
                            }`}
                          >
                            <User className="h-4 w-4" />
                            {!message.isRead && (
                              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-sakura-500 ring-2 ring-white animate-pulse" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <p className="font-semibold text-sm text-sumi-800 truncate">
                                {message.sender}
                                {isOwner && (
                                  <span className="ml-2 text-[9px] uppercase tracking-wider bg-gold-100 text-gold-700 px-1.5 py-0.5 rounded-full font-bold">
                                    Owner
                                  </span>
                                )}
                              </p>
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-sumi-400 shrink-0">
                                <Clock className="h-2.5 w-2.5" />
                                {formatTime(message.timestamp)}
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-sumi-500 truncate">
                              {message.content}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="p-6 text-center text-sumi-400">
                    <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">検索結果が見つかりません</p>
                  </div>
                )}
              </div>
            </aside>

            {/* Right: detail */}
            <section className="hidden md:flex flex-col bg-white">
              {selectedMessage ? (
                <>
                  <div className="p-5 border-b border-sumi-100 bg-gradient-to-r from-washi-50 to-transparent">
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-sakura text-white shadow-glow">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-bold text-sumi-800">
                          {selectedMessage.sender}
                          {ownerParam &&
                            selectedMessage.sender === ownerParam && (
                              <span className="ml-2 text-[10px] uppercase tracking-wider bg-gold-100 text-gold-700 px-1.5 py-0.5 rounded-full font-bold">
                                Owner
                              </span>
                            )}
                        </h3>
                        <p className="text-xs text-sumi-400 font-mono">
                          {formatTime(selectedMessage.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-washi-50/40 to-white">
                    <div className="max-w-2xl">
                      <div className="rounded-3xl bg-white border border-sumi-100 p-5 shadow-glow-soft">
                        <p className="text-sumi-700 leading-relaxed">
                          {selectedMessage.content}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-t border-sumi-100 bg-white">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleSendMessage();
                          }
                        }}
                        placeholder="メッセージを入力..."
                        className="flex-1 px-4 py-3 rounded-full border border-sumi-200 bg-white text-sm focus:outline-none focus:border-sakura-300 focus:ring-2 focus:ring-sakura-200/40 transition-all"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="grid h-11 w-11 place-items-center rounded-full bg-gradient-sakura text-white shadow-glow transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:pointer-events-none"
                        aria-label="送信"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-center px-8">
                  <div>
                    <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-sakura-50 to-gold-50 ring-1 ring-gold-200/40">
                      <MessageCircle className="h-7 w-7 text-gold-500" />
                    </div>
                    <p className="mt-4 font-display text-lg font-semibold text-sumi-700">
                      メッセージを選択してください
                    </p>
                    <p className="mt-1 text-sm text-sumi-400">
                      左側のリストから会話を選んで開始
                    </p>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-washi-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative mx-auto w-fit">
          <div className="h-12 w-12 rounded-full border-2 border-sakura-100" />
          <div className="absolute inset-0 h-12 w-12 rounded-full border-2 border-transparent border-t-sakura-500 animate-spin" />
        </div>
        <p className="mt-4 text-sm text-sumi-500">メッセージを読み込み中...</p>
      </div>
    </div>
  );
}

export default function Messages() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <MessagesContent />
    </Suspense>
  );
}
