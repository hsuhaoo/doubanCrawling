from pyquery import PyQuery as pq
import requests
import time
from urllib.request import quote
import ssl
import json
import os
ssl._create_default_https_context=ssl._create_unverified_context
f = open("all_tag.html","r",encoding="utf-8")
s = f.read()
d = pq(s)
hotTag = d("td a")
a_list =[]
def find_tag(i, elem):
    tag = d(elem).text()
    a_list.append(tag)

hotTag.each(find_tag)

import urllib.request
import urllib
# for tag in a_list:
#     time.sleep(3)
#     s=urllib.parse.quote(tag)
#     url = "https://book.douban.com/tag/%s"%(s)
#     herders={
#         'User-Agent':'Mozilla/5.0 (Windows NT 6.1;WOW64) AppleWebKit/537.36 (KHTML,like GeCKO) Chrome/45.0.2454.85 Safari/537.36 115Broswer/6.0.3',
#         'Referer':'https://movie.douban.com/',
#         'Connection':'keep-alive'}
#     req=urllib.request.Request(url,headers=herders)
#     webPage=urllib.request.urlopen(req)
#     data = webPage.read()
#     data = data.decode('UTF-8')
#     # print(data)
#     f = open(tag+".txt", "w", encoding="utf-8")
#     f.write(data)
src_list = []
dirs = os.listdir('./tag_json')
for file in dirs:
    with open('./tag_json/'+file, "r", encoding='utf-8') as f:
        data_list = json.loads(f.read())    # load的传入参数为字符串类型
        for data in data_list:
            src_list.append(data['src'])
print(src_list)
for src in src_list:
    time.sleep(1)
    # s=urllib.parse.quote(src)
    herders={
        'User-Agent':'Mozilla/5.0 (Windows NT 6.1;WOW64) AppleWebKit/537.36 (KHTML,like GeCKO) Chrome/45.0.2454.85 Safari/537.36 115Broswer/6.0.3',
        'Referer':'https://movie.douban.com/',
        'Connection':'keep-alive'}
    req=urllib.request.Request(src,headers=herders)
    webPage=urllib.request.urlopen(req)
    data = webPage.read()
    # print(data)
    f = open("./picture/"+src.split("/")[-1], "wb")
    f.write(data)