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

        const list = await openai.models.list();
        // console.log("Available models:", list.data.map(m => m.id).filter(id => id.includes('gpt-image')));

        const prePrompt = `
        Retro pixel-art game object.

        Pixel art style.
        Simple chunky shapes.
        Bright arcade colors.
        Clean game asset design.
        Front-facing 2D object.
        Single centered object.
        Pure white background.
        Soft arcade style.
        `;

        const finalPrompt = `${userPrompt}${prePrompt}`
        const resImg = await openai.images.generate({
            model: "gpt-image-2",
            prompt: finalPrompt,
            size: "1024x1024"
        });

        
        // const imgUrl = resImg.data[0].url;
        // console.log(imgUrl);
        // res.json({url: imgUrl});


        const img = resImg.data[0].b64_json;
        if (!img) {
            throw new Error("Image data is missing from OpenAI response");
        }
        res.json({ image: img });


    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => console.log("Running on http://localhost:3000"));