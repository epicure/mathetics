function build_ep_06() {
  let el = document.createElement('div');
  el.className = 'ep';
  el.style.fontSize = '30px';
  
  let limit_care_public = kind_care_public.map(c => limit_c[c]).reduce((a,b)=>a+b);
  let limit_care_private = kind_care_private.map(c => limit_c[c]).reduce((a,b)=>a+b);
  let limit_kinder_public = kind_kinder_public.map(k => limit_k[k]).reduce((a,b)=>a+b);
  let limit_kinder_private = kind_kinder_private.map(k => limit_k[k]).reduce((a,b)=>a+b);
  //console.log(limit_kinder_public, limit_kinder_private);
  
  let public_per = Math.round(num_public_kid/num_kid_population*100);
  let private_per = Math.round(num_private_kid/num_kid_population*100);
  
  let html = `
    <p>국공립에 비해 사립은 충원율이 낮아지는 추세입니다. 지면으로 부터의 높이가 모집정원을 나타냅니다.</p>
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
          <tr>
            <th>모집정원</th>
            <td>${sp3(limit_care_public)}</td>
            <td>${sp3(limit_care_private)}</td>
          </tr>
          <tr>
            <th>충원율</th>
            <td>${Math.round(num_care_public_kid/limit_care_public*100)}%</td>
            <td>${Math.round(num_care_private_kid/limit_care_private*100)}%</td>
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
          <tr>
            <th>모집정원</th>
            <td>${sp3(limit_kinder_public)}</td>
            <td>${sp3(limit_kinder_private)}</td>
          </tr>
          <tr>
            <th>충원율</th>
            <td>${Math.round(num_kinder_public_kid/limit_kinder_public*100)}%</td>
            <td>${Math.round(num_kinder_private_kid/limit_kinder_private*100)}%</td>
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
          
          if(kind_care_public.includes(p.kinder.form)) {
            let color_keys = [
              new THREE.Vector3(...p.material.color.toArray()),
              new THREE.Vector3(Math.random(),Math.random(),Math.random()),
              new THREE.Vector3(0.5, 1, 0),
            ]
            anim_gens.push(gen_color(p.material, 'color', color_keys, 30+Math.random()*60|0));
          }
          else if(kind_care_private.includes(p.kinder.form)) {
            let color_keys = [
              new THREE.Vector3(...p.material.color.toArray()),
              new THREE.Vector3(Math.random(),Math.random(),Math.random()),
              new THREE.Vector3(0, 0.5, 1),
            ]
            anim_gens.push(gen_color(p.material, 'color', color_keys, 30+Math.random()*60|0));
          }
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
          
          if(kind_kinder_public.includes(p.kinder.form)) {
            let color_keys = [
              new THREE.Vector3(...p.material.color.toArray()),
              new THREE.Vector3(Math.random(),Math.random(),Math.random()),
              new THREE.Vector3(0.5, 1, 0),
            ]
            anim_gens.push(gen_color(p.material, 'color', color_keys, 30+Math.random()*60|0));
          }
          else if(kind_kinder_private.includes(p.kinder.form)) {
            let color_keys = [
              new THREE.Vector3(...p.material.color.toArray()),
              new THREE.Vector3(Math.random(),Math.random(),Math.random()),
              new THREE.Vector3(0, 0.5, 1),
            ]
            anim_gens.push(gen_color(p.material, 'color', color_keys, 30+Math.random()*60|0));
          }
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
    let rot_keys = [
      world.rotation.toVector3(),
      new THREE.Vector3(-1,world.rotation.y,world.rotation.z),
      new THREE.Vector3(-1,world.rotation.y,Math.PI/2),
    ];
    anim_gens.push(gen_vec3(world, 'rotation', rot_keys, 180));
    let cam_pos_keys = [
      camera.position.clone(),
      new THREE.Vector3(1, 0, 110),
    ];
    anim_gens.push(gen_vec3(camera, 'position', cam_pos_keys, 180));
    
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
        
        if(p.kinder.type == '어린이집') {
          let v = new THREE.Vector3(p.position.x, p.position.y, p.origin.z + get_care_limit(p.kinder) * 0.05);
          let pos_keys = [
            p.position.clone(),
            v,
          ];
          let dur = 90+Math.random()*60|0;
          anim_gens.push(gen_vec3(p, 'position', pos_keys, dur));
          let z = 0.001 + (get_care_limit(p.kinder) * 0.05 + p.origin.z);
          let s_keys = [
            p.segment.scale.clone(),
            new THREE.Vector3(1, 1, z)
          ];
          anim_gens.push(gen_vec3(p.segment, 'scale', s_keys, dur));
        }
        else if(p.kinder.type == '유치원') {
          let v = new THREE.Vector3(p.position.x, p.position.y, p.origin.z + get_kinder_limit(p.kinder) * 0.05);
          let pos_keys = [
            p.position.clone(),
            v,
          ];
          let dur = 90+Math.random()*60|0;
          anim_gens.push(gen_vec3(p, 'position', pos_keys, dur));
          let z = 0.001 + (get_kinder_limit(p.kinder) * 0.05 + p.origin.z);
          let s_keys = [
            p.segment.scale.clone(),
            new THREE.Vector3(1, 1, z)
          ];
          anim_gens.push(gen_vec3(p.segment, 'scale', s_keys, dur));
        }
      });
    }
    
    let seqs = [
      { task: delayed, time: 1 }
    ];
    do_sequences(seqs);
  }
  
  let ep = {
    name: '국공립과 사립의 충원율',
    dur: 30,
    el: el,
    begin: begin,
  };
  
  return ep;
}