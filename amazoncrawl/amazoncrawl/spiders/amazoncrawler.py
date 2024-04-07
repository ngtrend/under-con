import json
import scrapy


class AmazoncrawlerSpider(scrapy.Spider):
    name = "amazoncrawler"
    def __init__(self, *args, **kwargs):
        super(AmazoncrawlerSpider, self).__init__(*args, **kwargs)
        self.start_urls = [kwargs.get('url')]
    def parse(self, response):
        name = response.xpath('//*[@id="productTitle"]/text()').get()
        price = response.xpath('//span[@class="a-price-whole"]/text()').get()
        details = {"product_name":name.strip(),"product_price":price}
        with open('D:/app/pro/undercon/sitedisplay/public/output.json','w') as file:
            json.dump(details,file)