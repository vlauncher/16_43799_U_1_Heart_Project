from rest_framework import serializers
from .models import Prediction

class PredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prediction
        exclude = ('user','result')

class ListPredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prediction
        exclude = ('user',)