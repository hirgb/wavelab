#!/usr/bin/python3

from django.http import HttpResponse, HttpRequest, JsonResponse
from . import db

def ajax(request):
    action = request.POST['action']
    if action == 'getstockname':
        query = "select code, name from wave_stocklist where code = '%s'" % request.POST['stockcode']
        cursor = db.sqlquery(query)
        stock = cursor.fetchone()
        jsonstr = '{"code":"%s", "name":"%s"}' % (stock[0], stock[1])
        return HttpResponse(jsonstr)
    elif action == 'login':
        loginname = request.POST['loginname']
        password = request.POST['password']
        token = loginname + password
        query = "select count(*) from wave_user where login = '%s' and password = '%s'" % (loginname, password)
        cursor = db.sqlquery(query)
        if cursor.fetchone()[0] > 0:
            jsonstr = '{"loginname":"%s", "token":"%s", "status":1}' % (loginname, token)
        else:
            jsonstr = '{"status":0}'
        return HttpResponse(jsonstr)
