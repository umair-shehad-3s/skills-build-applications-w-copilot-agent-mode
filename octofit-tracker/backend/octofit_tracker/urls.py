"""octofit_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
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
import os
from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from rest_framework.routers import DefaultRouter
from .views import (
    TeamViewSet,
    UserViewSet,
    ActivityViewSet,
    WorkoutViewSet,
    LeaderboardViewSet
)

# Get CODESPACE_NAME from environment variable
CODESPACE_NAME = os.environ.get('CODESPACE_NAME', 'localhost')

# View to return the API base URL
def api_base_url(request):
    """Return the API base URL for the codespace"""
    return JsonResponse({
        'api_base_url': f'https://{CODESPACE_NAME}-8000.app.github.dev/api/',
        'codespace_name': CODESPACE_NAME
    })

# Create a router and register viewsets
router = DefaultRouter()
router.register(r'teams', TeamViewSet)
router.register(r'users', UserViewSet)
router.register(r'activities', ActivityViewSet)
router.register(r'workouts', WorkoutViewSet)
router.register(r'leaderboards', LeaderboardViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/url/', api_base_url, name='api-base-url'),
    path('api/', include(router.urls)),
]
