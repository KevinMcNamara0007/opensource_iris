import csv
import os
from http.client import HTTPException
import tempfile
import hashlib
import PyPDF2
import docx
import openai
import pandas as pd
from pptx import Presentation

accepted_files = {
    "txt": "text",
    "pdf": "PDF",
    "doc": "DOC",
    "csv": "Comma Seperated Values",
    "xls": "Excel Workbooks",
    "ppt": "Powerpoint Presentations"
}

openai.api_key = "Replace with your OpenAI API Key here"


def voice_transcription(audio_file):
    try:
        audio = open(audio_file, "rb")
        transcript = openai.Audio.transcribe(
            model="whisper-1",
            file=audio,
            response_format="text",
            language="en"
        )
        print(transcript)
        return transcript
    except Exception as exc:
        print(exc)
        return exc


def customized_response(prompt, temp=0.05, max_tokens=4000, freq_pen=0.0, presc_pen=0.0, url="tbd"):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    content = response.choices[0].message.content
    return content


async def file_checker(file):
    file_content = None
    extension = file.filename.split(".")[-1].lower()
    for file_type in accepted_files.keys():
        if file_type in extension:
            file_content = await file_reader(file)
            break
    if not file_content:
        raise HTTPException(
            status_code=400,
            detail="File Not supported."
        )
    return file_content


async def file_reader(file):
    extension = file.filename.split(".")[-1]
    content = await file.read()
    if "pdf" in extension.lower():
        return custom_pdf_reader(file.file)
    if "doc" in extension.lower():
        return custom_ms_word_reader(file, extension, content)
    if "csv" in extension.lower():
        return custom_csv_reader(content)
    if "xls" in extension.lower():
        return custom_excel_reader(content)
    if "ppt" in extension.lower():
        return custom_ppt_reader(file, extension, content)
    if "txt" in extension.lower():
        return content


def custom_pdf_reader(pdf_file):
    pdf = PyPDF2.PdfReader(pdf_file)
    num_pages = len(pdf.pages)
    text = ""
    for i in range(num_pages):
        text = '\n'.join([text, pdf.pages[i].extract_text()])
    return text


def custom_ms_word_reader(word_file, word_file_extension, word_file_content):
    doc_id = hash(word_file.filename)
    with open(f"{doc_id}.{word_file_extension}", "wb") as outFile:
        outFile.write(word_file_content)
    doc = docx.Document(f"{doc_id}.{word_file_extension}")
    num_paras = len(doc.paragraphs)
    text = ""
    for i in range(num_paras):
        text = '\n'.join([text, doc.paragraphs[i].text])
    os.remove(f"{doc_id}.{word_file_extension}")
    return text


def custom_csv_reader(csv_content):
    return list(csv.reader(csv_content.decode('utf-8').splitlines(), delimiter=','))


def custom_excel_reader(excel_content):
    return pd.read_excel(excel_content).to_string()


def custom_ppt_reader(file, ppt_file_extension, ppt_file_content):
    ppt_id = hash(file.filename)
    with open(f"{ppt_id}.{ppt_file_extension}", "wb") as outFile:
        outFile.write(ppt_file_content)
    pres = Presentation(f"{ppt_id}.{ppt_file_extension}")
    content = ""
    for slide in pres.slides:
        for shape in slide.shapes:
            if hasattr(shape, "text"):
                if len(shape.text) > 0:
                    content += f"{shape.text.strip()}\n"
    os.remove(f"{ppt_id}.{ppt_file_extension}")
    return content