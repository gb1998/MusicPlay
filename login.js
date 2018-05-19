function changeSucceedStyle(nameID, spanID) { //如果输入成功的话，用来修改后面span的内容样式和输入框的颜色
	spanID.firstChild.nodeValue = "*";
	spanID.style.fontSize = "larger";
	spanID.style.color = "green";
	nameID.style.borderColor = "limegreen";
}

function changeFailedStyle(nameID, spanID) { //输入失败而且焦点不在该输入框时的样式
	spanID.firstChild.nodeValue = "*"; //设置后面的字体颜色、格式、大小
	spanID.style.fontSize = "larger";
	spanID.style.color = "red";
	nameID.style.borderColor = "red";
}

function changeFailingStyle(nameID, spanID) { //输入失败时但是焦点还在该输入框时的样式
	spanID.style.fontSize = "small";
	spanID.style.color = "red";
	nameID.style.borderColor = "red";
}

function getCookie(username) {//传来的是key，返回的是对应的value
	var cookie = unescape(document.cookie); //得到解码后的cookie
	//var complie = cookieName + "=" + "(.+?);"; //编写正则表达式
	//var pattern = new RegExp(complie);
	//var matches = pattern.exec(cookie); //匹配内容，并返回数组
	var cookieArray = cookie.split(";"); //第一次分组
	for(var i = 0; i < cookieArray.length; i++) { //循环分组里面的内容
		var value = cookieArray[i].split("="); //第二次分组
		if(value[0] == username) { //如果匹配到所要求而的内容
			return value[1]; //返回值
		}
	}
}


function vercode() {
	var vercode = document.getElementById("vercode");
	var vercodeSpan = document.getElementById("vercodeSpan");
	vercode.onfocus = function() {
		if(vercode.value == "" || vercodeSpan.style.color == "red" || vercodeSpan.style.color == "") { //如果内容为空点击产生验证码
			produceCode(); //在firefox浏览器中 刚开始vercodeSpan的颜色是空的
		} else { //其他情况下不产生验证码，只是对验证码对错进行验证
			if(vercodeSpan.style.color == "red") { //如果验证码不正确，根据提示语句的颜色来确认是否正确
				vercodeSpan.style.color = "red"; //单独设置样式
				vercode.style.borderColor = "red";
			} else { //在chrome不需要  在ie中需要  输入完验证码 再输入密码自动跳转时
				changeSucceedStyle(vercode, vercodeSpan);
			}
		}
	}
	vercode.onkeyup = function(s) {
		var vercodeSpan = document.getElementById("vercodeSpan");
		if(vercode.value == vercodeSpan.firstChild.nodeValue) { //如果验证码正确
			changeSucceedStyle(vercode, vercodeSpan);
		} else {
			vercodeSpan.style.color = "red"; //单独设置样式
			vercode.style.borderColor = "red";
		}
		if(s == 1) { //如果修改前是正确的
			produceCode();
			vercodeSpan.style.color = "red"; //单独设置样式
			vercode.style.borderColor = "red";
		}
	}
	vercode.onkeydown = function() { //修改前正确的话重新产生验证码
		if(window.event.keyCode) {
			var k = window.event.keyCode; //得到键盘此时按下的值   !!!firefox浏览器不支持这种事件
			if(vercodeSpan.style.color == "green" && k != 9) { //如果此时按下的是tab键的话 不调用此函数
				vercode.onkeyup(1);
			}
		} else {
			if(vercodeSpan.style.color == "green") { //如果此时按下的是tab键的话 不调用此函数
				vercode.onkeyup(1);
			}
		}

	}
	vercode.onblur = function() {
		if(vercodeSpan.style.color == "green") {
			changeSucceedStyle(vercode, vercodeSpan);
			vercodenum = 1;
		} else {
			changeFailedStyle(vercode, vercodeSpan);
			vercodenum = 0
		}
	}

	function produceCode() { //产生验证码
		var code = ""; //初始化一个字符串型的空验证码
		for(var i = 0; i < 4; i++) { //循环四次
			var num = Math.floor(Math.random() * 10);
			code += num; //产生一个数字加到验证码上
		}
		vercodeSpan.firstChild.nodeValue = code; //设置span为验证码
	}
}

function username() {
	var username = document.getElementById("username"); //得到账户的对象
	var usernameSpan = document.getElementById("usernameSpan"); //得到文本对象
	var usernameCookie;
	var password = document.getElementById("password");
	username.onfocus = function() { //获得焦点时根据匹配成功与否修改span中的样式和内容
		usernameCookie = getCookie(username.value + "username");
		if(!(username.value == usernameCookie)) { //如果获得焦点时输入不正确，重新调整样式
			usernameSpan.firstChild.nodeValue = "账户不存在"; //修改提示语句
			changeFailingStyle(username, usernameSpan); //修改为匹配中并且失败的样式
		} else {
			changeSucceedStyle(username, usernameSpan);
			usernamenum = 1;
		}
	}
	username.onkeyup = function() { //输入内容是判断根据输入的值修改span中的样式和内容,使用up不是down，因为down读取时候有出入
		usernameCookie = getCookie(username.value + "username");
		if(username.value == usernameCookie) { //匹配成功的话
			changeSucceedStyle(username, usernameSpan); //修改为匹配成功的样式
			password.focus(); //输入正确的话直接换行
			if(password.value != "") { //如果此时密码的值不为空
				password.onfocus();
			}
		} else { //匹配失败
			usernameSpan.firstChild.nodeValue = "账户不存在"; //修改提示语句
			changeFailingStyle(username, usernameSpan);
			if(password.value != "") { //如果此时密码的值不为空
				password.onfocus();
			}
		}
	}
	username.onblur = function() { //失去焦点时根据匹配成功与否修改span中的样式和内容
		//usernameCookie = getCookie(username.value + "username");
		if(username.value == usernameCookie) { //匹配成功的话
			changeSucceedStyle(username, usernameSpan); //修改为成功的样式
			usernamenum = 1;
		} else { //匹配失败
			changeFailedStyle(username, usernameSpan); //修改为失败的样式
			usernamenum = 0;
		}
	}
}

function password() {
	var password = document.getElementById("password"); //得到账户的对象
	var passwordSpan = document.getElementById("passwordSpan"); //得到文本对象
	var username = document.getElementById("username"); //得到用户所输入的账户
	var vercode = document.getElementById("vercode");
	
	var usernameCookie; //= getCookie(username.value + "username");//用来得到此时的用户名，防止再次修改用户名造成错误
	var passwordCookie; //= getCookie(username.value + "password");//用来查找此时输入的用户名对应的密码

	password.onfocus = function() { //获得焦点时根据匹配成功与否修改span中的样式和内容
		//再次得到密码和用户名，防止填写完密码后修改用户名导致用户名和密码不一致
		usernameCookie = getCookie(username.value + "username");//此时得到cookie中对应用户的账号
		passwordCookie = getCookie(username.value + "password");//得到对应用户的密码
		if(!(password.value == passwordCookie) || !(username.value == usernameCookie)) { //如果获得焦点时输入不正确，重新调整样式
			passwordSpan.firstChild.nodeValue = "密码错误"; //修改提示语句
			changeFailingStyle(password, passwordSpan); //修改为匹配中并且失败的样式
		} else {
			changeSucceedStyle(password, passwordSpan);
		}
	}
	password.onkeyup = function() { //输入内容是判断根据输入的值修改span中的样式和内容,使用up不是down，因为down读取时候有出入
		usernameCookie = getCookie(username.value + "username");//此时得到cookie中对应用户的账号
		passwordCookie = getCookie(username.value + "password");//得到对应用户的密码
		if(password.value == passwordCookie && username.value == usernameCookie) { //如果密码等于cookie的值，并且用户输入的账户与cookie的值一致时
			changeSucceedStyle(password, passwordSpan); //修改为匹配成功的样式
			vercode.focus(); //输入正确的话直接换行
		} else { //匹配失败
			passwordSpan.firstChild.nodeValue = "密码错误"; //修改提示语句
			changeFailingStyle(password, passwordSpan);
		}
	}
	password.onblur = function() { //失去焦点时根据匹配成功与否修改span中的样式和内容
		//usernameCookie = getCookie(username.value + "username");
		//passwordCookie = getCookie(username.value + "password");
		if(password.value == passwordCookie && username.value == usernameCookie) { //匹配成功的话
			changeSucceedStyle(password, passwordSpan); //修改为成功的样式
			passwordnum = 1;
		} else { //匹配失败
			changeFailedStyle(password, passwordSpan); //修改为失败的样式
			passwordnum = 0;
		}
	}
}

var usernamenum = 0,
	passwordnum = 0,
	vercodenum = 0;

function user() {
	var user = document.getElementById("user");
	var username = document.getElementById("username");
	user.onclick = function() {
		if(usernamenum && passwordnum && vercodenum) {
			document.cookie = "ID=1;"; //代表用户登录
			document.cookie = "login=" + username.value;
			location.href="../MusicPlay/跳转1.html";
		} else {
			alert("请确认填写的信息全部正确！");
			return false;
		}
	}
}

function visitor() {
	var visitor = document.getElementById("visitor");
	visitor.onclick = function() {
		if(document.cookie != "") {//如果此时cookie为空的话，不进行保存cookie，否则ID不会在最后面一项
			document.cookie = "ID=0;"; //代表游客登录
		}
		location.href = "index.html";
	}
}

window.onload = function() {
	vercode();
	username();
	password();
	user();
	visitor();
	var Username = document.getElementById("username");
	Username.onfocus();
	//var a = unescape(document.cookie);
			//alert(a);
}
