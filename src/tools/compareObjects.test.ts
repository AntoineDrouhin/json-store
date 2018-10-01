

import test from "tape";
import compareObjects, { printItem} from "./compareObjects"
 
test('CompareObjects()', function (t) {

    const mockObject1 = {"a": 1, "b": 2};
    const mockObject2 = {"b": 2, "a": 1};

    t.equal(compareObjects(mockObject1, mockObject2),
        '{\n    "a": 1\n    "b": 2\n}\n',
        "objects with no diffs");

    const mockObject3 = {"a": 1, "b": 1};
    t.equal(compareObjects(mockObject1, mockObject3),
    '{\n    "a": 1\n-    "b": 2\n+    "b": 1\n}\n',
        "differents objects");

    const mockObject4 = {"a": 1, "b": 2, c: {d: "test string", "e": false}, "f": { "g": 3}};
    const mockObject5 = {"a": 1, "b": 2, c: {d: "test string", "e": false}, "f": { g: 4 }};
    t.equal(compareObjects(mockObject4, mockObject5),
    '{\n    "a": 1\n    "b": 2\n    "c" : {\n        "d": "test string"\n        "e": false\n    }\n    "f" : {\n-        "g": 3\n+        "g": 4\n    }\n}\n',
        "differents nested objects");

    const mockObject6 = {"a": 1, "b": 2, c: {d: "test string", "e": false}};
    const mockObject7 = {"a": 1, "b": 2, "f": { g: 4 }};
    t.equal(compareObjects(mockObject6, mockObject7),
    '{\n    "a": 1\n    "b": 2\n-    "c": {\n-        "d": "test string",\n-        "e": false\n-    }\n+    "f": {\n+        "g": 4\n+    }\n}\n',
        "differents nested objects");



    t.end();
});


test('printItem()', function (t) {
    
    const mockItem1 = {"a": 1, "b": 2};

    t.equal(
        printItem("mockItem1", mockItem1, "-", 3),
        '-            "mockItem1": {\n-                "a": 1,\n-                "b": 2\n-            }\n',
        "print object correctly");

    const mockItem2 = 2;

    t.equal(
        printItem("mockNumber", mockItem2, "-", 5),
        '-                    "mockNumber": 2\n',
        "print integer correctly");

    t.end();
});
