<template>

  <div>
    <div class="background">
      <img :src="img" width="100%" height="100%" alt="" />
    </div>
    <Row justify="center" style="margin-top: 30vh">
      <Col span="6">
        <Card :dis-hover="disHover">
          <div style="margin-bottom: 2vh; text-align: center; font-size: 18px">
            <a>北航软件学院研究生毕业生过程管理系统</a>
          </div>
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
            <FormItem style="text-align: center">
              <a :href="url">通过云平台登录</a>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="login" long>登录</Button>
            </FormItem>
          </Form>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      url:
        "https://scs.buaa.edu.cn/?service=" + this.front_server + "/login",
      disHover: true,
      form: {
        username: "",
        password: "",
      },
      img: require("../assets/background.jpeg")
    };
  },
  mounted() {
    this.$Spin.show();
    if (sessionStorage.getItem("username")) {
      this.$router.push("/");
      this.$Message.error("已登录，无需再次登录");
    }
    console.log(this.$route.path);
    var auth = this.$route.query.authorization;
    if (auth != null) {
      this.$axios
        .post("https://scs.buaa.edu.cn/api/security/tokenVerify", {
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
                  sessionStorage.setItem("status", res.data.status);
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
.background {
    left: 0;
    top: 0;
    width:100%;
    height:100%;  /**宽高100%是为了图片铺满屏幕 */
    z-index:-1;
    position: absolute;
}
</style>
