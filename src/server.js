import * as path from 'path';
import { fileURLToPath } from 'url';
import  express from "express";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import * as dotenv from 'dotenv' 
dotenv.config()

const PORT = process.env.PORT || 3000;

const app = express();


app.use(express.static(path.join(__dirname, "../build")));
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});