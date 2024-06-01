const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// SQLiteデータベース接続
const db = new sqlite3.Database('./bot.db', (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// ランダムメッセージ取得関数
const getRandomMessage = (callback) => {
  db.get('SELECT message FROM messages ORDER BY RANDOM() LIMIT 1', [], (err, row) => {
    if (err) {
      console.error('Error fetching message from database', err);
      return callback(null);
    }
    callback(row ? row.message : "No messages found in database.");
  });
};

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    // チャットボットの応答
    getRandomMessage((response) => {
      io.emit('chat message', `Bot: ${response}`);
    });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
