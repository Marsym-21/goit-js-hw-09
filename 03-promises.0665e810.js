const e=document.querySelector(".form");e.addEventListener("input",(function(e){const n=e.target.name,o=e.target.value;t[n]=o})),e.addEventListener("submit",(function(e){e.preventDefault();let a=Number(t.delay);n=setInterval((()=>{var e,i,l,r;o+=1,e=o,i=Number(t.amount),e===i&&clearInterval(n),a+=Number(t.step),(l=t.amount,r=a,new Promise(((e,t)=>{Math.random()>.3?e({position:l,delay:r}):t({position:l,delay:r})}))).then((({position:e,delay:t})=>{console.log(`✅ Fulfilled promise ${e} in ${t}ms`)})).catch((({position:e,delay:t})=>{console.log(`❌ Rejected promise ${e} in ${t}ms`)}))}),a)}));const t={};let n=0,o=0;
//# sourceMappingURL=03-promises.0665e810.js.map
