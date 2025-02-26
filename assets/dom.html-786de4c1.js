import{_ as l,r as o,o as i,c as r,d as a,w as e,a as p,b as n,e as s}from"./app-b83f042f.js";const u={},d=p(`<h3 id="动态引入js" tabindex="-1"><a class="header-anchor" href="#动态引入js" aria-hidden="true">#</a> 动态引入js</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">injectScript</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">src</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> s <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;script&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    s<span class="token punctuation">.</span>type <span class="token operator">=</span> <span class="token string">&#39;text/javascript&#39;</span><span class="token punctuation">;</span>
    s<span class="token punctuation">.</span>async <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    s<span class="token punctuation">.</span>src <span class="token operator">=</span> src<span class="token punctuation">;</span>
    <span class="token keyword">const</span> t <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementsByTagName</span><span class="token punctuation">(</span><span class="token string">&#39;script&#39;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    t<span class="token punctuation">.</span>parentNode<span class="token punctuation">.</span><span class="token function">insertBefore</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> t<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="el是否包含某个class" tabindex="-1"><a class="header-anchor" href="#el是否包含某个class" aria-hidden="true">#</a> el是否包含某个class</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export const hasClass = (el, className) =&gt; {
    let reg = new RegExp(&#39;(^|\\\\s)&#39; + className + &#39;(\\\\s|$)&#39;)
    return reg.test(el.className)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="el添加某个class" tabindex="-1"><a class="header-anchor" href="#el添加某个class" aria-hidden="true">#</a> el添加某个class</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export const addClass = (el, className) =&gt; {
    if (hasClass(el, className)) {
        return
    }
    let newClass = el.className.split(&#39; &#39;)
    newClass.push(className)
    el.className = newClass.join(&#39; &#39;)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="el去除某个class" tabindex="-1"><a class="header-anchor" href="#el去除某个class" aria-hidden="true">#</a> el去除某个class</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export const removeClass = (el, className) =&gt; {
    if (!hasClass(el, className)) {
        return
    }
    let reg = new RegExp(&#39;(^|\\\\s)&#39; + className + &#39;(\\\\s|$)&#39;, &#39;g&#39;)
    el.className = el.className.replace(reg, &#39; &#39;)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="获取滚动的坐标" tabindex="-1"><a class="header-anchor" href="#获取滚动的坐标" aria-hidden="true">#</a> 获取滚动的坐标</h3><div class="language-JS line-numbers-mode" data-ext="JS"><pre class="language-JS"><code>export const getScrollPosition = (el = window) =&gt; ({
    x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
    y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="el是否在视口范围内" tabindex="-1"><a class="header-anchor" href="#el是否在视口范围内" aria-hidden="true">#</a> el是否在视口范围内</h3>`,11),k=n("div",{class:"language-javascript line-numbers-mode","data-ext":"js"},[n("pre",{class:"language-javascript"},[n("code",null,[n("span",{class:"token keyword"},"const"),s(),n("span",{class:"token literal-property property"},"vEntry"),n("span",{class:"token operator"},":"),s("Directive"),n("span",{class:"token operator"},"<"),s("HTMLImageElement"),n("span",{class:"token punctuation"},","),s("string"),n("span",{class:"token operator"},">"),s(),n("span",{class:"token operator"},"="),s(),n("span",{class:"token keyword"},"async"),s(),n("span",{class:"token keyword"},"function"),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},[s("el"),n("span",{class:"token punctuation"},","),s("binding")]),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token keyword"},"const"),s(" defaultImg "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token keyword"},"await"),s(),n("span",{class:"token keyword"},"import"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},"'../../public/vite.svg'"),n("span",{class:"token punctuation"},")"),s(`
  el`),n("span",{class:"token punctuation"},"."),s("src "),n("span",{class:"token operator"},"="),s(" defaultImg"),n("span",{class:"token punctuation"},"."),s(`default
  `),n("span",{class:"token comment"},"// 重点：使用IntersectionObserver"),s(`
  `),n("span",{class:"token keyword"},"const"),s(" observer "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token keyword"},"new"),s(),n("span",{class:"token class-name"},"IntersectionObserver"),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},"entry"),n("span",{class:"token operator"},"=>"),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token keyword"},"if"),n("span",{class:"token punctuation"},"("),s("entry"),n("span",{class:"token punctuation"},"["),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},"."),s("intersectionRatio"),n("span",{class:"token operator"},">"),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"{"),s(`
      console`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"log"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},"'show'"),n("span",{class:"token punctuation"},")"),s(`
      `),n("span",{class:"token function"},"setTimeout"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token punctuation"},"{"),s(`
        el`),n("span",{class:"token punctuation"},"."),s("src "),n("span",{class:"token operator"},"="),s(" binding"),n("span",{class:"token punctuation"},"."),s(`value
      `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token number"},"2000"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
      observer`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"unobserve"),n("span",{class:"token punctuation"},"("),s("el"),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`
  observer`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"observe"),n("span",{class:"token punctuation"},"("),s("el"),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),v=n("div",{class:"language-javascript line-numbers-mode","data-ext":"js"},[n("pre",{class:"language-javascript"},[n("code",null,[n("span",{class:"token keyword"},"export"),s(),n("span",{class:"token keyword"},"const"),s(),n("span",{class:"token function-variable function"},"elementIsVisibleInViewport"),s(),n("span",{class:"token operator"},"="),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},[s("el"),n("span",{class:"token punctuation"},","),s(" partiallyVisible "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token boolean"},"false")]),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token keyword"},"const"),s(),n("span",{class:"token punctuation"},"{"),s(" top"),n("span",{class:"token punctuation"},","),s(" left"),n("span",{class:"token punctuation"},","),s(" bottom"),n("span",{class:"token punctuation"},","),s(" right "),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token operator"},"="),s(" el"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"getBoundingClientRect"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token keyword"},"const"),s(),n("span",{class:"token punctuation"},"{"),s(" innerHeight"),n("span",{class:"token punctuation"},","),s(" innerWidth "),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token operator"},"="),s(" window"),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token keyword"},"return"),s(` partiallyVisible
        `),n("span",{class:"token operator"},"?"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"("),s("top "),n("span",{class:"token operator"},">"),s(),n("span",{class:"token number"},"0"),s(),n("span",{class:"token operator"},"&&"),s(" top "),n("span",{class:"token operator"},"<"),s(" innerHeight"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"||"),s(),n("span",{class:"token punctuation"},"("),s("bottom "),n("span",{class:"token operator"},">"),s(),n("span",{class:"token number"},"0"),s(),n("span",{class:"token operator"},"&&"),s(" bottom "),n("span",{class:"token operator"},"<"),s(" innerHeight"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"&&"),s(`
        `),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"("),s("left "),n("span",{class:"token operator"},">"),s(),n("span",{class:"token number"},"0"),s(),n("span",{class:"token operator"},"&&"),s(" left "),n("span",{class:"token operator"},"<"),s(" innerWidth"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"||"),s(),n("span",{class:"token punctuation"},"("),s("right "),n("span",{class:"token operator"},">"),s(),n("span",{class:"token number"},"0"),s(),n("span",{class:"token operator"},"&&"),s(" right "),n("span",{class:"token operator"},"<"),s(" innerWidth"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),s(`
        `),n("span",{class:"token operator"},":"),s(" top "),n("span",{class:"token operator"},">="),s(),n("span",{class:"token number"},"0"),s(),n("span",{class:"token operator"},"&&"),s(" left "),n("span",{class:"token operator"},">="),s(),n("span",{class:"token number"},"0"),s(),n("span",{class:"token operator"},"&&"),s(" bottom "),n("span",{class:"token operator"},"<="),s(" innerHeight "),n("span",{class:"token operator"},"&&"),s(" right "),n("span",{class:"token operator"},"<="),s(" innerWidth"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),m=p(`<h3 id="检测用户是否处于暗模式" tabindex="-1"><a class="header-anchor" href="#检测用户是否处于暗模式" aria-hidden="true">#</a> 检测用户是否处于暗模式</h3><p>使用以下代码检查用户的设备是否处于暗模式。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> isDarkMode <span class="token operator">=</span> window<span class="token punctuation">.</span>matchMedia <span class="token operator">&amp;&amp;</span> window<span class="token punctuation">.</span><span class="token function">matchMedia</span><span class="token punctuation">(</span><span class="token string">&#39;(prefers-color-scheme: dark)&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>matches

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>isDarkMode<span class="token punctuation">)</span> <span class="token comment">// Result: True or False</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="获取用户选定的文本" tabindex="-1"><a class="header-anchor" href="#获取用户选定的文本" aria-hidden="true">#</a> 获取用户选定的文本</h3><p>使用内置 getSelection 属性获取用户选择的文本。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">getSelectedText</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> window<span class="token punctuation">.</span><span class="token function">getSelection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">getSelectedText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="重新加载当前页面" tabindex="-1"><a class="header-anchor" href="#重新加载当前页面" aria-hidden="true">#</a> 重新加载当前页面</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">reload</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> location<span class="token punctuation">.</span><span class="token function">reload</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">reload</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="回到顶部" tabindex="-1"><a class="header-anchor" href="#回到顶部" aria-hidden="true">#</a> 回到顶部</h3><p>使用 window.scrollTo(0, 0) 方法自动回到顶部。将 x 和 y 都设置为 0。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">goToTop</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> window<span class="token punctuation">.</span><span class="token function">scrollTo</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">goToTop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="元素顺滑滚动" tabindex="-1"><a class="header-anchor" href="#元素顺滑滚动" aria-hidden="true">#</a> 元素顺滑滚动</h3><p>如果你希望将一个元素顺滑的滚动到可视区域的起点</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">scrollToTop</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">element</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> element<span class="token punctuation">.</span><span class="token function">scrollIntoView</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">behavior</span><span class="token operator">:</span> <span class="token string">&quot;smooth&quot;</span><span class="token punctuation">,</span> <span class="token literal-property property">block</span><span class="token operator">:</span> <span class="token string">&quot;start&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token function">scrollToTop</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span>body<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你希望将一个元素顺滑的滚动到可视区域的终点</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">scrollToBottom</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">element</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> element<span class="token punctuation">.</span><span class="token function">scrollIntoView</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">behavior</span><span class="token operator">:</span> <span class="token string">&quot;smooth&quot;</span><span class="token punctuation">,</span> <span class="token literal-property property">block</span><span class="token operator">:</span> <span class="token string">&quot;end&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token function">scrollToBottom</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span>body<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="检查当前是否ie浏览器" tabindex="-1"><a class="header-anchor" href="#检查当前是否ie浏览器" aria-hidden="true">#</a> 检查当前是否IE浏览器</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> isIE <span class="token operator">=</span> <span class="token operator">!</span><span class="token operator">!</span>document<span class="token punctuation">.</span>documentMode<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="从给定文本中剥离html" tabindex="-1"><a class="header-anchor" href="#从给定文本中剥离html" aria-hidden="true">#</a> 从给定文本中剥离html</h3><p>当你需要在某个文本中将里面的标签全部过滤掉</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">stripHtml</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">html</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">new</span> <span class="token class-name">DOMParser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">parseFromString</span><span class="token punctuation">(</span>html<span class="token punctuation">,</span> <span class="token string">&#39;text/html&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>body<span class="token punctuation">.</span>textContent <span class="token operator">||</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
<span class="token function">stripHtml</span><span class="token punctuation">(</span><span class="token string">&#39;&lt;div&gt;test&lt;/div&gt;&#39;</span><span class="token punctuation">)</span> <span class="token comment">// &#39;test&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="重定向" tabindex="-1"><a class="header-anchor" href="#重定向" aria-hidden="true">#</a> 重定向</h3><p>当你需要跳转到其他页面</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">goTo</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">url</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span>location<span class="token punctuation">.</span>href <span class="token operator">=</span> url<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="文本粘贴" tabindex="-1"><a class="header-anchor" href="#文本粘贴" aria-hidden="true">#</a> 文本粘贴</h3><p>当你需要复制文本到粘贴板上</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">copy</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">text</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> navigator<span class="token punctuation">.</span>clipboard<span class="token operator">?.</span>writeText <span class="token operator">&amp;&amp;</span> navigator<span class="token punctuation">.</span>clipboard<span class="token punctuation">.</span><span class="token function">writeText</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span>
<span class="token function">copy</span><span class="token punctuation">(</span><span class="token string">&#39;你需要粘贴的文本&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,27);function b(h,g){const t=o("CodeGroupItem"),c=o("CodeGroup");return i(),r("div",null,[d,a(c,null,{default:e(()=>[a(t,{title:"IntersectionObserver"},{default:e(()=>[k]),_:1}),a(t,{title:"ES5"},{default:e(()=>[v]),_:1})]),_:1}),m])}const x=l(u,[["render",b],["__file","dom.html.vue"]]);export{x as default};
