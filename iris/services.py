from utilities import file_checker, customized_response


async def freestyle_service(prompt, notes, file, temp, pres, freq):
    if file:
        file_content = await file_checker(file)
    else:
        file_content = ""
    prompt = f"INSTRUCTIONS: {prompt}.\n" \
             f"NOTES: {notes}.\n" \
             f"FILE: {file_content}.\n" \
             f"OUTPUT (use HTML tags like bold, italics, lists, sections, etc.): "
    return customized_response(prompt, temp=temp, presc_pen=pres, freq_pen=freq)
