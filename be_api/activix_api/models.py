# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from __future__ import unicode_literals
from django.db import models
from django.db.models import Count
from django.db.models import Sum
from activix_api.utils import *
import datetime

class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=80)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    # class DailyLog:
    #     def __init__(self, activities):
    #         log_date = datetime.date.today()
    #         activites = activities
    #         mood_score = 0
    #         prod_score = 0

    # calculates score for a single duration-based action
    # frequency based actions are evaluated the user level in the daily log
    def calc_mood_score(self):
        act = self.activityID
        exp_dur = act.expDuration
        score = act.moodScore
        duration = self.endTime - self.startTime

        return calc_score(duration, score, exp_dur)

    def calc_prod_score(self):
        act = self.activityID
        exp_dur = act.expDuration
        score = act.prodScore
        duration = self.endTime - self.startTime

        return calc_score(duration, score, exp_dur)

    def generate_daily_log(self):
        all_daily_acts = UserActivity.objects.filter(user_id=self.id)\
            .filter(date=datetime.date.today())

        print(len(all_daily_acts))

        mood_freq_daily_acts = all_daily_acts.filter(activityID__moodScoreTimed=0)
        mood_timed_daily_acts = all_daily_acts.filter(activityID__moodScoreTimed=1)
        prod_freq_daily_acts = all_daily_acts.filter(activityID__prodScoreTimed=0)
        prod_timed_daily_acts = all_daily_acts.filter(activityID__prodScoreTimed=1)

        mfda_counts = mood_freq_daily_acts.annotate(freq=Count('activityID'))
        pfda_counts = prod_freq_daily_acts.annotate(freq=Count('activityID'))
        mtda_durs = mood_timed_daily_acts.annotate(dur=Sum('duration'))
        ptda_durs = prod_timed_daily_acts.annotate(dur=Sum('duration'))

        mfda_scores = []
        critical_done = False

        for a in mfda_counts:
            print(a)
            if a.activityID == 3:
                critical_done = True
            mfda_scores.append(calc_score(a.freq, Activity.objects.get(a.activityID).moodScore, Activity.objects.get(a.activityID).expFrequency))

        pfda_scores = []
        if not critical_done:
            pfda_scores.append((calc_score(0, Activity.objects.get(activityID=3).moodScore, Activity.objects.get(activityID=3).expFrequency)))
        for a in pfda_counts:
            print(a)
            pfda_scores.append(calc_score(a.dur, Activity.objects.get(a.activityID).prodScore, Activity.objects.get(a.activityID).expFrequency))

        mtda_scores = []
        for a in mtda_durs:
            print(a)
            mtda_scores.append(calc_score(a.dur, Activity.objects.get(a.activityID).moodScore, Activity.objects.get(a.activityID).expDuration))

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_ID = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Activity(models.Model):
    activityID = models.AutoField(db_column='ActivityID', primary_key=True)  # Field name made lowercase.
    activityName = models.CharField(db_column='ActivityName', max_length=30)  # Field name made lowercase.
    activityDesc = models.CharField(db_column='ActivityDesc', max_length=255, blank=True, null=True)  # Field name made lowercase.
    moodScore = models.FloatField(db_column='MoodScore', blank=True, null=True)  # Field name made lowercase.
    moodScoreTimed = models.IntegerField(db_column='MoodScoreTimed', blank=True, null=True)  # Field name made lowercase.
    prodScore = models.FloatField(db_column='ProdScore', blank=True, null=True)  # Field name made lowercase.
    prodScoreTimed = models.IntegerField(db_column='ProdScoreTimed', blank=True, null=True)  # Field name made lowercase.
    expDuration = models.FloatField(db_column='ExpDuration', blank=True, null=True)  # Field name made lowercase.
    expFrequency = models.FloatField(db_column='ExpFrequency', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'activity'


class Condition(models.Model):
    conditionID = models.AutoField(db_column='ConditionID', primary_key=True)  # Field name made lowercase.
    conditionName = models.CharField(db_column='ConditionName', max_length=30)  # Field name made lowercase.
    conditionDesc = models.CharField(db_column='ConditionDesc', max_length=255, blank=True, null=True)  # Field name made lowercase.
    condProdScoreMin = models.FloatField(db_column='CondProdScoreMin')  # Field name made lowercase.
    condProdScoreMax = models.FloatField(db_column='CondProdScoreMax')  # Field name made lowercase.
    condMoodScoreMin = models.FloatField(db_column='CondMoodScoreMin')  # Field name made lowercase.
    condMoodScoreMax = models.FloatField(db_column='CondMoodScoreMax')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'condition'


class DeviceType(models.Model):
    deviceTypeID = models.AutoField(db_column='DeviceTypeID', primary_key=True)  # Field name made lowercase.
    deviceTypeName = models.CharField(db_column='DeviceTypeName', unique=True, max_length=30)  # Field name made lowercase.
    deviceTypeDesc = models.CharField(db_column='DeviceTypeDesc', max_length=255, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'DeviceType'


class Device(models.Model):
    deviceID = models.AutoField(db_column='DeviceID', primary_key=True)  # Field name made lowercase.
    deviceTypeID = models.ForeignKey('DeviceType', models.DO_NOTHING, db_column='DeviceTypeID')  # Field name made lowercase.
    deviceName = models.CharField(db_column='DeviceName', max_length=30)  # Field name made lowercase.
    deviceDesc = models.CharField(db_column='DeviceDesc', max_length=255, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Device'


class Suggestion(models.Model):
    suggestionID = models.AutoField(db_column='SuggestionID', primary_key=True)  # Field name made lowercase.
    suggestionTitle = models.CharField(db_column='SuggestionTitle', max_length=30)  # Field name made lowercase.
    suggestionText = models.CharField(db_column='SuggestionText', max_length=1023)  # Field name made lowercase.
    suggestionPhoto = models.TextField(db_column='SuggestionPhoto', blank=True, null=True)  # Field name made lowercase.
    suggestionVideo = models.TextField(db_column='SuggestionVideo', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Suggestion'


class ActivityDevice(models.Model):
    activityID = models.ForeignKey(Activity, models.DO_NOTHING, db_column='ActivityID', primary_key=True)  # Field name made lowercase.
    deviceID = models.ForeignKey('Device', models.DO_NOTHING, db_column='DeviceID')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'ActivityDevice'
        unique_together = (('activityID', 'deviceID'),)


class ConditionSuggestion(models.Model):
    conditionID = models.ForeignKey(Condition, models.DO_NOTHING, db_column='ConditionID', primary_key=True)  # Field name made lowercase.
    suggestionID = models.ForeignKey('Suggestion', models.DO_NOTHING, db_column='SuggestionID')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'ConditionSuggestion'
        unique_together = (('conditionID', 'suggestionID'),)


class MoodEntry(models.Model):
    moodEntryID = models.AutoField(db_column='MoodEntryID', primary_key=True)  # Field name made lowercase.
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    moodValue = models.IntegerField(db_column='MoodValue')  # Field name made lowercase.
    time = models.FloatField(db_column='Time')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'MoodEntry'


class UserActivity(models.Model):
    userActivityID = models.AutoField(db_column='UserActivityID', primary_key=True)  # Field name made lowercase.
    activityID = models.ForeignKey(Activity, models.DO_NOTHING)  # Field name made lowercase.
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    date = models.DateField(blank=True, null=True)
    duration = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'UserActivity'


class UserCondition(models.Model):
    userConditionID = models.AutoField(db_column='UserConditionID', primary_key=True)  # Field name made lowercase.
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    conditionID = models.ForeignKey(Condition, models.DO_NOTHING, db_column='ConditionID')  # Field name made lowercase.
    time = models.FloatField(db_column='Time', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'UserCondition'
