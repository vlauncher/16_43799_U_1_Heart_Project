from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Prediction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    age = models.IntegerField()
    sex = models.IntegerField()
    cp = models.IntegerField()
    thalach = models.IntegerField()
    exang = models.IntegerField()
    oldpeak = models.FloatField()
    slope = models.IntegerField()
    ca = models.IntegerField()
    thal = models.IntegerField()
    result = models.CharField(max_length=25,blank=True)
