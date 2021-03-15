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
      <Col span="4" offset="2">
        <Input
          search
          placeholder="根据是否通过检索"
          v-model="search4"
          @on-search="searchByPass()"
        ></Input>
      </Col>
      <Col span="4" offset="2">
        <Input
          search
          placeholder="根据类型检索"
          v-model="search2"
          @on-search="searchByType()"
        ></Input>
      </Col>
      <Col span="4" offset="2">
        <Input
          search
          placeholder="根据时间检索"
          v-model="search3"
          @on-search="searchByTime()"
        ></Input>
      </Col>
    </Row>
    <Table :columns="columns" :data="record1"></Table>
  </div>
</template>

<script>
export default {
  name: "ExamineRecord",
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
          title: "是否通过",
          key: "pass",
        },
        {
          title: "类型",
          key: "type",
        },
        {
          title: "时间",
          key: "date",
        },
      ],
      record: [],
      record1: [],
      search1: "",
      search2: "",
      search3: "",
      search4: ""
    };
  },
  mounted() {
    this.$axios
      .get(this.back_server + "/examine/getExamine", {
        params: {
          username: sessionStorage.getItem("username"),
        },
      })
      .then((res) => {
        this.record = res.data;
        for (var i = 0; i < this.record.length; i++) {
          if (this.record[i].type == 2) {
            this.record[i].type = "成绩单审批";
          } else if (this.record[i].type == 3) {
            this.record[i].type = "学费审批";
          } else if (this.record[i].type == 4) {
            this.record[i].type = "其余实习材料审批";
          } else {
            this.record[i].type = "月报审批";
          }

          if (this.record[i].pass == true) {
            this.record[i].pass = "是";
          } else {
            this.record[i].pass = "否";
          }

          this.record[i].date = this.$moment(this.record[i].date).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        }
        this.record1 = this.record;
      });
  },
  methods: {
    searchById() {
      this.record1 = [];
      for (var i = 0; i < this.record.length; i++) {
        if (this.record[i].uid.match(this.search1))
          this.record1.push(this.record[i]);
      }
    },
    searchByType() {
      this.record1 = [];
      for (var i = 0; i < this.record.length; i++) {
        if (this.record[i].type.match(this.search2))
          this.record1.push(this.record[i]);
      }
    },
    searchByTime() {
      this.record1 = [];
      for (var i = 0; i < this.record.length; i++) {
        if (this.record[i].date.match(this.search3))
          this.record1.push(this.record[i]);
      }
    },
    searchByPass() {
      this.record1 = [];
      for (var i = 0; i < this.record.length; i++) {
        if (this.record[i].pass.match(this.search4))
          this.record1.push(this.record[i]);
      }
    },
  },
};
</script>

<style>
</style>