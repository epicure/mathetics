function build_ep_05() {
  let el = document.createElement('div');
  el.className = 'ep';
  el.style.fontSize = '30px';
  
  let public_per = Math.round(num_public_kid/num_kid_population*100);
  let private_per = Math.round(num_private_kid/num_kid_population*100);
  
  let html = `
    <p>노원구의 어린이집의 국공립 대 사립 기관수 비는 ${str_pvp_care_school} 이고, 어린이수 비는 ${str_pvp_care_kid} 입니다. 유치원의 국공립 대 사립 기관수 비는 ${str_pvp_kinder_school} 이고, 어린이수 비는 ${str_pvp_kinder_kid} 입니다. 그러므로 총 국공립 대 사립 기관수 비는 ${str_pvp_school} 이고, 어린이수 비는 ${str_pvp_kid} 이지요.</p>
    <p>노원구의 ${sp3(num_kid_population)}명의 만0세에서 5세 어린이들 중 ${public_per}%인 ${sp3(num_public_kid)}명이 국공립에, ${private_per}%인 ${sp3(num_private_kid)}명이 사립에 다니고 있습니다.</p>
    <p>
      <table>
        <tbody>
          <tr>
            <th><q4>어린이집 유형</q4></th>
            <th><q0>국공립</q0></th>
            <th><q1>사립</q1></th>
          </tr>
          <tr>
            <th>기관수</th>
            <td>${sp3(num_care_public_school)}</td>
            <td>${sp3(num_care_private_school)}</td>
          </tr>
          <tr>
            <th>어린이수</th>
            <td>${sp3(num_care_public_kid)}</td>
            <td>${sp3(num_care_private_kid)}</td>
          </tr>
        </tbody>
      </table>
    </p>
    
    <p>
      <table>
        <tbody>
          <tr>
            <th><q5>유치원 유형</q5></th>
            <th><q2>국공립</q2></th>
            <th><q3>사립</q3></th>
          </tr>
          <tr>
            <th>기관수</th>
            <td>${sp3(num_kinder_public_school)}</td>
            <td>${sp3(num_kinder_private_school)}</td>
          </tr>
          <tr>
            <th>어린이수</th>
            <td>${sp3(num_kinder_public_kid)}</td>
            <td>${sp3(num_kinder_private_kid)}</td>
          </tr>
        </tbody>
      </table>
    </p>

    <p><next>→</next></p>
  `;
  el.innerHTML = html;
  
  el.querySelectorAll('th').forEach(x => {
    x.style.width = '33.3%';  
  });
  
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
    q.style['border-bottom'] = '2px solid rgb(127,255,0)';
    
    q.onmouseover = function(e) {
      wait_episode = wait_episode_dur*0.75|0;
      if(prevent_when_anim_go()) return;
      //if(e.target == sel) return;
      sel = e.target;
      place.children.forEach(p => {
        let shrink = p.kinder.status == '폐원';
        if(kind_care_public.includes(p.kinder.form)) {
          let scale_keys = [
            p.scale.clone(),
            new THREE.Vector3(2, 2, 2),
            new THREE.Vector3(1, 1, 1),
          ] 
          anim_gens.push(gen_vec3(p, 'scale', scale_keys, 30+Math.random()*60|0));
        }
        else {
          shrink = true;
        }
        
        if (shrink) {
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
  
  el.querySelectorAll('q1').forEach(q => {
    q.className = 'q';
    q.style['border-bottom'] = '2px solid rgb(0,127,255)';
    
    q.onmouseover = function(e) {
      wait_episode = wait_episode_dur*0.75|0;
      if(prevent_when_anim_go()) return;
      //if(e.target == sel) return;
      sel = e.target;
      place.children.forEach(p => {
        let shrink = p.kinder.status == '폐원';
        if(kind_care_private.includes(p.kinder.form)) {
          let scale_keys = [
            p.scale.clone(),
            new THREE.Vector3(2, 2, 2),
            new THREE.Vector3(1, 1, 1),
          ] 
          anim_gens.push(gen_vec3(p, 'scale', scale_keys, 30+Math.random()*60|0));
        }
        else {
          shrink = true;
        }
        
        if (shrink) {
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
    q.style['border-bottom'] = '2px solid rgb(127,255,0)';
    
    q.onmouseover = function(e) {
      wait_episode = wait_episode_dur*0.75|0;
      if(prevent_when_anim_go()) return;
      //if(e.target == sel) return;
      sel = e.target;
      place.children.forEach(p => {
        let shrink = p.kinder.status == '폐원';
        if(kind_kinder_public.includes(p.kinder.form)) {
          let scale_keys = [
            p.scale.clone(),
            new THREE.Vector3(2, 2, 2),
            new THREE.Vector3(1, 1, 1),
          ] 
          anim_gens.push(gen_vec3(p, 'scale', scale_keys, 30+Math.random()*60|0));
        }
        else {
          shrink = true;
        }
        
        if (shrink) {
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
  
  el.querySelectorAll('q3').forEach(q => {
    q.className = 'q';
    q.style['border-bottom'] = '2px solid rgb(0,127,255)';
    
    q.onmouseover = function(e) {
      wait_episode = wait_episode_dur*0.75|0;
      if(prevent_when_anim_go()) return;
      //if(e.target == sel) return;
      sel = e.target;
      place.children.forEach(p => {
        let shrink = p.kinder.status == '폐원';
        if(kind_kinder_private.includes(p.kinder.form)) {
          let scale_keys = [
            p.scale.clone(),
            new THREE.Vector3(2, 2, 2),
            new THREE.Vector3(1, 1, 1),
          ] 
          anim_gens.push(gen_vec3(p, 'scale', scale_keys, 30+Math.random()*60|0));
        }
        else {
          shrink = true;
        }
        
        if (shrink) {
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
  
  el.querySelectorAll('q4').forEach(q => {
    q.className = 'q';
    q.style['border-bottom'] = '2px solid rgb(255,255,255)';
    
    q.onmouseover = function(e) {
      wait_episode = wait_episode_dur*0.75|0;
      if(prevent_when_anim_go()) return;
      //if(e.target == sel) return;
      sel = e.target;
      place.children.forEach(p => {
        let shrink = p.kinder.status == '폐원';
        if(p.kinder.type == '어린이집') {
          let scale_keys = [
            p.scale.clone(),
            new THREE.Vector3(2, 2, 2),
            new THREE.Vector3(1, 1, 1),
          ] 
          anim_gens.push(gen_vec3(p, 'scale', scale_keys, 30+Math.random()*60|0));
        }
        else {
          shrink = true;
        }
        
        if (shrink) {
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
  
  el.querySelectorAll('q5').forEach(q => {
    q.className = 'q';
    q.style['border-bottom'] = '2px solid rgb(255,255,255)';
    
    q.onmouseover = function(e) {
      wait_episode = wait_episode_dur*0.75|0;
      if(prevent_when_anim_go()) return;
      //if(e.target == sel) return;
      sel = e.target;
      place.children.forEach(p => {
        let shrink = p.kinder.status == '폐원';
        if(p.kinder.type == '유치원') {
          let scale_keys = [
            p.scale.clone(),
            new THREE.Vector3(2, 2, 2),
            new THREE.Vector3(1, 1, 1),
          ] 
          anim_gens.push(gen_vec3(p, 'scale', scale_keys, 30+Math.random()*60|0));
        }
        else {
          shrink = true;
        }
        
        if (shrink) {
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
  
  function begin() {
    let opacity_keys = [
      new THREE.Vector3(mesh_terrain.material.opacity,0,0),
      new THREE.Vector3(0,0,0)
    ];
    anim_gens.push(gen_vec1(mesh_terrain.material, 'opacity', opacity_keys, 30));
    
    land.children.forEach(p => {
      let scale_keys = [
        p.scale.clone(),
        new THREE.Vector3(1, 1, 1),
      ]
      anim_gens.push(gen_vec3(p, 'scale', scale_keys, 180));
    });
    
    place.children.forEach(p => {
      if(kind_kinder_private.includes(p.kinder.form) || kind_care_private.includes(p.kinder.form)) {
        let color_keys = [
          new THREE.Vector3(...p.material.color.toArray()),
          new THREE.Vector3(Math.random(),Math.random(),Math.random()),
          new THREE.Vector3(0, 0.5, 1),
        ]
        anim_gens.push(gen_color(p.material, 'color', color_keys, 30+Math.random()*60|0));
      }
      else if(kind_kinder_public.includes(p.kinder.form) || kind_care_public.includes(p.kinder.form)) {
        let color_keys = [
          new THREE.Vector3(...p.material.color.toArray()),
          new THREE.Vector3(Math.random(),Math.random(),Math.random()),
          new THREE.Vector3(0.5, 1, 0),
        ]
        anim_gens.push(gen_color(p.material, 'color', color_keys, 30+Math.random()*60|0));
      }
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
    name: '노원구의 국공립과 사립',
    dur: 30,
    el: el,
    begin: begin,
  };
  
  return ep;
}