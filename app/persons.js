var personsView = {
    rows: [
        {
            view: "toolbar",
            elements: [
                { width: 4 },
                { view: "label", label: "Persons", id:"label"},
                { width: 4 },
                {
                    view: "text", hidden: true, id:"search",
                    on: {
                        onTimedKeyPress() {
                            const input = this.getValue().toLowerCase();
                            $$("persons_list").filter(obj => {
                                const name = obj.fname + " " + obj.lname;
                                return name.toLowerCase().indexOf(input) !== -1;
                            });
                        }
                    }
                },
                {
                    view: "icon", icon: "mdi mdi-magnify",
                    state: "closed", id:"search_icon",
                    tooltip: "Search for a client",
                    click: function () {
                        
                        if (this.config.state === "closed") {
                            $$("label").hide();
                            $$("search").show();
                            $$("search").focus();
                            this.config.state = "open";
                        }
                        else if (this.config.state === "open") {
                            $$("label").show();
                            $$("search").hide();
                            this.config.state = "closed";
                        }
                    }
                }
            ]
        },
        {
            view: "list",
            id: "persons_list",
            css: "persons_list",
            width: (screen !== "small") ? 250 : 230,
            select: true,
            url:"data/persons.json",
            tooltip: {
                template: function (obj) {
                    let result = "<div>" + obj.lname + ", " + obj.fname + "</div>";
                    result += `<div>${"Born"} ${dateFormat(obj.birthday)}</div>`;
                    result += `<p align="center" style="margin:0px;"><img src="data/photos/${obj.photo}_1.jpg" width="200px" height="200px"></p>`;
                    result += `<div>${"Click twice to see more goodies"}</div>`;
                    return result;
                }
            },
            type: {
                template: function (obj) {

                    return `<image class="userphoto" src="data/photos/${obj.photo}_1.jpg" />
                    <div class="text">
                          <span class="username">${obj.fname} ${obj.lname}</span>
                          <span class="money">$${obj.money}</span>
                    </div>`
                },
                height: 66
            },
            on: {
                onAfterSelect: function(id) {
                    const person = this.getItem(id);
                    
                    //$$("form_information").setValues(person);
                    
                    //window.location = addUrlParam(location.href, "user", person.id);

                },
                onItemDblClick: function(id) {
                    /* if (this.getUrl()[0].page !== "customers")
                        this.show("customers?user=" + id + "/information");
                    else this.show("information"); */
                }
            }
        }
    ]
};