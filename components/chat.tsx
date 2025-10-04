'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Send, Bot } from 'lucide-react';

export default function Chat() {
  const { messages, sendMessage, status, stop, error } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 메시지가 추가될 때마다 스크롤을 맨 아래로
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Enter 키로 메시지 전송 (Shift+Enter는 줄바꿈)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && status === 'ready') {
        sendMessage({ text: input });
        setInput('');
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* 헤더 섹션 */}
      <div className="flex items-center justify-between p-4 bg-white">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-purple-100 text-purple-600">
              <Bot className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-gray-900 text-sm sm:text-base">AI Assistant</h2>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs sm:text-sm text-gray-500">Online</span>
            </div>
          </div>
        </div>
      </div>
      <Separator />

      {/* 채팅 메시지 영역 */}
      <ScrollArea className="flex-1 bg-gray-50">
        <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-4 min-h-[400px]">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <Bot className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">AI Assistant</h3>
            <p className="text-sm sm:text-base text-gray-500 max-w-sm">
              안녕하세요! 무엇을 도와드릴까요? 질문을 입력해주세요.
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            } animate-in slide-in-from-bottom-2 duration-300`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div
              className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 py-2 sm:px-4 sm:py-3 ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-900 shadow-sm'
              }`}
            >
              <div>
                {message.parts.map((part, index) =>
                  part.type === 'text' ? (
                    <span key={index} className="whitespace-pre-wrap text-xs sm:text-sm">
                      {part.text}
                    </span>
                  ) : null,
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />

        {/* 로딩 상태 표시 */}
        {(status === 'submitted' || status === 'streaming') && (
          <div className="flex justify-start animate-in slide-in-from-bottom-2 duration-300">
            <div className="bg-gray-100 rounded-2xl px-4 py-3 max-w-[80%] shadow-sm">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm text-gray-600">
                  {status === 'submitted' ? '응답 대기 중...' : '응답 생성 중...'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 에러 상태 표시 */}
        {error && (
          <div className="flex justify-start animate-in slide-in-from-bottom-2 duration-300">
            <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 max-w-[80%] shadow-sm">
              <div className="text-red-800 font-medium text-sm mb-1">오류가 발생했습니다</div>
              <div className="text-red-600 text-xs mb-2">
                AI 응답을 받는 중 문제가 발생했습니다.
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => window.location.reload()}
                className="text-red-600 border-red-300 hover:bg-red-50 text-xs h-6 transition-all duration-200 hover:scale-105"
              >
                다시 시도
              </Button>
            </div>
          </div>
        )}
        </div>
      </ScrollArea>

      <Separator />
      {/* 입력 폼 - 화면 하단에 고정 */}
      <div className="bg-white p-3 sm:p-4">
        <form
          onSubmit={e => {
            e.preventDefault();
            if (input.trim()) {
              sendMessage({ text: input });
              setInput('');
            }
          }}
          className="flex items-center"
        >
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={status !== 'ready'}
              placeholder="무엇이든 물어보세요!"
              className="rounded-full border-purple-200 focus:border-purple-400 focus:ring-purple-400 pr-10 sm:pr-12 text-sm sm:text-base transition-all duration-200"
            />
            <Button
              type="submit"
              disabled={status !== 'ready' || !input.trim()}
              size="sm"
              className={`absolute right-1.5 top-1/2 transform -translate-y-1/2 h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 p-0 transition-all duration-200 ${
                status === 'ready' && input.trim() 
                  ? 'scale-100 opacity-100' 
                  : 'scale-90 opacity-50'
              }`}
            >
              <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
