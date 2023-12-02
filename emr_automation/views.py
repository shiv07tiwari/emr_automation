import json
import random
import string

from django.http import JsonResponse
from django.shortcuts import render
from django.views.generic import TemplateView
from faker import Faker
from rest_framework.views import APIView

from backend.AI.gptapi import getGPTClient
from backend.AI.textToJson import text_to_json


def front(request):
    my_data = {"A": "Hello"}  # your own logic to get data
    return render(request, "index.html", {"data": json.dumps(my_data)})

class HomeView(TemplateView):
    template_name = 'index.html'

    def random_text(self):
        fake = Faker()
        return fake.text()

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['random_text_1'] = self.random_text()
        context['random_text_2'] = self.random_text()
        context['random_text_3'] = self.random_text()
        context['random_text_4'] = self.random_text()
        context['random_text_5'] = self.random_text()
        context['random_text_6'] = self.random_text()
        context['random_text_7'] = self.random_text()
        context['random_text_8'] = self.random_text()
        context['random_text_9'] = self.random_text()
        context['random_text_10'] = self.random_text()
        context['random_text_11'] = self.random_text()
        context['random_text_12'] = self.random_text()
        # ... you can add as many as needed
        return context


class AudioAnalysis(APIView):
    def post(self, request, *args, **kwargs):
        # request.data
        payload = """
        Doctor: Good morning! How can I help you today?

Patient: Hi, Doctor. I've been dealing with persistent headaches and fatigue lately, and I thought it's time to see a professional about it.

Doctor: I'm sorry to hear that. Let's start by getting some basic information. Can you please provide your full name and date of birth?

Patient: Sure, it's Emily Johnson, born on June 15, 1985.

Doctor: Thank you, Emily. And can you tell me a bit more about when these headaches started and how often you've been experiencing them?

Patient: The headaches began about two months ago. At first, they were occasional, maybe once or twice a week, but now it's almost every day. They're usually a dull pain that starts in the back of my head and spreads to my temples.

Doctor: I see. Have you noticed any specific triggers or patterns associated with these headaches?

Patient: Well, I've been trying to keep track, and it seems like they get worse after a long day at work or when I haven't had enough sleep. I work at a computer for most of the day.

Doctor: Okay, that's helpful information. Now, regarding your fatigue, can you describe when you first noticed it and how it has been affecting your daily life?

Patient: The fatigue started around the same time as the headaches. It's like a constant tiredness, and I find myself needing to take short naps during the day. I'm also having trouble concentrating at work.

Doctor: I see. Have you made any changes in your lifestyle recently, such as changes in diet, exercise, or sleep patterns?

Patient: Not really, no. If anything, I've been trying to get more sleep, but it doesn't seem to help much.

Doctor: Thank you for providing that information. Now, let's talk about your medical history. Do you have any chronic illnesses or conditions, and are you currently taking any medications?

Patient: No chronic illnesses, but I do have a history of migraines. I used to take over-the-counter pain relievers for them, but they haven't been helping with these headaches.

Doctor: Got it. And have you ever had any surgeries or been hospitalized for any reason?

Patient: No surgeries, and I haven't been hospitalized except for a brief stay when I had my appendix removed when I was a teenager.

Doctor: Thank you for sharing that. Before we proceed, are there any specific concerns or questions you have about your symptoms or the upcoming treatment?

Patient: Well, I'm just worried about the impact these headaches and fatigue are having on my daily life. I want to get back to feeling normal again.

Doctor: I understand, Emily. We'll work together to figure out the best course of action. I'll order some tests to gather more information, and we'll discuss the results in our follow-up appointment. In the meantime, I'll also prescribe a medication to help manage your symptoms.

Patient: Thank you, Doctor. I appreciate your help.

Doctor: You're welcome, Emily. We're here to support you. If you have any questions or concerns, don't hesitate to reach out.
"""
        print(request.data)
        conversation_id = request.data['conversation_id']
        text = request.data["text"]
        client = getGPTClient()

        # response = text_to_json(request, text, client)
        # COmbine respone with conversation_id

        # generate a random string
        response = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(10))
        return JsonResponse(response, safe=False)
