from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from .models import *
from .serializers import *


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    permission_classes = [permissions.IsAuthenticated]


class ConditionViewSet(viewsets.ModelViewSet):
    queryset = Condition.objects.all()
    serializer_class = ConditionSerializer
    permission_classes = [permissions.IsAuthenticated]


class DeviceTypeViewSet(viewsets.ModelViewSet):
    queryset = DeviceType.objects.all()
    serializer_class = DeviceTypeSerializer
    permission_classes = [permissions.IsAuthenticated]


class DeviceViewSet(viewsets.ModelViewSet):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer
    permission_classes = [permissions.IsAuthenticated]


class SuggestionViewSet(viewsets.ModelViewSet):
    queryset = Suggestion.objects.all()
    serializer_class = SuggestionSerializer
    permission_classes = [permissions.IsAuthenticated]


class ActivityDeviceViewSet(viewsets.ModelViewSet):
    queryset = ActivityDevice.objects.all()
    serializer_class = ActivityDeviceSerializer
    permission_classes = [permissions.IsAuthenticated]


class ConditionSuggestionViewSet(viewsets.ModelViewSet):
    queryset = ConditionSuggestion.objects.all()
    serializer_class = ConditionSuggestionSerializer
    permission_classes = [permissions.IsAuthenticated]


class MoodEntryViewSet(viewsets.ModelViewSet):
    queryset = MoodEntry.objects.all()
    serializer_class = MoodEntrySerializer
    permission_classes = [permissions.IsAuthenticated]


class UserActivityViewSet(viewsets.ModelViewSet):
    queryset = UserActivity.objects.all()
    serializer_class = UserActivitySerializer
    permission_classes = [permissions.IsAuthenticated]
    
    
class UserConditionViewSet(viewsets.ModelViewSet):
    queryset = UserCondition.objects.all()
    serializer_class = UserConditionSerializer
    permission_classes = [permissions.IsAuthenticated]
