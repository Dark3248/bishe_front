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
        :data="showData"
      ></Table>
      <div style="text-align: center; margin-top: 1vh">
        <Page
          :current="pageCurrent"
          :total="data1.length"
          :page-size="pageSize"
          @on-change="changePage"
        />
      </div>
    </Col>
    <div v-if="current != null">
      <Col offset="1">
        <Row align="middle"
          ><Tag type="border" color="primary">学号</Tag> {{ current.uid }}
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">姓名</Tag> {{ current.name }}
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">手机</Tag>
          {{ current.phoneNumber }}
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">E-mail</Tag> {{ current.email }}
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">身份证号</Tag>
          {{ current.idCard }}
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">实习公司名称</Tag>
          {{ current.companyName }}
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">实习公司网址/单位地址</Tag>
          {{ current.companyWebsite }}
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">学院指导教师姓名：</Tag>
          {{ current.schoolTeacher }}
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">学院指导教师电话</Tag>
          {{ current.schoolTeacherPhone }}
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">企业联系人姓名</Tag>
          {{ current.companyContact }}
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">企业联系人电话</Tag>
          {{ current.companyContactPhone }}
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">企业实习导师姓名</Tag>
          {{ current.companyTeacher }}
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">企业实习导师电话</Tag>
          {{ current.companyTeacherPhone }}
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">企业实习导师岗位职务</Tag>
          {{ current.companyTeacherPost }}
        </Row>
        <Row align="middle">
          <Tag type="border" color="primary">导师资格认证</Tag>
          <div v-if="current.companyTeacherQualification == 1">
            本科毕业十年以上
          </div>
          <div v-if="current.companyTeacherQualification == 2">
            硕士毕业五年以上
          </div>
          <div v-if="current.companyTeacherQualification == 3">博士学位</div>
          <div v-if="current.companyTeacherQualification == 4">高级职称</div>
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">企业实习导师介绍</Tag>
          {{ current.companyTeacherInfo }}
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">个人从事项目情况</Tag>
          {{ current.projectInfo }}
        </Row>
        <Row align="middle">
          <Tag type="border" color="primary">实习协议类型</Tag>

          <div v-if="current.internshipType == 1">签订三方协议</div>
          <div v-if="current.internshipType == 2">签订两方协议</div>
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">购买保险类型</Tag>

          <div v-if="current.insuranceType == 1">自己购买</div>
          <div v-if="current.insuranceType == 2">公司购买</div>
          <div v-if="current.insuranceType == 3">学院购买</div>
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">保险购买日期</Tag>
          {{ $moment(current.insuranceStartDate).format("YYYY-MM-DD") }}
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">保险结束日期</Tag>
          {{ $moment(current.insuranceEndDate).format("YYYY-MM-DD") }}
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">班主任审批情况</Tag>

          <div v-if="current.examineStatus1 == 1">通过</div>
          <div v-if="current.examineStatus1 == 2">不通过</div>
          <div v-if="current.examineStatus1 == 3">未审批</div>
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">学籍管理员审批情况</Tag>

          <div v-if="current.examineStatus2 == 1">通过</div>
          <div v-if="current.examineStatus2 == 2">不通过</div>
          <div v-if="current.examineStatus2 == 3">未审批</div>
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">部门管理员审批情况</Tag>

          <div v-if="current.examineStatus3 == 1">通过</div>
          <div v-if="current.examineStatus3 == 2">不通过</div>
          <div v-if="current.examineStatus3 == 3">未审批</div>
        </Row>
      </Col>
    </div>
  </Row>
</template>

<script>
export default {
  name: "AllInternship",
  data() {
    return {
      data: [],
      data1: [],
      showData: [],
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
      current: null,
      pageCurrent: 1,
      showData: [],
      pageSize: 10,
    };
  },
  mounted() {
    this.$axios.get(this.back_server + "/user/getInternship").then((res) => {
      console.log(res);
      this.data = res.data;
      this.data1 = this.data;
      this.changePage(1);
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
      this.pageCurrent = 1;
      this.changePage(1);
    },
    searchByName() {
      this.data1 = [];
      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i].name.match(this.search2))
          this.data1.push(this.data[i]);
      }
      this.pageCurrent = 1;
      this.changePage(1);
    },
    changePage(index) {
      this.pageCurrent = index;
      this.showData = [];
      var start = (this.pageCurrent - 1) * this.pageSize;
      var end = this.pageCurrent * this.pageSize;
      for (var i = start; i < end && i < this.data1.length; i++) {
        this.showData.push(this.data1[i]);
      }
    },
  },
};
</script>

<style>
</style>