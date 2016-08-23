/*
 * 名称：移动端手势/fingersEvent
 * 作者：djl
 * 邮箱：474569696@qq.com
 * 日期：2016/7/22
 * new fingersEvent({
 *	"Elements":document.getElementById("img"),//动画dom
 *	"Scale":function(scale){//放大缩小
 *	},
 *	"Rolate":function(rolatedegree){//旋转
 *	},
 *	"ScaleRolate":function(){//放大缩小旋转
 *				
 *	},
 *	"UDLR":function(direction,len){//方向+移动距离
 *		alert(direction+"--"+len)
 *	},
 * "UDLRone":function(direction){//滑动结束后执行,方向+移动距离
 *		alert(direction)
 *	},
 *	"Rolateorigin":"center center",//旋转原点
 *	"touchLS":{//长按短按，设置时间即可
 *		"timeout":100,
 *		"touchLSfn":function(els){
 *			alert(els)
 *		}
 *	}
 *
 *});
 */
function fingersEvent(obj){
	this.touchXPointAarr=[[],[]],
	this.touchYPointAarr=[[],[]],
	this.RolateFnname=obj['Rolate'],
	this.ScaleFnname=obj['Scale'],
	this.ScaleRolateFnname=obj['ScaleRolate'],
	this.ElementsEl=obj['Elements'],
	this.Rolateorigin=obj['Rolateorigin'],
	this.UDLRdirection=obj['UDLR'],
	this.touchLS=obj['touchLS'],
	this.UDLRoneFnname=obj['UDLRone'],
	this.directions="",
	this.init();
}
fingersEvent.prototype={
	"init":function(){
		var _this=this;
		var els=this.ElementsEl;
		if (navigator.userAgent.toLowerCase().match(/.(msie)/)!=null) {
		   var flag=false;
		   var startx=0;
		   var starty=0;
			els.onmousedown=function(e){
				flag=true;
				startx=e.pageX;
				starty=e.pageY;
			}
			els.onmouseup=function(e){
				if(flag)
				{
					var xlength=e.pageX-startx;
					var ylength=e.pageY-starty;
					if(Math.abs(xlength)-Math.abs(ylength)>0){
						//x方向
						if(xlength>0){
							//右
							_this.directions="right";
							if(typeof _this.UDLRdirection==="function" ){
					     		_this.UDLRdirection("right",xlength)
					     	}
							
						}
						else
						{//左
							_this.directions="left"
							if(typeof _this.UDLRdirection==="function" ){
					     		_this.UDLRdirection("left",xlength)
					     	}
						}
						if(typeof _this.UDLRoneFnname==="function"){
							_this.UDLRoneFnname(_this.directions)
							_this.directions=""
						}
					}
					else
					{
						//y方向
						if(ylength>0){
							//下
							_this.directions="down";
							if(typeof _this.UDLRdirection==="function" ){
					     		_this.UDLRdirection("down",ylength)
					     	}
						}
						else
						{//上
							_this.directions="top";
							if(typeof _this.UDLRdirection==="function" ){
					     		_this.UDLRdirection("top",ylength)
					     	}
						}
						if(typeof _this.UDLRoneFnname==="function"){
							_this.UDLRoneFnname(_this.directions)
							_this.directions=""
						}
					}
				}
				flag=false;
				
			}
			
			
			
		}
		else
		{
			els.addEventListener("touchstart",function(){
				_this.touchStart()
			},false)
			els.addEventListener("touchmove",function(){
				_this.touchMove()
			},false)
			els.addEventListener("touchend",function(){
				_this.touchEnd()
			},false)
		}
		
		
	},
	"touchStart":function(){
		event=window.event||e;
		//阻止网页默认动作（即网页滚动）
	   event.preventDefault();
	    var _this=this;
	    if(this.touchLS){
	    	 setTimeout(function(event){
		    	_this.touchLS['touchLSfn'](_this.ElementsEl);
		    },_this.touchLS['timeout']);
	    }
	    touchXPoint= Number(event.targetTouches[0].pageX); //页面触点X坐标
	    touchYPoint = Number(event.targetTouches[0].pageY); //页面触点Y坐标
	    this.touchXPointAarr=[[],[]],this.touchYPointAarr=[[],[]];
	    this.touchXPointAarr[0].push(parseInt(event.touches[0].pageX));
	    this.touchYPointAarr[0].push(parseInt(event.touches[0].pageY));
	    this.fingerPosition=[];
	    if(event.touches[0].pageX){
	    	this.touchXPointAarr[1].push(parseInt(event.touches[1].pageX));
		    this.touchYPointAarr[1].push(parseInt(event.touches[1].pageY));
		    var x = 0, y = 0;
		    for (var i = 0; i < event.touches.length; i++) {
		        x += event.touches[i].clientX;
		        y += event.touches[i].clientY;
		    }
		    var fingercenterx=Math.round(x / event.touches.length);
		    var fingercentery=Math.round(y / event.touches.length);
		    this.fingerPosition[0]=fingercenterx;
		    this.fingerPosition[1]=fingercentery;
	    }
	    
	},
	"touchMove":function(e){
		event=window.event||e;
		event.preventDefault();
	    if(event.touches.length==1){
	    	var x = Number(event.targetTouches[0].pageX); //页面触点X坐标
			var y = Number(event.targetTouches[0].pageY); //页面触点Y坐标
		     var thisval,ylength,xlength;
		     ylength=y-touchYPoint;
		     xlength=x-touchXPoint;
		     if(Math.abs(ylength)>Math.abs(xlength)){
		     	if(ylength>=0){
			     	thisval=1;
			     	if(typeof this.UDLRdirection==="function" ){
			     		this.UDLRdirection("down",ylength)
			     	}
			     	this.directions="down";
			     	
			     }else{
			     	thisval=-1;
			     	if(typeof this.UDLRdirection==="function" ){
			     		this.UDLRdirection("up",ylength)
			     	}
			     	
			     	this.directions="up";
			     }
			    
			     //alert(thisval+"-1up1down")
		     }else{
		     	if(xlength>=0){
			     	thisval=1;
			     	if(typeof this.UDLRdirection==="function" ){
			     		this.UDLRdirection("right",xlength)
			     	}
			     	this.directions="right";
			     }else{
			     	thisval=-1;
			     	if(typeof this.UDLRdirection==="function" ){
			     		this.UDLRdirection("left",xlength)
			     	}
			     	this.directions="left";
			     }
			     //alert(thisval+"-1left1right")
		     }
	    }
	    else{
	    	//多手指按两个手指计算，主要是放大缩小功能以及旋转功能
		   //放大缩小
		   if(typeof this.ScaleFnname==="function"){
				//通过计算开始时间点和结束时间点两点手势前后的距离比较得出放大缩小
				var initx=Math.abs(this.touchXPointAarr[1][0]-this.touchXPointAarr[0][0]);
				var inity=Math.abs(this.touchYPointAarr[1][0]-this.touchYPointAarr[0][0]);
				var initlen=Math.sqrt(Math.pow(initx,2)+Math.pow(inity,2));
				var endx=Math.abs(parseInt(event.touches[1].pageX)-parseInt(event.touches[0].pageX));
				var endy=Math.abs(parseInt(event.touches[1].pageY)-parseInt(event.touches[0].pageY));
				var endlen=Math.sqrt(Math.pow(endx,2)+Math.pow(endy,2));
				if(initlen-endlen>0){
					this.ElementsEl.style.transform="scale("+endlen/initlen+")";
					this.ScaleFnname(endlen/initlen);//缩小	
				}
				else{
					this.ElementsEl.style.transform="scale("+endlen/initlen+")";
					this.ScaleFnname(endlen/initlen);//放大	
				}
			}
		   //旋转
		   if(typeof this.RolateFnname==="function"){
		   		var rxlen=parseInt(event.touches[1].pageX)-this.fingerPosition[0];
				var rylen=parseInt(event.touches[1].pageY)-this.fingerPosition[1];
			    var starttanval=Math.atan2(rylen,rxlen)//0.785=pi/4=45度
			    var startangle=parseInt(180*starttanval/Math.PI);
			    this.ElementsEl.setAttribute("rolateval",0);
			    this.ElementsEl.setAttribute("rolateval",startangle);
			    if(this.Rolateorigin){
			    	this.ElementsEl.style.transformOrigin=this.Rolateorigin;
			    }
			    else{
			    	this.ElementsEl.style.transformOrigin="center center";
			    }
			    this.ElementsEl.style.transform="rotate("+(parseInt(this.ElementsEl.getAttribute("rolateval"))+startangle)+"deg)"
			    this.RolateFnname(startangle);
			}
		   //放大，旋转
		   if(typeof this.ScaleRolateFnname==="function"){
		   		var initx=Math.abs(this.touchXPointAarr[1][0]-this.touchXPointAarr[0][0]);
				var inity=Math.abs(this.touchYPointAarr[1][0]-this.touchYPointAarr[0][0]);
				var initlen=Math.sqrt(Math.pow(initx,2)+Math.pow(inity,2));
				var endx=Math.abs(parseInt(event.touches[1].pageX)-parseInt(event.touches[0].pageX));
				var endy=Math.abs(parseInt(event.touches[1].pageY)-parseInt(event.touches[0].pageY));
				var endlen=Math.sqrt(Math.pow(endx,2)+Math.pow(endy,2));
				
				var rxlen=parseInt(event.touches[1].pageX)-this.fingerPosition[0];
				var rylen=parseInt(event.touches[1].pageY)-this.fingerPosition[1];
			    var starttanval=Math.atan2(rylen,rxlen)//0.785=pi/4=45度
			    var startangle=parseInt(180*starttanval/Math.PI);
			    
			    this.ElementsEl.setAttribute("rolateval",0);
			    this.ElementsEl.setAttribute("rolateval",startangle);
			    if(this.Rolateorigin){
			    	this.ElementsEl.style.transformOrigin=this.Rolateorigin;
			    }
			    else{
			    	this.ElementsEl.style.transformOrigin="center center";
			    }
			    this.ElementsEl.style.transform="scale("+endlen/initlen+") rotate("+(parseInt(this.ElementsEl.getAttribute("rolateval"))+startangle)+"deg)"
			    this.ScaleRolate(endlen/initlen,startangle);
		   }
		  
	    }
	},
	"touchEnd":function(){
		
		event=window.event||e;
		//event.preventDefault();
		this.touchXPointAarr=[];
		this.touchYPointAarr=[];
		this.fingerPosition=[];
		if(typeof this.UDLRoneFnname==="function"&&this.directions!=""){
			this.UDLRoneFnname(this.directions)
		}
		this.directions=""
	}
}