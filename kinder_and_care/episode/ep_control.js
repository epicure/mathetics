let episode_list = [];

//---------------
let num_population = 555775;
let kid_populations = [3277, 3871, 4112, 4022, 3846, 4419];
let num_kid_population = kid_populations.reduce((a,b)=>a+b);


let care_forms, kinder_forms;
let nc, nk, cnc, cnk;
let kind_care_public, kind_care_private, kind_kinder_public, kind_kinder_private;
let num_care_public_school, num_care_private_school, num_kinder_public_school, num_kinder_private_school;
let num_care_public_kid, num_care_private_kid, num_kinder_public_kid, num_kinder_private_kid;
let num_public_school, num_private_school;
let num_public_kid, num_private_kid;
let str_pvp_care_school, str_pvp_kinder_school;
let str_pvp_care_kid, str_pvp_kinder_kid;
let str_pvp_school, str_pvp_kid;
let num_kid_in_school;

let limit_c, limit_k;

function get_kinder_jungwon(kinder) {
  let n = 0;
  if(kinder.type == '유치원') {
    if(!kinder.nostat) {
      let nj = [
        kinder.stat.영유아및교직원.연령별학급현황.연령별.만3세.모집정원|0,
        kinder.stat.영유아및교직원.연령별학급현황.연령별.만4세.모집정원|0,
        kinder.stat.영유아및교직원.연령별학급현황.연령별.만5세.모집정원|0,
      ];
      n = nj.reduce((a,b)=>a+b);
    }
  }
  else if(kinder.type == '어린이집') {
    let nj = [
      kinder.stat.영유아및교직원.연령별반현황.연령별.만0세['정원']|0,
      kinder.stat.영유아및교직원.연령별반현황.연령별.만1세['정원']|0,
      kinder.stat.영유아및교직원.연령별반현황.연령별.만2세['정원']|0,
      kinder.stat.영유아및교직원.연령별반현황.연령별.만3세['정원']|0,
      kinder.stat.영유아및교직원.연령별반현황.연령별.만4세['정원']|0,
      kinder.stat.영유아및교직원.연령별반현황.연령별.만5세['정원']|0,
      kinder.stat.영유아및교직원.연령별반현황.연령별['영아혼합']['정원']|0,
      kinder.stat.영유아및교직원.연령별반현황.연령별['유아혼합']['정원']|0,
      kinder.stat.영유아및교직원.연령별반현황.연령별['특수/장애아']['정원']|0,
      kinder.stat.영유아및교직원.연령별반현황.연령별['기타']['정원']|0,
    ];
    n = nj.reduce((a,b)=>a+b);
  }
  return n;
}

function get_kinder_hyunwon(kinder) {
  let n = 0;
  if(kinder.type == '유치원') {
    if(!kinder.nostat) {
      let nj = [
        kinder.stat.영유아및교직원.연령별학급현황.연령별.만3세.현원|0,
        kinder.stat.영유아및교직원.연령별학급현황.연령별.만4세.현원|0,
        kinder.stat.영유아및교직원.연령별학급현황.연령별.만5세.현원|0,
      ];
      n = nj.reduce((a,b)=>a+b);
    }
  }
  else if(kinder.type == '어린이집') {
    let nj = [
      kinder.stat.영유아및교직원.연령별반현황.연령별.만0세['현원']|0,
      kinder.stat.영유아및교직원.연령별반현황.연령별.만1세['현원']|0,
      kinder.stat.영유아및교직원.연령별반현황.연령별.만2세['현원']|0,
      kinder.stat.영유아및교직원.연령별반현황.연령별.만3세['현원']|0,
      kinder.stat.영유아및교직원.연령별반현황.연령별.만4세['현원']|0,
      kinder.stat.영유아및교직원.연령별반현황.연령별.만5세['현원']|0,
      kinder.stat.영유아및교직원.연령별반현황.연령별['영아혼합']['현원']|0,
      kinder.stat.영유아및교직원.연령별반현황.연령별['유아혼합']['현원']|0,
      kinder.stat.영유아및교직원.연령별반현황.연령별['특수/장애아']['현원']|0,
      kinder.stat.영유아및교직원.연령별반현황.연령별['기타']['현원']|0,
    ];
    n = nj.reduce((a,b)=>a+b);
  }
  return n;
}

function init_episode_variables () {
  care_forms = '국공립,가정,민간,직장,협동,사회복지법인,법인·단체등'.split(',');
  kinder_forms = '공립(병설),공립(단설),사립(사인),사립(법인)'.split(',');

  nc = {};
  care_forms.forEach(c => nc[c] = 0);
  nk = {};
  kinder_forms.forEach(k => nk[k] = 0);

  cnc = {};
  care_forms.forEach(c => cnc[c] = 0);
  cnk = {};
  kinder_forms.forEach(k => cnk[k] = 0);
  
  limit_c = {};
  care_forms.forEach(c => limit_c[c] = 0);
  limit_k = {};
  kinder_forms.forEach(k => limit_k[k] = 0);

  kinders.forEach(k => {
    if(k.type == '어린이집') {
      nc[k.form]++;
      cnc[k.form] += k.stat.영유아및교직원.연령별반현황.총인원|0;
      limit_c[k.form] += get_kinder_jungwon(k);
    }
    else if(k.type == '유치원' && !k.nostat) {
      nk[k.form]++;
      cnk[k.form] += k.stat.영유아및교직원.연령별학급현황.총현원|0;
      limit_k[k.form] += get_kinder_jungwon(k);
    }
  });

  kind_care_public = '국공립'.split(',');
  kind_care_private = '가정,민간,직장,협동,사회복지법인,법인·단체등'.split(',');
  kind_kinder_public = '공립(병설),공립(단설)'.split(',');
  kind_kinder_private = '사립(사인),사립(법인)'.split(',');

  num_care_public_school = kind_care_public.map(c => nc[c]).reduce((a,b)=>a+b);
  num_care_private_school = kind_care_private.map(c => nc[c]).reduce((a,b)=>a+b);

  num_kinder_public_school = kind_kinder_public.map(k => nk[k]).reduce((a,b)=>a+b);
  num_kinder_private_school = kind_kinder_private.map(k => nk[k]).reduce((a,b)=>a+b);

  num_care_public_kid = kind_care_public.map(c => cnc[c]).reduce((a,b)=>a+b);
  num_care_private_kid = kind_care_private.map(c => cnc[c]).reduce((a,b)=>a+b);

  num_kinder_public_kid = kind_kinder_public.map(k => cnk[k]).reduce((a,b)=>a+b);
  num_kinder_private_kid = kind_kinder_private.map(k => cnk[k]).reduce((a,b)=>a+b);
  
  num_public_school = num_care_public_school + num_kinder_public_school;
  num_private_school = num_care_private_school + num_kinder_private_school;
  
  num_public_kid = num_care_public_kid + num_kinder_public_kid;
  num_private_kid = num_care_private_kid + num_kinder_private_kid;
  
  num_kid_in_school = num_public_kid + num_private_kid;
  
  str_pvp_care_school = (Math.round(num_care_public_school / (num_care_public_school + num_care_private_school) * 100)/10).toFixed(1)
    + ' : '
    + (Math.round(num_care_private_school / (num_care_public_school + num_care_private_school) * 100)/10).toFixed(1);
  
  str_pvp_kinder_school = (Math.round(num_kinder_public_school / (num_kinder_public_school + num_kinder_private_school) * 100)/10).toFixed(1)
    + ' : '
    + (Math.round(num_kinder_private_school / (num_kinder_public_school + num_kinder_private_school) * 100)/10).toFixed(1);
  
  str_pvp_care_kid = (Math.round(num_care_public_kid / (num_care_public_kid + num_care_private_kid) * 100)/10).toFixed(1)
    + ' : '
    + (Math.round(num_care_private_kid / (num_care_public_kid + num_care_private_kid) * 100)/10).toFixed(1);
  
  str_pvp_kinder_kid = (Math.round(num_kinder_public_kid / (num_kinder_public_kid + num_kinder_private_kid) * 100)/10).toFixed(1)
    + ' : '
    + (Math.round(num_kinder_private_kid / (num_kinder_public_kid + num_kinder_private_kid) * 100)/10).toFixed(1);
  
  str_pvp_school = (Math.round(num_public_school / (num_public_school + num_private_school) * 100)/10).toFixed(1)
    + ' : '
    + (Math.round(num_private_school / (num_public_school + num_private_school) * 100)/10).toFixed(1);
  
  str_pvp_kid = (Math.round(num_public_kid / (num_public_kid + num_private_kid) * 100)/10).toFixed(1)
    + ' : '
    + (Math.round(num_private_kid / (num_public_kid + num_private_kid) * 100)/10).toFixed(1);
}

//---------------

function sp3(n) {
  var s = String(n).split('');
  var slots = [];
  while(s.length > 0) {
    slots.unshift(s.splice(-3).join(''));
  }
  return slots.join(',');
}

function goto_episode_by_index(idx) {
  scroll_to_episode();
  if(idx >= 0 && idx < episode_list.length) {
    let ep = episode_list[idx];
    curr_episode = ep;
    wait_episode_dur = ep.dur * 60 | 0;
    wait_episode = wait_episode_dur;
    el_chapter_scroll.style.left = -ep.pos + 'px';
    episode_title_trans = trans_text(el_episode_name.textContent, ep.name);
    if(ep.begin) {
      ep.begin();
    }
  }
}

function goto_next_episode() {
  if(curr_episode) {
    let idx = episode_list.indexOf(curr_episode);
    if(idx != -1) {
      idx += 1;
      if(idx > episode_list.length - 1) {
        idx = 0;
      }
      //setTimeout(() => goto_episode_by_index(idx), 500);
      goto_episode_by_index(idx);
    }
  }
}

function scroll_to_info() {
  el_info.style.top = '0px';
  el_episode.style.top = '-1080px';
  wait_info = wait_info_dur;
}

function scroll_to_episode() {
  el_info.style.top = '1080px';
  el_episode.style.top = '0px';
  indicator.visible = false;
}

function prevent_when_anim_go() {
  let res = false;
  if(anim_gens.length > 0) {
    res = true;
    el_warn.textContent = '마우스를 이동했다가 잠시 기다린 후 다시 올려주세요';
    el_warn.style.transition = '0.5s';
    el_warn.style.opacity = 1;
  }
  else {
    el_warn.style.transition = '0.5s';
    el_warn.style.opacity = 0;
  }
  return res;
}

function init_episode() {
  init_episode_variables();
  
  let build_list = [
    build_ep_00,
    build_ep_01,
    build_ep_02,
    build_ep_03,
    build_ep_04,
    build_ep_05,
    build_ep_06,
  ];

  build_list.forEach((build, i) => {
    let ep = build();
    ep.pos = i * 1120;
    ep.el.style.left = ep.pos + 'px';
    el_chapter_scroll.appendChild(ep.el);
    episode_list.push(ep);
  });

  goto_episode_by_index(0);
}