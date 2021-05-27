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
          ><Tag type="border" color="primary">性别</Tag>

          <div v-if="current.gender == 1">男</div>
          <div v-if="current.gender == 2">女</div>
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">出生日期</Tag>
          {{ $moment(current.birthday).format("YYYY-MM-DD") }}
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">政治面貌</Tag> 政治面貌：{{
            current.politic
          }}
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">籍贯</Tag>
          {{ current.birthPlace }}
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">专业</Tag> {{ current.major }}
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">学制（年）</Tag>

          <div v-if="current.studyYear == 2">2.5年</div>
          <div v-if="current.studyYear == 3">3年</div>
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">毕业时间</Tag>
          {{ $moment(current.graduateTime).format("YYYY-MM-DD") }}
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">手机号码</Tag>
          {{ current.phoneNumber }}
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">qq</Tag> {{ current.qq }}
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">e-mail</Tag> {{ current.email }}
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">工作单位名称</Tag>
          {{ current.company }}
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">工作部门</Tag>
          {{ current.department }}
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">单位电子邮件</Tag>
          {{ current.companyEmail }}
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">工作职位</Tag> {{ current.title }}
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">到单位工作时间</Tag>
          {{ $moment(current.companyTime).format("YYYY-MM-DD") }}
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">单位联系人</Tag>
          {{ current.companyContact }}
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">单位联系电话</Tag>
          {{ current.companyPhone }}
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">年薪</Tag> {{ current.salary }}万
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">单位性质</Tag>
          {{ current.companyType }}
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary"
            >毕业后是否愿意参加学院校友CLUB活动</Tag
          >
          <div v-if="current.wish == true">是</div>
          <div v-if="current.wish == false">否</div>
        </Row>
        <Row align="middle"
          ><Tag type="border" color="primary">专业方向</Tag>
          {{ current.college }}
        </Row>
      </Col>
    </div>
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
      current: null,
      pageCurrent: 1,
      showData: [],
      pageSize: 10,
    };
  },
  mounted() {
    this.$axios.get(this.back_server + "/user/getGraduation").then((res) => {
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
      this.changePage(1);
    },
    searchByName() {
      this.data1 = [];
      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i].name.match(this.search2))
          this.data1.push(this.data[i]);
      }
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