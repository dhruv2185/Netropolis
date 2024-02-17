from django.urls import path
from . import login_views, application_views, quest_registration_views, quest_scheduling_views, quest_searching_views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', login_views.RegisterView.as_view(), name='auth_register'),
    path('fetch_user/', login_views.FetchUser.as_view(), name='fetch_user'),
    path('teams/', login_views.TeamProfile.as_view(),
         name='team_profile_management'),
    path('applications/', application_views.ApplicationsView.as_view(),
         name='application_management'),
    path('quests/', quest_registration_views.QuestRegistrationView.as_view(),
         name='quest_management'),
    path('quest_scheduling/', quest_scheduling_views.QuestSchedulingView.as_view(),
         name='quest_scheduling'),
    path('search/', quest_searching_views.QuestSearchingView.as_view(),
         name='quest_searching'),
]
