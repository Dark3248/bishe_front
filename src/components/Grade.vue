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
        :data="data"
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
      img: [],
      postData: {
        uid: "",
        type: "",
        examineStatus: "",
        examineContent: "",
      },
      current: "",
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
        });
    },
    change(currentRow, index) {
      this.img = [];
      for (var i = 0; i < currentRow.gradePath.length; i++) {
        this.img.push(this.back_server + currentRow.gradePath[i]);
      }
      this.current = currentRow.uid;
      console.log(this.img);
    },
    ok(value) {
      this.$Spin.show();
      if (value === 1) {
        this.postData.examineContent = "审批通过";
      }
      console.log(this.postData.examineContent);
      this.postData.type = sessionStorage.getItem("utype");
      this.postData.examineStatus = value;
      this.postData.uid = this.current;
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
  },
};
</script>

<style>
</style>