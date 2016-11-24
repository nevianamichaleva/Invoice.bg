/* globals require */

"use strict";

const config = require("./config");
// const app = require("./config/application");
const data = require("./data")(config);

console.log(data);