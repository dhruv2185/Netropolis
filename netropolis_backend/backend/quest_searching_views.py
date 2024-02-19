from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from django.contrib.auth.models import User
from .serializers import QuestsSerializer, CommunityManagersSerializer
from .models import Quest, Community_Manager
from django.contrib.auth import get_user_model
from django.core.exceptions import MultipleObjectsReturned
from qdrant_client import QdrantClient
from qdrant_client.http import models
from sentence_transformers import SentenceTransformer
import os
from dotenv import load_dotenv
load_dotenv()


class QuestSearchingView(APIView):
    # permission_classes = (IsAuthenticated,)
    serializer_class = QuestsSerializer
    serializer_class2 = CommunityManagersSerializer
    # encoder = SentenceTransformer("all-MiniLM-L6-v2")
    # qdrant = QdrantClient(
    #     url=os.getenv("QDRANT_HOST"),
    #     api_key=os.getenv("QDRANT_API_KEY"),
    # )

    def get(self, request, format=None):
        query = request.query_params.get('query', None)
        # print(pk)
        if query is not None:
            # code to get all quests
            # quests = Quest.objects.all()
            # sqldb_results = list(quests.values())
            # search = self.qdrant.search(
            #     collection_name="quests",
            #     query_vector=self.encoder.encode(query).tolist(),
            #     limit=6,)
            # vectordb_results = [hit.payload for hit in search]
            # final_results = [x for x in vectordb_results if x in sqldb_results]
            # pk = Community_Manager.objects.get(first_name=pk)
            # print(pk.id)
            # quests = Quest.objects.filter(created_by=pk)
            # questslist = list(quests.values())
            # print(vectordb_results)

        #     try:
        #         quest = Quest.objects.get(created_by=pk)
        #         questlist = list(quest.values())
        #         serializer = self.serializer_class(quest, many=False)
        #     except MultipleObjectsReturned:
        #         quests = Quest.objects.filter(created_by=pk)
        #         questslist = list(quests.values())
        #         print(list(quests.values()))
        #         serializer = self.serializer_class(quests, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        # else:
        #     return Response(status=status.HTTP_400_BAD_REQUEST)
