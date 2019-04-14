<template>
  <div>
    <!-- 検索ボタンを押してテーブルに結果を表示させるテスト -->
    <button v-on:click="search()">検索</button>
    <!-- tabulator実行箇所 -->
    <div ref="table"></div>
  </div>
</template>
<style scoped>
/* tabulator用CSS */
@import "~tabulator-tables/dist/css/tabulator.min.css";
</style>
<script>
/** カラム定義ファイル */
import columns from "../assets/sample2columns.json";
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
      columns: columns, //カラム定義はあらかじめimportしたjsonファイルから拾う
      layout: "fitColumns"
    });
  },
  methods: {
    search() {
      axios
        .get("/data/sample2.json")
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
    }
  }
};
</script>