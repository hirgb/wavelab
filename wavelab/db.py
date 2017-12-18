#!/usr/bin/python3

import pymysql, hashlib


def sqlquery(str):
    con = pymysql.connect('localhost', 'root', '123456', 'wavelab', charset = 'utf8')
    try:
        cursor = con.cursor()
        cursor.execute(str)
        con.commit()
        con.close()
        return cursor
    except:
        con.rollback()
        con.close()

def md5(rawstr):
    md5 = hashlib.md5()
    md5.update(rawstr.encode('utf-8'))
    return md5.hexdigest()

