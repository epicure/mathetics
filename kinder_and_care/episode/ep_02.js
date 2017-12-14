function build_ep_02() {
  let el = document.createElement('div');
  el.className = 'ep';
  el.style.fontSize = '30px';
  
  let html = `
    <p>노원구의 총 인구 555,775명 중 만 0세에서 만 5세 까지의 어린이 인구는 23,547명 입니다. 이 어린이들을 자녀로 둔 약 2만 가정의 엄마인 여성이 있다고 추정해 볼 수 있겠죠.</p>
    <p>
      <table>
        <tbody>
          <tr>
            <th>총 인구수</th>
            <th>어린이 인구수</th>
            <th>만 0세</th>
            <th>만 1세</th>
            <th>만 2세</th>
            <th>만 3세</th>
            <th>만 4세</th>
            <th>만 5세</th>
          </tr>
          <tr>
            <td>555,775</td>
            <td>23,547</td>
            <td>3,277</td>
            <td>3,871</td>
            <td>4,112</td>
            <td>4,022</td>
            <td>3,846</td>
            <td>4,419</td>
          </tr>
        </tbody>
      </table>
    </p>
    <p>만 0세는 2017년생이고, 만 5세는 2012년생 입니다. 2012년생이 2018년 3월에 초등학교에 입학합니다.</p>
    <p>2017년 11월 현재로 보면 2017년생이 가장 적네요.</p>
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
  
  function begin() {
    let opacity_keys = [
      new THREE.Vector3(mesh_terrain.material.opacity,0,0),
      new THREE.Vector3(0,0,0)
    ];
    anim_gens.push(gen_vec1(mesh_terrain.material, 'opacity', opacity_keys, 180));
    
    land.children.forEach(p => {
      let scale_keys = [
        p.scale.clone(),
        new THREE.Vector3(0.75, 0.75, 1),
      ]
      anim_gens.push(gen_vec3(p, 'scale', scale_keys, 60 * 5));
    });
    
    land.children.forEach(p => {
      let rotation_keys = Array(2).fill().map(o => {
        return new THREE.Vector3(
          (1-Math.random()*2)*Math.PI*0.25,
          (1-Math.random()*2)*Math.PI*0.25,
          (1-Math.random()*2)*Math.PI*0.25
        );
      });
      rotation_keys.unshift(p.rotation.toVector3());
      rotation_keys.push(new THREE.Vector3(0,0,0));
      anim_gens.push(gen_vec3(p, 'rotation', rotation_keys, 60 * 5));
    });
    
    land.children.forEach(p => {
      let color_keys = Array(10).fill().map(o => {
        let gray = Math.random() * 0.2;
        return new THREE.Vector3(
          p.color[0] + gray,
          p.color[1] + gray,
          p.color[2] + gray
        );
      });
      color_keys.unshift(new THREE.Vector3(...p.material.color.toArray())); 
      color_keys.push(new THREE.Vector3(...p.color));
      anim_gens.push(gen_color(p.material, 'color', color_keys, 60 * 5));
    });
  }
  
  let ep = {
    name: '노원구의 어린이 인구',
    dur: 30,
    el: el,
    begin: begin,
  };
  
  return ep;
}