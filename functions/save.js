const axios = require('axios');

// Получаем переменные окружения
const BIN_ID = process.env.BIN_ID;
const MASTER_KEY = process.env.MASTER_KEY;

exports.handler = async function(event) {
    // Добавляем CORS-заголовки
    const headers = {
        'Access-Control-Allow-Origin': '*', // Разрешаем все домены
        'Access-Control-Allow-Methods': 'POST', // Разрешаем метод POST
        'Access-Control-Allow-Headers': 'Content-Type', // Разрешаем Content-Type
    };

    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
        };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Метод не поддерживается' };
    }

    const reports = JSON.parse(event.body);

    try {
        await axios.put(
            `https://api.jsonbin.io/v3/b/ ${BIN_ID}`,
            reports,
            {
                headers: {
                    'X-Master-Key': MASTER_KEY,
                    'Content-Type': 'application/json'
                }
            }
        );

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ success: true })
        };
    } catch (error) {
        console.error("Ошибка сохранения:", error.message);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ success: false, error: 'Не удалось сохранить данные' })
        };
    }
};
