#!/usr/bin/python3

#from django.http import HttpResponse
from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

def home(request):
    return render(request, 'home.html')

def detail(request):
    return render(request, 'detail.html')

def register(request):
    return render(request, 'register.html')
