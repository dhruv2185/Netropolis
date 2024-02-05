from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from django.contrib.auth.models import User
from .serializers import RegisterSerializer, TeamsSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Teams

class RegisterView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    def create(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class TeamProfile(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request, *args, **kwargs):
        serialzer = TeamsSerializer(data=request.data)
        if serialzer.is_valid():
            serialzer.save()
            return Response(serialzer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serialzer.errors, status=status.HTTP_400_BAD_REQUEST)
            
    def get(self, pk):
        teams = Teams.objects.get(created_by=pk)
        serializer = TeamsSerializer(teams, many = True)
        return Response(serializer.data, status= status.HTTP_200_OK)
    
    def put(self, request, pk):
        teams = Teams.objects.get(id=pk)
        serializer = TeamsSerializer(teams, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, pk):
        teams = Teams.objects.get(id=pk)
        teams.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        
              
    