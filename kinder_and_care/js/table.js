function build_kinder_table(el, kinder) {
  let html;
  if(kinder.status != '폐원') {
    if(!kinder.stat.영유아및교직원) return;
    if(!kinder.stat.영유아및교직원.교사의현기관근속연수) return;
    let years = [
      kinder.stat.영유아및교직원.교사의현기관근속연수["1년미만"]|0,
      kinder.stat.영유아및교직원.교사의현기관근속연수["1년이상2년미만"]|0,
      kinder.stat.영유아및교직원.교사의현기관근속연수["2년이상4년미만"]|0,
      kinder.stat.영유아및교직원.교사의현기관근속연수["4년이상6년미만"]|0,
      kinder.stat.영유아및교직원.교사의현기관근속연수["6년이상"]|0,
    ];
    let num_t = years.reduce((a,b)=>a+b);

    let nj = [
      kinder.stat.영유아및교직원.연령별학급현황.연령별.만3세.모집정원|0,
      kinder.stat.영유아및교직원.연령별학급현황.연령별.만4세.모집정원|0,
      kinder.stat.영유아및교직원.연령별학급현황.연령별.만5세.모집정원|0,
    ];
    
    let nh = [
      kinder.stat.영유아및교직원.연령별학급현황.연령별.만3세.현원|0,
      kinder.stat.영유아및교직원.연령별학급현황.연령별.만4세.현원|0,
      kinder.stat.영유아및교직원.연령별학급현황.연령별.만5세.현원|0,
    ];
    
    // 혼합연령을 넣지 않은 문제가 있다.
    let sum_nj = nj.reduce((a,b)=>a+b);
    let sum_nh = nh.reduce((a,b)=>a+b);
    let per_nhj = (sum_nh / sum_nj * 100)|0;
    
    html = `
      <p>${kinder.form} 유치원</p>
      <p>${kinder.addr}</p>
      <div class="br"></div>
      <p>연령별 학급 현황</p>
      <table>
        <tbody>
          <tr>
            <th>인가 총 정원</th>
            <th>총 현원</th>
            <th>구분</th>
            <th>만 3세</th>
            <th>만 4세</th>
            <th>만 5세</th>
          </tr>
          <tr>
            <td rowspan="3">${kinder.stat.영유아및교직원.연령별학급현황.인가총정원|0}</td>
            <td rowspan="3">${kinder.stat.영유아및교직원.연령별학급현황.총현원|0}</td>
            <th>학급수</th>
            <td>${kinder.stat.영유아및교직원.연령별학급현황.연령별.만3세.학급수|0}</td>
            <td>${kinder.stat.영유아및교직원.연령별학급현황.연령별.만4세.학급수|0}</td>
            <td>${kinder.stat.영유아및교직원.연령별학급현황.연령별.만5세.학급수|0}</td>
          </tr>
          <tr>
            <th>모집정원</th>
            <td>${nj[0]}</td>
            <td>${nj[1]}</td>
            <td>${nj[2]}</td>
          </tr>
          <tr>
            <th>현원</th>
            <td>${nh[0]}</td>
            <td>${nh[1]}</td>
            <td>${nh[2]}</td>
          </tr>
        </tbody>
      </table>
      <p>모집정원 ${sum_nj}명 중 ${per_nhj}%인 ${sum_nh}명이 현원</p>
      <div class="br"></div>
      <p>교사 현황, 현 기관 근속연수</p>
      <table>
        <tbody>
          <tr>
            <th>교사</th>
            <th>1년미만</th>
            <th>1년&lt;2년</th>
            <th>2년&lt;4년</th>
            <th>4년&lt;6년</th>
            <th>6년이상</th>
          </tr>
          <tr>
            <td>${num_t}</td>
            <td>${years[0]}</td>
            <td>${years[1]}</td>
            <td>${years[2]}</td>
            <td>${years[3]}</td>
            <td>${years[4]}</td>
          </tr>
        </tbody>
      </table>
      <div class="br"></div>
      <p>유치원 정보공시 2017년 2차, http://e-childschoolinfo.moe.go.kr</p>
    `;
  }
  else {
    html = `
      <p>${kinder.form} 유치원</p>
      <p>${kinder.addr}</p>
      <div class="br"></div>
      <p>폐원</p>
    `;
  }
  
  el.innerHTML = html;
}

function build_care_table(el, kinder) {
  let html;
  if(kinder.status != '폐원') {
    if(!kinder.stat.영유아및교직원) return;
    if(!kinder.stat.영유아및교직원.교사의현기관근속연수) return;
    let years = [
      kinder.stat.영유아및교직원.교사의현기관근속연수["1년미만"]|0,
      kinder.stat.영유아및교직원.교사의현기관근속연수["1년이상2년미만"]|0,
      kinder.stat.영유아및교직원.교사의현기관근속연수["2년이상4년미만"]|0,
      kinder.stat.영유아및교직원.교사의현기관근속연수["4년이상6년미만"]|0,
      kinder.stat.영유아및교직원.교사의현기관근속연수["6년이상"]|0,
    ];
    let num_t = years.reduce((a,b)=>a+b);
    
    let nj = [
      kinder.stat.영유아및교직원.연령별반현황.연령별.만0세['정원']|0,
      kinder.stat.영유아및교직원.연령별반현황.연령별.만1세['정원']|0,
      kinder.stat.영유아및교직원.연령별반현황.연령별.만2세['정원']|0,
      kinder.stat.영유아및교직원.연령별반현황.연령별.만3세['정원']|0,
      kinder.stat.영유아및교직원.연령별반현황.연령별.만4세['정원']|0,
      kinder.stat.영유아및교직원.연령별반현황.연령별.만5세['정원']|0,
      kinder.stat.영유아및교직원.연령별반현황.연령별['영아혼합']['정원']|0,
      kinder.stat.영유아및교직원.연령별반현황.연령별['유아혼합']['정원']|0,
      kinder.stat.영유아및교직원.연령별반현황.연령별['특수/장애아']['정원']|0,
      kinder.stat.영유아및교직원.연령별반현황.연령별['기타']['정원']|0,
    ];
    
    let nh = [
      kinder.stat.영유아및교직원.연령별반현황.연령별.만0세['현원']|0,
      kinder.stat.영유아및교직원.연령별반현황.연령별.만1세['현원']|0,
      kinder.stat.영유아및교직원.연령별반현황.연령별.만2세['현원']|0,
      kinder.stat.영유아및교직원.연령별반현황.연령별.만3세['현원']|0,
      kinder.stat.영유아및교직원.연령별반현황.연령별.만4세['현원']|0,
      kinder.stat.영유아및교직원.연령별반현황.연령별.만5세['현원']|0,
      kinder.stat.영유아및교직원.연령별반현황.연령별['영아혼합']['현원']|0,
      kinder.stat.영유아및교직원.연령별반현황.연령별['유아혼합']['현원']|0,
      kinder.stat.영유아및교직원.연령별반현황.연령별['특수/장애아']['현원']|0,
      kinder.stat.영유아및교직원.연령별반현황.연령별['기타']['현원']|0,
    ];
    
    let sum_nj = nj.reduce((a,b)=>a+b);
    let sum_nh = nh.reduce((a,b)=>a+b);
    let per_nhj = (sum_nh / sum_nj * 100)|0;

    html = `
      <p>${kinder.form} 어린이집</p>
      <p>${kinder.addr}</p>
      <div class="br"></div>
      <p>연령별 학급 현황</p>
      <table>
        <tbody>
          <tr>
            <th class="care">총정원</th>
            <th class="care">총인원</th>
            <th class="care">구분</th>
            <th class="care">만0세</th>
            <th class="care">만1세</th>
            <th class="care">만2세</th>
            <th class="care">만3세</th>
            <th class="care">만4세</th>
            <th class="care">만5세</th>
            <th class="care">영아혼합</th>
            <th class="care">유아혼합</th>
            <th class="care">특수/장애아</th>
            <th class="care">기타</th>
          </tr>
          <tr>
            <td rowspan="3">${kinder.stat.영유아및교직원.연령별반현황.총정원|0}</td>
            <td rowspan="3">${kinder.stat.영유아및교직원.연령별반현황.총인원|0}</td>
            <th class="care">학급/반수</th>
            <td>${kinder.stat.영유아및교직원.연령별반현황.연령별.만0세['학급/반수']|0}</td>
            <td>${kinder.stat.영유아및교직원.연령별반현황.연령별.만1세['학급/반수']|0}</td>
            <td>${kinder.stat.영유아및교직원.연령별반현황.연령별.만2세['학급/반수']|0}</td>
            <td>${kinder.stat.영유아및교직원.연령별반현황.연령별.만3세['학급/반수']|0}</td>
            <td>${kinder.stat.영유아및교직원.연령별반현황.연령별.만4세['학급/반수']|0}</td>
            <td>${kinder.stat.영유아및교직원.연령별반현황.연령별.만5세['학급/반수']|0}</td>
            <td>${kinder.stat.영유아및교직원.연령별반현황.연령별['영아혼합']['학급/반수']|0}</td>
            <td>${kinder.stat.영유아및교직원.연령별반현황.연령별['유아혼합']['학급/반수']|0}</td>
            <td>${kinder.stat.영유아및교직원.연령별반현황.연령별['특수/장애아']['학급/반수']|0}</td>
            <td>${kinder.stat.영유아및교직원.연령별반현황.연령별['기타']['학급/반수']|0}</td>
          </tr>
          <tr>
            <th class="care">정원</th>
            <td>${nj[0]}</td>
            <td>${nj[1]}</td>
            <td>${nj[2]}</td>
            <td>${nj[3]}</td>
            <td>${nj[4]}</td>
            <td>${nj[5]}</td>
            <td>${nj[6]}</td>
            <td>${nj[7]}</td>
            <td>${nj[8]}</td>
            <td>${nj[9]}</td>
          </tr>
          <tr>
            <th class="care">현원</th>
            <td>${nh[0]}</td>
            <td>${nh[1]}</td>
            <td>${nh[2]}</td>
            <td>${nh[3]}</td>
            <td>${nh[4]}</td>
            <td>${nh[5]}</td>
            <td>${nh[6]}</td>
            <td>${nh[7]}</td>
            <td>${nh[8]}</td>
            <td>${nh[9]}</td>
          </tr>
        </tbody>
      </table>
      <p>모집정원 ${sum_nj}명 중 ${per_nhj}%인 ${sum_nh}명이 현원</p>
      <div class="br"></div>
      <p>교사 현황, 현 기관 근속연수</p>
      <table>
        <tbody>
          <tr>
            <th>교사</th>
            <th>1년미만</th>
            <th>1년&lt;2년</th>
            <th>2년&lt;4년</th>
            <th>4년&lt;6년</th>
            <th>6년이상</th>
          </tr>
          <tr>
            <td>${num_t}</td>
            <td>${years[0]}</td>
            <td>${years[1]}</td>
            <td>${years[2]}</td>
            <td>${years[3]}</td>
            <td>${years[4]}</td>
          </tr>
        </tbody>
      </table>
      <div class="br"></div>
      <p>유치원 정보공시 2017년 2차, http://e-childschoolinfo.moe.go.kr</p>
    `;
  }
  else {
    html = `<p>폐원</p>`;
  }
  
  el.innerHTML = html;
}