<template>
  <Layout>
    <Content :style="{ padding: '24px', background: '#fff' }">
      <div v-if="current == 1">
        <Steps :current="status">
          <Step title="实习阶段"></Step>
          <Step title="开题答辩"></Step>
          <Step title="中期答辩"></Step>
          <Step title="毕业答辩"></Step>
          <Step title="离校阶段"></Step>
        </Steps>
        <div style="margin-top: 10vh; text-align: center;">
          <Alert v-if="status == 0">
            请及时提交实习申请表，提交后请耐心等待审批
          </Alert>
          <Alert v-if="status == 1">
            请提交六次月报，在六次月报都通过且开题答辩通过后，进入中期阶段
          </Alert>
          <Alert v-if="status == 2">中期答辩通过后，进入毕业答辩阶段</Alert>
          <Alert v-if="status == 3">毕业答辩通过后，进入离校阶段</Alert>
          <div v-if="status == 4" style="margin-top: 10vh; text-align: center">
            <Alert v-if="book == false">
              请检查图书归还情况和图书逾期欠费情况，与图书馆联系
            </Alert>
            <Alert v-if="paper == false" style="margin-top: 2vh">请及时提交论文电子版</Alert>
          </div>
        </div>
      </div>
      <div v-if="current == 2">
        <Monthly v-if="status > 0"></Monthly>
        <div v-else>
          <Alert type="warning">请先填写实习信息</Alert>
        </div>
      </div>
      <div v-if="current == 3">
        <Internship></Internship>
      </div>
      <div v-if="current == 4">
        <Job v-if="status >= 4"></Job>
        <div v-else>
          <Alert type="warning">离校阶段才可以填写此表单</Alert>
        </div>
      </div>
      <div v-if="current == 5">
        <Graduation v-if="status >= 4"></Graduation>
        <div v-else>
          <Alert type="warning">离校阶段才可以填写此表单</Alert>
        </div>
      </div>
    </Content>
  </Layout>
</template>

<script>
import Monthly from "@/components/Monthly.vue";
import Internship from "@/components/Internship.vue";
import Job from "@/components/Job.vue";
import Graduation from "@/components/Graduation.vue";
export default {
  name: "Student",
  components: {
    Monthly,
    Internship,
    Job,
    Graduation,
  },
  data() {
    return {
      current: 1,
      status: 0,
      book: false,
      paper: false,
    };
  },
  mounted() {
    var i = sessionStorage.getItem("status");
    if (i <= 2) {
      this.status = i - 1;
    } else if (i == 3) {
      this.status = 1;
    } else {
      this.status = i - 2;
    }
    this.$axios
      .get(this.back_server + "/user/getBook", {
        params: {
          username: sessionStorage.getItem("username"),
        },
      })
      .then((res) => {
        this.book = res.data;
      });
    this.$axios
      .get(this.back_server + "/user/getPaper", {
        params: {
          username: sessionStorage.getItem("username"),
        },
      })
      .then((res) => {
        this.paper = res.data;
      });
  },
  methods: {
    change(name) {
      this.current = name;
    },
  },
};
</script>

<style>
</style>
