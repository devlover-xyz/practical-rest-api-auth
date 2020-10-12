
const size = function () {
    const screen = document.body.offsetWidth;
    return screen > 1210 ? "wide" : (screen > 1060 ? "mid" : "small");
};

const screen = size();

const dateFormat = webix.Date.dateToStr("%d %M %Y");

//add param
function addUrlParam(url, key, value) {
    var newParam = key + "=" + value;
    var result = url.replace(new RegExp("(&|\\?)" + key + "=[^\&|#]*"), '$1' + newParam);
    if (result === url) {
        result = (url.indexOf("?") != -1 ? url.split("?")[0] + "?" + newParam + "&" + url.split("?")[1]
            : (url.indexOf("#") != -1 ? url.split("#")[0] + "?" + newParam + "#" + url.split("#")[1]
                : url + '?' + newParam));
    }
    return result;
}

// get or read cookie
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// function to set cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

var topView = {
    view: "toolbar",
    //css: theme,
    height: 56,
    elements: [
        {
            paddingY: 7,
            rows: [
                {
                    view: "icon", icon: "mdi mdi-menu", click: function () {
                        $$("$sidebar1").toggle();
                    },
                    tooltip: "Click to collapse / expand the sidebar"
                }
            ]
        },
        { css: "logo" },
        {},
        {
            paddingY: 7,
            rows: [
                {
                    margin: 8,
                    cols: [
                        {
                            view: "icon", icon: "mdi mdi-bell",
                            localId: "bell", badge: 3,
                            tooltip: "Open latest notifications",
                            click: function () {
                                //this.$scope.notifications.showPopup(this.$view);
                            }
                        },
                        {
                            view: "icon", icon: "mdi mdi-settings",
                            tooltip: "Go to settings",
                            click: function () {
                                //this.show("/top/settings")
                            }
                        }
                    ]
                }
            ]
        },
        { width: 6 }
    ]
};

var menuView = {
    view: "sidebar",
    //css: theme,
    //collapsed: (screen !== "wide"),
    width: 200,
    /* tooltip: function (obj) {
        return this.getRoot().config.collapsed ? obj.value : "";
    }, */
    data: [
        { id: "products", value: "Products", icon: "mdi mdi-shopping" },
        { id: "transactions", value: "Transactions", icon: "mdi mdi-cart" },
        { id: "customers", value: "Customers", icon: "mdi mdi-account-box" },
        { id: "payhistoryview", value: "Payment History", icon: "mdi mdi-chart-areaspline" },
        { id: "widgets", value: "Widgets", icon: "mdi mdi-widgets" },
        { id: "demos", value: "Demos", icon: "mdi mdi-monitor-dashboard" },
        { id: "prices", value: "Prices", icon: "mdi mdi-currency-usd" },
        { id: "tutorials", value: "Tutorials", icon: "mdi mdi-school" }
    ],
    on: {
        onAfterSelect: function (id) {
            webix.message("Selected: " + this.getItem(id).value);

            if (typeof window[id + "Page"] == "function") { //check availability
                window[id + "Page"](); //run function and pass a parameter to it
            }
        }
    }
};

function showLoggedInPage() {

    webix.ui({
        id: "homeApp",
        rows: [
            topView,
            {
                cols: [
                    menuView,
                    {
                        type: "space",
                        cols: [{ id: "subview", template: "Welcome Back" }]
                    }
                ]
            }
        ]
    }, $$("webixSalesApp"));
}

function showProgressBar() {
    var delay = 2000;

    $$("webixSalesApp").disable();
    $$("webixSalesApp").showProgress({
        type: "top",
        delay: delay,
        hide: true
    });
    setTimeout(function () {
        $$("webixSalesApp").enable();
    }, delay);
}

function showHomepage() {

    webix.ui({
        id: "webixSalesApp",
        rows: []
    });

    webix.extend($$("webixSalesApp"), webix.ProgressBar);

    showProgressBar();

    /* if($$("loginForm")){
        $$("webixSalesApp").removeView("loginForm");
     }*/

    var jwt = getCookie('jwt');
    webix.ajax()
        .headers({
            "Authorization": "Bearer " + jwt
        })
        .post("api/validate_token.php").then(function (data) {
            //response text
            //console.log(data.text());

            //show logged in page
            showLoggedInPage();
        })
        .fail(function (xhr) {
            var response = JSON.parse(xhr.response);

            webix.message({
                text: response.message,
                type: "error",
                expire: 3000,
                id: "error"
            });

            showLoginForm();
        });
}

webix.ready(function () {

    webix.debug({ events: true, size: true });

    showHomepage();

});