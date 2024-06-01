const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./bot.db');

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, message TEXT)');
  const stmt = db.prepare('INSERT INTO messages (message) VALUES (?)');

  const messages = ["Hello!", "How can I help you?", "Have a nice day!", "Goodbye!"];
  messages.forEach((msg) => {
    stmt.run(msg);
  });

  stmt.finalize();
});

db.close();
