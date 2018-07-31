/**
 * Created by Administrator on 2018/5/13.
 */

 /* 创建模块 */
var app = angular.module('21cake',['ng','ngRoute','ngAnimate']);


/*  配置控制器  */
//配置路由词典

app.config(function($routeProvider){
    $routeProvider
        .when('/home',{
            templateUrl:'tpl//home.html',
            controller: 'homeCtrl'
        })
        //登录
        .when('/login',{
            templateUrl: 'tpl/login.html'
        })
        //注册
        .when('/register',{
            templateUrl: 'tpl/register.html'
        })
        //购物车
        .when('/cart',{
            templateUrl: 'tpl/cart.html'
        })
        .when('/home-product1',{
            templateUrl:'tpl/home-product1.html'
        })
        .when('/cake',{
            templateUrl:'tpl/cake.html',
            controller: 'cakeCtrl'
        })
        .when('/iceCream',{
            templateUrl:'tpl/iceCream.html'
        })
        .when('/tea',{
            templateUrl:'tpl/tea.html'
        })
        .when('/national',{
            templateUrl:'tpl/national.html'
        })
        .when('/area',{
            templateUrl:'tpl/area.html'
        })
        .otherwise({redirectTo:'/home'})
})




/*  跳转父控制器  parentCtrl*/
app.controller('parentCtrl',['$scope','$location','$http','$rootScope',
    function($scope,$location,$http,$rootScope){
        $scope.jump = function(desPath){
            $location.path(desPath)
        };
        $http
            .get('data/home.php')
            .success(function(data){
                //console.log(data)
                // 获取网站基本信息
                $scope.baseInfoHome = data.baseInfo;
                //console.log($scope.homeBaseInfo)
                //获取轮播广告条目
                $rootScope.carouselItemsHome = data.carouselItems;
                console.log($rootScope.carouselItemsHome)
                //获取网站导航条栏目
                $scope.headerItemsHome = data.headerItems;
                //专栏条目表
                $rootScope.specialItemsHome = data.specialItems;
                console.log($rootScope.specialItemsHome)
                //产品信息表
                $rootScope.productDetailHome = data.productDetail;
            });

    }
])

/*       homeCtrl     */
app.controller('homeCtrl',['$rootScope','$scope','$http','readJSON','mouseEvent','$anchorScroll','$location',
    function($rootScope,$scope,$http,readJSON,mouseEvent,$anchorScroll,$location){
        //$http
        //    .get('data/home.php')
        //    .success(function(data){
        //        console.log(data)
        //    })

        //$scope.isVsible = false;
        //$scope.show = function(){
        //    $scope.isVsible = true;
        //}
        $scope.window.onload = function(){
            let addCart= document.getElementById('add-cart')
            documemt.addEventListener(click,function(){
                addCart.style.display= block;
            })
            addCart.addEventListener(click,function(e){
                e=e || window.event;
                event.stopPropagation();
            })
        }
        $scope.gotoScroll = function(num){s
            if(num==0){
                $scope.newScroll =num;
                $location.hash('newScroll');
            }else if(num==1){
                $scope.popularityScroll =num;
                $location.hash('popularityScroll');
            }else{
                $scope.activeScroll =num;
                $location.hash('activeScroll');
            }
            $anchorScroll();
        }
    }
])

app.factory('readJSON',['$http','$q',function($http,$q){
    return{
        query: function(){
            var deferred = $q.defer();
            console.log(deferred)
            $http
                .get('data/home.php')
                .success(function (data, status, header, config) {
                    deferred.resolve(data)
                })
                .error(function (data, status, header, config) {
                    deferred.reject(data);
                })
            return deferred.promise;
        }
    }

}])
/*这个服务有问题，需改进，暂时没想到解决办法*/
app.factory('mouseEvent', function () {
    return{
        mouseevent: function (ele1,ele2 ,event, done) {}
    }
});

app.directive('testCarousel',['readJSON','$timeout','mouseEvent' ,
    function (readJSON,$timeout,mouseEvent) {
        return{
            restrict:'EACM',
            template:'<div class="slider" ng-mouseleave="start()"><ul class="sliderContent" ng-switch="pic"><li ng-switch-when="0" class="fade-in "><a href=""><img src="{{img1}}" alt=""/></a></li><li ng-switch-when="1" class="fade-in "><a href=""><img src="{{img2}}" alt=""/></a></li><li ng-switch-when="2"  class="fade-in "><a href=""><img src="{{img3}}" alt=""/></a></li></ul></div>',
            replace:true,
            scope:{},
            link: function (scope, element, attr) {
                var promise=readJSON.query();
                console.log(promise)
                var step=0;
                var time=null;
                promise.then(function (data) {
                    console.log(data)
                    scope.img1=data.carouselItems[0].pic;
                    scope.img2=data.carouselItems[1].pic;
                    scope.img3=data.carouselItems[2].pic;
                });
                var stepFun= function () {
                    element.find(".sliderContent li").removeClass("active");
                    element.find(".sliderContent li").eq(step+1).addClass("active");
                    scope.pic=step;
                    step++;
                    step=step%3;
                    time=$timeout(function () {
                        stepFun();
                    },5000);
                };
                stepFun();
                /*点击事件*/
                scope.clickEvent= function (number) {
                    scope.pic=number;
                    element.find(".sliderContent li").removeClass("active");
                    element.find(".sliderContent li").eq(number+1).addClass("active");
                    $timeout.cancel(time);
                    step=number;
                };
                /*鼠标移除动画重新开始*/
                scope.start= function () {
                    $timeout.cancel(time);
                    stepFun();
                }
            }
        }
    }
]);
app.animation('.fade-in', function () {
    return{
        enter: function (element, done) {
            var step=0;
            var time=null;
            //计时器
            var animationFunc= function () {
                step+=20;
                if(step>100){
                    done();
                    clearInterval(time);
                }else{
                    element.css("opacity",step/100);
                }
            };
            element.css("opacity",0);
            time=setInterval(animationFunc,50);
        },
        leave: function (element,done) {
            var step=100;
            var time=null;
            var animationFun= function () {
                step-=20;
                if(step<0){
                    done();
                    clearInterval(time);
                }else{
                    element.css("opacity",step/100)
                }
            };
            element.css("opacity",1);
            time=setInterval(animationFun,40);
        }
    }
})






/*       homeProductCtrl     */
app.controller('homeProductCtrl',['$scope',
    function($scope){

    }
])


/*       cakeCtrl     */
app.controller('cakeCtrl',['$scope','$http',
    function($scope,$http){
        $http
            .get('data/product.php')
            .success(function(data){
                $scope.cakeProduct = data;
                console.log($scope.cakeProduct)
            })
    }
])
