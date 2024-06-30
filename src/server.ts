import 'dotenv/config'
import cors from 'cors';
import express, { Request, Response } from 'express';
import { PutObjectCommand } from '@aws-sdk/client-s3'
import s3Client from './config/s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';


const app = express();

app.use(cors())

app.use(express.json());

// rota que devolve a url pré assinada do bucket
app.post('/image', async (req: Request, res: Response) => {
	const { filename, folder } = req.body;

	// validação
	if (!filename) {
		return res.status(400).json({status: 400, message: 'Nome do arquivo é obrigatório'});
	}

	const command = new PutObjectCommand({
		Bucket: process.env.AWS_BUCKET,
		Key: folder ? `${folder}/${filename}` : filename,
		ACL: 'public-read',
	});

	try {
		const url = await getSignedUrl(s3Client, command, { expiresIn: 60 * 5 }); // URL válida por 5 minutos
		res.status(200).json({ url });
	} catch (error) {
		console.error('Erro ao gerar URL assinada', error);
		res.status(500).send('Erro ao gerar URL assinada');
	}
});

const port = process.env.PORT || 3000

app.listen(port, () => {
	console.log(`🚀 Servidor rodando na porta ${port}`);
});
