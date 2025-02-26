import{_ as i,o as t,c as n,a,b as e,e as r}from"./app-b83f042f.js";const o={},s=a('<h2 id="为什么要异步i-o" tabindex="-1"><a class="header-anchor" href="#为什么要异步i-o" aria-hidden="true">#</a> 为什么要异步I/O</h2><h3 id="用户体验" tabindex="-1"><a class="header-anchor" href="#用户体验" aria-hidden="true">#</a> 用户体验</h3><p>在浏览器中，js只在单线程上执行，还<strong>与UI渲染公用一个线程</strong>，意味着js在执行的时候UI渲染和响应时处于停滞状态的。如果网页需要获取一个网络资源，通过同步的方式获取，那么js则需要等待资源完全从服务器端获取后才能继续执行忙着期间UI将停顿，不响应用户的交互行为。前端通过异步可以消除UI阻塞现象。</p><p>在服务端，只有快速响应资源，才能让前端的体验更好；数据分布到多台服务器上，分布式将会是常态，异步和同步在性能方面的差异会放大。I/O是昂贵的，分布式I/O更加昂贵</p><h3 id="资源分配" tabindex="-1"><a class="header-anchor" href="#资源分配" aria-hidden="true">#</a> 资源分配</h3><h3 id="单线程" tabindex="-1"><a class="header-anchor" href="#单线程" aria-hidden="true">#</a> <strong>单线程</strong></h3><p><strong>串行</strong>顺序依次执行，<strong>阻塞I/O</strong>导致硬件资源得不到更优使用</p><h3 id="多线程" tabindex="-1"><a class="header-anchor" href="#多线程" aria-hidden="true">#</a> 多线程</h3><p><strong>并行执行</strong>，创建线程和执行线程上下文切换的开销较大；复杂业务中，会面临<strong>死锁，状态同步</strong>问题；但在多核CPU上能有效<strong>提升CPU利用率</strong></p><h3 id="node的解决方案" tabindex="-1"><a class="header-anchor" href="#node的解决方案" aria-hidden="true">#</a> node的解决方案</h3><ul><li>利用<strong>单线程</strong>，远离多线程死锁，状态同步问题</li><li>利用<strong>异步I/O</strong>，远离单线程阻塞，更好地利用CPU</li><li>提供类似前端Web Workers的<strong>子进程</strong>通过<strong>工作进程</strong>高效利用CPU和I/O</li></ul><h2 id="异步i-o实现现状" tabindex="-1"><a class="header-anchor" href="#异步i-o实现现状" aria-hidden="true">#</a> 异步I/O实现现状</h2><h3 id="阻塞i-o" tabindex="-1"><a class="header-anchor" href="#阻塞i-o" aria-hidden="true">#</a> 阻塞I/O</h3><p>应用程序需要等待I/O完成才返回结果</p><p>阻塞I/O会造成CPU等待I/O，浪费等待时间，CPU得不到充分利用</p><h3 id="异步i-o" tabindex="-1"><a class="header-anchor" href="#异步i-o" aria-hidden="true">#</a> 异步I/O</h3><p>调用后立即返回，但完整的<strong>I/O并没有完成</strong></p><p>立即返回的并不是业务层期望的数据，仅仅是<strong>当前的调用状态</strong></p><p>为获取完整数据，需要<strong>重复调用I/O</strong>，来确认是否完成</p><p>让CPU处理状态判断，是对CPU资源的浪费</p><ul><li>read性能低，重复调用来检查I/O状态</li><li>select，在read基础上得到改进，通过对文件描述符上的时间状态判断；但最多同时检查1024长度的数组储存状态</li><li>poll，改进了select，采用链表方式避免数组长度限制，避免不必要的检查，当文件描述符较多时性能还是比较低</li><li>epoll，Linux下效率最高的I/O事件通知机制，在进入轮询的时候如果没有检查到I/O事件，将会进行休眠，直到事件发生将它唤醒；利用事件通知，执行回调，而非遍历查询，不浪费CPU</li><li>类似epoll，只存在FreeBSD</li></ul><p>CPU的时间片可以用来处理其他事务，提高性能</p><h3 id="现实的非阻塞异步i-o" tabindex="-1"><a class="header-anchor" href="#现实的非阻塞异步i-o" aria-hidden="true">#</a> 现实的非阻塞异步I/O</h3><p>线程池与阻塞I/O模拟异步I/O</p><p>Windows：调用异步方法，等待I/O完成后的通知，执行回调，让用户无需考虑轮询</p><p>Node：虽然js在单线程中执行，但是<strong>node是多线程的</strong>，内部完成I/O任务有另外的线程池；可以<strong>实现I/O高并发</strong></p><h2 id="node的异步i-o" tabindex="-1"><a class="header-anchor" href="#node的异步i-o" aria-hidden="true">#</a> node的异步I/O</h2><h3 id="事件循环" tabindex="-1"><a class="header-anchor" href="#事件循环" aria-hidden="true">#</a> 事件循环</h3><p>每执行一次循环称为Tick，这个过程检查是否有事件待处理；有，取出事件及相关回调函数执行；没有，退出进程</p><p>典型的生产者/消费者模型，异步I/O，网络请求等是事件的生产者，将事件传递给观察者；事件循环从观察者中取出事件并处理</p><h3 id="请求对象" tabindex="-1"><a class="header-anchor" href="#请求对象" aria-hidden="true">#</a> 请求对象</h3><p>从js发起调用 到 内核执行完I/O操作的过渡过程中，存在一个中间产物，就是请求对象</p><ol><li>js层面调用C++核心模块</li><li>核心模块调用C++内建模块</li><li>内建模块通过libuv进行系统调用</li><li>libuv作为封装层，有两个平台的实现；</li><li>将对象推入线程池中等待执行</li></ol>',33),h=e("div",{class:"custom-container tip"},[e("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[e("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[e("circle",{cx:"12",cy:"12",r:"9"}),e("path",{d:"M12 8h.01"}),e("path",{d:"M11 12h1v4h1"})])]),e("p",{class:"custom-container-title"},"TIP"),e("p",null,"在线程池中等待执行的I/O操作不管是否阻塞I/O，js线程可以继续执行后续操作")],-1),d=e("h2",{id:"非i-o的异步api",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#非i-o的异步api","aria-hidden":"true"},"#"),r(" 非I/O的异步API")],-1),l=e("p",null,"事件循环对观察者的检查优先级：idle>I/O>check",-1),c=e("h3",{id:"定时器",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#定时器","aria-hidden":"true"},"#"),r(" 定时器")],-1),p=e("blockquote",null,[e("p",null,"宏任务")],-1),u=e("div",{class:"custom-container tip"},[e("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[e("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[e("circle",{cx:"12",cy:"12",r:"9"}),e("path",{d:"M12 8h.01"}),e("path",{d:"M11 12h1v4h1"})])]),e("p",{class:"custom-container-title"},"TIP"),e("p",null,"只能控制何时放入队列中，不能控制何时执行")],-1),g=a('<p>setTimeout</p><p>setInterval</p><h3 id="precess-nexttick" tabindex="-1"><a class="header-anchor" href="#precess-nexttick" aria-hidden="true">#</a> precess.nextTick</h3><blockquote><p>微任务</p><p>idle观察者</p></blockquote><p>比setTimeout轻量，高性能</p><p>只将回调函数放进队列中，下一轮Tick取出执行</p><p>结果保存在一个数组中，每轮循环将数组中的<strong>回调函数全部执行完</strong></p><h3 id="setimmediate" tabindex="-1"><a class="header-anchor" href="#setimmediate" aria-hidden="true">#</a> setImmediate</h3><blockquote><p>check观察者</p></blockquote><p>结果保存在链表中，每轮循环执行链表中的<strong>一个回调函数</strong>，保证每轮循环能够较快执行结束，防止CPU占用过多而阻塞后续I/O调用</p><h2 id="事件驱动与高性能服务器" tabindex="-1"><a class="header-anchor" href="#事件驱动与高性能服务器" aria-hidden="true">#</a> 事件驱动与高性能服务器</h2><h3 id="经典的服务器模型" tabindex="-1"><a class="header-anchor" href="#经典的服务器模型" aria-hidden="true">#</a> 经典的服务器模型</h3><p>同步式：一次只能处理一个请求，其他请求处于等待状态</p><p>每进程/每请求：为每个请求启动一个进程，不具备扩展性，系统资源有限</p><p>每线程/每请求：为每个请求启动一个线程，线程比进程轻量，每个线程占用一定内存，内存用光，会导致服务器缓慢</p><h3 id="node" tabindex="-1"><a class="header-anchor" href="#node" aria-hidden="true">#</a> node</h3><p>事件驱动，<strong>无需为每个请求创建额外的对应线程</strong>，减少创建线程和销毁线程的开销，上下文切换的代价很低</p>',17),x=[s,h,d,l,c,p,u,g];function I(O,_){return t(),n("div",null,x)}const f=i(o,[["render",I],["__file","3.html.vue"]]);export{f as default};
