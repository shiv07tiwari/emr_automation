from gptapi import getGPTClient
from utils import *
import json


def text_to_json(request):
    payload = request["data"]
    conversation_id = payload['conversation_id']
    text = payload['text']

    prompt = make_prompt(text)

    stream = client.chat.completions.create(
        model="gpt-3.5-turbo-1106",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        stream=False,
        response_format={"type": "json_object"}
    )

    response = stream.choices[0].message.content
    response = json.loads(response)

    return response


if __name__ == "__main__":
    client = getGPTClient()
    request = {
        "data": {
            "conversation_id": "123",
            "text": "Hello, I am a doctor. I am here to help you. What is your name?"
        }
    }

    req = {
        "data": {
            "conversation_id": "123",
            "text": "Hello, I am a doctor. I am here to help you. What is your name?"
                    "Hi Doctor, My name is Sarah Thompson Agarwal. I am 23 years old. "
                    "I am 5 feet 10 inches tall. "
                    "I weigh 70 kgs. My BMI is 22. I am not on any medications. "
                    "I have been having a lot of headaches lately. "
                    "I have been having a lot of health issues lately."
        }
    }
    openai_response = text_to_json(req)
