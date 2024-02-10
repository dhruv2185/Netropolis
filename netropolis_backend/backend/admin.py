from django.contrib import admin
from .models import Teams, Community_Managers, Quests, Schedules, Applications

# Register your models here.
admin.site.register(Teams)
admin.site.register(Community_Managers)
admin.site.register(Quests)
admin.site.register(Schedules)
admin.site.register(Applications)
