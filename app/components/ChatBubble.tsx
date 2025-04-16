"use client";

import React from 'react';
import { cn } from "@/lib/utils";
import ReactMarkdown from 'react-markdown';

interface ChatBubbleProps {
    toolResult?: React.ReactNode;
    toolResultTitle?: string;
    toolResultContent?: React.ReactNode;
    content: string;
    isUser?: boolean;
    className?: string;
}

export function ChatBubble({ toolResult, toolResultTitle, toolResultContent, content, isUser = false, className }: ChatBubbleProps) {
    const [open, setOpen] = React.useState(false);
    return (
        <div className={cn(
            "flex w-full mb-4",
            isUser ? "justify-end" : "justify-start",
            className
        )}>
            <div className={cn(
                "max-w-[80%] rounded-lg px-4 py-2 text-sm",
                isUser
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
            )}>
                {toolResult && (
                    <div className="mb-2">
                        <button
                            className="text-xs text-blue-600 underline hover:text-blue-800 focus:outline-none"
                            onClick={() => setOpen((v) => !v)}
                            type="button"
                        >
                            {open ? '▼' : '▶'} {`${toolResultTitle}を実行しました` || 'ツールの実行結果を表示'}
                        </button>
                        {open && (
                            <div className="mt-1 p-2 bg-gray-50 border rounded text-xs whitespace-pre-wrap">
                                {toolResultContent || toolResult}
                            </div>
                        )}
                    </div>
                )}
                <div className="whitespace-pre-wrap">
                  <ReactMarkdown>{content}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
}

interface ChatExampleProps {
    messages: {
        content: string;
        isUser: boolean;
    }[];
    className?: string;
}

export function ChatExample({ messages, className }: ChatExampleProps) {
    return (
        <div className={cn("border rounded-lg p-4 bg-white shadow-sm my-4", className)}>
            {messages.map((message, index) => (
                <ChatBubble
                    key={index}
                    content={message.content}
                    isUser={message.isUser}
                />
            ))}
        </div>
    );
}
