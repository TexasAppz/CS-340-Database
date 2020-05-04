<template>
  <div class="wrapper">
  <form class="form-signin">
    <h2 class="form-signin-heading">Register Here</h2>
    <input type="text" class="form-control" name="firstName" placeholder="First Name" required="" autofocus="" />
    <label class="checkbox">
    </label>
    <input type="password" class="form-control" name="firstName" placeholder="Last Name" required=""/>
    <label class="checkbox">
    </label>
    <input type="text" class="form-control" name="username" placeholder="Email Address" required="" autofocus="" />
    <label class="checkbox">
    </label>
    <input type="password" class="form-control" name="password" placeholder="Password" required=""/>
    <label class="checkbox">
    </label>
    <input type="password" class="form-control" name="passwordAgain" placeholder="Enter Password Again" required=""/>
    <label class="checkbox">
    </label>
    <button class="btn btn-lg btn-primary2 btn-block"  type="submit">Register</button>
  </form>
</div>
</template>
<script>
export default {
    name: 'Register'
};
</script>

<style scoped>
.test {
    color: blue;
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
</style>
