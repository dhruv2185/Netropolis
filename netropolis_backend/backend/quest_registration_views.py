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
from qdrant_client import QdrantClient
from qdrant_client.http import models
from sentence_transformers import SentenceTransformer
import os
from .models import Community_Manager
from dotenv import load_dotenv
load_dotenv()


class QuestRegistrationView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = QuestsSerializer
    encoder = SentenceTransformer("all-MiniLM-L6-v2")
    qdrant = QdrantClient(
        url=os.getenv("QDRANT_HOST"),
        api_key=os.getenv("QDRANT_API_KEY"),
    )

    def post(self, request, *args, **kwargs):
        print(request.data)
        username = request.data['created_by']
        user = get_user_model().objects.get(id=username)
        cm = Community_Manager.objects.get(user=user)
        form = request.data
        form['created_by'] = cm.id
        serialzer = self.serializer_class(data=form)
        if serialzer.is_valid():
            serialzer.save()
            newQuest = dict(serialzer.data)
            try:
                self.qdrant.upload_points(
                    collection_name="quests",
                    points=[
                        models.Record(
                            id=newQuest['id'], vector=self.encoder.encode(newQuest["description"][0]).tolist(), payload=newQuest
                        )

                    ],
                )
            except:
                print("Error in uploading to qdrant")
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
            except Quest.DoesNotExist:
                 return Response([], status=status.HTTP_200_OK)
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
