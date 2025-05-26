const axios = require('axios');

// Эти данные будем брать из переменных окружения
const BIN_ID = process.env.BIN_ID;
const MASTER_KEY = process.env.MASTER_KEY;

exports.handler = async function(event) {
    const { body } = event;

    try {
        await axios.put(
            `https://api.jsonbin.io/v3/b/ ${BIN_ID}`,
            body,
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
        console.error('Ошибка при сохранении:', error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: 'Не удалось сохранить данные' })
        };
    }
};
