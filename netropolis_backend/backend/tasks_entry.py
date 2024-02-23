from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from django.contrib.auth import get_user_model
from django.core.exceptions import MultipleObjectsReturned
from rest_framework.decorators import api_view, permission_classes
from .serializers import TaskSerializerBulk, TasksSerializer, CommunityManagerSerializer
from .models import TaskProblem

class TaskView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = TasksSerializer
    serializer_class2 = TaskSerializerBulk
    serializer_class1= CommunityManagerSerializer
    def post(self, request, format=None):
        serializer = TaskSerializerBulk(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, format=None):
        tasks = TaskProblem.objects.all()
        serializer = self.serializer_class(tasks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)