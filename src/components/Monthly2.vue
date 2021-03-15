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
    <Col offset="1" span="16">
      <Tabs v-if="current != ''">
        <TabPane
          :label="'月报' + (index + 1).toString()"
          v-for="(item, index) in pdf"
          :key="item.num"
        >
          <Card>
            <pdf
              ref="pdf"
              :src="item.path"
              @num-pages="pageTotalNum[index] = $event"
              @page-loaded="currentPage[index] = $event"
              @loaded="loadPdfHandler"
              :page="currentPage[index]"
            >
            </pdf>
          </Card>
          <div style="text-align: center; margin-top: 1vh">
            <ButtonGroup shape="circle">
              <Button type="primary" ghost @click="changePdfPage(0, index)">
                <Icon type="ios-arrow-back"></Icon>
                上一页
              </Button>
              <Button type="primary" ghost @click="changePdfPage(1, index)">
                下一页
                <Icon type="ios-arrow-forward"></Icon>
              </Button>
            </ButtonGroup>
          </div>
          <Row justify="center" style="margin-top: 3vh">
            <Button
              type="success"
              style="margin-right: 10vh"
              @click="ok2()"
              >全部通过</Button
            >
            <Button
              type="success"
              style="margin-right: 10vh"
              @click="ok(1, item.num, index)"
              >通过</Button
            >
            <Button type="error" @click="modal = true">不通过</Button>
            <Modal
              v-model="modal"
              title="请输入不通过的理由"
              size="large"
              @on-ok="ok(2, item.num, index)"
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
        </TabPane>
      </Tabs>
    </Col>
  </Row>
</template>

<script>
import pdf from "vue-pdf";
export default {
  name: "Monthly2",
  components: {
    pdf,
  },
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
          title: "学号",
          key: "uid",
        },
      ],
      data: [],
      pdf: [],
      postData: {
        uid: "",
        num: 0,
        examineStatus: "",
        examineContent: "",
        examiner: ""
      },
      current: "",
      pageTotalNum: [],
      currentPage: [],
    };
  },
  mounted() {
    this.refresh();
  },
  methods: {
    refresh() {
      this.$axios.get(this.back_server + "/examine/getMonthly").then((res) => {
        this.data = res.data;
        this.currentPage = [];
        for (var i = 0; i < this.data.length; i++) {
          for (var j = 0; j < this.data[i].monthlyList.length; j++) {
            this.data[i].monthlyList[j].path =
              this.back_server + this.data[i].monthlyList[j].path;
            this.currentPage.push(1);
          }
        }
        if (this.data.length !== 0) this.change(this.data[0]);
      });
    },
    change(currentRow, index) {
      this.pdf = currentRow.monthlyList;
      this.current = currentRow.uid;
    },
    ok(value, num, index) {
      this.$Spin.show();
      if (value === 1) {
        this.postData.examineContent = "审批通过";
      }
      this.postData.num = num;
      this.postData.examineStatus = value;
      this.postData.uid = this.current;
      this.postData.examiner = sessionStorage.getItem("username")
      this.$axios
        .post(this.back_server + "/examine/examineMonthly", this.postData)
        .then((res) => {
          this.$Message.success("提交成功");
          this.refresh();
          this.$Spin.hide();
        });
      this.postData.examineContent = "";
      this.pageTotalNum.splice(index, 1);
    },
    ok2() {
      for (var i = 0; i < this.pdf.length; i++) {
        this.ok(1, this.pdf[i].num, i);
      }
    },
    cancel() {},
    loadPdfHandler(index) {
      this.currentPage[index] = 1;
    },
    changePdfPage(val, index) {
      console.log(this.currentPage);
      console.log(this.pageTotalNum);
      if (val === 0 && this.currentPage[index] > 1) {
        this.$set(this.currentPage, index, this.currentPage[index] - 1);
      }
      if (val === 1 && this.currentPage[index] < this.pageTotalNum[index]) {
        this.$set(this.currentPage, index, this.currentPage[index] + 1);
      }
    },
  },
};
</script>

<style>
</style>