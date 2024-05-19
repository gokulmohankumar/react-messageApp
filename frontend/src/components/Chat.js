import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Chat.css';
export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [fromUser, setFromUser] = useState('');
  const [toUser, setToUser] = useState('');
  const [editMode, setEditMode] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    fetchMessages();
  }, []);
  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/messages');
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };
  const sendMessage = async () => {
    try {
      if (editMode) {
        await axios.put(`http://127.0.0.1:5000/messages/${editMode}`, {
          text: newMessage,
        });
        setEditMode(null);
      } else {
        await axios.post('http://127.0.0.1:5000/messages', {
          from: fromUser,
          to: toUser,
          text: newMessage,
        });
      }
      setNewMessage('');
      setFromUser('');
      setToUser('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  const handleSendButtonClick = () => {
    console.log('Send button clicked');
    sendMessage();
  };
  const handleEditButtonClick = (messageId, from, to, text) => {
    setEditMode(messageId);
    setFromUser(from);
    setToUser(to);
    setNewMessage(text);
  };
  const handleDeleteButtonClick = async (messageId) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/messages/${messageId}`);
      fetchMessages();
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };
  const cancelEdit = () => {
    setEditMode(null);
    setNewMessage('');
    setFromUser('');
    setToUser('');
  };
  const filteredMessages = messages.filter((message) => {
    const searchText = searchQuery.toLowerCase();
    return (
      message.from.toLowerCase().includes(searchText) ||
      message.to.toLowerCase().includes(searchText) ||
      message.text.toLowerCase().includes(searchText)
    );
  });
  return (
    <div className="chat-container">
      <div >
        <input class="search"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search messages..."
        />
      </div>
      <div><h1>CHAT COMMUNITY</h1></div>
      <div className="input-group">
        <label>From:</label><br />
        <input type="text" value={fromUser} onChange={(e) => setFromUser(e.target.value)} placeholder="From" required={!editMode} /><br />
        <label>To:</label><br />
        <input type="text" value={toUser} onChange={(e) => setToUser(e.target.value)} placeholder="To" required={!editMode} />
        <textarea
          type="text"
          rows={6}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          required={!editMode}
        /><br></br>
        {editMode ? (
          <>
            <button class="savebutton"onClick={() => sendMessage()}>Update</button>
            <button class="savebutton"onClick={cancelEdit}>Cancel</button>
          </>
        ) : (
          <button class="sendbutton"onClick={handleSendButtonClick}>Send</button>
        )}
      </div>
      <div class="messagecontainer">
      {filteredMessages.map((message) => (
        <div key={message.id} className="message-card">
          <div className="message-info">
            <div>
              <strong>From:</strong> {message.from}<br />
              <strong>To:</strong> {message.to}
            </div>
          </div>
          <div className="message-content">
            <strong>Message:</strong><br />
            {message.text}
            <div>
              <button class="ext-but"onClick={() => handleEditButtonClick(message.id, message.from, message.to, message.text)}>Edit</button>
              <button class="ext-but"onClick={() => handleDeleteButtonClick(message.id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}</div>
    </div>
  );
}
