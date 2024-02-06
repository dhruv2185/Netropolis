from django.urls import path
from . import login_views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', login_views.RegisterView.as_view(), name='auth_register'),
    path('fetch_user/', login_views.FetchUser.as_view(), name='fetch_user'),
    path('teams/', login_views.TeamProfile.as_view(),
         name='team_profile_management'),
]



# {
#   "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNzMyODE1NywiaWF0IjoxNzA3MjQxNzU3LCJqdGkiOiI5YTgwMTVkNTVjNjE0ZTg4OGY2NWUxMWIwMzFlMzk1YSIsInVzZXJfaWQiOjE4fQ.uwgfU0BKqK66fiS-6lXmcpf3wt_lmPlxtIo37-g6KrA",
#   "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA3MzI4MTU3LCJpYXQiOjE3MDcyNDE3NTcsImp0aSI6IjkyZGI3NjU4Yjg4MDQ4MmQ4N2U5ZDg0NzdiYjkxYmI5IiwidXNlcl9pZCI6MTh9.qj6A58CHn4uxdZJ4kBMf-oZ2TgceLSMOWjz9pvwbgZM"
# }
# {
#   "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNzMyODE1NywiaWF0IjoxNzA3MjQxNzU3LCJqdGkiOiI5YTgwMTVkNTVjNjE0ZTg4OGY2NWUxMWIwMzFlMzk1YSIsInVzZXJfaWQiOjE4fQ.uwgfU0BKqK66fiS-6lXmcpf3wt_lmPlxtIo37-g6KrA",
#   "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA3MzI4MTU3LCJpYXQiOjE3MDcyNDE3NTcsImp0aSI6IjkyZGI3NjU4Yjg4MDQ4MmQ4N2U5ZDg0NzdiYjkxYmI5IiwidXNlcl9pZCI6MTh9.qj6A58CHn4uxdZJ4kBMf-oZ2TgceLSMOWjz9pvwbgZM"
# }