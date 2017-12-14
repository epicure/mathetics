function build_ep_04() {
  let el = document.createElement('div');
  el.className = 'ep';
  el.style.fontSize = '30px';
  
  let html = `
    <p>노원구의 어린이집은 <q0>국공립</q0>, <q0>가정</q0>, <q0>민간</q0>, <q0>직장</q0>, <q0>협동</q0>, <q0>사회복지법인</q0>, <q0>법인·단체등</q0>의 일곱 가지 유형이 있고,</p>

    <p>
      <table>
        <tbody>
          <tr>
            <th>어린이집 유형</th>
            <th><q0>국공립</q0></th>
            <th><q0>가정</q0></th>
            <th><q0>민간</q0></th>
            <th><q0>직장</q0></th>
            <th><q0>협동</q0></th>
            <th><q0>사회복지법인</q0></th>
            <th><q0>법인·단체등</q0></th>
          </tr>
          <tr>
            <th>기관수</th>
            <td>${sp3(nc['국공립'])}</td>
            <td>${sp3(nc['가정'])}</td>
            <td>${sp3(nc['민간'])}</td>
            <td>${sp3(nc['직장'])}</td>
            <td>${sp3(nc['협동'])}</td>
            <td>${sp3(nc['사회복지법인'])}</td>
            <td>${sp3(nc['법인·단체등'])}</td>
          </tr>
          <tr>
            <th>어린이수</th>
            <td>${sp3(cnc['국공립'])}</td>
            <td>${sp3(cnc['가정'])}</td>
            <td>${sp3(cnc['민간'])}</td>
            <td>${sp3(cnc['직장'])}</td>
            <td>${sp3(cnc['협동'])}</td>
            <td>${sp3(cnc['사회복지법인'])}</td>
            <td>${sp3(cnc['법인·단체등'])}</td>
          </tr>
        </tbody>
      </table>
    </p>

    <p>유치원은 <q0>공립(병설)</q0>, <q0>공립(단설)</q0>, <q0>사립(사인)</q0>, <q0>사립(법인)</q0>의 네 가지 유형이 있습니다. 이 기관들은 크게 국공립과 사립의 두 가지 유형으로 다시 나눌 수 있죠.</p>

    <p>
      <table>
        <tbody>
          <tr>
            <th>유치원 유형</th>
            <th><q0>공립(병설)</q0></th>
            <th><q0>공립(단설)</q0></th>
            <th><q0>사립(사인)</q0></th>
            <th><q0>사립(법인)</q0></th>
          </tr>
          <tr>
            <th>기관수</th>
            <td>${sp3(nk['공립(병설)'])}</td>
            <td>${sp3(nk['공립(단설)'])}</td>
            <td>${sp3(nk['사립(사인)'])}</td>
            <td>${sp3(nk['사립(법인)'])}</td>
          </tr>
          <tr>
            <th>어린이수</th>
            <td>${sp3(cnk['공립(병설)'])}</td>
            <td>${sp3(cnk['공립(단설)'])}</td>
            <td>${sp3(cnk['사립(사인)'])}</td>
            <td>${sp3(cnk['사립(법인)'])}</td>
          </tr>
        </tbody>
      </table>
    </p>

    <p>세금의 사용, 부모의 비용 부담 그리고 어린이가 하는 경험이 관련이 있습니다.</p>

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
    name: '노원구의 어린이집과 유치원 유형',
    dur: 30,
    el: el,
    begin: begin,
  };
  
  return ep;
}