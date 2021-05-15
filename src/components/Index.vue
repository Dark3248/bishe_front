<style scoped>
.layout {
  background: #f5f7f9;
  position: relative;
  overflow: hidden;
}
.layout-logo {
  float: left;
  position: relative;
  color: whitesmoke;
  font-size: 25px;
}
.layout-nav {
  margin: 0 auto;
  float: right;
}
.layout-footer-center {
  text-align: center;
}
</style>

<template>
  <div class="layout">
    <Layout :style="{ minHeight: '100vh' }">
      <Header>
        <Menu @on-select="changePage" mode="horizontal" theme="dark">
          <a class="layout-logo"> 北航软件学院毕业生过程管理系统 </a>
          <div v-if="utype == 1">
            <MenuItem name="1" style="margin-left: 50px">总览</MenuItem>
            <MenuItem name="2">提交月报</MenuItem>
            <MenuItem name="3">填写实习信息</MenuItem>
            <MenuItem name="4">填写就业信息</MenuItem>
            <MenuItem name="5">填写毕业登记</MenuItem>
          </div>
          <div v-if="utype == 2">
            <MenuItem name="1" style="margin-left: 50px">导入名单</MenuItem>
            <MenuItem name="2">学生名单</MenuItem>
          </div>
          <div v-if="utype == 3">
            <MenuItem name="1" style="margin-left: 50px">导入名单</MenuItem>
            <MenuItem name="2">学生名单</MenuItem>
          </div>
          <div v-if="utype == 4">
            <MenuItem name="1" style="margin-left: 50px">审核月报</MenuItem>
            <MenuItem name="2">审核实习信息</MenuItem>
            <MenuItem name="3">导入名单</MenuItem>
            <MenuItem name="4">审核记录</MenuItem>
          </div>
          <div v-if="utype == 5">
            <MenuItem name="1" style="margin-left: 50px">实习信息</MenuItem>
            <MenuItem name="2">就业登记信息</MenuItem>
            <MenuItem name="3">毕业登记信息</MenuItem>
            <MenuItem name="4">学生列表</MenuItem>
            <MenuItem name="5">班主任和管理员</MenuItem>
            <MenuItem name="6">导入名单</MenuItem>
          </div>
          <div class="layout-nav">
            <a @click="logout" style="color: #f5f7f9; margin-right: 1vh">退出登录</a>
            <a style="font-size: 18px; color: #f5f7f9">
              <Icon type="md-contact" />
              {{ this.name }}
            </a>
          </div>
        </Menu>
      </Header>
      <Layout :style="{ padding: '0 50px' }">
        <Content
          :style="{
            padding: '24px 0',
            margin: '24px 0 0 0',
            minHeight: '280px',
            background: '#fff',
          }"
        >
          <Student v-if="utype == 1" ref="Student"></Student>
          <Teacher v-if="utype == 2" ref="Teacher"></Teacher>
          <Admin1 v-if="utype == 3" ref="Admin1"></Admin1>
          <Admin2 v-if="utype == 4" ref="Admin2"></Admin2>
          <SuperAdmin v-if="utype == 5" ref="SuperAdmin"></SuperAdmin>
        </Content>
      </Layout>
      <Footer class="layout-footer-center"
        >Copyright©2021 School of Software,BUAA. All Right Reserved.
        京ICP备05004617号-5
      </Footer>
    </Layout>
  </div>
</template>

<script>
import Student from "@/components/Student.vue";
import Teacher from "@/components/Teacher.vue";
import Admin1 from "@/components/Admin1.vue";
import Admin2 from "@/components/Admin2.vue";
import SuperAdmin from "@/components/SuperAdmin.vue";
export default {
  name: "Index",
  components: {
    Student,
    Teacher,
    Admin1,
    Admin2,
    SuperAdmin,
  },
  data() {
    return {
      username: "",
      utype: 0,
      name: "",
    };
  },
  mounted() {
    this.username = sessionStorage.getItem("username");
    this.utype = sessionStorage.getItem("utype");
    this.name = sessionStorage.getItem("name");
  },
  methods: {
    changePage(name) {
      if (this.utype === "1") {
        this.$refs.Student.change(name);
      } else if (this.utype === "2") {
        this.$refs.Teacher.change(name);
      } else if (this.utype === "3") {
        this.$refs.Admin1.change(name);
      } else if (this.utype === "4") {
        this.$refs.Admin2.change(name);
      } else {
        this.$refs.SuperAdmin.change(name);
      }
    },
    logout() {
      sessionStorage.clear()
      window.location.reload()
    }
  },
};
</script>
