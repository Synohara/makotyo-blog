"use client";

import React from 'react';
import { cn } from "@/lib/utils";

interface ChatBubbleProps {
    content: string;
    isUser?: boolean;
    className?: string;
}

export function ChatBubble({ content, isUser = false, className }: ChatBubbleProps) {
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
                <div className="whitespace-pre-wrap">{content}</div>
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
