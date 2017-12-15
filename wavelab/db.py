#!/usr/bin/python3

import pymysql


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
