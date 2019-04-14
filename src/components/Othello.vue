<template>
  <div class="container">
    <!-- tabulator実行箇所 -->
    <div>
      <div>{{getTurnText}}</div>
      <div ref="table" id="table"></div>
    </div>
  </div>
</template>
<style scoped>
/* tabulator用CSS */
@import "~tabulator-tables/dist/css/tabulator.min.css";

.container {
  display: flex;
  flex-direction: row;
  justify-content: center;

  text-align: center;
}

#table {
  width: 480px;
}

.tabulator .tabulator-col-title {
  text-align: center;
}

.tabulator-row.tabulator-row-even,
.tabulator-row.tabulator-row-odd {
  background-color: darkgreen;
}
.tabulator-row {
  border-bottom: solid 2px black;
}
.tabulator-row .tabulator-cell {
  padding: 8px 4px;
  border-right: solid 2px black;
  font-size: 2em;
}

.tabulator-row.tabulator-selectable:hover {
  background-color: darkgreen;
}
.tabulator-cell:hover {
  background-color: lightskyblue;
}

.disc_white {
  color: white;
}
.disc_black {
  color: black;
}
</style>
<script>
/** カラム定義ファイル */
import columns from "../assets/othello.json";
/** オセロ初期配置データ */
import initialPlacement from "../assets/othello-init.json";
/** 非同期通信ライブラリ */
import axios from "axios";
/** オセロ石反転用ロジック */
import logic from "../assets/js/OthelloLogic.js";

const Tabulator = require("tabulator-tables");

export default {
  data() {
    return {
      /** tabulator制御用オブジェクト */
      tabulatorObject: null,
      turn: logic.DISC_BLACK
    };
  },
  computed: {
    getTurnText() {
      return (this.turn === logic.DISC_WHITE ? "白" : "黒") + "の手番です。";
    }
  },
  mounted() {
    const discFormatter = (cell, formatterParams, onRendered) => {
      cell
        .getElement()
        .classList.add(
          cell.getValue() === logic.DISC_WHITE ? "disc_white" : "disc_black"
        );

      return cell.getValue() === 0 ? "　" : "●";
    };

    columns.map(column => {
      column.formatter = discFormatter;
    });

    //ここでtabulatorの初期化
    this.tabulatorObject = new Tabulator(this.$refs.table, {
      data: initialPlacement,
      columns: columns, //カラム定義はあらかじめimportしたjsonファイルから拾う
      layout: "fitColumns",
      autoResize: true,
      resizableRows: false,
      resizableColumns: false,
      movableRows: true,
      movableColumns: true,
      cellClick: (e, cell) => {
        this.cellClick(e, cell);
      },
      rowMoved: row => {
        this.moved(row);
      },
      columnMoved: row => {
        this.moved(row);
      }
    });
  },
  methods: {
    cellClick(e, cell) {
      const stone = cell.getValue();
      if (stone !== logic.DISC_NONE) {
        return;
      }
      const column = cell.getColumn().getField();
      const row = cell.getRow().getPosition();
      const updatedData = logic.update(
        this.tabulatorObject.getData(),
        row,
        column,
        this.turn
      );
      if (updatedData) {
        //盤面更新
        this.tabulatorObject.setData(updatedData);
        //手番交代
        this.turn =
          this.turn === logic.DISC_WHITE ? logic.DISC_BLACK : logic.DISC_WHITE;
      }
    },
    moved(row) {
      //行入れ替え完了後処理
    }
  }
};
</script>