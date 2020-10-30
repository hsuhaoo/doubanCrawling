var fs = require('fs');
var cheerio = require('cheerio');

var myHtml = fs.readFileSync("douban.html");
var $ = cheerio.load(myHtml);
var ul = $("ul[class='list-col list-col5 list-express slide-item']");

var ul_list =[];
ul.each((i, elem) => {
    var li = $(elem).children("li");
    var li_list = [];
    var img_list = [];
    li.each((i,elem)=>{
        var src = $(elem).find("a img").attr("src");
        var abstract = $(elem).find("p.abstract").text();
        var title = $(elem).find("div.title a").text();
        var author = $(elem).find("span.author").text();
        var year = $(elem).find("span.year").text();
        var publisher = $(elem).find("span.publisher").text();
        var href = $(elem).find("div.title a").attr("href");
        li_list.push({"src":src,
                     "href":href,
                     "title":title,
                     "abstrct":abstract,
                     "author":author,
                     "year":year,
                     "publisher":publisher,
                     });
    });
    ul_list.push(li_list);

});
console.log(ul_list);
var popularBooks = $("div.section popular-books li");
var popularBooks_list = [];
popularBooks.each((i, elem)=>{
    var src = $(elem).find("a img").attr("src");
    var href =$(elem).find("h4 a").attr("href");
    var title = $(elem).find("h4 a").text();
    var rating = $(elem).find("span.average-rating").text();
    var author = $(elem).find("p.author").text();
    var classification = $(elem).find("p.book-list-classification").text();
    var reviews = $(elem).find("p.reviews").text();
    var reviews_text = $(elem).find("p.reviews a").text();
    var reviews_href = $(elem).find("p.reviews a").attr("href");
    popularBooks_list.push({"src":src,
                            "href":href,
                            "title":title,
                            "rating":rating,
                            "author":author,
                            "classification":classification,
                            "reviews":reviews,
                            "reviews_text":reviews_text,
                            "reviews_href":reviews_href,
                            })
});
console.log(popularBooks_list);
var marketBooks = $("div.section market-books");
