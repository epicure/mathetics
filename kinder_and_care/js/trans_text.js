let char_list = '성북유치원꽃동산꿈모리노삼육미광내들서울연촌초등학교병설토마상곡양지풍천보고선덕세예진경안다염이레수암청효두솔하늘백운사랑샘일실우혜한까화나라무개아해뜰키즈위희배자공능터대은새봄릉락디영온누여호부속태계신림베어린집창샛별몬테소스타월장SeoulTchi2임당꼬재피오또맑띠익틀크파친잼짐랜드의햇빛황튼그구직도담앙팡비애플람큰푸숲츠꾸러기꿀벌망른니엘단밤톨을로바순복음차름뱅쁜작주롱코평종합회관방과후국력뜻현삐제맘똑싹1남루명믿조르쿨옥K래가득슴는정센채움포근에따반중행참록요밝캐슬감5듬눔든트엄열본즐거브란엔젤향Nw밭솜만뽀4샬롬덴칼뜨님달홍물섬빌깨둥딸앤3윤손축프IB!좋통룡심쟁놀둘짓딧불슐벧8색샤인붐탕슈품악점뢰벨와살씨롯데머힐네';
/*
function* trans_text() {
  let d = target_text.length - curr_text.length;
  let dir = Math.sign(d);
  let n = (d != 0 ? Math.abs(d) : curr_text.length) * 10;
  let len = curr_text.length;
  for(let i = 0; i < n; i++) {
    let rand_text = Array(len).fill().map(x=>hangul2350[Math.random()*hangul2350.length|0]).join('');
    if(i % 10 == 0) {
      len += dir;
    }
    yield rand_text;
  }
}
*/
function* char_a_to_b(a, b) {
  var ac = a.charCodeAt(0);
  var bc = b.charCodeAt(0);
  for(let i = ac; i <= bc; i++) {
    let s = String.fromCharCode(i);
    if(char_list.includes(s)) {
      yield s;
    }
  }
}

function trans_text(a, b) {
  let d = b.length - a.length;
  let dir = Math.sign(d);
  let n = Math.max(a.length, b.length);
  let curr = a;
  while(curr.length < n) {
    curr += char_list[Math.random()*char_list.length|0];
  }
  
  let len = 28;
  text_array = [];
  text_array.push(a);
  for(let i = 0; i < len; i++) {
    let t = i / (len - 1);
    let tn = Math.round((1 - t) * a.length + t * b.length) | 0;
    let rand_text = Array(tn).fill().map(x => char_list[Math.random()*char_list.length|0]).join('');
    text_array.push(rand_text);
  }
  text_array.push(b);
  return text_array;
}