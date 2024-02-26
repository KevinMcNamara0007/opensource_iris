from utilities import file_checker, customized_response, voice_transcription, text_to_speech, get_audio_file, \
    image_generation


async def freestyle_service(prompt, history, notes, file, temp, pres, freq):
    if file:
        file_content = await file_checker(file)
    else:
        file_content = ""
    prompt = f"INSTRUCTIONS: {prompt}.\n" \
             f"NOTES: {notes}.\n" \
             f"FILE: {file_content}.\n" \
             f"OUTPUT (Keep the result as straightforward and as minimal as possible): "
    return customized_response(prompt, history, temp=temp, presc_pen=pres, freq_pen=freq)


async def transcribe_voice_service(file):
    try:
        return voice_transcription(file)
    except Exception as exc:
        return f"failed to transcribe voice error: {exc}"


def text_to_voice_service(text):
    return text_to_speech(text)


def image_generation_service(prompt):
    return image_generation(prompt)


async def get_audio_file_service(filename):
    return get_audio_file(filename)