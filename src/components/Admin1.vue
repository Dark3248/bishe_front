<template>
  <Layout>
    <Content :style="{ padding: '24px', background: '#fff' }">
      <div v-if="current == 1">
        <Import></Import>
      </div>
      <StudentList v-if="current == 2"></StudentList>
    </Content>
  </Layout>
</template>

<script>
import Import from '@/components/Import.vue'
import StudentList from "@/components/StudentList.vue";
export default {
  name: "Admin1",
  components: {
    Import,
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
