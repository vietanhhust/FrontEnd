import "reflect-metadata";
const attrKey = Symbol("title");

function setTitle(title: string) {
    return Reflect.metadata(attrKey, title);
}

function getTitle(target: any, propertyKey: string) {
    return Reflect.getMetadata(attrKey, target, propertyKey);
}

const attrCssClassKey = Symbol("cssClass");

function setCssClass(title: string) {
    return Reflect.metadata(attrCssClassKey, title);
}

function getCssClass(target: any, propertyKey: string) {
    return Reflect.getMetadata(attrCssClassKey, target, propertyKey);
}


function getSelectOptions(object: any): OptionModel[] {
    let options: OptionModel[] = [];
    for (let p in object) {
        if (object.hasOwnProperty(p)) {
            options.push({ value: object[p], title: getTitle(object, p), cssClass: getCssClass(object, p) })
        }
    }
    return options;
}
function getCheckboxItem(object: any): CheckboxModel[] {
    let options: CheckboxModel[] = [];
    for (let p in object) {
        if (object.hasOwnProperty(p)) {
            options.push({ value: object[p], title: getTitle(object, p), checked: false });
        }
    }
    return options;
}
export { setTitle, getTitle, setCssClass, getCssClass, getSelectOptions, getCheckboxItem }