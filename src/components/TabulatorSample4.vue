<template>
  <div>
    <!-- テーブルの内容を編集してCSVとかでダウンロードするテスト -->
    <button v-on:click="search()">検索</button>
    <!-- tabulator実行箇所 -->
    <div ref="table"></div>
    <button v-on:click="downloadCsv()">CSV</button>
    <button v-on:click="downloadJson()">Json</button>
  </div>
</template>
<style scoped>
/* tabulator用CSS */
@import "~tabulator-tables/dist/css/tabulator.min.css";

button {
  margin-right: 20px;
}
</style>
<script>
/** カラム定義ファイル */
import columns from "../assets/sample4columns.json";
/** 非同期通信ライブラリ */
import axios from "axios";

const Tabulator = require("tabulator-tables");

export default {
  data() {
    return {
      /** tabulator制御用オブジェクト */
      tabulatorObject: null
    };
  },
  mounted() {
    //ここでtabulatorの初期化
    this.tabulatorObject = new Tabulator(this.$refs.table, {
      data: [],
      height: 400,
      columns: columns, //カラム定義はあらかじめimportしたjsonファイルから拾う
      layout: "fitColumns",
      cellEdited: cell => {
        this.calcTax(cell);
      }
    });
  },
  methods: {
    search() {
      axios
        .get("/data/sample4.json")
        .then(res => {
          this.tabulatorObject
            .setData(res.data)
            .then(function() {
              //テーブル更新成功時
              console.log("complete!");
            })
            .catch(function(error) {
              //テーブル更新失敗時
              console.log("exception...");
            });
        })
        .catch(error => {
          console.log(error);
        });
    },
    calcTax(cell) {
      const field = cell.getField();
      if ("price" !== field && "taxRate" !== field) {
        return;
      }
      const price = cell
        .getRow()
        .getCell("price")
        .getValue();
      const taxRate = cell
        .getRow()
        .getCell("taxRate")
        .getValue();

      const taxCell = cell.getRow().getCell("tax");
      const tax = Math.round(price * taxRate);
      taxCell.setValue(tax, true);
    },
    downloadCsv() {
      this.tabulatorObject.download("csv", "data.csv", { bom: true });
    },
    downloadJson() {
      this.tabulatorObject.download("json", "data.json");
    }
  }
};
</script>