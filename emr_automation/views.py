from django.shortcuts import redirect, render
from django.views.generic import TemplateView
from faker import Faker


class HomeView(TemplateView):
    template_name = 'home.html'

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


class AudioAnalysis(TemplateView):
    template_name = 'audio_analysis.html'    