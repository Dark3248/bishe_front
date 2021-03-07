<template>
  <div>
    <Row justify="center" style="margin-top: 10vh">
      <RadioGroup v-model="postData.type">
        <div v-if="utype == 2">
          <Radio label="通过开题答辩名单"></Radio>
          <Radio label="通过中期答辩名单"></Radio>
          <Radio label="通过毕业答辩名单"></Radio>
        </div>
        <div v-if="utype == 3">
          <Radio label="导入学生名单"></Radio>
        </div>
        <div v-if="utype == 4">
          <Radio label="图书归还名单"></Radio>
          <Radio label="论文电子版提交名单"></Radio>
        </div>
      </RadioGroup>
    </Row>
    <Row style="margin-top: 5vh">
      <Col offset="8" span="8">
        <Upload
          v-if="postData.type == ''"
          disabled
          type="drag"
          accept=".xls, .xlsx"
          :data="postData"
          :action="url"
        >
          <div style="padding: 20px 0">
            <Icon
              type="ios-cloud-upload"
              size="52"
              style="color: #3399ff"
            ></Icon>
            <p>请选择上方选项</p>
          </div>
        </Upload>
        <Upload
          v-else
          type="drag"
          :data="postData"
          :action="url"
          accept=".xls, .xlsx"
          :on-success="handleSuccess"
          :on-error="handleError"
        >
          <div style="padding: 20px 0">
            <Icon
              type="ios-cloud-upload"
              size="52"
              style="color: #3399ff"
            ></Icon>
            <p>点击或拖拽上传文件</p>
          </div>
        </Upload>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: "Import",
  data() {
    return {
      disabled: true,
      utype: sessionStorage.getItem("utype"),
      postData: {
        type: "",
      },
      url: this.back_server + "/file/excel",
    };
  },
  methods: {
    handleSuccess(response) {
      console.log(response)
      if (response == 1)
        this.$Message.success("提交成功")
      else 
        this.$Message.error("上传失败，请检查名单是否符合格式")
    },
    handleError() {
      this.$Message.error("上传失败，请检查名单内是否含有已存在的学生数据");
    },
  },
};
</script>

<style>
</style>