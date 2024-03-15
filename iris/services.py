from utilities import file_checker, customized_response, voice_transcription, text_to_speech, get_audio_file, \
    image_generation, image_to_text


async def freestyle_service(prompt, history, notes, file, temp, pres, freq, api_key):
    if file:
        file_content = await file_checker(file)
    else:
        file_content = ""
    prompt = f"INSTRUCTIONS: {prompt}.\n" \
             f"NOTES: {notes}.\n" \
             f"FILE: {file_content}.\n" \
             f"OUTPUT (Keep the result as straightforward and as minimal as possible): "
    return customized_response(prompt, history, api_key, temp=temp, presc_pen=pres, freq_pen=freq)


async def file_to_text(file):
    if file:
        file_content = await file_checker(file)
    else:
        file_content = ""
    return file_content


async def transcribe_voice_service(file, api_key):
    try:
        return voice_transcription(file, api_key)
    except Exception as exc:
        return f"failed to transcribe voice error: {exc}"


def text_to_voice_service(text, api_key):
    return text_to_speech(text, api_key)


def image_generation_service(prompt, api_key):
    return image_generation(prompt, api_key)


async def get_audio_file_service(filename):
    return get_audio_file(filename)


def image_to_text_service(image, api_key):
    return image_to_text(image, api_key)