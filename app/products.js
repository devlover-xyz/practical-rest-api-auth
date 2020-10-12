var grid = {
    id: "productsData",
    view: "datatable", select: true, editable: true, editaction: "dblclick",
    data: productsData,
    columns: [
        { id: "id", header: "#", width: 50 },
        { id: "code", header: ["Code", { content: "textFilter" }], sort: "string", minWidth: 70, fillspace: 1 },
        { id: "name", header: ["Name", { content: "textFilter" }], sort: "string", minWidth: 120, fillspace: 2, editor: "text" },
        { id: "categoryName", header: ["Category", { content: "selectFilter" }], sort: "string", minWidth: 120, fillspace: 2, editor: "text", template: "<div class='category#category#'>#categoryName#</div>" },
        { id: "price", header: ["Price"], sort: "int", minWidth: 80, fillspace: 1, format: webix.i18n.priceFormat },
        { id: "quantity", header: ["Quantity"], sort: "int", minWidth: 50, fillspace: 1 },
        { id: "statusName", header: ["Status"], minWidth: 110, sort: "string", fillspace: 1, template: "<span class='status status#status#'>#statusName#</span>" },

        { id: "edit", header: "&nbsp;", width: 50, template: "<span  style=' cursor:pointer;' class='mdi mdi-pencil'></span>" },
        { id: "delete", header: "&nbsp;", width: 50, template: "<span  style='cursor:pointer;' class='mdi mdi-trash-can-outline'></span>" }
    ],
    pager: "pagerA",
    onClick: {
        "mdi-trash-can-outline": function (e, id) {
            webix.confirm({
                text: "The product will be deleted. <br/> Are you sure?", ok: "Yes", cancel: "Cancel",
                callback: (res) => {
                    if (res) {
                        const item = this.getItem(id);
                        item.status = "0";
                        item.statusName = "Deleted";
                        this.refresh(id);
                    }
                }
            });
        }
    },
    ready: function () {
        webix.extend(this, webix.ProgressBar);
    }
};


const controls = [
    {
        view: "button", type: "icon", icon: "mdi mdi-file-excel",
        width: 180, label: "Export To Excel", click: function () {
            webix.toExcel(webix.$$("productsData"));
        }
    },
    {
        view: "button", type: "icon", icon: "mdi mdi-refresh",
        width: 130, label: "Refresh", click: function () {
            var grid = webix.$$("productsData");
            grid.clearAll();
            grid.showProgress();
            webix.delay(function () {
                grid.parse(data);
                grid.hideProgress();
            }, null, null, 300);

        }
    },
    {},
    {
        view: "richselect", id: "order_filter", value: "all", maxWidth: 300, minWidth: 250, vertical: true, labelWidth: 110, options: [
            { id: "all", value: "All" },
            { id: "1", value: "Published" },
            { id: "2", value: "Not published" },
            { id: "0", value: "Deleted" }
        ], label: "Filter products", on: {
            onChange: function () {
                var val = this.getValue();
                if (val == "all")
                    webix.$$("productsData").filter("#status#", "");
                else
                    webix.$$("productsData").filter("#status#", val);
            }
        }
    }
];

const toolbar = {
    view: "toolbar",
    paddingX: 5, paddingY: 5, height: 40,
    cols: [{
        view: "pager", id: "pagerA",
        template: "{common.pages()}",
        autosize: true,
        height: 35, group: 5
    }]
};


function productsPage() {
    webix.ui({
        id: "subview",
        type: "wide",
        rows: [
            { cols: controls },
            { rows: [grid, toolbar] }
        ]
    }, $$("subview"));
}
