from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from django.contrib.auth.models import User
from .serializers import  ApplicationsSerializer, QuestsSerializer
from .models import Application, Quest, Community_Manager
from django.contrib.auth import get_user_model
from django.core.exceptions import MultipleObjectsReturned

class ApplicationsView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ApplicationsSerializer
    serializer_class2 = QuestsSerializer

    def post(self, request, *args, **kwargs):
        print(request.data)
        serialzer = self.serializer_class(data=request.data)
        
        if serialzer.is_valid():
            serialzer.save()
            return Response(serialzer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serialzer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, format=None):
        user = request.user
        try:
            application = Application.objects.get(user_id= user.id)
            serializer = self.serializer_class(application, many=False)
            qid = serializer.data["quest_id"]
            quest = Quest.objects.get(id=qid)
            serializer2 = self.serializer_class2(quest, many=False)
            application = serializer.data
            application["quest_id"]= serializer2.data
            return Response(application, status=status.HTTP_200_OK)
        except MultipleObjectsReturned:
            applications = Application.objects.filter(user_id=user.id)
            l = []
            for i in applications:
                l.append(i.quest_id.id)
            quests = Quest.objects.filter(id__in=l)
            serializer2 = QuestsSerializer(quests, many=True)
            serializer = ApplicationsSerializer(applications, many=True)
            for application in serializer.data:
                quest_id = application.pop("quest_id")
                for quest in serializer2.data:
                    if quest["id"] == quest_id:
                        application["quest_id"] = quest
                        break
        except Application.DoesNotExist:
            return Response([], status=status.HTTP_200_OK)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        pk = request.query_params.get('pk', None)
        applications = Application.objects.get(id=pk)
        serializer = self.serializer_class(applications, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        pk = request.query_params.get('pk', None)
        applications = Application.objects.get(id=pk)
        applications.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_by_community_manager(request):
    user = request.user
    cm = Community_Manager.objects.get(user=user.id)
    pk = cm.id
    applications = Application.objects.filter(quest_id__created_by=pk)
    if pk is not None:
        try:
            application = Application.objects.get(quest_id__created_by=pk)
            serializer = ApplicationsSerializer(application, many=False)
            qid = serializer.data["quest_id"]
            quest = Quest.objects.get(id=qid)
            serializer2 = QuestsSerializer(quest, many=False)
            application = serializer.data
            application["quest_id"]= serializer2.data
            return Response(application, status=status.HTTP_200_OK)
        except MultipleObjectsReturned:
            applications = Application.objects.filter(quest_id__created_by=pk)
            l = []
            for i in applications:
                l.append(i.quest_id.id)
            quests = Quest.objects.filter(id__in=l)
            serializer2 = QuestsSerializer(quests, many=True)
            serializer = ApplicationsSerializer(applications, many=True)
            for application in serializer.data:
                quest_id = application.pop("quest_id")
                for quest in serializer2.data:
                    if quest["id"] == quest_id:
                        application["quest_id"] = quest
                        break
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Application.DoesNotExist:
            return Response([], status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)