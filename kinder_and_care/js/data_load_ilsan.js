let regions = [];
let kinders = null;

function fromCoordToPlane(e, n) {
  let c = {
    "name": "UTMK",
    "datum": "GRS80",
    "lat0": 0.6632251157578453,
    "lng0": 2.2252947962927703,
    "a": 6378137,
    "b": 6356752.314140356,
    "falseNorthing": 2000000,
    "falseEasting": 1000000,
    "scaleFactor": 0.9996,
    "minX": 340901120,
    "maxX": 359494656,
    "minY": 141928960,
    "maxY": 157454848,
    "TILE_SIZE": 256,
    "BASE_X": 90112,
    "BASE_Y": 668608,
    "POINT_UNIT_PER_METER": 8192,
    "a2": 40680631590769,
    "b2": 40408299983328.77,
    "es": 0.006694380022900686,
    "e": 0.08181919104281517,
    "ep2": 0.006739496775478856,
    "e0": 0.9983242984445848,
    "e1": 0.0025146070728447817,
    "e2": 0.000002639046620230819,
    "e3": 3.418046136775059e-9,
    "ml0": 4207498.019150324
  };
  let radianPerDegree = 0.017453292519943295;
  function s(t) {
    return t * radianPerDegree;
  }
  function i(t) {
    return Math.abs(t) < r ? t : t - e(t) * h
  }
  function e(t) {
    return t < 0 ? -1 : 1
  }
  function t(t, e, i, n, o) {
    return t * o - e * Math.sin(2 * o) + i * Math.sin(4 * o) - n * Math.sin(6 * o);
  }
  //-------
  let o, r;
  if ("UTMK_TO_POINT" !== e) {
      o = s(n.x),
      r = s(n.y);
      let a = i(o - c.lng0)
        , h = Math.sin(r)
        , l = Math.cos(r)
        , u = l * a
        , p = Math.pow(u, 2)
        , d = c.ep2 * Math.pow(l, 2)
        , f = Math.tan(r)
        , g = Math.pow(f, 2)
        , _ = 1 - c.es * Math.pow(h, 2)
        , m = c.a / Math.sqrt(_)
        , y = c.a * t(c.e0, c.e1, c.e2, c.e3, r);
      o = c.scaleFactor * m * u * (1 + p / 6 * (1 - g + d + p / 20 * (5 - 18 * g + Math.pow(g, 2) + 72 * d - 58 * c.ep2))) + c.falseEasting,
      r = c.scaleFactor * (y - c.ml0 + m * f * (p * (.5 + p / 24 * (5 - g + 9 * d + 4 * Math.pow(d, 2) + p / 30 * (61 - 58 * g + Math.pow(g, 2) + 600 * d - 330 * c.ep2))))) + c.falseNorthing,
      o = parseFloat(o),
      r = parseFloat(r)
  }
  return [o, r];
}

async function load() {
  let mean_x = 0;
  let mean_y = 0;
  let min_x = Number.MAX_VALUE;
  let min_y = Number.MAX_VALUE;
  let max_x = Number.MIN_VALUE;
  let max_y = Number.MIN_VALUE;
  let map_width = 1;
  let map_height = 1;
  
  let response_kinders = await fetch('./data/일산구_유치원어린이집.json');
  kinders = await response_kinders.json();

  let response = await fetch('./data/일산구.json');
  let json = await response.json();

  let scale = 1/300;
  let sum_x = 0;
  let sum_y = 0;
  let len = 0;

  for(let feature of json) {
    /*
    if(ds.includes(feature.properties.EMD_CD)) {
      regions.push(feature);

      for(let pt of feature.geometry.coordinates[0]) {
        sum_x += pt[0];
        sum_y += pt[1];
        len++;
      }
    }
    */
    regions.push(feature);

    for(let pt of feature.geometry.coordinates[0]) {
      sum_x += pt[0];
      sum_y += pt[1];
      len++;
    }
  }

  mean_x = sum_x / len;
  mean_y = sum_y / len;
  min_x = Number.MAX_VALUE;
  min_y = Number.MAX_VALUE;
  max_x = Number.MIN_VALUE;
  max_y = Number.MIN_VALUE;

  for(let region of regions) {
    let points = [];
    for(let pt of region.geometry.coordinates[0]) {
      let x = (pt[0]-mean_x)*scale;
      let y = (pt[1]-mean_y)*scale;
      min_x = x < min_x ? x : min_x;
      min_y = y < min_y ? y : min_y;
      max_x = x > max_x ? x : max_x;
      max_y = y > max_y ? y : max_y;
      points.push([x, y]);
    }
    region.points = points;
  }

  map_width = max_x - min_x;
  map_height = max_y - min_y;

  for(let region of regions) {
    region.center = [0, 0];
    for(let pt of region.points) {
      pt[0] = pt[0] - min_x - map_width/2;
      pt[1] = pt[1] - min_y - map_height/2;
      region.center[0] += pt[0];
      region.center[1] += pt[1];
    }
    region.center[0] /= region.points.length;
    region.center[1] /= region.points.length;
    region.name = region.properties.EMD_KOR_NM;
  }

  for(let kinder of kinders) {
    let _utmk = fromCoordToPlane('LATLNG_TO_UMTK', {x: kinder.coord[1], y: kinder.coord[0]});

    kinder.point = [
      (_utmk[0]-mean_x)*scale - min_x - map_width/2,
      (_utmk[1]-mean_y)*scale - min_y - map_height/2
    ];

    kinder.rgba = [255, 255, 255, 0];
    kinder.to_rgba = [255, 255, 255, 0];

    kinder.update = function() {
      kinder.rgba[0] += (kinder.to_rgba[0] - kinder.rgba[0]) * 0.1;
      kinder.rgba[1] += (kinder.to_rgba[1] - kinder.rgba[1]) * 0.1;
      kinder.rgba[2] += (kinder.to_rgba[2] - kinder.rgba[2]) * 0.1;
      kinder.rgba[3] += (kinder.to_rgba[3] - kinder.rgba[3]) * 0.1;
    };

    kinder.color = function() {
      return 'rgba('+(kinder.rgba[0]|0)+','+(kinder.rgba[1]|0)+','+(kinder.rgba[2]|0)+','+kinder.rgba[3]+')';
    }
  }
  
  init();
  loop();
}