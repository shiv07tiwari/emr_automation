from django.contrib import admin
from django.urls import path
from .views import HomeView, AudioAnalysis, front

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', front, name = 'home'),
    path('audio-analysis/', AudioAnalysis.as_view(), name = 'audio-analysis'),
]
