"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import { Send, MessageCircle, User, Clock, Search, Home } from "lucide-react";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

export default function Messages() {
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

  // オーナーからのメッセージがある場合は、そのメッセージを選択状態にする
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="px-3 pt-0 pb-4 h-[calc(100vh-120px)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="h-full"
        >
          <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
            {/* ヘッダー */}
            <div className="bg-indigo-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MessageCircle className="h-8 w-8" />
                  <div>
                    <h1 className="text-2xl font-bold">メッセージ</h1>
                    <p className="text-indigo-100">
                      コミュニティメンバーとの交流
                    </p>
                    {ownerParam && propertyParam && (
                      <div className="mt-2 flex items-center space-x-2 text-indigo-100">
                        <Home className="h-4 w-4" />
                        <span className="text-sm">
                          {propertyParam} - {ownerParam}様
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {unreadCount > 0 && (
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {unreadCount}件の未読
                  </div>
                )}
              </div>
            </div>

            <div className="flex h-96">
              {/* メッセージ一覧 */}
              <div className="w-full md:w-1/3 border-r border-gray-200 bg-gray-50">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="font-semibold text-gray-800 mb-3">
                    メッセージ一覧
                  </h2>
                  {/* 検索ボックス */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="メッセージを検索..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>
                <div className="overflow-y-auto h-[calc(100%-120px)]">
                  {filteredMessages.length > 0 ? (
                    filteredMessages.map((message) => (
                      <div
                        key={message.id}
                        onClick={() => setSelectedMessage(message)}
                        className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors ${
                          selectedMessage?.id === message.id
                            ? "bg-indigo-50 border-indigo-200"
                            : ""
                        } ${!message.isRead ? "bg-blue-50" : ""} ${
                          ownerParam && message.sender === ownerParam
                            ? "bg-yellow-50"
                            : ""
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-gray-900 truncate">
                                {message.sender}
                                {ownerParam &&
                                  message.sender === ownerParam && (
                                    <span className="ml-2 text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
                                      オーナー
                                    </span>
                                  )}
                              </p>
                              <div className="flex items-center space-x-1 text-xs text-gray-500">
                                <Clock className="h-3 w-3" />
                                <span>{formatTime(message.timestamp)}</span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 truncate mt-1">
                              {message.content}
                            </p>
                            {!message.isRead && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>検索結果が見つかりません</p>
                    </div>
                  )}
                </div>
              </div>

              {/* メッセージ詳細 */}
              <div className="hidden md:flex flex-1 flex-col">
                {selectedMessage ? (
                  <>
                    {/* メッセージ詳細ヘッダー */}
                    <div className="p-4 border-b border-gray-200 bg-white">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {selectedMessage.sender}
                            {ownerParam &&
                              selectedMessage.sender === ownerParam && (
                                <span className="ml-2 text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
                                  オーナー
                                </span>
                              )}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {formatTime(selectedMessage.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* メッセージ内容 */}
                    <div className="flex-1 p-4 overflow-y-auto bg-white">
                      <div className="bg-gray-100 rounded-lg p-4">
                        <p className="text-gray-800">
                          {selectedMessage.content}
                        </p>
                      </div>
                    </div>

                    {/* 返信フォーム */}
                    <div className="p-4 border-t border-gray-200 bg-white">
                      <div className="flex space-x-2">
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
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        <button
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim()}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Send className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center bg-gray-50">
                    <div className="text-center text-gray-500">
                      <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>メッセージを選択してください</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
