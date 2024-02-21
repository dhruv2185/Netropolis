from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from django.contrib.auth.models import User
from .serializers import CommunityManagerSerializer, UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Team
from django.contrib.auth import get_user_model
from django.core.exceptions import MultipleObjectsReturned
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User

class CommunityManagerView(APIView):
    def post(self, request, format=None):
        serializer = CommunityManagerSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)