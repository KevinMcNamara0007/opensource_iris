from fastapi import APIRouter, Form, UploadFile, File, Query

from services import freestyle_service

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
        file: UploadFile = File(default=None, description="The file attached"),
        notes: str = Form(default=None, description="Any notes"),
        temp: float = Form(default=0.05, description="temp"),
        pres: float = Form(default=0.00, description="Prescence Penalty"),
        freq: float = Form(default=0.0, description="Frequence pnealty")
):
    return await freestyle_service(prompt, notes, file, temp, pres, freq)