(this["webpackJsonpreact-snake"]=this["webpackJsonpreact-snake"]||[]).push([[0],{32:function(e,t,n){e.exports=n(86)},36:function(e,t,n){},37:function(e,t,n){},84:function(e,t,n){},85:function(e,t,n){},86:function(e,t,n){"use strict";n.r(t);var r=n(4),i=n.n(r),a=n(26),o=n.n(a),c=(n(36),function(){return i.a.createElement("header",{className:"main-header"},"React Snake Game")}),l=(n(37),function(){return i.a.createElement("footer",{className:"main-footer"},"Created by Artur Martini - 2020")}),s=n(27),u=n(28),d=n(30),h=n(29),v=n(31),m=n(9),y=(n(84),function(e){function t(){var e,n;Object(s.a)(this,t);for(var r=arguments.length,i=new Array(r),a=0;a<r;a++)i[a]=arguments[a];return(n=Object(d.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(i)))).rects=[],n.rect={},n.rectPoint={},n.active=!0,n.interval=-1,n.timeInterval=1e3,n.state={board:{width:500,height:500,style:{border:"10px solid #9f4acf",borderRadius:"1px",borderColor:"aqua",height:"520px"}},snake:{x:0,y:0,size:50,color:"blue",move:0,direction:3,lost:!1},point:{x:400,y:300,size:50,color:"black"},rects:n.initializeRects()},n.walker=function(){var e=n.state.rects,t=0,r=!1,i={x:e[e.length-1].x,y:e[e.length-1].y,direction:e[e.length-1].direction},a=i.direction;3===i.direction&&(t=i.x+50,(n.isLostMovement(t)||n.isInvalidMovement(t,i.y))&&(r=!0)),4===i.direction&&(t=i.x-50,(n.isLostMovement(t)||n.isInvalidMovement(t,i.y))&&(r=!0)),1===i.direction&&(t=i.y-50,(n.isLostMovement(t)||n.isInvalidMovement(i.x,t))&&(r=!0)),2===i.direction&&(t=i.y+50,(n.isLostMovement(t)||n.isInvalidMovement(i.x,t))&&(r=!0)),r&&(n.active=!1),n.move(e,a),n.setState(n.state.rects)},n.move=function(e,t){var r={x:e[e.length-1].x,y:e[e.length-1].y,direction:e[e.length-1].direction,color:"blue"},i=[];if(e.forEach((function(e){i.push({x:e.x,y:e.y})})),1===t&&(r.y-=50),2===t&&(r.y+=50),3===t&&(r.x+=50),4===t&&(r.x-=50),!n.checkKillPoint(e,r)){if(e.length>1)for(var a=e.length-1;a>0;a--)e[a-1].x=i[a].x,e[a-1].y=i[a].y;e[e.length-1]={x:r.x,y:r.y,direction:r.direction,id:e[e.length-1].id,color:"blue"}}},n.checkKillPoint=function(e,t){var r=n.state.point;if(t.x===r.x&&t.y===r.y){e.push({x:r.x,y:r.y,direction:t.direction,active:!0,color:"blue",size:50,id:"rect:"+e.length});var i=n.getRandomPosition(r);return r.x=i.x,r.y=i.y,clearInterval(n.interval),n.timeInterval=.95*n.timeInterval,n.interval=setInterval(n.walker,n.timeInterval),!0}return!1},n.isLostMovement=function(e){var t=n.state.board.width-n.state.snake.size;return!(e>=0&&e<=t)},n.isInvalidMovement=function(e,t){var r=n.state.rects,i=!1;return r.forEach((function(n){e===n.x&&t===n.y&&(i=!0)})),i},n.getMovement=function(e){var t=n.state.rects,r=0;return"ArrowUp"===e.key&&(r=1),"ArrowDown"===e.key&&(r=2),"ArrowLeft"===e.key&&(r=4),"ArrowRight"===e.key&&(r=3),t[t.length-1].direction=r,t},n.getRandomPosition=function(e){for(var t=!0,r=0,i=0;t;)r=50*(Math.floor(10*Math.random())+0),i=50*(Math.floor(10*Math.random())+0),n.state.rects.forEach((function(e){r!==e.x&&i!==e.y&&(t=!1)})),t=r===e.x||i===e.y;return{x:r,y:i}},n}return Object(v.a)(t,e),Object(u.a)(t,[{key:"initializeRects",value:function(){return Array.from({length:1}).map((function(e,t){return{x:0,y:0,active:!0,id:"rect:0",direction:3,size:50,color:"blue",lost:!1}}))}},{key:"componentDidMount",value:function(){window.addEventListener("keyup",this.getMovement),this.interval=setInterval(this.walker,this.timeInterval)}},{key:"render",value:function(){var e=this,t=this.state,n=t.point,r=t.board,a=t.rects;return!0===this.active?i.a.createElement("div",{className:"board"},i.a.createElement(m.Stage,{width:r.width,height:r.height,style:r.style},i.a.createElement(m.Layer,null,a.map((function(t){return i.a.createElement(m.Rect,{ref:function(t){return e.rects[a.length-1]=t},key:"".concat(t.id),x:t.x,y:t.y,width:50,height:50,fill:"blue",shadowBlur:5})})),i.a.createElement(m.Rect,{ref:function(t){return e.rectPoint=t},x:n.x,y:n.y,width:n.size,height:n.size,fill:n.color,shadowBlur:5,name:"point"})))):i.a.createElement("div",{className:"board"},i.a.createElement("p",{style:{fontSize:100}},"YOU LOST!"))}}]),t}(r.Component));var f=function(){return i.a.createElement("div",{className:"App"},i.a.createElement(c,null),i.a.createElement(y,null),i.a.createElement(l,null))};n(85);o.a.render(i.a.createElement(f,null),document.getElementById("root"))}},[[32,1,2]]]);
//# sourceMappingURL=main.4e295021.chunk.js.map