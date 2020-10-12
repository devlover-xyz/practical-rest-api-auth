var buttons = [
    { view: "button", css: "button_primary button_raised", type: "form", icon: "plus", label: "Save", width: 90 },
    { view: "button", css: "button2", icon: "angle-left", label: "Reset", width: 90 },
    {},
    { view: "button", css: "button_danger button0", icon: "times", label: "Delete", width: 90 }
];

var search = {
    rows: [
        {
            view: "form",
            paddingX: 5,
            paddingY: 5,
            margin: 2,
            rows: [
                { view: "label", label: "Find product:" },
                { view: "search", placeholder: "Type here...", }
            ]
        },
        {
            view: "list",
            id: "list",
            select: true,
            data: productsData,
            template: "<div class='marker status#status#'></div>#code# / #name#"
        }
    ]
};

var editor = {
    view: "form",
    id: "mainView",
    elementsConfig: {
        labelWidth: 130
    },
    scroll: true,
    elements: [
        { view: "text", placeholder: "Type here...", name: "code", label: "Code" },
        { view: "text", placeholder: "Type here...", name: "name", label: "Name" },
        { view: "text", placeholder: "Type here...", name: "price", label: "Price" },
        {
            view: "richselect", placeholder: "Select here...", name: "category", label: "Category", vertical: true, options: [
                { id: 2, value: "Home furniture" },
                { id: 3, value: "Office furniture" },
                { id: 1, value: "Wood furniture" }
            ]
        },
        {
            view: "richselect", placeholder: "Select here...", name: "status", value: "all", label: "Status", options: [
                { id: "1", value: "Published" },
                { id: "2", value: "Not published" },
                { id: "0", value: "Deleted" }
            ]
        },
        { view: "checkbox", name: "in_stock", label: "In stock", value: 1 },
        { view: "label", label: "Full description", height: 30 },
        { id: "editor", view: "textarea", value: "", editor: { language: "en" }, minHeight: 200 },

        {}
    ]
};

var upload = {
    id: "imagesView",
    padding: 10,
    margin: 10,
    rows: [
        {
            cols: [
                {},
                {
                    view: "button", css: "button_primary button_raised", type: "iconButton", icon: "plus-circle", label: "Add image record", width: 210
                }
            ]
        },
        {
            view: "datatable",
            css: "bg_panel_raised",
            editable: true,
            columns: [
                { id: "photo", header: "Image", template: "<span class='product_image webix_icon fa-#icon#'></span>", fillspace: 1 },
                { id: "title", editor: "text", header: "Title", fillspace: 1.7 },
                { id: "usage", editor: "select", options: ["Main image", "Thumbnail"], header: "Usage", fillspace: 1.2 },
                { id: "upload", header: "Upload", template: "<div title='Click to upload' class='product_image_action'><span class='webix_icon fa-download'></span>Upload</div>", fillspace: 1 },
                { id: "delete", header: "Delete", template: "<div title='Click to delete' class='product_image_action'><span class='webix_icon fa-times'></span>Delete</div>", fillspace: 1 }
            ],
            autoheight: true,
            rowHeight: 80,
            data: [
                { id: 1, title: "Product image 1", usage: "Main image", icon: "camera" },
                { id: 2, title: "Product image 2", usage: "Thumbnail", icon: "camera" }
            ],
            on: {
                onAfterLoad: function () {
                    webix.ui({
                        id: "uploadAPI",
                        view: "uploader",
                        upload: "server/upload.php",
                        on: {
                            onFileUploadError: function () {
                                webix.alert("Error during file upload");
                            }
                        },
                        apiOnly: true
                    });
                },
                onItemClick: function (id) {
                    if (id.column == "upload")
                        webix.$$("uploadAPI").fileDialog({ rowid: id.row });
                },
                onDestruct: function () {
                    webix.$$("uploadAPI").destructor();
                }
            }
        },
        {}
    ]

};

var meta = {
    view: "form",
    id: "metaView",
    elementsConfig: {
        labelWidth: 130
    },
    elements: [
        { view: "text", placeholder: "Type here...", name: "meta_title", label: "Title" },
        { view: "textarea", placeholder: "Type here...", label: "Meta Keywords", gravity: 1, minHeight: 80 },
        { view: "textarea", placeholder: "Type here...", label: "Meta Description", gravity: 1.5, minHeight: 80 },
        {}
    ]
};

function producteditPage() {

    webix.ui({
        id: "subview",
        type: "wide",
        cols: [
            search,
            {
                gravity: 2.2,
                rows: [
                    {
                        view: "tabbar", multiview: true, optionWidth: 100,
                        options: [
                            { id: "mainView", value: "Main" },
                            { id: "imagesView", value: "Images" },
                            { id: "metaView", value: "Meta" }
                        ]
                    },
                    {
                        cells: [
                            editor,
                            upload,
                            meta
                        ]
                    },
                    {

                        view: "form",
                        css: "highlighted_header header6",
                        paddingX: 5,
                        paddingY: 5,
                        height: 40,
                        cols: buttons
                    }
                ]
            }
        ]
    }, $$("subview"));

    //view binding
    $$("mainView").bind($$("list"));
}
