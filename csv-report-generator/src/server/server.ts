import express, { Request, Response } from "express";
import cors from "cors";
const bodyParser = require("body-parser");
const generateHTML = require("./generateHtml").generateHTML;
const app = express();
const port = 4000;
app.use(cors());
app.use(express.static("dist/client"));
app.use(bodyParser.json());

app.get("/downloadFile/", (_req: Request, res: Response) => {
  const file = "text.txt";
  res.download(file, file, (err: any) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err
      });
    }
  });
});

app.post("/", (req: Request, res: Response) => {
  var responseHTML = generateHTML(req, (err: Error, result: string) => {
    if (err) {
      console.log("error" + err);
      res.end();
    }
    console.log(result);
  });
  res.status(200).json(responseHTML);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
