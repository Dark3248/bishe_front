<template>
  <Row>
    <Col span="5" offset="1">
      <Row style="margin-bottom: 1vh">
        <Input
          search
          placeholder="根据学号检索"
          v-model="search1"
          @on-search="searchById()"
        ></Input>
      </Row>
      <Row style="margin-bottom: 1vh">
        <Input
          search
          placeholder="根据姓名检索"
          v-model="search2"
          @on-search="searchByName()"
        ></Input>
      </Row>
      <Table
        highlight-row
        @on-row-click="change"
        :columns="columns"
        :data="data1"
      ></Table>
    </Col>
    <Col span="16" offset="1">
      <Row> 学号：{{ current.uid }} </Row>
      <Row> 姓名：{{ current.name }} </Row>
      <Row> 类型：{{ current.type }} </Row>
      <Row> 拟签约单位：{{ current.company }} </Row>
      <Row> 工作地（省市区）：{{ current.base }} </Row>
      <Row> 薪资待遇：{{ current.salary }} 万</Row>
    </Col>
  </Row>
</template>

<script>
export default {
  name: "AllJob",
  data() {
    return {
      data: [],
      data1: [],
      columns: [
        {
          type: "index",
          width: 60,
          align: "center",
        },
        {
          title: "姓名",
          key: "name",
        },
        {
          title: "学号",
          key: "uid",
        },
      ],
      search1: "",
      search2: "",
      current: {},
    };
  },
  mounted() {
    this.$axios.get(this.back_server + "/user/getJob").then((res) => {
      console.log(res);
      this.data = res.data;
      this.data1 = this.data;
    });
  },
  methods: {
    change(currentRow) {
      this.current = currentRow;
    },
    searchById() {
      this.data1 = [];
      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i].uid.match(this.search1)) this.data1.push(this.data[i]);
      }
    },
    searchByName() {
      this.data1 = [];
      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i].name.match(this.search2))
          this.data1.push(this.data[i]);
      }
    },
  },
};
</script>

<style>
</style>