<template>
  <Row>
    <Col span="5" offset="1">
      <Row style="margin-bottom: 1vh">
        <Input
          search
          placeholder="根据学号检索"
          v-model="search1"
          @on-search="searchById()"
        ></Input>
      </Row>
      <Row style="margin-bottom: 1vh">
        <Input
          search
          placeholder="根据姓名检索"
          v-model="search2"
          @on-search="searchByName()"
        ></Input>
      </Row>
      <Table
        highlight-row
        @on-row-click="change"
        :columns="columns"
        :data="data1"
      ></Table>
    </Col>
    <Col span="16" offset="1">
      <Row> 学号：{{ current.uid }} </Row>
      <Row> 姓名：{{ current.name }} </Row>
      <Row>
        性别：
        <div v-if="current.gender == 1">男</div>
        <div v-if="current.gender == 2">女</div>
      </Row>
      <Row> 出生日期：{{ $moment(current.birthday).format("YYYY-MM-DD") }} </Row>
      <Row> 政治面貌：{{ current.politic }} </Row>
      <Row> 籍贯：{{ current.birthPlace }} </Row>
      <Row> 专业：{{ current.major }} </Row>
      <Row>
        学制（年）：
        <div v-if="current.studyYear == 2">2.5年</div>
        <div v-if="current.studyYear == 3">3年</div>
      </Row>
      <Row> 毕业时间：{{ $moment(current.graduateTime).format("YYYY-MM-DD") }} </Row>
      <Row> 手机号码：{{ current.phoneNumber }} </Row>
      <Row> qq：{{ current.qq }} </Row>
      <Row> e-mail：{{ current.email }} </Row>
      <Row> 工作单位名称：{{ current.company }} </Row>
      <Row> 工作部门：{{ current.department }} </Row>
      <Row> 单位电子邮件：{{ current.companyEmail }} </Row>
      <Row> 工作职位：{{ current.title }} </Row>
      <Row> 到单位工作时间：{{ $moment(current.companyTime).format("YYYY-MM-DD") }} </Row>
      <Row> 单位联系人：{{ current.companyContact }} </Row>
      <Row> 单位联系电话：{{ current.companyPhone }} </Row>
      <Row> 年薪：{{ current.salary }}万 </Row>
      <Row> 单位性质：{{ current.companyType }} </Row>
      <Row>
        毕业后是否愿意参加学院校友CLUB活动：
        <div v-if="current.wish == true">是</div>
        <div v-if="current.wish == false">否</div>
      </Row>
      <Row> 专业方向：{{ current.college }} </Row>
    </Col>
  </Row>
</template>

<script>
export default {
  name: "AllGraduation",
  data() {
    return {
      data: [],
      data1: [],
      columns: [
        {
          type: "index",
          width: 60,
          align: "center",
        },
        {
          title: "姓名",
          key: "name",
        },
        {
          title: "学号",
          key: "uid",
        },
      ],
      search1: "",
      search2: "",
      current: {},
    };
  },
  mounted() {
    this.$axios.get(this.back_server + "/user/getGraduation").then((res) => {
      console.log(res);
      this.data = res.data;
      this.data1 = this.data;
    });
  },
  methods: {
    change(currentRow) {
      this.current = currentRow;
    },
    searchById() {
      this.data1 = [];
      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i].uid.match(this.search1)) this.data1.push(this.data[i]);
      }
    },
    searchByName() {
      this.data1 = [];
      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i].name.match(this.search2))
          this.data1.push(this.data[i]);
      }
    },
  },
};
</script>

<style>
</style>