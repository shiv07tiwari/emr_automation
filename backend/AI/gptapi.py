from openai import OpenAI


def getGPTClient():
    client = OpenAI(
        api_key="key",
    )

    return client

