function changeSucceedStyle(nameID, spanID) { //如果输入成功的话，用来修改后面span的内容样式和输入框的颜色
	spanID.firstChild.nodeValue = "*";
	spanID.style.fontSize = "larger";
	spanID.style.color = "green";
	nameID.style.borderColor = "limegreen";
}

function changeFailedStyle(nameID, spanID) { //输入失败而且焦点不在该输入框时的样式
	spanID.firstChild.nodeValue = "*"; //设置后面的字体颜色、格式、大小
	spanID.style.fontSize = "larger";
	spanID.style.color = "";
	nameID.style.borderColor = "red";
}

function changeFailingStyle(nameID, spanID) { //输入失败时但是焦点还在该输入框时的样式
	spanID.style.fontSize = "small";
	spanID.style.color = "red";
	nameID.style.borderColor = "red";
}

function spanValue(spanID, spanValue) { //匹配失败时，修改后面字的总和
	switch(spanValue) {
		case "usernameSpan":
			spanID.firstChild.nodeValue = "6-16位：英文.数字.下划线";
			break;
		case "passwordSpan":
			spanID.firstChild.nodeValue = "6-16位：非空字符";
			break;
		case "repasswordSpan":
			spanID.firstChild.nodeValue = "请确认密码";
			break;
		case "repasswordSpan1":
			spanID.firstChild.nodeValue = "两次密码不一致";
			break;
		case "mailboxSpan":
			spanID.firstChild.nodeValue = "x(5-18位)@x.com";
			break;
		case "phoneSpan":
			spanID.firstChild.nodeValue = "号码格式不正确";
			break;
		case "usernameAgain":
			spanID.firstChild.nodeValue = "用户名已存在！";
	}
}

function username() {
	var username = document.getElementById("username"); //得到账户的对象
	var usernameSpan = document.getElementById("usernameSpan"); //得到文本对象
	var pattern = /^[0-9a-zA-Z_]{6,16}$/;
	var userAgain = 0; //用来标记用户名是否存在，1为用户名不存在且输入正确
	username.onfocus = function() { //获得焦点时根据匹配成功与否修改span中的样式和内容
		if(!pattern.test(username.value)) { //如果获得焦点时输入不正确，重新调整样式
			spanValue(usernameSpan, "usernameSpan"); //修改提示语句
			changeFailingStyle(username, usernameSpan); //修改为匹配中并且失败的样式
		} else {//如果匹配成功但是用户名存在
			if(userAgain == 0) {
				spanValue(usernameSpan, "usernameAgain"); //修改提示语句
				changeFailingStyle(username, usernameSpan); //修改为匹配中并且失败的样式
			}
		}
	}
	username.onkeyup = function() { //输入内容是判断根据输入的值修改span中的样式和内容,使用up不是down，因为down读取时候有出入
		if(pattern.test(username.value)) { //匹配成功的话
			changeSucceedStyle(username, usernameSpan); //修改为匹配成功的样式
			if(!checkUsername(username.value + "username")) {//如果用户名存在
				spanValue(usernameSpan, "usernameAgain"); //修改提示语句
				changeFailingStyle(username, usernameSpan); //修改为匹配中并且失败的样式
				userAgain = 0; //修改为0
			} else {
				userAgain = 1; //修改为1
			}
		} else { //匹配失败
			spanValue(usernameSpan, "usernameSpan"); //修改提示语句
			changeFailingStyle(username, usernameSpan);
		}
	}
	username.onblur = function() { //失去焦点时根据匹配成功与否修改span中的样式和内容
		if(pattern.test(username.value) && userAgain) { //匹配成功的话
			changeSucceedStyle(username, usernameSpan); //修改为成功的样式
			usernamenum = 1;
		} else { //匹配失败
			changeFailedStyle(username, usernameSpan); //修改为失败的样式
			usernamenum = 0;
		}
	}
}

function password() {
	var password = document.getElementById("password"); //得到密码的对象
	var passwordSpan = document.getElementById("passwordSpan");
	var pattern = /^\S{6,16}$/;
	var repassword = document.getElementById("repassword");
	password.onfocus = function() { //获得焦点时根据匹配成功与否修改span中的样式和内容
		if(!pattern.test(password.value)) { //如果获得焦点时输入不正确，重新调整样式
			spanValue(passwordSpan, "passwordSpan"); //修改提示语句
			changeFailingStyle(password, passwordSpan);
		}
	}
	password.onkeyup = function() { //输入内容是判断根据输入的值修改span中的样式和内容,使用up不是down，因为down读取时候有出入
		if(pattern.test(password.value)) { //匹配成功
			changeSucceedStyle(password, passwordSpan);
			if(repassword.value != "") { //如果此时确认密码不为空，需要重新进行确认
				repassword.onfocus();
			}
		} else { //匹配失败
			spanValue(passwordSpan, "passwordSpan"); //修改提示语句
			changeFailingStyle(password, passwordSpan);
			if(repassword.value != "") {
				repassword.onfocus();
			}
		}
	}

	password.onblur = function() { //失去焦点时根据匹配成功与否修改span中的样式和内容
		if(repassword.value == "") {
			if(pattern.test(password.value)) { //匹配成功
				changeSucceedStyle(password, passwordSpan);
				passwordnum = 1;
			} else { //匹配失败
				changeFailedStyle(password, passwordSpan);
				passwordnum = 0;
			}
		} else {
			if(password.value != repassword.value) {
				repassword.onfocus();
				//repassword.style.borderColor = "red";
				repasswordnum = 0;
			}
		}

	}

}

function repassword() {
	var password = document.getElementById("password");
	var repassword = document.getElementById("repassword"); //得到确认密码的样式
	var repasswordSpan = document.getElementById("repasswordSpan");

	repassword.onfocus = function() {
		if(!(password.value == repassword.value && password.value != "")) { //如果两次密码的值不相等，修改内容和样式
			spanValue(repasswordSpan, "repasswordSpan"); //修改提示语句
			changeFailingStyle(repassword, repasswordSpan);
		} else { //是有可能修改完密码后 与 此时的确认密码不同   然后又修改成相同的时候又用
			changeSucceedStyle(repassword, repasswordSpan);
		}
	}
	repassword.onkeyup = function() {
		if(password.value == repassword.value && password.value != "") { //如果两次密码的值相等，修改内容和样式
			changeSucceedStyle(repassword, repasswordSpan);
		} else {
			spanValue(repasswordSpan, "repasswordSpan1");
			changeFailingStyle(repassword, repasswordSpan);
		}
	}
	repassword.onblur = function() {
		if(password.value == repassword.value && password.value != "") { //如果两次密码的值相等，修改内容和样式
			changeSucceedStyle(repassword, repasswordSpan);
			repasswordnum = 1;
		} else {
			spanValue(repasswordSpan, "repasswordSpan");
			changeFailedStyle(repassword, repasswordSpan);
			repasswordnum = 0;
		}
	}
}

function mailbox() {
	var mailbox = document.getElementById("mailbox"); //得到邮箱对象
	var mailboxSpan = document.getElementById("mailboxSpan");
	var pattern = /^[0-9a-zA-Z_]{5,18}@[0-9a-z]+.com$/;
	mailbox.onfocus = function() {
		if(!pattern.test(mailbox.value)) {
			spanValue(mailboxSpan, "mailboxSpan");
			changeFailingStyle(mailbox, mailboxSpan);
		}
	}
	mailbox.onkeyup = function() {
		if(pattern.test(mailbox.value)) {
			changeSucceedStyle(mailbox, mailboxSpan);
		} else {
			spanValue(mailboxSpan, "mailboxSpan");
			changeFailingStyle(mailbox, mailboxSpan);
		}
	}
	mailbox.onblur = function() {
		if(pattern.test(mailbox.value)) {
			changeSucceedStyle(mailbox, mailboxSpan);
			mailboxnum = 1;
		} else {
			changeFailedStyle(mailbox, mailboxSpan);
			mailboxnum = 0;
		}
	}
}

function phone() {
	var phone = document.getElementById("phone");
	var phoneSpan = document.getElementById("phoneSpan");
	var pattern = /^1[3458][0-9]([1-9]{4}|0[1-9]{3}|[1-9]0[1-9]{2}|[1-9][1-9]0[1-9]|[1-9][1-9][1-9]0)\d{4}$/;
	phone.onfocus = function() {
		if(!pattern.test(phone.value)) {
			spanValue(phoneSpan, "phoneSpan");
			changeFailingStyle(phone, phoneSpan);
		}
	}
	phone.onkeyup = function() {
		if(pattern.test(phone.value)) {
			changeSucceedStyle(phone, phoneSpan);
		} else {
			spanValue(phoneSpan, "phoneSpan");
			changeFailingStyle(phone, phoneSpan);
		}
	}
	phone.onblur = function() {
		if(pattern.test(phone.value)) {
			changeSucceedStyle(phone, phoneSpan);
			phonenum = 1;
		} else {
			changeFailedStyle(phone, phoneSpan);
			phonenum = 0;
		}
	}
}

function vercode() {
	var vercode = document.getElementById("vercode");
	var vercodeSpan = document.getElementById("vercodeSpan");
	vercode.onfocus = function() {
		if(vercode.value == "" || vercodeSpan.style.color == "red" || vercodeSpan.style.color == "") { //如果内容为空点击产生验证码
			produceCode(); //在firefox浏览器中 vercodestyle刚开始是空的！！！
		} else { //其他情况下不产生验证码，只是对验证码对错进行验证
			if(vercodeSpan.style.color == "red") { //如果验证码不正确，根据提示语句的颜色来确认是否正确
				vercodeSpan.style.color = "red"; //单独设置样式
				vercode.style.borderColor = "red";
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
		var k = window.event.keyCode; //得到键盘此时按下的值  
		if(vercodeSpan.style.color == "green" && k != 9) { //如果此时按下的是tab键的话 不调用此函数
			vercode.onkeyup(1);
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

var usernamenum = 0,
	passwordnum = 0,
	repasswordnum = 0,
	mailboxnum = 0,
	phonenum = 0,
	vercodenum = 0;

function checkUsername(userName) {//传来的是key，不是value 如要查找：majialong 传来的是majialongusername 
	var cookie = unescape(document.cookie); //得到cookie
	var cookieArray = cookie.split(";"); //以；分组得到一个数组
	for(var i = 0; i < cookieArray.length; i++) { //步进值为4，直接跳转到uesername一项中
		var value = cookieArray[i].split("=")[0]; //再次以=分组直接,得到此时的key，不能得到value，因为密码的值可能于此冲突
		//alert(value);
		if(userName == value) { //如果此时的值与用户输入的值相同返回0
			return 0; //如果有存在的直接返回0 
		}
	}
	return 1; //如果不存在的话返回1
}

function submit() { //对提交按钮进行设置
	var submit = document.getElementById("submit");
	var username = document.getElementById("username");
	var password = document.getElementById("password");
	var repassword = document.getElementById("repassword");
	var mailbox = document.getElementById("mailbox");
	var phone = document.getElementById("phone");
	var vercode = document.getElementById("vercode");
	submit.onclick = function() {
		if(usernamenum && passwordnum && repasswordnum && mailboxnum && phonenum && vercodenum) { //如果各项内容都填写正确，写入cookie
			var date = new Date(); //新建一个时间类
			date.setDate(date.getDate() + 30); //设置时间 为 当前日期加上30天
			var tempCookie = "";
			var cookie1 = unescape(document.cookie);//得到cookie的值
			var cookieArray = cookie1.split(";");
			if(cookieArray.length%4==2 || cookieArray.length%4==3 ||cookieArray.length%4==1) {
                                if(cookieArray.length%4==1) {
					for(var i=0;i<cookieArray.length-1;i++) {
						if(cookieArray[i] != "") {//字符串不为空
							tempCookie += cookieArray[i];
							tempCookie += ";";
						}
					}
				}
				if(cookieArray.length%4==2) {
					for(var i=0;i<cookieArray.length-1;i++) {
						if(cookieArray[i] != "") {//字符串不为空
							tempCookie += cookieArray[i];
							tempCookie += ";";
						}
					}
				}
				if(cookieArray.length%4==3) {
					for(var i=0;i<cookieArray.length-2;i++) {
						if(cookieArray[i] != "") {//字符串不为空
							tempCookie += cookieArray[i];
							tempCookie += ";";
						}	
					}
				}
			}
			//var tempCookie = unescape(document.cookie);//先将cookie保留下来
			document.cookie = "";//将cookie设为空的
			//alert(tempCookie);
			cookie = username.value + "username" + "=" + username.value + ";" + username.value + "password" + "=" + password.value + ";" + username.value + "mailbox" + "=" + mailbox.value + ";" + username.value + "phone" + "=" + phone.value + ";" + tempCookie;
			document.cookie = escape(cookie);
			//将新的内容写入带最前面，
			//不编码的话只会长时间保存第一个内容
			document.cookie = document.cookie + ";expires=" + date.toGMTString(); //加上保存的时间
			alert("注册完成！");
			//var a = unescape(document.cookie);
			//alert(a);
			return false;//取消浏览器默认刷新行为
		} else { //否则对填写错误的那项进行聚焦，来提示错误
			if(!usernamenum) {
				username.onfocus();
			}
			if(!passwordnum) {
				password.onfocus();
			}
			if(!repasswordnum) {
				repassword.onfocus();
			}
			if(!mailboxnum) {
				mailbox.onfocus();
			}
			if(!phonenum) {
				phone.onfocus();
			}
			if(!vercodenum) {
				vercode.onfocus();
			}
			alert("请确认信息填写正确！");
			return false;
		}
	}
}

window.onload = function() {
	username();
	password();
	repassword();
	mailbox();
	mailbox();
	phone();
	vercode();
	submit();
	//var Username = document.getElementById("username");
	//Username.focus();
}
