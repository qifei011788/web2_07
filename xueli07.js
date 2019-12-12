var box = document.getElementById('box');
		var slider = document.getElementById('slider');
		var nav = document.getElementById('nav').children;
		var left = document.getElementById('left');
		var right = document.getElementById('right');
		var word = document.getElementById('word');
		var index = 1;
		var isMoving = false;
	    //下一张图片
		function next(){
			if(!isMoving){
				isMoving = true;
				index++;
				navChange();
				animate(slider,{left:-1200*index},function(){
					if(index===6){
						slider.style.left = "-1200px";
						index=1;
						}
					isMoving = false;
				});
			}
		}
		//上一张图片
		function prev(){
			if(!isMoving){
				isMoving = true
				index--;
				navChange();
				animate(slider,{left:-1200*index},function(){
					if(index===0){
						slider.style.left = "-6000px";
						index=5;
						}
						isMoving = false;
				});
			}
		}
		var timer = setInterval(next,3000);
		//鼠标移入暂停
		box.onmouseover = function(){
			clearInterval(timer);
			animate(left,{opacity:50});
			animate(right,{opacity:50});
		}
		//鼠标移出继续
		box.onmouseout = function(){
			animate(left,{opacity:0});
			animate(right,{opacity:0});
			timer = setInterval(next,3000);
		}
	
		//箭头切换图片
		right.onclick = next;
		left.onclick = prev;
		//小按钮点击事件
		for(var i=0;i<nav.length;i++){
			nav[i].idx = i;
			nav[i].onclick = function(){
				index = ++this.idx;	
				navChange()
				animate(slider,{left:-1200*index})
			}
		}
		//按钮背景色改变
		function navChange(){
				for(var i=0;i<nav.length;i++){
					nav[i].className = '';
				}
				if(index === 6){
					nav[0].className = 'active';
				}
				else if(index ===0){
					nav[4].className = 'active'
				}
				else{
					nav[index-1].className ='active';
				}
		}
		//灰色注意事项
		var wordTimer = setInterval(function(){
			var now = parseInt(getStyle(word,'right'));
			var speed =3;
				word.style.right = now+speed+"px";
				if(now >= 1000){
			 	word.style.right = "-250px";
			 }
			},60);

		word.onload = wordTimer;

		function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}
		function animate(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - now) / 8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var cur = now + speed;
			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			if(json[attr] !== cur){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}
	}, 30)
}