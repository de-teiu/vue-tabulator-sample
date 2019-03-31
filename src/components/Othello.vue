<template>
  <div class="container">
    <!-- tabulator実行箇所 -->
    <div>
      <div>{{getTurnText}}</div>
      <div ref="table" id="table"></div>
    </div>
  </div>
</template>
<style>
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

const Tabulator = require("tabulator-tables");
const DISC_NONE = 0;
const DISC_WHITE = 1;
const DISC_BLACK = 2;

export default {
  data() {
    return {
      /** tabulator制御用オブジェクト */
      tabulatorObject: null,
      turn: DISC_BLACK
    };
  },
  computed: {
    getTurnText() {
      return (this.turn === DISC_WHITE ? "白" : "黒") + "の手番です。";
    }
  },
  mounted() {
    const discFormatter = (cell, formatterParams, onRendered) => {
      cell
        .getElement()
        .classList.add(
          cell.getValue() === DISC_WHITE ? "disc_white" : "disc_black"
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
      console.log(this.tabulatorObject.getRows());
      const stone = cell.getValue();
      if (stone !== DISC_NONE) {
        return;
      }
    },
    moved(row) {
      //行入れ替え、列入れ替えをしたら手番交代とする
      this.turn = this.turn === DISC_WHITE ? DISC_BLACK : DISC_WHITE;
    }
  }
};
</script>