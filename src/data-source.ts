import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Image } from './entity/Image';

export const AppDataSource = new DataSource({
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
