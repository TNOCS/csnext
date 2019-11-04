class SidebarItem {
    constructor() {
        this.classes = [];
        this.interfaces = [];
        this.enums = [];
        this.modules = [];
    }

    // Clean these function and turn into 1
    get_interfaces_object() {
        return {
            title: 'Interfaces',
            collapsable: true,
            children: this.interfaces
        }
    }

    get_classes_object() {
        return {
            title: 'Classes',
            collapsable: true,
            children: this.classes
        }
    }

    get_enums_object() {
        return {
            title: 'Enums',
            collapsable: true,
            children: this.enums
        }
    }

    get_modules_object() {
        return {
            title: 'Modules',
            collapsable: true,
            children: this.modules
        }
    }

    insert(type, item) {
        switch(type) {
            case 'interfaces':
                this.interfaces.push(item)
                break;
            case 'classes':
                this.classes.push(item)
                break;
            case 'enums':
                this.enums.push(item)
                break;
            case 'modules':
                this.modules.push(item)
                break;
        }
    }
}

module.exports = SidebarItem