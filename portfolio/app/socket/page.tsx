'use client';

import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Connect to the Go server
    const socket = new WebSocket('ws://localhost:8080/ws');

    socket.onopen = () => {
      console.log('Connected to Go server');
    };

    socket.onmessage = (event) => {
      // When the server sends a message, add it to our list
      setMessages((prev) => [...prev, event.data]);
    };

    ws.current = socket;

    // Cleanup on unmount
    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws.current && input) {
      ws.current.send(input);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-4">
      <h1 className="text-2xl font-bold">Go + Next.js WebSocket</h1>

      <div className="border p-4 h-64 w-full max-w-md overflow-y-auto bg-gray-100 text-black rounded">
        {messages.map((msg, i) => (
          <div key={i} className="border-b p-1">{msg}</div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
            // Added "bg-white" here so you can see what you type!
            className="border p-2 rounded text-black bg-white" 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            />
        <button 
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}