import{_ as a,o as e,c as s,a as r}from"./app-b83f042f.js";const n={},p=r(`<h2 id="颁发证书流程" tabindex="-1"><a class="header-anchor" href="#颁发证书流程" aria-hidden="true">#</a> 颁发证书流程</h2><p>证书中含有服务器公钥，证书签名，由于CA机构的公钥是公开的，可以通过CA机构的公钥解密读取，但是由于没有CA私钥，无法重新加密伪造（只能解密读取，不能修改伪造）</p><h3 id="证书签名" tabindex="-1"><a class="header-anchor" href="#证书签名" aria-hidden="true">#</a> 证书签名</h3><blockquote><p>证书签名 = 服务器域名 + 服务器公钥 + CA公钥</p></blockquote><p>证书签名的算法是公开的，它出现的目的，是为了让每一个拿到证书的终端，可以验证签名是否被篡改</p><p>CA机构：有公钥和私钥还有证书</p><p>服务器：准备好服务器域名、公钥</p><h2 id="服务器申请https证书" tabindex="-1"><a class="header-anchor" href="#服务器申请https证书" aria-hidden="true">#</a> 服务器申请https证书</h2><h3 id="生成服务器私钥" tabindex="-1"><a class="header-anchor" href="#生成服务器私钥" aria-hidden="true">#</a> 生成服务器私钥</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>openssl genrsa <span class="token parameter variable">-out</span> server-key.pem <span class="token number">1024</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>可以直接生成，无需再加密</p><h3 id="生成服务器公钥" tabindex="-1"><a class="header-anchor" href="#生成服务器公钥" aria-hidden="true">#</a> 生成服务器公钥</h3><p>根据生成的私钥生成公钥</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>openssl req <span class="token parameter variable">-new</span> <span class="token parameter variable">-key</span> server-key.pem <span class="token parameter variable">-out</span> server-scr.pem
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="成为ca机构" tabindex="-1"><a class="header-anchor" href="#成为ca机构" aria-hidden="true">#</a> 成为CA机构</h2><p>生成公钥私钥需要安装使用<code>openssl</code></p><h3 id="生成ca私钥" tabindex="-1"><a class="header-anchor" href="#生成ca私钥" aria-hidden="true">#</a> 生成CA私钥</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>openssl genrsa <span class="token parameter variable">-des3</span> <span class="token parameter variable">-out</span> ca-pri-key.pem <span class="token number">1024</span>
<span class="token comment"># 这个过程需要设置私钥的密码，一定要填写</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code>genrsa</code>：密钥对生成算法</p><p><code>-des3</code>：使用堆成加密算法des3对私钥进异步加密</p><p><code>-out ca-pri-key.pem</code>：将加密后的私钥保存到当前目录的ca-pri-key.pem文件中</p><p><code>1024</code>：私钥的字节数</p><h3 id="生成ca公钥-证书请求" tabindex="-1"><a class="header-anchor" href="#生成ca公钥-证书请求" aria-hidden="true">#</a> 生成CA公钥（证书请求）</h3><p><strong>使用CA公钥来颁发CA证书</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>openssl req <span class="token parameter variable">-new</span> <span class="token parameter variable">-key</span> ca-pri-key.pem <span class="token parameter variable">-out</span> ca-pub-key.pem
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>通过私钥文件ca-pri-key.pem中的内容，生成对应的公钥，保存到ca-pub-key.pem中</p><p>运行过程中药使用之前输入的密码来实现对私钥文件的解密</p><p>按需输入提示要输入的信息</p><h3 id="生成ca证书" tabindex="-1"><a class="header-anchor" href="#生成ca证书" aria-hidden="true">#</a> 生成CA证书</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>openssl x509 <span class="token parameter variable">-req</span> <span class="token parameter variable">-in</span> ca-pub-key.pem <span class="token parameter variable">-signkey</span> ca-pri-key.pem <span class="token parameter variable">-out</span> ca-cert.crt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用X.509证书标准，通过证书请求文件ca-pub-key.pem生成证书，并使用私钥ca-pri-key.pem加密，然后把证书保存到ca-cert.crt文件中</p><h3 id="生成服务器证书" tabindex="-1"><a class="header-anchor" href="#生成服务器证书" aria-hidden="true">#</a> 生成服务器证书</h3><p>将服务器提交上来的服务器公钥结合CA的公私钥和证书生成服务器的证书</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>openssl x509 <span class="token parameter variable">-req</span> <span class="token parameter variable">-CA</span> ca-cert.crt <span class="token parameter variable">-CAkey</span> ca-pri-key.pem <span class="token parameter variable">-CAcreateserial</span> <span class="token parameter variable">-in</span> server-scr.pem <span class="token parameter variable">-out</span> server-cert.crt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,34),i=[p];function d(c,l){return e(),s("div",null,i)}const o=a(n,[["render",d],["__file","applyCert.html.vue"]]);export{o as default};
