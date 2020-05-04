<template>
<!-- <<<<<<< HEAD -->
  <div class="wrapper">
  <form class="form-signin">
    <h2 class="form-signin-heading">Login</h2>
    <input type="text" class="form-control" name="username" placeholder="Email Address" required="" autofocus="" />
    <input type="password" class="form-control" name="password" placeholder="Password" required=""/>
    <label class="checkbox">
      <input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe"> Forgot Password?
    </label>
    <button class="btn btn-lg btn-primary2 btn-block"  type="submit">Login</button>
  </form>
</div>
<!-- ======= -->
    <!-- <div>
        <h1 class="test">Login Page</h1>

        <div>
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                <b-form-group
                    id="input-group-1"
                    label="Email address:"
                    label-for="input-1"
                    description="We'll never share your email with anyone else."
                >
                    <b-form-input
                        id="input-1"
                        v-model="form.email"
                        type="email"
                        required
                        placeholder="Enter email"
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    id="input-group-2"
                    label="Your Name:"
                    label-for="input-2"
                >
                    <b-form-input
                        id="input-2"
                        v-model="form.name"
                        required
                        placeholder="Enter name"
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    id="input-group-3"
                    label="Food:"
                    label-for="input-3"
                >
                    <b-form-select
                        id="input-3"
                        v-model="form.food"
                        :options="foods"
                        required
                    ></b-form-select>
                </b-form-group>

                <b-form-group id="input-group-4">
                    <b-form-checkbox-group
                        v-model="form.checked"
                        id="checkboxes-4"
                    >
                        <b-form-checkbox value="me"
                            >Check me out</b-form-checkbox
                        >
                        <b-form-checkbox value="that"
                            >Check that out</b-form-checkbox
                        >
                    </b-form-checkbox-group>
                </b-form-group>

                <b-button type="submit" variant="primary">Submit</b-button>
                <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
            <b-card class="mt-3" header="Form Data Result">
                <pre class="m-0">{{ form }}</pre>
            </b-card>
        </div>
    </div> -->
<!-- >>>>>>> 01d111a8b7e9aa78cb7376dd9dcc2442ed1ad3c9 -->
</template>
<script>
export default {
    name: 'Login',
    data() {
        return {
            form: {
                email: '',
                name: '',
                food: null,
                checked: []
            },
            foods: [
                { text: 'Select One', value: null },
                'Carrots',
                'Beans',
                'Tomatoes',
                'Corn'
            ],
            show: true
        };
    },
// <<<<<<< HEAD
  };
// =======
//     methods: {
//         onSubmit(evt) {
//             evt.preventDefault();
//             alert(JSON.stringify(this.form));
//         },
//         onReset(evt) {
//             evt.preventDefault();
//             // Reset our form values
//             this.form.email = '';
//             this.form.name = '';
//             this.form.food = null;
//             this.form.checked = [];
//             // Trick to reset/clear native browser form validation state
//             this.show = false;
//             this.$nextTick(() => {
//                 this.show = true;
//             });
//         }
//     }
// };
// >>>>>>> 01d111a8b7e9aa78cb7376dd9dcc2442ed1ad3c9
</script>
<style scoped>
/* <<<<<<< HEAD */
    .test{
      color: red;
    }
</style>
<style scoped>
  body {
  	background: #eee !important;
  }

  .wrapper {
  	margin-top: 80px;
    margin-bottom: 80px;
  }


  .form-signin {
    max-width: 380px;
    padding: 15px 35px 45px;
    margin: 0 auto;
    background-color: #fff;
    border: 1px solid rgba(0,0,0,0.1);

    .form-signin-heading,
  	.checkbox {
  	  margin-bottom: 30px;
  	}

  	.checkbox {
  	  font-weight: normal;
  	}

  	.form-control {
  	  position: relative;
  	  font-size: 16px;
  	  height: auto;
  	  padding: 10px;
  		@include box-sizing(border-box);

  		&:focus {
  		  z-index: 2;
  		}
  	}

  	input[type="text"] {
  	  margin-bottom: -1px;
  	  border-bottom-left-radius: 0;
  	  border-bottom-right-radius: 0;
  	}

  	input[type="password"] {
  	  margin-bottom: 20px;
  	  border-top-left-radius: 0;
  	  border-top-right-radius: 0;
  	}
  }
  .btn-primary2 {
    color: #fff;
    background-color: #17A2B8;
    border-color: #17A2B8;
  }
/* ======= */
.test {
    color: red;
}
</style>
<style>
.test {
    color: #cccccc;
}
/* >>>>>>> 01d111a8b7e9aa78cb7376dd9dcc2442ed1ad3c9 */
</style>
