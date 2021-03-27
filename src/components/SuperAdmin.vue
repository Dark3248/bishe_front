<template>
  <Layout>
    <Content :style="{ padding: '24px', background: '#fff' }">
      <div v-if="current == 1">
        <AllInternship></AllInternship>
      </div>
      <div v-if="current == 2">
          <AllJob></AllJob>
      </div>
      <div v-if="current == 3">
          <AllGraduation></AllGraduation>
      </div>
      <div v-if="current == 4">
          <StudentList></StudentList>
      </div>
      <div v-if="current == 5">
          <Users></Users>
      </div>
    </Content>
  </Layout>
</template>

<script>
import AllInternship from "@/components/AllInternship.vue"
import AllJob from "@/components/AllJob.vue"
import AllGraduation from "@/components/AllGraduation.vue"
import StudentList from "@/components/StudentList.vue"
import Users from "@/components/Users.vue"
export default {
  name: "SuperAdmin",
  components: {
      AllInternship,
      AllJob,
      AllGraduation,
      StudentList,
      Users
  },
  data() {
    return {
      current: "1",
    };
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