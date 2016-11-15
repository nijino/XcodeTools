require('BMRouter');
defineClass('BMPSearchDoctorViewController', {
    pushToWebHealthArticle: function(article) {
        var data = require('NSMutableDictionary').dictionary();
        data.setValue_forKey(article.url(),"urlString");
        data.setValue_forKey(article.Id(),"articleId");
        data.setValue_forKey(require("NSNumber").numberWithInt(1),"subPathTag");
        data.setValue_forKey(require("NSNumber").numberWithInt(2),"sourceFrom");
        data.setValue_forKey(require("NSNumber").numberWithInt(2),"type");
        BMRouter.router_data(require('BMRouterUrlProtocolFilter').singleRouterProtocol('ArticleDetail'),data);
    },
});

require('BMRouter');
defineClass('BMPSearchResultViewController', {
    pushToWebHealthArticle: function(article) {
        var dic = require('NSMutableDictionary').dictionary();
        if (article.url()) {
            dic.setValue_forKey(article.url(),"urlString");
        }
        if (article.Id()) {
            dic.setValue_forKey(article.Id(),"articleId");
        }
        dic.setValue_forKey(require("NSNumber").numberWithInt(1),"subPathTag");
        dic.setValue_forKey(require("NSNumber").numberWithInt(2),"sourceFrom");
        dic.setValue_forKey(require("NSNumber").numberWithInt(2),"type");
        BMRouter.router_data(require('BMRouterUrlProtocolFilter').singleRouterProtocol('ArticleDetail'),dic);
    },
});

require('UIButton');
defineClass('BMPArticleDetailViewController', {
    viewWillAppear: function(animated) {
        var collectButton =  UIButton.buttonWithType(0);
        collectButton.setFrame({x:0, y:0, width:24, height:21});
        collectButton.setImage_forState(require('ZXBaiduAppUIKitBundle').imageNamed("icon_soucang_nor"), 0);
        collectButton.setImage_forState(require('ZXBaiduAppUIKitBundle').imageNamed("icon_soucang_sel"), 1<<2);
        collectButton.addTarget_action_forControlEvents(self, "collect:", 1<<6);
        collectButton.setAdjustsImageWhenHighlighted(0);
        self.setCollectButton(collectButton);
        self.ORIGviewWillAppear(animated);
    }
});

defineClass('BMPArticleDetailViewController', {
        initWithRouterData_callbackHandler : function(initData, handler) {
        var type = initData.valueForKey("type");
        var title = (3 == type)? "医生经验": "文章详情";

        self = self.super().initWithHelpWithUrl_title(initData.valueForKey("urlString"), title);
        if (self) {
            self.setArticleId(initData.valueForKey("articleId"));
            self.setType(type);

            var tag = initData.valueForKey("subPathTag");
            if (tag) {
                self.setSubPathTag(tag);
            }

            var source = initData.valueForKey("sourceFrom");
            if (source) {
                self.setSourceFrom(source);
            }

            self.setData();
            self.setRouterBlock(handler);

            var shareTitle = initData.valueForKey("shareTitle");
            if (shareTitle) {
                self.setShareTitle(shareTitle);
                var shareDict  = self.shareDic();
                shareDict.setValue_forKey(shareTitle, "sharetitle");
            }

            var shareImage = initData.valueForKey("shareImage");
            if (shareImage) {
                var shareDict  = self.shareDic();
                shareDict.setValue_forKey(shareImage, "shareicon");
            }

            if (3 == self.type()) {
                self.setReportSubName("experience");
            } else if (4 == self.type()) {
                self.setReportSubName("21g");
                var shareDict  = self.shareDic();
                shareDict.setValue_forKey("百度医生21g健康资讯栏目，阅读让你更懂健康", "description");
            }
        }

        return self;
    },
});