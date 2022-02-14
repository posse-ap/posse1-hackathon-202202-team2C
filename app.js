

$(function () {
    /*=================================================
    ハンバーガ―メニュー
    ===================================================*/
    // ハンバーガーメニューをクリックした時
    $('.hamburger').on('click', function () {
        // ハンバーガーメニューの共通処理を呼び出す
        hamburger();
    });
    // メニューのリンクをクリックした時
    $('#navi a').on('click', function () {
        // ハンバーガーメニューの共通処理を呼び出す
        hamburger();
    });

    /*=================================================
    Inview（画面に表示されたタイミングで処理を実行）
    ===================================================*/
    // BBBが選ばれる理由（スライド左）
    $('.inview-slide-left').on('inview', function (event, isInView, visiblePartX, visiblePartY) {
        if (isInView) {
            // 要素が表示されたらslide-leftクラスを追加
            $(this).stop().addClass('slide-left');
        }
    });
    // BBBが選ばれる理由（スライド右）
    $('.inview-slide-right').on('inview', function (event, isInView, visiblePartX, visiblePartY) {
        if (isInView) {
            // 要素が表示されたらslide-rightクラスを追加
            $(this).stop().addClass('slide-right');
        }
    });
    // 受講生の声（ふきだし）
    $('.inview-balloon').on('inview', function (event, isInView, visiblePartX, visiblePartY) {
        if (isInView) {
            // 要素が表示されたらballoonクラスを追加
            $(this).stop().addClass('balloon');
        }
    });
});

/*=================================================
ハンバーガ―メニュー共通処理
===================================================*/
// ハンバーガーメニューをクリックした時とメニュー内のリンクをクリックした時の
// 処理が同じなので処理を共通化する
function hamburger() {
    // toggleClassを使用することで、hamburgerクラスにactiveクラスが存在する場合は削除、
    // 存在しない場合を追加する処理を自動で行ってくれる
    $('.hamburger').toggleClass('active');

    if ($('.hamburger').hasClass('active')) {
        // hamburgerクラスにactiveクラスが存在する場合は、naviにもactiveクラスを追加する
        $('#navi').addClass('active');
    } else {
        // hamburgerクラスにactiveクラスが存在しない場合は、naviからactiveクラスを削除する
        $('#navi').removeClass('active');
    }
}



window.addEventListener('DOMContentLoaded', ()=>{document.getElementById('issueInputForm').addEventListener('submit', saveIssue);});



//イシュー登録機能
function saveIssue(e) {
    var issueDesc = document.getElementById('issueDescInput').value;//イシュー内容
    var issueSeverity = document.getElementById('issueSeverityInput').value;//イシューの緊急度
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value;//イシューの担当者
    // var issueAssignedTo1 = document.getElementById('issueAssignedToInput1').value;//イシューの担当者
    var issueId = chance.guid();//イシューid
    var issueStatus = 'Open';//イシューの初期状態

    console.log(issueSeverity);

    var issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        // assignedTo1: issueAssignedTo1,
        status: issueStatus
    }
    //localStorageとは、Webブラウザにデータを保存する領域のことです。ブラウザを閉じても保存されたままであることが特徴になります。このlocalStorageを使って、データを保存したり取得したりすることができます。
    if (localStorage.getItem('issues') == null) {
        //ローカルストレージに何もデータがない時、issuesを配列化してそこへフォームのイシュー内容を追加する
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));//サーバー通信する際に送信するデータは、JSON構造のデータに「シリアライズ化」という処理を施す
    } else {
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }
    //フォームの内容をリセットする
    document.getElementById('issueInputForm').reset();

    //イシューの内容をサイト下部に表示させるための処理
    fetchIssues();

    //submitイベントの発生元であるフォームが持つデフォルトの動作をキャンセルするメソッドです。
    e.preventDefault();

    console.log(issues);
}


//クローズボタンを押した時の処理
function setStatusClosed(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));

    for (var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues[i].status = 'Closed';//状態をcloseに変更
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}


//デリートボタンを押したときの処理
function deleteIssue(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));

    for (var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues.splice(i, 1);//イシューを配列から削除させる
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();

}




//イシューをページ下部に表示
function fetchIssues() {
    var issues = JSON.parse(localStorage.getItem('issues'));
    issues.sort((a, b) => {
        return a.severity - b.severity
    })
    issues.reverse();
    console.log(issues);
    var issuesList = document.getElementById('issuesList');
    //イシューのリストを一旦空にする（最新のものだけを表示させるため）
    issuesList.innerHTML = '';
    //イシューの数分だけ作成
    for (var i = 0; i < 5; i++) {
        var id = issues[i].id;
        var desc = issues[i].description;
        var severity = issues[i].severity;
        var assignedTo = issues[i].assignedTo;
        // var assignedTo1 = issues[i].assignedTo1;
        var status = issues[i].status;

        // console.log(issues);

        issuesList.innerHTML += '<div class="ranking-container">' + 
            '<div class="well">' +
            // '<h6>Issue ID: ' + id + '</h6>'+
            // '<p><span class="label label-info">' + status + '</span></p>'+
            '<p> ' + [i + 1] + '</p>' +
            '<h3>' + desc + '</h3>' +
            '<p><span class="glyphicon glyphicon-star"></span> ' + severity + '</p>' +
            '<p><span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>' +
            // '<link><span class="glyphicon glyphicon-user"></span> ' + assignedTo1 + '</link>'+
            '<a href="#" onclick="setStatusClosed(\'' + id + '\')" class="btn btn-warning">Close</a> ' +
            '<a href="#" onclick="deleteIssue(\'' + id + '\')" class="btn btn-danger">Delete</a>' +
            '</div>' +
            // 画像ファイルの追加とプレビュー
            '<div class="preview-img">' +
            '<input type="file" id="example '+[i]+'" multiple>' +
            '<div id="preview '+[i]+'"></div>' +
            '</div>' + 
            '</div>';

            function previewFile(file) {
                // プレビュー画像を追加する要素
                const preview = document.getElementById('preview '+[i]+'');
            
                // FileReaderオブジェクトを作成
                const reader = new FileReader();
            
                // ファイルが読み込まれたときに実行する
                reader.onload = function (e) {
                  const imageUrl = e.target.result; // 画像のURLはevent.target.resultで呼び出せる
                  const img = document.createElement("img"); // img要素を作成
                  img.src = imageUrl; // 画像のURLをimg要素にセット
                  preview.appendChild(img); // #previewの中に追加
                }
            
                // いざファイルを読み込む
                reader.readAsDataURL(file);
            }
            
            
              // <input>でファイルが選択されたときの処理
            const fileInput = document.getElementById('example '+[i]+'');
            const handleFileSelect = () => {
                const files = fileInput.files;
                // for (let i = 0; i < files.length; i++) {
                // previewFile(files[i]);
                // }
                files.forEach(file => {
                    previewFile(file);
                });
            }
            fileInput.addEventListener('change', handleFileSelect);
    }
}

//タブ切り替え機能

function displaySelected(panel1,panel2,panel3,panel4,panel5,button){
  panel1.style.display = 'block';
  panel2.style.display = 'none';
  panel3.style.display = 'none';
  panel4.style.display = 'none';
  panel5.style.display = 'none';
  button.setAttribute('aria-selected',true);
}

function changeDisplay(element){
  const panel1 = document.getElementById('panel1');
  const panel2 = document.getElementById('panel2');
  const panel3 = document.getElementById('panel3');
  const panel4 = document.getElementById('panel4');
  const panel5 = document.getElementById('panel5');
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.setAttribute('aria-selected', false);
  })
  switch(element){
    case 'movie':
      displaySelected(panel1,panel2,panel3,panel4,panel5,buttons[0]);
      break;
    case 'book':
      displaySelected(panel2,panel1,panel3,panel4,panel5,buttons[1]);
      break;
    case 'music':
      displaySelected(panel3,panel1,panel2,panel4,panel5,buttons[2]);
      break;
    case 'game':
      displaySelected(panel4,panel1,panel2,panel3,panel5,buttons[3]);
      break;
    default:
      displaySelected(panel5,panel1,panel2,panel3,panel4,buttons[4]);
      break;
  }
}
// ここから画像のアップロード
// function previewFile(file) {
//     // プレビュー画像を追加する要素
//     const preview = document.getElementById('preview');

//     // FileReaderオブジェクトを作成
//     const reader = new FileReader();

//     // ファイルが読み込まれたときに実行する
//     reader.onload = function (e) {
//       const imageUrl = e.target.result; // 画像のURLはevent.target.resultで呼び出せる
//       const img = document.createElement("img"); // img要素を作成
//       img.src = imageUrl; // 画像のURLをimg要素にセット
//       preview.appendChild(img); // #previewの中に追加
//     }

//     // いざファイルを読み込む
//     reader.readAsDataURL(file);
// }


//   // <input>でファイルが選択されたときの処理
// const fileInput = document.getElementById('example');
// const handleFileSelect = () => {
//     const files = fileInput.files;
//     for (let i = 0; i < files.length; i++) {
//     previewFile(files[i]);
//     }
// }
// fileInput.addEventListener('change', handleFileSelect);
