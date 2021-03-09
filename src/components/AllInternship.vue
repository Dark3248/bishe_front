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
      <Row> 手机：{{ current.phoneNumber }} </Row>
      <Row> E-mail：{{ current.email }} </Row>
      <Row> 身份证号：{{ current.idCard }} </Row>
      <Row> 实习公司名称：{{ current.companyName }} </Row>
      <Row> 实习公司网址/单位地址：{{ current.companyWebsite }} </Row>
      <Row> 学院指导教师姓名：{{ current.schoolTeacher }} </Row>
      <Row> 学院指导教师电话：{{ current.schoolTeacherPhone }} </Row>
      <Row> 企业联系人姓名：{{ current.companyContact }} </Row>
      <Row> 企业联系人电话：{{ current.companyContactPhone }} </Row>
      <Row> 企业实习导师姓名：{{ current.companyTeacher }} </Row>
      <Row> 企业实习导师电话：{{ current.companyTeacherPhone }} </Row>
      <Row> 企业实习导师岗位职务：{{ current.companyTeacherPost }} </Row>
      <Row>
        导师资格认证：
        <div v-if="current.companyTeacherQualification == 1">
          本科毕业十年以上
        </div>
        <div v-if="current.companyTeacherQualification == 2">
          硕士毕业五年以上
        </div>
        <div v-if="current.companyTeacherQualification == 3">博士学位</div>
        <div v-if="current.companyTeacherQualification == 4">高级职称</div>
      </Row>
      <Row> 企业实习导师介绍：{{ current.companyTeacherInfo }} </Row>
      <Row> 个人从事项目情况：{{ current.projectInfo }} </Row>
      <Row>
        实习协议类型：
        <div v-if="current.internshipType == 1">签订三方协议</div>
        <div v-if="current.internshipType == 2">签订两方协议</div>
      </Row>
      <Row>
        购买保险类型：
        <div v-if="current.insuranceType == 1">自己购买</div>
        <div v-if="current.insuranceType == 2">公司购买</div>
        <div v-if="current.insuranceType == 3">学院购买</div>
      </Row>
      <Row> 保险购买日期：{{ $moment(current.insuranceStartDate).format("YYYY-MM-DD") }} </Row>
      <Row> 保险结束日期：{{ $moment(current.insuranceEndDate).format("YYYY-MM-DD") }} </Row>
      <Row>
        班主任审批情况：
        <div v-if="current.examineStatus1 == 1">通过</div>
        <div v-if="current.examineStatus1 == 2">不通过</div>
        <div v-if="current.examineStatus1 == 3">未审批</div>
      </Row>
      <Row>
        学籍管理员审批情况：
        <div v-if="current.examineStatus2 == 1">通过</div>
        <div v-if="current.examineStatus2 == 2">不通过</div>
        <div v-if="current.examineStatus2 == 3">未审批</div>
      </Row>
      <Row>
        部门管理员审批情况：
        <div v-if="current.examineStatus3 == 1">通过</div>
        <div v-if="current.examineStatus3 == 2">不通过</div>
        <div v-if="current.examineStatus3 == 3">未审批</div>
      </Row>
    </Col>
  </Row>
</template>

<script>
export default {
  name: "AllInternship",
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
    this.$axios.get(this.back_server + "/user/getInternship").then((res) => {
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