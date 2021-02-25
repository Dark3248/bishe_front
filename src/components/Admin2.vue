<template>
  <Layout>
    <Content :style="{ padding: '24px', background: '#fff' }">
      <div v-if="current == 1">
        <Monthly2></Monthly2>
      </div>
      <div v-if="current == 2">
        <Other></Other>
      </div>
      <div v-if="current == 3">
        <Import></Import>
      </div>
    </Content>
  </Layout>
</template>

<script>
import Import from '@/components/Import.vue'
import Other from '@/components/Other.vue'
import Monthly2 from '@/components/Monthly2.vue'
export default {
  name: "Admin2",
  components: {
    Import,
    Other,
    Monthly2
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
