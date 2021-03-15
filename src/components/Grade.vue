<template>
  <div v-if="data.length == 0">您已完成了所有审批</div>
  <Row v-else>
    <Col offset="1" span="5">
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
    <Col offset="1" span="16">
      <Tag>成绩证明</Tag>
      <Row v-for="item in img" :key="item" style="margin-bottom: 3vh">
        <Card>
          <img :src="item" width="100%" />
        </Card>
      </Row>
      <Divider dashed></Divider>
      <Row justify="center" v-if="current != ''">
        <Button type="success" style="margin-right: 10vh" @click="ok(1)"
          >通过</Button
        >
        <Button type="error" @click="modal = true">不通过</Button>
        <Modal
          v-model="modal"
          title="请输入不通过的理由"
          size="large"
          @on-ok="ok(2)"
          @on-cancel="cancel"
        >
          <Input
            type="textarea"
            :rows="8"
            maxlength="45"
            v-model="postData.examineContent"
          />
        </Modal>
      </Row>
    </Col>
  </Row>
</template>

<script>
export default {
  name: "Grade",
  data() {
    return {
      modal: false,
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
      data: [],
      data1: [],
      img: [],
      postData: {
        uid: "",
        type: "",
        examineStatus: "",
        examineContent: "",
        examiner: ""
      },
      current: "",
      search1: "",
      search2: "",
    };
  },
  mounted() {
    this.refresh();
  },
  methods: {
    refresh() {
      this.$axios
        .get(this.back_server + "/examine/getGrade", {
          params: {
            username: sessionStorage.getItem("username"),
          },
        })
        .then((res) => {
          this.data = res.data;
          if (this.data.length !== 0) this.change(this.data[0]);
          this.data1 = this.data
        });
    },
    change(currentRow, index) {
      this.img = [];
      for (var i = 0; i < currentRow.gradePath.length; i++) {
        this.img.push(this.back_server + currentRow.gradePath[i]);
      }
      this.current = currentRow.uid;
    },
    ok(value) {
      this.$Spin.show();
      if (value === 1) {
        this.postData.examineContent = "审批通过";
      }
      this.postData.type = sessionStorage.getItem("utype");
      this.postData.examineStatus = value;
      this.postData.uid = this.current;
      this.postData.examiner = sessionStorage.getItem("username")
      this.$axios
        .post(this.back_server + "/examine/", this.postData)
        .then((res) => {
          this.$Message.success("提交成功");
          this.refresh();
          this.$Spin.hide();
        });
      this.postData.examineContent = "";
    },
    cancel() {},
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