<template>
  <Row justify="center" style="margin-top: 30vh">
    <Col span="6">
      <Card :dis-hover="disHover">
        <Form ref="loginForm" :model="form">
          <FormItem prop="username">
            <Input
              v-model="form.username"
              placeholder="请输入用户名"
              prefix="ios-person-outline"
            />
          </FormItem>
          <FormItem prop="password">
            <Input
              type="password"
              v-model="form.password"
              placeholder="请输入密码"
              prefix="ios-lock-outline"
            />
          </FormItem>
          <FormItem>
            <a
              href="https://cloud.beihangsoft.cn/?service=http://localhost:8080/login"
              >学生请使用统一认证登录</a
            >
          </FormItem>
          <FormItem>
            <Button type="primary" @click="login" long>登录</Button>
          </FormItem>
        </Form>
      </Card>
    </Col>
  </Row>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      disHover: true,
      form: {
        username: "",
        password: "",
      },
    };
  },
  mounted() {
    this.$Spin.show();
    if (sessionStorage.getItem("username")) {
      this.$router.push("/");
      this.$Message.error("已登录，无需再次登录");
    }
    var auth = this.$route.query.authorization;
    if (auth != null) {
      this.$axios
        .post("https://cloud.beihangsoft.cn/api/security/tokenVerify", {
          token: auth,
          service: this.front_server,
        })
        .then((res) => {
          if (res.data.code !== 1003) {
            this.$Message.error("登录失败，请重试");
          } else {
            var id = res.data.data.id;
            this.$axios
              .get(this.back_server + "/user/login", {
                params: {
                  username: id,
                },
              })
              .then((res) => {
                if (res.data.code === 1) {
                  sessionStorage.clear();
                  sessionStorage.setItem("username", res.data.username);
                  sessionStorage.setItem("utype", res.data.utype);
                  sessionStorage.setItem("name", res.data.name);
                  sessionStorage.setItem("status", res.data.status)
                  this.$Spin.hide();
                  this.$router.push("/");
                  this.$Message.info("登录成功");
                } else {
                  this.$Spin.hide();
                  this.$Message.error("登录失败，请重试");
                }
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.$Spin.hide();
    }
  },
  methods: {
    login() {
      this.$Spin.show();
      this.$axios
        .post(
          this.back_server + "/user/login2",
          this.$qs.stringify({
            username: this.form.username,
            password: this.form.password,
          })
        )
        .then((res) => {
          if (res.data.code === 1) {
            sessionStorage.clear();
            sessionStorage.setItem("username", res.data.username);
            sessionStorage.setItem("utype", res.data.utype);
            sessionStorage.setItem("name", res.data.name);
            this.$Spin.hide();
            this.$router.push("/");
            this.$Message.info("登录成功");
          } else {
            this.$Spin.hide();
            this.$Message.error("登录失败，请重试");
          }
        });
    },
  },
};
</script>

<style>
</style>
