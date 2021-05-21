<template>
  <div>
    <Table :columns="columns" :data="record"></Table>
    <Modal v-model="modal" title="修改" size="large" @on-ok="ok()">
      <RadioGroup v-model="teacher" vertical>
        <Radio v-for="(item, index) in teachers" :key="index" :label="index">
          <span>{{ item.username }}</span>
        </Radio>
      </RadioGroup>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "Direction",
  data() {
    return {
      modal: false,
      current: "",
      columns: [
        {
          type: "index",
          width: 60,
          align: "center",
        },
        {
          title: "研究方向",
          key: "name",
        },
        {
          title: "姓名",
          key: "teacherName",
        },
        {
          title: "账号",
          key: "teacher",
        },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          width: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                  },
                  on: {
                    click: () => {
                      this.modal = true;
                      this.current = params.row.name;
                    },
                  },
                },
                "修改"
              ),
            ]);
          },
        },
      ],
      record: [],
      teachers: [],
      teacher: 0,
    };
  },
  mounted() {
    this.refresh();
  },
  methods: {
    refresh() {
      this.$axios.get(this.back_server + "/user/getDirections").then((res) => {
        this.record = res.data;
      });
      this.$axios.get(this.back_server + "/user/getAllUsers").then((res) => {
        this.teachers = [];
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].utype == "班主任") {
            this.teachers.push(res.data[i]);
          }
        }
      });
    },
    ok() {
      console.log(this.current);
      this.$axios
        .post(this.back_server + "/user/changeDirection", {
          name: this.current,
          teacher: this.teachers[this.teacher].username,
        })
        .then((res) => {
          this.$Message.info("修改成功");
          this.refresh();
        });
    },
  },
};
</script>

<style>
</style>