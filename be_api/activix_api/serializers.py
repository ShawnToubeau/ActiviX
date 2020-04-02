from .models import *
from rest_framework import serializers


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ['activityID', 'activityName', 'activityDesc', 'moodScore', 'moodScoreTimed',
                  'prodScore', 'prodScoreTimed', 'expDuration', 'expFrequency']


class ConditionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Condition
        fields = ['conditionID', 'conditionName', 'conditionDesc']


class DeviceTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeviceType
        fields = ['deviceTypeID', 'deviceTypeName', 'deviceTypeDesc']


class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = ['deviceID', 'deviceTypeID', 'deviceName', 'deviceDesc']


class SuggestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Suggestion
        fields = ['suggestionID', 'suggestionName', 'suggestiontext', 'suggestionPhoto', 'suggestionVideo']
        

class ActivityDeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityDevice
        fields = ['activityID', 'deviceID']
        
        
class ConditionSuggestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConditionSuggestion
        fields = ['conditionID', 'suggestionID']
        
        
class MoodEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = MoodEntry
        fields = ['moodEntryID', 'user', 'moodValue', 'time']
        
        
class UserActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserActivity
        fields = ['userActivityID', 'activityID', 'user', 'date', 'duration']


class UserConditionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCondition
        fields = ['userConditionID', 'user', 'conditionID', 'time']