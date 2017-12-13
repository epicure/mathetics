function sequence(f, sec) { 
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(f());
    }, sec * 1000);
  });
}

async function do_sequences(seqs) {
  for(let seq of seqs) {
    await sequence(seq.task, seq.time);
  }
}

function* gen_color(obj, key_name, keys, step) {
  let curve = new THREE.CatmullRomCurve3(keys);
  for(let i = 0; i < step; i++) {
    let t = i / (step - 1);
    t = t*t*(3 - 2*t);
    let v = curve.getPointAt(t);
    obj[key_name].r = v.x;
    obj[key_name].g = v.y;
    obj[key_name].b = v.z;
    yield obj;
  }
}

function* gen_vec3(obj, key_name, keys, step) {
  let curve = new THREE.CatmullRomCurve3(keys);
  for(let i = 0; i < step; i++) {
    let t = i / (step - 1);
    t = t*t*(3 - 2*t);
    let v = curve.getPointAt(t);
    obj[key_name].set(v.x, v.y, v.z);
    yield obj;
  }
}

function* gen_vec1(obj, key_name, keys, step) {
  let curve = new THREE.CatmullRomCurve3(keys);
  for(let i = 0; i < step; i++) {
    let t = i / (step - 1);
    t = t*t*(3 - 2*t);
    let v = curve.getPointAt(t);
    obj[key_name] = v.x;
    yield obj;
  }
}

/*
place.children.forEach(o => {
  let pos = Array(10).fill().map((r,j) => {
    return new THREE.Vector3(
      o.position.x + (Math.random()*2-1)*3,
      o.position.y + (Math.random()*2-1)*3,
      2 + Math.sin(j/9*Math.PI) * 10
    );
  });
  pos.unshift(o.position.clone()); 
  pos.push(o.position.clone()); 
  anim_gens.push(gen_vec3(o, 'position', pos, 600+Math.random()*300|0))
})
*/

/*
land.children.forEach(o => {
  let colors = Array(10).fill().map(r => {
    return new THREE.Vector3(
      Math.random(),
      Math.random(),
      Math.random()
    );
  });
  colors.unshift(new THREE.Vector3(...o.material.color.toArray())); 
  colors.push(new THREE.Vector3(...o.material.color.toArray())); 
  anim_gens.push(gen_color(o.material, 'color', colors, 200+Math.random()*300|0))
});
*/

/*
var seqs = [
  {
    task: function() {
      place.children.forEach(o => {
        let pos = Array(10).fill().map((r,j) => {
          return new THREE.Vector3(
            o.position.x + (Math.random()*2-1)*3,
            o.position.y + (Math.random()*2-1)*3,
            2 + Math.sin(j/9*Math.PI) * 10
          );
        });
        pos.unshift(o.position.clone()); 
        pos.push(o.position.clone()); 
        anim_gens.push(gen_vec3(o, 'position', pos, 600+Math.random()*300|0))
      })
    },
    time: 0,
  },
  {
    task: function() {
      land.children.forEach(o => {
        let colors = Array(10).fill().map(r => {
          return new THREE.Vector3(
            Math.random(),
            Math.random(),
            Math.random()
          );
        });
        colors.unshift(new THREE.Vector3(...o.material.color.toArray())); 
        colors.push(new THREE.Vector3(...o.material.color.toArray())); 
        anim_gens.push(gen_color(o.material, 'color', colors, 200+Math.random()*300|0))
      });
    },
    time: 3,
  },
]
do_sequences(seqs);
*/