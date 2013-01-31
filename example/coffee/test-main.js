// Generated by CoffeeScript 1.3.3
var COOKIE_KEY, PASS, Router, USER, clickHandler, getCookie, setCookie, test2,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Router = (function(_super) {

  __extends(Router, _super);

  function Router() {
    return Router.__super__.constructor.apply(this, arguments);
  }

  Router.prototype.beforeAnytime = [];

  Router.prototype.befores = {
    'admin': ['ninshou'],
    'admin/:id': ['beforeMinchi']
  };

  Router.prototype.routes = {
    '': 'index',
    'admin/:id': 'show',
    'admin': 'admin',
    'login': 'login',
    'logout': 'logout'
  };

  Router.prototype.index = function() {
    console.log("index");
    $('#dialog').hide();
    $('#adminContainer').empty();
    return $('.currentPage').empty().append("this page is index");
  };

  Router.prototype.show = function(id) {
    console.log("showwww");
    return $('.currentPage').empty().append("this page is test" + id);
  };

  Router.prototype.admin = function() {
    $('.currentPage').empty().append("this is admin page");
    $('#adminContainer').append('<a href="/admin/1" class="test">1</a><a href="/admin/2" class="test">2</a><a href="/admin/3" class="test">3</a>');
    return $('.test').on('click', clickHandler);
  };

  Router.prototype.login = function() {
    return $('#dialog').show();
  };

  Router.prototype.logout = function() {
    setCookie(COOKIE_KEY, '');
    window.App.change('');
    console.log("logout");
    $('#adminContainer').empty();
  };

  /*
  		some before functions
  */


  Router.prototype.test = function(hiroshi) {
    return console.log("before 1", hiroshi);
  };

  Router.prototype.beforeMinchi = function() {
    return console.log("before minchi");
  };

  Router.prototype.ninshou = function() {
    var isLogined;
    isLogined = Boolean(getCookie(COOKIE_KEY));
    if (isLogined === true) {

    } else {
      return window.App.change('login');
    }
  };

  return Router;

})(Kazitori);

COOKIE_KEY = 'kazitoriExpCookie';

USER = "hage";

PASS = "hikaru";

$(document).ready(function() {
  $('#dialog').css({
    top: window.innerHeight / 2 - 90,
    left: window.innerWidth / 2 - 150
  });
  $('#dialog').hide();
  window.App = new Router({
    root: '/'
  });
  window.App.addEventListener(KazitoriEvent.CHANGE, function(event) {});
  $('.test').on("click", clickHandler);
  return $('form').on('submit', function(event) {
    var pw, userID;
    event.preventDefault();
    userID = $('input[name=user]').val();
    pw = $('input[name=pw]').val();
    if (userID === USER && pw === PASS) {
      setCookie(COOKIE_KEY, true);
      $('#dialog').hide();
      return window.App.change('admin');
    } else {
      return alert('バルス');
    }
  });
});

clickHandler = function(event) {
  var target;
  event.preventDefault();
  target = event.currentTarget.pathname;
  console.log("inclick", target);
  return window.App.change(target);
};

getCookie = function(key) {
  var cookie, cookies, items, _i, _len;
  cookies = document.cookie.split(";");
  for (_i = 0, _len = cookies.length; _i < _len; _i++) {
    cookie = cookies[_i];
    items = cookie.split('=');
    if (items.shift() === key) {
      return items.join('=');
    }
  }
  return null;
};

setCookie = function(key, value, opt) {
  var exipre, expire;
  if (!(value != null)) {
    return;
  }
  expire = new Date();
  expire.setTime(expire.getTime() + 60 * 60 * 24 * 1000);
  exipre = expire.toGMTString();
  return document.cookie = key + '=' + escape(value) + ';expires=' + expire;
};

test2 = function() {
  return console.log("before 2");
};