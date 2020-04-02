"""activix URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from activix_api import views

router = routers.DefaultRouter()
router.register(r'activities', views.ActivityViewSet)
router.register(r'conditions', views.ConditionViewSet)
router.register(r'device-types', views.DeviceTypeViewSet)
router.register(r'devices', views.DeviceViewSet)
router.register(r'suggestions', views.SuggestionViewSet)
router.register(r'activity-devices', views.ActivityDeviceViewSet)
router.register(r'condition-suggestions', views.ConditionSuggestionViewSet)
router.register(r'mood-entries', views.MoodEntryViewSet)
router.register(r'user-activities', views.UserActivityViewSet)
router.register(r'user-conditions', views.UserConditionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('admin/', admin.site.urls),
]
