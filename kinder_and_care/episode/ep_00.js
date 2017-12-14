function build_ep_00() {
  let el = document.createElement('div');
  el.className = 'ep';
  let html = `
    <p style="font-family: 'BM JUA_OTF'; letter-spacing: 0.1em;">아이참 재미있어~ 우리 유치원~</p>
    <p style="font-family: 'BM JUA_OTF'; letter-spacing: 0.1em;">벌써 갈 시간이 다 되었네...</p>
    <p>어린이들이 유치원을 하원할 때 부르곤 하는 이 노래 기억하세요? 노원구의 인구와 유치원 그리고 어린이집에 관한 데이터를 렌즈로 이 시대의 한 측면을 살펴보고자 합니다.</p>
    <p>혹시 한 때가 저물어 다음으로 나아가야 할 징후가 나타나고 있진 않을까요?</p>
    <p>밑줄이 있는 글에 마우스를 올려 데이터를 탐험해 보세요.</p>
    <p><next>다음 →</next></p>
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
  
  function begin() {
    place.children.forEach(p => {
      p.scale.set(0.001, 0.001, 0.001);
    });

    let opacity_keys = [
      new THREE.Vector3(mesh_terrain.material.opacity,0,0),
      new THREE.Vector3(1,0,0)
    ];
    anim_gens.push(gen_vec1(mesh_terrain.material, 'opacity', opacity_keys, 180));

    land.children.forEach(p => {
      let scale_keys = [
        p.scale.clone(),
        new THREE.Vector3(1, 1, 1),
      ]
      anim_gens.push(gen_vec3(p, 'scale', scale_keys, 60));
    });
    
    let rot_keys = [
      world.rotation.toVector3(),
      new THREE.Vector3(-1, 0, Math.PI/2),
      new THREE.Vector3(-0.5, 0, Math.PI*2 - Math.PI/2),
      new THREE.Vector3(0,0,0 + Math.PI*2)
    ];
    anim_gens.push(gen_vec3(world, 'rotation', rot_keys, 300));
    let seqs = [
      { task: () => { world.rotation.set(0, 0, 0); }, time: 5.5 }
    ];
    do_sequences(seqs);

    let pos_keys = [
      world.position.clone(),
      new THREE.Vector3(-27,0,0)
    ];
    anim_gens.push(gen_vec3(world, 'position', pos_keys, 180));
  }
  
  let ep = {
    name: '벌써 갈 시간이 다 되었네',
    dur: 30,
    el: el,
    begin: begin,
  };
  
  return ep;
}