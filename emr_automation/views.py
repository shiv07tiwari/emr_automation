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
        conversation_id = request.data['conversation_id']
        text = request.data["text"]
        client = getGPTClient()

        response = text_to_json(request, text, client)
        return JsonResponse(response, safe=False)
