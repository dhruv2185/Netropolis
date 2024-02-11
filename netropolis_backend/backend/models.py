from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
# Create your models here.


class Teams(models.Model):
    id = models.AutoField(primary_key=True)
    team_name = models.CharField(max_length=50)
    created_by = models.ForeignKey(
        User, on_delete=models.CASCADE, default=7, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    number_of_people = models.IntegerField()
    # age = models.IntegerField()
    # gender = models.CharField(max_length=4)
    # place_of_birth = models.TextField()
    # place_of_residence = models.TextField()
    # occupation = models.TextField()
    team_info = models.TextField()
    composition = models.TextField()
    expectations_for_the_platform = models.TextField()
    concerns = models.TextField()

    def __str__(self):
        return self.team_name


class Community_Managers(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=50, unique=True)
    password = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        self.password = make_password(self.password)
        super(Community_Managers, self).save(*args, **kwargs)

    def __str__(self):
        return self.first_name


class Quests(models.Model):
    id = models.AutoField(primary_key=True)
    quest_name = models.TextField()
    labour_shortage_activities = models.TextField()
    natural_activities = models.TextField()
    local_activities = models.TextField()
    other_information = models.TextField()
    region = models.TextField()
    genre_tags = models.TextField()
    rewards = models.TextField()
    created_by = models.ForeignKey(
        Community_Managers, on_delete=models.CASCADE, default=7)


class Applications(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(Teams, on_delete=models.CASCADE, default=7)
    quest_id = models.ForeignKey(Quests, on_delete=models.CASCADE)
    status = models.CharField(max_length=30)
    application_date = models.DateTimeField(auto_now=True)
    approval_status = models.BooleanField()
    stay_start_date = models.DateField(null=True)
    stay_end_date = models.DateField(null=True)
    special_note = models.TextField(null=True)
    desired_tasks = models.TextField(null=True)


class Schedules(models.Model):
    id = models.AutoField(primary_key=True)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    application_id = models.ForeignKey(Applications, on_delete=models.CASCADE)
    quest_id = models.ForeignKey(Quests, on_delete=models.CASCADE)
    day_to_day_schedule = models.TextField()
