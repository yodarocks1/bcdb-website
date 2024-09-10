from django.urls import path

from . import views

app_name="portfolio"
urlpatterns = [
    path('', views.all, name='all'),
    path('coding', views.coding, name='coding'),
    path('writing', views.writing, name='writing'),
    path('research', views.research, name='research'),
    path('audio', views.audio, name='audio'),
    path('other', views.other, name='other'),
]
