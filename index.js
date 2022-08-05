
window.onload = function () {
  // ネズミと木
  const ShowNezumiTree = function () {
    const nezumi = document.getElementById('nezumi');
    const tree = document.getElementById('tree');
    nezumi.classList.add('show');
    tree.classList.add('show');
  };
  setTimeout(ShowNezumiTree, 2000);

  // ナビバー
  const ChangeNavi = function () {
    // 位置取得（ホームタイトル）
    const navi = document.getElementById('navi');
    const title = document.getElementById('home-title');
    const rectTitle = title.getBoundingClientRect();

    // スクロール量取得
    const scrollTop = window.pageYOffset;

    if (scrollTop > rectTitle.top) {
      navi.classList.add('shadow');
    } else {
      navi.classList.remove('shadow');
    }
  };
  window.addEventListener('scroll', ChangeNavi);

  // ページトップボタン
  const ShowPageTop = function () {
    // 位置取得（ページトップボタン）
    const pageTop = document.getElementById('page_top');
    const rect = pageTop.getBoundingClientRect();

    // スクロール量取得
    const scrollTop = window.pageYOffset;

    if (scrollTop > rect.top) {
      pageTop.classList.add('show');
    } else {
      pageTop.classList.remove('show');
    }
  };
  window.addEventListener('scroll', ShowPageTop);

  // ポップアップ画像設定
  const popup = document.getElementById('popup');
  const btnPopupLeft = document.querySelector('.left-link');
  const btnPopupRight = document.querySelector('.right-link');
  const txtPopupMessage = document.querySelector('.view-txt');
  const txtPopupPaging = document.querySelector('.view-paging');
  const imgList = {
    "free": {
      "3": [
        {"class":'.free_003_01', "msg":'ログイン画面（共通）'},
        {"class":'.free_003_02', "msg":'待機画面（タブレット）'},
        {"class":'.free_003_03', "msg":'入力画面（タブレット）'},
        {"class":'.free_003_04', "msg":'モニター画面（館内PC）'}
      ],
      "2": [
        {"class":'.free_002_01', "msg":'ロゴデザイン'},
        {"class":'.free_002_02', "msg":'名刺デザイン'}
      ],
      "1": [
        {"class":'.free_001_01', "msg":'ログイン画面'},
        {"class":'.free_001_02', "msg":'パスワード再発行画面'},
        {"class":'.free_001_03', "msg":'一覧画面'},
        {"class":'.free_001_04', "msg":'詳細画面'}
      ]
    }
  }
  let name = "";
  let number = "";
  let count = 0;
  let currentImg = null;

  // ポップアップ画像 表示変更処理
  const ChangeImgPopup = function () {
    if (name == "" || number == "") return;
    if (count <= 0) {
      count = 0;
      btnPopupLeft.classList.remove('show');
    } else {
      btnPopupLeft.classList.add('show');
    }
    if (count >= imgList[name][number].length - 1) {
      count = imgList[name][number].length - 1;
      btnPopupRight.classList.remove('show');
    } else {
      btnPopupRight.classList.add('show');
    }
    if (currentImg) {
      currentImg.classList.remove('show');
    }
    currentImg = popup.querySelector(imgList[name][number][count].class);
    currentImg.classList.add('show');
    txtPopupMessage.textContent = imgList[name][number][count].msg;
    txtPopupPaging.textContent = (count + 1) + "/" + imgList[name][number].length;
  };

  // ポップアップ画像 戻るボタン
  const BackImgPopup = function () {
    count--;
    ChangeImgPopup();
  };
  btnPopupLeft.addEventListener('click', BackImgPopup);
  
  // ポップアップ画像 進むボタン
  const NextImgPopup = function () {
    count++;
    ChangeImgPopup();
  };
  btnPopupRight.addEventListener('click', NextImgPopup);
  
  // 画像ポップアップ表示
  const ShowImgPopup = function (e) {
    // 初期化
    name = e.currentTarget.dataset.name;
    number = e.currentTarget.dataset.number;
    count = 0;
    if (name == "" || number == "") return;
    // ポップアップ表示
    ChangeImgPopup();
    popup.classList.add('show');
  };
  const btnCardPopupList = document.querySelectorAll('.card-popup');
  btnCardPopupList.forEach(function (btnCardPopup) {
    btnCardPopup.addEventListener('click', ShowImgPopup);
  });

  // 画像ポップアップ非表示
  const HideImgPopup = function () {
    popup.classList.remove('show');
  };
  const btnPopupClose = document.querySelector('.close-link');
  btnPopupClose.addEventListener('click', HideImgPopup);

  // スライドメニュー
  const OpenSideMenu = function () {
    const side = document.getElementById('side_navi');
    side.classList.toggle('open');
  };
  const btnBurger = document.querySelector('.burger-btn');
  const btnClose = document.querySelector('.close-btn');
  const btnSideList = document.querySelectorAll('.side-btn');
  btnBurger.addEventListener('click', OpenSideMenu);
  btnClose.addEventListener('click', OpenSideMenu);
  btnSideList.forEach(function (btnSide) {
    btnSide.addEventListener('click', OpenSideMenu);
  });

  // リンク
  const LinkIdRemove = function (e) {
    const href = e.currentTarget.href;
    const target = document.getElementById(e.currentTarget.hash.split('#')[1]);
    if (target) {
      var goleY = target.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo(0, goleY);
    }
    if (target || href.slice(-1) == '#') {
      e.preventDefault();
    }
  };

  const linkList = document.querySelectorAll('a');
  linkList.forEach(function (link) {
    link.addEventListener('click', LinkIdRemove);
  });

  // 自動スクロール
  // const home = document.getElementById('home');
  // // home.addEventListener('click', scrollPage);
  // home.addEventListener('click', function () {
  //   setTimeout("scrollPage()", 2000);
  // });

  // ローディング
  const spinner = document.getElementById('loading');
  spinner.classList.add('loaded');
};

// // スクロール速度（ミリ秒）
// const speed = 1;
// function scrollPage() {
//   window.scrollBy(0, 3);
//   setTimeout("scrollPage()", speed);
// }