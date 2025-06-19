import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'owasp.json');

export default function handler(req, res) {
  try {
    const fileData = fs.readFileSync(dataPath, 'utf-8');
    let data = JSON.parse(fileData);

    if (req.method === 'GET') {
      res.status(200).json(data);
    } else if (req.method === 'POST') {
      const nueva = req.body;
      nueva.id = data.length ? Math.max(...data.map(v => v.id)) + 1 : 1;
      data.push(nueva);
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
      res.status(201).json({ message: 'Vulnerabilidad agregada', id: nueva.id });
    } else if (req.method === 'DELETE') {
      const { id } = req.body;
      const filtered = data.filter(v => v.id !== id);
      fs.writeFileSync(dataPath, JSON.stringify(filtered, null, 2));
      res.status(200).json({ message: 'Vulnerabilidad eliminada' });
    } else {
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Método ${req.method} no permitido`);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al manejar los datos' });
  }
}