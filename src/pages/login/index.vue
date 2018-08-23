<template>
  <el-row class="container login-container">
    <el-col :span="9">&nbsp;</el-col>
    <el-col :span="8">
      <div class="login-box">
        <h4>登录</h4>
        <el-form :model="loginForm" :rules="rules2" ref="loginForm" class="demo-ruleForm">
          <el-form-item label="" prop="mobile">
            <el-input type="text" v-model="loginForm.mobile" placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item label="" prop="pass">
            <el-input type="password" v-model="loginForm.pass" auto-complete="off" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-switch active-text="" inactive-text="" v-model="remember"></el-switch>
            <span>&nbsp;记住密码</span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">&nbsp;登录&nbsp;</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
    <el-col :span="7">&nbsp;</el-col>
  </el-row>
</template>

<script>
// 13750203069
import { customerLogin } from '../../service';
export default {
  data() {
    return {
      loginForm: {
        mobile: '',
        pass: ''
      },
      rules2: {
        pass: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入账号', trigger: 'blur' }]
      },
      remember: false
    };
  },
  mounted() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //axios请求
          customerLogin({
            country: '86',
            mobile: this.loginForm.mobile,
            password: this.loginForm.pass
          })
            .then(response => {
              // this.handleError(response);
              console.log('===views===');
              console.log(response);
              console.log('===views===');
              var res = response.data;
              var a =  res;
              // this.$message({
              //   message: res.msg,
              //   type: 'error'
              // });
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">

</style>
