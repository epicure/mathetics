function build_ep_04() {
  let el = document.createElement('div');
  el.className = 'ep';
  el.style.fontSize = '30px';
  
  /*
  "사립(사인)",
  "사립(법인)",
  "공립(병설)",
  "공립(단설)",
  "가정",
  "민간",
  "국공립",
  "직장",
  "사회복지법인",
  "법인·단체등",
  "협동"
  */
  let care_forms = '국공립,가정,민간,직장,협동,사회복지법인,법인·단체등'.split(',');
  let kinder_forms = '공립(병설),공립(단설),사립(사인),사립(법인)'.split(',');
  
  let nc = {};
  care_forms.forEach(c => nc[c] = 0);
  let nk = {};
  kinder_forms.forEach(k => nk[k] = 0);
  
  let cnc = {};
  care_forms.forEach(c => cnc[c] = 0);
  let cnk = {};
  kinder_forms.forEach(k => cnk[k] = 0);
  
  kinders.forEach(k => {
    if(k.type == '어린이집') {
      nc[k.form]++;
      cnc[k.form] += k.stat.영유아및교직원.연령별반현황.총인원|0;
    }
    else if(k.type == '유치원' && !k.nostat) {
      nk[k.form]++;
      cnk[k.form] += k.stat.영유아및교직원.연령별학급현황.총현원|0;
    }
  });
  
  let html = `
    <p>어린이집은 <q0>국공립</q0>, <q0>가정</q0>, <q0>민간</q0>, <q0>직장</q0>, <q0>협동</q0>, <q0>사회복지법인</q0>, <q0>법인·단체등</q0>의 일곱 가지 유형이 있고,</p>

    <p>
      <table>
        <tbody>
          <tr>
            <th>어린이집 유형</th>
            <th>국공립</th>
            <th>가정</th>
            <th>민간</th>
            <th>직장</th>
            <th>협동</th>
            <th>사회복지법인</th>
            <th>법인·단체등</th>
          </tr>
          <tr>
            <th>기관수</th>
            <td>${nc['국공립']}</td>
            <td>${nc['가정']}</td>
            <td>${nc['민간']}</td>
            <td>${nc['직장']}</td>
            <td>${nc['협동']}</td>
            <td>${nc['사회복지법인']}</td>
            <td>${nc['법인·단체등']}</td>
          </tr>
          <tr>
            <th>어린이수</th>
            <td>${cnc['국공립']}</td>
            <td>${cnc['가정']}</td>
            <td>${cnc['민간']}</td>
            <td>${cnc['직장']}</td>
            <td>${cnc['협동']}</td>
            <td>${cnc['사회복지법인']}</td>
            <td>${cnc['법인·단체등']}</td>
          </tr>
        </tbody>
      </table>
    </p>

    <p>유치원은 <q0>공립(병설)</q0>, <q0>공립(단설)</q0>, <q0>사립(사인)</q0>, <q0>사립(법인)</q0>의 네 가지 유형이 있습니다.</p>


      <table>
        <tbody>
          <tr>
            <th>유치원 유형</th>
            <th>공립(병설)</th>
            <th>공립(단설)</th>
            <th>사립(사인)</th>
            <th>사립(법인)</th>
          </tr>
          <tr>
            <th>기관수</th>
            <td>${nk['공립(병설)']}</td>
            <td>${nk['공립(단설)']}</td>
            <td>${nk['사립(사인)']}</td>
            <td>${nk['사립(법인)']}</td>
          </tr>
          <tr>
            <th>어린이수</th>
            <td>${cnk['공립(병설)']}</td>
            <td>${cnk['공립(단설)']}</td>
            <td>${cnk['사립(사인)']}</td>
            <td>${cnk['사립(법인)']}</td>
          </tr>
        </tbody>
      </table>

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
    if(care_forms.includes(q.textContent)) {
      q.style['border-bottom'] = '2px solid rgb(255,255,0)';
    }
    else if(kinder_forms.includes(q.textContent)) {
      q.style['border-bottom'] = '2px solid rgb(0,255,255)';
    }
    
    q.onmouseover = function(e) {
      wait_episode = wait_episode_dur*0.75|0;
      if(prevent_when_anim_go()) return;
      //if(e.target == sel) return;
      sel = e.target;
      place.children.forEach(p => {
        let shrink = p.kinder.status == '폐원';
        if(p.kinder.form == q.textContent) {
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
    name: '어린이집과 유치원의 유형',
    dur: 30,
    el: el,
    begin: begin,
  };
  
  return ep;
}