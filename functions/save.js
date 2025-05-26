const axios = require('axios');

const BIN_ID = process.env.BIN_ID;
const MASTER_KEY = process.env.MASTER_KEY;

exports.handler = async function(event) {
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
            body: JSON.stringify({ success: true })
        };
    } catch (error) {
        console.log('Ошибка:', error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: 'Не удалось сохранить данные' })
        };
    }
};
