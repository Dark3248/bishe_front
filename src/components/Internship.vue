<template>
  <div style="margin-left: 30vh; margin-right: 30vh">
    <div v-if="submit == true && examine == false">
      <Alert type="warning">请等待审批</Alert>
    </div>
    <div v-else-if="submit == true && examine == true">
      <div>
        <Alert v-if="formValidate.examineStatus1 == 1">
          班主任：{{ formValidate.examineContent1 }}
        </Alert>
        <Alert v-else type="error">
          班主任：{{ formValidate.examineContent1 }}
        </Alert>
      </div>
      <div>
        <Alert v-if="formValidate.examineStatus2 == 1">
          学籍管理员：{{ formValidate.examineContent2 }}
        </Alert>
        <Alert v-else type="error">
          学籍管理员：{{ formValidate.examineContent2 }}
        </Alert>
      </div>
      <div>
        <Alert v-if="formValidate.examineStatus3 == 1">
          部门管理员：{{ formValidate.examineContent3 }}
        </Alert>
        <Alert v-else type="error">
          部门管理员：{{ formValidate.examineContent3 }}
        </Alert>
      </div>
    </div>
    <div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
        <FormItem label="姓名" prop="name">
          <Input disabled v-model="formValidate.name"></Input>
        </FormItem>
        <FormItem label="学号" prop="uid">
          <Input disabled v-model="formValidate.uid"></Input>
        </FormItem>
        <FormItem label="手机" prop="phoneNumber">
          <Input v-if="show == true" v-model="formValidate.phoneNumber"></Input>
          <Input v-else disabled v-model="formValidate.phoneNumber"></Input>
        </FormItem>
        <FormItem label="E-mail" prop="email">
          <Input v-if="show == true" v-model="formValidate.email"></Input>
          <Input v-else disabled v-model="formValidate.email"></Input>
        </FormItem>
        <FormItem label="身份证号" prop="idCard">
          <Input v-if="show == true" v-model="formValidate.idCard"></Input>
          <Input v-else disabled v-model="formValidate.idCard"></Input>
        </FormItem>
        <FormItem label="实习公司名称" prop="companyName">
          <Input v-if="show == true" v-model="formValidate.companyName"></Input>
          <Input v-else disabled v-model="formValidate.companyName"></Input>
        </FormItem>
        <FormItem label="实习公司网址/单位地址" prop="companyWebsite">
          <Input
            v-if="show == true"
            v-model="formValidate.companyWebsite"
          ></Input>
          <Input v-else disabled v-model="formValidate.companyWebsite"></Input>
        </FormItem>
        <FormItem label="学院指导教师姓名" prop="schoolTeacher">
          <Input
            v-if="show == true"
            v-model="formValidate.schoolTeacher"
          ></Input>
          <Input v-else disabled v-model="formValidate.schoolTeacher"></Input>
        </FormItem>
        <FormItem label="学院指导教师电话" prop="schoolTeacherPhone">
          <Input
            v-if="show == true"
            v-model="formValidate.schoolTeacherPhone"
          ></Input>
          <Input
            v-else
            disabled
            v-model="formValidate.schoolTeacherPhone"
          ></Input>
        </FormItem>
        <FormItem label="企业联系人姓名" prop="companyContact">
          <Input
            v-if="show == true"
            v-model="formValidate.companyContact"
          ></Input>
          <Input v-else disabled v-model="formValidate.companyContact"></Input>
        </FormItem>
        <FormItem label="企业联系人电话" prop="companyContactPhone">
          <Input
            v-if="show == true"
            v-model="formValidate.companyContactPhone"
          ></Input>
          <Input
            v-else
            disabled
            v-model="formValidate.companyContactPhone"
          ></Input>
        </FormItem>
        <FormItem label="企业实习导师姓名" prop="companyTeacher">
          <Input
            v-if="show == true"
            v-model="formValidate.companyTeacher"
          ></Input>
          <Input v-else disabled v-model="formValidate.companyTeacher"></Input>
        </FormItem>
        <FormItem label="企业实习导师岗位职务" prop="companyTeacherPost">
          <Input
            v-if="show == true"
            v-model="formValidate.companyTeacherPost"
          ></Input>
          <Input
            v-else
            disabled
            v-model="formValidate.companyTeacherPost"
          ></Input>
        </FormItem>
        <FormItem label="企业实习导师电话" prop="companyTeacherPhone">
          <Input
            v-if="show == true"
            v-model="formValidate.companyTeacherPhone"
          ></Input>
          <Input
            v-else
            disabled
            v-model="formValidate.companyTeacherPhone"
          ></Input>
        </FormItem>
        <FormItem label="导师资格认证" prop="companyTeacherQualification">
          <Select
            v-model="formValidate.companyTeacherQualification"
            v-if="show == true"
          >
            <Option value="1">本科毕业十年以上</Option>
            <Option value="2">硕士毕业五年以上</Option>
            <Option value="3">博士学位</Option>
            <Option value="4">高级职称</Option>
          </Select>
          <Select
            v-model="formValidate.companyTeacherQualification"
            v-else
            disabled
          >
            <Option value="1">本科毕业十年以上</Option>
            <Option value="2">硕士毕业五年以上</Option>
            <Option value="3">博士学位</Option>
            <Option value="4">高级职称</Option>
          </Select>
        </FormItem>
        <FormItem label="企业实习导师介绍" prop="companyTeacherInfo">
          <Input
            v-if="show == true"
            v-model="formValidate.companyTeacherInfo"
          ></Input>
          <Input
            v-else
            disabled
            v-model="formValidate.companyTeacherInfo"
          ></Input>
        </FormItem>
        <FormItem label="个人从事项目情况" prop="projectInfo">
          <Input v-if="show == true" v-model="formValidate.projectInfo"></Input>
          <Input v-else disabled v-model="formValidate.projectInfo"></Input>
        </FormItem>
        <FormItem label="实习协议类型" prop="internshipType">
          <Select v-model="formValidate.internshipType" v-if="show == true">
            <Option value="1">签订三方协议</Option>
            <Option value="2">签订两方协议</Option>
          </Select>
          <Select v-model="formValidate.internshipType" v-else disabled>
            <Option value="1">签订三方协议</Option>
            <Option value="2">签订两方协议</Option>
          </Select>
        </FormItem>
        <FormItem label="购买保险类型" prop="insuranceType">
          <Select v-model="formValidate.insuranceType" v-if="show == true">
            <Option value="1">自己购买</Option>
            <Option value="2" v-if="formValidate.internshipType == '2'"
              >公司购买</Option
            >
            <Option value="3" v-if="formValidate.internshipType == '1'"
              >学院购买</Option
            >
          </Select>
          <Select v-model="formValidate.insuranceType" v-else disabled>
            <Option value="1">自己购买</Option>
            <Option value="2" v-if="formValidate.internshipType == '2'"
              >公司购买</Option
            >
            <Option value="3" v-if="formValidate.internshipType == '1'"
              >学院购买</Option
            >
          </Select>
        </FormItem>
        <FormItem label="保险购买日期">
          <Row>
            <FormItem prop="insuranceStartDate">
              <DatePicker
                v-if="show == true"
                type="date"
                placeholder="选择开始日期"
                v-model="formValidate.insuranceStartDate"
                :options="option1"
              ></DatePicker>
              <DatePicker
                v-else
                disabled
                type="date"
                placeholder="选择开始日期"
                v-model="formValidate.insuranceStartDate"
              ></DatePicker>
            </FormItem>
            <div style="margin-left: 10px; margin-right: 10px">——</div>
            <FormItem prop="insuranceStartDate">
              <DatePicker
                v-if="show == true"
                type="date"
                placeholder="选择结束日期"
                v-model="formValidate.insuranceEndDate"
              ></DatePicker>
              <DatePicker
                v-else
                disabled
                type="date"
                placeholder="选择结束日期"
                v-model="formValidate.insuranceEndDate"
              ></DatePicker>
            </FormItem>
          </Row>
        </FormItem>
      </Form>
      <Alert v-if="show == true">下列文件不能更改，只能等待审批不通过后才能更改</Alert>
      <Row>
        <Col>
          <Upload
            v-if="submit == false || formValidate.examineStatus3 == 2"
            :data="uploadData[0]"
            :on-remove="handleRemove"
            :action="url"
            accept=".pdf"
          >
            <Button icon="ios-cloud-upload-outline">上传简历（.pdf）</Button>
          </Upload>
          <Upload
            v-else
            disabled
            :data="uploadData[0]"
            :on-remove="handleRemove"
            :action="url"
            accept=".pdf"
          >
            <Button icon="ios-cloud-upload-outline">上传简历（.pdf）</Button>
          </Upload>
        </Col>
        <Col offset="2">
          <Upload
            v-if="submit == false || formValidate.examineStatus3 == 2"
            multiple
            :data="uploadData[1]"
            :on-remove="handleRemove"
            :action="url"
            accept=".jpg, .png, .jpeg"
          >
            <Button icon="ios-cloud-upload-outline"
              >上传保险证明（图片）</Button
            >
          </Upload>
          <Upload
            v-else
            disabled
            multiple
            :data="uploadData[1]"
            :on-remove="handleRemove"
            :action="url"
            accept=".jpg, .png, .jpeg"
          >
            <Button icon="ios-cloud-upload-outline"
              >上传保险证明（图片）</Button
            >
          </Upload>
        </Col>
        <Col offset="2">
          <Upload
            v-if="submit == false || formValidate.examineStatus2 == 2"
            multiple
            :data="uploadData[2]"
            :on-remove="handleRemove"
            :action="url"
            accept=".jpg, .png, .jpeg"
          >
            <Button icon="ios-cloud-upload-outline"
              >上传学费证明（图片）</Button
            >
          </Upload>
          <Upload
            v-else
            disabled
            multiple
            :data="uploadData[2]"
            :on-remove="handleRemove"
            :action="url"
            accept=".jpg, .png, .jpeg"
          >
            <Button icon="ios-cloud-upload-outline"
              >上传学费证明（图片）</Button
            >
          </Upload>
        </Col>
        <Col offset="2">
          <Upload
            v-if="submit == false || formValidate.examineStatus1 == 2"
            multiple
            :data="uploadData[3]"
            :on-remove="handleRemove"
            :action="url"
            accept=".jpg, .png, .jpeg"
          >
            <Button icon="ios-cloud-upload-outline">上传成绩单（图片）</Button>
          </Upload>
          <Upload
            v-else
            disabled
            multiple
            :data="uploadData[3]"
            :on-remove="handleRemove"
            :action="url"
            accept=".jpg, .png, .jpeg"
          >
            <Button icon="ios-cloud-upload-outline">上传成绩单（图片）</Button>
          </Upload>
        </Col>
      </Row>
      <Row style="margin-top: 1vh">
        <Col>
          <Upload
            v-if="submit == false || formValidate.examineStatus3 == 2"
            multiple
            :data="uploadData[4]"
            :on-remove="handleRemove"
            :action="url"
            accept=".jpg, .png, .jpeg"
          >
            <Button icon="ios-cloud-upload-outline"
              >上传实习协议（图片）</Button
            >
          </Upload>
          <Upload
            v-else
            disabled
            multiple
            :data="uploadData[4]"
            :on-remove="handleRemove"
            :action="url"
            accept=".jpg, .png, .jpeg"
          >
            <Button icon="ios-cloud-upload-outline"
              >上传实习协议（图片）</Button
            >
          </Upload>
        </Col>
        <Col offset="2" v-if="formValidate.internshipType == '2'">
          <Upload
            v-if="submit == false || formValidate.examineStatus3 == 2"
            multiple
            :data="uploadData[5]"
            :on-remove="handleRemove"
            :action="url"
            accept=".jpg, .png, .jpeg"
          >
            <Button icon="ios-cloud-upload-outline"
              >上传劳动合同/劳务合同/实习证明/实习协议（图片）</Button
            >
          </Upload>
          <Upload
            v-else
            disabled
            multiple
            :data="uploadData[5]"
            :on-remove="handleRemove"
            :action="url"
            accept=".jpg, .png, .jpeg"
          >
            <Button icon="ios-cloud-upload-outline"
              >上传劳动合同/劳务合同/实习证明/实习协议（图片）</Button
            >
          </Upload>
        </Col>
      </Row>
      <Button
        v-if="
          submit == false ||
          formValidate.examineStatus3 == 2 ||
          formValidate.examineStatus2 == 2 ||
          formValidate.examineStatus1 == 2 ||
          show == true
        "
        type="primary"
        @click="handleSubmit('formValidate')"
        style="margin-top: 25px"
      >
        提交
      </Button>
      <div>
        <Button
          v-if="
            submit == true &&
            formValidate.examineStatus3 == 1 &&
            formValidate.examineStatus2 == 1 &&
            formValidate.examineStatus1 == 1
          "
          type="primary"
          style="margin-top: 25px"
        >
          下载实习登记表
        </Button>
        <Button
          v-else-if="submit == true"
          type="primary"
          @click="changeShow()"
          style="margin-top: 25px"
        >
          修改个人信息
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Internship",
  data() {
    return {
      show: true,
      submit: false,
      examine: false,
      formValidate: {
        name: sessionStorage.getItem("name"),
        uid: sessionStorage.getItem("username"),
        phoneNumber: "",
        email: "",
        idCard: "",
        companyName: "",
        companyWebsite: "",
        schoolTeacher: "",
        schoolTeacherPhone: "",
        companyContact: "",
        companyContactPhone: "",
        companyTeacher: "",
        companyTeacherPhone: "",
        companyTeacherPost: "",
        companyTeacherQualification: "",
        companyTeacherInfo: "",
        projectInfo: "",
        internshipType: "",
        insuranceType: "",
        insuranceStartDate: "",
        insuranceEndDate: "",
        resumePath: "",
        insurancePath: "",
        tuitionPath: "",
        gradePath: "",
        contractPath: "",
        liangfangPath: "",
        examineStatus1: 3,
        examineStatus2: 3,
        examineStatus3: 3,
        examineContent1: "",
        examineContent2: "",
        examineContent3: "",
        path: "",
      },
      ruleValidate: {
        phoneNumber: [
          {
            required: true,
            message: "不能为空",
          },
          {
            len: 11,
            message: "请输入正确的电话号码",
          },
        ],
        email: [
          {
            required: true,
            message: "不能为空",
          },
          {
            type: "email",
            message: "不正确的邮箱格式",
          },
        ],
        idCard: [
          {
            required: true,
            message: "不能为空",
          },
          {
            len: 18,
            message: "请输入正确的身份证号",
          },
        ],
        companyName: [
          {
            required: true,
            message: "不能为空",
          },
        ],
        companyWebsite: [
          {
            required: true,
            message: "不能为空",
          },
        ],
        schoolTeacher: [
          {
            required: true,
            message: "不能为空",
          },
        ],
        schoolTeacherPhone: [
          {
            required: true,
            message: "不能为空",
          },
          {
            len: 11,
            message: "请输入正确的电话号码",
          },
        ],
        companyContact: [
          {
            required: true,
            message: "不能为空",
          },
        ],
        companyContactPhone: [
          {
            required: true,
            message: "不能为空",
          },
          {
            len: 11,
            message: "请输入正确的电话号码",
          },
        ],
        companyTeacher: [
          {
            required: true,
            message: "不能为空",
          },
        ],
        companyTeacherPhone: [
          {
            required: true,
            message: "不能为空",
          },
          {
            len: 11,
            message: "请输入正确的电话号码",
          },
        ],
        companyTeacherPost: [
          {
            required: true,
            message: "不能为空",
          },
        ],
        companyTeacherQualification: [
          {
            required: true,
            message: "不能为空",
          },
        ],
        companyTeacherInfo: [
          {
            required: true,
            message: "不能为空",
          },
          {
            type: "string",
            max: 100,
            message: "不超过100个字",
          },
        ],
        projectInfo: [
          {
            required: true,
            message: "不能为空",
          },
          {
            type: "string",
            max: 100,
            message: "不超过100个字",
          },
        ],
        internshipType: [
          {
            required: true,
            message: "不能为空",
          },
        ],
        insuranceType: [
          {
            required: true,
            message: "不能为空",
          },
        ],
        insuranceStartDate: [
          {
            required: true,
            type: "date",
            message: "请选择日期",
          },
        ],
        insuranceEndDate: [
          {
            required: true,
            type: "date",
            message: "请选择日期",
          },
        ],
      },
      url: this.back_server + "/file/internship",
      uploadData: [
        {
          username: sessionStorage.getItem("username"),
          type: "resume",
        },
        {
          username: sessionStorage.getItem("username"),
          type: "insurance",
        },
        {
          username: sessionStorage.getItem("username"),
          type: "tuition",
        },
        {
          username: sessionStorage.getItem("username"),
          type: "grade",
        },
        {
          username: sessionStorage.getItem("username"),
          type: "contract",
        },
        {
          username: sessionStorage.getItem("username"),
          type: "liangfang",
        },
      ],
      option1: {
        disabledDate(date) {
          return date && date.valueOf() >= new Date();
        },
      },
    };
  },
  mounted() {
    this.$axios
      .get(this.back_server + "/form/getInternship", {
        params: {
          username: sessionStorage.getItem("username"),
        },
      })
      .then((res) => {
        if (res.data === "") {
          this.$axios.get(this.back_server + "/file/removeAll", {
            params: {
              username: sessionStorage.getItem("username"),
            },
          });
        } else {
          this.submit = true;
          this.show = false;
          this.formValidate = res.data;
          this.formValidate.insuranceType += "";
          this.formValidate.internshipType += "";
          this.formValidate.companyTeacherQualification += "";
          console.log(this.formValidate);
          if (
            res.data.examineStatus1 !== 3 &&
            res.data.examineStatus2 !== 3 &&
            res.data.examineStatus3 !== 3
          ) {
            this.examine = true;
          } else {
            this.examine = false;
          }
        }
      });
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$axios
            .get(this.back_server + "/file/validate", {
              params: {
                username: sessionStorage.getItem("username"),
                type: this.formValidate.internshipType,
              },
            })
            .then((res) => {
              if (res.data.code === 2) {
                this.$Message.error("请上传所需文件");
              } else {
                this.formValidate.resumePath = res.data.resume;
                this.formValidate.insurancePath = res.data.insurance;
                this.formValidate.tuitionPath = res.data.tuition;
                this.formValidate.gradePath = res.data.grade;
                this.formValidate.contractPath = res.data.contract;
                this.formValidate.liangfangPath = res.data.liangfang;
                this.$axios.post(
                  this.back_server + "/form/internship",
                  this.formValidate
                );
                this.$Message.success("Success!");
                this.submit = true;
                this.show = false;
                this.examine = false;
              }
            });
        } else {
          this.$Message.error("请填写所有信息");
        }
      });
    },
    handleRemove(file, filelist) {
      this.$axios.post(
        this.back_server + "/file/remove",
        this.$qs.stringify({
          path: file.response.path,
        })
      );
    },
    changeShow() {
      this.show = true;
    },
  },
};
</script>

<style>
</style>
