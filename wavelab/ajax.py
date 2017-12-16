#!/usr/bin/python3

from django.http import HttpResponse, HttpRequest, JsonResponse
from . import db
import json

def ajax(request):
    action = request.POST['action']
    if action == 'getstockname':
        query = "select code, name from wave_stocklist where code = '%s'" % request.POST['stockcode']
        cursor = db.sqlquery(query)
        stock = cursor.fetchone()
        jsonstr = '{"code":"%s", "name":"%s"}' % (stock[0], stock[1])
        return HttpResponse(jsonstr)
    elif action == 'getstockdata':
        query = "select code, name from wave_stocklist where code = '%s'" % request.POST['stockcode']
        cursor = db.sqlquery(query)
        result = cursor.fetchone()
        code = result[0]
        name = result[1]
        del result

        query = "select * from %s order by id desc limit %d" % (request.POST['stockcode'], int(request.POST['yearcount']) * 250)
        cursor = db.sqlquery(query)
        result1 = cursor.fetchall()
        date = []
        value = []
        ma5 = []
        ma10 = []
        ma20 = []
        ma30 = []
        ma60 = []
        dif = []
        dea = []
        bar = []
        for e in result1:
            date.append(e[1])
            value.append([e[2], e[3], e[4], e[5]])
            ma5.append(e[6])
            ma10.append(e[7])
            ma20.append(e[8])
            ma30.append(e[9])
            ma60.append(e[10])
            dif.append(e[13])
            dea.append(e[14])
            bar.append(e[15])
        del result1
        date.reverse()
        value.reverse()
        ma5.reverse()
        ma10.reverse()
        ma20.reverse()
        ma30.reverse()
        ma60.reverse()
        dif.reverse()
        dea.reverse()
        bar.reverse()

        stockdata = {"code":code, "name":name, "date":date, "value":value, "ma5":ma5, "ma10":ma10, "ma20":ma20, "ma30":ma30, "ma60":ma60, "dif":dif, "dea":dea, "bar":bar}
        return HttpResponse(json.dumps(stockdata))
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
