import type { DeepPartial } from "../DeepPartial";
import type { Translation } from "../i18n-types";

const chat: DeepPartial<Translation["chat"]> = {
    intro: "チャット履歴",
    enter: "メッセージを入力してください",
    menu: {
        visitCard: "名刺",
        addFriend: "ともだち登録",
    },
    loader: "読み込み中...",
    typing: "が入力中...",
    users: "ユーザー",
    chat: "チャット",
    userList: {
        disconnected: "ワールドに接続されていません",
        isHere: "このマップ上",
        inAnotherMap: "別のマップ",
        in: "In ",
        teleport: "テレポート",
        search: "調べてみて！",
        walkTo: "会いに行く",
        teleporting: "テレポート中...",
        businessCard: "名刺",
        sendMessage: "メッセージを送信",
    },
    accept: "承諾",
    decline: "拒否",
    connecting: "サーバーに接続中...",
    waitingInit: "サーバーの初期化待機中...",
    waitingData: "ユーザーデータの待機...",
    searchUser: "ユーザー、マップなどを検索...",
    searchChat: "チャンネル、メッセージなどを検索...",
    people: "ピープル",
    rooms: "ルーム",
    invitations: "招待",
    availableRooms: "利用可能なルーム",
    proximity: "近接チャット",
    role: {
        admin: "管理者",
        member: "メンバー",
        visitor: "訪問者",
    },
    status: {
        online: "オンライン",
        away: "離席中",
        unavailable: "利用不可",
        back_in_a_moment: "すぐ戻ります",
        do_not_disturb: "邪魔しないでください",
        busy: "取り込み中",
        meeting: "ミーティング中",
        megaphone: "メガホンの利用中",
    },
    logIn: "ログイン",
    signIn: "登録またはログインして、チャットのすべての機能をお楽しみください！",
    invite: "招待",
    roomEmpty: "このルームは空いているので、同僚や友人を誘ってください！",
    userOnline: "ユーザーがオンライン",
    usersOnline: "ユーザーがオンライン",
    open: "開く",
    me: "私",
    you: "あなた",
    ban: {
        title: "アクセス禁止",
        content: "ユーザー {userName} を実行中のワールドから追放する。これは管理画面からキャンセルできます。",
        ban: "このユーザーをアクセス禁止にする",
    },
    loading: "読み込み中",
    loadingUsers: "ユーザーを読み込み中...",
    load: "読み込み",
    rankUp: "Promote",
    rankDown: "Retrograde",
    reinit: "再初期化",
    enterText: "メッセージを入力 ...",
    timeLine: {
        title: "タイムライン",
        open: "ライムラインの履歴を開く",
        description: "メッセージとイベントの履歴",
        incoming: "{userName} がディスカッションに参加しました",
        outcoming: "{userName} がディスカッションから離脱しました",
        youLeft: "ディスカッションから離脱しました",
    },
    form: {
        placeholder: "メッセージを入力...",
        typing: " 入力中...",
        application: {
            klaxoon: {
                title: "Klaxoon",
                description: "Klaxoon を送信します",
                error: "有効な Klaxoon の URL を入力してください",
            },
            youtube: {
                title: "Youtube",
                description: "埋め込み Youtube ビデオを送信します",
                error: "有効な Youtube の URL を入力してください",
            },
            googleDocs: {
                title: "Google ドキュメント",
                description: "Google ドキュメントを送信します",
                error: "有効な Google ドキュメントの URL を入力してください",
            },
            googleSlides: {
                title: "Google スライド",
                description: "Google スライドを送信します",
                error: "有効な Google スライドの URL を入力してください",
            },
            googleSheets: {
                title: "Google シート",
                description: "Google シートを送信します",
                error: "有効な Google シートの URL を入力してください",
            },
            eraser: {
                title: "Eraser",
                description: "Eraser を送信します",
                error: "有効な Eraser の URL を入力してください",
            },
            weblink: {
                error: "有効な URL を入力してください",
            },
        },
    },
    notification: {
        discussion: "あなたとディスカッションを希望",
        message: "メッセージを送信",
        forum: "フォーラム上",
    },
    see: "See",
    show: "Show",
    less: "less",
    more: "more",
    sendBack: "Send back",
    delete: "削除",
    messageDeleted: "メッセージの削除",
    emoji: {
        icon: "絵文字選択ポップアップを表示/非表示するアイコン",
        search: "絵文字の検索...",
        categories: {
            recents: "最近使った絵文字",
            smileys: "スマイリーとエモーション",
            people: "ピープル",
            animals: "動物と自然",
            food: "フードとドリンク",
            activities: "アクティビティ",
            travel: "旅行と場所",
            objects: "物",
            symbols: "記号",
            flags: "フラッグ",
            custom: "カスタム",
        },
        notFound: "絵文字が見つかりません",
    },
    said: "said :",
    reply: "返信する",
    react: "反応する",
    copy: "コピーする",
    copied: "コピーしました",
    file: {
        fileContentNoEmbed: "コンテンツを閲覧できません。ダウンロードしてください。",
        download: "ダウンロード",
        openCoWebsite: "共同ウェブサイトで開く",
        copy: "リンクをコピーする",
        tooBig: "{fileName} は大きすぎます {maxFileSize}。",
        notLogged: "ファイルをアップロードするにはログインする必要があります。",
    },
    needRefresh: "接続が切れました。チャットに再接続するには、ページを更新する必要があります。",
    refresh: "更新",
    upgrade: "アップグレード",
    upgradeToSeeMore: "アップグレードしてより多くのメッセージを見る。",
    disabled: "この機能は無効です。",
    disabledByAdmin: "この機能は管理者によって無効化されています。",
    anAdmin: "管理者",
    messageDeletedByYou: "このメッセージを削除しました",
    messageEdited: "修正済み",
    waiting: "待機中",
    nothingToDisplay: "表示するものはありません",
    showMore: "Show {number} more",
    showLess: "Show less",
    addRoomToFolderError: "フォルダーにルームを追加できません",
    createRoom: {
        title: "新しいルームの作成",
        name: "ルーム名",
        visibility: {
            label: "視認性",
            private: "プライベート",
            privateDescription: "招待されたゲストだけがルームを見つけて参加できます。",
            public: "パブリック",
            publicDescription: "誰でもルームを見つけて参加できます。",
            restricted: "フォルダーメンバー",
            restrictedDescription: "フォルダーのメンバーだけが見ることができます。",
        },
        e2eEncryption: {
            label: "エンド・ツー・エンド暗号化の有効化",
            description: "後で無効にすることはできません。",
        },
        users: "ユーザー",
        historyVisibility: {
            label: "誰が履歴を見ることができますか？",
            world_readable: "誰でも",
            joined: "メンバーのみ (参加してから)",
            invited: "メンバーのみ (招待されてから)",
        },
        buttons: {
            create: "作成",
            cancel: "キャンセル",
        },
        error: "ルーム作成時のエラー",
        loadingCreation: "ルームの作成中",
        creationSuccessNotification: "ルームが作成されました",
    },
    createFolder: {
        title: "新しいフォルダーの作成",
        name: "フォルダー名",
        visibility: {
            label: "視認性",
            private: "プライベート",
            privateDescription: "招待されたゲストだけがルームを見つけて参加できます。",
            public: "パブリック",
            publicDescription: "誰でもルームを見つけて参加できます。",
            restricted: "フォルダーメンバー",
            restrictedDescription: "フォルダーのメンバーだけが見ることができます。",
        },
        description: {
            label: "説明文",
            placeholder: "説明文",
        },
        e2eEncryption: {
            label: "エンド・ツー・エンド暗号化の有効化",
            description: "後で無効にすることはできません。",
        },
        users: "ユーザー",
        historyVisibility: {
            label: "誰が履歴を見ることができますか？",
            world_readable: "誰でも",
            joined: "メンバーのみ (参加してから)",
            invited: "メンバーのみ (招待されてから)",
        },
        buttons: {
            create: "作成",
            cancel: "キャンセル",
        },
        error: "ルーム作成時のエラー",
        loadingCreation: "ルームの作成中",
        creationSuccessNotification: "ルームが作成されました",
    },
    roomMenu: {
        leaveRoom: {
            label: "退室する",
            notification: "ルームを退室しました",
        },
        muteRoom: "ルームをミュートにする",
        unmuteRoom: "ルームのミュートを解除する",
    },
    e2ee: {
        encryptionNotConfigured: "暗号化が設定されていません",
        createRecoveryKey: {
            title: "チャットリカバリーキーの作成",
            description:
                "チャットでエンド・ツー・エンド暗号化を使用するには、リカバリーキーを作成する必要があります。パスフレーズを入力して、リカバリーキーを作成してください。",
            privateKeyDescription:
                "これはあなたの秘密鍵です。ログアウト後に暗号化されたディスカッションを取り出すために、安全な場所に保存しておいてください。",
            error: "リカバリーキーの作成中にエラーが発生しました。",
            buttons: {
                generate: "作成",
                continue: "続行",
                cancel: "キャンセル",
            },
        },
        interactiveAuth: {
            title: "チャットのエンド・ツー・エンド暗号化",
            description:
                "セキュリティのため、クロスサインキーはサーバにアップロードする必要があります。本人確認の後、クロスサインキーを保存し、WA やほかのクライアントから暗号化されたメッセージを読むことができるようになります。",
            instruction: "完了ボタンをクリックする前に、必ず SSO 接続ポップアップを終了させてください。",
            buttons: {
                cancel: "キャンセル",
                continueSSO: "SSO を続ける",
                finish: "完了",
            },
        },
        accessSecretStorage: {
            title: "チャットセッション認証",
            description:
                "セッションを確認し、暗号化されたメッセージの履歴を取り出すには、リカバリーキーまたはパスフレーズを入力する必要があります。",
            passphrase: "パスフレーズ",
            recoveryKey: "リカバリーキー",
            placeholder: "次を入力 : ",
            buttons: {
                cancel: "キャンセル",
                usePassphrase: "パスフレーズを使用する",
                useRecoveryKey: "リカバリーキーを使用する",
                confirm: "確認",
            },
        },
    },
    connectionError: "チャットは利用できません",
    requiresLoginForChatModal: {
        title: "チャットのロックを解除するにはログインしてください",
        content_1: "チャットを十分に楽しむには、ログインする必要があります。",
        content_2: "ログインすると、すべてのオプションにアクセスでき、中断することなく続けることができます。",
        content_3: " 体験を続けるにはログインしてください。",
    },
    requiresLoginForChat: "チャットメッセージにアクセスするにはログインしてください。",
    featureComingSoon: "近日公開予定！",
};

export default chat;
