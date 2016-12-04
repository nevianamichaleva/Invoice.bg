/* globals module */

const config = require("./config");

const data = require("./data")(config);

const app = require("./config/app")(data);

const controllers = require("./controllers")(data);

require("./routers")(app, controllers);

app.listen(config.port, () => console.log(`Running at :${config.port}`));