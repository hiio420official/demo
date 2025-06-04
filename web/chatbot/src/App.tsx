/**
 * 파일 생성 날짜: 2025-01-26
 * 챗봇 UI 컴포넌트
 * Mobile First 반응형 디자인으로 구현된 현대적인 챗봇 인터페이스
 */

import { useState, useRef, useEffect } from 'react'

// 메시지 타입 정의
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

/**
 * 챗봇 메인 애플리케이션 컴포넌트
 * @returns 챗봇 UI 컴포넌트
 */
function App() {
  // 메시지 상태 관리
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '안녕하세요! 무엇을 도와드릴까요?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  
  // 입력 필드 상태 관리
  const [inputValue, setInputValue] = useState<string>('');
  
  // 로딩 상태 관리
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // 채팅 컨테이너 참조
  const messagesEndRef = useRef<HTMLDivElement>(null);

  /**
   * 메시지 영역을 맨 아래로 스크롤
   * @returns {void}
   */
  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 새 메시지가 추가될 때마다 스크롤을 맨 아래로 이동
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /**
   * 메시지 전송 처리
   * @param {string} text - 전송할 메시지 텍스트
   * @returns {void}
   */
  const sendMessage = (text: string): void => {
    if (!text.trim()) return;

    // 사용자 메시지 추가
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // 봇 응답 시뮬레이션 (실제 구현에서는 API 호출)
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `"${text}"에 대한 응답입니다. 더 자세한 정보가 필요하시면 언제든 말씀해 주세요!`,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000);
  };

  /**
   * 폼 제출 핸들러
   * @param {React.FormEvent} e - 폼 이벤트
   * @returns {void}
   */
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  /**
   * 시간 포맷팅
   * @param {Date} timestamp - 포맷팅할 시간
   * @returns {string} - 포맷된 시간 문자열
   */
  const formatTime = (timestamp: Date): string => {
    return timestamp.toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-100 md:p-4">
      {/* 헤더 */}
      <div className="bg-white shadow-lg rounded-t-xl md:rounded-xl border-b border-gray-200 p-4 md:p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold text-gray-900">AI 챗봇</h1>
            <p className="text-sm text-gray-500">온라인</p>
          </div>
        </div>
      </div>

      {/* 메시지 영역 */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-white md:bg-transparent">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] md:max-w-[70%] ${
              message.isUser 
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl rounded-br-md' 
                : 'bg-gray-100 text-gray-900 rounded-2xl rounded-bl-md'
            } px-4 py-3 shadow-sm`}>
              <p className="text-sm md:text-base leading-relaxed">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.isUser ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        
        {/* 로딩 인디케이터 */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* 입력 영역 */}
      <div className="bg-white shadow-lg rounded-b-xl md:rounded-xl border-t border-gray-200 p-4 md:p-6">
        <form onSubmit={handleSubmit} className="flex space-x-2 md:space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="메시지를 입력하세요..."
              className="w-full px-4 py-3 md:py-4 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm md:text-base"
              disabled={isLoading}
            />
            {inputValue && (
              <button
                type="button"
                onClick={() => setInputValue('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 md:p-4 rounded-full hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
        
        {/* 빠른 응답 버튼들 */}
        <div className="flex flex-wrap gap-2 mt-3 md:mt-4">
          {['안녕하세요', '도움말', '문의하기'].map((quickReply) => (
            <button
              key={quickReply}
              onClick={() => sendMessage(quickReply)}
              disabled={isLoading}
              className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {quickReply}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
