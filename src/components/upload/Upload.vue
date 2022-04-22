<template>
  <div class="upload">
    <div class="open-btn" @click="dialogVisible = true">
      <i class="iconfont icon-close"></i>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="60%"
      title="upload"
      :close-on-click-modal="false"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="90px"
        class="form"
        label-position="left"
        :status-icon="true"
        :rules="rules"
      >
        <el-form-item prop="music_name" label="歌曲名字">
          <el-input v-model="form.music_name" clearable placeholder="必选" />
        </el-form-item>
        <el-form-item prop="singer_name" label="歌手名字">
          <el-input v-model="form.singer_name" clearable placeholder="必选" />
        </el-form-item>
        <el-form-item prop="music_url" label="歌曲地址">
          <el-input v-model="form.music_url" clearable placeholder="必选" />
        </el-form-item>
        <el-form-item prop="cat_id" label="歌曲分类">
          <el-input v-model="form.cat_id" clearable placeholder="可选" />
        </el-form-item>
        <el-form-item prop="lyric_url" label="歌词地址">
          <el-input v-model="form.lyric_url" clearable placeholder="可选" />
        </el-form-item>
      </el-form>
      <div class="manipulation" slot="footer">
        <el-button @click="dialogVisible = false">cancel</el-button>
        <el-button type="primary" @click="handleUpload">upload</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import "./interface";
import { ElForm } from "element-ui/types/form";
import { uploadMusic } from "@/network/upload";
import { getCookie } from "@/utils/cookie";

@Component
export default class Upload extends Vue {
  dialogVisible = false;
  form: UploadConfig = {
    music_name: "",
    cat_id: null,
    music_url: "",
    lyric_url: null,
    singer_name: ""
  };

  reg: Reg = {
    url: /^http(s?):\/\/.+$/,
    cat_id: /^[1234]$/
  };

  validateUrl: Validator = (rule, value, fn) => {
    if (!this.reg.url.test(value as string)) {
      fn(new Error("请输入正确的URL"));
    }
    fn();
  };

  validateLyric_Url: Validator = (rule, value, fn) => {
    if (value) {
      if (!this.reg.url.test(value as string)) {
        fn(new Error("请输入正确的URL"));
      }
    }
    fn();
  };

  validateCat_id: Validator = (rule, value, fn) => {
    if (value) {
      if (!this.reg.cat_id.test((value as number) + "")) {
        fn(new Error("请输入正确的分类id(1 - 4)"));
      }
    }
    fn();
  };

  rules: Rule = {
    music_name: [
      { required: true, message: "歌曲名字不能为空", trigger: "blur" }
    ],
    singer_name: [
      { required: true, message: "歌手名字不能为空", trigger: "blur" }
    ],
    music_url: [
      { required: true, message: "歌曲地址不能为空", trigger: "blur" },
      { validator: this.validateUrl, trigger: "blur" }
    ],
    cat_id: [{ validator: this.validateCat_id, trigger: "blur" }],
    lyric_url: [{ validator: this.validateLyric_Url, trigger: "blur" }]
  };

  $refs!: {
    form: ElForm;
  };

  handleUpload() {
    this.$refs.form.validate(async valid => {
      if (valid) {
        await this.uploadHandler();
        this.$refs.form.resetFields();
        this.dialogVisible = false;
        console.log("submit");
      } else {
        console.log("error");
      }
    });
  }

  async uploadHandler() {
    const id = parseInt(getCookie("user_id"));
    if (!id) {
      this.$router.push("/");
    }
    const res = await uploadMusic(this.form, id);
    return res;
  }
}
</script>

<style scoped lang="less">
.upload {
  .open-btn {
    width: 100px;
    height: 100px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(to right, #3b8d99, #6b6b83, #aa4b6b);
    transition: 1s;
    i {
      font-size: 35px;
      font-weight: bold;
      color: white;
    }
    &:hover {
      box-shadow: 0 0 25px white, 0 0 50px white, 0 0 100px white;
    }
  }
  .el-dialog__wrapper {
    position: absolute;
    left: 0px;
    top: 0px;
    right: 0px;
    bottom: 0px;
  }
}
</style>
