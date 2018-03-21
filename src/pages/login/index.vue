<template>
  <el-row class="container login-container">
    <el-col :span="9">&nbsp;</el-col>
    <el-col :span="8">
      <div class="login-box">
        <h4>登录</h4>
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
          <el-form-item label="" prop="account">
            <el-input type="text" v-model="ruleForm2.account" placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item label="" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-switch active-text="" inactive-text="" v-model="remember"></el-switch>
            <span>&nbsp;记住密码</span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">&nbsp;登录&nbsp;</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
    <el-col :span="7">&nbsp;</el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      ruleForm2: {
        account: '',
        pass: '',
      },
      rules2: {
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ]
      },
      remember: false
    };
  },
  mounted() {

  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //axios请求
          this.$http.post(this.Api.loginURL, {
              username: this.ruleForm2.account,
              password: this.ruleForm2.pass
          }).then(response => {
            var res = response.data;
            if (res && res.code == 0) {
              // let str = this.Cookies.get('token');
              // if(this.remember){
              this.Cookies.set('isLogin', 'true', { expires: 7 });
              // }
              this.$router.push({ path: '/admin/home/video/list' })
            } else {
              alert(res.msg)
            }
          }).catch(error => {
            console.log(error);
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style scoped lang="scss">

</style>
