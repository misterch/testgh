import{_ as t,o as e,c as d,a as r}from"./app-b83f042f.js";const n={},o=r('<p><img src="https://pic1.zhimg.com/v2-04dd7daf9ad4614f64d738b208e190b4_b.jpg" alt=""></p><p><img src="https://pic3.zhimg.com/v2-385838d3bbc781a5c5a64ff8ff66299e_b.jpg" alt=""></p><h2 id="元素偏移量offset" tabindex="-1"><a class="header-anchor" href="#元素偏移量offset" aria-hidden="true">#</a> 元素偏移量offset</h2><ul><li>动态获取该元素的位置，大小</li><li>获取<strong>元素距离父元素的位置</strong>，父元素需要有定位，没有则向上找直到body</li><li>获取元素的宽高（<strong>包含padding，border</strong>），不带单位</li><li>element.offsetParent返回该元素带有定位的父级元素，没有则返回body</li></ul><table><thead><tr><th>属性</th><th>作用</th></tr></thead><tbody><tr><td>offsetTop</td><td>元素相对于父元素的上边界偏移量</td></tr><tr><td>offsetLeft</td><td>元素相对于父元素的左边界偏移量</td></tr></tbody></table><table><thead><tr><th>offset</th><th>style</th></tr></thead><tbody><tr><td>任意样式表中的样式值</td><td>只能得到行内样式表中的样式值</td></tr><tr><td>获取的数值<strong>没有单位</strong></td><td>带有单位的字符串</td></tr><tr><td>宽高包含padding+border+content宽高</td><td><strong>不包含</strong>padding和border</td></tr><tr><td>宽高是<strong>只读</strong>属性</td><td>宽高可读写</td></tr><tr><td>获取大小和位置，offset更合适</td><td>更适合更改元素值</td></tr></tbody></table><h2 id="元素可视区client" tabindex="-1"><a class="header-anchor" href="#元素可视区client" aria-hidden="true">#</a> 元素可视区client</h2><ul><li>获取该元素的边框大小，元素大小，不带单位</li></ul><table><thead><tr><th>属性</th><th>作用</th></tr></thead><tbody><tr><td>element.clientTop</td><td>元素<strong>上边框</strong>大小</td></tr><tr><td>element.clientLeft</td><td>元素<strong>左边框</strong>大小</td></tr><tr><td>element.clientWidth</td><td>元素宽度（padding+content）</td></tr><tr><td>element.clientHeight</td><td>元素高度（padding+content）</td></tr></tbody></table><h2 id="元素滚动scroll" tabindex="-1"><a class="header-anchor" href="#元素滚动scroll" aria-hidden="true">#</a> 元素滚动scroll</h2><ul><li>动态获得该元素的大小、滚动距离等，不带单位</li></ul><table><thead><tr><th>属性</th><th>作用</th></tr></thead><tbody><tr><td>element.scrollTop</td><td>被卷上去的距离（内容顶部到元素上内边框的距离）</td></tr><tr><td>element.scrollLeft</td><td>被卷去的左侧的距离（内容最左侧到元素左内边框的距离）</td></tr><tr><td>element.scrollWidth</td><td>自身实际的宽度（不含边框）</td></tr><tr><td>element.scrollHeight</td><td>自身实际的高度（不含边框）</td></tr></tbody></table><h2 id="元素event事件的client-page-offset-screen" tabindex="-1"><a class="header-anchor" href="#元素event事件的client-page-offset-screen" aria-hidden="true">#</a> 元素event事件的client,page,offset,screen</h2><ul><li>获取鼠标相对于以上几个事件的X,Y的位置</li></ul><table><thead><tr><th>属性</th><th>作用</th></tr></thead><tbody><tr><td>clientX</td><td>鼠标相对于<strong>浏览器窗口可视区</strong>的X偏移量</td></tr><tr><td>clientY</td><td>鼠标相对于浏览器窗口可视区的Y偏移量</td></tr><tr><td>pageX</td><td>鼠标相对于<strong>文档</strong>的X偏移量，与滚动相关，<code>e.pageX=e.clientX+element.scrollLeft</code></td></tr><tr><td>pageY</td><td>鼠标相对于文档的Y偏移量，与滚动相关，<code>e.pageY=e.clientY+element.scrollTop</code></td></tr><tr><td>offsetX</td><td>鼠标相对于<strong>事件源元素</strong>(srcElement)的坐标</td></tr><tr><td>offsetY</td><td>鼠标相对于事件源元素(srcElement)的坐标</td></tr><tr><td>screenX</td><td>鼠标相对于<strong>屏幕</strong>的坐标</td></tr><tr><td>screenY</td><td>鼠标相对于屏幕的坐标</td></tr></tbody></table>',15),l=[o];function a(s,c){return e(),d("div",null,l)}const h=t(n,[["render",a],["__file","window.html.vue"]]);export{h as default};
