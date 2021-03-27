<template>
  <Form
    ref="formValidate"
    :model="formValidate"
    :rules="ruleValidate"
    style="margin-left: 30vh; margin-right: 30vh"
  >
    <FormItem label="姓名" prop="name">
      <Input disabled v-model="formValidate.name"></Input>
    </FormItem>
    <FormItem label="学号" prop="uid">
      <Input disabled v-model="formValidate.uid"></Input>
    </FormItem>
    <FormItem label="类型" prop="type">
      <Select v-model="formValidate.type" :disabled="submit">
        <Option value="1">1</Option>
        <Option value="2">2</Option>
        <Option value="3">3</Option>
        <Option value="4">4</Option>
      </Select>
    </FormItem>
    <FormItem label="拟签约单位" prop="company">
      <Input v-model="formValidate.company" :disabled="submit"></Input>
    </FormItem>
    <FormItem label="工作地（省市区）" prop="base">
      <Input v-model="formValidate.base" :disabled="submit"></Input>
    </FormItem>
    <FormItem label="薪资待遇（万元）" prop="salary">
      <Input v-model="formValidate.salary" :disabled="submit"></Input>
    </FormItem>
    <FormItem>
      <Button
        type="primary"
        @click="handleSubmit('formValidate')"
        v-if="submit == false"
      >
        提交
      </Button>
    </FormItem>
  </Form>
</template>

<script>
export default {
  name: "Job",
  data() {
    return {
      submit: true,
      formValidate: {
        name: sessionStorage.getItem("name"),
        uid: sessionStorage.getItem("username"),
        type: "",
        company: "",
        base: "",
        salary: "",
      },
      ruleValidate: {
        type: [
          {
            required: true,
            message: "不能为空",
          },
        ],
        company: [
          {
            required: true,
            message: "不能为空",
          },
        ],
        base: [
          {
            required: true,
            message: "不能为空",
          },
        ],
        salary: [
          {
            required: true,
            message: "不能为空",
          },
        ],
      },
    };
  },
  mounted() {
    this.$axios
      .get(this.back_server + "/form/getJob", {
        params: {
          username: sessionStorage.getItem("username"),
        },
      })
      .then((res) => {
        if (res.data !== "") {
          this.formValidate = res.data;
          this.formValidate.type += "";
        } else {
          this.submit = false;
        }
      });
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$axios
            .post(this.back_server + "/form/job", this.formValidate)
            .then((res) => {
              this.submit = true;
              this.$Message.success("success");
            });
        } else {
          this.$Message.error("请填写所有信息");
        }
      });
    },
  },
};
</script>

<style>
</style>
