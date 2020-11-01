from pyquery import PyQuery as pq
import requests
import time
from urllib.request import quote
import ssl
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
for tag in a_list:
    time.sleep(3)
    s=urllib.parse.quote(tag)
    url = "https://book.douban.com/tag/%s"%(s)
    herders={
        'User-Agent':'Mozilla/5.0 (Windows NT 6.1;WOW64) AppleWebKit/537.36 (KHTML,like GeCKO) Chrome/45.0.2454.85 Safari/537.36 115Broswer/6.0.3',
        'Referer':'https://movie.douban.com/',
        'Connection':'keep-alive'}
    req=urllib.request.Request(url,headers=herders)
    webPage=urllib.request.urlopen(req)
    data = webPage.read()
    data = data.decode('UTF-8')
    # print(data)
    f = open(tag+".txt", "w", encoding="utf-8")
    f.write(data)

# for tag in a_list:
#     time.sleep(3)
#     r = requests.get('https://book.douban.com/tag/'+quote(tag))
#     print(r.content)
    # fo = open(tag+".txt", "w")
    # f.write(r.text)