<template>
  <v-card :loading="loading" class="mx-auto" max-width="374">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>
    <v-col class="pa-10">
      <form>
        <!-- <loader v-show="busy" /> -->
        <img
            id="profile-img"
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            class="profile-img-card"
        />
        <span>{{ message.message }}</span>
        <v-text-field
          v-model="username"
          :error-messages="usernameErrors"
          label="Username"
          required
          @input="$v.username.$touch()"
          @blur="$v.username.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          label="E-mail"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :error-messages="passwordErrors"
          label="Password"
          type="password"
          required
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
        ></v-text-field>
        <v-btn
          class="mr-4"
          @click="submit"
        >
          Login
        </v-btn>
      </form>
    </v-col>
  </v-card>
</template>
  
  <script>
    import User from '../models/user.js';
    import { validationMixin } from 'vuelidate'
    import { required, minLength, email} from 'vuelidate/lib/validators'
  
    export default {
      mixins: [validationMixin],
  
      validations: {
        username: { required, minLength: minLength(6) },
        email: { required, email },
        password: { required, minLength: minLength(6) },
      },

      components: {
        
      },
  
      data: () => ({
        user: new User('', ''),
        username: '',
        email: '',
        password: '',
        message: '',
        loading: false
      }),
  
      computed: {
        usernameErrors () {
          const errors = []
          if (!this.$v.username.$dirty) return errors
          !this.$v.username.minLength && errors.push('userName must be at most 6 characters long')
          !this.$v.username.required && errors.push('Username is required.')
          return errors
        },
        emailErrors () {
          const errors = []
          if (!this.$v.email.$dirty) return errors
          !this.$v.email.email && errors.push('Must be valid e-mail')
          !this.$v.email.required && errors.push('email is required.')
          return errors
        },
        passwordErrors () {
          const errors = []
          if (!this.$v.password.$dirty) return errors
          !this.$v.password.minLength && errors.push('Password must be at most 6 characters long')
          !this.$v.password.required && errors.push('Password is required')
          return errors
        },
        loggedIn() {
          return this.$store.state.auth.status.loggedIn;
        },
      },
      created() {
        // if (this.loggedIn) {
        //   this.$router.push('/');
        // }
      },
      methods: {
        submit () {
          this.$v.$touch()
          console.log('submit')
          if (this.$v.$invalid) {
            this.submitStatus = 'ERROR'
          } else {
            console.log('yay')
            this.loading = true;
            this.user.username = this.username
            this.user.email = this.email
            this.user.password = this.password
            if (this.user.username && this.user.password) {
                this.$store.dispatch('auth/register', this.user).then(
                () => {
                    this.$router.push('/login');
                },
                error => {
                    this.loading = false;
                    this.message =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
                }
                );
            }
          }
        },
      }
    }
  </script>

<style scoped>
    .card-container.card {
      max-width: 350px !important;
      padding: 40px 40px;
    }
    
    .card {
      background-color: #f7f7f7;
      padding: 20px 25px 30px;
      margin: 0 auto 25px;
      margin-top: 50px;
      -moz-border-radius: 2px;
      -webkit-border-radius: 2px;
      border-radius: 2px;
      -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
      -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    }
    
    .profile-img-card {
      width: 96px;
      height: 96px;
      margin: 0 auto 10px;
      display: block;
      -moz-border-radius: 50%;
      -webkit-border-radius: 50%;
      border-radius: 50%;
    }
    </style>