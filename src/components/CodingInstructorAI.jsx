
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Code, BookOpen, History, Settings, Lightbulb, Send } from 'lucide-react';

export default function CodingInstructorAI() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_GEMINI_API_KEY);

  const popularTopics = [
    'Arrays',
    'Python Decorators',
    'React Hooks',
    'Recursion Patterns',
    'Async/Await'
  ];

  const handleSubmit = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setResponse('');

    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: question
            }]
          }],
          systemInstruction: {
            parts: [{
              text: `You are a Data structure and Algorithm Instructor. You will only reply to the questions related to
                    Data structure and Algorithm. You have to solve query of user in simplest way
                    If user ask any question which is not related to Data structure and Algorithm, reply him rudely
                    Example: If user ask, How are you
                    You will reply: You dumb ask me some sensible question, like this message

                    You have to reply him rudely if question is not related to Data structure
                    Else reply him politely with simple explanation',

                    anything more than that you have to reply him politely with simple explanation
                    
                    if user ask you anything except Data structure and Algorithm, you have to reply him pleasantly that please ask me Data structure and Algorithm related question only.`
            }]
          }
        })
      });

      const data = await res.json();
      
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        setResponse(data.candidates[0].content.parts[0].text);
      } else {
        setResponse('Error: Unable to get response from AI');
      }
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    }
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: '#111827',
      color: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Sidebar */}
      <div style={{
        width: '256px',
        backgroundColor: '#1f2937',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: '#4f46e5',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Code size={24} />
          </div>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Code Mentor</div>
            <div style={{ fontSize: '12px', color: '#818cf8' }}>AI</div>
          </div>
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { id: 'dashboard', icon: Lightbulb, label: 'Dashboard' },
            { id: 'history', icon: History, label: 'History' },
            { id: 'tutorials', icon: BookOpen, label: 'Tutorials' },
            { id: 'playground', icon: Code, label: 'Playground' },
            { id: 'settings', icon: Settings, label: 'Settings' }
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '8px',
                backgroundColor: activeTab === id ? '#4f46e5' : 'transparent',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => {
                if (activeTab !== id) e.currentTarget.style.backgroundColor = '#374151';
              }}
              onMouseOut={(e) => {
                if (activeTab !== id) e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Icon size={20} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div style={{ fontSize: '12px', color: '#6b7280', marginTop: 'auto' }}>
          Code Mentor AI v2.0<br />
          Powered by Gemini API
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '32px', overflowY: 'auto', backgroundColor: '#111827' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', margin: 0 }}>
              Coding Instructor <span style={{ color: '#818cf8' }}>AI</span>
            </h1>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button style={{
                padding: '8px 16px',
                borderRadius: '8px',
                backgroundColor: 'transparent',
                border: 'none',
                color: 'white',
                cursor: 'pointer'
              }}>
                🌙 Dark Mode
              </button>
              <button style={{
                padding: '8px 16px',
                borderRadius: '8px',
                backgroundColor: 'transparent',
                border: 'none',
                color: 'white',
                cursor: 'pointer'
              }}>
                👤 Profile
              </button>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
            <div style={{ backgroundColor: '#1f2937', borderRadius: '12px', padding: '24px' }}>
              <div style={{ fontSize: '48px', marginBottom: '8px' }}>🏆</div>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#818cf8', marginBottom: '4px' }}>1,248</div>
              <div style={{ color: '#9ca3af' }}>Questions Solved</div>
            </div>
            <div style={{ backgroundColor: '#1f2937', borderRadius: '12px', padding: '24px' }}>
              <div style={{ fontSize: '48px', marginBottom: '8px' }}>📚</div>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#818cf8', marginBottom: '4px' }}>24</div>
              <div style={{ color: '#9ca3af' }}>Languages</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
            {/* Ask Question Section */}
            <div>
              <div style={{ backgroundColor: '#1f2937', borderRadius: '12px', padding: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#06b6d4' }}>●</span> Ask a Coding Question
                </h2>

                <div style={{
                  backgroundColor: 'rgba(67, 56, 202, 0.3)',
                  border: '1px solid #4338ca',
                  borderRadius: '8px',
                  padding: '16px',
                  marginBottom: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span style={{ color: '#818cf8', fontWeight: 'bold' }}>ℹ️</span>
                    <div style={{ fontSize: '14px' }}>
                      <strong>How to use:</strong> Ask any coding-related question in any programming language. The AI is specialized to help with concepts, algorithms, and debugging.
                      <br />
                      <span style={{ color: '#9ca3af' }}>For non-coding questions, responses may be unpredictable.</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                    ➤ Your Coding Question
                  </label>
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="e.g., Explain closures in JavaScript, How to implement binary search"
                    style={{
                      width: '100%',
                      backgroundColor: '#374151',
                      borderRadius: '8px',
                      padding: '16px',
                      color: 'white',
                      border: '1px solid #4b5563',
                      minHeight: '128px',
                      marginBottom: '16px',
                      fontFamily: 'inherit',
                      fontSize: '14px',
                      resize: 'vertical'
                    }}
                  />
                  <button
                    onClick={handleSubmit}
                    disabled={loading || !question.trim()}
                    style={{
                      width: '100%',
                      backgroundColor: loading || !question.trim() ? '#374151' : '#4f46e5',
                      borderRadius: '8px',
                      padding: '12px',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      border: 'none',
                      color: 'white',
                      cursor: loading || !question.trim() ? 'not-allowed' : 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => {
                      if (!loading && question.trim()) {
                        e.currentTarget.style.backgroundColor = '#4338ca';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!loading && question.trim()) {
                        e.currentTarget.style.backgroundColor = '#4f46e5';
                      }
                    }}
                  >
                    {loading ? (
                      <>
                        <div style={{
                          width: '20px',
                          height: '20px',
                          border: '2px solid white',
                          borderTopColor: 'transparent',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite'
                        }} />
                        Thinking...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Ask Question
                      </>
                    )}
                  </button>
                  <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>Press Ctrl+Enter to submit</p>
                </div>

                {response && (
                  <div style={{ marginTop: '24px', backgroundColor: '#374151', borderRadius: '8px', padding: '16px' }}>
                    <h3 style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '8px', color: '#818cf8' }}>AI Response:</h3>
                    <div style={{ whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: '1.6' }}>
                      {response}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Popular Topics */}
            <div>
              <div style={{ backgroundColor: '#1f2937', borderRadius: '12px', padding: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>🔥</span> Popular Topics
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {popularTopics.map((topic, index) => (
                    <button
                      key={index}
                      onClick={() => setQuestion(`Explain ${topic}`)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '12px 16px',
                        backgroundColor: '#374151',
                        borderRadius: '8px',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4b5563'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#374151'}
                    >
                      <span style={{ color: '#9ca3af' }}>▸</span>
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* {API Key Input} */}
          {/* <div style={{ marginTop: '32px', backgroundColor: '#1f2937', borderRadius: '12px', padding: '24px' }}>
            <h3 style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '14px', color: '#9ca3af' }}>API Configuration (Demo)</h3>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Google AI API Key"
              style={{
                width: '100%',
                backgroundColor: '#374151',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '14px',
                color: 'white',
                border: '1px solid #4b5563',
                fontFamily: 'monospace'
              }}
            />
            <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
              ⚠️ In production, use environment variables to secure your API key
            </p>
          </div> */}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}