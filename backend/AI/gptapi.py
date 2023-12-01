import openai

from openai import OpenAI


def getGPTClient():
    client = OpenAI(
        api_key="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",
    )

    return client

