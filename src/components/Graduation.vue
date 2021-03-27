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
    <FormItem label="性别" prop="gender">
      <Select v-model="formValidate.gender" :disabled="submit">
        <Option value="1">男</Option>
        <Option value="2">女</Option>
      </Select>
    </FormItem>
    <FormItem label="出生日期" prop="birthday">
      <DatePicker
        :disabled="submit"
        type="date"
        placeholder="选择出生日期"
        v-model="formValidate.birthday"
      ></DatePicker>
    </FormItem>
    <FormItem label="政治面貌" prop="politic">
      <Input v-model="formValidate.politic" :disabled="submit"></Input>
    </FormItem>
    <FormItem label="籍贯" prop="birthPlace">
      <Input v-model="formValidate.birthPlace" :disabled="submit"></Input>
    </FormItem>
    <FormItem label="专业" prop="major">
      <Input v-model="formValidate.major" :disabled="submit"></Input>
    </FormItem>
    <FormItem label="学制（年）" prop="studyYear">
      <Select v-model="formValidate.studyYear" :disabled="submit">
        <Option value="3">3年</Option>
        <Option value="2">2.5年</Option>
      </Select>
    </FormItem>
    <FormItem label="毕业时间" prop="graduateTime">
      <DatePicker
        :disabled="submit"
        type="date"
        placeholder="选择毕业时间"
        v-model="formValidate.graduateTime"
      ></DatePicker>
    </FormItem>
    <FormItem label="手机号码" prop="phoneNumber">
      <Input v-model="formValidate.phoneNumber" :disabled="submit"></Input>
    </FormItem>
    <FormItem label="qq" prop="qq">
      <Input v-model="formValidate.qq" :disabled="submit"></Input>
    </FormItem>
    <FormItem label="e-mail" prop="email">
      <Input v-model="formValidate.email" :disabled="submit"></Input>
    </FormItem>
    <FormItem label="工作单位名称" prop="company">
      <Input v-model="formValidate.company" :disabled="submit"></Input>
    </FormItem>
    <FormItem label="工作部门" prop="department">
      <Input v-model="formValidate.department" :disabled="submit"></Input>
    </FormItem>
    <FormItem label="单位电子邮件" prop="companyEmail">
      <Input v-model="formValidate.companyEmail" :disabled="submit"></Input>
    </FormItem>
    <FormItem label="工作职位" prop="title">
      <Input v-model="formValidate.title" :disabled="submit"></Input>
    </FormItem>
    <FormItem label="到单位工作时间" prop="companyTime">
      <DatePicker
        :disabled="submit"
        type="date"
        placeholder="选择到单位工作时间"
        v-model="formValidate.companyTime"
      ></DatePicker>
    </FormItem>
    <FormItem label="单位联系人" prop="companyContact">
      <Input v-model="formValidate.companyContact" :disabled="submit"></Input>
    </FormItem>
    <FormItem label="单位联系电话" prop="companyPhone">
      <Input v-model="formValidate.companyPhone" :disabled="submit"></Input>
    </FormItem>
    <FormItem label="年薪（万元）" prop="salary">
      <Input v-model="formValidate.salary" :disabled="submit"></Input>
    </FormItem>
    <FormItem label="单位性质" prop="companyType">
      <Input v-model="formValidate.companyType" :disabled="submit"></Input>
    </FormItem>
    <FormItem label="毕业后是否愿意参加学院校友CLUB活动" prop="wish">
      <Select v-model="formValidate.wish" :disabled="submit">
        <Option value="true">是</Option>
        <Option value="false">否</Option>
      </Select>
    </FormItem>
    <FormItem label="专业方向" prop="college">
      <Input v-model="formValidate.college" :disabled="submit"></Input>
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
  name: "Graduation",
  data() {
    return {
      submit: true,
      formValidate: {
        name: sessionStorage.getItem("name"),
        gender: "",
        uid: sessionStorage.getItem("username"),
        birthday: "",
        politic: "",
        birthPlace: "",
        major: "",
        studyYear: '',
        graduateTime: "",
        phoneNumber: "",
        qq: "",
        email: "",
        company: "",
        department: "",
        companyEmail: "",
        title: "",
        companyTime: "",
        companyContact: "",
        companyPhone: "",
        salary: "",
        companyType: "",
        wish: "",
        college: "",
        graduationPath: "",
      },
      ruleValidate: {
        gender: [
          {
            required: true,
            message: "不能为空",
          },
        ],
        birthday: [
          {
            required: true,
            message: "不能为空",
          },
        ],
        politic: [
          {
            required: true,
            message: "不能为空",
          },
        ],
        birthPlace: [
          {
            required: true,
            message: "不能为空",
          },
        ],
        major: [
          {
            required: true,
            message: "不能为空",
          },
        ],
        studyYear: [
          {
            required: true,
            message: "不能为空",
          },
        ],
        graduateTime: [
          {
            required: true,
            message: "不能为空",
          },
        ],
        phoneNumber: [
          {
            required: true,
            message: "不能为空",
          },
          {
            len: 11,
            message: "请输入正确的电话号码"
          }
        ],
        qq: [
          {
            required: true,
            message: "不能为空",
          },
        ],
        email: [
          {
            required: true,
            message: "不能为空",
          },
          {
            type: 'email',
            message: "格式不正确"
          }
        ],
        company: [
          {
            required: true,
            message: "不能为空",
          },
        ],
        department: [
          {
            required: true,
            message: "不能为空",
          },
        ],
        companyEmail: [
          {
            required: true,
            message: "不能为空",
          },
          {
            type: 'email',
            message: "格式不正确"
          }
        ],
        title: [
          {
            required: true,
            message: "不能为空",
          },
        ],
        companyTime: [
          {
            required: true,
            message: "不能为空",
          },
        ],
        companyContact: [
          {
            required: true,
            message: "不能为空",
          },
        ],
        companyPhone: [
          {
            required: true,
            message: "不能为空",
          }
        ],
        salary: [
          {
            required: true,
            message: "不能为空",
          },
        ],
        companyType: [
          {
            required: true,
            message: "不能为空",
          },
        ],
        wish: [
          {
            required: true,
            message: "不能为空",
          },
        ],
        college: [
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
      .get(this.back_server + "/form/getGraduation", {
        params: {
          username: sessionStorage.getItem("username"),
        },
      })
      .then((res) => {
        if (res.data !== "") {
          this.formValidate = res.data;
          this.formValidate.gender += "";
          this.formValidate.studyYear += "";
          this.formValidate.wish += "";
        } else {
          this.submit = false;
        }
      });
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$axios.post(
            this.back_server + "/form/graduation",
            this.formValidate
          ).then(res => {
            this.$Message.success("success");
            this.submit = true;
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
