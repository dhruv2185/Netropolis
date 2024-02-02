from django.db import models
from django.contrib.auth.models import User
# Create your models here.
# class Users(models.Model):
#     identifier = models.OneToOneField(User, on_delete=models.CASCADE)
#     username = models.CharField(max_length=50)
#     email = models.EmailField(max_length=50, unique=True)
#     password = models.CharField(max_length=50)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
#     number_of_people= models.IntegerField()
#     gender_and_age = models.Field()
#     composition = models.TextField()
#     duration_of_stay = models.CharField(max_length=30)
#     place_of_birth = models.TextField()
#     place_of_residence = models.TextField()
#     occupation = models.TextField()
#     special_note = models.TextField()
#     expectations_for_the_platform = models.TextField()
#     concerns = models.TextField()
    
class Community_Managers(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=50, unique=True)
    password = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Quests(models.Model):
    id = models.AutoField(primary_key=True)
    labour_shortage_activities = models.TextField()
    natural_activities = models.TextField()
    local_activities = models.TextField()
    other_information = models.TextField()
    region = models.TextField()
    genre_tags = models.TextField()
    rewards= models.IntegerField()


class Schedules(models.Model):
    id = models.AutoField(primary_key=True)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    quest_id = models.ForeignKey(Quests, on_delete=models.CASCADE)
    day_to_day_schedule= models.TextField()
    
class Applications(models.Model):
    id = models.AutoField(primary_key=True)
    # user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    quest_id = models.ForeignKey(Quests, on_delete=models.CASCADE)
    status = models.CharField(max_length=30)
    application_date = models.DateTimeField()
    approval_status = models.BooleanField()
    community_manager = models.ForeignKey(Community_Managers, on_delete=models.CASCADE) 
   