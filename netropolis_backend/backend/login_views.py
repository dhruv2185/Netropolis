from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from django.contrib.auth.models import User
from .serializers import RegisterSerializer, TeamsSerializer, UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Team
from django.contrib.auth import get_user_model
from django.core.exceptions import MultipleObjectsReturned


class RegisterView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FetchUser(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        user = get_user_model().objects.get(username=request.user)
        print(user.id)
        serializer = self.serializer_class(user)
        return Response(
            { "user_profile": serializer.data, 
             "user_id": str(user.id)}, status=status.HTTP_201_CREATED)

    def put(self, request, *args, **kwargs):
        user = get_user_model().objects.get(username=request.user)
        serializer = self.serializer_class(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        user = get_user_model().objects.get(username=request.user)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TeamProfile(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = TeamsSerializer

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
                team = Teams.objects.get(created_by=pk)
                serializer = self.serializer_class(team, many=False)
            except MultipleObjectsReturned:
                teams = Teams.objects.filter(created_by=pk)
                serializer = self.serializer_class(teams, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        pk = request.query_params.get('pk', None)
        teams = Teams.objects.get(id=pk)
        serializer = self.serializer_class(teams, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        pk = request.query_params.get('pk', None)
        teams = Teams.objects.get(id=pk)
        teams.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
