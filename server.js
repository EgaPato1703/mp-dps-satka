const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.RAILWAY_STATIC_PORT || 8080;

// Путь к файлу для хранения сообщений
const DATA_FILE = path.join(__dirname, 'messages.json');

// Настройка CORS
app.use(cors());

// Поддержка JSON
app.use(express.json());

// Обслуживание статических файлов (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Получение всех сообщений
app.get('/api/messages', (req, res) => {
    const data = fs.readFileSync(DATA_FILE);
    res.json(JSON.parse(data));
});

// Добавление нового сообщения
app.post('/api/messages', (req, res) => {
    const newMessage = req.body;
    const data = fs.readFileSync(DATA_FILE);
    const messages = JSON.parse(data);

    // Удаляем старые сообщения (>1 час)
    const hourAgo = Date.now() - 60 * 60 * 1000;
    const validMessages = messages.filter(m => m.timestamp > hourAgo);

    validMessages.unshift(newMessage); // Добавляем новое в начало

    fs.writeFileSync(DATA_FILE, JSON.stringify(validMessages, null, 2));
    res.status(200).send('OK');
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
