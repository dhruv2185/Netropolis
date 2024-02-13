from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from django.contrib.auth.models import User
from .serializers import QuestsSerializer
from .models import Quest
from django.contrib.auth import get_user_model
from django.core.exceptions import MultipleObjectsReturned

class QuestRegistrationView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = QuestsSerializer

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
                quest = Quest.objects.get(created_by=pk)
                serializer = self.serializer_class(quest, many=False)
            except MultipleObjectsReturned:
                quests = Quest.objects.filter(created_by=pk)
                serializer = self.serializer_class(quests, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        pk = request.query_params.get('pk', None)
        quests = Quest.objects.get(id=pk)
        serializer = self.serializer_class(quests, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        pk = request.query_params.get('pk', None)
        quests = Quest.objects.get(id=pk)
        quests.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)