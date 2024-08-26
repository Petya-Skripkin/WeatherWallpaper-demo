"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const data_source_1 = require("./data-source");
const Image_1 = require("./entity/Image");
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Настройка хранилища для multer
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield data_source_1.AppDataSource.initialize();
    const app = (0, express_1.default)();
    const port = 8080;
    app.post('/upload', upload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const imageRepository = data_source_1.AppDataSource.getRepository(Image_1.Image);
        try {
            const image = new Image_1.Image();
            image.filename = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname) || '';
            yield imageRepository.save(image);
            res.status(200).json(image);
        }
        catch (err) {
            console.error('Ошибка при обработке изображения:', err);
            res.status(500).send('Ошибка при обработке изображения');
        }
    }));
    app.get('/images', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // 'http://192.168.8.100:8080/images/filename/'
        try {
            const imageRepository = data_source_1.AppDataSource.getRepository(Image_1.Image);
            const images = yield imageRepository.find();
            const result = images.map(item => {
                return Object.assign(Object.assign({}, item), { filepath: 'http://' + req.headers.host + '/images/filename/' + item.filename });
            });
            res.json(result);
        }
        catch (err) {
            console.error('Ошибка при получении изображений:', err);
            res.status(500).send('Ошибка при получении изображений');
        }
    }));
    app.get('/images/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const imageRepository = data_source_1.AppDataSource.getRepository(Image_1.Image);
            const [image] = yield imageRepository.find({
                where: {
                    id: +id
                }
            });
            const result = Object.assign(Object.assign({}, image), { filepath: 'http://' + req.headers.host + '/images/filename/' + image.filename });
            res.json(result);
        }
        catch (err) {
            console.error('Ошибка при получении изображений:', err);
            res.status(500).send('Ошибка при получении изображений');
        }
    }));
    app.get('/images/filename/:filename', (req, res) => {
        const filename = req.params.filename;
        const filepath = path_1.default.join(__dirname, '..', 'uploads', filename);
        if (fs_1.default.existsSync(filepath)) {
            res.sendFile(filepath);
        }
        else {
            res.status(404).send('Файл не найден');
        }
    });
    app.listen(port, () => {
        console.log(`Сервер запущен на порту ${port}`);
    });
});
startServer().catch(error => console.log(error));
