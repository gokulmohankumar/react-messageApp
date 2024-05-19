const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;
let messages = [];
app.use(express.json());
app.use(cors());
// Get all chat messages
app.get('/messages', (req, res) => {
  res.json(messages);
});
// Get a specific chat message by ID
app.get('/messages/:id', (req, res) => {
  const messageId = req.params.id;
  const message = messages.find((msg) => msg.id === messageId);
  if (!message) {
    return res.status(404).json({ message: 'Message not found' });
  }
  res.json(message);
});
app.post('/messages', (req, res) => {
    const { from, to, text } = req.body;
    const newMessage = { id: Date.now().toString(), from, to, text };
    messages.push(newMessage);
    res.status(201).json(newMessage);
  });
// Update an existing chat message
app.put('/messages/:id', (req, res) => {
  const messageId = req.params.id;
  const { text } = req.body;
  const messageIndex = messages.findIndex((msg) => msg.id === messageId);
  if (messageIndex === -1) {
    return res.status(404).json({ message: 'Message not found' });
  }
  messages[messageIndex] = { ...messages[messageIndex], text };
  res.json(messages[messageIndex]);
});
// Delete an existing chat message
app.delete('/messages/:id', (req, res) => {
  const messageId = req.params.id;
  messages = messages.filter((msg) => msg.id !== messageId);
  res.status(204).send();
});
app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
