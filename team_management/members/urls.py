from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TeamMemberViewSet

router = DefaultRouter()
router.register(r'teammembers', TeamMemberViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
