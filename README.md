# MusicPlay
纯css,js 前端音乐播放器,界面UI比较好我特别喜欢,适合二次开发,调用了网易云第三方接口以及将歌曲链接导出可以访问的歌曲链接,实现了异步歌曲搜索播放,以及异步显示歌词等.结合html5 新特性实现歌曲暂停,下一首,快进等等.为大二前端练手项目.
采用渐变质背景                                                                                
异步搜索歌曲链接并添加播放（原生态js异步调用网易云根据关键字匹配歌曲链接的接口）目前该接口因版权部分歌曲链接失效                                                                                   
网易云音乐接口：http://s.music.163.com/search/get/                                                                                      
参数                                                                                                         
var data = {                                   
			"type": 1,//单曲                               
			"limit": 1,//返回数量1                                     
			"s": value,//搜索词                                        
			"callback": "jsonpcallback"                            
		};                                                         
搜索歌曲实现播放关键代码                  

	searchBtn.addEventListener('click', function () {
		var value = keyword.value;
		if (!value) {
			alert('关键词不能为空');
			return;
		}
		//http://music.163.com/api/song/lyric?os=pc&id=" . $music_id . "&lv=-1&kv=-1&tv=-1.歌词的链接
	   
		var url = "http://s.music.163.com/search/get/";
		
		var data = {
			"type": 1,//单曲
			"limit": 1,//返回数量1
			"s": value,//搜索词
			"callback": "jsonpcallback"
		};
		var buffer = [];
		for (var key in data) {
			buffer.push(key + '=' + encodeURIComponent(data[key]));
		}
		var fullpath = url + '?' + buffer.join('&');
		CreateScript(fullpath);
	});
    //异步加载js不影响当前渲染结果
	function CreateScript (src) {
		var el = document.createElement('script');
		el.src = src;//加载url
		el.async = true;
		el.defer = true;
		document.body.appendChild(el);
	};
	
};
加载歌曲链接搜索歌词                                                                                       
网易云音乐歌词接口：http://music.163.com/api/song/lyric?os=pc&id='+rs.result.songs[0].id+'&lv=-1&kv=-1&tv=-1&callback=lycjson。 这里首先要获取歌曲id                                                                                                    
如 曹操的歌词链接为：http://music.163.com/api/song/lyric?os=pc&id=108795&lv=-1&kv=-1&tv=-1&callback=lycjson                               

关键代码：

		
		function jsonpcallback (rs) {
			var resultHtml = '歌曲：<strong>' + rs.result.songs[0].name + '</strong>' + 
							 '歌手：<strong>' + rs.result.songs[0].artists[0].name + '</strong>' +
							 '<a href="javascript:;" id="to-play">立即播放</a>';	
							 //这个时候开始查询歌词
							// http://music.163.com/api/song/lyric?os=pc&id=" . $music_id . "&lv=-1&kv=-1&tv=-1
		 var lyc='http://music.163.com/api/song/lyric?os=pc&id='+rs.result.songs[0].id+'&lv=-1&kv=-1&tv=-1&callback=lycjson';
			alert("已经搜索到了歌词");
			window.open(lyc,"新窗口歌词","width=500,height=500,toolbar=no,scrollbars=no,menubar=no,screenX=100,screenY=100"); 

		//var el = document.createElement('script');
		//el.src = 'http://music.163.com/api/song/lyric?os=pc&id='+rs.result.songs[0].id+'&lv=-1&kv=-1&tv=-1&callback=lycjson';//加载url
		//el.async = true;
		//el.defer = true;
		//document.body.appendChild(el);
		
		　//window.open(lyc,"新窗口歌词","width=100,height=200,toolbar=no,scrollbars=no,menubar=no,screenX=100,screenY=100"); 
           // window.location.href=lyc;
		   //解释json
		  //alert(lycjson.lrc.lyric);
		//  http://s.music.163.com/search/get/?type=1&limit=1&s=%E5%8C%97%E4%BA%AC%E6%AC%A2%E8%BF%8E%E4%BD%A0&callback=jsonpcallback:formatted
		//http://s.music.163.com/search/get/?type=1&limit=1&s=%E6%88%91%E5%92%8C%E4%BD%A0&callback=jsonpcallback
			result.innerHTML = resultHtml;
			result.setAttribute('data-audio', rs.result.songs[0].audio);
			result.setAttribute('data-img', rs.result.songs[0].album.picUrl);
			result.setAttribute('data-music', rs.result.songs[0].name);
			result.setAttribute('data-singer', rs.result.songs[0].artists[0].name);
			result.style.opacity = '1';

		};
		function lycjson(rs){
			alert('123');
         var string =rs.lrc.lyric;
		 alert(string);

		};



