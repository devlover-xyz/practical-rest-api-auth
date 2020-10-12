function transactionsPage(){
    webix.ui({
        id:"subview",
        type: "wide",
        cols: [
            {
                rows: [
                    {template:"TRANSACTION"}
                ]
            }
        ]
    }, $$("subview"));
}
