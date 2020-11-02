var arr = [0, 0, 1, 2, 3, 4, 5, 10, 12, 22, 123, 333, 333, 444, 555, 666, 777, 888, 999, 1000];
console.log(arr.length)


function countionSort(arr) {
    var countArr = [];
    var count = 0; // 辅助计数

    // 把原始数组的元素, 当做索引值, 记录出现的次数
    arr.forEach(function(value) {
        if (!countArr[value]) {
            countArr[value] = 1;
        } else {
            countArr[value] += 1;
        }
        count += 1;
    });

    // 按照出现的次数, 把索引值 当做新数组的 value, unshift|push 正序|反序
    var newArr = [];
    countArr.forEach(function(value, index) {
        if (value) {
            while (value) {
                // newArr.push(index);
                newArr.unshift(index);
                value--;
                count += 1;
            }
        }
    });
    console.log(countArr);
    return newArr;
}

console.log(countionSort(arr));