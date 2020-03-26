const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db.sqlite');

const POSTS_SCHEMA = `
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo VARCHAR(50) NOT NULL,
    conteudo VARCHAR(140)
  )
  `;

const USUARIOS_SCHEMA = `
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(40) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
  )
  `;

db.serialize(() => {
  db.run('PRAGMA foreign_keys=ON');
  db.run(POSTS_SCHEMA);
  db.run(USUARIOS_SCHEMA);

  db.each('SELECT * FROM usuarios', (err, usuario) => {
    console.log('Usuarios: ');
    console.log(usuario);
  });
});

process.on('SIGINT', () =>
  db.close(() => {
    process.exit(0);
  })
);

module.exports = db;
