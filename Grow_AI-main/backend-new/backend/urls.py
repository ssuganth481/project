from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
import os

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('core/', include('core.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) \
  + static(settings.MEDIA_URL, document_root=getattr(settings, 'AI_OUTPUT_DIR', settings.MEDIA_ROOT))