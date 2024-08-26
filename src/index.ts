import 'reflect-metadata';
import { AppDataSource } from './data-source';
import { Image } from './entity/Image';
import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

// Настройка хранилища для multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

const startServer = async () => {
  await AppDataSource.initialize();

  const app = express();
  const port = 8080;

  app.post('/upload', upload.single('image'), async (req, res) => {
    const imageRepository = AppDataSource.getRepository(Image);

    try {
      const image = new Image();
      image.filename = req.file?.originalname || '';
      await imageRepository.save(image);

      res.status(200).json(image);
    } catch (err) {
      console.error('Ошибка при обработке изображения:', err);
      res.status(500).send('Ошибка при обработке изображения');
    }
  });

  app.get('/images', async (req, res) => {
    // 'http://192.168.8.100:8080/images/filename/'
    try {
      const imageRepository = AppDataSource.getRepository(Image);
      const images = await imageRepository.find();
      const result = images.map(item => {
        return {
          ...item,
          filepath: 'http://' + req.headers.host + '/images/filename/' + item.filename
        }
      })
      res.json(result);
    } catch (err) {
      console.error('Ошибка при получении изображений:', err);
      res.status(500).send('Ошибка при получении изображений');
    }
  });

  app.get('/images/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const imageRepository = AppDataSource.getRepository(Image);
      const [image] = await imageRepository.find({
        where: {
          id: +id
        }
      });

      const result = {
        ...image,
        filepath: 'http://' + req.headers.host + '/images/filename/' + image.filename
      }
      res.json(result);
    } catch (err) {
      console.error('Ошибка при получении изображений:', err);
      res.status(500).send('Ошибка при получении изображений');
    }
  });

  app.get('/images/filename/:filename', (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, '..', 'uploads', filename);

    if (fs.existsSync(filepath)) {
      res.sendFile(filepath);
    } else {
      res.status(404).send('Файл не найден');
    }
  });

  app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
  });
};

startServer().catch(error => console.log(error));
