//イシューをページ下部に表示
function fetchIssues() {
    var issues = JSON.parse(localStorage.getItem('issues'));
    issues.sort((a, b) => {
        return a.severity - b.severity
    })
    issues.reverse();
    // console.log(issues);

    var movie = issues.filter(function (object) {
        if (object.severity1 == 1) {
            return true;
        }
    });

    var movies = [];
    movies.push(movie);

    var book = issues.filter(function (object) {
        if (object.severity1 == 2) {
            return true;
        }
    });
    var books = [];
    books.push(book);

    var music = issues.filter(function (object) {
        if (object.severity1 == 3) {
            return true;
        }
    });
    var musics = [];
    musics.push(music);

    var game = issues.filter(function (object) {
        if (object.severity1 == 4) {
            return true;
        }
    });
    var games = [];
    games.push(game);

    // var anime = issues.filter(function (object) {
    //     if (object.severity1 == 5) {
    //         return true;
    //     }
    // });

    console.log(movies);
    console.log(books);
    console.log(musics);
    console.log(games);

    // console.log(movies[0][1].description);
    // console.log(books[0][1].description)
    // console.log(musics[0][1].description)
    // console.log(games[0][1].description)

    var issuesList0 = document.getElementById('issuesList0');
    var issuesList1 = document.getElementById('issuesList1');
    var issuesList2 = document.getElementById('issuesList2');
    var issuesList3 = document.getElementById('issuesList3');

    //イシューのリストを一旦空にする（最新のものだけを表示させるため）
    issuesList0.innerHTML = '';
    issuesList1.innerHTML = '';
    issuesList2.innerHTML = '';
    issuesList3.innerHTML = '';

    // 映画
    for (var i = 0; i < 3; i++) {

        var id0 = movies[0][i].id;
        var desc0 = movies[0][i].description;
        var severity0 = movies[0][i].severity;
        // var severity1 = issues[i].severity1;
        var assignedTo0 = movies[0][i].assignedTo;
        // var assignedTo1 = issues[i].assignedTo1;
        var status0 = movies[0][i].status;


        console.log(desc0);

        issuesList0.innerHTML += '<div class="ranking-container">' +
        '<div class="well">' +
        '<p class="rank-number"> ' + [i + 1] + '　　' + desc0 + '</p>' +
        '<p><span class="glyphicon glyphicon-star"></span> ' + severity0 + '</p>' +
        '<p><span class="glyphicon glyphicon-user"></span> ' + assignedTo0 + '</p>';
    };

    // 本
    for (var i = 0; i < 3; i++) {

        var id1 = books[0][i].id;
        var desc1 = books[0][i].description;
        var severity1 = books[0][i].severity;
        var assignedTo1 = books[0][i].assignedTo;
        var status1 = books[0][i].status;

        console.log(desc1);

        issuesList1.innerHTML += '<div class="ranking-container">' +
        '<div class="well">' +
        '<p class="rank-number"> ' + [i + 1] + '　　' + desc1 + '</p>' +
        '<p><span class="glyphicon glyphicon-star"></span> ' + severity1 + '</p>' +
        '<p><span class="glyphicon glyphicon-user"></span> ' + assignedTo1 + '</p>';
    };

    //音楽
    for (var i = 0; i < 3; i++) {

        var id2 = musics[0][i].id;
        var desc2 = musics[0][i].description;
        var severity2 = musics[0][i].severity;
        var assignedTo2 = musics[0][i].assignedTo;
        var status2 = musics[0][i].status;

        console.log(desc2);

        issuesList2.innerHTML += '<div class="ranking-container">' +
        '<div class="well">' +
        '<p class="rank-number"> ' + [i + 1] + '' + desc2 + '</p>' +
        '<p><span class="glyphicon glyphicon-star"></span> ' + severity2 + '</p>' +
        '<p><span class="glyphicon glyphicon-user"></span> ' + assignedTo2 + '</p>';
    };

    //ゲーム
    for (var i = 0; i < 3; i++) {

        var id3 = games[0][i].id;
        var desc3 = games[0][i].description;
        var severity3 = games[0][i].severity;
        var assignedTo3 = games[0][i].assignedTo;
        var status3 = games[0][i].status;

        issuesList3.innerHTML += '<div class="ranking-container">' +
        '<div class="well">' +
        '<p class="rank-number"> ' + [i + 1] + '' + desc3 + '</p>' +
        '<p><span class="glyphicon glyphicon-star"></span> ' + severity3 + '</p>' +
        '<p><span class="glyphicon glyphicon-user"></span> ' + assignedTo3 + '</p>'+

        // 画像ファイルの追加とプレビュー
        '<div class="preview-img">' +
        `<input type="file" id="example${i}" multiple>` +
        `<div id="preview${i}"></div>` +
        '</div>' + '</div>' + '</div>';

        function previewFile(file) {
            // プレビュー画像を追加する要素
            const preview = document.getElementById(`preview${i}`);
            // FileReaderオブジェクトを作成
            const reader = new FileReader();
            // ファイルが読み込まれたときに実行する
            reader.onload = function (e) {
                const imageUrl = e.target.result; // 画像のURLはevent.target.resultで呼び出せる
                const img = document.createElement("img"); // img要素を作成
                img.src = imageUrl; // 画像のURLをimg要素にセット
                preview.appendChild(img); // #previewの中に追加
            };

            // いざファイルを読み込む
            reader.readAsDataURL(file);
        };

        // <input>でファイルが選択されたときの処理
        const fileInput = document.getElementById(`example${i}`);
        const handleFileSelect = () => {
            const files = fileInput.files;
            for (let i = 0; i < files.length; i++) {
                previewFile(files[i])
            }
        }
            fileInput.addEventListener('change', handleFileSelect);

    // for (var i = 0; i < 3; i++) {

        //     var id4 = animes[0][i].id;
        //     var desc4 = animes[0][i].description;
        //     var severity4 = animes[0][i].severity;
    //     var assignedTo4 = animes[0][i].assignedTo;
    //     var status4 = animes[0][i].status;

    //     console.log(desc4);

    //     issuesList4.innerHTML += '<div class="ranking-container">' +
    //         '<div class="well">' +
    //         '<p class="rank-number"> ' + [i + 1] + '</p>' +
    //         '<h3>' + desc4 + '</h3>' +
    //         '<p><span class="glyphicon glyphicon-star"></span> ' + severity4 + '</p>' +
    //         '<p><span class="glyphicon glyphicon-user"></span> ' + assignedTo4 + '</p>'+
    // // 画像ファイルの追加とプレビュー
    // '<div class="preview-img">' +
    // '<input type="file" id="example '+[i]+'" multiple>' +
    // '<div id="preview '+[i]+'"></div>' +
    // '</div>' +
    // '</div>';
    // };
    };
};


//タブ切り替え機能

function displaySelected(panel1, panel2, panel3, panel4, button) {
    panel1.style.display = 'block';
    panel2.style.display = 'none';
    panel3.style.display = 'none';
    panel4.style.display = 'none';
    // panel5.style.display = 'none';
    button.setAttribute('aria-selected', true);
}

function changeDisplay(element) {
    const panel1 = document.getElementById('panel1');
    const panel2 = document.getElementById('panel2');
    const panel3 = document.getElementById('panel3');
    const panel4 = document.getElementById('panel4');
    // const panel5 = document.getElementById('panel5');
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.setAttribute('aria-selected', false);
    })
    switch (element) {
        case 'movie':
            displaySelected(panel1, panel2, panel3, panel4, buttons[0]);
            break;
        case 'book':
            displaySelected(panel2, panel1, panel3, panel4, buttons[1]);
            break;
        case 'music':
            displaySelected(panel3, panel1, panel2, panel4, buttons[2]);
            break;
        default:
            displaySelected(panel4, panel1, panel2, panel3, buttons[3]);
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


// Background Gradients From
// https://uigradients.com