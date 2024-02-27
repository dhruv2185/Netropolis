from django.urls import path
from . import community_manager_views, login_views, application_views, quest_registration_views, quest_scheduling_views, quest_searching_views, tasks_entry
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
    path('get_team_by_id/', login_views.get_by_id),
    path('community_manager_register/',
         community_manager_views.CommunityManagerView.as_view()),
    path('tasks/', tasks_entry.TaskView.as_view()),
    path('get_all_quests/', quest_registration_views.get_all_quests,
         name='get_all_quests'),
    path('get_quest_by_id/', quest_registration_views.get_quest_by_id,
         name='get_quest_by_id'),
    path('get_quest_by_cm/', quest_registration_views.get_quest_by_cm,
         name='get_quests_by_cm'),
    path('get_applications_by_cm/', application_views.get_by_community_manager,
         name='get_applications_by_cm'),
    path('get_application_by_id/', application_views.get_by_id,
         name='get_application_by_id')
]
