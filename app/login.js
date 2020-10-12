function showLoginForm() {
    setCookie("jwt", "", 1);

    webix.ui({
        view: "form",
        id: "loginForm",
        elementsConfig: {
            bottomPadding: 18,
            labelWidth: 120
        },
        elements: [
            { "template": "<span class='webix_icon fa-user-circle-o'></span>Login", type: "header" },
            {
                view: "text", label: "Email", name: "email", id: "email", value: "aviq.baihaqy@gmail.com",
                required: true, validate: webix.rules.isEmail, invalidMessage: "Please enter a valid email!",
                on: {
                    "onBlur": function () {
                        console.log("Validating email", this);
                        var result = this.validate()    // validate only this field and show warning message under field if invalid
                    }
                }
            },
            {
                view: "text", type: "password", label: "Password", name: "password", value: "secret",
                required: true, validate: webix.rules.isNotEmpty, invalidMessage: "Please enter your password!", validateEvent: "key",
                on: {
                    "onBlur": function () {
                        console.log("Validating password");
                        this.validate()
                    },
                    "onKeyPress": function () {
                        console.log("keypress in password")
                    }
                }
            },
            {
                margin: 10,
                paddingX: 2,
                borderless: true,
                cols: [
                    {},
                    {
                        view: "button", label: "Login", type: "form", id: "loginFormSubmitButton", width: 150, click:
                            function () {
                                var form = $$('loginForm')
                                if (form.validate()) {

                                    webix.ajax()
                                        .headers({
                                            "Content-type": "application/json"
                                        })
                                        .post("api/login.php", form.getValues()).then(function (data) {
                                            // store jwt to cookie
                                            var result = data.json()

                                            setCookie("jwt", result.jwt, 1);

                                            webix.alert({ title: "Login successfull", type: "alert-success", text: "Welcome User" });
                                            
                                            //showLoggedInPage();
                                            //$$("webixSalesApp").disable();

                                            setTimeout(function () {
                                                location.reload();
                                            }, 5000);
                                        })
                                        .fail(function (xhr) {
                                            var response = JSON.parse(xhr.response);

                                            webix.message({
                                                text: response.message,
                                                type: "error",
                                                expire: 3000,
                                                id: "error"
                                            });
                                        });
                                }
                            }
                    }
                ]
            }
        ],

    }, $$("webixSalesApp"));
}



