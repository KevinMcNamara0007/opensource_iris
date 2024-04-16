import json
import uuid
import torch

from rag_utilities import embedd, save_pickle, load_pickle, semantic_search
from utilities import file_checker, customized_response, voice_transcription, text_to_speech, get_audio_file, \
    image_generation, image_to_text, history_maintenance


def get_all_files():
    files = load_pickle()
    return [{"file_id": key, "file_name": value["title"], "file_content": value["content"]}
            for key, value in files.items()]


async def freestyle_service(prompt, history, notes, file, temp, pres, freq, api_key):
    if file:
        file_content = await file_checker(file)
    else:
        file_content = ""
    prompt = f"INSTRUCTIONS: {prompt}.\n" \
             f"NOTES: {notes}.\n" \
             f"FILE: {file_content}.\n" \
             f"OUTPUT: "
    return customized_response(prompt, history, api_key, temp=temp, presc_pen=pres, freq_pen=freq)


def file_semantic_search(query):
    refs = dict()
    # Load all file data
    files = load_pickle()
    # Embedd Query
    query_embedding = embedd(query)

    key_title_content = []
    # have an array of title and content embeddings
    for key, value in files.items():
        key_title_content.append([key, value["title_embeddings"], value["content_embeddings"]])
    # Title Embedding Corpus
    title_embeddings = torch.stack([x[1] for x in key_title_content])
    # Content Embedding Corpus
    content_embeddings = torch.stack([x[2] for x in key_title_content])
    # Semantic Search for top 2 of Title Embeddings > 50% add to matches
    matches = [hit for hit in semantic_search(query_embedding, title_embeddings, 2) if hit['score'] >= .20]
    # Semantic Search for top 2 of Content Embeddings > 40% add to matches
    matches.extend([hit for hit in semantic_search(query_embedding, content_embeddings, 2) if hit['score'] >= .20])
    #  Insert Matches into a dictionary using corpus_id as key and score as value
    for match in matches:
        corp_id = match.get('corpus_id', "not found")
        score = match.get('score', 0)
        refs.update({corp_id: refs.get(corp_id) if score < refs.get(corp_id, 0) else score})
    # Sort the entries based on score from highest to smallest and get top 2
    hits = sorted(refs.items(), key=lambda x: x[1], reverse=True)[:2]
    # return references to user
    references = []
    for hit in hits:
        file = files.get(key_title_content[hit[0]][0])
        references.append({
            "title": file["title"],
            "content": file["content"]
        })
    return references


async def file_to_text(file, rag_toggle, api_key):
    if rag_toggle == "y":
        if file:
            try:
                file_content = await file_checker(file)
                prompt = ('Instructions: 1: Respond only in this JSON format {"title":"","content":""} .'
                          "2:For Content Fix grammatical error and remove special characters from this text and only"
                          " respond with the corrected text. "
                          "3: for title give a short title that is good for this content"
                          f"4: Text: {file_content}")
                proper_content = customized_response(prompt, "[]", api_key)
                file_object = json.loads(proper_content)
                embedded_title = embedd(file_object["title"])
                embedded_content = embedd(file_object["content"])
                unique_id = str(uuid.uuid4())
                files = load_pickle()
                files.update({unique_id: {
                    "title": file_object["title"],
                    "content": file_object["content"],
                    "content_embeddings": embedded_content,
                    "title_embeddings": embedded_title
                }})
                save_pickle(files)
                return "File is ready to query"
            except Exception as exc:
                return "Failed to add file permanently"
        else:
            file_content = ""
    else:
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


def image_to_text_service(prompt, image, api_key):
    return image_to_text(prompt, image, api_key)


def history_management_service(history_log, api_key):
    return history_maintenance(history_log, api_key)