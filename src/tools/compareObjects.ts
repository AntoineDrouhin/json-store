import { print } from "util";

const INDENT = "    ";

/**
 * Function, compute the number of spaces necessary based on the computation level.
 */
const computeIndentation = computeIndentationClosure();

export default function compareObjects(obj1: any, obj2: any) {
    let result = "";
    result += compareObjectRec(obj1, obj2, 0);
    return result;
}; 

function compareObjectRec(obj1: any, obj2: any, indent: number, key?: string) {
    
    let result = key ? computeIndentation(indent) + `"${key}" : {\n`
        :  computeIndentation(indent) + `{\n`; 
    
    
    const keys1 = Object.keys(obj1).sort(); // sorted keys of obj1
    const keys2 = Object.keys(obj2).sort(); // sorted keys of obj2

    let i = 0, j = 0;

        while (i < keys1.length && j < keys2.length) {
            if (keys1[i] == keys2[j]) { // the key exists in both objects

                // if they are objects => recursive call
                if (typeof obj1[keys1[i]] == "object" && typeof obj2[keys1[j]] == "object") {
                    result += compareObjectRec(obj1[keys1[i]], obj2[keys1[i]], indent + 1, keys1[i]);
                } else {
                    if (obj1[keys1[i]] == obj2[keys1[i]]) {
                        // Print the unchanged item
                        result += printItem(keys1[i], obj1[keys1[i]], "", indent + 1);
                    } else {
                        // print the one from obj1 with - and the one from obj2 with +
                        result += printItem(keys1[i], obj1[keys1[i]], "-", indent + 1);
                        result += printItem(keys1[i], obj2[keys1[i]], "+", indent + 1);
                    }
                }

                i++;
                j++;
            } else {
                // if key1 < key2 => key1 doesn't exist in obj2
                if (keys1[i] < keys2[j]) {
                    result += printItem(keys1[i], obj1[keys1[i]], "-", indent + 1);
                    i++;
                }

                // if key1 > key2 => key2 is new in obj2
                if (keys1[i] > keys2[j]) {
                    result += printItem(keys2[j], obj2[keys2[j]], "+", indent + 1);
                    j++;
                }
            }
        }

        // Print the remaining items
        while (i < keys1.length) {
            result += printItem(keys1[i], obj1[keys1[i]], "-", indent + 1);
            i++;
        }
        while (j < keys2.length) {
            result += printItem(keys2[j], obj2[keys2[j]], "+", indent + 1);
            j++;
        }


        result += computeIndentation(indent)+ "}\n";

        // print the end of the unfinished array
    
    return result;
}

/**
 * 
 * @param item 
 * @param prefix 
 * @param indent 
 */
export function printItem(key: string, item: any, prefix: string, indent: number){
    let result= prefix + computeIndentation(indent)+ `"${key}": `;
    switch (typeof item) {
        case "string":
            return result + `"${item}"\n`
        case "number":
        case "boolean":
            return result + item + "\n"
        case "object":
            result += JSON.stringify(item, null, INDENT).replace(/\n/g, "\n"
                + prefix
                + computeIndentation(indent)) + "\n";
    }

    return result;
    
}

/**
 * Closure, return a function that will compute the spacing at the beginning of a line depending of the indentation level.
 */
function computeIndentationClosure() {
    let cache: any = {};
    return function computeIndentation(n: number){
        if (cache[n] !== undefined) {
            return cache[n];
        }
        else {
            let result = "";
            for (let i = 0; i < n; i++) {
                result += INDENT;   
            }
            cache[n] = result;
            return result;
        }
    }
}

