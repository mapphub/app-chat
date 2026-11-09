(async function(){
  try{ MiniApps.shell&&MiniApps.shell('setChrome',{topBar:false,bottomBar:false}); }catch(e){}
  const KEY='chat/rooms.json';
  async function loadRooms(){ try{ const r=await MiniApps.fs('read',{path:KEY}); return JSON.parse(r.content||'[]'); }catch(e){ return []; } }
  async function saveRooms(list){ await MiniApps.fs('write',{path:KEY,content:JSON.stringify(list)}); }
  async function render(){ const rooms=await loadRooms(); document.getElementById('rooms').innerHTML=rooms.map(r=>'<button data-r="'+r+'"># '+r+'</button>').join('')||'<p class="muted">Нет комнат</p>'; }
  document.getElementById('create').onclick=async()=>{ const n=document.getElementById('roomName').value.trim(); if(!n)return; const rooms=await loadRooms(); if(!rooms.includes(n)){ rooms.push(n); await saveRooms(rooms);} render(); };
  document.getElementById('rooms').onclick=(e)=>{ const b=e.target.closest('button[data-r]'); if(!b)return; document.getElementById('chat').classList.remove('hidden'); document.getElementById('roomTitle').textContent=b.dataset.r; };
  document.getElementById('send').onclick=()=>{ const t=document.getElementById('msg').value.trim(); if(!t)return; document.getElementById('msgs').innerHTML+='<div>'+t+'</div>'; document.getElementById('msg').value=''; };
  render();
})();
