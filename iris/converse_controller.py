from fastapi import APIRouter, Form, UploadFile, File, Query
from typing import List
from pydantic import BaseModel
from fastapi import FastAPI
from services import freestyle_service, transcribe_voice_service

router = APIRouter(
    prefix="/Inference",
    responses={
        200: {"description": "Successful Summarization"},
        400: {"description": "Bad Request, check request configuration"},
        500: {"description": "Internal Server Error"}
    },
    tags=["Inference"]
)


@router.post("/freestyle", description="Instructions and files")
async def free_form(
        prompt: str = Form(description="Instruction to follow or Question"),
        history: str = Form(default="[]", description="Log History"),
        file: UploadFile = File(default=None, description="The file attached"),
        notes: str = Form(default=None, description="Any notes"),
        temp: float = Form(default=0.05, description="temp"),
        pres: float = Form(default=0.00, description="Presence Penalty"),
        freq: float = Form(default=0.0, description="Frequency penalty")
):
    return await freestyle_service(prompt, history, notes, file, temp, pres, freq)


@router.post("/transcribeVoice", description="Transcribes voice")
async def transcribe_voice(
        file: UploadFile = File(default=None, description="voice file only"),
):
    print(file)
    file_location = f"audio/{file.filename}"
    with open(file_location, "wb+") as file_object:
        file_object.write(file.file.read())
        file_object.close()
    return await transcribe_voice_service(file_location)
