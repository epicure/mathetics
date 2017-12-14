function phong_based_vs_str(head_str, body_str) {
  let vs = `
    #define PHONG
    #define USE_SHADOWMAP
    varying vec3 vViewPosition;
    #ifndef FLAT_SHADED
        varying vec3 vNormal;
    #endif
    #include <common>
    #include <uv_pars_vertex>
    #include <uv2_pars_vertex>
    #include <displacementmap_pars_vertex>
    #include <envmap_pars_vertex>
    #include <color_pars_vertex>
    #include <fog_pars_vertex>
    #include <morphtarget_pars_vertex>
    #include <skinning_pars_vertex>
    #include <shadowmap_pars_vertex>
    #include <logdepthbuf_pars_vertex>
    #include <clipping_planes_pars_vertex>
    
    //varying vec2 vUv;
    ${head_str}

    void main() {
        #include <uv_vertex>
        #include <uv2_vertex>
        #include <color_vertex>
        #include <beginnormal_vertex>
        #include <morphnormal_vertex>
        #include <skinbase_vertex>
        #include <skinnormal_vertex>
        #include <defaultnormal_vertex>

        //vUv = uv;
        ${body_str}

    #ifndef FLAT_SHADED
        vNormal = normalize( transformedNormal );
    #endif
        #include <begin_vertex>
        #include <morphtarget_vertex>
        #include <skinning_vertex>
        #include <displacementmap_vertex>
        #include <project_vertex>
        #include <logdepthbuf_vertex>
        #include <clipping_planes_vertex>
        vViewPosition = - mvPosition.xyz;
        #include <worldpos_vertex>
        #include <envmap_vertex>
        #include <shadowmap_vertex>
        #include <fog_vertex>
    }
  `;
  return vs;
}

function phong_based_fs_str(head_str, body_str) {
  let fs = `
    #define PHONG
    #define USE_SHADOWMAP
    #define SHADOWMAP_TYPE_PCF_SOFT
    uniform vec3 diffuse;
    uniform vec3 emissive;
    uniform vec3 specular;
    uniform float shininess;
    uniform float opacity;
    #include <common>
    #include <packing>
    #include <dithering_pars_fragment>
    #include <color_pars_fragment>
    #include <uv_pars_fragment>
    #include <uv2_pars_fragment>
    #include <map_pars_fragment>
    #include <alphamap_pars_fragment>
    #include <aomap_pars_fragment>
    #include <lightmap_pars_fragment>
    #include <emissivemap_pars_fragment>
    #include <envmap_pars_fragment>
    #include <gradientmap_pars_fragment>
    #include <fog_pars_fragment>
    #include <bsdfs>
    #include <lights_pars>
    #include <lights_phong_pars_fragment>
    #include <shadowmap_pars_fragment>
    #include <bumpmap_pars_fragment>
    #include <normalmap_pars_fragment>
    #include <specularmap_pars_fragment>
    #include <logdepthbuf_pars_fragment>
    #include <clipping_planes_pars_fragment>

    //varying vec2 vUv;
    //uniform float time;
    ${head_str}

    void main() {
        #include <clipping_planes_fragment>
        vec4 diffuseColor = vec4( diffuse, opacity );
        ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
        vec3 totalEmissiveRadiance = emissive;
        #include <logdepthbuf_fragment>
        #include <map_fragment>
        #include <color_fragment>
        #include <alphamap_fragment>
        #include <alphatest_fragment>
        #include <specularmap_fragment>
        #include <normal_fragment>
        #include <emissivemap_fragment>
        #include <lights_phong_fragment>
        #include <lights_template>
        #include <aomap_fragment>
        vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
        #include <envmap_fragment>
        //vec2 p = gl_FragCoord.xy / vec2(100.0, 100.0);
        //gl_FragColor = vec4( outgoingLight, diffuseColor.a );
        //gl_FragColor = vec4( 1.0,0.0,0.0,1.0 ) * (sin(length(vUv) * 100.0)*0.5 + 0.5) * 0.1;
        //float ef = (sin(length(vUv - 0.5) * 100.0 - time*5.0)*0.5 + 0.5);
        //gl_FragColor = vec4( outgoingLight, diffuseColor.a ) * ef * 0.5;
        ${body_str}
        #include <tonemapping_fragment>
        #include <encodings_fragment>
        #include <fog_fragment>
        #include <premultiplied_alpha_fragment>
        #include <dithering_fragment>
    }
  `;
  return fs;
}

function bg_vs_str() {
  let vs = `
    void main() {
        gl_Position = vec4( position, 1.0 );
    }
  `;
  return vs;
}

function bg_fs_str() {
  let fs = `
    uniform vec2 resolution;
    uniform float time;
    uniform float brightness;
    uniform vec2 mouse;
    const float pi = 3.14159265358979;

    void main() {
        vec2 p = gl_FragCoord.xy/resolution;
        vec2 m = vec2(mouse.x, mouse.y);
        p = p * 2.0 - 1.0;
        p.x *= resolution.x / resolution.y;
        m.x *= resolution.x / resolution.y;
        float d = length(p - m);
        float c = (sin(d * pi * 5.0 - time)*0.5+0.5) * (1.0 - d);
        gl_FragColor = vec4(vec3(c)*brightness*0.2,1.0);
    }
  `;
  return fs;
}