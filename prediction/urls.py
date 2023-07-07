from django.urls import path
from .views import PredictionCreateAPIView,PredictionListAPIView,SinglePredictionView,PrintPredictionView

urlpatterns = [
    path('create/',PredictionCreateAPIView.as_view()),
    path('results/',PredictionListAPIView.as_view()),
    path('result/<int:pk>/', SinglePredictionView.as_view(), name='single'),
    path('result/<int:pk>/print/', PrintPredictionView.as_view(), name='print'),
]