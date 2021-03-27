<template>
  <Table :columns="columns" :data="record"></Table>
</template>

<script>
export default {
  name: "Users",
  data() {
    return {
      columns: [
        {
          type: "index",
          width: 60,
          align: "center",
        },
        {
          title: "账号",
          key: "username",
        },
        {
          title: "姓名",
          key: "name",
        },
        {
          title: "身份",
          key: "utype",
        },
      ],
      record: [],
    };
  },
  mounted() {
    this.$axios.get(this.back_server + "/user/getAllUsers").then((res) => {
      console.log(res.data)
      this.record = res.data
    });
  },
};
</script>

<style>
</style>