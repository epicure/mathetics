let episode_list = [];

function to_won(n) {
  var s = String(n).split('');
  var slots = [];
  while(s.length > 0) {
    slots.unshift(s.splice(-3).join(''));
  }
  return slots.join(',');
}

function goto_episode_by_index(idx) {
  scroll_to_episode();
  if(idx >= 0 && idx < episode_list.length) {
    let ep = episode_list[idx];
    curr_episode = ep;
    wait_episode_dur = ep.dur * 60 | 0;
    wait_episode = wait_episode_dur;
    el_chapter_scroll.style.left = -ep.pos + 'px';
    episode_title_trans = trans_text(el_episode_name.textContent, ep.name);
    if(ep.begin) {
      ep.begin();
    }
  }
}

function goto_next_episode() {
  if(curr_episode) {
    let idx = episode_list.indexOf(curr_episode);
    if(idx != -1) {
      idx += 1;
      if(idx > episode_list.length - 1) {
        idx = 0;
      }
      goto_episode_by_index(idx);
    }
  }
}

function scroll_to_info() {
  el_info.style.top = '0px';
  el_episode.style.top = '-1080px';
  wait_info = wait_info_dur;
}

function scroll_to_episode() {
  el_info.style.top = '1080px';
  el_episode.style.top = '0px';
  indicator.visible = false;
}

function init_episode() {
  let build_list = [
    build_ep_00,
    //build_ep_01,
    //build_ep_02,
    build_ep_03,
  ];

  build_list.forEach((build, i) => {
    let ep = build();
    ep.pos = i * 1120;
    ep.el.style.left = ep.pos + 'px';
    el_chapter_scroll.appendChild(ep.el);
    episode_list.push(ep);
  });

  goto_episode_by_index(0);
}