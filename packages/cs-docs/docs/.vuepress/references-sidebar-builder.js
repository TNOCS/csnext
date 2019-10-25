const SidebarItem = require('./sidebar-item.js')

class ReferencesSidebarBuilder {
    constructor(config) {
        this.config = config;
    }

    build_sidenav_children() {
        let sidenav_items = {}
        for(let i = 0; i < this.config.length; i++) {
            for(let j = 0; j < this.config[i]['children'].length; j++) {
                let type = this.config[i]['title'].toLowerCase()
                let item = this.config[i]['children'][j];
                let name = this.get_name_from_item(item)

                if(name in sidenav_items) {
                    sidenav_items[name].insert(type, item)
                } else {
                    sidenav_items[name] = new SidebarItem()
                    sidenav_items[name].insert(type, item)
                }
            }
        }       

        return sidenav_items
    }

    build_sidenav() {
        const sidenav_items = this.build_sidenav_children()
        let children = ['']

        for(var key in sidenav_items) {
            let item = sidenav_items[key]
            let obj = {
                title: key,
                collapsable: true,
                children: [
                    item.get_classes_object(), 
                    item.get_interfaces_object(), 
                    item.get_enums_object(), 
                    item.get_modules_object()]
            }
            children.push(obj)
        }
        
        return children
    }

    get_name_from_item(item) {
        let names = [
            {name: "cli_plugin_cs",     screen_name: "cs cli plugin"},
            {name: "cs_billboard",      screen_name: "cs billboard"},
            {name: "cs_client",         screen_name: "cs client"},
            {name: "cs_core",           screen_name: "cs core"},
            {name: "cs_drag_grid",      screen_name: "cs drag grid"},
            {name: "cs_form",           screen_name: "cs form"},
            {name: "cs_layer_server",   screen_name: "cs layer server"},
            {name: "cs_log",            screen_name: "cs log"},
            {name: "cs_map",            screen_name: "cs map"},
            {name: "cs_markdown",       screen_name: "cs markdown"},
            {name: "cs_split_panel",    screen_name: "cs split panel"},
            {name: "cs_timeline",       screen_name: "cs timeline"},
        ]

        let name = names.find(function get_item(i) {
            return item.includes(i.name);
        }).screen_name

        return name
    }
}

module.exports = ReferencesSidebarBuilder