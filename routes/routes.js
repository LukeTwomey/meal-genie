module.exports = (app) => {
    app.get('/api/test', (req, res) => {
        res.json({
            greeting: 'Hi from the API'
        });
    })
}