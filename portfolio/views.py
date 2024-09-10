from django.shortcuts import render

from landing.views import error_501

def all(request):
    return error_501(request) # Unpublished

def coding(request):
    return error_501(request) # Unpublished

def writing(request):
    return error_501(request) # Unpublished

def research(request):
    return error_501(request) # Unpublished

def audio(request):
    return error_501(request) # Unpublished

def other(request):
    return error_501(request) # Unpublished
