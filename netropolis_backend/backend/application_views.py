from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from django.contrib.auth.models import User
from .serializers import ApplicationsSerializer, ApplicationQuestSerializer
from .models import Application, Quest, Community_Manager
from django.contrib.auth import get_user_model
from django.core.exceptions import MultipleObjectsReturned


class ApplicationsView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ApplicationsSerializer
    serializer_class2 = ApplicationQuestSerializer

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
            applications = Application.objects.filter(
                user_id=user.id).select_related('quest_id').select_related('teamId')
            serializer = self.serializer_class2(applications, many=True)
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
    try:
        cm = Community_Manager.objects.get(user=user)
        applications = Application.objects.filter(
            quest_id__created_by=cm).select_related('quest_id').select_related('teamId')
        if applications.exists():
            serializer = ApplicationQuestSerializer(applications, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response([], status=status.HTTP_200_OK)
    except Community_Manager.DoesNotExist:
        return Response("Community Manager not found", status=status.HTTP_404_NOT_FOUND)
