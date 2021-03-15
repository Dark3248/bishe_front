<template>
  <Layout>
    <Content :style="{ padding: '24px', background: '#fff' }">
      <div v-if="current == 1">
        <Tuition></Tuition>
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
import Import from '@/components/Import.vue'
import Tuition from '@/components/Tuition.vue'
import ExamineRecord from '@/components/ExamineRecord.vue'
import StudentList from "@/components/StudentList.vue";
export default {
  name: "Admin1",
  components: {
    Import,
    Tuition,
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
