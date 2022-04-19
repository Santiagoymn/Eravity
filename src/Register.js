import React from 'react';
import { Helmet } from "react-helmet";
import './registerStyle.css'

function Register() {
  return (
      <div>
    <Helmet>
        <title>Register Page</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<script src="https://kit.fontawesome.com/f9a9bc67cc.js" crossorigin="anonymous"></script>
		<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Droid+Sans" />
        <link rel="stylesheet" type="text/css" href="../css/register.css" />
    </Helmet>
    <body>
		<div id="title" align="center">
			<h1 id="black">Eravity</h1>
		</div>
		<div class="main">
			<form class="register">
			
				<div class="column">
					<div class="register__field" id="top">
						<i class="login__icon fa-solid fa-envelope fa-2xl"></i>
						<input type="text" class="login__input" placeholder="email" />
					</div>
					<div class="register__field">
						<i class="login__icon fas fa-user fa-2xl"></i>
						<input type="text" class="login__input" placeholder="name" />
					</div>
					<div class="register__field">
						<i class="login__icon fas fa-user fa-2xl"></i>
						<input type="text" class="login__input" placeholder="surname" />
					</div>
					<div class="register__field" id="bottom">
						<i class="login__icon fa-solid fa-graduation-cap fa-2xl"></i>
						<input type="text" class="login__input" placeholder="university" />
					</div>
				</div>
				
				<div class="column">
					<div class="register__field" id="top">
						<i class="login__icon fa-solid fa-book-open fa-2xl"></i>
						<input type="text" class="login__input" placeholder="degree/master"/>
					</div>
					<div class="register__field">
						<i class="login__icon fas fa-lock fa-2xl"></i>
						<input type="password" class="login__input" placeholder="password"/>
					</div>
					<div class="register__field">
						<i class="login__icon fas fa-lock fa-2xl"></i>
						<input type="password" class="login__input" placeholder="repeat password"/>
					</div>
					<div class="register__field" id="bottom">
						<button class="button register__submit"><span>Sign up</span></button>
					</div>
				</div>
				
			</form>
					
			<div class="back2login">
				<h3 id="white">If you already have an account, please <a href="../html/login.html">sign in.</a></h3>
			</div>
			
		</div>
	</body>

    </div>
  )
}

export default Register