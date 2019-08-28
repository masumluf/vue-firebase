<template>
  <!-- Button trigger modal -->
  <!--<button type="button" class="btn btn-primary">Launch demo modal</button> -->

  <!-- Modal -->
  <div
    class="modal fade"
    id="login"
    tabindex="-1"
    role="dialog"
    aria-labelledby="loginTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-scrollable" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalScrollableTitle">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <ul class="nav nav-fill nav-pills mb-3" id="pills-tab" role="tablist">
            <li class="nav-item">
              <a
                class="nav-link active"
                id="pills-home-tab"
                data-toggle="pill"
                href="#pills-login"
                role="tab"
                aria-controls="pills-login"
                aria-selected="true"
                @click="errorTurn=false"
              >Login</a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                id="pills-register-tab"
                data-toggle="pill"
                href="#pills-register"
                role="tab"
                aria-controls="pills-register"
                aria-selected="false"
                @click="errorTurn=false"
              >Signup</a>
            </li>
          </ul>

          <div class="tab-content" id="pills-tabContent">
            <div
              class="tab-pane fade show active"
              id="pills-login"
              role="tabpanel"
              aria-labelledby="pills-login-tab"
            >
              <h5 class="text-center">Login Please</h5>
              <div v-if="errorTurn" class="alert alert-danger" role="alert">{{errorAlert}}</div>

              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  v-model="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
                <small class="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  v-model="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  @keyup.enter="login"
                />
              </div>

              <div class="form-group">
                <button class="btn btn-primary" @click.prevent="login">Login</button>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="pills-register"
              role="tabpanel"
              aria-labelledby="pills-register-tab"
            >
              <h5 class="text-center">Create New Account</h5>
              <div v-if="errorTurn" class="alert alert-danger" role="alert">{{errorAlert}}</div>
              <div class="form-group">
                <label for="name">Your name</label>
                <input
                  type="text"
                  v-model="name"
                  class="form-control"
                  id="name"
                  placeholder="Your nice name"
                />
              </div>

              <div class="form-group">
                <label for="email">Email address</label>
                <input
                  type="email"
                  v-model="email"
                  class="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  v-model="password"
                  class="form-control"
                  id="password"
                  placeholder="Password"
                />
              </div>

              <div class="form-group">
                <button class="btn btn-primary" @click.prevent="register">Signup</button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { fb } from '../../../src/firebase'
export default {
  data() {
    return {
      name: null,
      email: null,
      password: null,
      errorTurn: false,
      errorAlert: ''
    }
  },

  methods: {
    login() {
      fb.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          $('#login').modal('hide')
          this.$router.replace('/admin')
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == 'auth/wrong-password') {
            this.errorAlert = 'Invalid Password'
            this.errorTurn = true
          } else {
            this.errorAlert = error.message;
            this.errorTurn = true;
          }
        })
    },
    register() {
      fb.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          $('#login').modal('hide')
          this.$router.replace('/admin')
        })
        .catch(error => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == 'auth/weak-password') {
            this.errorAlert = 'Password is weak'
            this.errorTurn = true
          } else {
            this.errorAlert = error.message;
            this.errorTurn = true;
          }

        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
