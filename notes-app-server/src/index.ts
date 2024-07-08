import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/api/notes", async (req, res) => {
    
    
    const notes = await prisma.note.findMany();

    res.json(notes);
});

app.post("/api/notes", async (req, res) => {
    
    const {title, content } = req.body;
    
    if(!title || !content) {
        return res
            .status(400)
            .send("Required fields are necessary!");
    }
    
    try {
        const note = await prisma.note.create({
            data: {title, content}
        });

        res.json(note);
    } catch (error) {
        res
            .status(500)
            .send("Ooops somenthing went wrong");
    }
});

app.listen(5000, () => {
    console.log("Server running on localhost:50 00")
});