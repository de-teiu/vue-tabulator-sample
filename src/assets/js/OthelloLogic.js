const DISC_NONE = 0;
const DISC_WHITE = 1;
const DISC_BLACK = 2;

const checkOrder = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1]
]

const update = (tableData, row, column, disc) => {
    //テーブルから取得したデータを2次元配列に変換
    const data = getRawData(tableData);
    //クリックした座標を取得
    const y = Number(row);
    const x = column.charCodeAt(0) - "A".charCodeAt(0);
    checkOrder.forEach((order) => {
        if (canPut(data, x, y, order[0], order[1], disc)) {
            console.log("ここは置ける.");
            console.log(order);
        }
    });


    return null;
}

const canPut = (data, startX, startY, orderX, orderY, disc) => {
    let targetX = startX + orderX;
    let targetY = startY + orderY;

    let targetCount = 0;
    while (1) {
        if (targetX < 0 || targetX > 7 || targetY < 0 || targetY > 7) {
            return false;
        }
        const value = data[targetY][targetX];
        if (value === disc) {
            break;
        }
        if (value === DISC_NONE) {
            return false;
        }
        targetCount++;
        targetX += orderX;
        targetY += orderY;
    }
    return targetCount > 0;
}

const getRawData = (tableData) => {
    const result = [];
    tableData.forEach((row) => {
        const rowArray = [];
        Object.entries(row).forEach(([k, v]) => rowArray.push(v));
        result.push(rowArray);
    });

    return result;
};

export default {
    DISC_NONE,
    DISC_WHITE,
    DISC_BLACK,
    update
};