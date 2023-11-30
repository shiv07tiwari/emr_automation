import openai

from openai import OpenAI

client = OpenAI(
    api_key="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",
)

with open("demotext.txt") as f:
    text = f.read()

# prompt = "Following is a patient doctor conversation, extract the relevant information like name of the patient, all relevant details for the treatment and fetch a json output which can be used to fill out the front-end electronic medical record form"
#
# stream = client.chat.completions.create(
#     model="gpt-3.5-turbo",
#     messages=[{"role": "user", "content": f"{prompt}: {text}"}],
#     stream=True,
# )
#
# for chunk in stream:
#     if chunk.choices[0].delta.content is not None:
#         print(chunk.choices[0].delta.content, end="")


audio_file= open("./audio.m4a", "rb")
transcript = client.audio.transcriptions.create(
  model="whisper-1",
  file=audio_file
)

print(transcript)