from django.urls import path
from .views import generate_content, insights, predict_performance, dashboard, get_hooks, content_history, clear_content_history, insights_history, clear_insights_history, predictions_history, clear_predictions_history, trending

urlpatterns = [
    path('generate-content/', generate_content),
    path('get-hooks/', get_hooks),
    path('insights/', insights),
    path('predict/', predict_performance),
    path('dashboard/', dashboard),
    path('content-history/', content_history),
    path('content-history/clear/', clear_content_history),
    path('insights-history/', insights_history),
    path('insights-history/clear/', clear_insights_history),
    path('predictions-history/', predictions_history),
    path('predictions-history/clear/', clear_predictions_history),
    path('trending/', trending),
]
