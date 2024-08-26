"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "qwedsa",
    "database": "image_db",
    "synchronize": true,
    "logging": false,
    "entities": ["src/entity/**/*.js", "src/entity/**/*.ts"]
});
