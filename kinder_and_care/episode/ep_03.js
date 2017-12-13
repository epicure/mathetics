function build_ep_03() {
  let el = document.createElement('div');
  el.className = 'ep';
  
  let num_kinder = place.children.filter(p => p.kinder.type == '유치원').length;
  let num_care = place.children.filter(p => p.kinder.type == '어린이집').length;
  let num_closed = place.children.filter(p => p.kinder.status == '폐원').length;
  let num_school = num_kinder + num_care - num_closed;
  
  let html = `
    <p>노원구에는 <q0>${num_care}개의 어린이집</q0>과 <q1>${num_kinder}개의 유치원</q1>이 있고, 그 중 <q2>${num_closed}개의 유치원</q2>이 최근 몇 년 사이에 폐원을 해서 총 <q3>${num_school}개의 어린이를 맡길 수 있는 기관</q3>이 운영 중 입니다.</p>
    <p>왼쪽 지도에 나타나는 표시에 마우스를 올려 어린이과 유치원의 정보를 좀 더 자세히 탐색할 수 있습니다.</p>
    <p><next>다음 →</next></p>
  `;
  el.innerHTML = html;
  
  let sel = null;
  
  el.querySelectorAll('next').forEach(q => {
    q.className = 'q';
    q.style['border-bottom'] = '2px solid rgb(255,255,255)';
    q.onmouseover = function(e) {
      wait_episode = wait_episode_dur*0.75|0;
      if(anim_gens.length > 0) return;
      goto_next_episode();  
    }
  });
  
  el.querySelectorAll('q0').forEach(q => {
    q.className = 'q';
    q.style['border-bottom'] = '2px solid rgb(0,255,255)';
    q.onmouseover = function(e) {
      wait_episode = wait_episode_dur*0.75|0;
      if(anim_gens.length > 0) return;
      //if(e.target == sel) return;
      sel = e.target;
      place.children.forEach(p => {
        if(p.kinder.type == '유치원') {
          let scale_keys = [
            p.scale.clone(),
            new THREE.Vector3(2, 2, 2),
            new THREE.Vector3(0.001, 0.001, 0.001),
          ] 
          anim_gens.push(gen_vec3(p, 'scale', scale_keys, 30+Math.random()*60|0));
        }
        else if(p.kinder.type == '어린이집') {
          let scale_keys = [
            p.scale.clone(),
            new THREE.Vector3(2, 2, 2),
            new THREE.Vector3(1, 1, 1),
          ] 
          anim_gens.push(gen_vec3(p, 'scale', scale_keys, 30+Math.random()*60|0));
        }
      });
    }
  });
  
  el.querySelectorAll('q1').forEach(q => {
    q.className = 'q';
    q.style['border-bottom'] = '2px solid rgb(255,255,0)';
    q.onmouseover = function(e) {
      wait_episode = wait_episode_dur*0.75|0;
      if(anim_gens.length > 0) return;
      //if(e.target == sel) return;
      sel = e.target;
      place.children.forEach(p => {
        if(p.kinder.type == '유치원') {
          let scale_keys = [
            p.scale.clone(),
            new THREE.Vector3(2, 2, 2),
            new THREE.Vector3(1, 1, 1),
          ] 
          anim_gens.push(gen_vec3(p, 'scale', scale_keys, 30+Math.random()*60|0));
        }
        else if(p.kinder.type == '어린이집') {
          let scale_keys = [
            p.scale.clone(),
            new THREE.Vector3(2, 2, 2),
            new THREE.Vector3(0.001, 0.001, 0.001),
          ] 
          anim_gens.push(gen_vec3(p, 'scale', scale_keys, 30+Math.random()*60|0));
        }
      });
    }
  });
  
  el.querySelectorAll('q2').forEach(q => {
    q.className = 'q';
    q.style['border-bottom'] = '2px solid rgb(0,255,255)';
    q.onmouseover = function(e) {
      wait_episode = wait_episode_dur*0.75|0;
      if(anim_gens.length > 0) return;
      //if(e.target == sel) return;
      sel = e.target;
      place.children.forEach(p => {
        if(p.kinder.type == '유치원') {
          if(p.kinder.status == '폐원') {
            let scale_keys = [
              p.scale.clone(),
              new THREE.Vector3(2, 2, 2),
              new THREE.Vector3(1, 1, 1),
            ] 
            anim_gens.push(gen_vec3(p, 'scale', scale_keys, 30+Math.random()*60|0));  
          } 
          else {
            let scale_keys = [
              p.scale.clone(),
              new THREE.Vector3(0.001, 0.001, 0.001),
            ] 
            anim_gens.push(gen_vec3(p, 'scale', scale_keys, 30+Math.random()*60|0));
          }
        }
        else if(p.kinder.type == '어린이집') {
          let scale_keys = [
            p.scale.clone(),
            new THREE.Vector3(0.001, 0.001, 0.001),
          ] 
          anim_gens.push(gen_vec3(p, 'scale', scale_keys, 30+Math.random()*60|0));
        }
      });
    }
  });
  
  el.querySelectorAll('q3').forEach(q => {
    q.className = 'q';
    q.style['border-bottom'] = '2px solid rgb(255,255,255)';
    q.onmouseover = function(e) {
      wait_episode = wait_episode_dur*0.75|0;
      if(anim_gens.length > 0) return;
      //if(e.target == sel) return;
      sel = e.target;
      place.children.forEach(p => {
        if(p.kinder.type == '유치원' || p.kinder.type == '어린이집') {
          if(p.kinder.status == '폐원') {
            let scale_keys = [
              p.scale.clone(),
              new THREE.Vector3(0.001, 0.001, 0.001),
            ] 
            anim_gens.push(gen_vec3(p, 'scale', scale_keys, 30+Math.random()*60|0));  
          } 
          else {
            let scale_keys = [
              p.scale.clone(),
              new THREE.Vector3(2, 2, 2),
              new THREE.Vector3(1, 1, 1),
            ] 
            anim_gens.push(gen_vec3(p, 'scale', scale_keys, 30+Math.random()*60|0));
          }
        }
      });
    }
  });
  
  function begin() {
    let opacity_keys = [
      new THREE.Vector3(mesh_terrain.material.opacity,0,0),
      new THREE.Vector3(1,1,1)
    ];
    anim_gens.push(gen_vec1(mesh_terrain.material, 'opacity', opacity_keys, 180));
    
    land.children.forEach(p => {
      let scale_keys = [
        p.scale.clone(),
        new THREE.Vector3(1, 1, 1),
      ]
      anim_gens.push(gen_vec3(p, 'scale', scale_keys, 180));
    });
  }
  
  let ep = {
    name: '노원구의 어린이집과 유치원',
    dur: 30,
    el: el,
    begin: begin,
  };
  
  return ep;
}