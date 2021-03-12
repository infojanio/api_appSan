import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

export default {
    
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'tmp'),//salva sempre na pasta tmp

        //garante que o nome do arquivo nao será igual
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString('hex');
            const fileName = `${fileHash}-${file.originalname}`
            
            return callback(null, fileName);
        }
    }),
};