const express = require('express');
const app = express();

app.use(express.json());

function processData(array) {
    let numbers = array.filter(item => typeof item === 'number');
    let alphabets = array.filter(item => typeof item === 'string' && /^[a-zA-Z]$/.test(item));
    let highestLowercase = alphabets.filter(item => item === item.toLowerCase())
                                     .sort()
                                     .pop();

    return { numbers, alphabets, highestLowercase };
}

app.post('/api', (req, res) => {
    const { user_id, college_email, college_roll_number, array } = req.body;
    const { numbers, alphabets, highestLowercase } = processData(array);

    res.json({
        status: "success",
        user_id,
        college_email,
        college_roll_number,
        numbers,
        alphabets,
        highest_lowercase: highestLowercase
    });
});

app.get('/api', (req, res) => {
    res.json({ message: "Please use POST method to submit data." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
