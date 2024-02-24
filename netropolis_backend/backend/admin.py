from django.contrib import admin
from .models import Team, Community_Manager, Quest, Schedule, Application, TaskProblem

# Register your models here.
admin.site.register(Team)
admin.site.register(Community_Manager)
admin.site.register(Quest)
admin.site.register(Schedule)
admin.site.register(Application)
admin.site.register(TaskProblem)
