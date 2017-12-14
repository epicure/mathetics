function build_ep_03() {
  let el = document.createElement('div');
  el.className = 'ep';
  el.style.fontSize = '30px';
  
  let num_kinder = place.children.filter(p => p.kinder.type == '유치원').length;
  let num_care = place.children.filter(p => p.kinder.type == '어린이집').length;
  let num_closed = place.children.filter(p => p.kinder.status == '폐원').length;
  let num_school = num_kinder + num_care - num_closed;
  let kid_per = num_kid_in_school/num_kid_population*100;
  
  let html = `
    <p>노원구에는 <q0>${num_care}개의 어린이집</q0>과 <q1>${num_kinder}개의 유치원</q1>이 있고, 그 중 상계동에 있는 <q2>${num_closed}개 유치원</q2>이 최근 몇 년 사이에 폐원을 해서 총 <q3>${num_school}개</q3>의 보육과 교육을 맡길 수 있는 기관이 운영 중 입니다.</p>
    <p>노원구의 ${sp3(num_kid_population)}명의 만0세 부터 만5세 어린이들 중 ${Math.round(kid_per)}%인 ${sp3(num_kid_in_school)}명이 이 어린이집과 유치원을 다니고 있는데, 그러면 나머지 ${Math.round(100-kid_per)}%인 ${sp3(num_kid_population - num_kid_in_school)}명의 어린이들은 어디에 있는 것일까요?</p>
    <p>2017년에도 <q4>상계동</q4>에 있는 <q5>한 유치원</q5>의 폐원 이슈에 관한 기사가 나기도 했죠.</p>
    <ref>상계동 폐원 갈등 유치원: https://www.youtube.com/watch?v=CMJHmwUGIOc</ref>
    <ref>상계동 유치원 폐원 위기 넘겼다: http://www.yonhap21.com/detail.php?number=12643</ref>
    <p>유치원의 갑작스러운 폐원은 여러가지 복잡한 문제를 일으킬 수 있습니다.</p>
    <p>왼쪽 지도에 나타나는 표시에 마우스를 올려 어린이집과 유치원의 정보를 좀 더 자세히 탐색할 수 있어요.</p>
    <p><next>→</next></p>
  `;
  el.innerHTML = html;
  
  let sel = null;
  
  el.querySelectorAll('next').forEach(q => {
    q.className = 'q';
    q.style['border-bottom'] = '2px solid rgb(255,255,255)';
    q.onmouseover = function(e) {
      if(prevent_when_anim_go()) return;
      wait_episode = 20; 
    }
  });
  
  el.querySelectorAll('q0').forEach(q => {
    q.className = 'q';
    q.style['border-bottom'] = '2px solid rgb(255,255,0)';
    q.onmouseover = function(e) {
      wait_episode = wait_episode_dur*0.75|0;
      if(prevent_when_anim_go()) return;
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
    q.style['border-bottom'] = '2px solid rgb(0,255,255)';
    q.onmouseover = function(e) {
      wait_episode = wait_episode_dur*0.75|0;
      if(prevent_when_anim_go()) return;
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
      if(prevent_when_anim_go()) return;
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
      if(prevent_when_anim_go()) return;
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
      
      let opacity_keys = [
        new THREE.Vector3(mesh_terrain.material.opacity,0,0),
        new THREE.Vector3(1,0,0)
      ];
      anim_gens.push(gen_vec1(mesh_terrain.material, 'opacity', opacity_keys, 30));
    }
  });
  
  el.querySelectorAll('q4').forEach(q => {
    q.className = 'q';
    q.style['border-bottom'] = '2px solid rgb(255,255,255)';
    q.onmouseover = function(e) {
      wait_episode = wait_episode_dur*0.75|0;
      if(prevent_when_anim_go()) return;
      //if(e.target == sel) return;
      sel = e.target;
      let p = land.children.find(l => l.name == e.target.textContent.trim());
      if(p) {
        let colors = Array(5).fill().map(r => {
          return new THREE.Vector3(
            Math.random(),
            Math.random(),
            Math.random()
          );
        });
        colors.unshift(new THREE.Vector3(...p.material.color.toArray())); 
        colors.push(new THREE.Vector3(...p.color)); 
        anim_gens.push(gen_color(p.material, 'color', colors, 180));
      }
      
      let opacity_keys = [
        new THREE.Vector3(mesh_terrain.material.opacity,0,0),
        new THREE.Vector3(0,0,0)
      ];
      anim_gens.push(gen_vec1(mesh_terrain.material, 'opacity', opacity_keys, 30));
    }
  });
  
  el.querySelectorAll('q5').forEach(q => {
    q.className = 'q';
    q.style['border-bottom'] = '2px solid rgb(0,255,255)';
    q.onmouseover = function(e) {
      wait_episode = wait_episode_dur*0.75|0;
      if(prevent_when_anim_go()) return;
      //if(e.target == sel) return;
      sel = e.target;
      place.children.forEach(p => {
        if(p.kinder.name == '꿈동산유치원') {
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
    
    function delayed() {
      place.children.forEach(p => {
        if(p.kinder.type == '유치원' || p.kinder.type == '어린이집') {
          let scale_keys = [
            p.scale.clone(),
            new THREE.Vector3(2, 2, 2),
            new THREE.Vector3(1, 1, 1),
          ]
          anim_gens.push(gen_vec3(p, 'scale', scale_keys, 30+Math.random()*60|0));
        }
      });
    }
    
    let seqs = [
      { task: delayed, time: 1 }
    ];
    do_sequences(seqs);
  }
  
  let ep = {
    name: '노원구의 어린이집과 유치원',
    dur: 30,
    el: el,
    begin: begin,
  };
  
  return ep;
}