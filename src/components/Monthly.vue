<template>
  <Row>
    <Col span="4" offset="4">
      <Tooltip
        content="绿色：审核通过；红色：审核不通过；橙色：未审批"
        max-width="200"
      >
        <Tag color="primary" size="large" style="margin-bottom: 20px"
          >已提交月报列表</Tag
        >
      </Tooltip>
      <p v-if="this.monthly.length == 0" style="font-size: 20px">
        还未提交过月报
      </p>
      <Timeline v-else>
        <TimelineItem
          v-for="(item, index) in monthly"
          :key="index"
          :color="itemColor(item.examineStatus)"
        >
          <p class="time">{{ $moment(item).format("YYYY-MM") }}</p>
          <Button type="text" size="large" @click="changeMonthly(index)"
            >月报{{ index + 1 }}</Button
          >
          <Upload
            v-if="item.examineStatus == 2"
            :data="updateData"
            :action="updateUrl"
            :on-success="handleSuccess1"
            accept=".pdf"
          >
            <Button @click="beforeUpdate(index + 1)">点击重新上传</Button>
          </Upload>
        </TimelineItem>
      </Timeline>
      <Card style="margin-top: 20px">
        <p slot="title">
          <Icon type="ios-cloud-upload" />
          上传月报
        </p>
        <div style="text-align: center; margin-bottom: 1vh">
          <i-circle :percent="(monthly.length * 100) / 6" :stroke-color="color">
            <Icon
              v-if="monthly.length == 6"
              type="ios-checkmark"
              size="60"
              style="color: #5cb85c"
            ></Icon>
            <span v-else style="font-size: 24px">{{ monthly.length }} / 6</span>
          </i-circle>
        </div>
        <Upload
          v-if="this.monthly.length < 6"
          type="drag"
          :data="uploadData"
          :action="uploadUrl"
          :on-success="handleSuccess"
          accept=".pdf"
        >
          <div style="padding: 20px 0">
            <Icon
              type="ios-cloud-upload"
              size="52"
              style="color: #3399ff"
            ></Icon>
            <p>点击提交月报（.pdf格式）</p>
          </div>
        </Upload>
        <p v-else>已提交所有月报</p>
      </Card>
    </Col>
    <Col span="10" offset="2" v-if="monthly.length != 0">
      <Card :dis-hover="disHover">
        <pdf
          ref="pdf"
          :src="currentUrl"
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
    </Col>
  </Row>
</template>

<script>
import pdf from "vue-pdf";
export default {
  name: "Monthly",
  components: {
    pdf,
  },
  data() {
    return {
      disHover: true,
      myColor: {
        1: "green",
        2: "red",
        3: "orange",
      },
      monthly: [],
      uploadData: {
        username: "",
        number: 0,
      },
      updateData: {
        username: "",
        number: 0,
      },
      currentUrl: "",
      pageTotalNum: 1,
      currentPage: 1,
      uploadUrl: this.back_server + "/file/uploadMonthly",
      updateUrl: this.back_server + "/file/updateMonthly",
    };
  },
  computed: {
    color() {
      let color = "#2db7f5";
      if (this.monthly.length === 6) {
        color = "#5cb85c";
      }
      return color;
    },
  },
  mounted() {
    this.load(0);
  },
  methods: {
    load(index) {
      this.$axios
        .get(this.back_server + "/file/getMonthly", {
          params: {
            username: sessionStorage.getItem("username"),
          },
        })
        .then((res) => {
          if (res.data.code === 1) {
            this.monthly = res.data.monthlyList;
            this.currentUrl =
              this.back_server +
              this.monthly[index].path +
              "?random=" +
              Math.random();
            this.uploadData.username = sessionStorage.getItem("username");
            this.uploadData.number = this.monthly.length + 1;
          } else {
            alert("获取失败");
          }
        });
    },
    changePdfPage(val) {
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--;
      }
      if (val === 1 && this.currentPage < this.pageTotalNum) {
        this.currentPage++;
      }
    },
    loadPdfHandler(e) {
      this.currentPage = 1;
    },
    changeMonthly(index) {
      this.currentPage = 1
      this.currentUrl =
        this.back_server +
        this.monthly[index].path +
        "?random=" +
        Math.random();
    },
    handleSuccess() {
      this.load(this.uploadData.number);
    },
    handleSuccess1() {
      this.load(this.updateData.number);
    },
    itemColor(num) {
      if (num === 3) {
        return "orange";
      } else if (num === 2) {
        return "red";
      } else {
        return "green";
      }
    },
    beforeUpdate(number) {
      this.updateData.username = sessionStorage.getItem("username");
      this.updateData.number = number;
    },
  },
};
</script>

<style>
</style>
