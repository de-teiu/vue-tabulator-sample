<template>
  <!-- tabulator実行箇所 -->
  <div ref="table"></div>
</template>
<style scoped>
/* tabulator用CSS */
@import "~tabulator-tables/dist/css/tabulator.min.css";
</style>
<script>
const Tabulator = require("tabulator-tables");

export default {
  data() {
    return {
      /** tabulator制御用オブジェクト */
      tabulatorObject: null,
      /** カラム定義 */
      columns: [
        {
          title: "Name",
          field: "name"
        },
        {
          title: "Task Progress",
          field: "progress",
          align: "left",
          formatter: "progress"
        },
        {
          title: "Gender",
          field: "gender",
          width: 95
        },
        {
          title: "Rating",
          field: "rating",
          formatter: "star",
          align: "center",
          width: 100
        },
        {
          title: "Color",
          field: "col",
          width: 130
        },
        {
          title: "Date Of Birth",
          field: "dob",
          width: 130,
          sorter: "date",
          align: "center"
        },
        {
          title: "Driver",
          field: "car",
          width: 90,
          align: "center",
          formatter: "tickCross",
          sorter: "boolean"
        }
      ],
      /** 表示させるデータ */
      tableData: [
        {
          name: "Alan Francis",
          progress: 90,
          gender: "male",
          rating: 3,
          color: "blue",
          dob: "07/08/1972",
          car: "TRUE"
        },
        {
          name: "Brendon Philips",
          progress: 100,
          gender: "male",
          rating: 1,
          color: "orange",
          dob: "01/08/1980",
          car: ""
        },
        {
          name: "Christine Lobowski",
          progress: 42,
          gender: "female",
          rating: 0,
          color: "green",
          dob: "22/05/1982",
          car: "TRUE"
        },
        {
          name: "Ed White",
          progress: 70,
          gender: "male",
          rating: 0,
          color: "yellow",
          dob: "19/06/1976",
          car: ""
        },
        {
          name: "Emily Sykes",
          progress: 42,
          gender: "female",
          rating: 1,
          color: "maroon",
          dob: "11/11/1970",
          car: ""
        },
        {
          name: "Emma Netwon",
          progress: 40,
          gender: "female",
          rating: 4,
          color: "brown",
          dob: "07/10/1963",
          car: "TRUE"
        },
        {
          name: "Frank Harbours",
          progress: 38,
          gender: "male",
          rating: 4,
          color: "red",
          dob: "12/05/1966",
          car: 1
        },
        {
          name: "Gemma Jane",
          progress: 60,
          gender: "female",
          rating: 0,
          color: "red",
          dob: "22/05/1982",
          car: "TRUE"
        },
        {
          name: "Hannah Farnsworth",
          progress: 30,
          gender: "female",
          rating: 1,
          color: "pink",
          dob: "11/02/1991",
          car: ""
        },
        {
          name: "James Newman",
          progress: 73,
          gender: "male",
          rating: 5,
          color: "red",
          dob: "22/03/1998",
          car: ""
        },
        {
          name: "Jamie Newhart",
          progress: 23,
          gender: "male",
          rating: 3,
          color: "green",
          dob: "14/05/1985",
          car: "TRUE"
        },
        {
          name: "Jenny Green",
          progress: 56,
          gender: "female",
          rating: 4,
          color: "indigo",
          dob: "12/11/1998",
          car: "TRUE"
        },
        {
          name: "John Phillips",
          progress: 80,
          gender: "male",
          rating: 1,
          color: "green",
          dob: "24/09/1950",
          car: "TRUE"
        },
        {
          name: "Margret Marmajuke",
          progress: 16,
          gender: "female",
          rating: 5,
          color: "yellow",
          dob: "31/01/1999",
          car: ""
        },
        {
          name: "Martin Barryman",
          progress: 20,
          gender: "male",
          rating: 5,
          color: "violet",
          dob: "04/04/2001",
          car: ""
        },
        {
          name: "Mary May",
          progress: 1,
          gender: "female",
          rating: 2,
          color: "blue",
          dob: "14/05/1982",
          car: "TRUE"
        },
        {
          name: "Oli Bob",
          progress: 12,
          gender: "male",
          rating: 1,
          color: "red",
          dob: "19/02/1984",
          car: 1
        },
        {
          name: "Paul Branderson",
          progress: 60,
          gender: "male",
          rating: 5,
          color: "orange",
          dob: "01/01/1982",
          car: ""
        },
        {
          name: "Victoria Bath",
          progress: 20,
          gender: "female",
          rating: 2,
          color: "purple",
          dob: "22/03/1986",
          car: ""
        }
      ]
    };
  },
  mounted() {
    //ここでtabulatorの初期化
    this.tabulatorObject = new Tabulator(this.$refs.table, {
      data: this.tableData,
      columns: this.columns,
      layout: "fitColumns"
    });
  }
};
</script>