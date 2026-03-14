 
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logInteraction, getInteractions, generateEmail, summarizeNotes, clearResponses } from '../features/interactions/interactionSlice';

const LogInteraction = () => {
  const dispatch = useDispatch();
  const { currentResponse, interactions, email, summary, loading } = useSelector((state) => state.interactions);
  
  const [formData, setFormData] = useState({
    hcpName: '',
    topic: '',
    followUp: '',
  });
  
  const [chatInput, setChatInput] = useState('');
  const [emailData, setEmailData] = useState({ name: '', product: '' });
  const [notes, setNotes] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(logInteraction(formData));
    setFormData({ hcpName: '', topic: '', followUp: '' });
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    dispatch(logInteraction({ hcpName: chatInput, topic: 'chat', followUp: '' }));
    setChatInput('');
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#333', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>HCP Interaction Logger</h1>
      
      {/* Structured Form */}
      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        <h2 style={{ color: '#007bff' }}>📝 Log Interaction (Form)</h2>
        <form onSubmit={handleFormSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <input
              type="text"
              placeholder="HCP Name (e.g., Dr. Sharma)"
              value={formData.hcpName}
              onChange={(e) => setFormData({ ...formData, hcpName: e.target.value })}
              style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
              required
            />
            <input
              type="text"
              placeholder="Topic Discussed (e.g., diabetes drug)"
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
              required
            />
            <input
              type="text"
              placeholder="Follow-up (e.g., Send samples next week)"
              value={formData.followUp}
              onChange={(e) => setFormData({ ...formData, followUp: e.target.value })}
              style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <button type="submit" disabled={loading} style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>
            {loading ? 'Logging...' : 'Log Interaction'}
          </button>
        </form>
      </div>

      {/* Chat Interface */}
      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        <h2 style={{ color: '#28a745' }}>💬 Log Interaction (Chat)</h2>
        <form onSubmit={handleChatSubmit}>
          <textarea
            placeholder="Type your interaction (e.g., 'Met Dr. Smith about diabetes drug, he requested samples. Follow up next week.')"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            style={{ width: '100%', padding: '10px', minHeight: '100px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc', fontFamily: 'Inter' }}
            required
          />
          <button type="submit" disabled={loading} style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>
            {loading ? 'Processing...' : 'Send to AI Agent'}
          </button>
        </form>
        {currentResponse && (
          <div style={{ marginTop: '15px', padding: '15px', background: '#e9ecef', borderRadius: '4px', borderLeft: '4px solid #28a745' }}>
            <strong>🤖 AI Response:</strong> {currentResponse}
          </div>
        )}
      </div>

      {/* View Interactions */}
      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        <h2 style={{ color: '#17a2b8' }}>📋 Recent Interactions</h2>
        <button 
          onClick={() => dispatch(getInteractions())}
          style={{ padding: '10px 20px', background: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '15px', fontSize: '16px' }}
        >
          Refresh Interactions
        </button>
        <pre style={{ background: '#e9ecef', padding: '15px', borderRadius: '4px', maxHeight: '200px', overflow: 'auto', border: '1px solid #ccc' }}>
          {interactions || 'No interactions yet. Click refresh to load.'}
        </pre>
      </div>

      {/* Email Generator */}
      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        <h2 style={{ color: '#fd7e14' }}>📧 Generate Follow-up Email</h2>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="HCP Name"
            value={emailData.name}
            onChange={(e) => setEmailData({ ...emailData, name: e.target.value })}
            style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            type="text"
            placeholder="Product/Discussion"
            value={emailData.product}
            onChange={(e) => setEmailData({ ...emailData, product: e.target.value })}
            style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <button 
          onClick={() => dispatch(generateEmail(emailData))}
          disabled={loading}
          style={{ padding: '10px 20px', background: '#fd7e14', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
        >
          Generate Email
        </button>
        {email && (
          <div style={{ marginTop: '15px', padding: '15px', background: '#e9ecef', borderRadius: '4px', borderLeft: '4px solid #fd7e14' }}>
            <strong>📧 Generated Email:</strong>
            <p style={{ whiteSpace: 'pre-wrap' }}>{email}</p>
          </div>
        )}
      </div>

      {/* Meeting Summary */}
      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        <h2 style={{ color: '#dc3545' }}>📝 Meeting Notes Summary</h2>
        <textarea
          placeholder="Paste your meeting notes here..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={{ width: '100%', padding: '10px', minHeight: '100px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button 
          onClick={() => dispatch(summarizeNotes(notes))}
          disabled={loading}
          style={{ padding: '10px 20px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
        >
          Summarize Notes
        </button>
        {summary && (
          <div style={{ marginTop: '15px', padding: '15px', background: '#e9ecef', borderRadius: '4px', borderLeft: '4px solid #dc3545' }}>
            <strong>📋 Summary:</strong> {summary}
          </div>
        )}
      </div>
    </div>
  );
};

export default LogInteraction;