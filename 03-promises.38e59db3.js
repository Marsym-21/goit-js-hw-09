const e=document.querySelector(".form"),t=document.querySelector("button");e.addEventListener("input",(function(e){const o=e.target.name,r=e.target.value;n[o]=r,r>0&&t.removeAttribute("disabled");if(r<0)return t.setAttribute("disabled",""),alert("Please enter data greater than 0!")})),e.addEventListener("submit",(function(e){e.preventDefault();let t=Number(n.delay);o=setInterval((()=>{var e,a,i,l;r+=1,e=r,a=Number(n.amount),e===a&&clearInterval(o),t+=Number(n.step),(i=n.amount,l=t,new Promise(((e,t)=>{Math.random()>.3?e({position:i,delay:l}):t({position:i,delay:l})}))).then((({position:e,delay:t})=>{console.log(`✅ Fulfilled promise ${e} in ${t}ms`)})).catch((({position:e,delay:t})=>{console.log(`❌ Rejected promise ${e} in ${t}ms`)}))}),t)}));const n={};let o=0,r=0;
//# sourceMappingURL=03-promises.38e59db3.js.map