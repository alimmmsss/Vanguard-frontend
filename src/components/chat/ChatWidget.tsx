'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, ArrowLeft } from 'lucide-react';
import { io, Socket } from 'socket.io-client';

interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    timestamp: Date;
    sent: boolean; // true if sent by current user
}

interface Conversation {
    driverId: string;
    driverName: string;
    driverAvatar?: string;
    lastMessage: string;
    timestamp: Date;
    unread: number;
}

interface ChatWidgetProps {
    userId?: string; // Current user ID
    initialDriverId?: string; // If opening chat with specific driver
    initialDriverName?: string;
}

export default function ChatWidget({ userId, initialDriverId, initialDriverName }: ChatWidgetProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [view, setView] = useState<'list' | 'chat'>('list');
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [activeConversation, setActiveConversation] = useState<{ driverId: string; driverName: string } | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageInput, setMessageInput] = useState('');
    const [socket, setSocket] = useState<Socket | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initialize Socket.IO connection
    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
        const wsUrl = apiUrl.replace('http', 'ws');

        const newSocket = io(wsUrl, {
            transports: ['websocket'],
            autoConnect: true,
        });

        newSocket.on('connect', () => {
            console.log('Connected to chat server');
            if (userId) {
                newSocket.emit('register', userId);
            }
        });

        newSocket.on('message', (message: Message) => {
            setMessages(prev => [...prev, { ...message, sent: message.senderId === userId }]);
        });

        newSocket.on('conversations', (convos: Conversation[]) => {
            setConversations(convos);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [userId]);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // If initialDriverId is provided, open chat with that driver
    useEffect(() => {
        if (initialDriverId && initialDriverName && isOpen) {
            setActiveConversation({ driverId: initialDriverId, driverName: initialDriverName });
            setView('chat');
            // Load messages for this driver
            socket?.emit('loadMessages', { userId, driverId: initialDriverId });
        }
    }, [initialDriverId, initialDriverName, isOpen, socket, userId]);

    const handleSendMessage = () => {
        if (!messageInput.trim() || !activeConversation || !socket) return;

        const message: Message = {
            id: Date.now().toString(),
            senderId: userId || 'guest',
            receiverId: activeConversation.driverId,
            content: messageInput,
            timestamp: new Date(),
            sent: true,
        };

        socket.emit('sendMessage', message);
        setMessages(prev => [...prev, message]);
        setMessageInput('');
    };

    const openConversation = (driverId: string, driverName: string) => {
        setActiveConversation({ driverId, driverName });
        setView('chat');
        setMessages([]); // Clear previous messages
        socket?.emit('loadMessages', { userId, driverId });
    };

    const handleBackToList = () => {
        setView('list');
        setActiveConversation(null);
        setMessages([]);
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 bg-electric-teal hover:bg-teal-600 text-white rounded-full p-4 shadow-2xl transition-all hover:scale-110"
                aria-label="Open chat"
            >
                {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="bg-deep-slate-blue text-white p-4 flex items-center justify-between">
                        {view === 'chat' && (
                            <button
                                onClick={handleBackToList}
                                className="hover:bg-slate-700 p-1 rounded transition-colors"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </button>
                        )}
                        <h3 className="font-bold text-lg flex-1 text-center">
                            {view === 'list' ? 'Messages' : activeConversation?.driverName}
                        </h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-slate-700 p-1 rounded transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Content */}
                    {view === 'list' ? (
                        <div className="flex-1 overflow-y-auto">
                            {conversations.length === 0 ? (
                                <div className="flex items-center justify-center h-full text-slate-400">
                                    <p>No conversations yet</p>
                                </div>
                            ) : (
                                conversations.map((convo) => (
                                    <div
                                        key={convo.driverId}
                                        onClick={() => openConversation(convo.driverId, convo.driverName)}
                                        className="p-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="w-12 h-12 bg-electric-teal rounded-full flex items-center justify-center text-white font-bold">
                                                {convo.driverName.charAt(0)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <h4 className="font-semibold text-slate-800 truncate">{convo.driverName}</h4>
                                                    <span className="text-xs text-slate-400">
                                                        {new Date(convo.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-slate-600 truncate">{convo.lastMessage}</p>
                                                {convo.unread > 0 && (
                                                    <span className="inline-block mt-1 bg-electric-teal text-white text-xs px-2 py-0.5 rounded-full">
                                                        {convo.unread}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    ) : (
                        <>
                            {/* Chat Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
                                {messages.length === 0 ? (
                                    <div className="flex items-center justify-center h-full text-slate-400">
                                        <p>Start a conversation</p>
                                    </div>
                                ) : (
                                    messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[70%] rounded-2xl px-4 py-2 ${msg.sent
                                                        ? 'bg-electric-teal text-white rounded-br-none'
                                                        : 'bg-white text-slate-800 rounded-bl-none border border-slate-200'
                                                    }`}
                                            >
                                                <p className="text-sm">{msg.content}</p>
                                                <span className={`text-xs mt-1 block ${msg.sent ? 'text-teal-100' : 'text-slate-400'}`}>
                                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Message Input */}
                            <div className="p-4 border-t border-slate-200 bg-white">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                        placeholder="Type a message..."
                                        className="flex-1 px-4 py-2 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-electric-teal focus:border-transparent"
                                    />
                                    <button
                                        onClick={handleSendMessage}
                                        disabled={!messageInput.trim()}
                                        className="bg-electric-teal hover:bg-teal-600 text-white p-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Send className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
}
