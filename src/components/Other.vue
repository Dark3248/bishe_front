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
    <Col offset="1" span="15">
      <Tabs>
        <TabPane label="简历">
          <Card v-for="item in resume" :key="item" style="margin-bottom: 3vh">
            <pdf
              ref="pdf"
              :src="item"
              @num-pages="pageTotalNum = $event"
              @page-loaded="currentPage = $event"
              @loaded="loadPdfHandler"
              :page="currentPage"
            >
            </pdf>
          </Card>
          <div style="text-align: center; margin-top: 1vh">
            <ButtonGroup shape="circle">
              <Button type="primary" ghost @click="changePdfPage(0)">
                <Icon type="ios-arrow-back"></Icon>
                上一页
              </Button>
              <Button type="primary" ghost @click="changePdfPage(1)">
                下一页
                <Icon type="ios-arrow-forward"></Icon>
              </Button>
            </ButtonGroup>
          </div>
        </TabPane>
        <TabPane label="保险证明">
          <Row v-for="item in insurance" :key="item" style="margin-bottom: 3vh">
            <Card>
              <img :src="item" width="100%" />
            </Card>
          </Row>
        </TabPane>
        <TabPane label="实习协议">
          <Row v-for="item in contract" :key="item" style="margin-bottom: 3vh">
            <Card>
              <img :src="item" width="100%" />
            </Card>
          </Row>
        </TabPane>
        <TabPane v-if="liangfang.length != 0" label="两方协议">
          <Row v-for="item in liangfang" :key="item" style="margin-bottom: 3vh">
            <Card>
              <img :src="item" width="100%" />
            </Card>
          </Row>
        </TabPane>
      </Tabs>
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
import pdf from "vue-pdf";
export default {
  name: "Other",
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
      resume: [],
      insurance: [],
      contract: [],
      liangfang: [],
      postData: {
        uid: "",
        type: "",
        examineStatus: "",
        examineContent: "",
        examiner: "",
      },
      current: "",
      pageTotalNum: 1,
      currentPage: 1,
      search1: "",
      search2: "",
      pageCurrent: 1,
      showData: [],
      pageSize: 10,
    };
  },
  mounted() {
    this.refresh();
  },
  methods: {
    refresh() {
      this.$axios.get(this.back_server + "/examine/getOther").then((res) => {
        this.data = res.data;
        if (this.data.length !== 0) this.change(this.data[0]);
        this.data1 = this.data;
        this.changePage(1);
      });
    },
    change(currentRow, index) {
      this.resume = [];
      this.insurance = [];
      this.contract = [];
      this.liangfang = [];
      for (var i = 0; i < currentRow.resumePath.length; i++) {
        this.resume.push(this.back_server + currentRow.resumePath[i]);
      }
      for (var i = 0; i < currentRow.insurancePath.length; i++) {
        this.insurance.push(this.back_server + currentRow.insurancePath[i]);
      }
      for (var i = 0; i < currentRow.contractPath.length; i++) {
        this.contract.push(this.back_server + currentRow.contractPath[i]);
      }
      for (var i = 0; i < currentRow.liangfangPath.length; i++) {
        if (currentRow.liangfangPath[i] != "")
          this.liangfang.push(this.back_server + currentRow.liangfangPath[i]);
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
      this.postData.examiner = sessionStorage.getItem("username");
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
    loadPdfHandler(e) {
      this.currentPage = 1;
    },
    changePdfPage(val) {
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--;
      }
      if (val === 1 && this.currentPage < this.pageTotalNum) {
        this.currentPage++;
      }
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