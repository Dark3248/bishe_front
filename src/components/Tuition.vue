<template>
  <div v-if="data.length == 0">您已完成了所有审批</div>
  <Row v-else>
    <Col offset="1" span="5">
      <Table
        highlight-row
        @on-row-click="change"
        :columns="columns"
        :data="data"
      ></Table>
    </Col>
    <Col offset="1">
      <div>
        学费证明
      </div>
      <Row v-for="item in img" :key="item" style="margin-bottom: 3vh">
        <img :src="item" />
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
  name: "Tuition",
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
      this.$axios.get(this.back_server + "/examine/getTuition").then((res) => {
        this.data = res.data;
        if (this.data.length !== 0) this.change(this.data[0]);
      });
    },
    change(currentRow, index) {
      this.img = [];
      for (var i = 0; i < currentRow.tuitionPath.length; i++) {
        this.img.push(this.back_server + currentRow.tuitionPath[i]);
      }
      this.current = currentRow.uid;
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