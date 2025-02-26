import{_ as n,o as s,c as a,a as p}from"./app-b83f042f.js";const t="/assets/20210618154556-8c96c055.png",e="/assets/20210618155145-03aba197.png",o="/assets/20210618160538-9b1cfb58.png",c="/assets/20210618161125-cdbb2a85.png",l="/assets/20210621103501-072a4903.png",i={},u=p('<h2 id="promise规范" tabindex="-1"><a class="header-anchor" href="#promise规范" aria-hidden="true">#</a> Promise规范</h2><p>Promise A+ 规定：</p><ol><li><p>所有的异步场景，都可以看作是一个异步任务，每个异步任务，在JS中应该表现为一个<strong>对象</strong>，该对象称之为<strong>Promise对象</strong>，也叫做任务对象</p><img src="'+t+'" alt="image-20210618154556558" style="zoom:50%;"><p>根据常理，它们之间存在以下逻辑：</p><ul><li>任务总是从未决阶段变到已决阶段，无法逆行</li><li>任务总是从挂起状态变到完成或失败状态，无法逆行</li><li>时间不能倒流，历史不可改写，任务一旦完成或失败，状态就固定下来，永远无法改变</li></ul></li><li><p>每个任务对象，都应该有两个阶段、三个状态</p><img src="'+e+'" alt="image-20210618155145355" style="zoom:50%;"></li><li><p><code>挂起-&gt;完成</code>，称之为<code>resolve</code>；<code>挂起-&gt;失败</code>称之为<code>reject</code>。任务完成时，可能有一个相关数据；任务失败时，可能有一个失败原因。</p><img src="'+o+'" style="zoom:50%;"></li><li><p>可以针对任务进行后续处理，针对完成状态的后续处理称之为onFulfilled，针对失败的后续处理称之为onRejected</p><img src="'+c+'" style="zoom:50%;"></li></ol><h2 id="链式调用" tabindex="-1"><a class="header-anchor" href="#链式调用" aria-hidden="true">#</a> 链式调用</h2><img src="'+l+`"><ol><li><p>then方法必定会返回一个新的Promise</p><p>可理解为后续处理也是一个任务</p></li><li><p>新任务的状态取决于后续处理：</p><ul><li><p>若没有相关的后续处理，新任务的状态和前任务一致，数据为前任务的数据</p></li><li><p>若有后续处理但还未执行，新任务挂起。</p></li><li><p>若后续处理执行了，则根据后续处理的情况确定新任务的状态</p><ul><li>后续处理执行无错，新任务的状态为完成，数据为后续处理的返回值</li><li>后续处理执行有错，新任务的状态为失败，数据为异常对象</li><li>后续执行后返回的是一个任务对象，新任务的状态和数据与该任务对象一致</li></ul></li></ul></li></ol><h2 id="实现promise核心部分" tabindex="-1"><a class="header-anchor" href="#实现promise核心部分" aria-hidden="true">#</a> 实现Promise核心部分</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token constant">PENDING</span> <span class="token operator">=</span> <span class="token string">&#39;pending&#39;</span>
<span class="token keyword">const</span> <span class="token constant">FULLFILLED</span> <span class="token operator">=</span> <span class="token string">&#39;fullfilled&#39;</span>
<span class="token keyword">const</span> <span class="token constant">REJECTED</span> <span class="token operator">=</span> <span class="token string">&#39;rejected&#39;</span>
<span class="token doc-comment comment">/**
 * 执行一个微任务
 * <span class="token keyword">@description</span> 兼容浏览器端和Node端
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>Function<span class="token punctuation">}</span></span> <span class="token parameter">task</span> 
 */</span>
<span class="token keyword">function</span> <span class="token function">runMicroTask</span><span class="token punctuation">(</span><span class="token parameter">task</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span>process <span class="token operator">&amp;&amp;</span> process<span class="token punctuation">.</span>nextTick<span class="token punctuation">)</span><span class="token punctuation">{</span>
    process<span class="token punctuation">.</span><span class="token function">nextTick</span><span class="token punctuation">(</span>task<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>MutationObserver<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">const</span> observer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MutationObserver</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
      <span class="token function">task</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> div <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">)</span>
    observer<span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span>div<span class="token punctuation">,</span><span class="token punctuation">{</span><span class="token string-property property">&quot;childList&quot;</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    div<span class="token punctuation">.</span>innerText <span class="token operator">=</span> <span class="token string">&#39;1&#39;</span>
  <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span>task<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">isPromise</span><span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token operator">!</span><span class="token operator">!</span><span class="token punctuation">(</span>obj <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> obj <span class="token operator">===</span> <span class="token string">&#39;object&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> obj<span class="token punctuation">.</span>then <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">MyPromise</span><span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">execute</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_value <span class="token operator">=</span> <span class="token keyword">undefined</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_state <span class="token operator">=</span> <span class="token constant">PENDING</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_handlers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token function">execute</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_resolve</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_reject</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token doc-comment comment">/**
   * 修改状态并设置结果，一旦确定了状态不为pending，不能再改变
   * 修改状态后，执行任务队列
   * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">}</span></span> <span class="token parameter">data</span> 
   * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>PENDING <span class="token operator">|</span> FULLFILLED <span class="token operator">|</span> REJECTED<span class="token punctuation">}</span></span> <span class="token parameter">state</span> 
   * <span class="token keyword">@returns</span> 
   */</span>
  <span class="token function">changeState</span><span class="token punctuation">(</span><span class="token parameter">data<span class="token punctuation">,</span>state</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_state <span class="token operator">!==</span> <span class="token constant">PENDING</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_value <span class="token operator">=</span> data
    <span class="token keyword">this</span><span class="token punctuation">.</span>_state <span class="token operator">=</span> state
    <span class="token comment">// 状态变化，执行队列</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_runHandlers</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token doc-comment comment">/**
   * 当前任务完成
   * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">}</span></span> <span class="token parameter">data</span> 
   */</span>
  <span class="token function">_resolve</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">changeState</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span><span class="token constant">FULLFILLED</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token doc-comment comment">/**
   * 当前任务失败
   * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">}</span></span> <span class="token parameter">reason</span> 
   */</span>
  <span class="token function">_reject</span><span class="token punctuation">(</span><span class="token parameter">reason</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">changeState</span><span class="token punctuation">(</span>reason<span class="token punctuation">,</span><span class="token constant">REJECTED</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token doc-comment comment">/**
   * 
   * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>Function<span class="token punctuation">}</span></span> <span class="token parameter">onFullfilled</span> 任务成功后的回调
   * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>Function<span class="token punctuation">}</span></span> <span class="token parameter">onRejected</span> 任务失败后的回调
   * <span class="token keyword">@returns</span> <span class="token class-name"><span class="token punctuation">{</span>Promise<span class="token punctuation">}</span></span> Promise 返回一个promise对象
   */</span>
  <span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">onFullfilled<span class="token punctuation">,</span>onRejected</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">MyPromise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span><span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_pushToQueue</span><span class="token punctuation">(</span>onFullfilled<span class="token punctuation">,</span><span class="token constant">FULLFILLED</span><span class="token punctuation">,</span>resolve<span class="token punctuation">,</span>reject<span class="token punctuation">)</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_pushToQueue</span><span class="token punctuation">(</span>onRejected<span class="token punctuation">,</span><span class="token constant">REJECTED</span><span class="token punctuation">,</span>resolve<span class="token punctuation">,</span>reject<span class="token punctuation">)</span>
      <span class="token comment">// 调用then时，状态已经确定，执行队列</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_runHandlers</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token doc-comment comment">/**
   * 将所有处理任务加入到任务队列等待resolve后执行
   * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">}</span></span> <span class="token parameter">executor</span> then函数传递的参数，是一个函数，函数有一个参数
   * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">}</span></span> <span class="token parameter">state</span> 成功或失败的状态
   * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">}</span></span> <span class="token parameter">resolve</span> 成功状态返回任务结果，作为executor的参数传入
   * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">}</span></span> <span class="token parameter">reject</span> 失败状态返回错误信息，作为executor的参数传入
   */</span>
  <span class="token function">_pushToQueue</span><span class="token punctuation">(</span><span class="token parameter">executor<span class="token punctuation">,</span>state<span class="token punctuation">,</span>resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_handlers<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      executor<span class="token punctuation">,</span>
      state<span class="token punctuation">,</span>
      resolve<span class="token punctuation">,</span>
      reject
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token doc-comment comment">/**
   * 执行任务队列，执行一个，从队列中删除一个，避免重复执行
   * 当调用了resolve后立即执行任务队列，如果state为PENDING则什么都不做
   * 当调用了then函数时，会再次执行任务队列
   */</span>
  <span class="token function">_runHandlers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_state <span class="token operator">===</span> <span class="token constant">PENDING</span><span class="token punctuation">)</span> <span class="token keyword">return</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_handlers<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_runOneHandler</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_handlers<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token doc-comment comment">/**
   * 将任务加入到微任务中执行
   * 将handler展开，为了避免this的指向问题，展开后，this始终指向mypromise对象
   * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">}</span></span> <span class="token parameter">handler</span> 
   */</span>
  <span class="token function">_runOneHandler</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span>executor<span class="token punctuation">,</span>state<span class="token punctuation">,</span>resolve<span class="token punctuation">,</span>reject<span class="token punctuation">}</span></span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">runMicroTask</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span>state<span class="token operator">!==</span><span class="token keyword">this</span><span class="token punctuation">.</span>_state<span class="token punctuation">)</span> <span class="token keyword">return</span>
      <span class="token comment">// 1.没有后续处理，新任务的状态和前任务一致</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> executor <span class="token operator">!==</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>_state<span class="token operator">===</span><span class="token constant">FULLFILLED</span>
        <span class="token operator">?</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_value<span class="token punctuation">)</span>
        <span class="token operator">:</span><span class="token function">reject</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_value<span class="token punctuation">)</span>
        <span class="token keyword">return</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token comment">// 2.后续处理是无错的，可能是普通对象或者是一个promise对象</span>
        <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token function">executor</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_value<span class="token punctuation">)</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">isPromise</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
          <span class="token comment">// 2.1 是一个promise对象，新任务的状态和数据与该promise任务对象一致</span>
          result<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span>reject<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
          <span class="token comment">// 2.2 有普通对象，则新任务的状态为完成，数据和后续一致</span>
          <span class="token function">resolve</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>  
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 3.有后续处理，后续处理是有错的，则新任务的状态为失败，数据是异常</span>
        <span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyPromise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;success&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">1000</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> p2 <span class="token operator">=</span> p<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token constant">A2</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;p成功&#39;</span><span class="token punctuation">,</span>res<span class="token punctuation">)</span>
  <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span><span class="token string">&#39;p2执行错误&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token keyword">function</span> <span class="token constant">B2</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;p失败&#39;</span><span class="token punctuation">,</span>err<span class="token punctuation">)</span>
  <span class="token keyword">throw</span> <span class="token string">&#39;p的错误&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> p3 <span class="token operator">=</span> p2<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token constant">A3</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;p2成功&#39;</span><span class="token punctuation">,</span>res<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token keyword">function</span> <span class="token constant">B3</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;p2失败&#39;</span><span class="token punctuation">,</span>err<span class="token punctuation">)</span>
  <span class="token keyword">throw</span> <span class="token string">&#39;error 3&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
p3<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p2<span class="token punctuation">)</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p3<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">1500</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p><code>then</code>函数是把then的回调函数加入到队列中（微队列），等待<strong>状态</strong>确定为settled（fulfilled、rejected）状态，才会执行</p><p>多次调用<code>then</code>函数传入回调函数，会将回调函数加入到队列中，等待状态确定，一次执行队列的所有回调函数</p><p>在状态变为确认状态或者调用then函数，都会触发执行队列</p><p><code>then</code>的回调函数如果不是一个函数，则状态与前一个<code>then</code>的状态保持一致</p>`,13),k=[u];function r(d,v){return s(),a("div",null,k)}const b=n(i,[["render",r],["__file","promise.html.vue"]]);export{b as default};
