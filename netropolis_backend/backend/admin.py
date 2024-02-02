from django.contrib import admin
from .models import Users, Community_Managers, Quests, Schedules

# Register your models here.
admin.site.register(Users)
admin.site.register(Community_Managers)
admin.site.register(Quests)
admin.site.register(Schedules)
