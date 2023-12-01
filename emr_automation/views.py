from django.shortcuts import redirect, render
from django.views.generic import TemplateView

class HomeView(TemplateView):
    template_name = 'home.html'


class AudioAnalysis(TemplateView):
    template_name = 'audio_analysis.html'    