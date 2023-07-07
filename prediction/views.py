from django.template.loader import get_template
from django.http import HttpResponse
from rest_framework import generics,permissions
from rest_framework.permissions import IsAuthenticated
from .serializers import PredictionSerializer,ListPredictionSerializer
from .models import Prediction
import joblib
from weasyprint import HTML
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
import joblib
from django.conf import settings

model = joblib.load(settings.BASE_DIR / './ml_model/heart_disease_model.joblib')

class PredictionCreateAPIView(generics.CreateAPIView):
    serializer_class = PredictionSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        data = serializer.validated_data

        prediction = model.predict([[
            data['age'], data['sex'], data['cp'],
             data['thalach'], data['exang'], data['oldpeak'], data['slope'],
            data['ca'], data['thal']
        ]])[0]

        result = 'heart disease found' if prediction == 1 else 'no heart disease'

        serializer.save(user=self.request.user, result=result)

class PredictionListAPIView(generics.ListAPIView):
    serializer_class = ListPredictionSerializer
    permission_classes = [IsAuthenticated]
 
    def get_queryset(self):
        return Prediction.objects.filter(user=self.request.user)


# class SinglePredictionAPIView(generics.RetrieveAPIView):
#     permission_classes = [IsAuthenticated]
#     queryset = Prediction.objects.all()
#     serializer_class = ListPredictionSerializer
#     lookup_field = 'id'

#     def get_object(self):
#         queryset = self.filter_queryset(self.get_queryset())
#         obj = get_object_or_404(queryset, id=self.kwargs.get('id'), user=self.request.user)
#         return obj
#     def retrieve(self, request, *args, **kwargs):
#         instance = self.get_object()
#         serializer = self.get_serializer(instance)
#         context = {'prediction': serializer.data}
#         html_string = render_to_string('prediction_pdf.html', context)
#         pdf_file = HTML(string=html_string, base_url=request.build_absolute_uri()).write_pdf()
#         response = HttpResponse(content_type='application/pdf')
#         response['Content-Disposition'] = 'inline; filename="prediction.pdf"'
#         response['Content-Transfer-Encoding'] = 'binary'
#         response.write(pdf_file)
#         return response





class SinglePredictionView(generics.RetrieveAPIView):
    queryset = Prediction.objects.all()
    serializer_class = ListPredictionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        user = self.request.user
        prediction_id = self.kwargs['pk']
        prediction = get_object_or_404(Prediction, pk=prediction_id, user=user)
        return prediction

class PrintPredictionView(generics.RetrieveAPIView):
    queryset = Prediction.objects.all()
    serializer_class = ListPredictionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        user = self.request.user
        prediction_id = self.kwargs['pk']
        prediction = get_object_or_404(Prediction, pk=prediction_id, user=user)
        return prediction

    def get(self, request, *args, **kwargs):
        prediction = self.get_object()
        template = get_template('prediction_pdf.html')
        context = {'prediction': prediction}
        html_content = template.render(context)
        pdf = HTML(string=html_content).write_pdf()
        response = HttpResponse(pdf, content_type='application/pdf')
        response['Content-Disposition'] = 'filename="prediction.pdf"'
        return response
