#!/usr/bin/python3

from django.http import HttpResponse, HttpRequest, JsonResponse
from . import db
import json, hashlib, traceback

def manage(request):
    action = request.POST['action']
    if action == 'addstrategy':
        try:
            title = request.POST['title']
            subtitle = request.POST['subtitle']
            introduce = request.POST['introduce']
            query = "insert into wave_strategy (title, subtitle, introduce) value ('%s', '%s', '%s')" % (title, subtitle, introduce)
            db.sqlquery(query)
            return HttpResponse(1)
        except:
            return HttpResponse(0)
    elif action == 'getpublicstrategy':
        try:
            query = "select id, title, subtitle, introduce from wave_strategy where userid is null order by sequence"
            cursor = db.sqlquery(query)
            result = cursor.fetchall()
            strategy = [[i[0], i[1], i[2], i[3]] for i in result]
            return HttpResponse(json.dumps(strategy, ensure_ascii = False))
        except:
            return HttpResponse(0)
