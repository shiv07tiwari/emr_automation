from django.contrib import admin
from django.urls import path
from .views import HomeView, AudioAnalysis

urlpatterns = [
    path('admin/', admin.site.urls),
    path('home/', HomeView.as_view(), name = 'home'),
    path('audio-analysis/', AudioAnalysis.as_view(), name = 'audio-analysis'),
]
