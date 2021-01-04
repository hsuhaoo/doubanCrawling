var fs = require('fs');
var cheerio = require('cheerio');

var myHtml = fs.readFileSync("douban.html");
var $ = cheerio.load(myHtml);

function writeFile(fileName, data){
    var jsonstr = JSON.stringify(data);
    fs.writeFile(fileName, jsonstr, function(err) {
        if (err) {
        console.error(err);
        }else{
            console.log('write success');
        }
    });
}
function newBook(){
    var ul = $("ul[class='list-col list-col5 list-express slide-item']");
    var ulList =[];
    ul.each((i, elem) => {
        var li = $(elem).children("li");
        li.each((i,elem)=>{
            var src = $(elem).find("a img").attr("src");
            var abstract = $(elem).find("p.abstract").text();
            var title = $(elem).find("div.title a").text();
            var author = $(elem).find("span.author").text();
            var year = $(elem).find("span.year").text();
            var publisher = $(elem).find("span.publisher").text();
            var href = $(elem).find("div.title a").attr("href");
            ulList.push({"src":src,
                        "href":href,
                        "title":title,
                        "abstract":abstract,
                        "author":author,
                        "year":year,
                        "publisher":publisher,
                        });
        });
    });
    writeFile('new.json', ulList);
}
function bookInfo(){
    var slideList = $("ul[class='col slide-list'] li") 
    var slideList_list = [];
    slideList.each((i, elem)=>{
        var style = $(elem).find(".cover").attr("style");
        var href =$(elem).find("a").attr("href");
        var title = $(elem).find("span.title").text();
        var meta = $(elem).find("span.meta").text();
        var abstract = $(elem).find("p.abstract").text();
        slideList_list.push({
            "style":style,
            "href":href,
            "title":title,
            "meta":meta,
            "abstract":abstract,
        })
    });
    writeFile('bookInfo.json', slideList);
}
function popularBook(){
    var popularBooks = $("div[class='section popular-books'] li");
    var popularBooksList = [];
    popularBooks.each((i, elem)=>{
        var src = $(elem).find("a img").attr("src");
        var href =$(elem).find("h4 a").attr("href");
        var title = $(elem).find("h4 a").text();
        var rating = $(elem).find("span.average-rating").text();
        var author = $(elem).find("p.author").text();
        var classification = $(elem).find("p.book-list-classification").text();
        var reviews_text = $(elem).find("p.reviews a").text();
        var reviews_href = $(elem).find("p.reviews a").attr("href");
        $(elem).find("p.reviews a").remove();
        var reviews = $(elem).find("p.reviews").text();
        var extra = $(elem).find(".extra-info span").length>0;
        popularBooksList.push({
            "src":src,
            "href":href,
            "title":title,
            "rating":rating,
            "author":author,
            "classification":classification,
            "reviews":reviews,
            "reviews_text":reviews_text,
            "reviews_href":reviews_href,
            "extra": extra,
        })
    });
    writeFile('popularBook.json', popularBooksList);
}




function market() {
    var marketBooks = $("div[class='section market-books'] ul[class='list-col list-col5'] li");
    var marketBooks_list = [];
    var market_books_header_info = {"title":"刘勃历史三部曲",
                                    "price":"￥88.00",
                                    "free_delivery":"／包邮 ",
                                    "desc indent-paragraph":"在学术与戏说之间，寻找古代中国的另类叙事"
                                };
    marketBooks.each((i, elem)=>{
        var href = $(elem).find("div.cover a").attr("href");
        var src =$(elem).find("div.cover a img").attr("src");
        var title = $(elem).find("div.title a").text();
        var price =$(elem).find("div.price").text();
        marketBooks_list.push({
            "src":src,
            "href":href,
            "title":title,
            "price":price,
        });
    });
}

function topBook(){
    var ranking = $("ul[class='list list-ranking'] li");
    var ranking_list = [];
    ranking.each((i, elem)=>{
        var data_track = $(elem).attr("data-track");
        var rank_num = $(elem).find("span.rank-num").text();
        var book_href = $(elem).find("div.book-info a").attr("href");
        var title = $(elem).find("div.book-info a").text();
        var author = $(elem).find("div.author").text();
        var href = $(elem).children("a").attr("href");
        ranking_list.push({
            "data_track":data_track,
            "href":href,
            "title":title,
            "author":author,
            "rank_num":rank_num,
            "book_href":book_href,
        });
    });
}

function book250(){
    var block5 = $("div.block5 dl");
    var block5_list = [];
    block5.each((i, elem)=>{
        var src = $(elem).find("img").attr("src");
        var title = $(elem).find("dd a").text();
        var href = $(elem).find("dt a").attr("href");
        var extra = $(elem).find(".extra-info span").length>0;
        block5_list.push({
            "src":src,
            "href":href,
            "title":title,
            "extra": extra,
        });
    });
}

function ebook(){
    var eBooks = $("div[class='section ebook-area'] ul[class='list-col list-col5'] li");
    var eBooks_list = [];

    eBooks.each((i, elem)=>{
        var href = $(elem).find("div.cover a").attr("href");
        var src =$(elem).find("div.cover a img").attr("src");
        var title = $(elem).find("div.title a").text();
        var price =$(elem).find("div.price").text();
        var year = $(elem).find("span.year").text();
        var publisher = $(elem).find("span.publisher").text();
        eBooks_list.push({
            "src":src,
            "href":href,
            "title":title,
            "price":price,
            "year":year,
            "publisher":publisher,
        });
    });
}
function review(){
    var reviews = $("#reviews .review");
    var reviews_list = [];

    reviews.each((i, elem)=>{
        var href = $(elem).find(".review-hd a").attr("href");
        var src =$(elem).find(".review-hd img").attr("src");
        var title = $(elem).find("h3 a").text();
        var author =$($(elem).find(".review-meta a")[0]).text();
        var author_href =$($(elem).find(".review-meta a")[0]).attr("href");
        var book =$($(elem).find(".review-meta a")[1]).text();
        var content = $(elem).find(".review-content").text();
        var star = $(elem).find(".review-meta span").attr("class");
        
        reviews_list.push({
            "src":src,
            "href":href,
            "title":title,
            "author":author,
            "author_href":author_href,
            "book":book,
            "content":content,
            "star": star,
        });
    })
}

function hot(){
    var hotTag = $("ul.hot-tags-col5 li ul")
    var li_list =[];
    hotTag.each((i, elem) => {
        var title = $(elem).find("li.tag_title").text();
        var tag = $(elem).find("li a");
        var tag_list = [];
        tag.each((i,elem)=>{
            var tagName = $(elem).text();
            tag_list.push(tagName);
        });
        li_list.push({
            "title":title,
            "tag_list":tag_list,
        });
    });
}

newBook();



















// var latestHtml = fs.readFileSync("latestbook.html");
// var $ = cheerio.load(latestHtml);
// var latest_unreal = $("ul[class='cover-col-4 clearfix'] li");
// var latest_unreal_list = [];
// latest_unreal.each((i, elem)=>{
//     var href = $(elem).find("h2 a").attr("href");
//     var src = $(elem).find("img").attr("src");
//     var title = $(elem).find("h2 a").text();
//     var rating = $(elem).find("span[class='font-small  color-lightgray']").text();
//     var author = $(elem).find("p.color-gray").text();
//     var detail = $(elem).find("p.detail").text();
//     latest_unreal_list.push({
//         "href":href,
//         "src":src,
//         "title":title,
//         "rating":rating,
//         "author":author,
//         "detail":detail,
//     });
// });
// // console.log(latest_unreal_list);
// var latest_real = $("ul[class='cover-col-4 pl20 clearfix'] li");
// var latest_real_list = [];
// latest_real.each((i, elem)=>{
//     var href = $(elem).find("h2 a").attr("href");
//     var src = $(elem).find("img").attr("src");
//     var title = $(elem).find("h2 a").text();
//     var rating = $(elem).find("span[class='font-small  color-lightgray']").text();
//     var author = $(elem).find("p.color-gray").text();
//     var detail = $(elem).find("p.color-gray").nextAll("p").text();
//     latest_real_list.push({
//         "href":href,
//         "src":src,
//         "title":title,
//         "rating":rating,
//         "author":author,
//         "detail":detail,
//     });
// });
// // console.log(latest_real_list);

// var latestHtml = fs.readFileSync("tag.html");
// var $ = cheerio.load(latestHtml);
// var item = $("ul.subject-list li");
// var item_list = [];
// item.each((i, elem)=>{
//     var href = $(elem).find("a.nbg").attr("href");
//     var title = $(elem).find("div.info a").attr("title");
//     var src = $(elem).find("img").attr("src");
//     var pub = $(elem).find("img").text();
//     var rating = $(elem).find("span.rating_nums").text();
//     var pl = $(elem).find("span.pl").text();
//     var detail = $(elem).find("div[class='star clearfix']").nextAll("p").text();
//     var market = $(elem).find("span.market-info a").attr("href");
//     item_list.push({
//         "href":href,
//         "src":src,
//         "title":title,
//         "rating":rating,
//         "pl":pl,
//         "pub":pub,
//         "detail":detail,
//         "market":market,
//     });
// });
// console.log(item_list);