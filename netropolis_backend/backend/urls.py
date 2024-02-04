from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

urlpatterns = [
    path('/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
]