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
        <Job v-if="status == 4"></Job>
        <div v-else>
          <Alert type="warning">离校阶段才可以填写此表单</Alert>
        </div>
      </div>
      <div v-if="current == 5">
        <Graduation v-if="status == 4"></Graduation>
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
import Graduation from '@/components/Graduation.vue'
export default {
  name: "Student",
  components: {
    Monthly,
    Internship,
    Job,
    Graduation
  },
  data() {
    return {
      current: 1,
      status: 0,
    };
  },
  mounted() {
    var i = sessionStorage.getItem("status")
    if (i <= 2) {
      this.status = i - 1
    } else if (i == 3) {
      this.status = 1
    } else {
      this.status = i - 2
    }

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
