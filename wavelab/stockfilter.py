#!/usr/bin/python3

from . import db

def filter(strategyid):
    query = "select code from wave_stocklist where calculated = 1"
    cursor = db.sqlquery(query)
    result = cursor.fetchall()
    stocklist = [i[0] for i in result]
    finaldata = []
    if strategyid == 2:
        while len(stocklist):
            query = "select bar from %s order by date desc limit 10" % stocklist[-1]
            cursor = db.sqlquery(query)
            result = cursor.fetchall()
            barlist = [float(i[0]) for i in result]
            if isNegetive(barlist) and barlist[0] > -0.02:
                query = "select code, name from wave_stocklist where code = '%s'" % stocklist[-1]
                cursor = db.sqlquery(query)
                result = cursor.fetchone()
                code, name = result[0], result[1]
                query = "select date, close from %s order by date desc limit 60" % code
                cursor = db.sqlquery(query)
                tempdata = cursor.fetchall()
                date = [i[0] for i in tempdata]
                value = [i[1] for i in tempdata]
                date.reverse()
                value.reverse()
                finaldata.append({"code":code, "name":name, "date":date, "value":value})
            stocklist.pop()
        return finaldata
    else:
        print('im in the else')

def isNegetive(numlist):
    for i in numlist:
        if i < 0:
            continue
        else:
            return False
    else:
        return True
