豆瓣读书爬虫，只爬取首页及每个标签的第一页的书籍

- 使用axios作为网络操作库
- 使用cheerio提取页面数据

./crawling 爬虫代码目录

​	tag_crawling.js爬取每个标签页包含的书籍列表

​	subject_crawling.js爬取每本书籍的详细介绍

​	review_crawling.js爬取第一页的书评

​	pic_crawling.js爬取书籍图片

db.js书籍数据存储到mongodb

write_file.js将数据写入json文件

subject.js提取每本书籍的详细介绍

indexData.js提取首页数据

review.js提取书评

page.js提取“更多”页面数据



