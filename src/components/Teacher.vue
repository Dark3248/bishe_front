<template>
  <Layout>
    <Content :style="{ padding: '24px', background: '#fff' }">
      <div v-if="current == 1">
        <Grade></Grade>
      </div>
      <div v-if="current == 2">
        <Import></Import>
      </div>
    </Content>
  </Layout>
</template>

<script>
import Grade from "@/components/Grade.vue"
import Import from "@/components/Import.vue"
export default {
  name: "Teacher",
  components: {
    Grade,
    Import
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
