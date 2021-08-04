$(document).ready(function(){
    const re = /\w{4}/
    const sinaimgRe = /[http|https]*:\/\/ws[1-4].sinaimg/g
    const sinaimgs = document.querySelectorAll('img')
    const sinaLinks = document.querySelectorAll('a')
    for (let i = 0; i < sinaimgs.length; i++) {
        if(sinaimgRe.test(sinaimgs[i].src)) {
            sinaimgs[i].src = sinaimgs[i].src.replace(sinaimgRe, 'http://wx1.sinaimg')
        }
    }
    for (let i = 0; i < sinaLinks.length; i++) {
        if(sinaimgRe.test(sinaLinks[i].href)) {
            sinaLinks[i].href = sinaLinks[i].href.replace(sinaimgRe, 'http://wx1.sinaimg')
        }
    }
    const pwdEl = document.querySelector('div.panel.panel-primary > div.panel-footer > b:nth-child(1) > span')
    const pwdText = pwdEl ? pwdEl.innerText : ''
    if (pwdEl && pwdText) {
        fetch('kitslist.json')
          .then(response => response.json())
          .then(resData => {
              const item = resData.filter(i => i.pwd === pwdText.match(re)[0])
              let data = item[0]
              const linkBtn = document.querySelector('div.panel-body > a > button')
              linkBtn.setAttribute('onclick', `window.open('${ data.addr }')`)
          })
          .catch(e => {
              console.log('获取失败', e)
          })
    }

    var post_thumbnail_link = new Array();
    //steamuserimages
    post_thumbnail_link[0] = "img1.png";
    post_thumbnail_link[1] = "img2.png";
    post_thumbnail_link[2] = "img3.png";
    post_thumbnail_link[3] = "img4.png";
    post_thumbnail_link[4] = "img5.png";
    post_thumbnail_link[5] = "img6.png";

// // post_thumbnail_h_link
    var post_thumbnail_h_link = new Array();
    post_thumbnail_h_link[0] = "1.jpg";
    post_thumbnail_h_link[1] = "2.jpg";
    post_thumbnail_h_link[2] = "3.jpg";
    post_thumbnail_h_link[3] = "4.jpg";
    post_thumbnail_h_link[4] = "5.jpg";
    post_thumbnail_h_link[5] = "6.jpg";

// post_thumbnail_h_link[1000] = "";

    i = Math.floor(Math.random()*(Math.floor(post_thumbnail_link.length)));
    j = Math.floor(Math.random()*(Math.floor(post_thumbnail_link.length)));
    k = Math.floor(Math.random()*(Math.floor(post_thumbnail_link.length)));
    l = Math.floor(Math.random()*(Math.floor(post_thumbnail_link.length)));
    m = Math.floor(Math.random()*(Math.floor(post_thumbnail_link.length)));
    n = Math.floor(Math.random()*(Math.floor(post_thumbnail_link.length)));
    h = Math.floor(Math.random()*(Math.floor(post_thumbnail_h_link.length)));

    $(".li_img1").css('backgroundImage','url(bgimg/' + post_thumbnail_link[i] + ')');
    $(".li_img2").css('backgroundImage','url(bgimg/' + post_thumbnail_link[j] + ')');
    $(".li_img3").css('backgroundImage','url(bgimg/' + post_thumbnail_link[k] + ')');
    $(".li_img4").css('backgroundImage','url(bgimg/' + post_thumbnail_link[l] + ')');
    $(".li_img5").css('backgroundImage','url(bgimg/' + post_thumbnail_link[m] + ')');
    $(".li_img6").css('backgroundImage','url(bgimg/' + post_thumbnail_link[n] + ')');
    $(".h_img").css('background','url(bgimg/' + post_thumbnail_h_link[h] + ')');
});
