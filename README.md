# phoneFinger
/*本插件为移动端手势插件：
 *1.支持上下左右方向的移动；
 *2.支持放大缩小
 *3.支持旋转
 *调用方法：
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
 *备注：如有疑问，请邮件联系
 */

