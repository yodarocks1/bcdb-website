from django.urls import path

from . import views

app_name="landing"
urlpatterns = [
    path('', views.index, name='home'),
    path('resume', views.resume, name='resume'),
    path('resume/short', views.resume_short, name='resume_short'),
    path('projects', views.projects, name='projects'),
    path('projects/pythontutor', views.error_501, name='pythontutor'),
    path('contact', views.contact, name='contact'),
    path('login', views.login, name='login'),
    path('logout', views.logout, name='logout'),
    path('createuser', views.create_user, name='createuser'),
    path('createuser/verify', views.email_verification, name='verify_email'),
    path('references', views.references, name='references'),
    path('references/create', views.new_reference, name='new_reference'),
    path('references/delete', views.del_reference, name='del_reference'),
    path('manage', views.manage, name='manage'),
    path('favicon.ico', views.favicon, name='favicon'),
    path('manifest.json', views.manifest, name='manifest'),
    path('418', views.error_418, name='418'),
    path('500/error', views.get_latest_error, name='latest_error'),
]
