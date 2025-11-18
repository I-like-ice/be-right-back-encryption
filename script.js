// Demo credentials (for local/demo use only)
const DEMO_USER = { username: 'joonfat', password: 'smurfcatorignals' };
const LEVEL_PASSWORDS = { 2: 'noob', 3: 'pro' };

// UI elements
const loginSection = document.getElementById('login-section');
const appSection = document.getElementById('app-section');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const usernameEl = document.getElementById('login-username');
const passwordEl = document.getElementById('login-password');
const levelSelect = document.getElementById('level-select');
const key2Label = document.getElementById('key2-label');
const key3Label = document.getElementById('key3-label');
const key1 = document.getElementById('key1');
const key2 = document.getElementById('key2');
const key3 = document.getElementById('key3');
const inputText = document.getElementById('input-text');
const outputText = document.getElementById('output-text');
const encryptBtn = document.getElementById('encrypt-btn');
const decryptBtn = document.getElementById('decrypt-btn');
const clearBtn = document.getElementById('clear-btn');

let authenticated = false;
let levelAuth = {2:false,3:false};

function showApp(){
  loginSection.classList.add('hidden');
  appSection.classList.remove('hidden');
}
function showLogin(){
  loginSection.classList.remove('hidden');
  appSection.classList.add('hidden');
}

loginBtn.addEventListener('click', ()=>{
  const u = usernameEl.value.trim();
  const p = passwordEl.value;
  if(u === DEMO_USER.username && p === DEMO_USER.password){
    authenticated = true;
    showApp();
  } else {
    alert('Invalid username or password');
  }
});

logoutBtn.addEventListener('click', ()=>{
  authenticated = false;
  levelAuth = {2:false,3:false};
  usernameEl.value = '';
  passwordEl.value = '';
  inputText.value = '';
  outputText.value = '';
  showLogin();
});

levelSelect.addEventListener('change', ()=>{
  const lvl = Number(levelSelect.value);
  key2Label.classList.toggle('hidden', lvl < 2);
  key3Label.classList.toggle('hidden', lvl < 3);
});

function caesar(text, key, mode='encrypt'){
  key = ((Number(key)||0) % 26 + 26) % 26;
  let out = '';
  for(const ch of text){
    if(/[A-Z]/.test(ch)){
      const base = 'A'.charCodeAt(0);
      const idx = ch.charCodeAt(0)-base;
      const n = mode==='encrypt' ? (idx+key)%26 : (idx-key+26)%26;
      out += String.fromCharCode(base+n);
    } else if(/[a-z]/.test(ch)){
      const base = 'a'.charCodeAt(0);
      const idx = ch.charCodeAt(0)-base;
      const n = mode==='encrypt' ? (idx+key)%26 : (idx-key+26)%26;
      out += String.fromCharCode(base+n);
    } else {
      out += ch;
    }
  }
  return out;
}

function applyLevelEncrypt(level, text, keys){
  let t = text;
  for(let i=0;i<level;i++){
    const k = keys[i] || 0;
    t = caesar(t, k, 'encrypt');
  }
  return t;
}

function applyLevelDecrypt(level, text, keys){
  let t = text;
  for(let i=level-1;i>=0;i--){
    const k = keys[i] || 0;
    t = caesar(t, k, 'decrypt');
  }
  return t;
}

function ensureLevelAuth(level){
  if(level <= 1) return true;
  if(levelAuth[level]) return true;
  const p = prompt(`Enter password for level ${level}:`);
  if(p === LEVEL_PASSWORDS[level]){
    levelAuth[level] = true;
    return true;
  }
  alert('Incorrect level password');
  return false;
}

encryptBtn.addEventListener('click', ()=>{
  if(!authenticated){ alert('Please login first'); return; }
  const lvl = Number(levelSelect.value);
  if(!ensureLevelAuth(lvl)) return;
  const t = inputText.value || '';
  const keys = [Number(key1.value)||0, Number(key2.value)||0, Number(key3.value)||0];
  const out = applyLevelEncrypt(lvl, t, keys);
  outputText.value = out;
});

decryptBtn.addEventListener('click', ()=>{
  if(!authenticated){ alert('Please login first'); return; }
  const lvl = Number(levelSelect.value);
  if(!ensureLevelAuth(lvl)) return;
  const t = inputText.value || '';
  const keys = [Number(key1.value)||0, Number(key2.value)||0, Number(key3.value)||0];
  const out = applyLevelDecrypt(lvl, t, keys);
  outputText.value = out;
});

clearBtn.addEventListener('click', ()=>{ inputText.value=''; outputText.value=''; });

// initial state
showLogin();

