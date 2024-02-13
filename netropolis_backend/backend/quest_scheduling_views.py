from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from django.contrib.auth.models import User
from .serializers import SchedulesSerializer
from .models import Schedule
from django.contrib.auth import get_user_model
from django.core.exceptions import MultipleObjectsReturned

class QuestSchedulingView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = SchedulesSerializer

    def post(self, request, *args, **kwargs):
        serialzer = self.serializer_class(data=request.data)
        if serialzer.is_valid():
            serialzer.save()
            return Response(serialzer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serialzer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, format=None):
        pk = request.query_params.get('pk', None)
        if pk is not None:
            pk = get_user_model().objects.get(username=pk)
            try:
                schedule = Schedule.objects.get(created_by=pk)
                serializer = self.serializer_class(schedule, many=False)
            except MultipleObjectsReturned:
                schedules = Schedule.objects.filter(created_by=pk)
                serializer = self.serializer_class(schedules, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        pk = request.query_params.get('pk', None)
        schedules = Schedule.objects.get(id=pk)
        serializer = self.serializer_class(schedules, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        pk = request.query_params.get('pk', None)
        schedules = Schedule.objects.get(id=pk)
        schedules.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)