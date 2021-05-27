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
        :data="showData"
      ></Table>
      <div style="text-align: center; margin-top: 1vh">
        <Page
          :current="pageCurrent"
          :total="data1.length"
          :page-size="pageSize"
          @on-change="changePage"
        />
      </div>
    </Col>
    <div v-if="current != null">
      <Col offset="1">
        <Row align="middle"
          ><Tag type="border" color="primary">学号</Tag> {{ current.uid }}
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">姓名</Tag> {{ current.name }}
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">类型</Tag> {{ current.type }}
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">拟签约单位</Tag>
          {{ current.company }}
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">工作地（省市区）</Tag>
          {{ current.base }}
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">薪资待遇</Tag>
          {{ current.salary }} 万</Row
        >
      </Col>
    </div>
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
      current: null,
      pageCurrent: 1,
      showData: [],
      pageSize: 10,
    };
  },
  mounted() {
    this.$axios.get(this.back_server + "/user/getJob").then((res) => {
      console.log(res);
      this.data = res.data;
      this.data1 = this.data;
      this.changePage(1);
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
      this.changePage(1);
    },
    searchByName() {
      this.data1 = [];
      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i].name.match(this.search2))
          this.data1.push(this.data[i]);
      }
      this.changePage(1);
    },
    changePage(index) {
      this.pageCurrent = index;
      this.showData = [];
      var start = (this.pageCurrent - 1) * this.pageSize;
      var end = this.pageCurrent * this.pageSize;
      for (var i = start; i < end && i < this.data1.length; i++) {
        this.showData.push(this.data1[i]);
      }
    },
  },
};
</script>

<style>
</style>