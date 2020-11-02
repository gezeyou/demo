const data = {
    123: {
        x: 1,
        list: [
            [{ x: 1 }, { x: 2 }],
            [{ x: 4 }, { x: 3 }]
        ]
    },
    124: { x: 2 }
};
const id = 123;
const ids = 124;
const i = 1;
if (data.hasOwnProperty(id)) {
    console.log(data[id].list[i]);
    console.log(data[ids]);
}
data[id].list.splice(0, 1);
console.log(data[id].list);
const obj = { x: 56 };
const obj1 = { x: 45 };
data[id].list.push([obj]);
console.log(data[id].list);
data[id].list[i].push(obj1);
console.log(data[id].list);