import{_ as n,o as s,c as a,a as t}from"./app-b83f042f.js";const p={},e=t(`<p><code>node</code>在读取文件或者操作文件的时候，如果发现路径是<strong>相对路径</strong>，会使用<code>process.cwd()</code>来将相对路径拼接成绝对路径；</p><p>但是如果<em><strong>不是在项目根目录</strong>处执行node，且路径是</em><em>相对路径</em>*，最终会拼接成一个错误的路径*</p><p><code>process.cwd()</code>：是获取node执行时所在的目录路径</p><p>所以如果<em><strong>不是在项目根目录</strong>处执行node，且路径是</em><em>相对路径</em>*，最终会拼接成一个错误的路径*</p><p><code>__dirname</code>：获取当前文件所在的目录路径</p><h2 id="path-resolve" tabindex="-1"><a class="header-anchor" href="#path-resolve" aria-hidden="true">#</a> path.resolve()</h2><p>将路径拼接成<strong>绝对路径</strong></p><p><code>/</code>开头则表示为<strong>根目录</strong>，当遇到以/开头的路径就以这个路径为绝对路径的根路径</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//test.js</span>
<span class="token comment">//当前文件所在目录C:/project/test/</span>

<span class="token comment">// 遇到/开头则以/作为根拼接</span>
path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&quot;/a&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;b&quot;</span><span class="token punctuation">)</span> <span class="token comment">// C:/a/b</span>
path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;/b&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;c&quot;</span><span class="token punctuation">)</span> <span class="token comment">// C:/b/c</span>

<span class="token comment">// 如果是’./‘或者’a/‘的写法，则拼接在当前文件路径的后面</span>
path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;b&quot;</span><span class="token punctuation">)</span> <span class="token comment">// C:/project/test/a/b</span>
path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;./b&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;c&quot;</span><span class="token punctuation">)</span> <span class="token comment">// C:/project/test/a/b/c</span>

path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&quot;/a/b&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;/c/d&quot;</span><span class="token punctuation">)</span> <span class="token comment">// C:/c/d</span>

path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&quot;../a&quot;</span><span class="token punctuation">,</span><span class="token string">&#39;b&#39;</span><span class="token punctuation">)</span> <span class="token comment">// C:/project/a/b</span>

path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span><span class="token string">&#39;./main.js&#39;</span><span class="token punctuation">)</span>
<span class="token comment">//C:/project/test/main.js</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="path-join" tabindex="-1"><a class="header-anchor" href="#path-join" aria-hidden="true">#</a> path.join()</h2><p>将路径拼接成<strong>相对路径</strong></p><p>不管是以<code>/</code>，<code>./</code>，<code>x/</code>开头，都不会影响最终拼接出来的结果</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>path<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;b&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;c&#39;</span><span class="token punctuation">)</span> <span class="token comment">// a/b/c</span>
path<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&#39;/a&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;/b&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;./c&#39;</span><span class="token punctuation">)</span> <span class="token comment">// a/b/c</span>
path<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;../b&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;c&#39;</span><span class="token punctuation">)</span> <span class="token comment">// b/c</span>

<span class="token comment">//使用__dirname获取当前文件所在目录，拼接绝对路径</span>
path<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;/b&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;./c&#39;</span><span class="token punctuation">)</span>
<span class="token comment">//C:/project/test/a/b/c</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13),o=[e];function c(i,l){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","path.html.vue"]]);export{r as default};
