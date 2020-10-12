webix.protoUI({
    name: "photo",
    getValue() {
        return this.config.value;
    },
    setValue(value) {
        value = value ? value : "abdul";
        this.setHTML("<img style='height:260px;' webix_tooltip='The image of the Client' src='data/photos/" + value + "_1.jpg'>");
        this.config.value = value;
    }
}, webix.ui.template);