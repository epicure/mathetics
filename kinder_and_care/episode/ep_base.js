function build_ep_01() {
  let el = document.createElement('div');
  el.className = 'ep';
  let html = `
    <p>노원구에는 <q0>5개의 동</q0>이 있다. 노원구의 <q1>어린이집</q1>과 <q2>유치원</q2>은...</p>
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
    q.style['border-bottom'] = '2px solid rgb(255,255,255)';
    q.onmouseover = function(e) {
      wait_episode = wait_episode_dur*0.75|0;
      if(anim_gens.length > 0) return;
      if(e.target == sel) return;
      if(e.target != sel) {
        sel = e.target;
        land.children.forEach(p => {
          let rotation_keys = Array(5).fill().map(o => {
            return new THREE.Vector3(
              Math.random()*Math.PI*2,
              Math.random()*Math.PI*2,
              Math.random()*Math.PI*2
            );
          });
          rotation_keys.unshift(p.rotation.toVector3());
          rotation_keys.push(new THREE.Vector3(0,0,0));
          anim_gens.push(gen_vec3(p, 'rotation', rotation_keys, 300+Math.random()*600|0));
          
          let colors = Array(10).fill().map(r => {
            return new THREE.Vector3(
              Math.random(),
              Math.random(),
              Math.random()
            );
          });
          colors.unshift(new THREE.Vector3(...p.material.color.toArray())); 
          colors.push(new THREE.Vector3(...p.material.color.toArray())); 
          anim_gens.push(gen_color(p.material, 'color', colors, 200+Math.random()*300|0));
        });
       
        place.children.forEach(p => {
          let scale_keys = [
            p.scale.clone(),
            new THREE.Vector3(1, 1, 1),
            new THREE.Vector3(0.01, 0.01, 0.01),
          ] 
          anim_gens.push(gen_vec3(p, 'scale', scale_keys, 30+Math.random()*60|0));
        });
      }
    }
  });
  
  el.querySelectorAll('q1').forEach(q => {
    q.className = 'q';
    q.style['border-bottom'] = '2px solid rgb(255,255,0)';
    q.onmouseover = function(e) {
      wait_episode = wait_episode_dur*0.75|0;
      if(anim_gens.length > 0) return;
      if(e.target != sel) {
        sel = e.target;
        place.children.forEach(p => {
          if(p.kinder.type == '유치원') {
            let scale_keys = [
              p.scale.clone(),
              new THREE.Vector3(2, 2, 2),
              new THREE.Vector3(0.01, 0.01, 0.01),
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
    }
  });
  
  el.querySelectorAll('q2').forEach(q => {
    q.className = 'q';
    q.style['border-bottom'] = '2px solid rgb(0,255,255)';
    q.onmouseover = function(e) {
      wait_episode = wait_episode_dur*0.75|0;
      if(anim_gens.length > 0) return;
      if(e.target != sel) {
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
              new THREE.Vector3(0.01, 0.01, 0.01),
            ] 
            anim_gens.push(gen_vec3(p, 'scale', scale_keys, 30+Math.random()*60|0));
          }
        });
      }
    }
  });
  
  function begin() {
    let opacity_keys = [
      new THREE.Vector3(mesh_terrain.material.opacity,0,0),
      new THREE.Vector3(0,0,0)
    ];
    anim_gens.push(gen_vec1(mesh_terrain.material, 'opacity', opacity_keys, 180));
  }
  
  let ep = {
    name: '노원구의 유치원',
    dur: 30,
    el: el,
    begin: begin,
  };
  
  return ep;
}