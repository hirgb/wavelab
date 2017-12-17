#!/usr/bin/python3

from django.http import HttpResponse, HttpRequest, JsonResponse
from . import db
import json, hashlib

def ajax(request):
    action = request.POST['action']
    if action == 'getstockname':
        query = "select code, name from wave_stocklist where code = '%s'" % request.POST['stockcode']
        cursor = db.sqlquery(query)
        stock = cursor.fetchone()
        jsonstr = '{"code":"%s", "name":"%s"}' % (stock[0], stock[1])
        return HttpResponse(jsonstr)
    elif action == 'getindexdata':
        query = "select date, close from sh000001 order by id desc limit 60"
        cursor = db.sqlquery(query)
        data = cursor.fetchall()
        dateSH = [i[0] for i in data]
        valueSH = [i[1] for i in data]
        dateSH.reverse()
        valueSH.reverse()
        del data
        dataSH = {"code":"sh000001", "name":"上证指数", "date":dateSH, "value":valueSH}
        query = "select date, close from sz399001 order by id desc limit 60"
        cursor = db.sqlquery(query)
        data = cursor.fetchall()
        dateSZ = [i[0] for i in data]
        valueSZ = [i[1] for i in data]
        dateSZ.reverse()
        valueSZ.reverse()
        del data
        dataSZ = {"code":"sz399001", "name":"深证成指", "date":dateSZ, "value":valueSZ}
        query = "select date, close from sz399005 order by id desc limit 60"
        cursor = db.sqlquery(query)
        data = cursor.fetchall()
        dateZX = [i[0] for i in data]
        valueZX = [i[1] for i in data]
        dateZX.reverse()
        valueZX.reverse()
        del data
        dataZX = {"code":"sz399005", "name":"中小板指", "date":dateZX, "value":valueZX}
        query = "select date, close from sz399006 order by id desc limit 60"
        cursor = db.sqlquery(query)
        data = cursor.fetchall()
        dateCY = [i[0] for i in data]
        valueCY = [i[1] for i in data]
        dateCY.reverse()
        valueCY.reverse()
        del data
        dataCY = {"code":"sz399006", "name":"创业板指", "date":dateCY, "value":valueCY}
        indexData = {"dataSH":dataSH, "dataSZ":dataSZ, "dataZX":dataZX, "dataCY":dataCY}
        return HttpResponse(json.dumps(indexData))
    elif action == 'getstockdata':
        query = "select code, name from wave_stocklist where code = '%s'" % request.POST['stockcode']
        cursor = db.sqlquery(query)
        result = cursor.fetchone()
        code = result[0]
        name = result[1]
        del result
        query = "select date,open,close,lowest,highest,ma5,ma10,ma20,ma30,ma60,dif,dea,bar from %s order by id desc limit %d" % (request.POST['stockcode'], int(request.POST['yearcount']) * 250)
        cursor = db.sqlquery(query)
        result1 = cursor.fetchall()
        date = [i[0] for i in result1]
        value = [[i[1],i[2],i[3],i[4]] for i in result1]
        ma5 = [i[5] for i in result1]
        ma10 = [i[6] for i in result1]
        ma20 = [i[7] for i in result1]
        ma30 = [i[8] for i in result1]
        ma60 = [i[9] for i in result1]
        dif = [i[10] for i in result1]
        dea = [i[11] for i in result1]
        bar = [i[12] for i in result1]
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
        rawstr = password + 'zhangkefei'
        md5 = hashlib.md5()
        md5.update(rawstr.encode('utf-8'))
        token = md5.hexdigest()
        query = "select count(*) from wave_user where login = '%s' and password = '%s'" % (loginname, password)
        cursor = db.sqlquery(query)
        if cursor.fetchone()[0] > 0:
            jsonstr = '{"loginname":"%s", "token":"%s", "status":1}' % (loginname, token)
        else:
            jsonstr = '{"status":0}'
        return HttpResponse(jsonstr)
