from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from sympy import rem
# Create your models here.


class Team(models.Model):
    id = models.AutoField(primary_key=True)
    team_name = models.CharField(max_length=50)
    created_by = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    number_of_people = models.IntegerField()
    # age = models.IntegerField()
    # gender = models.CharField(max_length=4)
    # place_of_birth = models.TextField()
    # place_of_residence = models.TextField()
    # occupation = models.TextField()
    team_info = models.JSONField()
    composition = models.TextField()
    expectations_for_the_platform = models.TextField()
    concerns = models.TextField()

    def __str__(self):
        return self.team_name


class Community_Manager(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    region = models.TextField()

    def __str__(self):
        return self.user.username


class Quest(models.Model):
    id = models.AutoField(primary_key=True)
    quest_name = models.TextField()
    labour_shortage_activities = models.JSONField()
    natural_activities = models.JSONField()
    local_activities = models.JSONField()
    other_information = models.TextField()
    region = models.TextField()
    genre_tags = models.JSONField()
    rewards = models.TextField()
    fee = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    description = models.TextField()
    created_by = models.ForeignKey(
        Community_Manager, on_delete=models.CASCADE)
    available_till = models.DateTimeField()


class Application(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    quest_id = models.ForeignKey(Quest, on_delete=models.CASCADE)
    status = models.CharField(max_length=30)
    preferred_time_span = models.TextField()
    application_date = models.DateTimeField(auto_now=True)
    approval_status = models.BooleanField()
    stay_start_date = models.DateField(null=True)
    stay_end_date = models.DateField(null=True)
    special_note = models.TextField(null=True)
    desired_tasks = models.TextField(null=True)
    remarks = models.TextField(null=True)
    teamId = models.ForeignKey(Team, on_delete=models.CASCADE)


class Schedule(models.Model):
    id = models.AutoField(primary_key=True)
    start_date = models.DateField()
    end_date = models.DateField()
    application_id = models.OneToOneField(
        Application, on_delete=models.CASCADE)
    quest_id = models.ForeignKey(Quest, on_delete=models.CASCADE)
    day_to_day_schedule = models.JSONField()
    createdBy = models.ForeignKey(Community_Manager, on_delete=models.CASCADE)


class TaskProblem(models.Model):
    id = models.AutoField(primary_key=True)
    description = models.TextField()
    created_by = models.ForeignKey(
        Community_Manager, on_delete=models.CASCADE)
