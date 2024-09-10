"""bcdb URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
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
from django.urls import include, path
from django_email_verification import urls as email_urls

urlpatterns = [
    path('', include('landing.urls')),
    path('portfolio/', include('portfolio.urls')),
    path('email/', include(email_urls)),
    path('projects/journal_of_discourses/', include('lds_journal_of_discourses.urls')),
    path('projects/pythontutor/', include('pythontutor.urls')),
    path('admin/', admin.site.urls),
#    path('projects/', include('projects.urls')),
#    path('settings/', include('customdjango.urls')),
]

handler403 = 'landing.views.error_403'
handler404 = 'landing.views.error_404'
handler500 = 'landing.views.error_500'
