<template>
  <div id="login">
    <h1 class="header">Music Chart</h1>
    <el-tabs v-model="activeTab">

      <!-- EMAIL TAB -->
      <el-tab-pane label="Email" name="email">
        <el-form ref="form" :model="form" label-width="120px">

          <!-- EMAIL -->
          <el-form-item label="Email">
            <el-input type="email" v-model="form.email" autofocus></el-input>
          </el-form-item>

          <!-- PASSWORD -->
          <el-form-item label="Password">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>

          <!-- REMEMBER ME -->
          <el-form-item>
            <el-checkbox v-model="form.rememberMe">Remember Me</el-checkbox>
          </el-form-item>

          <!-- LOGIN BUTTONS -->
          <el-form-item>
            <el-button type="primary" @click="onLogIn">Log In</el-button>
            <el-button @click="onSignUp">Sing Up</el-button>
          </el-form-item>

        </el-form>
      </el-tab-pane>

      <!-- GOOGLE TAB -->
      <el-tab-pane label="Google" name="google">
        <el-button type="primary" @click="onLogInWithGoogle">Log in with Google</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {firebaseService} from '../services/firebase.service';

  export default {
    data() {
      return {
        activeTab: 'email',
        form: {
          email: '',
          password: '',
          rememberMe: false,
        }
      }
    },
    created() {
      firebaseService.connect();
      if (this.$cookie.get('rememberMe')) {
        this.$router.push('home');
      }
    },
    methods: {
      onLogIn() {
        const self = this;
        firebaseService.logIn(this.form.email, this.form.password).then(result => {
          if (self.form.rememberMe) {
            self.$cookie.set('rememberMe', 'lalala', {expires: '1Y'});
          }
          self.$router.push('home');
        }).catch(function (error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            self.$message({message: 'Wrong password.', type: 'error'});
          } else {
            self.$message({message: errorMessage, type: 'error'});
          }
          console.log(error);
        });
      },
      onSignUp() {
        const self = this;
        firebaseService.signUp(this.form.email, this.form.password).then(_ => {
          self.$message({message: 'You have successfully Signed Up', type: 'success'});
          self.$router.push('home');
        }).catch(function (error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === 'auth/weak-password') {
            self.$message({message: 'The password is too weak.', type: 'error'});
          } else {
            self.$message({message: errorMessage, type: 'error'});
          }
          console.log(error);
        });
      },
      onLogInWithGoogle() {
        const self = this;
        firebaseService.google().then(_ => {
          self.$router.push('home');
        });
      }
    },
  }
</script>

<style lang="scss" scoped>
  #login {
    width: 600px;
    margin: 0 auto;
    padding-top: 100px;
  }

  .header {
    text-align: center;
    font-size: 50px;
    color: #97a8be;
  }
</style>
