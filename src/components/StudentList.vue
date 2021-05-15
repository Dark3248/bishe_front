<template>
  <div>
    <Row style="margin-bottom: 1vh">
      <Col span="4" offset="1">
        <Input
          search
          placeholder="根据学号检索"
          v-model="search1"
          @on-search="searchById()"
        ></Input>
      </Col>
      <Col span="4" offset="4">
        <Input
          search
          placeholder="根据姓名检索"
          v-model="search2"
          @on-search="searchByName()"
        ></Input>
      </Col>
      <Col span="4" offset="4">
        <Input
          search
          placeholder="根据阶段检索"
          v-model="search3"
          @on-search="searchByStatus()"
        ></Input>
      </Col>
    </Row>
    <Table :columns="columns" :data="showData"></Table>
    <div style="text-align: center; margin-top: 1vh">
      <Page
        :current="pageCurrent"
        :total="record1.length"
        :page-size="pageSize"
        @on-change="changePage"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "StudentList",
  data() {
    return {
      columns: [
        {
          type: "index",
          width: 60,
          align: "center",
        },
        {
          title: "学号",
          key: "uid",
        },
        {
          title: "姓名",
          key: "name",
        },
        {
          title: "类型",
          key: "type"
        },
        {
          title: "研究方向",
          key: "direction"
        },
        {
          title: "当前状态",
          key: "status",
        },
        {
          title: "学费是否提交",
          key: "tuition",
        },
        {
          title: "成绩是否合格",
          key: "grade",
        },
        {
          title: "图书是否归还",
          key: "book",
        },
        {
          title: "论文电子版是否提交",
          key: "paper",
        },
      ],
      record: [],
      record1: [],
      search1: "",
      search2: "",
      search3: "",
      pageCurrent: 1,
      showData: [],
      pageSize: 10,
    };
  },
  mounted() {
    var role = sessionStorage.getItem("name");
    var type = 0;
    if (role == "班主任") {
      type = 2;
    } else if (role == "学籍管理员") {
      type = 1;
    } else if (role == "超级管理员") {
      type = 1;
    }
    this.$axios
      .get(this.back_server + "/user/getAllStudent", {
        params: {
          type: type,
          teacher: sessionStorage.getItem("username"),
        },
      })
      .then((res) => {
        console.log(res.data)
        this.record = res.data;
        for (var i = 0; i < this.record.length; i++) {
          if (this.record[i].status == 1) {
            this.record[i].status = "实习阶段";
          } else if (this.record[i].status <= 3) {
            this.record[i].status = "开题阶段";
          } else if (this.record[i].status <= 4) {
            this.record[i].status = "中期阶段";
          } else if (this.record[i].status <= 5) {
            this.record[i].status = "毕业答辩阶段";
          } else if (this.record[i].status <= 6) {
            this.record[i].status = "离校阶段";
          } else {
            this.record[i].status = "已毕业";
          }

          if (this.record[i].tuition == true) this.record[i].tuition = "是";
          else this.record[i].tuition = "否";

          if (this.record[i].paper == true) this.record[i].paper = "是";
          else this.record[i].paper = "否";

          if (this.record[i].grade == true) this.record[i].grade = "是";
          else this.record[i].grade = "否";

          if (this.record[i].book == true) this.record[i].book = "是";
          else this.record[i].book = "否";

          if (this.record[i].type == 1) this.record[i].type = "全日制"
          else this.record[i].type = "非全日制"
        }
        this.record1 = this.record;
        this.changePage(1);
      });
  },
  methods: {
    searchById() {
      this.record1 = [];
      for (var i = 0; i < this.record.length; i++) {
        if (this.record[i].uid.match(this.search1))
          this.record1.push(this.record[i]);
      }
      this.pageCurrent = 1;
      this.changePage(1);
    },
    searchByName() {
      this.record1 = [];
      for (var i = 0; i < this.record.length; i++) {
        if (this.record[i].name.match(this.search2))
          this.record1.push(this.record[i]);
      }
      this.pageCurrent = 1;
      this.changePage(1);
    },
    searchByStatus() {
      this.record1 = [];
      for (var i = 0; i < this.record.length; i++) {
        if (this.record[i].status.match(this.search3))
          this.record1.push(this.record[i]);
      }
      this.pageCurrent = 1;
      this.changePage(1);
    },
    changePage(index) {
      this.pageCurrent = index;
      this.showData = [];
      var start = (this.pageCurrent - 1) * this.pageSize;
      var end = this.pageCurrent * this.pageSize;
      for (var i = start; i < end && i < this.record1.length; i++) {
        this.showData.push(this.record1[i]);
      }
    },
  },
};
</script>

<style>
</style>