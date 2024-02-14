from fastapi import APIRouter, Form, UploadFile, File


from services import freestyle_service, transcribe_voice_service, text_to_voice_service, get_audio_file_service

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


@router.post("/textToVoice", description="Text to Voice")
def text_to_voice(
        text: str = Form(description="Text to turn to voice"),
):
    return text_to_voice_service(text)


@router.post("/getAudioFile", description="gets voice file of returned response")
async def get_audio_file(
        file_name: str = Form(description="number of voice file"),
):
    return await get_audio_file_service(file_name)
