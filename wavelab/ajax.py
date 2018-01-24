#!/usr/bin/python3

from django.http import HttpResponse, HttpRequest, JsonResponse
from . import db, stockfilter
import json, hashlib, traceback

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
        try:
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
            stockdata = {"code":code, "name":name, "update":date[-1], "yearcount":request.POST['yearcount'], "date":date, "value":value, "ma5":ma5, "ma10":ma10, "ma20":ma20, "ma30":ma30, "ma60":ma60, "dif":dif, "dea":dea, "bar":bar}
            return HttpResponse(json.dumps(stockdata))
        except:
            return HttpResponse('{}')
    elif action == 'getsingletrade':
        if db.md5(request.COOKIES['loginname'] + 'zhangkefei') == request.COOKIES['token']:
            query = "select trade from wave_user where login = '%s'" % request.COOKIES['loginname']
            cursor = db.sqlquery(query)
            trade = json.loads(cursor.fetchone()[0])
            trade = trade.get(request.POST.get('stockcode'), [])
            dataFinal = []
            for i in trade:
                color = ('#cc3300' if i[2] == 'buy' else '#009926')
                dataFinal.append({"name":i[2], "coord":[i[0], i[3]], "itemStyle":{"normal":{"color":color}}})
            return HttpResponse(json.dumps(dataFinal, ensure_ascii = False))
        else:
            return HttpResponse('[]')
    elif action == 'addtrade':
        code = request.POST['code']
        date = request.POST['date']
        price = request.POST['price']
        volume = request.POST['volume']
        tradetype = request.POST['type']
        user = request.COOKIES['loginname']
        if user and code and date and price and volume and tradetype:
            query = "select trade from wave_user where login = '%s'" % user
            cursor = db.sqlquery(query)
            trade = json.loads(cursor.fetchone()[0])
            if code in trade:
                trade[code].append([date, volume, tradetype, price])
            else:
                trade[code] = [[date, volume, tradetype, price]]
            query = "update wave_user set trade = '%s' where login = '%s'" % (json.dumps(trade, ensure_ascii = False), user)
            db.sqlquery(query)
            return HttpResponse(1)
        else:
            return HttpResponse(0)
    elif action == 'gettrade':
        query = "select trade from wave_user where login = '%s'" % request.COOKIES['loginname']
        cursor = db.sqlquery(query)
        trade = json.loads(cursor.fetchone()[0])
        sortedlist = sorted(trade, key = lambda x : trade[x][-1][0], reverse = True)
        stockliststr = '\'' + '\',\''.join(sortedlist) + '\''
        query = "select code, name from wave_stocklist where code in (%s)" % stockliststr
        cursor = db.sqlquery(query)
        result = cursor.fetchall()
        codenamedic = {i[0] : i[1] for i in result}
        tradeData = []
        for i in sortedlist:
            tradeData.append({'code':i, 'name':codenamedic[i], 'value':trade[i]})
        return HttpResponse(json.dumps(tradeData, ensure_ascii = False))
    elif action == 'deletetrade':
        try:
            datalist = json.loads(request.POST['data'])
            query = "select trade from wave_user where login = '%s'" % request.COOKIES['loginname']
            cursor = db.sqlquery(query)
            trade = json.loads(cursor.fetchone()[0])
            for i in trade[datalist[1]]:
                if datalist[2] == i[0] and datalist[3] == i[2] and datalist[4] == i[3] and datalist[5] == i[1]:
                    trade[datalist[1]].remove(i)
                    query = "update wave_user set trade = '%s' where login = '%s'" % (json.dumps(trade, ensure_ascii = False), request.COOKIES['loginname'])
                    db.sqlquery(query)
                    return HttpResponse(1)
        except:
            return HttpResponse(0)
    elif action == 'getfavorite':
        query = "select favorite from wave_user where login = '%s'" % request.COOKIES['loginname']
        cursor = db.sqlquery(query)
        favoriteStr = cursor.fetchone()[0]
        favoriteStock = json.loads(favoriteStr)
        stockData = {}
        for e in favoriteStock:
            for i in e['stock']:
                query = "select date, close from %s order by date desc limit 60" % i[0]
                cursor = db.sqlquery(query)
                result = cursor.fetchall()
                date = [i[0] for i in result]
                value = [i[1] for i in result]
                date.reverse()
                value.reverse()
                stockData[i[0]] = {"date":date, "value":value}
        dataFinal = {"favorite":favoriteStock, "stockdata":stockData}
        return HttpResponse(json.dumps(dataFinal, ensure_ascii = False))
    elif action == 'renamegroup':
        query = "select favorite from wave_user where login = '%s'" % request.COOKIES['loginname']
        cursor = db.sqlquery(query)
        favoriteStr = cursor.fetchone()[0]
        favoriteStock = json.loads(favoriteStr)
        for i in range(len(favoriteStock)):
            if favoriteStock[i]['name'] == request.POST['oldname']:
                favoriteStock[i] = {"name":request.POST['newname'], "stock":favoriteStock[i]['stock']}
                break
        query = "update wave_user set favorite = '%s' where login = '%s'" % (json.dumps(favoriteStock, ensure_ascii = False), request.COOKIES['loginname'])
        db.sqlquery(query)
        return HttpResponse(1)
    elif action == 'creategroup':
        try:
            name = request.POST['newgroupname']
            user = request.COOKIES['loginname']
            query = "select favorite from wave_user where login = '%s'" % user
            cursor = db.sqlquery(query)
            favorite = json.loads(cursor.fetchone()[0])
            favorite.append({"name":name, "stock":[]})
            query = "update wave_user set favorite = '%s' where login = '%s'" % (json.dumps(favorite, ensure_ascii = False), user)
            db.sqlquery(query)
            return HttpResponse(1)
        except:
            return HttpResponse(0)
    elif action == 'deletegroup':
        try:
            user = request.COOKIES['loginname']
            groupname = request.POST['groupname']
            query = "select favorite from wave_user where login = '%s'" % user
            cursor = db.sqlquery(query)
            favorite = json.loads(cursor.fetchone()[0])
            for i in favorite:
                if i['name'] == groupname:
                    favorite.remove(i)
                    break
            query = "update wave_user set favorite = '%s' where login = '%s'" % (json.dumps(favorite, ensure_ascii = False), user)
            db.sqlquery(query)
            return HttpResponse(1)
        except:
            print('traceback.format_exc():\n%s' % traceback.format_exc())
            return HttpResponse(0)
    elif action == 'deletefavoritestock':
        try:
            user = request.COOKIES['loginname']
            infolist = request.POST['stock'].split('-')
            query = "select favorite from wave_user where login = '%s'" % user
            cursor = db.sqlquery(query)
            favorite = json.loads(cursor.fetchone()[0])
            for e in favorite:
                if e['name'] == infolist[0]:
                    for i in e['stock']:
                        if i[0] == infolist[1]:
                            e['stock'].remove(i)
                            break
                    break
            query = "update wave_user set favorite = '%s' where login = '%s'" % (json.dumps(favorite, ensure_ascii = False), user)
            db.sqlquery(query)
            return HttpResponse(1)
        except:
            print('traceback.format_exc():\n%s' % traceback.format_exc())
            return HttpResponse(0)
    elif action == 'addfavoritestock':
        try:
            user = request.COOKIES['loginname']
            stockcode = request.POST['stockcode']
            stockname = request.POST['stockname']
            group = request.POST['group']
            query = "select favorite from wave_user where login = '%s'" % user
            cursor = db.sqlquery(query)
            favorite = json.loads(cursor.fetchone()[0])
            for e in favorite:
                if e['name'] == group:
                    e['stock'].append([stockcode, stockname])
                    break
            query = "update wave_user set favorite = '%s' where login = '%s'" % (json.dumps(favorite, ensure_ascii = False), user)
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
    elif action == 'search':
        strategyid = request.POST['strategyid']
        return HttpResponse(json.dumps(stockfilter.filter(int(strategyid)), ensure_ascii = False))
    elif action == 'login':
        loginname = request.POST['loginname']
        password = request.POST['password']
        rawstr = loginname + 'zhangkefei'
        token = db.md5(rawstr)
        query = "select count(*) from wave_user where login = '%s' and password = '%s'" % (loginname, db.md5(password))
        cursor = db.sqlquery(query)
        if cursor.fetchone()[0] > 0:
            jsonstr = '{"loginname":"%s", "token":"%s", "status":1}' % (loginname, token)
        else:
            jsonstr = '{"status":0}'
        return HttpResponse(jsonstr)
    elif action == 'register':
        loginname = request.POST['loginname']
        username = request.POST['username']
        password = request.POST['password']
        query = "select * from wave_user where login = '%s'" % str(loginname)
        cursor = db.sqlquery(query)
        if str(type(cursor.fetchone())) == "<class 'NoneType'>":
            query = "insert ignore into wave_user (login, name, password, favorite) values ('%s', '%s', '%s', '[{\"name\":\"默认分组\", \"stock\":[]}]')" % (str(loginname), username, db.md5(password))
            db.sqlquery(query)
            return HttpResponse(1)
        else:
            return HttpResponse(0)
    else:
        return HttpResponse(db.md5('zhangkefei'))
