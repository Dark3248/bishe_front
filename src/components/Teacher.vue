<template>
  <Layout>
    <Content :style="{ padding: '24px', background: '#fff' }">
      <div v-if="current == 1">
        <Grade></Grade>
      </div>
      <div v-if="current == 2">
        <Import></Import>
      </div>
      <ExamineRecord v-if="current == 3"></ExamineRecord>
      <StudentList v-if="current == 4"></StudentList>
    </Content>
  </Layout>
</template>

<script>
import Grade from "@/components/Grade.vue"
import ExamineRecord from '@/components/ExamineRecord.vue'
import Import from "@/components/Import.vue"
import StudentList from "@/components/StudentList.vue";
export default {
  name: "Teacher",
  components: {
    Grade,
    Import,
    ExamineRecord,
    StudentList
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
