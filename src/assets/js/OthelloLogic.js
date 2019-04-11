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

    const directions = [];
    checkOrder.forEach((direction) => {
        if (canPut(data, x, y, direction[0], direction[1], disc)) {
            console.log(direction);
            directions.push(direction);
        }
    });
    if (directions.length === 0) {
        return null;
    }

    const updatedData = reverse(data, x, y, directions, disc);
    const updatedTableData = arrayToTableData(updatedData);
    return updatedTableData;
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

const reverse = (data, startX, startY, directions, disc) => {
    const targetDisc = disc === DISC_WHITE ? DISC_BLACK : DISC_WHITE;

    data[startY][startX] = disc;
    directions.forEach((direction) => {
        let x = startX;
        let y = startY;
        while (1) {
            x += direction[0];
            y += direction[1];
            if (x < 0 || x > 7 || y < 0 || y > 7) {
                break;
            }

            if (data[y][x] !== targetDisc) {
                break;
            }
            data[y][x] = disc;
        }
    });
    return data;
}
const arrayToTableData = (arrayData) => {
    const tableData = [];
    arrayData.forEach((row) => {
        const tableRow = {};
        let startCode = "A".charCodeAt(0);
        row.forEach((value) => {
            tableRow[String.fromCharCode(startCode)] = value;
            startCode++;
        });

        tableData.push(tableRow);
    });
    return tableData;
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