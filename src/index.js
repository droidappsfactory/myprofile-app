const config = require('./config/config');
const app = require('./config/express');
// require('./config/mongoose');

app.listen(config.port || 5000, () => {
    console.info(`server started on port ${config.port} (${config.env})`);
});

module.exports = app;