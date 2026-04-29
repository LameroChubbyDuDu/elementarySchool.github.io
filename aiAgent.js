import OpenAI from "openai";
import 'dotenv/config';

import express from 'express';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
// app.post('get-api-key', async(req, res) => {
    
// });

app.post('/generate-img', async (req, res) => {
    try {
        const userPrompt = req.body.prompt;
        console.log("get the prompt", userPrompt);

        const prePrompt = '，像素風格，嚴格限制為正前方扁平2D視角(Front flat sprite view)，且必須無立體感(0% depth)，無任何透視(No perspective)，背景必須為純白色，以32*32為大小去生成，不准添加邊框、色票或是其他任何裝飾，且所有物件必須完整顯現在畫面中央，四周需保留一點純白邊距(with wide safe white padding)。'
        const finalPrompt = `${userPrompt}${prePrompt}`
        const resImg = await openai.images.generate({
            model: "dall-e-3",
            prompt: finalPrompt,
            size: "1024x1024",
            response_format: "b64_json"
        });

        // const imgUrl = resImg.data[0].url;
        // console.log(imgUrl);
        // res.json({url: imgUrl});
        

        const img = resImg.data[0].b64_json;
        res.json({image: img});
        

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, ()=> console.log("Running on http://localhost:3000"));