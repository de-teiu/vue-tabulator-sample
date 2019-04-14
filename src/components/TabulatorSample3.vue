<template>
  <div>
    <!-- 選択した行の中身を画面に表示させる -->
    <button v-on:click="search()">検索</button>
    <!-- tabulator実行箇所 -->
    <div ref="table"></div>
    <div>{{selectedRowData}}</div>
  </div>
</template>
<style scoped>
/* tabulator用CSS */
@import "~tabulator-tables/dist/css/tabulator.min.css";
</style>
<script>
/** カラム定義ファイル */
import columns from "../assets/sample3columns.json";
/** 非同期通信ライブラリ */
import axios from "axios";

const Tabulator = require("tabulator-tables");

export default {
  data() {
    return {
      /** tabulator制御用オブジェクト */
      tabulatorObject: null,
      selectedRowData: null
    };
  },
  mounted() {
    const vueObject = this;
    //ここでtabulatorの初期化
    this.tabulatorObject = new Tabulator(this.$refs.table, {
      data: [],
      columns: columns, //カラム定義はあらかじめimportしたjsonファイルから拾う
      selectable: 1, //数値を入れるとその値分だけ行選択できる. trueにすると何行でも一気に選択できる.
      rowSelected: function(row) {
        //行選択時イベント
        //選択した行を画面に表示する.
        vueObject.selectedRowData = row.getData();
      }
    });
  },
  methods: {
    search() {
      axios
        .get("/data/sample3.json")
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
    viewRowData(row) {
      this.selectedRowData = row;
    }
  }
};
</script>