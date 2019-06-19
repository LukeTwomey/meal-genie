module.exports = (app) => {
    app.get('/api', (req, res) => {
        res.send("Hi from the API");
    })
}