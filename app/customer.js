var main_info = {
    margin: 10,
    rows: [
        {
            view: "text", name: "fname",
            label: "First name", labelPosition: "top",
            placeholder: "First name",
            invalidMessage: "A name is required",
            tooltip: "Client's name is #value#"
        },
        {
            view: "text", name: "lname",
            label: "Last name", labelPosition: "top",
            placeholder: "Last name",
            tooltip: "Client's last name is #value#"
        },
        {
            view: "datepicker", name: "birthday",
            label: "Birthday", labelPosition: "top",
            placeholder: "Click to select",
            format: dateFormat,
            tooltip: function (obj) {
                let result = "Client is ";
                if (obj.value) {
                    result += Math.floor((new Date() - obj.value) / (1000 * 60 * 60 * 24 * 365)) + " years old";
                    let nearestBDay = new Date();
                    nearestBDay.setMonth(obj.value.getMonth());
                    nearestBDay.setDate(obj.value.getDate());
                    if (nearestBDay < new Date()) {
                        webix.Date.add(nearestBDay, 1, "year");
                    }
                    result += "<br>" + "Next birthday is on " + dateFormat(nearestBDay);
                }
                return result;
            }
        }
    ]
};

var position = {
    view: "richselect", name: "position",
    id: "position:combo",
    label: "Position", labelPosition: "top",
    placeholder: "Click to select",
    options: "data/positions.json",
    tooltip: function (obj) {
        return obj.value ? "The position that client occupies within their company" : "<span class='notselected'>Not selected </span>";
    }
};

var notifications = {
    view: "radio", name: "notifications",
    label: "Notifications", labelPosition: "top",
    value: 1,
    tooltip: function (obj) {
        return obj.id % 2 ? "You will receive email notifications about actions performed by this client." : "You will receive no email notifications.";
    },
    options: [
        { id: 1, value: "Yes" },
        { id: 2, value: "No" }
    ]
};

var left_main = {
    gravity: 3,
    minWidth: 200,
    margin: 10,
    rows: [
        main_info,
        position,
        notifications
    ]
};

var more_info = {
    gravity: 3,
    minWidth: 200,
    margin: 10,
    rows: [
        {
            view: "richselect", name: "city",
            id: "cities:combo",
            label: "City, country", labelPosition: "top",
            placeholder: "Click to select",
            options: "data/cities.json",
            tooltip: function (obj) {
                return obj.value ? "The city where the client works" : "<span class='notselected'>Not selected</span>";
            }
        },
        {
            view: "text", name: "address", label: "Address",
            labelPosition: "top", placeholder: "Address",
            tooltip: function (obj) {
                return obj.value ? "The address of the client's office" : "<span class='notselected'>Not specified</span>";
            }
        },
        {
            view: "text", name: "email",
            label: "Email", labelPosition: "top",
            placeholder: "judetheawesome@obscure.com",
            tooltip: function (obj) {
                return obj.value ? "The working email address of the client" : "<span class='notselected'>Not specified</span>";
            }
        }
    ]
};

var right_photo = {
    gravity: 3,
    margin: 10,
    rows: [
        {
            view: "photo", id: "photo",
            name: "photo",
            css: "form_photo",
            width: 260,
            height: 260,
            //borderless: true
        },
        {
            view: "multicombo", name: "tags",
            id: "tags:combo",
            placeholder: "Click to add tags",
            options: [],
            tooltip: function (obj) {
                return obj.value ? "The badges unlocked by the client" : "<span class='notselected'>No badges</span>";
            }
        }
    ]
};

var upper_section = {
    cols: [
        left_main,
        { gravity: 1, minWidth: 20 },
        more_info,
        { gravity: 2, minWidth: 20 },
        right_photo
    ]
};

var upper_section_narrow = {
    cols: [
        {
            gravity: 4,
            margin: 10,
            rows: [
                main_info, more_info, position
            ]
        },
        { gravity: 1, minWidth: 20 },
        {
            margin: 10,
            rows: [
                right_photo,
                notifications
            ]
        }
    ]
};

var notes = {
    view: "forminput",
    labelWidth: 0,
    body: {
        rows: [
            { view: "label", template: "Notes", css: "input_label" },
            {
                view: "tinymce-editor",
                borderless: true,
                height: 200,
                name: "notes",
                id: "notes",
                config: {
                    menubar: false,
                    plugins: "link",
                    toolbar: "fontsizeselect | bold italic underline | alignleft aligncenter alignright alignjustify | link",
                    content_style: "* { color:#475466; font-family:Roboto,sans-serif; font-size:15px; }"
                }
            }
        ]
    }
};

var buttons = {
    margin: 10,
    cols: [
        {},
        {
            view: "button", value: "Reset", autowidth: true,
            click: function () {
                $$("notes").setValue("");  
                this.getFormView().clear();
            },
            tooltip: "Click to clean the form"
        },
        {
            view: "button", value: "Save", type: "form", autowidth: true,
            tooltip: "Save changes",
            click: function () {
                if (this.getFormView().validate()) {
                    const newdata = this.getFormView().getValues();

                    webix.message("Saved");
                }
            }
        }
    ]
};

var information = {
    id: "information",
    view: "scrollview",
    scroll: "y",
    body: {
        rows: [{
            id: "form_information",
            view: "form",
            rows: [
                (screen !== "small") ? upper_section : upper_section_narrow,
                notes,
                buttons
            ],
            rules: {
                "fname": webix.rules.isNotEmpty
            }
        }]
    }
};


function customersPage() {

    webix.ui({
        id:"subview",
        type: "wide",
        cols: [
            {
                rows: [
                    {
                        view: "tabbar", id: "tabbar",
                        height: 43,
                        multiview: true,
                        value: "information",
                        tooltip: function (obj) {
                            return `${"View detailed client's"} ${obj.value.toLowerCase()}`;
                        },
                        options: [
                            { id: "information", value: "Information", width: 170 },
                            { id: "paymenthistory", value: "Payment History", width: 170 },
                            { id: "statistics", value: "Statistics", width: 170 }
                        ]
                    },
                    {
                        cells: [
                            information,
                            {
                                id: "paymenthistory",
                                template: "Place for the form paymenthistory"
                            },
                            {
                                id: "statistics",
                                template: "About the app"
                            }
                        ]
                    }
                ]
            },
            personsView
        ]
    }, $$("subview"));

    //view binding
    $$("form_information").bind($$("persons_list"));
}