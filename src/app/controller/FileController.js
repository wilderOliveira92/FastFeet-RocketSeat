import File from '../models/File';
import Deliveryman from '../models/Deliveryman';

class FileController {
    async store(req, res) {

        const delivExists = await Deliveryman.findByPk(req.query.id);

        if (!delivExists) {
            return res.status(400).json({ error: 'Deliveryman not exists.' })
        }

        const { originalname: name, filename: path } = req.file;
        const file = await File.create({
            name,
            path,
        });

        await delivExists.update({
            avatar_id: file.id
        });


        return res.json(delivExists);
    }
}

export default new FileController();
