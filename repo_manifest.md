# census — 計測した全リポジトリの記録（バージョン台帳）

今回の計測で解析した各リポジトリの **名前・URL・コミットSHA・コミット日・モジュール名・go版・GTサイズ・status**。
status: OK=評価済 / EMPTY_GT=正解GT空 / CLONE_FAIL=取得不可 / DISK_SKIP=容量退避。
区分(category): OK=評価対象 / non_go=go.mod無し（非Go） / go_empty=Goだがimported空（stdlibのみ/cgo等） / clone_fail=取得不能。

| # | repo | URL | commit(short) | date | go | GT all/imp/impT | status | 区分 |
|--:|------|-----|---|---|--:|---|---|---|
| 1 | 0xERR0R__blocky | https://github.com/0xERR0R/blocky | 23575a4772 | 2026-07-20 | 1.26.2 | 335/128/132 | OK |  |
| 2 | 0xcafed00d__joystick | https://github.com/0xcafed00d/joystick | bcb9018b38 | 2025-10-13 | 1.19 | 4/3/3 | OK |  |
| 3 | 1set__cronrange | https://github.com/1set/cronrange | b1b61d6744 | 2022-02-03 | 1.13 | 2/1/1 | OK |  |
| 4 | 1set__gut | https://github.com/1set/gut | a823632319 | 2020-11-18 | 1.15 | 1/0/0 | EMPTY_GT |  |
| 5 | 1set__starlet | https://github.com/1set/starlet | 9be5f42dc6 | 2026-07-13 | 1.19 | 26/12/12 | OK |  |
| 6 | 1set__todotxt | https://github.com/1set/todotxt | f72a2a5d7d | 2022-10-09 | 1.15 | 2/1/1 | OK |  |
| 7 | 2ykwang__mac-cleanup-go | https://github.com/2ykwang/mac-cleanup-go | c2c4734ad6 | 2026-07-02 | 1.25.0 | 36/25/25 | OK |  |
| 8 | 32leaves__bel | https://github.com/32leaves/bel | 66b16680e6 | 2019-04-18 | 1.12 | 10/1/3 | OK |  |
| 9 | 3d0c__gmf | https://github.com/3d0c/gmf | be727bc5b5 | 2022-09-06 | 1.12 | 7/0/4 | EMPTY_GT |  |
| 10 | 42Atomys__webhooked | https://github.com/42Atomys/webhooked | 161439e795 | 2025-08-20 | 1.20 | 182/26/29 | OK |  |
| 11 | 99designs__gqlgen | https://github.com/99designs/gqlgen | 95aaeaaf69 | 2026-07-13 | 1.25.0 | 39/18/23 | OK |  |
| 12 | AaronJan__Hunch | https://github.com/AaronJan/Hunch | ad9a3f5d95 | 2022-05-24 | 1.12 | 1/0/0 | EMPTY_GT |  |
| 13 | Ad3bay0c__routex | https://github.com/Ad3bay0c/routex | 1b7884da62 | 2026-07-06 | 1.25.1 | 90/33/39 | OK |  |
| 14 | AfterShip__email-verifier | https://github.com/AfterShip/email-verifier | a3c5c5b59c | 2025-12-05 | 1.22 | 23/4/10 | OK |  |
| 15 | Alejandro-M-P__git-courer | https://github.com/Alejandro-M-P/git-courer | 80c84a4944 | 2026-07-02 | 1.26 | 75/45/49 | OK |  |
| 16 | AllenDang__cimgui-go | https://github.com/AllenDang/cimgui-go | 455bafd72a | 2026-07-16 | 1.24.0 | 31/8/8 | OK |  |
| 17 | Allenxuxu__gev | https://github.com/Allenxuxu/gev | d685a7d887 | 2025-06-08 | 1.14 | 64/19/23 | OK |  |
| 18 | Allra-Fintech__mdv | https://github.com/Allra-Fintech/mdv | f8df54b876 | 2026-07-02 | 1.22 | 16/6/6 | OK |  |
| 19 | AmuzaTkts__jsonapi-errors | https://github.com/AmuzaTkts/jsonapi-errors | d696bdc03a | 2016-11-17 |  | 0/0/0 | EMPTY_GT |  |
| 20 | Andrew-M-C__go.jsonvalue | https://github.com/Andrew-M-C/go.jsonvalue | 6db6f0e27f | 2026-02-26 | 1.13 | 11/1/4 | OK |  |
| 21 | Antonboom__testifylint | https://github.com/Antonboom/testifylint | 720065d36f | 2026-07-01 | 1.25.0 | 9/3/3 | OK |  |
| 22 | Antonito__gfile | https://github.com/Antonito/gfile | 434e178d07 | 2026-04-20 | 1.26.2 | 52/31/35 | OK |  |
| 23 | Aorioli__gcm | https://github.com/Aorioli/gcm | 984428cc79 | 2015-12-04 |  | 0/0/0 | EMPTY_GT |  |
| 24 | AppsFlyer__go-sundheit | https://github.com/AppsFlyer/go-sundheit | 97462ab36f | 2026-07-14 | 1.24 | 12/1/7 | OK |  |
| 25 | Arceus-7__matrix | https://github.com/Arceus-7/matrix | ca4c1a6bda | 2026-05-20 | 1.21 | 0/0/0 | EMPTY_GT |  |
| 26 | AsaiYusuke__jsonpath | https://github.com/AsaiYusuke/jsonpath | ceeef42de9 | 2026-07-19 | 1.25 | 2/0/0 | EMPTY_GT |  |
| 27 | AshvinBambhaniya__autopool | https://github.com/AshvinBambhaniya/autopool | 6471627eb1 | 2026-07-17 | 1.25.0 | 0/0/0 | EMPTY_GT |  |
| 28 | Azure__AppConfiguration-GoProvider | https://github.com/Azure/AppConfiguration-GoProvider | 6199971f3d | 2026-04-21 |  | 0/0/0 | EMPTY_GT |  |
| 29 | Balaji01-4D__pgxcli | https://github.com/Balaji01-4D/pgxcli | 736c33a487 | 2026-07-14 | 1.26.4 | 165/63/66 | OK |  |
| 30 | BayesWitnesses__m2cgen | https://github.com/BayesWitnesses/m2cgen | 9784632311 | 2022-10-05 |  | 0/0/0 | EMPTY_GT |  |
| 31 | Bilibili__discovery | https://github.com/Bilibili/discovery | 1e12d5c008 | 2020-12-04 | 1.12 | 212/23/27 | OK |  |
| 32 | BlackRabbitt__mspm | https://github.com/BlackRabbitt/mspm | 2e8956b4fe | 2018-05-19 |  | 0/0/0 | EMPTY_GT |  |
| 33 | BoRuDar__configuration | https://github.com/BoRuDar/configuration | ffc86c6823 | 2025-01-20 | 1.22 | 1/0/0 | EMPTY_GT |  |
| 34 | Boeing__config-file-validator | https://github.com/Boeing/config-file-validator | bd3b45e7b3 | 2026-07-20 | 1.26.3 | 101/42/47 | OK |  |
| 35 | BooleanCat__go-functional | https://github.com/BooleanCat/go-functional | 52af01ff24 | 2026-06-23 | 1.23 | 1/0/0 | EMPTY_GT |  |
| 36 | Breeze0806__go-etl | https://github.com/Breeze0806/go-etl | fda85ca65f | 2026-06-10 | 1.20 | 104/54/54 | OK |  |
| 37 | BrianLeishman__go-imap | https://github.com/BrianLeishman/go-imap | d3164e249d | 2026-07-13 | 1.26.1 | 38/26/26 | OK |  |
| 38 | BurntSushi__toml | https://github.com/BurntSushi/toml | c6d720d835 | 2026-06-27 | 1.19 | 1/0/0 | EMPTY_GT |  |
| 39 | C2FO__vfs | https://github.com/C2FO/vfs | e0c362c8df | 2026-07-17 | 1.25.11 | 269/87/94 | OK |  |
| 40 | CalebQ42__bbConvert | https://github.com/CalebQ42/bbConvert | ef1f4abc5c | 2024-12-27 | 1.23.4 | 2/1/1 | OK |  |
| 41 | ChainSafe__gossamer | https://github.com/ChainSafe/gossamer | c4b8870fbc | 2026-05-21 | 1.24.0 | 566/193/196 | OK |  |
| 42 | Checkmarx__chainjacking | https://github.com/Checkmarx/chainjacking | 32ecf779db | 2026-05-22 |  | 0/0/0 | EMPTY_GT |  |
| 43 | ChimeraCoder__anaconda | https://github.com/ChimeraCoder/anaconda | fba449f7b4 | 2018-10-14 |  | 0/0/0 | EMPTY_GT |  |
| 44 | ChimeraCoder__gojson | https://github.com/ChimeraCoder/gojson | fa01aa3a20 | 2018-08-18 |  | 0/0/0 | EMPTY_GT |  |
| 45 | ChristopherRabotin__ode | https://github.com/ChristopherRabotin/ode | 0502445546 | 2017-01-17 |  | 0/0/0 | EMPTY_GT |  |
| 46 | ChristopherRabotin__sg | https://github.com/ChristopherRabotin/sg | 467eb88f4f | 2016-10-28 |  | 0/0/0 | EMPTY_GT |  |
| 47 | ClickHouse__clickhouse-go | https://github.com/ClickHouse/clickhouse-go | 542f4ae0ff | 2026-07-14 | 1.25.0 | 106/55/56 | OK |  |
| 48 | Clivern__Beaver | https://github.com/Clivern/Beaver | bd68afd9d4 | 2023-12-28 | 1.20 | 173/41/41 | OK |  |
| 49 | CloudyKit__jet | https://github.com/CloudyKit/jet | 22e833c29a | 2026-06-18 | 1.16 | 2/1/1 | OK |  |
| 50 | Code-Hex__Neo-cowsay | https://github.com/Code-Hex/Neo-cowsay | f68c20f068 | 2023-08-18 | 1.16 | 6/3/4 | OK |  |
| 51 | Colin4k1024__Aetheris | https://github.com/Colin4k1024/Aetheris | 2ff3e77a18 | 2026-07-06 | 1.26.1 | 268/124/124 | OK |  |
| 52 | Comcast__gaad | https://github.com/Comcast/gaad | 6c3900593f | 2023-01-25 | 1.18 | 1/0/0 | EMPTY_GT |  |
| 53 | CovenantSQL__CovenantSQL | https://github.com/CovenantSQL/CovenantSQL | ce1b3c0121 | 2021-08-23 | 1.13 | 239/87/92 | OK |  |
| 54 | Crocmagnon__fatcontext | https://github.com/Crocmagnon/fatcontext | 2b18e0b7cf | 2026-06-26 | 1.25.0 | 9/3/3 | OK |  |
| 55 | DATA-DOG__go-sqlmock | https://github.com/DATA-DOG/go-sqlmock | 4e29cb9ba9 | 2026-07-10 | 1.15 | 2/1/1 | OK |  |
| 56 | DATA-DOG__go-txdb | https://github.com/DATA-DOG/go-txdb | 3cc9573e9a | 2025-03-11 | 1.21 | 0/0/0 | EMPTY_GT |  |
| 57 | DMcP89__tinycare-tui | https://github.com/DMcP89/tinycare-tui | 8055cead09 | 2026-03-17 | 1.23.0 | 65/29/31 | OK |  |
| 58 | DarthPestilane__easytcp | https://github.com/DarthPestilane/easytcp | 5ddf56798f | 2026-01-20 | 1.17 | 31/11/15 | OK |  |
| 59 | DavidBelicza__TextRank | https://github.com/DavidBelicza/TextRank | 0fa92b29a3 | 2025-06-14 | 1.15 | 0/0/0 | EMPTY_GT |  |
| 60 | DavidGamba__go-getoptions | https://github.com/DavidGamba/go-getoptions | d9222021aa | 2025-04-14 | 1.16 | 1/0/0 | EMPTY_GT |  |
| 61 | DeRuina__timberjack | https://github.com/DeRuina/timberjack | caac349cfd | 2026-06-30 | 1.21 | 3/1/2 | OK |  |
| 62 | DiceDB__dice | https://github.com/DiceDB/dice | 9610c664d1 | 2026-03-10 |  | 0/0/0 | EMPTY_GT |  |
| 63 | DimitarPetrov__stegify | https://github.com/DimitarPetrov/stegify | 5d278781a3 | 2023-04-11 |  | 0/0/0 | EMPTY_GT |  |
| 64 | DisposaBoy__GoSublime | https://github.com/DisposaBoy/GoSublime | 890149fb88 | 2020-06-14 |  | 0/0/0 | EMPTY_GT |  |
| 65 | DrmagicE__gmqtt | https://github.com/DrmagicE/gmqtt | 92ed7d6091 | 2026-04-05 | 1.26.1 | 313/47/47 | OK |  |
| 66 | DylanMeeus__GoAudio | https://github.com/DylanMeeus/GoAudio | 1a202c9cd3 | 2022-02-05 | 1.16 | 1/0/0 | EMPTY_GT |  |
| 67 | DylanMeeus__hasgo | https://github.com/DylanMeeus/hasgo | ea2659fc76 | 2021-02-22 | 1.13 | 9/2/2 | OK |  |
| 68 | Dynom__TySug | https://github.com/Dynom/TySug | 708d0917d7 | 2023-02-23 | 1.20 | 17/8/9 | OK |  |
| 69 | EchoVault__EchoVault | https://github.com/EchoVault/EchoVault | b0744d9160 | 2025-04-24 | 1.23.3 | 97/30/31 | OK |  |
| 70 | Edgenesis__shifu | https://github.com/Edgenesis/shifu | 3a5166370f | 2026-07-15 | 1.26.1 | 436/126/134 | OK |  |
| 71 | EngoEngine__engo | https://github.com/EngoEngine/engo | 4d9de92353 | 2024-07-12 | 1.19 | 46/17/21 | OK |  |
| 72 | Eun__go-convert | https://github.com/Eun/go-convert | efa2c5286f | 2024-02-13 | 1.14 | 8/5/5 | OK |  |
| 73 | Eun__go-hit | https://github.com/Eun/go-hit | e7519b776d | 2024-04-05 | 1.15 | 53/30/35 | OK |  |
| 74 | Evertras__bubble-table | https://github.com/Evertras/bubble-table | 6062dafe1d | 2026-06-05 | 1.25.0 | 36/19/23 | OK |  |
| 75 | Eyevinn__hls-m3u8 | https://github.com/Eyevinn/hls-m3u8 | ac8a22d118 | 2026-07-13 | 1.21 | 2/0/1 | EMPTY_GT |  |
| 76 | Eyevinn__mp4ff | https://github.com/Eyevinn/mp4ff | 8c9f99a414 | 2026-07-13 | 1.19 | 2/0/1 | EMPTY_GT |  |
| 77 | FiloSottile__age | https://github.com/FiloSottile/age | 706dfc1e79 | 2026-03-20 | 1.24.0 | 18/6/9 | OK |  |
| 78 | Fontinalis__fonet | https://github.com/Fontinalis/fonet | dbf80fcbd6 | 2021-06-01 | 1.16 | 1/0/0 | EMPTY_GT |  |
| 79 | Forceu__gokapi | https://github.com/Forceu/gokapi | 1af4241a52 | 2026-07-15 | 1.25.0 | 115/30/34 | OK |  |
| 80 | FrancoLiberali__cql | https://github.com/FrancoLiberali/cql | 571823bcc4 | 2025-11-29 | 1.22.0 | 114/16/33 | OK |  |
| 81 | FreeLeh__GoFreeDB | https://github.com/FreeLeh/GoFreeDB | dc9979a850 | 2025-05-05 | 1.18 | 94/16/22 | OK |  |
| 82 | Fs02__go-todo-backend | https://github.com/Fs02/go-todo-backend | c6b0d7e90d | 2023-05-19 | 1.19 | 52/16/17 | OK |  |
| 83 | Fs02__grimoire | https://github.com/Fs02/grimoire | afa1da26c5 | 2021-10-26 | 1.14 | 13/11/12 | OK |  |
| 84 | Fs02__wire | https://github.com/Fs02/wire | bf9e390791 | 2021-08-22 |  | 4/0/3 | EMPTY_GT |  |
| 85 | GiGurra__boa | https://github.com/GiGurra/boa | 356f0535b3 | 2026-07-01 | 1.25 | 8/2/2 | OK |  |
| 86 | Gituser143__cryptgo | https://github.com/Gituser143/cryptgo | afdb684df7 | 2021-10-17 | 1.16 | 184/26/26 | OK |  |
| 87 | GoTestTools__gotestfmt | https://github.com/GoTestTools/gotestfmt | 4c97682ab8 | 2023-06-05 | 1.16 | 1/0/0 | EMPTY_GT |  |
| 88 | GolangUA__gopher-logos | https://github.com/GolangUA/gopher-logos | e671cf581d | 2018-06-26 |  | 0/0/0 | EMPTY_GT |  |
| 89 | GoogleCloudPlatform__gcloud-golang | https://github.com/GoogleCloudPlatform/gcloud-golang | 8e9f00f76a | 2026-07-20 | 1.25.0 | 197/31/47 | OK |  |
| 90 | GuiaBolso__darwin | https://github.com/GuiaBolso/darwin | fd6d2aa3d2 | 2019-12-18 |  | 0/0/0 | EMPTY_GT |  |
| 91 | GuilhermeCaruso__anko | https://github.com/GuilhermeCaruso/anko | 86551ff818 | 2021-03-28 | 1.16 | 15/3/3 | OK |  |
| 92 | GuilhermeCaruso__bellt | https://github.com/GuilhermeCaruso/bellt | 5d28019f58 | 2022-07-18 | 1.12 | 1/0/0 | EMPTY_GT |  |
| 93 | GuilhermeCaruso__kair | https://github.com/GuilhermeCaruso/kair | 2cbc3ec356 | 2020-06-18 |  | 0/0/0 | EMPTY_GT |  |
| 94 | GuilhermeCaruso__mooncake | https://github.com/GuilhermeCaruso/mooncake | dda32b02e9 | 2022-09-18 | 1.18 | 11/4/4 | OK |  |
| 95 | Guitarbum722__align | https://github.com/Guitarbum722/align | c81c6ab38f | 2021-09-12 | 1.17 | 2/1/1 | OK |  |
| 96 | HDT3213__rdb | https://github.com/HDT3213/rdb | 7ebe18a1eb | 2026-04-19 | 1.18 | 19/7/7 | OK |  |
| 97 | Haraj-backend__hex-monscape | https://github.com/Haraj-backend/hex-monscape | 6595e47ed6 | 2024-07-18 | 1.18 | 54/16/20 | OK |  |
| 98 | HazelnutParadise__insyra | https://github.com/HazelnutParadise/insyra | 36f3d621e9 | 2026-07-18 | 1.25.12 | 518/128/134 | OK |  |
| 99 | Henry-Sarabia__blank | https://github.com/Henry-Sarabia/blank | 00aa240e36 | 2019-07-31 |  | 0/0/0 | EMPTY_GT |  |
| 100 | Henry-Sarabia__igdb | https://github.com/Henry-Sarabia/igdb | 798c479b58 | 2020-12-15 | 1.13 | 6/4/4 | OK |  |
| 101 | Henry-Sarabia__sliceconv | https://github.com/Henry-Sarabia/sliceconv | ec6676eeef | 2020-02-02 | 1.13 | 2/1/1 | OK |  |
| 102 | HereMobilityDevelopers__mediary | https://github.com/HereMobilityDevelopers/mediary | cdaf26889b | 2020-06-24 | 1.14 | 0/0/0 | EMPTY_GT |  |
| 103 | HnH__di | https://github.com/HnH/di | 5f0d384f47 | 2025-11-30 | 1.18 | 7/0/4 | EMPTY_GT |  |
| 104 | HnH__qry | https://github.com/HnH/qry | 4cee236603 | 2024-02-20 | 1.15 | 1/0/0 | EMPTY_GT |  |
| 105 | Hossiy21__razify | https://github.com/Hossiy21/razify | e9692efc1a | 2026-05-31 | 1.25.0 | 13/6/6 | OK |  |
| 106 | HouzuoGuo__tiedot | https://github.com/HouzuoGuo/tiedot | ae1e16866d | 2021-09-05 |  | 0/0/0 | EMPTY_GT |  |
| 107 | HugoSmits86__nativewebp | https://github.com/HugoSmits86/nativewebp | 732aa4ca72 | 2026-05-10 | 1.22.2 | 3/1/1 | OK |  |
| 108 | Humpheh__goboy | https://github.com/Humpheh/goboy | ef499ef7a0 | 2025-08-10 | 1.23.0 | 29/8/12 | OK |  |
| 109 | IGLOU-EU__go-wildcard | https://github.com/IGLOU-EU/go-wildcard | f12292c863 | 2026-05-27 | 1.16 | 1/0/0 | EMPTY_GT |  |
| 110 | ITcathyh__conexec | https://github.com/ITcathyh/conexec | cc9699c997 | 2026-05-31 | 1.13 | 3/1/2 | OK |  |
| 111 | Jacobbrewer1__patcher | https://github.com/Jacobbrewer1/patcher | a3fe78de2a | 2025-12-18 | 1.24 | 98/6/6 | OK |  |
| 112 | Jagerente__gocfg | https://github.com/Jagerente/gocfg | 047162ec05 | 2025-06-18 | 1.16 | 8/1/5 | OK |  |
| 113 | Jeffail__gabs | https://github.com/Jeffail/gabs | 81fbfc2308 | 2023-02-14 | 1.16 | 1/0/0 | EMPTY_GT |  |
| 114 | Jeffail__tunny | https://github.com/Jeffail/tunny | a274c3ce48 | 2021-07-12 | 1.13 | 1/0/0 | EMPTY_GT |  |
| 115 | JeremyLoy__config | https://github.com/JeremyLoy/config | 39a8344053 | 2021-11-18 | 1.16 | 1/0/0 | EMPTY_GT |  |
| 116 | JoelOtter__termloop | https://github.com/JoelOtter/termloop | 5f7c38744a | 2021-08-06 |  | 0/0/0 | EMPTY_GT |  |
| 117 | JohannesKaufmann__html-to-markdown | https://github.com/JohannesKaufmann/html-to-markdown | 290df46a27 | 2026-06-07 | 1.25.0 | 30/15/15 | OK |  |
| 118 | JoshuaDoes__gofuckyourself | https://github.com/JoshuaDoes/gofuckyourself | e5f8d4d217 | 2025-06-01 | 1.23.4 | 5/1/1 | OK |  |
| 119 | Kachit__appstore-sdk-go | https://github.com/Kachit/appstore-sdk-go | 4a599d3164 | 2024-01-26 | 1.14 | 10/2/7 | OK |  |
| 120 | Kachit__dusupay-sdk-go | https://github.com/Kachit/dusupay-sdk-go | 63985b8d5d | 2022-12-06 | 1.14 | 8/0/5 | EMPTY_GT |  |
| 121 | Kachit__fasapay-sdk-go | https://github.com/Kachit/fasapay-sdk-go | c2e0c18b1d | 2022-06-16 | 1.14 | 8/0/5 | EMPTY_GT |  |
| 122 | Kachit__gorm-seeder | https://github.com/Kachit/gorm-seeder | c75179271b | 2022-11-20 | 1.14 | 68/3/19 | OK |  |
| 123 | Kairum-Labs__should | https://github.com/Kairum-Labs/should | 559d7289fd | 2026-06-25 | 1.22 | 0/0/0 | EMPTY_GT |  |
| 124 | Knuspii__CrunchyCleaner | https://github.com/Knuspii/CrunchyCleaner | 169977e3c2 | 2026-07-08 | 1.25.0 | 16/3/3 | OK |  |
| 125 | Knuspii__kepfi | https://github.com/Knuspii/kepfi |  |  |  | 0/0/0 | CLONE_FAIL |  |
| 126 | Konstantin8105__c4go | https://github.com/Konstantin8105/c4go | 5bf367b967 | 2024-09-19 | 1.13 | 9/4/8 | OK |  |
| 127 | Konstantin8105__f4go | https://github.com/Konstantin8105/f4go | 568775fd7b | 2023-08-17 | 1.13 | 4/0/3 | EMPTY_GT |  |
| 128 | KusionStack__kusion | https://github.com/KusionStack/kusion | 02cc9d8b23 | 2026-01-04 | 1.22.1 | 806/325/334 | OK |  |
| 129 | Kwynto__gosession | https://github.com/Kwynto/gosession | 7822ad47b2 | 2024-07-31 | 1.17 | 0/0/0 | EMPTY_GT |  |
| 130 | LawrenceWoodman__roveralls | https://github.com/LawrenceWoodman/roveralls | 51b78509b6 | 2017-11-19 |  | 0/0/0 | EMPTY_GT |  |
| 131 | Lifailon__lazyjournal | https://github.com/Lifailon/lazyjournal | 3cef484429 | 2026-05-06 | 1.25.0 | 21/10/10 | OK |  |
| 132 | LimeChain__gosemble | https://github.com/LimeChain/gosemble | e2ac2f3e70 | 2024-12-19 | 1.21 | 285/26/26 | OK |  |
| 133 | MUlt1mate__protoc-gen-httpgo | https://github.com/MUlt1mate/protoc-gen-httpgo | 41cbb468b9 | 2026-04-22 | 1.22 | 11/2/3 | OK |  |
| 134 | MariaLetta__free-gophers-pack | https://github.com/MariaLetta/free-gophers-pack | 9bb81600dd | 2024-12-22 |  | 0/0/0 | EMPTY_GT |  |
| 135 | MarvinJWendt__testza | https://github.com/MarvinJWendt/testza | 3fab8a745e | 2023-02-03 | 1.18 | 29/16/16 | OK |  |
| 136 | Masterminds__squirrel | https://github.com/Masterminds/squirrel | 1ded578453 | 2024-02-27 | 1.14 | 6/2/5 | OK |  |
| 137 | MatProGo-dev__MatProInterface.go | https://github.com/MatProGo-dev/MatProInterface.go | b1b52f2d1f | 2026-02-19 | 1.23.0 | 19/2/2 | OK |  |
| 138 | MauriceGit__skiplist | https://github.com/MauriceGit/skiplist | 77f5c8d3e1 | 2021-11-06 |  | 0/0/0 | EMPTY_GT |  |
| 139 | MaxHalford__eaopt | https://github.com/MaxHalford/eaopt | 822946c064 | 2025-01-27 | 1.15 | 2/1/1 | OK |  |
| 140 | Medium__medium-sdk-go | https://github.com/Medium/medium-sdk-go | 4daca056cf | 2017-12-30 |  | 0/0/0 | EMPTY_GT |  |
| 141 | Melkeydev__go-blueprint | https://github.com/Melkeydev/go-blueprint | 81f56f8c24 | 2025-07-20 | 1.23.0 | 34/20/20 | OK |  |
| 142 | MonaxGT__gomalshare | https://github.com/MonaxGT/gomalshare | e9621fca15 | 2019-04-29 |  | 2/1/1 | OK |  |
| 143 | MonaxGT__gosddl | https://github.com/MonaxGT/gosddl | d864b88362 | 2019-04-30 |  | 0/0/0 | EMPTY_GT |  |
| 144 | MonaxGT__parsefields | https://github.com/MonaxGT/parsefields | 3701550912 | 2019-05-05 |  | 18/7/7 | OK |  |
| 145 | MordaTeam__go-config | https://github.com/MordaTeam/go-config | dbe64aeba7 | 2026-02-13 | 1.24.2 | 232/20/61 | OK |  |
| 146 | Mutasem-mk4__gspy | https://github.com/Mutasem-mk4/gspy | 8d097687ba | 2026-04-25 | 1.24.0 | 56/17/17 | OK |  |
| 147 | Mutasem-mk4__procscope | https://github.com/Mutasem-mk4/procscope | 572e64f3f5 | 2026-06-09 | 1.26.2 | 102/50/50 | OK |  |
| 148 | NVIDIA__gontainer | https://github.com/NVIDIA/gontainer | 78137ec6d6 | 2026-04-20 | 1.21 | 0/0/0 | EMPTY_GT |  |
| 149 | NdoleStudio__go-otelroundtripper | https://github.com/NdoleStudio/go-otelroundtripper | 941c4781da | 2026-06-15 | 1.25.0 | 24/7/16 | OK |  |
| 150 | Netflix__chaosmonkey | https://github.com/Netflix/chaosmonkey | eaa28fb761 | 2024-10-03 | 1.19 | 38/24/24 | OK |  |
| 151 | NicoNex__echotron | https://github.com/NicoNex/echotron | ea90870cd5 | 2026-07-07 | 1.19 | 18/1/1 | OK |  |
| 152 | NicoNex__jet | https://github.com/NicoNex/jet | fa9b61fd07 | 2025-03-24 | 1.20 | 0/0/0 | EMPTY_GT |  |
| 153 | NodePassProject__nodepass | https://github.com/NodePassProject/nodepass | 114345043d | 2026-07-12 | 1.26.5 | 26/10/10 | OK |  |
| 154 | Noooste__azuretls-client | https://github.com/Noooste/azuretls-client | 756acc9409 | 2026-04-17 | 1.24.0 | 133/21/24 | OK |  |
| 155 | OGFris__GoStats | https://github.com/OGFris/GoStats | 5f3546fe48 | 2019-01-14 |  | 0/0/0 | EMPTY_GT |  |
| 156 | OTA-Insight__bqwriter | https://github.com/OTA-Insight/bqwriter | b097adcaad | 2023-09-11 | 1.17 | 203/35/35 | OK |  |
| 157 | OctoLinker__browser-extension | https://github.com/OctoLinker/browser-extension | cf7ec7de08 | 2023-07-03 |  | 0/0/0 | EMPTY_GT |  |
| 158 | OldPanda__bloomfilter | https://github.com/OldPanda/bloomfilter | a41bcb391e | 2025-03-19 | 1.16 | 21/2/2 | OK |  |
| 159 | Omibranch__gitty | https://github.com/Omibranch/gitty | 639126ee4b | 2026-04-19 | 1.21 | 0/0/0 | EMPTY_GT |  |
| 160 | One-com__gone | https://github.com/One-com/gone | 059b1e22b0 | 2021-05-10 |  | 0/0/0 | EMPTY_GT |  |
| 161 | OrlovEvgeny__go-mcache | https://github.com/OrlovEvgeny/go-mcache | e9fc1cfea5 | 2026-07-06 | 1.26.2 | 26/0/18 | EMPTY_GT |  |
| 162 | Oudwins__zog | https://github.com/Oudwins/zog | b486cb1a55 | 2026-07-05 | 1.23.0 | 13/5/6 | OK |  |
| 163 | OwnLocal__goes | https://github.com/OwnLocal/goes | d25b7ff831 | 2017-03-02 |  | 0/0/0 | EMPTY_GT |  |
| 164 | PIMPfiction__govader_backend | https://github.com/PIMPfiction/govader_backend | d8ede28925 | 2024-02-26 | 1.18 | 32/12/16 | OK |  |
| 165 | PaddleHQ__go-aws-ssm | https://github.com/PaddleHQ/go-aws-ssm | d332b0bbfe | 2026-05-14 | 1.24 | 12/3/3 | OK |  |
| 166 | PaesslerAG__gval | https://github.com/PaesslerAG/gval | a769652e8e | 2025-08-04 | 1.15 | 3/1/2 | OK |  |
| 167 | Parquery__gocontracts | https://github.com/Parquery/gocontracts | 1866c153bd | 2019-01-26 |  | 0/0/0 | EMPTY_GT |  |
| 168 | PaulRosset__go-hacknews | https://github.com/PaulRosset/go-hacknews | 4aad99273a | 2017-08-15 |  | 0/0/0 | EMPTY_GT |  |
| 169 | PerimeterX__envite | https://github.com/PerimeterX/envite | 90fe3b3866 | 2026-06-07 | 1.25.0 | 75/34/37 | OK |  |
| 170 | PerimeterX__marshmallow | https://github.com/PerimeterX/marshmallow | ea27928591 | 2023-07-03 | 1.17 | 6/2/4 | OK |  |
| 171 | PhakornKiong__go-pattern-match | https://github.com/PhakornKiong/go-pattern-match | d4ff06facf | 2023-08-26 | 1.20 | 7/0/4 | EMPTY_GT |  |
| 172 | Pixboost__transformimgs | https://github.com/Pixboost/transformimgs | dd9df10283 | 2025-02-15 | 1.18 | 4/3/3 | OK |  |
| 173 | PuerkitoBio__gocostmodel | https://github.com/PuerkitoBio/gocostmodel | 0638ffa735 | 2021-05-19 | 1.16 | 0/0/0 | EMPTY_GT |  |
| 174 | PuerkitoBio__goquery | https://github.com/PuerkitoBio/goquery | 50e9856dda | 2026-07-17 | 1.25.0 | 7/2/2 | OK |  |
| 175 | PumpkinSeed__errors | https://github.com/PumpkinSeed/errors | b1164795ee | 2020-01-09 | 1.13 | 1/0/0 | EMPTY_GT |  |
| 176 | PumpkinSeed__structs | https://github.com/PumpkinSeed/structs | 2ac85481cb | 2017-10-23 |  | 0/0/0 | EMPTY_GT |  |
| 177 | Qntfy__kazaam | https://github.com/Qntfy/kazaam | f202606c43 | 2021-07-05 | 1.12 | 3/2/2 | OK |  |
| 178 | Raezil__GoEventBus | https://github.com/Raezil/GoEventBus | f5bb1bc281 | 2026-05-21 | 1.23.0 | 13/6/6 | OK |  |
| 179 | RezaSi__go-interview-practice | https://github.com/RezaSi/go-interview-practice | b3192e2d7e | 2026-07-20 |  | 0/0/0 | EMPTY_GT |  |
| 180 | RibbonFilter__ribbonGo | https://github.com/RibbonFilter/ribbonGo | 1f34e04797 | 2026-07-17 | 1.24.2 | 5/2/2 | OK |  |
| 181 | RichardKnop__go-fixtures | https://github.com/RichardKnop/go-fixtures | 8d7ddb76c9 | 2019-12-26 |  | 11/1/6 | OK |  |
| 182 | RichardKnop__jsonhal | https://github.com/RichardKnop/jsonhal | 9ef775cfa6 | 2018-11-01 |  | 5/1/4 | OK |  |
| 183 | RichardKnop__machinery | https://github.com/RichardKnop/machinery | 26dbe03084 | 2025-11-15 | 1.22 | 119/46/50 | OK |  |
| 184 | RichardKnop__minisql | https://github.com/RichardKnop/minisql | 134a8dd9d1 | 2026-06-24 | 1.26 | 43/7/13 | OK |  |
| 185 | RoaringBitmap__roaring | https://github.com/RoaringBitmap/roaring | 44559cd5c0 | 2026-07-13 | 1.24.0 | 20/2/7 | OK |  |
| 186 | SaiNageswarS__go-api-boot | https://github.com/SaiNageswarS/go-api-boot | 322b096f27 | 2026-04-22 | 1.25.0 | 309/92/92 | OK |  |
| 187 | SaidinWoT__timespan | https://github.com/SaidinWoT/timespan | a3d8e47411 | 2016-04-03 |  | 0/0/0 | EMPTY_GT |  |
| 188 | SchwarzIT__hypermatch | https://github.com/SchwarzIT/hypermatch | 3c39ef9c91 | 2026-05-04 | 1.21.0 | 6/0/2 | EMPTY_GT |  |
| 189 | SebastiaanKlippert__go-wkhtmltopdf | https://github.com/SebastiaanKlippert/go-wkhtmltopdf | 1eb8cee79c | 2025-10-30 | 1.19 | 0/0/0 | EMPTY_GT |  |
| 190 | SeldonIO__goven | https://github.com/SeldonIO/goven | 57c0f5d004 | 2022-04-14 | 1.18 | 82/4/21 | OK |  |
| 191 | SharkByteSoftware__go-snk | https://github.com/SharkByteSoftware/go-snk | 568c29d03b | 2026-07-19 | 1.25.0 | 0/0/0 | EMPTY_GT |  |
| 192 | Sherifabdlnaby__gpool | https://github.com/Sherifabdlnaby/gpool | 5b145118c7 | 2026-07-11 | 1.25.0 | 3/1/1 | OK |  |
| 193 | Shopify__go-lua | https://github.com/Shopify/go-lua | 1e37f32ad7 | 2025-07-18 | 1.22 | 1/0/0 | EMPTY_GT |  |
| 194 | Shopify__sarama | https://github.com/Shopify/sarama | a15eb5ed41 | 2026-07-17 | 1.25.0 | 38/14/18 | OK |  |
| 195 | SimonBaeumer__cmd | https://github.com/SimonBaeumer/cmd | 04f01f616e | 2024-01-30 | 1.21 | 7/0/4 | EMPTY_GT |  |
| 196 | SimonBaeumer__commander | https://github.com/SimonBaeumer/commander | 11660f4cd4 | 2024-04-02 | 1.21 | 59/28/30 | OK |  |
| 197 | SimonWaldherr__golang-benchmarks | https://github.com/SimonWaldherr/golang-benchmarks | a6f34af4b4 | 2026-07-19 | 1.26.5 | 48/0/19 | EMPTY_GT |  |
| 198 | SimonWaldherr__golang-examples | https://github.com/SimonWaldherr/golang-examples | d238d9eaac | 2026-07-05 | 1.26.4 | 146/39/42 | OK |  |
| 199 | Sioro-Neoku__go-peerflix | https://github.com/Sioro-Neoku/go-peerflix | c3821be367 | 2019-12-04 | 1.13 | 122/34/34 | OK |  |
| 200 | Sirupsen__logrus | https://github.com/Sirupsen/logrus | a23d315dfe | 2026-06-29 | 1.23 | 8/5/5 | OK |  |
| 201 | SonicRoshan__falcon | https://github.com/SonicRoshan/falcon | 95c6d19fbe | 2019-09-20 |  | 0/0/0 | EMPTY_GT |  |
| 202 | SonicRoshan__scope | https://github.com/SonicRoshan/scope | 9bbd38664a | 2021-05-25 | 1.16 | 7/0/4 | EMPTY_GT |  |
| 203 | SonicRoshan__straf | https://github.com/SonicRoshan/straf | d7d98022a9 | 2020-05-16 | 1.14 | 8/1/5 | OK |  |
| 204 | Southclaws__fault | https://github.com/Southclaws/fault | 15e49aecd6 | 2025-06-14 | 1.18 | 54/9/16 | OK |  |
| 205 | SpatiumPortae__portal | https://github.com/SpatiumPortae/portal | e51984e186 | 2024-05-30 | 1.20 | 294/51/82 | OK |  |
| 206 | SpectoLabs__hoverfly | https://github.com/SpectoLabs/hoverfly | d68454cbcf | 2026-07-14 | 1.26.5 | 171/79/81 | OK |  |
| 207 | StabbyCutyou__moldova | https://github.com/StabbyCutyou/moldova | 34406be3cd | 2017-09-04 |  | 0/0/0 | EMPTY_GT |  |
| 208 | StudioSol__set | https://github.com/StudioSol/set | e3903aa95b | 2025-10-02 | 1.18 | 7/0/4 | EMPTY_GT |  |
| 209 | Talento90__go-health | https://github.com/Talento90/go-health | 812f4334f6 | 2022-01-19 |  | 0/0/0 | EMPTY_GT |  |
| 210 | TeaEntityLab__fpGo | https://github.com/TeaEntityLab/fpGo | 1547e5ec4d | 2025-10-21 | 1.18 | 13/0/4 | EMPTY_GT |  |
| 211 | Terry-Mao__gopush-cluster | https://github.com/Terry-Mao/gopush-cluster | 1c279b4d08 | 2017-05-25 |  | 0/0/0 | EMPTY_GT |  |
| 212 | TheColonyCC__colony-sdk-go | https://github.com/TheColonyCC/colony-sdk-go | 940564f4fa | 2026-07-18 | 1.22 | 1/0/0 | EMPTY_GT |  |
| 213 | TheCreeper__go-notify | https://github.com/TheCreeper/go-notify | 44ab9a1c79 | 2020-12-11 | 1.12 | 2/1/1 | OK |  |
| 214 | ThePaw__go-gt | https://github.com/ThePaw/go-gt | a3fc93f019 | 2013-04-03 |  | 0/0/0 | EMPTY_GT |  |
| 215 | ThePaw__probab | https://github.com/ThePaw/probab | d66a7aa2ee | 2013-08-02 |  | 0/0/0 | EMPTY_GT |  |
| 216 | TheTannerRyan__ring | https://github.com/TheTannerRyan/ring | e0526f74ac | 2020-09-05 | 1.14 | 1/0/0 | EMPTY_GT |  |
| 217 | ThomasObenaus__go-conf | https://github.com/ThomasObenaus/go-conf | aee3436793 | 2025-01-28 | 1.23 | 162/19/22 | OK |  |
| 218 | ThreeDotsLabs__watermill | https://github.com/ThreeDotsLabs/watermill | 19b6816f64 | 2026-05-13 | 1.25.0 | 55/22/23 | OK |  |
| 219 | TimothyYe__skm | https://github.com/TimothyYe/skm | 1ff5ab4d32 | 2026-05-24 | 1.26.0 | 10/7/7 | OK |  |
| 220 | Tochemey__goakt | https://github.com/Tochemey/goakt | e370d0d4c0 | 2026-07-20 | 1.26.0 | 310/129/162 | OK |  |
| 221 | TrueFurby__go-callvis | https://github.com/TrueFurby/go-callvis | 67a26605e2 | 2025-11-30 | 1.22.0 | 21/9/9 | OK |  |
| 222 | TwinProduction__gatus | https://github.com/TwinProduction/gatus | ae7ca199aa | 2026-07-18 | 1.26.3 | 163/88/89 | OK |  |
| 223 | Ullaakut__cameradar | https://github.com/Ullaakut/cameradar | d286b0f981 | 2026-07-15 | 1.25.10 | 176/76/80 | OK |  |
| 224 | Unrud__remote-touchpad | https://github.com/Unrud/remote-touchpad | 996edb0501 | 2026-07-11 | 1.25.5 | 9/2/2 | OK |  |
| 225 | VerizonDigital__vflow | https://github.com/VerizonDigital/vflow | 811977722a | 2024-08-22 | 1.22 | 157/38/38 | OK |  |
| 226 | Vertamedia__chproxy | https://github.com/Vertamedia/chproxy | 77a99f12be | 2026-04-15 | 1.24 | 61/20/28 | OK |  |
| 227 | VictoriaMetrics__VictoriaMetrics | https://github.com/VictoriaMetrics/VictoriaMetrics | dce9514c65 | 2026-07-20 | 1.26.5 | 566/170/170 | OK |  |
| 228 | VictoriaMetrics__fastcache | https://github.com/VictoriaMetrics/fastcache | 091c9d553e | 2026-06-15 | 1.24.0 | 9/3/4 | OK |  |
| 229 | VinGarcia__ksql | https://github.com/VinGarcia/ksql | 2f80a22257 | 2026-04-02 | 1.18 | 13/4/4 | OK |  |
| 230 | VividCortex__ewma | https://github.com/VividCortex/ewma | 487e8c9fe1 | 2021-04-26 | 1.12 | 1/0/0 | EMPTY_GT |  |
| 231 | VividCortex__godaemon | https://github.com/VividCortex/godaemon | f8c5ec7b59 | 2021-04-26 | 1.12 | 1/0/0 | EMPTY_GT |  |
| 232 | VividCortex__multitick | https://github.com/VividCortex/multitick | fe1ff67aa7 | 2021-04-26 | 1.12 | 0/0/0 | EMPTY_GT |  |
| 233 | VividCortex__pm | https://github.com/VividCortex/pm | baa672fec1 | 2020-12-15 | 1.11 | 2/1/1 | OK |  |
| 234 | VividCortex__robustly | https://github.com/VividCortex/robustly | 5e1fcf937f | 2021-04-26 | 1.12 | 2/1/1 | OK |  |
| 235 | VividCortex__siesta | https://github.com/VividCortex/siesta | 99bec23e03 | 2021-04-26 | 1.12 | 1/0/0 | EMPTY_GT |  |
| 236 | Voxray-AI__Voxray | https://github.com/Voxray-AI/Voxray | 4747b66617 | 2026-06-15 | 1.25.0 | 364/149/149 | OK |  |
| 237 | Wing924__hostutils | https://github.com/Wing924/hostutils | 578e13e8b2 | 2024-06-05 | 1.20 | 4/0/3 | EMPTY_GT |  |
| 238 | Wing924__ltsv | https://github.com/Wing924/ltsv | 86cc90a9c0 | 2024-09-27 | 1.23.1 | 0/0/0 | EMPTY_GT |  |
| 239 | Wing924__shellwords | https://github.com/Wing924/shellwords | 1ddc27bb93 | 2023-04-20 | 1.17 | 0/0/0 | EMPTY_GT |  |
| 240 | Wissance__stringFormatter | https://github.com/Wissance/stringFormatter | 953362c110 | 2026-04-21 | 1.18 | 0/0/0 | EMPTY_GT |  |
| 241 | Workiva__go-datastructures | https://github.com/Workiva/go-datastructures | 89d15facb2 | 2025-10-31 | 1.15 | 19/7/7 | OK |  |
| 242 | Xamber__Varis | https://github.com/Xamber/Varis | 39307781c3 | 2018-08-02 |  | 0/0/0 | EMPTY_GT |  |
| 243 | Yiling-J__cacheme-go | https://github.com/Yiling-J/cacheme-go | d651a555be | 2021-12-18 | 1.16 | 165/13/17 | OK |  |
| 244 | Yiling-J__piper | https://github.com/Yiling-J/piper | 270d3c2176 | 2021-12-03 | 1.16 | 161/15/19 | OK |  |
| 245 | Yiling-J__theine-go | https://github.com/Yiling-J/theine-go | 1be01cecc1 | 2025-09-18 | 1.20 | 15/3/8 | OK |  |
| 246 | Zaba505__gws | https://github.com/Zaba505/gws | 0f356a408e | 2020-09-04 | 1.14 | 34/2/2 | OK |  |
| 247 | Zxilly__go-size-analyzer | https://github.com/Zxilly/go-size-analyzer | f00de7e09e | 2026-07-19 | 1.26.0 | 122/57/61 | OK |  |
| 248 | a-h__templ | https://github.com/a-h/templ | 04abee5364 | 2026-07-15 | 1.25.0 | 28/16/20 | OK |  |
| 249 | a2800276__porter | https://github.com/a2800276/porter | c8aa489525 | 2026-02-09 | 1.25.6 | 1/0/0 | EMPTY_GT |  |
| 250 | a8m__go-lang-cheat-sheet | https://github.com/a8m/go-lang-cheat-sheet | 9c634033ef | 2022-08-27 |  | 0/0/0 | EMPTY_GT |  |
| 251 | a8m__rql | https://github.com/a8m/rql | cd8b893ef7 | 2024-07-25 | 1.16 | 18/5/6 | OK |  |
| 252 | aafeher__go-sitemap-parser | https://github.com/aafeher/go-sitemap-parser | de1f4d65dc | 2026-07-06 | 1.25.0 | 9/2/2 | OK |  |
| 253 | aalpar__deheap | https://github.com/aalpar/deheap | 9b86833c8c | 2026-03-12 | 1.23 | 0/0/0 | EMPTY_GT |  |
| 254 | aarzilli__golua | https://github.com/aarzilli/golua | 248753f411 | 2025-02-17 | 1.15 | 1/0/0 | EMPTY_GT |  |
| 255 | abadojack__whatlanggo | https://github.com/abadojack/whatlanggo | 9a096a1227 | 2019-03-06 | 1.12 | 1/0/0 | EMPTY_GT |  |
| 256 | abahmed__kwatch | https://github.com/abahmed/kwatch | 9d2627cfad | 2026-07-07 | 1.26.1 | 91/57/59 | OK |  |
| 257 | abdullahselek__go-here | https://github.com/abdullahselek/go-here | 351e56ef01 | 2020-05-23 |  | 0/0/0 | EMPTY_GT |  |
| 258 | abecodes__dft | https://github.com/abecodes/dft | 283757dd7d | 2025-01-25 | 1.22.4 | 0/0/0 | EMPTY_GT |  |
| 259 | abemedia__go-don | https://github.com/abemedia/go-don | 6bbce086c9 | 2026-07-03 | 1.24.0 | 31/13/13 | OK |  |
| 260 | abhimanyu003__sttr | https://github.com/abhimanyu003/sttr | a024bff2c2 | 2025-12-25 | 1.24.5 | 65/42/42 | OK |  |
| 261 | abice__go-enum | https://github.com/abice/go-enum | 5807081773 | 2026-07-12 | 1.25.0 | 50/23/29 | OK |  |
| 262 | abiosoft__colima | https://github.com/abiosoft/colima | 896f65456e | 2026-07-13 | 1.25.0 | 30/17/17 | OK |  |
| 263 | abrahambotros__lore | https://github.com/abrahambotros/lore | c48946c118 | 2017-10-21 |  | 0/0/0 | EMPTY_GT |  |
| 264 | abraithwaite__jeff | https://github.com/abraithwaite/jeff | 679b44de3b | 2021-06-23 | 1.14 | 22/6/10 | OK |  |
| 265 | abusomani__go-palette | https://github.com/abusomani/go-palette | 7d38713ba8 | 2023-03-09 | 1.19 | 0/0/0 | EMPTY_GT |  |
| 266 | abusomani__jsonhandlers | https://github.com/abusomani/jsonhandlers | a7f76c2cc9 | 2023-03-09 | 1.20 | 7/0/4 | EMPTY_GT |  |
| 267 | achannarasappa__ticker | https://github.com/achannarasappa/ticker | 3e659aad55 | 2026-06-28 | 1.26.4 | 367/37/48 | OK |  |
| 268 | aclindsa__ofxgo | https://github.com/aclindsa/ofxgo | b2d1132f59 | 2026-02-09 | 1.9 | 12/4/4 | OK |  |
| 269 | adam-hanna__jwt-auth | https://github.com/adam-hanna/jwt-auth | 648d06fb00 | 2021-08-01 |  | 0/0/0 | EMPTY_GT |  |
| 270 | adam-hanna__sessions | https://github.com/adam-hanna/sessions | 76e553fb33 | 2020-04-15 | 1.14 | 3/2/2 | OK |  |
| 271 | adamluzsi__testcase | https://github.com/adamluzsi/testcase | bba2ad9d6b | 2026-07-04 | 1.18 | 1/0/0 | EMPTY_GT |  |
| 272 | adelowo__gulter | https://github.com/adelowo/gulter | 1ef1732716 | 2026-07-19 | 1.25.0 | 63/36/42 | OK |  |
| 273 | adelowo__onecache | https://github.com/adelowo/onecache | 4af24e41db | 2020-05-25 | 1.13 | 22/2/2 | OK |  |
| 274 | adhocore__gronx | https://github.com/adhocore/gronx | 5068277120 | 2026-05-21 | 1.13 | 1/0/0 | EMPTY_GT |  |
| 275 | adlio__schema | https://github.com/adlio/schema | 366cd4cb24 | 2026-07-04 | 1.25.11 | 0/0/0 | EMPTY_GT |  |
| 276 | adlio__trello | https://github.com/adlio/trello | 1a10fa0aa3 | 2026-05-02 | 1.21 | 2/1/1 | OK |  |
| 277 | adnanh__webhook | https://github.com/adnanh/webhook | 857e708f87 | 2026-02-12 | 1.21 | 21/10/10 | OK |  |
| 278 | adrg__libvlc-go | https://github.com/adrg/libvlc-go | 1c8ee87bec | 2026-06-05 |  | 0/0/0 | EMPTY_GT |  |
| 279 | adrg__xdg | https://github.com/adrg/xdg | b1241e93d6 | 2026-06-05 | 1.25.0 | 8/0/4 | EMPTY_GT |  |
| 280 | adrianbrad__queue | https://github.com/adrianbrad/queue | e1005774ed | 2026-07-06 | 1.20 | 1/0/0 | EMPTY_GT |  |
| 281 | adrianmo__go-nmea | https://github.com/adrianmo/go-nmea | fb5708f1f1 | 2026-06-10 | 1.14 | 7/0/4 | EMPTY_GT |  |
| 282 | adrianosela__multikey | https://github.com/adrianosela/multikey | f34358b3ba | 2024-05-20 | 1.20 | 7/0/4 | EMPTY_GT |  |
| 283 | adrianosela__sslmgr | https://github.com/adrianosela/sslmgr | 8538201cc1 | 2025-06-02 | 1.23.0 | 199/46/49 | OK |  |
| 284 | aerogo__codetree | https://github.com/aerogo/codetree | e9240b8be5 | 2019-10-26 | 1.12 | 0/0/0 | EMPTY_GT |  |
| 285 | aerogo__log | https://github.com/aerogo/log | 9224037b5c | 2019-10-26 | 1.12 | 2/0/1 | EMPTY_GT |  |
| 286 | aerospike__aerospike-client-go | https://github.com/aerospike/aerospike-client-go | f7284c3cc6 | 2026-06-10 | 1.23.0 | 48/3/14 | OK |  |
| 287 | afjoseph__RAKE.Go | https://github.com/afjoseph/RAKE.Go | 7593701b67 | 2025-06-12 |  | 0/0/0 | EMPTY_GT |  |
| 288 | agenticenv__agent-sdk-go | https://github.com/agenticenv/agent-sdk-go | 4f57729214 | 2026-07-20 | 1.26 | 386/111/113 | OK |  |
| 289 | agext__levenshtein | https://github.com/agext/levenshtein | 768bcf7469 | 2020-10-15 |  | 1/0/0 | EMPTY_GT |  |
| 290 | agext__uuid | https://github.com/agext/uuid | 7ff2634396 | 2020-03-12 |  | 1/0/0 | EMPTY_GT |  |
| 291 | agilira__argus | https://github.com/agilira/argus | 6a04d1f230 | 2026-07-14 | 1.25.9 | 7/5/5 | OK |  |
| 292 | agilira__flash-flags | https://github.com/agilira/flash-flags | a6ecd84e35 | 2026-05-03 | 1.25.9 | 1/0/0 | EMPTY_GT |  |
| 293 | agilira__orpheus | https://github.com/agilira/orpheus | 394a9676ba | 2026-05-24 | 1.25.9 | 6/5/5 | OK |  |
| 294 | agnivade__levenshtein | https://github.com/agnivade/levenshtein | fcfe234306 | 2026-03-03 | 1.21 | 0/0/0 | EMPTY_GT |  |
| 295 | agnivade__wasmbrowsertest | https://github.com/agnivade/wasmbrowsertest | ff350cc7eb | 2026-06-09 | 1.26 | 17/9/9 | OK |  |
| 296 | agoalofalife__event | https://github.com/agoalofalife/event | 5819560c67 | 2018-02-19 |  | 0/0/0 | EMPTY_GT |  |
| 297 | agonopol__go-stem | https://github.com/agonopol/go-stem | 9858850182 | 2015-06-30 |  | 0/0/0 | EMPTY_GT |  |
| 298 | ahmadraza100__dotlock | https://github.com/ahmadraza100/dotlock | 1878038257 | 2026-05-30 | 1.24.2 | 59/32/32 | OK |  |
| 299 | ahmedakef__gotutor | https://github.com/ahmedakef/gotutor | 691c0ea96f | 2026-04-30 | 1.24 | 44/14/14 | OK |  |
| 300 | ahmetalpbalkan__go-linq | https://github.com/ahmetalpbalkan/go-linq | b945a41e41 | 2025-10-19 | 1.23 | 1/0/0 | EMPTY_GT |  |
| 301 | ahmetalpbalkan__govvv | https://github.com/ahmetalpbalkan/govvv | ce1f54b04c | 2023-03-24 |  | 0/0/0 | EMPTY_GT |  |
| 302 | aidarkhanov__nanoid | https://github.com/aidarkhanov/nanoid | 84fce99176 | 2021-09-16 | 1.14 | 0/0/0 | EMPTY_GT |  |
| 303 | aio-arch__graphlib | https://github.com/aio-arch/graphlib | 5c3c159aba | 2025-08-06 | 1.18 | 0/0/0 | EMPTY_GT |  |
| 304 | airbusgeo__godal | https://github.com/airbusgeo/godal | b0c8b8fa66 | 2026-05-22 | 1.23.0 | 319/51/55 | OK |  |
| 305 | ajitpratap0__GoSQLX | https://github.com/ajitpratap0/GoSQLX | dc4416395f | 2026-05-27 | 1.26.1 | 131/15/66 | OK |  |
| 306 | ajstarks__svgo | https://github.com/ajstarks/svgo | 1546f124cd | 2021-10-24 | 1.15 | 15/3/3 | OK |  |
| 307 | ajvb__kala | https://github.com/ajvb/kala | 4eb4f7ae04 | 2023-02-21 | 1.13 | 235/41/50 | OK |  |
| 308 | akamensky__argparse | https://github.com/akamensky/argparse | bafecdd102 | 2022-08-11 | 1.13 | 0/0/0 | EMPTY_GT |  |
| 309 | akrennmair__gopcap | https://github.com/akrennmair/gopcap | 00e1103325 | 2015-07-28 |  | 0/0/0 | EMPTY_GT |  |
| 310 | akrylysov__pogreb | https://github.com/akrylysov/pogreb | b86080d062 | 2026-04-06 | 1.18 | 0/0/0 | EMPTY_GT |  |
| 311 | alajmo__mani | https://github.com/alajmo/mani | ca8160952a | 2026-05-19 | 1.26.3 | 53/25/28 | OK |  |
| 312 | alajmo__sake | https://github.com/alajmo/sake | 86986df901 | 2026-05-30 | 1.26.3 | 45/19/21 | OK |  |
| 313 | alanzng__manifestor | https://github.com/alanzng/manifestor | ae5ecd57a1 | 2026-07-06 | 1.22 | 1/0/0 | EMPTY_GT |  |
| 314 | albrow__forms | https://github.com/albrow/forms | 8737e1d22f | 2022-12-15 |  | 0/0/0 | EMPTY_GT |  |
| 315 | albrow__zoom | https://github.com/albrow/zoom | 1cfff10695 | 2023-02-02 |  | 0/0/0 | EMPTY_GT |  |
| 316 | aldor007__mort | https://github.com/aldor007/mort | 9cf57d34d2 | 2025-12-19 | 1.25 | 327/95/105 | OK |  |
| 317 | alebeck__boring | https://github.com/alebeck/boring | e82ba7b697 | 2026-07-14 | 1.25.0 | 9/6/7 | OK |  |
| 318 | alecthomas__go_serialization_benchmarks | https://github.com/alecthomas/go_serialization_benchmarks | 833ed64040 | 2025-07-04 | 1.22.4 | 233/48/48 | OK |  |
| 319 | alecthomas__kingpin | https://github.com/alecthomas/kingpin | 6451cc5d2d | 2026-06-23 | 1.17 | 9/2/6 | OK |  |
| 320 | alecthomas__kong | https://github.com/alecthomas/kong | a5c9626880 | 2026-07-19 | 1.20 | 4/0/3 | EMPTY_GT |  |
| 321 | alegrey91__fwdctl | https://github.com/alegrey91/fwdctl | 0257a51b33 | 2026-07-10 | 1.22 | 113/24/24 | OK |  |
| 322 | aler9__goroslib | https://github.com/aler9/goroslib | 822b5676f4 | 2025-06-02 | 1.23.0 | 55/22/26 | OK |  |
| 323 | aler9__gortsplib | https://github.com/aler9/gortsplib | adb6e25d64 | 2026-07-19 | 1.25.0 | 29/12/18 | OK |  |
| 324 | alesr__redact | https://github.com/alesr/redact | 2ff48033b1 | 2026-04-17 | 1.26 | 0/0/0 | EMPTY_GT |  |
| 325 | alesr__templator | https://github.com/alesr/templator | 48e3be7096 | 2026-04-18 | 1.26 | 11/1/5 | OK |  |
| 326 | alexcesaro__log | https://github.com/alexcesaro/log | 61e686294e | 2015-09-16 |  | 0/0/0 | EMPTY_GT |  |
| 327 | alexcfv__go-pcaplite | https://github.com/alexcfv/go-pcaplite | a352b73b3a | 2026-05-29 | 1.24.1 | 11/1/1 | OK |  |
| 328 | alexedwards__scs | https://github.com/alexedwards/scs | 209de6e426 | 2025-10-02 | 1.12 | 1/0/0 | EMPTY_GT |  |
| 329 | alexeyco__binder | https://github.com/alexeyco/binder | 2a21303f58 | 2018-07-30 |  | 0/0/0 | EMPTY_GT |  |
| 330 | alexeyco__pig | https://github.com/alexeyco/pig | b7693bcf73 | 2025-11-14 | 1.23.0 | 31/9/10 | OK |  |
| 331 | alexeyco__simpletable | https://github.com/alexeyco/simpletable | 74ab2ba3af | 2021-04-02 | 1.16 | 3/2/2 | OK |  |
| 332 | alexflint__go-arg | https://github.com/alexflint/go-arg | bd684bc5f4 | 2025-12-27 | 1.18 | 8/1/5 | OK |  |
| 333 | alexliesenfeld__health | https://github.com/alexliesenfeld/health | 10af2e7917 | 2026-06-15 | 1.18 | 0/0/0 | EMPTY_GT |  |
| 334 | alexpantyukhin__go-pattern-match | https://github.com/alexpantyukhin/go-pattern-match | d84479c117 | 2023-03-02 |  | 0/0/0 | EMPTY_GT |  |
| 335 | alexsergivan__transliterator | https://github.com/alexsergivan/transliterator | ea2215d10f | 2022-09-14 | 1.13 | 0/0/0 | EMPTY_GT |  |
| 336 | alexsniffin__gosd | https://github.com/alexsniffin/gosd | 0fffbadff2 | 2022-08-16 | 1.19 | 1/0/0 | EMPTY_GT |  |
| 337 | alfiankan__crab-config-files-templating | https://github.com/alfiankan/crab-config-files-templating | 897d550033 | 2022-07-21 | 1.18 | 13/2/6 | OK |  |
| 338 | alibaba__opentelemetry-go-auto-instrumentation | https://github.com/alibaba/opentelemetry-go-auto-instrumentation | 5bd4860fef | 2026-07-20 | 1.24.0 | 131/52/54 | OK |  |
| 339 | aliexpressru__gomemcached | https://github.com/aliexpressru/gomemcached | 6cb71dd2d9 | 2025-12-04 | 1.24.10 | 57/18/23 | OK |  |
| 340 | alioygur__gores | https://github.com/alioygur/gores | c087a622aa | 2021-01-01 | 1.15 | 1/0/0 | EMPTY_GT |  |
| 341 | alitto__pond | https://github.com/alitto/pond | e309c37eb8 | 2026-04-14 | 1.20 | 1/0/0 | EMPTY_GT |  |
| 342 | alixaxel__genex | https://github.com/alixaxel/genex | 2f0294e19d | 2020-01-05 |  | 0/0/0 | EMPTY_GT |  |
| 343 | alixaxel__pagerank | https://github.com/alixaxel/pagerank | 900657b89d | 2020-01-05 |  | 0/0/0 | EMPTY_GT |  |
| 344 | allaboutapps__go-starter | https://github.com/allaboutapps/go-starter | 9f7a54cca5 | 2025-10-16 | 1.24.0 | 248/87/95 | OK |  |
| 345 | allegro__bigcache | https://github.com/allegro/bigcache | 532eb6410a | 2026-02-05 | 1.16 | 0/0/0 | EMPTY_GT |  |
| 346 | alouche__rodent | https://github.com/alouche/rodent | 2d6702707a | 2017-04-22 |  | 0/0/0 | EMPTY_GT |  |
| 347 | alpeb__go-finance | https://github.com/alpeb/go-finance | e4f601ef43 | 2021-12-02 | 1.17 | 1/0/0 | EMPTY_GT |  |
| 348 | alvii147__gloop | https://github.com/alvii147/gloop |  |  |  | 0/0/0 | EMPTY_GT |  |
| 349 | alwindoss__morse | https://github.com/alwindoss/morse | 94455afe44 | 2022-08-30 | 1.17 | 0/0/0 | EMPTY_GT |  |
| 350 | amacneil__dbmate | https://github.com/amacneil/dbmate | 2183dd8c63 | 2026-07-16 | 1.25.0 | 356/69/70 | OK |  |
| 351 | amallia__go-ef | https://github.com/amallia/go-ef | 42257fcce5 | 2017-09-25 |  | 0/0/0 | EMPTY_GT |  |
| 352 | amimof__huego | https://github.com/amimof/huego | b5d5385f8a | 2023-06-30 | 1.13 | 13/0/6 | EMPTY_GT |  |
| 353 | amit-davidson__Chronos | https://github.com/amit-davidson/Chronos | 0fc56a9e04 | 2022-04-22 | 1.15 | 16/7/7 | OK |  |
| 354 | amit-davidson__LibraDB | https://github.com/amit-davidson/LibraDB | 4a154c8cb2 | 2022-10-06 | 1.17 | 8/5/5 | OK |  |
| 355 | amit-davidson__awesome-golang-workshops | https://github.com/amit-davidson/awesome-golang-workshops | e725559e74 | 2021-07-07 |  | 0/0/0 | EMPTY_GT |  |
| 356 | amjadjibon__memsh | https://github.com/amjadjibon/memsh | 35b241fa04 | 2026-07-16 | 1.26 | 116/56/56 | OK |  |
| 357 | amoghe__distillog | https://github.com/amoghe/distillog | ae382b35b7 | 2018-07-26 |  | 0/0/0 | EMPTY_GT |  |
| 358 | anacrolix__dht | https://github.com/anacrolix/dht | ec3a9bd994 | 2026-05-25 | 1.23 | 356/71/80 | OK |  |
| 359 | anacrolix__torrent | https://github.com/anacrolix/torrent | fd15081f8e | 2026-06-22 | 1.24.0 | 0/0/0 | EMPTY_GT |  |
| 360 | anacrolix__utp | https://github.com/anacrolix/utp | a62b81613a | 2023-05-19 | 1.20 | 113/7/13 | OK |  |
| 361 | anatol__booster | https://github.com/anatol/booster | 57b030b1d6 | 2026-07-18 | 1.26 | 66/38/38 | OK |  |
| 362 | anatol__luks.go | https://github.com/anatol/luks.go | 2658459c8c | 2026-06-15 | 1.26 | 20/5/13 | OK |  |
| 363 | anchore__syft | https://github.com/anchore/syft | ae9534203d | 2026-07-17 | 1.26.3 | 783/288/305 | OK |  |
| 364 | andizzle__rwdb | https://github.com/andizzle/rwdb | 0d10fac69b | 2017-11-08 |  | 0/0/0 | EMPTY_GT |  |
| 365 | andlabs__ui | https://github.com/andlabs/ui | 70a69d6ae3 | 2020-06-10 |  | 0/0/0 | EMPTY_GT |  |
| 366 | andreimerlescu__entpassgen | https://github.com/andreimerlescu/entpassgen | 8ba17317d4 | 2026-04-19 | 1.22 | 0/0/0 | EMPTY_GT |  |
| 367 | andrewstuart__goq | https://github.com/andrewstuart/goq | 93e9224e0a | 2021-09-01 | 1.12 | 13/3/6 | OK |  |
| 368 | andskur__argon2-hashing | https://github.com/andskur/argon2-hashing | 10898e64d5 | 2025-05-13 | 1.23.0 | 6/2/2 | OK |  |
| 369 | andy2046__failured | https://github.com/andy2046/failured | 720f9b5b46 | 2021-08-01 | 1.15 | 2/1/1 | OK |  |
| 370 | andy2046__tik | https://github.com/andy2046/tik | c3ae55e618 | 2020-10-17 | 1.12 | 23/3/3 | OK |  |
| 371 | andybons__hipchat | https://github.com/andybons/hipchat | c9ecf9bd57 | 2016-03-24 |  | 0/0/0 | EMPTY_GT |  |
| 372 | andygeiss__ecs | https://github.com/andygeiss/ecs | 8c0fc7ed3b | 2025-11-21 | 1.25.4 | 1/0/0 | EMPTY_GT |  |
| 373 | andygeiss__esp32-transpiler | https://github.com/andygeiss/esp32-transpiler | 2b2d7fc770 | 2025-11-21 | 1.25.4 | 10/0/1 | EMPTY_GT |  |
| 374 | andygrunwald__cachet | https://github.com/andygrunwald/cachet | 34d0d1408d | 2021-06-22 |  | 0/0/0 | EMPTY_GT |  |
| 375 | andygrunwald__go-gerrit | https://github.com/andygrunwald/go-gerrit | 1ec7df4de9 | 2026-03-16 | 1.16 | 3/1/1 | OK |  |
| 376 | andygrunwald__go-jira | https://github.com/andygrunwald/go-jira | 204ada8a42 | 2026-06-14 | 1.21 | 6/4/5 | OK |  |
| 377 | andygrunwald__go-trending | https://github.com/andygrunwald/go-trending | 5a218a4378 | 2026-02-12 | 1.25 | 15/3/3 | OK |  |
| 378 | andygrunwald__megos | https://github.com/andygrunwald/megos | e9ff1cac83 | 2021-06-22 |  | 0/0/0 | EMPTY_GT |  |
| 379 | andygrunwald__vdf | https://github.com/andygrunwald/vdf | b494c6cf68 | 2026-06-20 | 1.25 | 7/0/4 | EMPTY_GT |  |
| 380 | ankorstore__yokai | https://github.com/ankorstore/yokai | 09f538c2cf | 2026-07-16 |  | 0/0/0 | EMPTY_GT |  |
| 381 | anqiansong__sqlgen | https://github.com/anqiansong/sqlgen | 293ac387ea | 2023-06-29 | 1.18 | 279/38/44 | OK |  |
| 382 | ansd__lastpass-go | https://github.com/ansd/lastpass-go | 280cc13dd3 | 2022-09-10 | 1.12 | 35/1/10 | OK |  |
| 383 | antchfx__antch | https://github.com/antchfx/antch | b3a15a6691 | 2020-05-31 |  | 0/0/0 | EMPTY_GT |  |
| 384 | antchfx__htmlquery | https://github.com/antchfx/htmlquery | bfb8bdf08b | 2026-05-24 | 1.14 | 15/4/4 | OK |  |
| 385 | antchfx__xmlquery | https://github.com/antchfx/xmlquery | e79c9c9146 | 2026-03-21 | 1.14 | 15/4/4 | OK |  |
| 386 | antchfx__xpath | https://github.com/antchfx/xpath | d666d4b6f3 | 2026-07-20 | 1.14 | 0/0/0 | EMPTY_GT |  |
| 387 | antham__chyle | https://github.com/antham/chyle | e6e5859110 | 2026-07-11 | 1.25.0 | 74/37/43 | OK |  |
| 388 | antham__envh | https://github.com/antham/envh | dc96f9898b | 2026-01-16 | 1.18 | 9/0/6 | EMPTY_GT |  |
| 389 | antham__ghokin | https://github.com/antham/ghokin | 5d63631afb | 2026-07-14 | 1.25.0 | 43/23/27 | OK |  |
| 390 | antham__gommit | https://github.com/antham/gommit | f03c789b93 | 2026-07-09 | 1.25.0 | 72/37/42 | OK |  |
| 391 | antham__strumt | https://github.com/antham/strumt | 6efbc2e1b9 | 2023-02-27 |  | 0/0/0 | EMPTY_GT |  |
| 392 | antham__yogo | https://github.com/antham/yogo | cdb5c3b105 | 2026-07-09 | 1.25.0 | 41/17/22 | OK |  |
| 393 | anthdm__hollywood | https://github.com/anthdm/hollywood | b57d10b090 | 2026-06-06 | 1.22.12 | 118/38/42 | OK |  |
| 394 | anthonynsimon__bild | https://github.com/anthonynsimon/bild | 86e83cd0a5 | 2026-07-09 | 1.25.0 | 11/4/4 | OK |  |
| 395 | antonmedv__expr | https://github.com/antonmedv/expr | 4b31df3a2e | 2026-07-07 | 1.18 | 1/0/0 | EMPTY_GT |  |
| 396 | antonmedv__fx | https://github.com/antonmedv/fx | bb2c344765 | 2026-05-11 | 1.23.0 | 58/28/34 | OK |  |
| 397 | antst__go-apispec | https://github.com/antst/go-apispec | 63f249957e | 2026-06-24 | 1.25.0 | 17/4/9 | OK |  |
| 398 | aofei__cameron | https://github.com/aofei/cameron | 966aea8b2d | 2026-02-11 | 1.13 | 0/0/0 | EMPTY_GT |  |
| 399 | aofei__sandid | https://github.com/aofei/sandid | 6cbf14c5ac | 2025-05-17 | 1.13 | 1/0/0 | EMPTY_GT |  |
| 400 | apache__calcite-avatica-go | https://github.com/apache/calcite-avatica-go | 6e6fead093 | 2026-06-01 | 1.25.0 | 33/12/12 | OK |  |
| 401 | apecloud__kubeblocks | https://github.com/apecloud/kubeblocks | ff1ed7218f | 2026-07-20 | 1.25.0 | 338/135/139 | OK |  |
| 402 | apex__log | https://github.com/apex/log | 8da83152b5 | 2020-08-18 | 1.13 | 49/18/23 | OK |  |
| 403 | aplescia-chwy__lets-go | https://github.com/aplescia-chwy/lets-go | 83816298be | 2021-04-24 | 1.15 | 45/11/15 | OK |  |
| 404 | appleboy__drone-jenkins | https://github.com/appleboy/drone-jenkins | 06507d40e6 | 2026-07-18 | 1.25.10 | 16/7/11 | OK |  |
| 405 | appleboy__drone-line | https://github.com/appleboy/drone-line | 7ad766b411 | 2021-06-18 | 1.13 | 60/32/36 | OK |  |
| 406 | appleboy__drone-scp | https://github.com/appleboy/drone-scp | bf6947a36d | 2026-07-18 | 1.25.10 | 27/15/19 | OK |  |
| 407 | appleboy__easyssh-proxy | https://github.com/appleboy/easyssh-proxy | 9c07c287cb | 2026-07-17 | 1.25.10 | 15/3/7 | OK |  |
| 408 | appleboy__gofight | https://github.com/appleboy/gofight | 638290c7fa | 2026-07-17 | 1.25.10 | 7/0/4 | EMPTY_GT |  |
| 409 | appleboy__gorush | https://github.com/appleboy/gorush | ed1e5d00e4 | 2026-07-12 | 1.25.12 | 392/130/136 | OK |  |
| 410 | apsdehal__go-logger | https://github.com/apsdehal/go-logger | b0d6ccfee0 | 2019-05-15 |  | 0/0/0 | EMPTY_GT |  |
| 411 | aptly-dev__aptly | https://github.com/aptly-dev/aptly | f59b0d2b06 | 2026-07-01 | 1.26 | 422/171/182 | OK |  |
| 412 | araddon__dateparse | https://github.com/araddon/dateparse | 6b43995a97 | 2021-04-29 | 1.12 | 10/3/7 | OK |  |
| 413 | aragossa__pii-shield | https://github.com/aragossa/pii-shield | cdc033aaea | 2026-07-20 | 1.26.3 | 42/13/14 | OK |  |
| 414 | arceus-7__chroma16 | https://github.com/arceus-7/chroma16 | 67998713a6 | 2026-03-25 | 1.24.3 | 17/13/13 | OK |  |
| 415 | arch-go__arch-go | https://github.com/arch-go/arch-go | 6cb436f84f | 2026-02-13 | 1.24.0 | 103/26/27 | OK |  |
| 416 | ardanlabs__service | https://github.com/ardanlabs/service | 43e8ae07ab | 2026-06-22 | 1.26.0 | 177/63/64 | OK |  |
| 417 | arduino__arduino-cli | https://github.com/arduino/arduino-cli | 26b3cc6cb6 | 2026-07-14 | 1.26.1 | 449/81/87 | OK |  |
| 418 | ariga__atlas | https://github.com/ariga/atlas | a5e0aecc2b | 2026-06-22 | 1.26.4 | 38/17/18 | OK |  |
| 419 | arikama__go-mysql-test-container | https://github.com/arikama/go-mysql-test-container | ce91e693f2 | 2022-06-08 | 1.18 | 303/27/31 | OK |  |
| 420 | arl__statsviz | https://github.com/arl/statsviz | a22de27776 | 2026-07-04 | 1.25 | 11/1/3 | OK |  |
| 421 | arthurkiller__rollingWriter | https://github.com/arthurkiller/rollingWriter | 3145271986 | 2023-10-16 | 1.12 | 6/1/4 | OK |  |
| 422 | arthurkushman__buildsqlx | https://github.com/arthurkushman/buildsqlx | 6745db8fc9 | 2024-04-21 | 1.18 | 13/3/7 | OK |  |
| 423 | arthurkushman__pgo | https://github.com/arthurkushman/pgo | fe06d63366 | 2026-05-05 | 1.26 | 0/0/0 | EMPTY_GT |  |
| 424 | artonge__go-csv-tag | https://github.com/artonge/go-csv-tag | 82d996c79c | 2025-06-17 | 1.24 | 1/0/0 | EMPTY_GT |  |
| 425 | artonge__go-gtfs | https://github.com/artonge/go-gtfs | af448d2fc0 | 2023-08-16 | 1.12 | 2/1/1 | OK |  |
| 426 | artyom__autoflags | https://github.com/artyom/autoflags | a3f3a3ebf7 | 2022-06-11 | 1.16 | 1/0/0 | EMPTY_GT |  |
| 427 | arunsupe__semantic-grep | https://github.com/arunsupe/semantic-grep | ded610ca32 | 2024-08-19 | 1.22.5 | 8/4/4 | OK |  |
| 428 | arunsworld__nursery | https://github.com/arunsworld/nursery | ecfe7a688c | 2021-07-08 | 1.13 | 1/0/0 | EMPTY_GT |  |
| 429 | arxdsilva__golang-ifood-sdk | https://github.com/arxdsilva/golang-ifood-sdk | b6812a5f43 | 2022-04-05 | 1.17 | 19/8/9 | OK |  |
| 430 | asafschers__goscore | https://github.com/asafschers/goscore | 6e6e174c15 | 2019-08-23 |  | 0/0/0 | EMPTY_GT |  |
| 431 | asaskevich__EventBus | https://github.com/asaskevich/EventBus | 49d423059e | 2020-09-08 |  | 0/0/0 | EMPTY_GT |  |
| 432 | asaskevich__govalidator | https://github.com/asaskevich/govalidator | 3dd3875e2b | 2026-04-20 | 1.13 | 1/0/0 | EMPTY_GT |  |
| 433 | asciimoo__colly | https://github.com/asciimoo/colly | 20d31482af | 2026-06-18 | 1.24.0 | 34/18/18 | OK |  |
| 434 | asciimoo__wuzz | https://github.com/asciimoo/wuzz | 06eb2a2279 | 2026-06-18 | 1.24.0 | 40/24/24 | OK |  |
| 435 | asdine__storm | https://github.com/asdine/storm | 23213e9525 | 2020-09-09 | 1.13 | 20/5/8 | OK |  |
| 436 | ashleymcnamara__gophers | https://github.com/ashleymcnamara/gophers | 97545458c8 | 2026-06-27 |  | 0/0/0 | EMPTY_GT |  |
| 437 | ashwingopalsamy__uuidcheck | https://github.com/ashwingopalsamy/uuidcheck | 68e0ce3687 | 2024-12-08 | 1.23.4 | 0/0/0 | EMPTY_GT |  |
| 438 | askeladdk__prattle | https://github.com/askeladdk/prattle | 68ed6f4763 | 2025-10-19 | 1.16 | 0/0/0 | EMPTY_GT |  |
| 439 | assafmo__joincap | https://github.com/assafmo/joincap | 9ccd77bb9d | 2025-06-06 | 1.14 | 13/5/5 | OK |  |
| 440 | astaxie__build-web-application-with-golang | https://github.com/astaxie/build-web-application-with-golang | c294b087b9 | 2022-09-10 |  | 0/0/0 | EMPTY_GT |  |
| 441 | asticode__go-astiav | https://github.com/asticode/go-astiav | ac70158432 | 2026-07-17 | 1.21 | 8/1/5 | OK |  |
| 442 | asticode__go-astisub | https://github.com/asticode/go-astisub | 52190f1d60 | 2026-07-08 | 1.13 | 15/4/8 | OK |  |
| 443 | asticode__go-astitodo | https://github.com/asticode/go-astitodo | 909b1757d8 | 2024-04-22 | 1.19 | 8/1/5 | OK |  |
| 444 | asticode__go-astits | https://github.com/asticode/go-astits | 5fcd7d8557 | 2026-05-14 | 1.20 | 9/2/6 | OK |  |
| 445 | asty-org__asty | https://github.com/asty-org/asty | f7439dbcce | 2023-05-23 | 1.20 | 0/0/0 | EMPTY_GT |  |
| 446 | asynkron__protoactor-go | https://github.com/asynkron/protoactor-go | 288962e52f | 2026-01-18 | 1.25.3 | 220/107/109 | OK |  |
| 447 | atelpis__enflag | https://github.com/atelpis/enflag | 21602893cf | 2025-09-29 | 1.18 | 1/0/0 | EMPTY_GT |  |
| 448 | atemerev__skynet | https://github.com/atemerev/skynet | b5829d75ac | 2023-11-10 |  | 0/0/0 | EMPTY_GT |  |
| 449 | augmentable-dev__tickgit | https://github.com/augmentable-dev/tickgit | 9d0b151997 | 2020-06-21 | 1.13 | 126/19/19 | OK |  |
| 450 | aurelien-rainone__go-rquad | https://github.com/aurelien-rainone/go-rquad | 116c575120 | 2022-06-23 | 1.12 | 2/1/1 | OK |  |
| 451 | authzed__spicedb | https://github.com/authzed/spicedb | fd84b2a9bf | 2026-07-17 | 1.26.5 | 470/228/230 | OK |  |
| 452 | auyer__steganography | https://github.com/auyer/steganography | 4290c10991 | 2026-05-08 | 1.12 | 1/0/0 | EMPTY_GT |  |
| 453 | avahidi__interpol | https://github.com/avahidi/interpol | 7fe3c8d671 | 2025-07-05 | 1.13 | 1/0/0 | EMPTY_GT |  |
| 454 | avast__retry-go | https://github.com/avast/retry-go | 5bccbfa934 | 2026-02-12 | 1.20 | 7/0/4 | EMPTY_GT |  |
| 455 | avelino__slugify | https://github.com/avelino/slugify | 855f152bd7 | 2018-05-01 |  | 0/0/0 | EMPTY_GT |  |
| 456 | avito-tech__go-transaction-manager | https://github.com/avito-tech/go-transaction-manager | cff8fd5f7a | 2026-06-28 |  | 0/0/0 | EMPTY_GT |  |
| 457 | avito-tech__normalize | https://github.com/avito-tech/normalize | 07914ec46c | 2021-03-23 | 1.15 | 4/1/1 | OK |  |
| 458 | awalterschulze__goderive | https://github.com/awalterschulze/goderive | 1a5a06541a | 2025-03-06 | 1.24 | 8/3/3 | OK |  |
| 459 | awalterschulze__gographviz | https://github.com/awalterschulze/gographviz | 1aeb6b15b3 | 2023-02-28 | 1.19 | 14/0/0 | EMPTY_GT |  |
| 460 | awnumar__memguard | https://github.com/awnumar/memguard | a5d81463bf | 2026-05-08 | 1.25.0 | 8/4/4 | OK |  |
| 461 | awoodbeck__strftime | https://github.com/awoodbeck/strftime | 016cde65fc | 2018-02-21 |  | 0/0/0 | EMPTY_GT |  |
| 462 | aws__aws-sdk-go-v2 | https://github.com/aws/aws-sdk-go-v2 | 03519c98d9 | 2026-07-20 | 1.24 | 2/1/1 | OK |  |
| 463 | awsong__MMSEGO | https://github.com/awsong/MMSEGO | 38f37e9631 | 2012-04-18 |  | 0/0/0 | EMPTY_GT |  |
| 464 | axelspringer__go-chronos | https://github.com/axelspringer/go-chronos | 2e4feba1de | 2018-01-23 |  | 0/0/0 | EMPTY_GT |  |
| 465 | axiomhq__hyperloglog | https://github.com/axiomhq/hyperloglog | 460b011e6a | 2025-12-16 | 1.23 | 16/2/6 | OK |  |
| 466 | axllent__mailpit | https://github.com/axllent/mailpit | 408b30d597 | 2026-07-20 | 1.25.0 | 88/55/55 | OK |  |
| 467 | axzilla__templui | https://github.com/axzilla/templui | 57062bbd11 | 2026-07-10 | 1.24 | 40/7/7 | OK |  |
| 468 | aybabtme__portproxy | https://github.com/aybabtme/portproxy | 77db493954 | 2014-12-12 |  | 0/0/0 | EMPTY_GT |  |
| 469 | aymanhs__nanotdb | https://github.com/aymanhs/nanotdb | b79f7d7db5 | 2026-06-27 | 1.25.3 | 3/2/2 | OK |  |
| 470 | aymerick__douceur | https://github.com/aymerick/douceur | f9e29746e1 | 2018-03-22 |  | 0/0/0 | EMPTY_GT |  |
| 471 | aytechnet__decimal | https://github.com/aytechnet/decimal | 46839220f9 | 2026-06-02 | 1.13 | 1/0/0 | EMPTY_GT |  |
| 472 | azer__logger | https://github.com/azer/logger | b1d36ab0c5 | 2026-01-29 | 1.18 | 2/1/1 | OK |  |
| 473 | azr__generators | https://github.com/azr/generators | cefda667c6 | 2016-12-30 |  | 0/0/0 | EMPTY_GT |  |
| 474 | baalimago__wd-41 | https://github.com/baalimago/wd-41 | e5cd64615f | 2026-01-02 | 1.25 | 9/4/4 | OK |  |
| 475 | bahlo__go-styleguide | https://github.com/bahlo/go-styleguide |  |  |  | 0/0/0 | CLONE_FAIL |  |
| 476 | balerter__balerter | https://github.com/balerter/balerter | 1a5fcfd9b3 | 2022-08-15 | 1.18 | 146/58/64 | OK |  |
| 477 | balinomad__go-mockfs | https://github.com/balinomad/go-mockfs | f79a58aa05 | 2026-07-15 | 1.22 | 1/0/0 | EMPTY_GT |  |
| 478 | bamzi__jobrunner | https://github.com/bamzi/jobrunner | d0b7b07694 | 2019-10-09 | 1.13 | 2/1/1 | OK |  |
| 479 | barasher__go-exiftool | https://github.com/barasher/go-exiftool | f4f902ff98 | 2025-08-03 | 1.13 | 0/0/0 | EMPTY_GT |  |
| 480 | bart6114__cheek | https://github.com/bart6114/cheek | 0068a7ae1f | 2026-03-12 | 1.25.6 | 115/29/33 | OK |  |
| 481 | bartventer__gorm-multitenancy | https://github.com/bartventer/gorm-multitenancy | 1b62dccbc0 | 2025-12-05 | 1.24 | 15/9/9 | OK |  |
| 482 | barweiss__go-tuple | https://github.com/barweiss/go-tuple | a6c1a9b8cb | 2025-08-09 | 1.18 | 12/1/5 | OK |  |
| 483 | bayandin__awesome-awesomeness | https://github.com/bayandin/awesome-awesomeness | c35ea15c5d | 2022-03-24 |  | 0/0/0 | EMPTY_GT |  |
| 484 | bcicen__ctop | https://github.com/bcicen/ctop | 59f00dd6aa | 2022-08-01 | 1.18 | 105/43/43 | OK |  |
| 485 | bdjimmy__gbind | https://github.com/bdjimmy/gbind | a571fd1768 | 2022-06-14 | 1.16 | 36/6/17 | OK |  |
| 486 | beatlabs__harvester | https://github.com/beatlabs/harvester | f8c35d352d | 2026-07-01 | 1.26.1 | 113/20/24 | OK |  |
| 487 | beatlabs__patron | https://github.com/beatlabs/patron | 7688ba92b2 | 2026-07-05 | 1.25.0 | 117/76/77 | OK |  |
| 488 | bebop__poly | https://github.com/bebop/poly | 72017bd913 | 2026-06-09 | 1.21 | 23/7/13 | OK |  |
| 489 | becheran__roumon | https://github.com/becheran/roumon | bb999f1a58 | 2026-06-13 | 1.22 | 13/5/9 | OK |  |
| 490 | beefsack__go-astar | https://github.com/beefsack/go-astar | 4ecf9e3044 | 2020-08-28 |  | 0/0/0 | EMPTY_GT |  |
| 491 | beefsack__go-rate | https://github.com/beefsack/go-rate | 116f4ca011 | 2022-02-15 |  | 0/0/0 | EMPTY_GT |  |
| 492 | beego__beego | https://github.com/beego/beego | 939cfde380 | 2026-03-09 | 1.24.2 | 199/71/78 | OK |  |
| 493 | benbjohnson__ego | https://github.com/benbjohnson/ego | 609b6f5112 | 2021-07-14 | 1.13 | 0/0/0 | EMPTY_GT |  |
| 494 | bengadbois__pewpew | https://github.com/bengadbois/pewpew | 3dd155cb69 | 2026-03-28 | 1.25.0 | 39/19/19 | OK |  |
| 495 | benmanns__goworker | https://github.com/benmanns/goworker | f3aeb48676 | 2025-04-15 | 1.14 | 14/4/4 | OK |  |
| 496 | benthosdev__benthos | https://github.com/benthosdev/benthos | f96baf7bb7 | 2026-07-20 | 1.26.5 | 1406/497/510 | OK |  |
| 497 | betrybe__playbook-go | https://github.com/betrybe/playbook-go | HEAD |  |  | 0/0/0 | EMPTY_GT |  |
| 498 | beyang__hgo | https://github.com/beyang/hgo | d45f1891a4 | 2015-08-24 |  | 0/0/0 | EMPTY_GT |  |
| 499 | bhmj__jsonslice | https://github.com/bhmj/jsonslice | 73827306cb | 2024-08-12 | 1.17 | 2/1/1 | OK |  |
| 500 | bhope__hedge | https://github.com/bhope/hedge | 52b211857f | 2026-05-27 | 1.26.1 | 40/6/6 | OK |  |
| 501 | biter777__countries | https://github.com/biter777/countries | 4fa48089b8 | 2024-05-30 | 1.13 | 1/0/0 | EMPTY_GT |  |
| 502 | bitfield__gotestdox | https://github.com/bitfield/gotestdox | 951fc6b94b | 2025-09-16 | 1.22.0 | 13/5/8 | OK |  |
| 503 | bitfield__qrand | https://github.com/bitfield/qrand | 683c42648d | 2024-02-08 | 1.13 | 2/0/1 | EMPTY_GT |  |
| 504 | bitfield__script | https://github.com/bitfield/script | cf62146a25 | 2026-06-10 | 1.25.0 | 24/3/6 | OK |  |
| 505 | bitfield__uptimerobot | https://github.com/bitfield/uptimerobot | 9860c0d0e8 | 2023-04-22 | 1.13 | 247/16/17 | OK |  |
| 506 | bits-and-blooms__bitset | https://github.com/bits-and-blooms/bitset | 8c781489e3 | 2026-07-13 | 1.16 | 0/0/0 | EMPTY_GT |  |
| 507 | bits-and-blooms__bloom | https://github.com/bits-and-blooms/bloom | 4f9e5176a1 | 2026-07-10 | 1.16 | 3/1/2 | OK |  |
| 508 | bleenco__abstruse | https://github.com/bleenco/abstruse | b28dd99d7f | 2024-01-31 | 1.21.1 | 554/111/111 | OK |  |
| 509 | blevesearch__bleve | https://github.com/blevesearch/bleve | eea04eb5c5 | 2026-07-16 | 1.25.0 | 65/34/34 | OK |  |
| 510 | blevesearch__segment | https://github.com/blevesearch/segment | 0e07f57d30 | 2022-12-19 | 1.18 | 1/0/0 | EMPTY_GT |  |
| 511 | blind-oracle__cortex-tenant | https://github.com/blind-oracle/cortex-tenant | f5ef1ef737 | 2026-06-01 | 1.25.0 | 579/191/191 | OK |  |
| 512 | blind-oracle__nginx-prometheus | https://github.com/blind-oracle/nginx-prometheus | 2057d480ee | 2020-09-16 | 1.15 | 214/14/18 | OK |  |
| 513 | blind-oracle__psql-streamer | https://github.com/blind-oracle/psql-streamer | fb8ffdb3ee | 2020-03-10 | 1.14 | 126/33/36 | OK |  |
| 514 | blind-oracle__riemann-relay | https://github.com/blind-oracle/riemann-relay | 2bc2ebacaf | 2019-10-29 |  | 0/0/0 | EMPTY_GT |  |
| 515 | blinklabs-io__nview | https://github.com/blinklabs-io/nview | 1488e2c510 | 2026-07-19 | 1.25.0 | 60/22/22 | OK |  |
| 516 | blockloop__scan | https://github.com/blockloop/scan | 4ad7498a91 | 2024-12-01 | 1.17 | 17/1/6 | OK |  |
| 517 | bluele__gcache | https://github.com/bluele/gcache | d8b7e051c5 | 2022-01-05 | 1.15 | 1/0/0 | EMPTY_GT |  |
| 518 | bluetuith-org__bluetuith | https://github.com/bluetuith-org/bluetuith | 026fe26b93 | 2026-07-01 | 1.25.0 | 72/42/42 | OK |  |
| 519 | bmf-san__ggc | https://github.com/bmf-san/ggc | 0cbfd6833b | 2026-07-20 | 1.25.0 | 10/4/5 | OK |  |
| 520 | bmf-san__goblin | https://github.com/bmf-san/goblin | 1f031b49c5 | 2024-12-26 | 1.22.3 | 1/0/0 | EMPTY_GT |  |
| 521 | bmf-san__gondola | https://github.com/bmf-san/gondola | 5a42ac7de6 | 2026-06-23 | 1.24.1 | 4/2/2 | OK |  |
| 522 | bndr__gopencils | https://github.com/bndr/gopencils | 22e283ad76 | 2016-11-13 |  | 0/0/0 | EMPTY_GT |  |
| 523 | bndr__gotabulate | https://github.com/bndr/gotabulate | 21a495b00e | 2021-02-09 |  | 0/0/0 | EMPTY_GT |  |
| 524 | bobg__basexx | https://github.com/bobg/basexx | 63c1b6a49d | 2025-08-03 | 1.21 | 2/1/1 | OK |  |
| 525 | bobg__combo | https://github.com/bobg/combo | ea5f32e452 | 2026-03-01 | 1.23 | 10/5/5 | OK |  |
| 526 | bobg__decouple | https://github.com/bobg/decouple | b71a956949 | 2026-02-13 | 1.26 | 13/4/6 | OK |  |
| 527 | bobg__encid | https://github.com/bobg/encid | 09aa197144 | 2026-04-12 | 1.23.0 | 71/10/10 | OK |  |
| 528 | bobg__go-generics | https://github.com/bobg/go-generics | 2413cff9f2 | 2025-06-09 | 1.23 | 2/1/1 | OK |  |
| 529 | bobg__hashsplit | https://github.com/bobg/hashsplit | fc3738af93 | 2024-09-29 | 1.23 | 7/1/1 | OK |  |
| 530 | bobg__htree | https://github.com/bobg/htree | b6cb52b842 | 2025-12-08 | 1.23 | 11/2/4 | OK |  |
| 531 | bobg__merkle | https://github.com/bobg/merkle | 66b7aed2d6 | 2025-08-03 | 1.20 | 6/0/2 | EMPTY_GT |  |
| 532 | bobg__mid | https://github.com/bobg/mid | 4cf8bc4896 | 2025-03-22 | 1.21 | 4/1/2 | OK |  |
| 533 | bobg__modver | https://github.com/bobg/modver | 5b8d053339 | 2026-05-17 | 1.26 | 61/27/27 | OK |  |
| 534 | bobg__subcmd | https://github.com/bobg/subcmd | 8746ab6c76 | 2026-01-12 | 1.21 | 4/1/2 | OK |  |
| 535 | bogdanfinn__tls-client | https://github.com/bogdanfinn/tls-client | b790a31127 | 2026-07-02 | 1.24.1 | 33/15/19 | OK |  |
| 536 | bogem__id3v2 | https://github.com/bogem/id3v2 | 34286c4b19 | 2023-05-09 | 1.13 | 3/1/1 | OK |  |
| 537 | bojanz__address | https://github.com/bojanz/address | 89fd2c051e | 2026-02-17 | 1.17 | 1/0/0 | EMPTY_GT |  |
| 538 | bojanz__currency | https://github.com/bojanz/currency | f9b14ba439 | 2026-04-23 | 1.18 | 3/1/1 | OK |  |
| 539 | bokwoon95__go-structured-query | https://github.com/bokwoon95/go-structured-query | 0923483502 | 2023-01-15 | 1.14 | 109/9/12 | OK |  |
| 540 | bolknote__go-gd | https://github.com/bolknote/go-gd | e983c68fd1 | 2026-05-28 | 1.22 | 0/0/0 | EMPTY_GT |  |
| 541 | boot-go__boot | https://github.com/boot-go/boot | 76f9cc6ef2 | 2024-01-29 | 1.18 | 0/0/0 | EMPTY_GT |  |
| 542 | borderstech__artifex | https://github.com/borderstech/artifex | 1b1b1bc7fa | 2024-07-19 | 1.20 | 6/1/4 | OK |  |
| 543 | born-ml__born | https://github.com/born-ml/born | f29e0255fa | 2026-07-12 | 1.26.0 | 17/9/13 | OK |  |
| 544 | bouk__gonerics | https://github.com/bouk/gonerics | d4e3c54fb6 | 2014-09-29 |  | 0/0/0 | EMPTY_GT |  |
| 545 | box-cli-maker__box-cli-maker | https://github.com/box-cli-maker/box-cli-maker | 4082637a19 | 2026-06-06 | 1.24.2 | 20/11/11 | OK |  |
| 546 | boxesandglue__bagme | https://github.com/boxesandglue/bagme | a98b0e0e4d | 2026-07-16 | 1.25.0 | 23/17/17 | OK |  |
| 547 | boyter__scc | https://github.com/boyter/scc | 079f7b37f6 | 2026-07-20 | 1.26.4 | 84/43/43 | OK |  |
| 548 | bozd4g__go-http-client | https://github.com/bozd4g/go-http-client | 403729fe30 | 2024-01-28 | 1.19 | 8/1/5 | OK |  |
| 549 | bradfitz__gomemcache | https://github.com/bradfitz/gomemcache | 4d751bb6e3 | 2026-04-22 | 1.18 | 0/0/0 | EMPTY_GT |  |
| 550 | bradleyfalzon__apicompat | https://github.com/bradleyfalzon/apicompat | 5f916b1b6d | 2017-02-05 |  | 0/0/0 | EMPTY_GT |  |
| 551 | bradleyjkemp__cupaloy | https://github.com/bradleyjkemp/cupaloy | bae07880a7 | 2022-09-14 |  | 7/2/5 | OK |  |
| 552 | brandonyoungdev__tldx | https://github.com/brandonyoungdev/tldx | 123106c029 | 2026-07-17 | 1.26.0 | 73/48/52 | OK |  |
| 553 | briandowns__spinner | https://github.com/briandowns/spinner | 55430861f7 | 2025-01-19 | 1.17 | 6/5/5 | OK |  |
| 554 | brianvoe__gofakeit | https://github.com/brianvoe/gofakeit | f0b548a543 | 2026-05-15 | 1.22 | 1/0/0 | EMPTY_GT |  |
| 555 | brianvoe__sjwt | https://github.com/brianvoe/sjwt | 1064b861f1 | 2025-11-09 | 1.25 | 1/0/0 | EMPTY_GT |  |
| 556 | brunomvsouza__ynab.go | https://github.com/brunomvsouza/ynab.go | 4ea314ff91 | 2026-07-13 | 1.19 | 8/0/5 | EMPTY_GT |  |
| 557 | bsm__redeo | https://github.com/bsm/redeo | b5f6a461e7 | 2023-01-20 | 1.18 | 4/1/3 | OK |  |
| 558 | bsm__redislock | https://github.com/bsm/redislock | 707d123916 | 2026-06-27 | 1.25 | 12/3/3 | OK |  |
| 559 | btnguyen2k__gocosmos | https://github.com/btnguyen2k/gocosmos | f77d8c6b66 | 2024-05-12 | 1.18 | 8/6/7 | OK |  |
| 560 | btnguyen2k__olaf | https://github.com/btnguyen2k/olaf | 10203e4f6c | 2019-04-10 |  | 0/0/0 | EMPTY_GT |  |
| 561 | buaazp__fasthttprouter | https://github.com/buaazp/fasthttprouter | 979d6e516e | 2019-01-09 |  | 0/0/0 | EMPTY_GT |  |
| 562 | buger__gor | https://github.com/buger/gor | 251e45abd2 | 2025-04-05 | 1.21 | 148/66/68 | OK |  |
| 563 | buraksezer__consistent | https://github.com/buraksezer/consistent | 9b24b485bd | 2022-12-07 | 1.9 | 1/0/0 | EMPTY_GT |  |
| 564 | bwmarrin__discordgo | https://github.com/bwmarrin/discordgo | f43dd94faa | 2026-02-14 | 1.13 | 2/1/1 | OK |  |
| 565 | bykof__gostradamus | https://github.com/bykof/gostradamus | 5be648962c | 2024-12-20 | 1.22 | 8/1/5 | OK |  |
| 566 | bytebase__bytebase | https://github.com/bytebase/bytebase | 47fdd4474c | 2026-07-21 | 1.26.3 | 984/321/324 | OK |  |
| 567 | bytedance__sonic | https://github.com/bytedance/sonic | 579b6ffa7b | 2026-06-04 | 1.18 | 37/6/10 | OK |  |
| 568 | bzick__tokenizer | https://github.com/bzick/tokenizer | 9c01dd5c46 | 2026-07-17 | 1.13 | 0/0/0 | EMPTY_GT |  |
| 569 | c-bata__go-prompt | https://github.com/c-bata/go-prompt | 82a9122745 | 2021-03-03 | 1.14 | 8/3/3 | OK |  |
| 570 | c-bata__goptuna | https://github.com/c-bata/goptuna | e51d3281f5 | 2025-08-12 | 1.21 | 55/19/19 | OK |  |
| 571 | c-robinson__iplib | https://github.com/c-robinson/iplib | 99f950a166 | 2024-04-06 | 1.20 | 2/1/1 | OK |  |
| 572 | c9s__bbgo | https://github.com/c9s/bbgo | b03169c2b2 | 2026-07-20 | 1.25.0 | 380/129/130 | OK |  |
| 573 | caarlos0__env | https://github.com/caarlos0/env | a3a36cc60f | 2026-07-06 | 1.18 | 0/0/0 | EMPTY_GT |  |
| 574 | caarlos0__log | https://github.com/caarlos0/log | daa26c5ed6 | 2026-07-01 | 1.25.0 | 22/16/16 | OK |  |
| 575 | cabify__gotoprom | https://github.com/cabify/gotoprom | 41afc5d4ea | 2024-10-09 | 1.12 | 49/10/15 | OK |  |
| 576 | cabify__logrusiowriter | https://github.com/cabify/logrusiowriter | 5bb76ccf56 | 2024-10-09 | 1.12 | 9/2/2 | OK |  |
| 577 | cabify__timex | https://github.com/cabify/timex | 9b786c3d59 | 2020-08-03 | 1.13 | 7/5/5 | OK |  |
| 578 | caddyserver__caddy | https://github.com/caddyserver/caddy | 9738f49b95 | 2026-07-19 | 1.25.1 | 550/159/163 | OK |  |
| 579 | caddyserver__certmagic | https://github.com/caddyserver/certmagic | 38cdd6254b | 2026-07-17 | 1.25.0 | 33/13/13 | OK |  |
| 580 | calpa__urusai | https://github.com/calpa/urusai | 3a20adde2d | 2026-06-09 | 1.22 | 0/0/0 | EMPTY_GT |  |
| 581 | camgraff__protoxy | https://github.com/camgraff/protoxy | a50de6411e | 2020-11-08 | 1.15 | 113/9/12 | OK |  |
| 582 | capillariesio__capillaries | https://github.com/capillariesio/capillaries | fdc620cedc | 2026-07-10 | 1.26.1 | 120/51/54 | OK |  |
| 583 | carbocation__interpose | https://github.com/carbocation/interpose | 723534742b | 2016-12-06 |  | 0/0/0 | EMPTY_GT |  |
| 584 | carlescere__goback | https://github.com/carlescere/goback | ebe10501f4 | 2015-03-14 |  | 0/0/0 | EMPTY_GT |  |
| 585 | carlescere__scheduler | https://github.com/carlescere/scheduler | ee74d2f83d | 2017-01-09 |  | 0/0/0 | EMPTY_GT |  |
| 586 | carlmjohnson__be | https://github.com/carlmjohnson/be | d2874f2afc | 2025-09-26 | 1.23 | 0/0/0 | EMPTY_GT |  |
| 587 | carlmjohnson__flowmatic | https://github.com/carlmjohnson/flowmatic | 545f253325 | 2024-06-06 | 1.21 | 2/1/1 | OK |  |
| 588 | carlmjohnson__requests | https://github.com/carlmjohnson/requests | e6e5353ae1 | 2026-07-06 | 1.25.0 | 6/1/1 | OK |  |
| 589 | catchplay__scaffold | https://github.com/catchplay/scaffold | 8500479f1f | 2019-01-10 |  | 9/2/6 | OK |  |
| 590 | cavaliercoder__grab | https://github.com/cavaliercoder/grab | e06b719a37 | 2022-01-08 |  | 0/0/0 | EMPTY_GT |  |
| 591 | ccbrown__api-fu | https://github.com/ccbrown/api-fu | b02009cb8d | 2024-08-29 | 1.18 | 29/11/15 | OK |  |
| 592 | ccding__go-stun | https://github.com/ccding/go-stun | 65c0568253 | 2026-07-19 | 1.14 | 0/0/0 | EMPTY_GT |  |
| 593 | cch123__elasticsql | https://github.com/cch123/elasticsql | e0400a1fdc | 2023-08-06 | 1.13 | 2/1/1 | OK |  |
| 594 | ccoVeille__go-safecast | https://github.com/ccoVeille/go-safecast | 00b470bdf3 | 2026-07-06 | 1.21 | 1/0/0 | EMPTY_GT |  |
| 595 | cdipaolo__goml | https://github.com/cdipaolo/goml | 00e0c845ae | 2022-07-14 | 1.17 | 9/1/5 | OK |  |
| 596 | cenkalti__rain | https://github.com/cenkalti/rain | 6278afa24e | 2026-07-13 | 1.25.0 | 71/41/47 | OK |  |
| 597 | centerorbit__depcharge | https://github.com/centerorbit/depcharge | 1aa1933a89 | 2021-12-23 | 1.12 | 16/4/7 | OK |  |
| 598 | centrifugal__centrifugo | https://github.com/centrifugal/centrifugo | f25c7abd07 | 2026-07-15 | 1.26 | 332/133/133 | OK |  |
| 599 | cep21__circuit | https://github.com/cep21/circuit | df9fc6e22e | 2026-02-27 | 1.21 | 7/0/4 | EMPTY_GT |  |
| 600 | ceshihao__windowsupdate | https://github.com/ceshihao/windowsupdate | 29e6a61f0a | 2026-06-29 | 1.24 | 3/1/1 | OK |  |
| 601 | chai2010__go-ast-book | https://github.com/chai2010/go-ast-book | 6bb3a6f0f7 | 2024-09-26 |  | 0/0/0 | EMPTY_GT |  |
| 602 | chaindead__modup | https://github.com/chaindead/modup | 1146e47133 | 2025-08-21 | 1.24 | 45/27/27 | OK |  |
| 603 | chaindead__zerocfg | https://github.com/chaindead/zerocfg | 1a6909f740 | 2026-07-19 | 1.20 | 8/2/5 | OK |  |
| 604 | chainifynet__aws-encryption-sdk-go | https://github.com/chainifynet/aws-encryption-sdk-go | 683ee41771 | 2025-06-18 | 1.21 | 33/19/24 | OK |  |
| 605 | chanced__caps | https://github.com/chanced/caps | 64e02c2f46 | 2023-12-30 | 1.18 | 0/0/0 | EMPTY_GT |  |
| 606 | chanify__chanify | https://github.com/chanify/chanify | cc4bf1bf3a | 2023-02-25 | 1.20 | 168/42/43 | OK |  |
| 607 | chapar-rest__chapar | https://github.com/chapar-rest/chapar | 711034a5ad | 2026-05-22 | 1.23.4 | 143/62/65 | OK |  |
| 608 | charlievieth__fastwalk | https://github.com/charlievieth/fastwalk | 99cabbde61 | 2025-11-20 | 1.21 | 1/0/0 | EMPTY_GT |  |
| 609 | charlievieth__strcase | https://github.com/charlievieth/strcase | ef45f187e0 | 2026-07-18 | 1.19 | 2/1/1 | OK |  |
| 610 | charmbracelet__bubbles | https://github.com/charmbracelet/bubbles | b52e21a626 | 2026-07-20 | 1.25.0 | 31/21/24 | OK |  |
| 611 | charmbracelet__bubbletea | https://github.com/charmbracelet/bubbletea | fc707bb7ea | 2026-07-02 | 1.25.0 | 21/15/17 | OK |  |
| 612 | charmbracelet__lipgloss | https://github.com/charmbracelet/lipgloss | 5696b2800b | 2026-07-20 | 1.25.0 | 24/15/17 | OK |  |
| 613 | charmbracelet__wish | https://github.com/charmbracelet/wish | 8b65ba4d62 | 2026-05-28 | 1.25.9 | 81/43/45 | OK |  |
| 614 | checkr__flagr | https://github.com/checkr/flagr | a4231645cf | 2026-07-18 | 1.26 | 512/160/164 | OK |  |
| 615 | cheng-zhongliang__event | https://github.com/cheng-zhongliang/event | 963def2f37 | 2023-12-28 | 1.13 | 0/0/0 | EMPTY_GT |  |
| 616 | chenmingyong0423__go-mongox | https://github.com/chenmingyong0423/go-mongox | 19c38d7c2e | 2026-06-30 | 1.19 | 25/9/13 | OK |  |
| 617 | chenquan__go-pkg | https://github.com/chenquan/go-pkg | 8caf99744d | 2022-06-29 | 1.13 | 23/2/7 | OK |  |
| 618 | cheshir__go-mq | https://github.com/cheshir/go-mq | da58513599 | 2023-05-17 | 1.16 | 417/5/5 | OK |  |
| 619 | cheshir__ttlcache | https://github.com/cheshir/ttlcache | b6c15c9a2f | 2022-10-02 | 1.15 | 0/0/0 | EMPTY_GT |  |
| 620 | cheynewallace__tabby | https://github.com/cheynewallace/tabby | ec0b5a051c | 2020-12-23 |  | 0/0/0 | EMPTY_GT |  |
| 621 | chmenegatti__go-date-fns | https://github.com/chmenegatti/go-date-fns | 1fd595ed54 | 2026-02-28 | 1.24 | 0/0/0 | EMPTY_GT |  |
| 622 | chmike__securecookie | https://github.com/chmike/securecookie | fd17de73b9 | 2023-02-18 |  | 0/0/0 | EMPTY_GT |  |
| 623 | chmike__varint | https://github.com/chmike/varint | 231d58021b | 2023-10-07 | 1.17 | 0/0/0 | EMPTY_GT |  |
| 624 | chonla__cellwalker | https://github.com/chonla/cellwalker | c99e3502c5 | 2024-10-17 | 1.23 | 0/0/0 | EMPTY_GT |  |
| 625 | chonthu__go-google-analytics | https://github.com/chonthu/go-google-analytics | 877814a162 | 2015-05-30 |  | 0/0/0 | EMPTY_GT |  |
| 626 | chriscross0__go-restcountries | https://github.com/chriscross0/go-restcountries | 96b4c7e280 | 2021-10-27 | 1.16 | 0/0/0 | EMPTY_GT |  |
| 627 | chrislusf__gleam | https://github.com/chrislusf/gleam | b5e191e634 | 2026-07-10 | 1.25.0 | 279/68/68 | OK |  |
| 628 | chrislusf__glow | https://github.com/chrislusf/glow | 4c40a2717e | 2018-11-01 |  | 0/0/0 | EMPTY_GT |  |
| 629 | chrislusf__seaweedfs | https://github.com/chrislusf/seaweedfs | 7f9e897e18 | 2026-02-08 | 1.24.9 | 1164/318/322 | OK |  |
| 630 | chrislusf__vasto | https://github.com/chrislusf/vasto | e1f8a17682 | 2019-03-07 |  | 0/0/0 | EMPTY_GT |  |
| 631 | chrismckenzie__dropship | https://github.com/chrismckenzie/dropship | 083ea56a84 | 2018-07-25 |  | 0/0/0 | EMPTY_GT |  |
| 632 | chrispassas__nfdump | https://github.com/chrispassas/nfdump | efe221595f | 2024-10-24 | 1.14 | 2/1/1 | OK |  |
| 633 | chrispassas__silk | https://github.com/chrispassas/silk | 1cdb7e334c | 2022-03-08 | 1.14 | 3/2/2 | OK |  |
| 634 | chyroc__lark | https://github.com/chyroc/lark | 805480d458 | 2026-03-01 | 1.18 | 0/0/0 | EMPTY_GT |  |
| 635 | chzyer__logex | https://github.com/chzyer/logex | 5a7e37d2e8 | 2024-04-02 | 1.21 | 0/0/0 | EMPTY_GT |  |
| 636 | cihangir__neo4j | https://github.com/cihangir/neo4j | da0f3ffca5 | 2015-04-02 |  | 0/0/0 | EMPTY_GT |  |
| 637 | cihub__seelog | https://github.com/cihub/seelog | f561c5e575 | 2017-01-30 |  | 0/0/0 | EMPTY_GT |  |
| 638 | cilium__ebpf | https://github.com/cilium/ebpf | 075392bc81 | 2026-07-08 | 1.25.0 | 87/7/12 | OK |  |
| 639 | cimgui__cimgui | https://github.com/cimgui/cimgui | 053280dfff | 2026-06-16 |  | 0/0/0 | EMPTY_GT |  |
| 640 | cinar__checker | https://github.com/cinar/checker | ea60113fa1 | 2025-01-03 | 1.23.2 | 1/0/0 | EMPTY_GT |  |
| 641 | cinar__indicator | https://github.com/cinar/indicator | 7cba43f3e3 | 2026-06-07 | 1.22 | 0/0/0 | EMPTY_GT |  |
| 642 | circa10a__go-aws-news | https://github.com/circa10a/go-aws-news | 16ccb95337 | 2026-02-20 | 1.24.0 | 49/32/36 | OK |  |
| 643 | cjhutto__vaderSentiment | https://github.com/cjhutto/vaderSentiment | 44fc044cd8 | 2026-03-02 |  | 0/0/0 | EMPTY_GT |  |
| 644 | claygod__Bxog | https://github.com/claygod/Bxog | 50694fc4cc | 2026-06-26 |  | 0/0/0 | EMPTY_GT |  |
| 645 | claygod__PiHex | https://github.com/claygod/PiHex | c9efef1955 | 2026-04-15 | 1.16 | 0/0/0 | EMPTY_GT |  |
| 646 | claygod__coffer | https://github.com/claygod/coffer | 77bb69d46f | 2026-01-23 | 1.17 | 21/3/4 | OK |  |
| 647 | claygod__microservice | https://github.com/claygod/microservice | c76ad61581 | 2026-06-05 | 1.23.0 | 69/30/30 | OK |  |
| 648 | claygod__transaction | https://github.com/claygod/transaction | 2e743d08bb | 2025-04-24 |  | 0/0/0 | EMPTY_GT |  |
| 649 | clbanning__mxj | https://github.com/clbanning/mxj | 971b308d69 | 2025-08-10 | 1.15 | 0/0/0 | EMPTY_GT |  |
| 650 | clevabit__libgoffi | https://github.com/clevabit/libgoffi | 596cf88fbe | 2020-08-23 | 1.12 | 2/1/1 | OK |  |
| 651 | clevergo__jsend | https://github.com/clevergo/jsend | 0f10bddc99 | 2021-06-29 | 1.13 | 0/0/0 | EMPTY_GT |  |
| 652 | clok__kemba | https://github.com/clok/kemba | f243684ac4 | 2024-01-11 | 1.16 | 17/5/9 | OK |  |
| 653 | cloudflare__cloudflared | https://github.com/cloudflare/cloudflared | 2206516c3b | 2026-07-20 | 1.26 | 161/68/72 | OK |  |
| 654 | cloudquery__cloudquery | https://github.com/cloudquery/cloudquery | b0e1617c83 | 2026-07-18 | 1.26.4 | 365/149/149 | OK |  |
| 655 | cloudwego__hertz | https://github.com/cloudwego/hertz | 8eec17d4e8 | 2026-06-22 | 1.20 | 27/13/18 | OK |  |
| 656 | cloudwego__kitex | https://github.com/cloudwego/kitex | df31665b36 | 2026-07-09 | 1.20 | 81/41/41 | OK |  |
| 657 | cloudwego__netpoll | https://github.com/cloudwego/netpoll | 4b4d4ce0df | 2026-06-29 | 1.20 | 13/3/3 | OK |  |
| 658 | clubpay__ronykit | https://github.com/clubpay/ronykit | f6dd56239e | 2026-07-20 |  | 0/0/0 | EMPTY_GT |  |
| 659 | cmd-stream__cmd-stream-go | https://github.com/cmd-stream/cmd-stream-go | c4737bcb52 | 2026-05-07 | 1.24.1 | 12/7/7 | OK |  |
| 660 | cockroachdb__cockroach | https://github.com/cockroachdb/cockroach | 144a7b9cc2 | 2026-07-16 | 1.26.2 | 1167/401/407 | OK |  |
| 661 | cockroachdb__errors | https://github.com/cockroachdb/errors | 4fc17f8d44 | 2026-06-18 | 1.25.0 | 189/17/23 | OK |  |
| 662 | cockroachdb__pebble | https://github.com/cockroachdb/pebble | 8fb150d913 | 2026-07-07 | 1.25.3 | 239/50/54 | OK |  |
| 663 | cocoonspace__dynjson | https://github.com/cocoonspace/dynjson | a1876470b6 | 2021-10-11 | 1.16 | 1/0/0 | EMPTY_GT |  |
| 664 | cocoonspace__fsm | https://github.com/cocoonspace/fsm | 2c75fa1451 | 2021-10-12 | 1.16 | 0/0/0 | EMPTY_GT |  |
| 665 | codemodus__catena | https://github.com/codemodus/catena | ac34e7c42e | 2018-08-25 |  | 10/6/6 | OK |  |
| 666 | codemodus__chain | https://github.com/codemodus/chain | bb99cd2071 | 2018-08-25 |  | 1/0/0 | EMPTY_GT |  |
| 667 | codemodus__kace | https://github.com/codemodus/kace | e3ecf78ee2 | 2018-08-26 |  | 0/0/0 | EMPTY_GT |  |
| 668 | codenotary__immudb | https://github.com/codenotary/immudb | bfa78b348a | 2026-07-08 | 1.25.0 | 490/81/85 | OK |  |
| 669 | codesenberg__bombardier | https://github.com/codesenberg/bombardier | 2d495aca5b | 2025-03-04 | 1.22 | 35/18/18 | OK |  |
| 670 | codeship__codeship-go | https://github.com/codeship/codeship-go | 82059492d3 | 2020-11-03 | 1.15 | 265/1/7 | OK |  |
| 671 | codingconcepts__dg | https://github.com/codingconcepts/dg | e0a02910aa | 2024-07-17 | 1.20 | 15/5/8 | OK |  |
| 672 | codingconcepts__env | https://github.com/codingconcepts/env | 5b08454411 | 2024-06-18 | 1.22.4 | 1/0/0 | EMPTY_GT |  |
| 673 | codingsince1985__checksum | https://github.com/codingsince1985/checksum | 7af627ac62 | 2023-02-16 | 1.20 | 7/2/3 | OK |  |
| 674 | codingsince1985__couchcache | https://github.com/codingsince1985/couchcache | b369ca12fb | 2022-12-17 | 1.19 | 22/10/10 | OK |  |
| 675 | codingsince1985__geo-golang | https://github.com/codingsince1985/geo-golang | 72ff6a749c | 2026-04-23 | 1.26.2 | 8/1/5 | OK |  |
| 676 | cogentcore__core | https://github.com/cogentcore/core | eb3769237a | 2026-07-01 | 1.25.6 | 124/66/66 | OK |  |
| 677 | coinpaprika__coinpaprika-api-go-client | https://github.com/coinpaprika/coinpaprika-api-go-client | 471537a624 | 2026-06-02 | 1.19 | 9/1/5 | OK |  |
| 678 | colinhacks__zod | https://github.com/colinhacks/zod | 912f0f51b0 | 2026-06-10 |  | 0/0/0 | EMPTY_GT |  |
| 679 | cometbft__cometbft | https://github.com/cometbft/cometbft | 8715446eae | 2026-07-20 | 1.25.0 | 439/143/156 | OK |  |
| 680 | componego__componego | https://github.com/componego/componego | 927959656d | 2024-09-29 | 1.22 | 0/0/0 | EMPTY_GT |  |
| 681 | confluentinc__confluent-kafka-go | https://github.com/confluentinc/confluent-kafka-go | b88333d3d3 | 2026-07-20 | 1.25.0 | 284/93/93 | OK |  |
| 682 | connectordb__connectordb | https://github.com/connectordb/connectordb | b983da9dd0 | 2022-06-26 | 1.18 | 247/46/46 | OK |  |
| 683 | consbio__mbtileserver | https://github.com/consbio/mbtileserver | 3358834064 | 2025-05-21 | 1.21 | 36/21/21 | OK |  |
| 684 | containers__podman-tui | https://github.com/containers/podman-tui | bef79ba320 | 2026-06-29 | 1.25.6 | 485/128/135 | OK |  |
| 685 | containous__traefik | https://github.com/containous/traefik | 14bc52dd1f | 2026-07-15 | 1.26.0 | 938/352/377 | OK |  |
| 686 | containrrr__shoutrrr | https://github.com/containrrr/shoutrrr | ccf81390b7 | 2026-05-09 | 1.25.0 | 66/29/30 | OK |  |
| 687 | corazawaf__coraza | https://github.com/corazawaf/coraza | 7d9d2ad065 | 2026-07-20 | 1.25.0 | 126/17/23 | OK |  |
| 688 | corbym__gocrest | https://github.com/corbym/gocrest | 47841fe4da | 2026-04-22 | 1.18 | 1/0/0 | EMPTY_GT |  |
| 689 | corbym__gogiven | https://github.com/corbym/gogiven | 6b5ecef6bd | 2026-05-04 | 1.22 | 3/1/2 | OK |  |
| 690 | coregx__ahocorasick | https://github.com/coregx/ahocorasick | 87d36d4908 | 2026-03-18 | 1.25.4 | 1/0/0 | EMPTY_GT |  |
| 691 | coregx__coregex | https://github.com/coregx/coregex | 2812db759a | 2026-06-15 | 1.25.4 | 3/2/2 | OK |  |
| 692 | coregx__fursy | https://github.com/coregx/fursy | c4be232492 | 2026-07-16 | 1.25.0 | 3/2/2 | OK |  |
| 693 | coregx__gxpdf | https://github.com/coregx/gxpdf | bff6bc216d | 2026-05-21 | 1.25 | 28/11/15 | OK |  |
| 694 | coregx__relica | https://github.com/coregx/relica | ee99a3fc85 | 2026-07-17 | 1.25 | 0/0/0 | EMPTY_GT |  |
| 695 | coregx__signals | https://github.com/coregx/signals | b2656d88bb | 2026-07-15 | 1.25 | 1/0/0 | EMPTY_GT |  |
| 696 | corona10__goimagehash | https://github.com/corona10/goimagehash | d8115886f3 | 2024-01-21 | 1.11 | 2/1/1 | OK |  |
| 697 | corona10__goimghdr | https://github.com/corona10/goimghdr | 9af2afa93d | 2019-06-14 |  | 0/0/0 | EMPTY_GT |  |
| 698 | cortesi__devd | https://github.com/cortesi/devd | a33e4452cf | 2026-06-21 | 1.25.0 | 42/21/21 | OK |  |
| 699 | cosiner__argv | https://github.com/cosiner/argv | 86e3c68926 | 2020-04-16 | 1.13 | 1/0/0 | EMPTY_GT |  |
| 700 | cosmos__cosmos-sdk | https://github.com/cosmos/cosmos-sdk | 4fad56b072 | 2026-07-21 | 1.26.5 | 758/289/293 | OK |  |
| 701 | cosmtrek__air | https://github.com/cosmtrek/air | 6fbfb5d722 | 2026-07-20 | 1.25 | 200/19/23 | OK |  |
| 702 | cossacklabs__acra | https://github.com/cossacklabs/acra | ad2a104e0e | 2025-12-05 | 1.23.0 | 368/110/110 | OK |  |
| 703 | cossacklabs__themis | https://github.com/cossacklabs/themis | dc37d03de5 | 2024-09-12 |  | 0/0/0 | EMPTY_GT |  |
| 704 | couchbase__go-couchbase | https://github.com/couchbase/go-couchbase | 959eaf9441 | 2022-02-09 | 1.13 | 29/10/10 | OK |  |
| 705 | couchbase__gocb | https://github.com/couchbase/gocb | 1832e47ade | 2026-07-16 | 1.25.0 | 61/23/29 | OK |  |
| 706 | couchbase__goforestdb | https://github.com/couchbase/goforestdb | 0b501227de | 2016-12-15 |  | 0/0/0 | EMPTY_GT |  |
| 707 | couchbase__moss | https://github.com/couchbase/moss | bf10bab20a | 2024-12-17 | 1.14 | 5/3/3 | OK |  |
| 708 | cpmech__gosl | https://github.com/cpmech/gosl | d27f006f28 | 2025-12-30 | 1.17 | 0/0/0 | EMPTY_GT |  |
| 709 | create-go-app__cli | https://github.com/create-go-app/cli | 51bacbdcd8 | 2025-09-03 | 1.23.0 | 65/28/28 | OK |  |
| 710 | cristalhq__acmd | https://github.com/cristalhq/acmd | efdb16f36c | 2024-04-26 | 1.17 | 0/0/0 | EMPTY_GT |  |
| 711 | cristalhq__aconfig | https://github.com/cristalhq/aconfig | 52ffa7065e | 2025-11-28 | 1.18 | 2/1/1 | OK |  |
| 712 | cristalhq__builq | https://github.com/cristalhq/builq | b8fd0b57d0 | 2024-04-24 | 1.19 | 0/0/0 | EMPTY_GT |  |
| 713 | cristalhq__jwt | https://github.com/cristalhq/jwt | 2b29b4eef4 | 2024-07-10 | 1.19 | 1/0/0 | EMPTY_GT |  |
| 714 | cristianoliveira__ergo | https://github.com/cristianoliveira/ergo | a328420674 | 2025-02-02 | 1.22.1 | 0/0/0 | EMPTY_GT |  |
| 715 | crleonard__pingtower | https://github.com/crleonard/pingtower | 00b2e64b57 | 2026-07-05 | 1.25.5 | 0/0/0 | EMPTY_GT |  |
| 716 | crufter__borg | https://github.com/crufter/borg | 7b577fd417 | 2018-02-07 |  | 0/0/0 | EMPTY_GT |  |
| 717 | cryptojuice__gobrew | https://github.com/cryptojuice/gobrew | 9a02e0c2b8 | 2020-05-20 |  | 0/0/0 | EMPTY_GT |  |
| 718 | cshum__imagor | https://github.com/cshum/imagor | e76e59cf13 | 2026-07-19 | 1.25.8 | 292/85/97 | OK |  |
| 719 | cstockton__go-conv | https://github.com/cstockton/go-conv | 57aa63165a | 2021-08-23 | 1.17 | 1/0/0 | EMPTY_GT |  |
| 720 | cswank__kcli | https://github.com/cswank/kcli | adc21d3f2e | 2020-01-03 | 1.13 | 50/30/30 | OK |  |
| 721 | ctreminiom__go-atlassian | https://github.com/ctreminiom/go-atlassian | 1d195850a5 | 2026-07-16 | 1.23 | 14/11/11 | OK |  |
| 722 | cubahno__connexions | https://github.com/cubahno/connexions |  |  |  | 0/0/0 | CLONE_FAIL |  |
| 723 | cucumber__godog | https://github.com/cucumber/godog | dad84534f0 | 2026-07-16 | 1.18 | 24/12/12 | OK |  |
| 724 | cvilsmeier__sqinn-go | https://github.com/cvilsmeier/sqinn-go | cd0c409dfe | 2026-07-05 | 1.24 | 1/0/0 | EMPTY_GT |  |
| 725 | cweill__gotests | https://github.com/cweill/gotests | 2a672c523b | 2025-10-24 | 1.24.0 | 9/3/3 | OK |  |
| 726 | cybergarage__go-job | https://github.com/cybergarage/go-job | 426b91855e | 2026-03-19 | 1.25 | 138/48/48 | OK |  |
| 727 | cybertec-postgresql__pg_timetable | https://github.com/cybertec-postgresql/pg_timetable | ef61f7e66e | 2026-07-20 | 1.25.0 | 141/84/85 | OK |  |
| 728 | cyruzin__golang-tmdb | https://github.com/cyruzin/golang-tmdb | 0092c38015 | 2026-07-15 | 1.24 | 8/1/5 | OK |  |
| 729 | cyruzin__tome | https://github.com/cyruzin/tome | bc12ed7aaa |  |  | 0/0/0 | EMPTY_GT |  |
| 730 | cyucelen__marker | https://github.com/cyucelen/marker | ec8d542c2d | 2022-06-28 | 1.12 | 11/4/8 | OK |  |
| 731 | cyucelen__walker | https://github.com/cyucelen/walker | d65bd3d935 | 2023-02-17 | 1.18 | 46/3/20 | OK |  |
| 732 | d5__tengo | https://github.com/d5/tengo | 8daf696551 | 2026-04-29 | 1.13 | 1/0/0 | EMPTY_GT |  |
| 733 | dagu-go__dagu | https://github.com/dagu-go/dagu | fce16293df | 2026-07-20 | 1.26.5 | 916/281/281 | OK |  |
| 734 | daichi-m__go18ds | https://github.com/daichi-m/go18ds | bc64532cc3 | 2022-03-22 | 1.18 | 1/0/0 | EMPTY_GT |  |
| 735 | dailymotion__oplog | https://github.com/dailymotion/oplog | 33532b0e6f | 2024-09-27 |  | 0/0/0 | EMPTY_GT |  |
| 736 | dakera-ai__dakera-go | https://github.com/dakera-ai/dakera-go | a618efbe25 | 2026-07-16 | 1.21 | 7/0/4 | EMPTY_GT |  |
| 737 | dancannon__gorethink | https://github.com/dancannon/gorethink | ec4cd14d7e | 2025-10-24 | 1.22 | 30/14/15 | OK |  |
| 738 | daneharrigan__hipchat | https://github.com/daneharrigan/hipchat | 835dc87939 | 2017-05-12 |  | 0/0/0 | EMPTY_GT |  |
| 739 | danieldk__go2vec | https://github.com/danieldk/go2vec | ee0e8720a8 | 2017-05-17 |  | 0/0/0 | EMPTY_GT |  |
| 740 | danielgtaylor__huma | https://github.com/danielgtaylor/huma | 14aea2fe3d | 2026-07-19 | 1.25.0 | 95/48/52 | OK |  |
| 741 | dannyvankooten__vat | https://github.com/dannyvankooten/vat | 2a35151b79 | 2023-11-07 | 1.14 | 0/0/0 | EMPTY_GT |  |
| 742 | dariubs__GoBooks | https://github.com/dariubs/GoBooks | 663df50585 | 2026-07-13 |  | 0/0/0 | EMPTY_GT |  |
| 743 | dastoori__higgs | https://github.com/dastoori/higgs | f3248371aa | 2022-01-29 | 1.17 | 1/0/0 | EMPTY_GT |  |
| 744 | datarootsio__tf-profile | https://github.com/datarootsio/tf-profile | a7d91eef3a | 2025-03-15 | 1.23 | 20/7/11 | OK |  |
| 745 | datastream__libsvm | https://github.com/datastream/libsvm | 9aff8e82d1 | 2016-05-09 |  | 0/0/0 | EMPTY_GT |  |
| 746 | dathoangnd__gonet | https://github.com/dathoangnd/gonet | 7d804f5462 | 2020-04-05 | 1.13 | 0/0/0 | EMPTY_GT |  |
| 747 | dave__blast | https://github.com/dave/blast | f3afebf2d2 | 2018-03-01 |  | 0/0/0 | EMPTY_GT |  |
| 748 | dave__jennifer | https://github.com/dave/jennifer | b477ff8272 | 2024-09-09 | 1.20 | 1/0/0 | EMPTY_GT |  |
| 749 | davecgh__go-spew | https://github.com/davecgh/go-spew | d8f796af33 | 2018-08-30 |  | 0/0/0 | EMPTY_GT |  |
| 750 | davecheney__autobench | https://github.com/davecheney/autobench | ea753d2686 | 2014-06-19 |  | 0/0/0 | EMPTY_GT |  |
| 751 | daveshanley__vacuum | https://github.com/daveshanley/vacuum | ed2f814753 | 2026-07-16 | 1.25.7 | 243/94/95 | OK |  |
| 752 | davidbyttow__govips | https://github.com/davidbyttow/govips | eec4bbd9e5 | 2026-06-07 | 1.25.0 | 19/3/7 | OK |  |
| 753 | daviddengcn__go-colortext | https://github.com/daviddengcn/go-colortext | dc4cd66b56 | 2020-03-29 | 1.14 | 4/0/1 | EMPTY_GT |  |
| 754 | daviddengcn__go-pr | https://github.com/daviddengcn/go-pr | b817908464 | 2013-06-08 |  | 0/0/0 | EMPTY_GT |  |
| 755 | davrodpin__mole | https://github.com/davrodpin/mole | eaee4e5b72 | 2021-10-06 | 1.14 | 53/17/20 | OK |  |
| 756 | db47h__decimal | https://github.com/db47h/decimal | 4cdf299bc0 | 2022-07-17 | 1.14 | 1/0/0 | EMPTY_GT |  |
| 757 | db47h__ngaro | https://github.com/db47h/ngaro | e81c572fc5 | 2018-06-03 |  | 0/0/0 | EMPTY_GT |  |
| 758 | dchest__stemmer | https://github.com/dchest/stemmer | 66719a20c4 | 2016-12-07 |  | 0/0/0 | EMPTY_GT |  |
| 759 | ddddddO__gtree | https://github.com/ddddddO/gtree | 7367dd0f55 | 2026-07-17 | 1.26 | 16/8/9 | OK |  |
| 760 | ddelizia__channelify | https://github.com/ddelizia/channelify | cc70777578 | 2020-10-06 | 1.15 | 11/0/0 | EMPTY_GT |  |
| 761 | ddo__rq | https://github.com/ddo/rq | b3daa55fca | 2019-08-28 |  | 0/0/0 | EMPTY_GT |  |
| 762 | ddosify__alaz | https://github.com/ddosify/alaz | 828b997f7b | 2024-10-03 | 1.22 | 325/115/118 | OK |  |
| 763 | ddosify__ddosify | https://github.com/ddosify/ddosify | 5cf7df3c6b | 2026-03-04 |  | 0/0/0 | EMPTY_GT |  |
| 764 | ddymko__go-jsonerror | https://github.com/ddymko/go-jsonerror | 8a88011d0d | 2019-10-03 | 1.13 | 1/0/0 | EMPTY_GT |  |
| 765 | deatil__go-array | https://github.com/deatil/go-array | 519ecc58ed | 2026-06-20 | 1.25.0 | 0/0/0 | EMPTY_GT |  |
| 766 | deatil__go-datebin | https://github.com/deatil/go-datebin | 112861d97c | 2026-06-20 | 1.25.0 | 1/0/0 | EMPTY_GT |  |
| 767 | deatil__go-events | https://github.com/deatil/go-events | 08c7783743 | 2026-07-20 | 1.25.0 | 1/0/0 | EMPTY_GT |  |
| 768 | deatil__go-jwt | https://github.com/deatil/go-jwt | aad4eeb39e | 2026-07-21 | 1.25.0 | 6/2/2 | OK |  |
| 769 | deckarep__golang-set | https://github.com/deckarep/golang-set | da03b7639b | 2026-06-27 | 1.18 | 14/1/1 | OK |  |
| 770 | deckarep__gosx-notifier | https://github.com/deckarep/gosx-notifier | e127226297 | 2018-01-31 |  | 0/0/0 | EMPTY_GT |  |
| 771 | dedalqq__omg.jsonparser | https://github.com/dedalqq/omg.jsonparser | 3224f2a275 | 2021-10-12 | 1.16 | 1/0/0 | EMPTY_GT |  |
| 772 | dedalqq__omg.testingtools | https://github.com/dedalqq/omg.testingtools | 79d2dd80a7 | 2021-10-15 | 1.17 | 0/0/0 | EMPTY_GT |  |
| 773 | deepaksinghvi__cdule | https://github.com/deepaksinghvi/cdule | d3c38b53bb | 2025-08-20 | 1.24.5 | 124/34/40 | OK |  |
| 774 | deepmap__oapi-codegen | https://github.com/deepmap/oapi-codegen | 1ffa4b9709 | 2026-07-19 | 1.25.0 | 56/16/19 | OK |  |
| 775 | defcronyke__godscache | https://github.com/defcronyke/godscache | dc0ce86a53 | 2019-02-08 |  | 0/0/0 | EMPTY_GT |  |
| 776 | denisenkom__go-mssqldb | https://github.com/denisenkom/go-mssqldb | 103f0369fa | 2023-04-30 | 1.13 | 33/14/14 | OK |  |
| 777 | dennwc__dom | https://github.com/dennwc/dom | 5d591340e8 | 2019-05-27 | 1.12 | 35/25/25 | OK |  |
| 778 | derailed__k9s | https://github.com/derailed/k9s | 5fedc44020 | 2026-07-19 | 1.25.8 | 921/371/373 | OK |  |
| 779 | derekparker__delve | https://github.com/derekparker/delve | 629570839d | 2026-03-03 | 1.24 | 38/19/20 | OK |  |
| 780 | derekparker__trie | https://github.com/derekparker/trie | bf82928180 | 2025-10-15 | 1.23.1 | 1/0/0 | EMPTY_GT |  |
| 781 | desertbit__glue | https://github.com/desertbit/glue | 06de07e1e4 | 2019-06-19 |  | 0/0/0 | EMPTY_GT |  |
| 782 | destel__rill | https://github.com/destel/rill | 56267f48f4 | 2026-07-17 | 1.25 | 0/0/0 | EMPTY_GT |  |
| 783 | detectlanguage__detectlanguage-go | https://github.com/detectlanguage/detectlanguage-go | cea83d189c | 2025-08-20 | 1.13 | 7/0/4 | EMPTY_GT |  |
| 784 | deuill__go-php | https://github.com/deuill/go-php | 9d111e7342 | 2018-10-01 |  | 0/0/0 | EMPTY_GT |  |
| 785 | devfacet__gocmd | https://github.com/devfacet/gocmd | 640174d86d | 2023-04-04 | 1.17 | 0/0/0 | EMPTY_GT |  |
| 786 | dghubble__gologin | https://github.com/dghubble/gologin | 630fafae08 | 2026-04-18 | 1.23.0 | 75/34/34 | OK |  |
| 787 | dghubble__sling | https://github.com/dghubble/sling | 01f9e9461d | 2026-03-08 | 1.19 | 3/1/1 | OK |  |
| 788 | dgraph-io__badger | https://github.com/dgraph-io/badger | 0a02e668e2 | 2026-07-16 | 1.23.0 | 36/18/22 | OK |  |
| 789 | dgraph-io__dgraph | https://github.com/dgraph-io/dgraph | 59eefd193d | 2026-07-08 | 1.26.4 | 350/157/157 | OK |  |
| 790 | dgraph-io__ristretto | https://github.com/dgraph-io/ristretto | 67cb59139a | 2026-07-15 | 1.24.0 | 11/3/8 | OK |  |
| 791 | dgruber__drmaa | https://github.com/dgruber/drmaa | 836d2faf92 | 2025-08-24 | 1.22.0 | 0/0/0 | EMPTY_GT |  |
| 792 | dgryski__go-jump | https://github.com/dgryski/go-jump | ba001c3ffc | 2021-10-18 |  | 0/0/0 | EMPTY_GT |  |
| 793 | dh1tw__gosamplerate | https://github.com/dh1tw/gosamplerate | 7ea0cb2397 | 2024-01-28 | 1.14 | 0/0/0 | EMPTY_GT |  |
| 794 | diamondburned__arikawa | https://github.com/diamondburned/arikawa | b430932b3e | 2026-05-18 | 1.25.0 | 0/0/0 | EMPTY_GT |  |
| 795 | diankong__GoDocTooltip | https://github.com/diankong/GoDocTooltip | cbc2b7abd4 | 2022-12-03 |  | 0/0/0 | EMPTY_GT |  |
| 796 | didi__gendry | https://github.com/didi/gendry | e6d8f5cfe4 | 2025-03-12 | 1.13 | 8/0/5 | EMPTY_GT |  |
| 797 | didip__tollbooth | https://github.com/didip/tollbooth | 458a30971b | 2025-01-12 | 1.19 | 7/1/1 | OK |  |
| 798 | diegomarangoni__typenv | https://github.com/diegomarangoni/typenv | 76ad151dad | 2025-04-02 | 1.18 | 7/0/4 | EMPTY_GT |  |
| 799 | dietsche__textbelt | https://github.com/dietsche/textbelt | aa3e0552ad | 2015-09-04 |  | 0/0/0 | EMPTY_GT |  |
| 800 | digitalcrab__browscap_go | https://github.com/digitalcrab/browscap_go | a65aa5d0ba | 2022-06-13 |  | 0/0/0 | EMPTY_GT |  |
| 801 | digota__digota | https://github.com/digota/digota | c2a16d57bf | 2018-10-15 |  | 0/0/0 | EMPTY_GT |  |
| 802 | dikhan__terraform-provider-openapi | https://github.com/dikhan/terraform-provider-openapi | 53c058558d | 2022-10-16 | 1.17 | 222/65/74 | OK |  |
| 803 | dimfeld__httptreemux | https://github.com/dimfeld/httptreemux | 53a6a09954 | 2024-07-10 | 1.9 | 0/0/0 | EMPTY_GT |  |
| 804 | dimiro1__banner | https://github.com/dimiro1/banner | 4f86e55de5 | 2020-12-22 | 1.11 | 5/4/4 | OK |  |
| 805 | dimiro1__health | https://github.com/dimiro1/health | e388c68d7d | 2023-11-18 | 1.11 | 5/1/3 | OK |  |
| 806 | dimuska139__go-email-normalizer | https://github.com/dimuska139/go-email-normalizer | b5e78c151f | 2025-01-26 | 1.14 | 7/0/4 | EMPTY_GT |  |
| 807 | dimuska139__rawg-sdk-go | https://github.com/dimuska139/rawg-sdk-go | 4f9c741ea5 | 2022-05-28 | 1.15 | 9/1/6 | OK |  |
| 808 | dinakars777__moody | https://github.com/dinakars777/moody | c32a07272a | 2026-05-25 | 1.26.1 | 30/3/3 | OK |  |
| 809 | dinopuguh__gosentiwordnet | https://github.com/dinopuguh/gosentiwordnet | 2f8ef616e1 | 2021-03-11 | 1.14 | 0/0/0 | EMPTY_GT |  |
| 810 | dirkaholic__kyoo | https://github.com/dirkaholic/kyoo | d787ad2ef1 | 2026-03-09 | 1.20 | 8/0/4 | EMPTY_GT |  |
| 811 | disintegration__gift | https://github.com/disintegration/gift | 575e249f24 | 2020-11-21 |  | 1/0/0 | EMPTY_GT |  |
| 812 | disintegration__imaging | https://github.com/disintegration/imaging | d40f48ce0f | 2020-12-18 |  | 3/1/1 | OK |  |
| 813 | disksing__iter | https://github.com/disksing/iter | 1f204b1672 | 2022-03-16 | 1.18 | 0/0/0 | EMPTY_GT |  |
| 814 | distatus__battery | https://github.com/distatus/battery | 24c526632a | 2023-06-23 | 1.18 | 0/0/0 | EMPTY_GT |  |
| 815 | dixonwille__skywalker | https://github.com/dixonwille/skywalker | e262af346a | 2021-08-31 |  | 0/0/0 | EMPTY_GT |  |
| 816 | dixonwille__wlog | https://github.com/dixonwille/wlog | a39fa152ff | 2024-05-13 | 1.11 | 11/1/5 | OK |  |
| 817 | dixonwille__wmenu | https://github.com/dixonwille/wmenu | 09d89f61cf | 2024-05-14 | 1.11 | 14/4/8 | OK |  |
| 818 | dnaeon__go-vcr | https://github.com/dnaeon/go-vcr | 2a9545bad4 | 2026-06-25 | 1.24 | 2/1/1 | OK |  |
| 819 | dnnrly__abbreviate | https://github.com/dnnrly/abbreviate | c8aeae4019 | 2024-07-11 | 1.21 | 173/2/14 | OK |  |
| 820 | dnnrly__hoofli | https://github.com/dnnrly/hoofli | 3b9050e917 | 2024-08-07 | 1.16 | 219/9/22 | OK |  |
| 821 | dnnrly__httpref | https://github.com/dnnrly/httpref | 744579b264 | 2024-11-12 | 1.13 | 184/20/31 | OK |  |
| 822 | dnnrly__wait-for | https://github.com/dnnrly/wait-for | 945ae16835 | 2023-02-02 | 1.14 | 67/10/22 | OK |  |
| 823 | dnote__dnote | https://github.com/dnote/dnote | dda0abb041 | 2026-07-18 | 1.25.0 | 52/29/29 | OK |  |
| 824 | documize__community | https://github.com/documize/community | e19bcd02ab | 2026-05-18 | 1.25 | 81/39/39 | OK |  |
| 825 | doganarif__govisual | https://github.com/doganarif/govisual | 1907a6c817 | 2026-07-02 | 1.24.0 | 13/1/1 | OK |  |
| 826 | dolthub__dolt | https://github.com/dolthub/dolt | 9e80d3aa2c | 2026-07-17 |  | 0/0/0 | EMPTY_GT |  |
| 827 | dominikh__go-mode.el | https://github.com/dominikh/go-mode.el | 3a71d28ab4 | 2026-05-29 |  | 0/0/0 | EMPTY_GT |  |
| 828 | dominikh__go-tools | https://github.com/dominikh/go-tools | d69e7ee19e | 2026-06-30 | 1.26.0 | 13/7/8 | OK |  |
| 829 | donatj__mpo | https://github.com/donatj/mpo | f42f43261a | 2026-07-19 | 1.26 | 3/1/1 | OK |  |
| 830 | doors-dev__doors | https://github.com/doors-dev/doors | e306e115da | 2026-07-03 | 1.25.1 | 47/16/16 | OK |  |
| 831 | doors-dev__gox | https://github.com/doors-dev/gox | 8d7025146f | 2026-07-03 | 1.25.1 | 68/21/21 | OK |  |
| 832 | dop251__goja | https://github.com/dop251/goja | 0fc1d42c1d | 2026-07-19 | 1.25 | 20/5/7 | OK |  |
| 833 | dotchain__dot | https://github.com/dotchain/dot | 917641f8ea | 2019-09-29 | 1.12 | 310/6/10 | OK |  |
| 834 | doug-martin__goqu | https://github.com/doug-martin/goqu | 21b6e6d1cb | 2023-12-13 | 1.19 | 27/5/13 | OK |  |
| 835 | dragonflyoss__Dragonfly2 | https://github.com/dragonflyoss/Dragonfly2 | c003aed342 | 2026-07-21 | 1.25.5 | 613/192/197 | OK |  |
| 836 | drakkan__sftpgo | https://github.com/drakkan/sftpgo | dbbcf4d741 | 2026-07-18 | 1.26.0 | 523/148/157 | OK |  |
| 837 | drewstinnett__go-output-format | https://github.com/drewstinnett/go-output-format | 3c9868a7d6 | 2024-02-24 | 1.19 | 3/1/1 | OK |  |
| 838 | dromara__carbon | https://github.com/dromara/carbon | 3b7ed987dd | 2026-07-03 | 1.18 | 7/0/4 | EMPTY_GT |  |
| 839 | drone__drone | https://github.com/drone/drone | b71cd3b953 | 2026-07-20 | 1.26.4 | 802/217/222 | OK |  |
| 840 | dropbox__godropbox | https://github.com/dropbox/godropbox | 436d2007a9 | 2023-06-23 | 1.13 | 18/8/10 | OK |  |
| 841 | dsbasko__go-cfg | https://github.com/dsbasko/go-cfg | 3f96f48685 | 2024-08-01 | 1.18 | 11/5/8 | OK |  |
| 842 | dtgorski__typex | https://github.com/dtgorski/typex | 59668c20c7 | 2023-09-16 | 1.21 | 7/3/3 | OK |  |
| 843 | dtylman__gowd | https://github.com/dtylman/gowd | 4271bc0536 | 2022-08-07 | 1.18 | 9/1/4 | OK |  |
| 844 | duanckham__hands | https://github.com/duanckham/hands | bc83d5494b | 2025-08-26 | 1.23 | 0/0/0 | EMPTY_GT |  |
| 845 | duke-git__lancet | https://github.com/duke-git/lancet | 747dddee8b | 2026-03-07 | 1.18 | 7/2/2 | OK |  |
| 846 | dukex__mixpanel | https://github.com/dukex/mixpanel | 4da2d60228 | 2026-01-27 | 1.18 | 0/0/0 | EMPTY_GT |  |
| 847 | dundee__gdu | https://github.com/dundee/gdu | 1868609e0d | 2026-07-08 | 1.25.0 | 79/39/42 | OK |  |
| 848 | dunglas__frankenphp | https://github.com/dunglas/frankenphp | 4397463323 | 2026-07-20 | 1.26.0 | 94/41/44 | OK |  |
| 849 | dunglas__mercure | https://github.com/dunglas/mercure | b434fac817 | 2026-07-20 | 1.26 | 92/32/38 | OK |  |
| 850 | dustin__go-humanize | https://github.com/dustin/go-humanize | 4d1d908255 | 2025-11-24 | 1.16 | 0/0/0 | EMPTY_GT |  |
| 851 | dustinblackman__gomodrun | https://github.com/dustinblackman/gomodrun | 5f026943dc | 2024-05-16 | 1.18 | 44/6/15 | OK |  |
| 852 | dveselov__mystem | https://github.com/dveselov/mystem | d2c6010481 | 2016-10-05 |  | 0/0/0 | EMPTY_GT |  |
| 853 | dvyukov__go-fuzz | https://github.com/dvyukov/go-fuzz | e577bee527 | 2024-09-24 |  | 0/0/0 | EMPTY_GT |  |
| 854 | dwin__goArgonPass | https://github.com/dwin/goArgonPass | 935767cb80 | 2020-12-10 | 1.14 | 16/2/6 | OK |  |
| 855 | dwin__goSecretBoxPassword | https://github.com/dwin/goSecretBoxPassword | 47e9f1c5e8 | 2022-08-31 |  | 9/2/4 | OK |  |
| 856 | e-XpertSolutions__go-cluster | https://github.com/e-XpertSolutions/go-cluster | e743a10971 | 2022-11-29 | 1.18 | 15/1/1 | OK |  |
| 857 | e-dard__godist | https://github.com/e-dard/godist | 7f3421334c | 2015-05-11 |  | 0/0/0 | EMPTY_GT |  |
| 858 | e-dard__netbug | https://github.com/e-dard/netbug | e64d308a0b | 2015-10-29 |  | 0/0/0 | EMPTY_GT |  |
| 859 | e154__smart-home | https://github.com/e154/smart-home | 0c57d18f1c | 2025-11-30 | 1.23.0 | 751/139/142 | OK |  |
| 860 | eaburns__Watch | https://github.com/eaburns/Watch | d5c56e6903 | 2023-03-18 | 1.17 | 4/3/3 | OK |  |
| 861 | eaigner__shield | https://github.com/eaigner/shield | 7e8e5f1f2c | 2013-04-15 |  | 0/0/0 | EMPTY_GT |  |
| 862 | eapache__go-resiliency | https://github.com/eapache/go-resiliency | 39c0aa4a7e | 2025-02-23 | 1.13 | 0/0/0 | EMPTY_GT |  |
| 863 | ebitengine__purego | https://github.com/ebitengine/purego | d476432ce7 | 2026-07-18 | 1.25.0 | 1/0/0 | EMPTY_GT |  |
| 864 | echocat__slf4g | https://github.com/echocat/slf4g | d0bde5ccaf | 2026-03-01 | 1.17 | 0/0/0 | EMPTY_GT |  |
| 865 | edermanoel94__rest-go | https://github.com/edermanoel94/rest-go | bfa0e5f309 | 2020-03-09 | 1.13 | 0/0/0 | EMPTY_GT |  |
| 866 | editorconfig__editorconfig-core-go | https://github.com/editorconfig/editorconfig-core-go | 5f8eeffbdf | 2026-07-10 | 1.25.0 | 11/3/3 | OK |  |
| 867 | edoger__zkits-logger | https://github.com/edoger/zkits-logger | 0dffae6d68 | 2023-05-19 | 1.18 | 1/0/0 | EMPTY_GT |  |
| 868 | eduardonunesp__sslb | https://github.com/eduardonunesp/sslb | dbd2ff8ab3 | 2024-02-18 | 1.22 | 15/7/7 | OK |  |
| 869 | eduncan911__podcast | https://github.com/eduncan911/podcast | 1ae77786dd | 2020-11-02 | 1.13 | 8/1/5 | OK |  |
| 870 | edwingeng__deque | https://github.com/edwingeng/deque | c22ab1bc6f | 2023-09-14 | 1.12 | 0/0/0 | EMPTY_GT |  |
| 871 | edwingeng__doublejump | https://github.com/edwingeng/doublejump | 9a3654919f | 2022-10-20 | 1.12 | 2/1/1 | OK |  |
| 872 | edwingeng__hotswap | https://github.com/edwingeng/hotswap | cb7c6779d0 | 2024-05-24 | 1.18 | 173/16/16 | OK |  |
| 873 | edwingeng__wuid | https://github.com/edwingeng/wuid | 29d94c4666 | 2024-01-26 | 1.18 | 47/21/21 | OK |  |
| 874 | egonelbre__gophers | https://github.com/egonelbre/gophers | 63b1f5a9f3 | 2022-07-06 |  | 0/0/0 | EMPTY_GT |  |
| 875 | ekkinox__yai | https://github.com/ekkinox/yai | 5fbe0f3adf | 2023-12-14 | 1.19 | 122/44/47 | OK |  |
| 876 | eko__gocache | https://github.com/eko/gocache | 6692facc4e | 2026-05-03 |  | 0/0/0 | EMPTY_GT |  |
| 877 | elC0mpa__aws-doctor | https://github.com/elC0mpa/aws-doctor | 3968ed47c6 | 2026-06-07 | 1.26.1 | 115/86/86 | OK |  |
| 878 | elastic__go-elasticsearch | https://github.com/elastic/go-elasticsearch | e06041b9da | 2026-07-20 | 1.25 | 20/7/7 | OK |  |
| 879 | elastic__go-freelru | https://github.com/elastic/go-freelru | 3a0a715f33 | 2026-07-08 | 1.18 | 1/0/0 | EMPTY_GT |  |
| 880 | elazarl__goproxy | https://github.com/elazarl/goproxy | d435b12bc2 | 2026-07-20 | 1.23.0 | 16/2/7 | OK |  |
| 881 | elgohr__go-localstack | https://github.com/elgohr/go-localstack | 91126d023e | 2026-06-22 | 1.25.0 | 117/62/67 | OK |  |
| 882 | elgohr__stop-and-go | https://github.com/elgohr/stop-and-go | 4555d4a7f4 | 2026-07-16 | 1.18 | 7/0/4 | EMPTY_GT |  |
| 883 | elgopher__pi | https://github.com/elgopher/pi | 00f550e54e | 2025-10-21 | 1.24.2 | 43/10/14 | OK |  |
| 884 | elgris__sqrl | https://github.com/elgris/sqrl | 7e0198b302 | 2021-07-27 |  | 4/0/3 | EMPTY_GT |  |
| 885 | elgs__gojq | https://github.com/elgs/gojq | df5c404559 | 2023-06-28 | 1.20 | 6/1/1 | OK |  |
| 886 | elgs__jsonql | https://github.com/elgs/jsonql | 11504e67e0 | 2026-02-21 |  | 0/0/0 | EMPTY_GT |  |
| 887 | elithrar__simple-scrypt | https://github.com/elithrar/simple-scrypt | 3b9f1a2296 | 2026-02-10 | 1.21 | 6/1/1 | OK |  |
| 888 | elliotwutingfeng__go-fasttld | https://github.com/elliotwutingfeng/go-fasttld | e2ddb7acf4 | 2026-07-10 | 1.25.0 | 33/13/16 | OK |  |
| 889 | elves__elvish | https://github.com/elves/elvish | 26a8bd5c4e | 2025-07-14 | 1.22 | 15/7/8 | OK |  |
| 890 | embano1__memlog | https://github.com/embano1/memlog | 95a08e8608 | 2026-06-09 | 1.25.0 | 8/1/4 | OK |  |
| 891 | emersion__go-imap | https://github.com/emersion/go-imap | f68ef419e6 | 2026-07-02 | 1.18 | 13/2/2 | OK |  |
| 892 | emersion__go-message | https://github.com/emersion/go-message | b9039e0d24 | 2025-02-16 | 1.14 | 11/1/1 | OK |  |
| 893 | emersion__go-vcard | https://github.com/emersion/go-vcard | d854b7e0e2 | 2026-06-18 | 1.13 | 0/0/0 | EMPTY_GT |  |
| 894 | emicklei__mora | https://github.com/emicklei/mora | 2180a97210 | 2024-04-23 | 1.16 | 40/12/12 | OK |  |
| 895 | emicklei__proto | https://github.com/emicklei/proto | 032dc916c8 | 2026-02-04 | 1.12 | 1/0/0 | EMPTY_GT |  |
| 896 | emiddleton__gads | https://github.com/emiddleton/gads | f352bbde8e | 2015-09-08 |  | 0/0/0 | EMPTY_GT |  |
| 897 | emirpasic__gods | https://github.com/emirpasic/gods | 1d83d5ae39 | 2025-03-12 | 1.21 | 1/0/0 | EMPTY_GT |  |
| 898 | emitter-io__emitter | https://github.com/emitter-io/emitter | 87f082c76c | 2025-02-18 | 1.24 | 138/59/59 | OK |  |
| 899 | emperror__emperror | https://github.com/emperror/emperror | 488c6525de | 2020-10-04 | 1.12 | 9/4/4 | OK |  |
| 900 | emperror__errors | https://github.com/emperror/errors | 7d0c4c20c0 | 2022-05-27 | 1.12 | 8/3/3 | OK |  |
| 901 | emvi__hide | https://github.com/emvi/hide | c54a91dbc4 | 2021-11-09 | 1.17 | 2/1/1 | OK |  |
| 902 | emvi__null | https://github.com/emvi/null | cb6d3fd36a | 2021-11-09 | 1.17 | 1/0/0 | EMPTY_GT |  |
| 903 | endeveit__enca | https://github.com/endeveit/enca | 00fe968221 | 2016-03-15 |  | 0/0/0 | EMPTY_GT |  |
| 904 | endeveit__guesslanguage | https://github.com/endeveit/guesslanguage | b9ec07401d | 2014-12-16 |  | 0/0/0 | EMPTY_GT |  |
| 905 | energye__energy | https://github.com/energye/energy | 5ec1b43f03 | 2026-06-05 | 1.20 | 9/5/5 | OK |  |
| 906 | enetx__fsm | https://github.com/enetx/fsm | 1b68c68a4b | 2026-06-16 | 1.25.0 | 10/5/5 | OK |  |
| 907 | enetx__g | https://github.com/enetx/g | 1624ecd06b | 2026-07-14 | 1.27 | 0/0/0 | EMPTY_GT |  |
| 908 | enetx__surf | https://github.com/enetx/surf | 10ca6cdc66 | 2026-07-04 | 1.27 | 0/0/0 | EMPTY_GT |  |
| 909 | enetx__tg | https://github.com/enetx/tg | d5da81507c | 2026-06-16 | 1.25.0 | 12/7/7 | OK |  |
| 910 | enriquebris__goconcurrentqueue | https://github.com/enriquebris/goconcurrentqueue | c09fe977b9 | 2022-11-17 | 1.17 | 0/0/0 | EMPTY_GT |  |
| 911 | epiclabs-io__elastic | https://github.com/epiclabs-io/elastic | 1788683634 | 2020-02-26 | 1.13 | 0/0/0 | EMPTY_GT |  |
| 912 | ergo-services__ergo | https://github.com/ergo-services/ergo | 0577883533 | 2026-06-08 | 1.20 | 0/0/0 | EMPTY_GT |  |
| 913 | erni27__imcache | https://github.com/erni27/imcache | bb29b588b2 | 2024-12-14 | 1.18 | 0/0/0 | EMPTY_GT |  |
| 914 | esemplastic__unis | https://github.com/esemplastic/unis | 6e30ed034e | 2017-05-09 |  | 0/0/0 | EMPTY_GT |  |
| 915 | esimov__gogu | https://github.com/esimov/gogu | c0a8b0b96b | 2023-03-04 | 1.20 | 13/2/6 | OK |  |
| 916 | essentialkaos__branca | https://github.com/essentialkaos/branca | 0659235ee4 | 2025-11-25 | 1.24.0 | 14/2/6 | OK |  |
| 917 | esurdam__go-sophos | https://github.com/esurdam/go-sophos | 191de4d9e2 | 2022-05-05 | 1.15 | 4/2/2 | OK |  |
| 918 | esurdam__go-swagger-ui | https://github.com/esurdam/go-swagger-ui | 8beb5ba148 | 2022-10-23 | 1.15 | 2/1/1 | OK |  |
| 919 | etcd-io__bbolt | https://github.com/etcd-io/bbolt | 55cb34b031 | 2026-07-17 | 1.25.0 | 66/7/9 | OK |  |
| 920 | etcd-io__etcd | https://github.com/etcd-io/etcd | 88fe81cd8a | 2026-07-20 | 1.26 | 757/83/83 | OK |  |
| 921 | etcd-io__raft | https://github.com/etcd-io/raft | 26647d57a3 | 2026-07-08 | 1.26 | 11/6/6 | OK |  |
| 922 | ethereum__go-ethereum | https://github.com/ethereum/go-ethereum | 85fe272355 | 2026-07-20 | 1.24.0 | 310/148/156 | OK |  |
| 923 | etherlabsio__healthcheck | https://github.com/etherlabsio/healthcheck | 505bb25053 | 2023-12-13 | 1.12 | 0/0/0 | EMPTY_GT |  |
| 924 | evrone__go-clean-template | https://github.com/evrone/go-clean-template | 34342a5a30 | 2026-07-19 | 1.26 | 826/81/86 | OK |  |
| 925 | ewwwwwqm__logdump | https://github.com/ewwwwwqm/logdump | 5af84c4f36 | 2018-04-02 |  | 0/0/0 | EMPTY_GT |  |
| 926 | extism__go-sdk | https://github.com/extism/go-sdk | de6f8ac957 | 2025-05-15 | 1.22.0 | 35/7/11 | OK |  |
| 927 | faabiosr__cachego | https://github.com/faabiosr/cachego | 859aca6d08 | 2025-04-01 | 1.21 | 32/16/17 | OK |  |
| 928 | faabiosr__echo-middleware | https://github.com/faabiosr/echo-middleware | 97f806426d | 2024-09-05 | 1.21 | 68/28/28 | OK |  |
| 929 | fabiocicerchia__go-proxy-cache | https://github.com/fabiocicerchia/go-proxy-cache | 8a7675a434 | 2026-07-20 | 1.25.0 | 99/48/52 | OK |  |
| 930 | faceair__jio | https://github.com/faceair/jio | 187444f93d |  |  | 0/0/0 | EMPTY_GT |  |
| 931 | facebook__ent | https://github.com/facebook/ent | 69d5d4deb1 | 2026-05-31 | 1.24 | 92/37/44 | OK |  |
| 932 | failsafe-go__failsafe-go | https://github.com/failsafe-go/failsafe-go | baf3dc71cb | 2026-06-02 | 1.21 | 44/12/12 | OK |  |
| 933 | fanux__lhttp | https://github.com/fanux/lhttp | bf219b41da | 2018-04-08 |  | 0/0/0 | EMPTY_GT |  |
| 934 | fastschema__fastschema | https://github.com/fastschema/fastschema | 813349976c | 2026-06-23 | 1.24 | 370/150/150 | OK |  |
| 935 | fatih__vim-go | https://github.com/fatih/vim-go | d69962d20a | 2026-07-18 |  | 0/0/0 | EMPTY_GT |  |
| 936 | fawick__speedtest-resize | https://github.com/fawick/speedtest-resize | 5d62a2c1cf | 2020-10-28 | 1.13 | 8/6/6 | OK |  |
| 937 | fclairamb__ftpserverlib | https://github.com/fclairamb/ftpserverlib | b4c3694ee7 | 2026-07-08 | 1.25.0 | 14/3/8 | OK |  |
| 938 | feichai0017__NoKV | https://github.com/feichai0017/NoKV | e38be60b9a | 2026-06-21 |  | 0/0/0 | EMPTY_GT |  |
| 939 | ferama__rospo | https://github.com/ferama/rospo | ff289bf6ed | 2026-06-23 | 1.25.0 | 45/22/22 | OK |  |
| 940 | fergusstrange__embedded-postgres | https://github.com/fergusstrange/embedded-postgres | 490777eebf | 2026-03-18 | 1.18 | 13/2/7 | OK |  |
| 941 | fern4lvarez__piladb | https://github.com/fern4lvarez/piladb | c0bd688305 | 2018-03-29 |  | 4/1/2 | OK |  |
| 942 | feyeleanor__GoSpeed | https://github.com/feyeleanor/GoSpeed | 9f08a40822 | 2024-03-25 | 1.18 | 0/0/0 | EMPTY_GT |  |
| 943 | fiam__gounidecode | https://github.com/fiam/gounidecode | 8deddbd03f | 2015-06-29 |  | 0/0/0 | EMPTY_GT |  |
| 944 | fieldryand__goflow | https://github.com/fieldryand/goflow | 200fc5f9d6 | 2024-07-08 | 1.20 | 49/23/23 | OK |  |
| 945 | firasdarwish__ore | https://github.com/firasdarwish/ore | 95eeb1fc3a | 2026-03-07 | 1.22 | 7/4/4 | OK |  |
| 946 | fish-tennis__gnet | https://github.com/fish-tennis/gnet | 5bc9931466 | 2026-07-16 | 1.26 | 5/2/2 | OK |  |
| 947 | flannel-io__flannel | https://github.com/flannel-io/flannel | 91b7108f39 | 2026-07-17 | 1.25.0 | 296/72/120 | OK |  |
| 948 | fleetdm__fleet | https://github.com/fleetdm/fleet | 8e97e62a22 | 2026-07-20 | 1.26.5 | 903/334/341 | OK |  |
| 949 | floatdrop__debounce | https://github.com/floatdrop/debounce | dba45acba7 | 2025-06-21 |  | 1/0/0 | EMPTY_GT |  |
| 950 | flosch__pongo2 | https://github.com/flosch/pongo2 | c0f82578df | 2026-03-13 | 1.25 | 5/1/1 | OK |  |
| 951 | flowbaker__flowbaker | https://github.com/flowbaker/flowbaker | b0cfbae449 | 2026-05-31 | 1.25.0 | 308/176/179 | OK |  |
| 952 | flower-corp__lotusdb | https://github.com/flower-corp/lotusdb | 294cde2c35 | 2025-02-18 | 1.21 | 60/20/24 | OK |  |
| 953 | fogfish__dynamo | https://github.com/fogfish/dynamo | 59661c3b58 | 2025-06-05 | 1.23 | 37/29/30 | OK |  |
| 954 | fogleman__gg | https://github.com/fogleman/gg | 8febc0f526 | 2021-09-28 |  | 0/0/0 | EMPTY_GT |  |
| 955 | fogleman__ln | https://github.com/fogleman/ln | 12e6c6e744 | 2017-02-23 |  | 0/0/0 | EMPTY_GT |  |
| 956 | fogleman__nes | https://github.com/fogleman/nes | 3880f34005 | 2023-09-07 | 1.14 | 4/3/3 | OK |  |
| 957 | fogleman__pt | https://github.com/fogleman/pt | 6fa0015c21 | 2017-06-18 |  | 0/0/0 | EMPTY_GT |  |
| 958 | foolin__goview | https://github.com/foolin/goview | 7dd7b8289b | 2023-03-13 | 1.14 | 145/48/48 | OK |  |
| 959 | foolin__pagser | https://github.com/foolin/pagser | 6980439022 | 2023-10-15 | 1.21 | 29/9/9 | OK |  |
| 960 | formancehq__ledger | https://github.com/formancehq/ledger | 0695abcaf9 | 2026-07-09 | 1.26.0 | 392/202/222 | OK |  |
| 961 | fortio__fortio | https://github.com/fortio/fortio | 45e1871081 | 2026-07-09 | 1.25.0 | 75/28/31 | OK |  |
| 962 | fox-toolkit__fox | https://github.com/fox-toolkit/fox | 66e1c3f402 | 2026-07-15 | 1.26.0 | 21/2/6 | OK |  |
| 963 | foxcpp__maddy | https://github.com/foxcpp/maddy | 6bfec6cc72 | 2026-07-13 | 1.23.1 | 404/106/108 | OK |  |
| 964 | francesconi__go-rampart | https://github.com/francesconi/go-rampart | ddd96b6f15 | 2024-06-26 | 1.18 | 7/1/1 | OK |  |
| 965 | francoispqt__onelog | https://github.com/francoispqt/onelog | 8c2bb31b10 | 2019-03-06 |  | 5/1/4 | OK |  |
| 966 | franela__goblin | https://github.com/franela/goblin | 0a4f594942 | 2021-10-03 | 1.14 | 1/0/0 | EMPTY_GT |  |
| 967 | free__concurrent-writer | https://github.com/free/concurrent-writer | 363b9993c9 | 2017-11-17 |  | 0/0/0 | EMPTY_GT |  |
| 968 | fulldump__biff | https://github.com/fulldump/biff | 2065e0faef | 2023-01-11 | 1.14 | 1/0/0 | EMPTY_GT |  |
| 969 | fulldump__goconfig | https://github.com/fulldump/goconfig | 12809971ba | 2026-06-12 | 1.20 | 1/0/0 | EMPTY_GT |  |
| 970 | furdarius__rabbitroutine | https://github.com/furdarius/rabbitroutine | 7d494d0853 | 2024-03-03 | 1.20 | 14/3/7 | OK |  |
| 971 | fxamacker__cbor | https://github.com/fxamacker/cbor | 14074d369b | 2026-07-17 | 1.24 | 2/1/1 | OK |  |
| 972 | fxsjy__jieba | https://github.com/fxsjy/jieba | 67fa2e36e7 | 2020-02-15 |  | 0/0/0 | EMPTY_GT |  |
| 973 | fyne-io__fyne | https://github.com/fyne-io/fyne | de103236e5 | 2026-07-20 | 1.22.0 | 69/46/46 | OK |  |
| 974 | g3n__engine | https://github.com/g3n/engine | 11eb4fd38a | 2026-01-09 | 1.13 | 8/4/4 | OK |  |
| 975 | g4s8__envdoc | https://github.com/g4s8/envdoc | 38ffcf35e3 | 2026-07-18 | 1.25.1 | 20/2/4 | OK |  |
| 976 | gabrie30__ghorg | https://github.com/gabrie30/ghorg | 7b814d8243 | 2026-07-19 | 1.26 | 95/53/53 | OK |  |
| 977 | gabriel-vasile__mimetype | https://github.com/gabriel-vasile/mimetype | bcd718d4f8 | 2026-07-17 | 1.21 | 1/0/0 | EMPTY_GT |  |
| 978 | gabstv__go-bsdiff | https://github.com/gabstv/go-bsdiff | d449682b2c | 2019-03-21 |  | 2/1/1 | OK |  |
| 979 | gabyx__githooks | https://github.com/gabyx/githooks | 4f18479001 | 2026-05-11 |  | 0/0/0 | EMPTY_GT |  |
| 980 | gagliardetto__solana-go | https://github.com/gagliardetto/solana-go | cd51d9586d | 2026-06-30 | 1.24.0 | 134/66/77 | OK |  |
| 981 | gaia-pipeline__gaia | https://github.com/gaia-pipeline/gaia | 98a306bd4c | 2026-01-10 | 1.17 | 389/75/79 | OK |  |
| 982 | gaissmai__bart | https://github.com/gaissmai/bart | a470f827d3 | 2026-07-20 | 1.24.0 | 0/0/0 | EMPTY_GT |  |
| 983 | galeone__igor | https://github.com/galeone/igor | 85be44875d | 2024-04-14 | 1.22 | 2/1/1 | OK |  |
| 984 | galeone__rts | https://github.com/galeone/rts | fadaaac302 | 2022-10-29 | 1.19 | 7/2/2 | OK |  |
| 985 | galeone__tfgo | https://github.com/galeone/tfgo | 16113111dc | 2023-07-15 | 1.19 | 6/2/2 | OK |  |
| 986 | gambol99__go-marathon | https://github.com/gambol99/go-marathon | 94e7bcb625 | 2020-01-16 |  | 0/0/0 | EMPTY_GT |  |
| 987 | gammazero__deque | https://github.com/gammazero/deque | 7ff5207183 | 2026-07-01 | 1.24 | 0/0/0 | EMPTY_GT |  |
| 988 | gammazero__radixtree | https://github.com/gammazero/radixtree |  |  |  | 0/0/0 | EMPTY_GT |  |
| 989 | gammazero__workerpool | https://github.com/gammazero/workerpool | 22a7e8d28b | 2026-07-01 | 1.25 | 2/1/1 | OK |  |
| 990 | gansidui__gotcp | https://github.com/gansidui/gotcp | 7a5bfb3286 | 2017-04-18 |  | 0/0/0 | EMPTY_GT |  |
| 991 | gansidui__skiplist | https://github.com/gansidui/skiplist | c6a909ce56 | 2014-11-21 |  | 0/0/0 | EMPTY_GT |  |
| 992 | garethgeorge__backrest | https://github.com/garethgeorge/backrest | 626156cd8e | 2026-07-12 | 1.26 | 131/44/50 | OK |  |
| 993 | gatewayd-io__gatewayd | https://github.com/gatewayd-io/gatewayd | bb731040d1 | 2026-02-22 | 1.25.0 | 345/148/151 | OK |  |
| 994 | gavv__httpexpect | https://github.com/gavv/httpexpect | 9be446356b | 2025-06-02 | 1.19 | 59/30/32 | OK |  |
| 995 | gchaincl__dotsql | https://github.com/gchaincl/dotsql | 5d06b8903a | 2023-11-23 | 1.18 | 0/0/0 | EMPTY_GT |  |
| 996 | gchaincl__httplab | https://github.com/gchaincl/httplab | 005426c255 | 2024-02-05 | 1.20 | 10/6/9 | OK |  |
| 997 | gempir__go-twitch-irc | https://github.com/gempir/go-twitch-irc | 2e3318729b | 2026-03-11 | 1.12 | 0/0/0 | EMPTY_GT |  |
| 998 | gen2brain__go-unarr | https://github.com/gen2brain/go-unarr | 40673bd1ef | 2024-10-22 | 1.21 | 0/0/0 | EMPTY_GT |  |
| 999 | gen2brain__malgo | https://github.com/gen2brain/malgo | dd586bde45 | 2026-05-13 | 1.21 | 0/0/0 | EMPTY_GT |  |
| 1000 | gen2brain__raylib-go | https://github.com/gen2brain/raylib-go | 8f9e96aca9 | 2026-06-19 |  | 0/0/0 | EMPTY_GT |  |
| 1001 | gentee__gentee | https://github.com/gentee/gentee | 2e6d1304b0 | 2025-07-10 | 1.23.0 | 15/3/3 | OK |  |
| 1002 | georgebuilds__anneal | https://github.com/georgebuilds/anneal | dfb2492cd0 | 2026-06-26 | 1.26.3 | 53/23/32 | OK |  |
| 1003 | georgysavva__scany | https://github.com/georgysavva/scany | 790ae79cb1 | 2025-03-19 | 1.18 | 92/6/15 | OK |  |
| 1004 | gernest__alien | https://github.com/gernest/alien | f830f2720f | 2024-03-24 |  | 0/0/0 | EMPTY_GT |  |
| 1005 | get-woke__woke | https://github.com/get-woke/woke | 5d52c1541a | 2022-08-14 | 1.18 | 153/33/36 | OK |  |
| 1006 | getfider__fider | https://github.com/getfider/fider | c601511434 | 2026-07-20 | 1.25.0 | 366/40/40 | OK |  |
| 1007 | getlantern__systray | https://github.com/getlantern/systray | 22c167e809 | 2023-11-10 | 1.13 | 18/9/9 | OK |  |
| 1008 | getsentry__sentry-go | https://github.com/getsentry/sentry-go | 96509cc7e3 | 2026-07-16 | 1.25.0 | 228/3/11 | OK |  |
| 1009 | getveil__veil | https://github.com/getveil/veil | 793dd08507 | 2026-05-21 | 1.26.2 | 60/25/25 | OK |  |
| 1010 | ggicci__httpin | https://github.com/ggicci/httpin | 77ececb9e0 | 2026-05-28 | 1.25.0 | 26/11/18 | OK |  |
| 1011 | gha-common__go-beautiful-html-coverage | https://github.com/gha-common/go-beautiful-html-coverage | 9e4a20de75 | 2024-05-21 |  | 0/0/0 | EMPTY_GT |  |
| 1012 | ghostiam__binstruct | https://github.com/ghostiam/binstruct | 69e4c213c4 | 2024-10-01 | 1.21 | 5/1/3 | OK |  |
| 1013 | gilbertchen__duplicacy | https://github.com/gilbertchen/duplicacy | 2def0161b3 | 2025-05-02 | 1.19 | 120/60/61 | OK |  |
| 1014 | gin-gonic__gin | https://github.com/gin-gonic/gin | 34dac209ff | 2026-06-27 | 1.25.0 | 58/18/25 | OK |  |
| 1015 | giorgisio__goav | https://github.com/giorgisio/goav | ea60062d94 | 2022-05-19 |  | 9/0/4 | EMPTY_GT |  |
| 1016 | git-time-metric__gtm | https://github.com/git-time-metric/gtm | 019de991bf | 2019-08-02 |  | 0/0/0 | EMPTY_GT |  |
| 1017 | gizak__termui | https://github.com/gizak/termui | 3ee54a07c7 | 2025-07-10 | 1.15 | 5/4/4 | OK |  |
| 1018 | gkampitakis__go-snaps | https://github.com/gkampitakis/go-snaps | 07ef1d2d05 | 2026-07-07 | 1.23 | 24/11/11 | OK |  |
| 1019 | gliderlabs__ssh | https://github.com/gliderlabs/ssh | 909fa952d4 | 2025-01-27 | 1.20 | 7/2/2 | OK |  |
| 1020 | globalsign__mgo | https://github.com/globalsign/mgo | eeefdecb41 | 2018-10-15 |  | 0/0/0 | EMPTY_GT |  |
| 1021 | glycerine__bambam | https://github.com/glycerine/bambam | 4a32c86875 | 2016-10-07 |  | 0/0/0 | EMPTY_GT |  |
| 1022 | glycerine__go-capnproto | https://github.com/glycerine/go-capnproto | 2d07de3aa7 | 2019-01-17 |  | 0/0/0 | EMPTY_GT |  |
| 1023 | gmsec__micro | https://github.com/gmsec/micro | ff155ed4bc | 2026-02-28 | 1.25.0 | 170/22/26 | OK |  |
| 1024 | gnolang__gno | https://github.com/gnolang/gno | d14a037705 | 2026-07-20 | 1.25.9 | 255/96/98 | OK |  |
| 1025 | go-acme__lego | https://github.com/go-acme/lego | 2a8fe3b2f1 | 2026-07-19 | 1.25.0 | 678/208/208 | OK |  |
| 1026 | go-authgate__authgate | https://github.com/go-authgate/authgate |  |  |  | 0/0/0 | CLONE_FAIL |  |
| 1027 | go-beans__go | https://github.com/go-beans/go | 4356843264 | 2026-07-08 | 1.24.5 | 11/5/9 | OK |  |
| 1028 | go-chi__chi | https://github.com/go-chi/chi | 8b258c7bb2 | 2026-07-05 | 1.23 | 0/0/0 | EMPTY_GT |  |
| 1029 | go-co-op__gocron | https://github.com/go-co-op/gocron | cc444c2a6f | 2026-07-17 | 1.22 | 15/3/8 | OK |  |
| 1030 | go-critic__go-critic | https://github.com/go-critic/go-critic | 325d070a68 | 2026-06-26 | 1.24.0 | 25/19/19 | OK |  |
| 1031 | go-eagle__eagle | https://github.com/go-eagle/eagle | b1301b093e | 2025-11-28 | 1.22 | 824/185/188 | OK |  |
| 1032 | go-ego__gse | https://github.com/go-ego/gse | f8b89ec3ca | 2026-06-10 | 1.25 | 3/1/2 | OK |  |
| 1033 | go-errr__go | https://github.com/go-errr/go | 69ef42ffe5 | 2026-07-07 | 1.24.5 | 0/0/0 | EMPTY_GT |  |
| 1034 | go-external-config__aws | https://github.com/go-external-config/aws | 67f4f84b5e | 2026-07-08 | 1.24.5 | 26/21/21 | OK |  |
| 1035 | go-external-config__consul | https://github.com/go-external-config/consul | 5cde28b653 | 2026-07-08 | 1.26 | 104/21/21 | OK |  |
| 1036 | go-external-config__go | https://github.com/go-external-config/go | 251a26bc53 | 2026-07-07 | 1.24.5 | 10/4/7 | OK |  |
| 1037 | go-external-config__vault | https://github.com/go-external-config/vault | 0a2d79592c | 2026-07-08 | 1.26 | 60/22/22 | OK |  |
| 1038 | go-ffmt__ffmt | https://github.com/go-ffmt/ffmt | 68902756ad | 2021-11-19 |  | 0/0/0 | EMPTY_GT |  |
| 1039 | go-fuego__fuego | https://github.com/go-fuego/fuego | 83a86d91fc | 2026-06-29 | 1.26.4 | 341/18/22 | OK |  |
| 1040 | go-furnace__go-furnace | https://github.com/go-furnace/go-furnace | be1cec4c9d | 2021-10-28 | 1.12 | 68/34/34 | OK |  |
| 1041 | go-git__go-git | https://github.com/go-git/go-git | 6a082fae59 | 2026-07-20 | 1.25.0 | 35/18/22 | OK |  |
| 1042 | go-gitea__gitea | https://github.com/go-gitea/gitea | 17ce342dcb | 2026-07-20 | 1.26.5 | 708/258/258 | OK |  |
| 1043 | go-gl__gl | https://github.com/go-gl/gl | 4566fea9a2 | 2026-03-31 | 1.12 | 0/0/0 | EMPTY_GT |  |
| 1044 | go-gl__glfw | https://github.com/go-gl/glfw | 2a407d02d0 | 2026-07-07 | 1.19 | 0/0/0 | EMPTY_GT |  |
| 1045 | go-gl__mathgl | https://github.com/go-gl/mathgl | c307faa875 | 2024-01-27 | 1.11 | 0/0/0 | EMPTY_GT |  |
| 1046 | go-gorm__gorm | https://github.com/go-gorm/gorm | 1d6ce99528 | 2026-06-22 | 1.18 | 9/3/5 | OK |  |
| 1047 | go-gormigrate__gormigrate | https://github.com/go-gormigrate/gormigrate | 61a83eb294 | 2026-05-26 | 1.18 | 10/4/4 | OK |  |
| 1048 | go-gorp__gorp | https://github.com/go-gorp/gorp | 4b75e80dcb | 2024-11-19 | 1.18 | 0/0/0 | EMPTY_GT |  |
| 1049 | go-goyave__goyave | https://github.com/go-goyave/goyave | f3ae5f272a | 2026-06-03 | 1.25.8 | 385/77/81 | OK |  |
| 1050 | go-hep__hep | https://github.com/go-hep/hep | 9edc3eb3c1 | 2025-10-30 | 1.24.0 | 94/55/58 | OK |  |
| 1051 | go-ini__ini | https://github.com/go-ini/ini |  |  |  | 0/0/0 | EMPTY_GT |  |
| 1052 | go-jet__jet | https://github.com/go-jet/jet | 10d3623cca | 2026-06-20 | 1.24.0 | 22/10/10 | OK |  |
| 1053 | go-jose__go-jose | https://github.com/go-jose/go-jose | 8d4e64dd61 | 2026-06-22 | 1.24.0 | 0/0/0 | EMPTY_GT |  |
| 1054 | go-kata__kinit | https://github.com/go-kata/kinit | aef56cb689 | 2021-06-12 | 1.14 | 3/2/2 | OK |  |
| 1055 | go-kit__kit | https://github.com/go-kit/kit | 78fbbceece | 2024-03-13 | 1.17 | 230/78/83 | OK |  |
| 1056 | go-kivik__kivik | https://github.com/go-kivik/kivik | c5e56b1ecf | 2026-03-10 | 1.20 | 381/32/38 | OK |  |
| 1057 | go-kod__kod | https://github.com/go-kod/kod | 9dc222a525 | 2026-03-13 | 1.24.0 | 94/52/55 | OK |  |
| 1058 | go-kratos__kratos | https://github.com/go-kratos/kratos | 668db92c2c | 2026-06-26 | 1.25.0 | 53/14/14 | OK |  |
| 1059 | go-lark__lark | https://github.com/go-lark/lark | 353ea7dfc6 | 2026-05-14 | 1.13 | 9/1/6 | OK |  |
| 1060 | go-music-theory__music-theory | https://github.com/go-music-theory/music-theory | 6acc915d06 | 2026-01-21 | 1.14 | 7/2/5 | OK |  |
| 1061 | go-nunu__nunu | https://github.com/go-nunu/nunu | ba07a4e833 | 2026-04-27 | 1.16 | 34/12/12 | OK |  |
| 1062 | go-oas__docs | https://github.com/go-oas/docs | 6e09fa6b33 | 2023-03-15 | 1.19 | 6/1/1 | OK |  |
| 1063 | go-ole__go-ole | https://github.com/go-ole/go-ole | 6867ec158e | 2025-03-05 | 1.12 | 0/0/0 | EMPTY_GT |  |
| 1064 | go-ozzo__ozzo-dbx | https://github.com/go-ozzo/ozzo-dbx | 8a5a098341 | 2026-07-12 | 1.13 | 15/0/5 | EMPTY_GT |  |
| 1065 | go-ozzo__ozzo-log | https://github.com/go-ozzo/ozzo-log | 610cdd147d | 2016-07-03 |  | 0/0/0 | EMPTY_GT |  |
| 1066 | go-ozzo__ozzo-routing | https://github.com/go-ozzo/ozzo-routing | a3372fb478 | 2021-09-04 | 1.13 | 10/2/6 | OK |  |
| 1067 | go-ozzo__ozzo-validation | https://github.com/go-ozzo/ozzo-validation | 34bd5476bd | 2020-10-29 | 1.13 | 8/1/5 | OK |  |
| 1068 | go-perfstat__go | https://github.com/go-perfstat/go | 81d18c9089 | 2026-07-08 | 1.24.5 | 13/0/4 | EMPTY_GT |  |
| 1069 | go-playground__assert | https://github.com/go-playground/assert |  |  |  | 0/0/0 | EMPTY_GT |  |
| 1070 | go-playground__form | https://github.com/go-playground/form | 3079d9a89d |  |  | 0/0/0 | EMPTY_GT |  |
| 1071 | go-playground__generate | https://github.com/go-playground/generate | f25d00489d | 2017-01-09 |  | 0/0/0 | EMPTY_GT |  |
| 1072 | go-playground__lars | https://github.com/go-playground/lars | 4dc376e72e | 2017-10-31 |  | 0/0/0 | EMPTY_GT |  |
| 1073 | go-playground__log | https://github.com/go-playground/log | 10609b0376 | 2023-08-16 | 1.18 | 9/4/4 | OK |  |
| 1074 | go-playground__overalls | https://github.com/go-playground/overalls | 7df9f728c0 | 2019-12-18 |  | 0/0/0 | EMPTY_GT |  |
| 1075 | go-playground__pool | https://github.com/go-playground/pool | e73cd3a5de | 2016-08-23 |  | 0/0/0 | EMPTY_GT |  |
| 1076 | go-playground__pure | https://github.com/go-playground/pure | c277882736 | 2023-07-13 | 1.18 | 4/3/3 | OK |  |
| 1077 | go-playground__stats | https://github.com/go-playground/stats | 02c0e2b698 | 2016-09-07 |  | 0/0/0 | EMPTY_GT |  |
| 1078 | go-playground__validator | https://github.com/go-playground/validator | fd8bd3c9d5 | 2026-07-20 | 1.25.0 | 18/7/8 | OK |  |
| 1079 | go-playground__webhooks | https://github.com/go-playground/webhooks | 02d182ac47 | 2024-07-30 | 1.17 | 8/1/5 | OK |  |
| 1080 | go-reform__reform | https://github.com/go-reform/reform | db2c976d4b | 2022-01-24 | 1.17 | 26/10/15 | OK |  |
| 1081 | go-rel__rel | https://github.com/go-rel/rel | 1d091d7ddf | 2026-05-02 | 1.21 | 29/2/7 | OK |  |
| 1082 | go-resty__resty | https://github.com/go-resty/resty | ea5b6cf677 | 2026-07-19 | 1.23.0 | 6/1/1 | OK |  |
| 1083 | go-rod__rod | https://github.com/go-rod/rod | f12b6b656f | 2026-07-16 | 1.21 | 15/6/7 | OK |  |
| 1084 | go-rtc__stun | https://github.com/go-rtc/stun | 5958aeb5e3 | 2020-11-23 | 1.12 | 1/0/0 | EMPTY_GT |  |
| 1085 | go-sigma__sigma | https://github.com/go-sigma/sigma | aaed001b56 | 2026-07-13 | 1.26.5 | 1284/486/491 | OK |  |
| 1086 | go-sonic__sonic | https://github.com/go-sonic/sonic | 53db5562b4 | 2024-02-24 | 1.21 | 212/97/97 | OK |  |
| 1087 | go-spring__spring-core | https://github.com/go-spring/spring-core | 4a2323738b | 2026-05-06 | 1.26 | 42/15/15 | OK |  |
| 1088 | go-sprout__sprout | https://github.com/go-sprout/sprout | 4315ea292a | 2026-03-26 | 1.24.0 | 27/13/14 | OK |  |
| 1089 | go-sql-driver__mysql | https://github.com/go-sql-driver/mysql | 416cd99d46 | 2026-07-16 | 1.24.0 | 2/1/1 | OK |  |
| 1090 | go-swagger__go-swagger | https://github.com/go-swagger/go-swagger | c9d6b7121e | 2026-07-20 | 1.25.0 | 93/66/66 | OK |  |
| 1091 | go-task__task | https://github.com/go-task/task | 81a49a40c3 | 2026-07-19 | 1.25.10 | 388/123/125 | OK |  |
| 1092 | go-telegram-bot-api__telegram-bot-api | https://github.com/go-telegram-bot-api/telegram-bot-api | 4126fa6112 | 2022-10-19 | 1.16 | 0/0/0 | EMPTY_GT |  |
| 1093 | go-telegram__bot | https://github.com/go-telegram/bot | 06d05ed677 | 2026-06-30 | 1.18 | 1/0/0 | EMPTY_GT |  |
| 1094 | go-testfixtures__testfixtures | https://github.com/go-testfixtures/testfixtures | 8d756b6115 | 2026-07-03 | 1.25.9 | 347/2/2 | OK |  |
| 1095 | go-the-way__exl | https://github.com/go-the-way/exl | 36f80b18e2 | 2025-10-16 | 1.24 | 20/11/11 | OK |  |
| 1096 | go-the-way__sg | https://github.com/go-the-way/sg | 00c357e614 | 2022-05-11 | 1.16 | 1/0/0 | EMPTY_GT |  |
| 1097 | go-the-way__validator | https://github.com/go-the-way/validator | 54c6f6428f | 2024-08-16 | 1.13 | 8/1/1 | OK |  |
| 1098 | go-vgo__robotgo | https://github.com/go-vgo/robotgo | 766c6abccc | 2026-07-08 | 1.25.0 | 41/15/15 | OK |  |
| 1099 | go-webgpu__goffi | https://github.com/go-webgpu/goffi | 895a3faac2 | 2026-07-12 | 1.25 | 0/0/0 | EMPTY_GT |  |
| 1100 | go-xkg__xkg | https://github.com/go-xkg/xkg | d4297b68f2 | 2015-01-08 |  | 0/0/0 | EMPTY_GT |  |
| 1101 | go-zoo__bone | https://github.com/go-zoo/bone | 31c3a0bb52 | 2019-04-16 | 1.9 | 1/0/0 | EMPTY_GT |  |
| 1102 | go-zoox__fetch | https://github.com/go-zoox/fetch | 1f397699aa | 2026-01-18 | 1.18 | 16/7/9 | OK |  |
| 1103 | go2hx__go2hx | https://github.com/go2hx/go2hx | c860b0216d | 2026-03-25 | 1.21.3 | 6/1/1 | OK |  |
| 1104 | goadesign__goa | https://github.com/goadesign/goa | 919c8e1a9e | 2026-07-20 | 1.25.0 | 71/20/30 | OK |  |
| 1105 | goava__di | https://github.com/goava/di | 282f32cdde | 2023-12-12 | 1.20 | 0/0/0 | EMPTY_GT |  |
| 1106 | gobeam__Stringy | https://github.com/gobeam/Stringy | be5603921e | 2025-05-19 | 1.14 | 0/0/0 | EMPTY_GT |  |
| 1107 | gobeam__mongo-go-pagination | https://github.com/gobeam/mongo-go-pagination | f00183ba8c | 2022-08-09 | 1.13 | 56/12/12 | OK |  |
| 1108 | gobridge__about-us | https://github.com/gobridge/about-us | af1e0a0223 | 2023-12-01 |  | 0/0/0 | EMPTY_GT |  |
| 1109 | gobuffalo__pop | https://github.com/gobuffalo/pop | 1e0eb66642 | 2026-07-17 | 1.25.0 | 72/50/54 | OK |  |
| 1110 | gobuffalo__validate | https://github.com/gobuffalo/validate | 715c163ea3 | 2022-09-26 | 1.16 | 9/2/6 | OK |  |
| 1111 | goccmack__gocc | https://github.com/goccmack/gocc | 05e1d8e93f | 2026-01-13 | 1.24 | 3/1/1 | OK |  |
| 1112 | gocircuit__circuit | https://github.com/gocircuit/circuit | fd2add79ac | 2016-11-21 |  | 0/0/0 | EMPTY_GT |  |
| 1113 | gocraft__web | https://github.com/gocraft/web | 9707327fb6 | 2019-02-07 |  | 0/0/0 | EMPTY_GT |  |
| 1114 | godbus__dbus | https://github.com/godbus/dbus | 7914b92d55 | 2026-05-01 | 1.20 | 2/0/0 | EMPTY_GT |  |
| 1115 | godror__godror | https://github.com/godror/godror | 581a4f8ca4 | 2026-07-10 | 1.24.0 | 24/5/11 | OK |  |
| 1116 | gofiber__fiber | https://github.com/gofiber/fiber | ce323d0ced | 2026-07-20 | 1.25.0 | 30/17/22 | OK |  |
| 1117 | goforj__godump | https://github.com/goforj/godump | 36ebde3b7a | 2026-07-17 | 1.18 | 1/0/0 | EMPTY_GT |  |
| 1118 | gofr-dev__gofr | https://github.com/gofr-dev/gofr | 5c6458c29e | 2026-07-21 | 1.26.0 | 591/93/100 | OK |  |
| 1119 | gofrs__uuid | https://github.com/gofrs/uuid | c46df524cf | 2026-03-28 | 1.25 | 0/0/0 | EMPTY_GT |  |
| 1120 | gogf__gf | https://github.com/gogf/gf | 7474b459ee | 2026-07-08 | 1.23.0 | 44/27/27 | OK |  |
| 1121 | gogpu__gg | https://github.com/gogpu/gg | 5d2ea1e8c7 | 2026-07-18 | 1.25.0 | 13/6/8 | OK |  |
| 1122 | gogpu__gogpu | https://github.com/gogpu/gogpu | f1577ff279 | 2026-07-20 | 1.25.0 | 8/6/6 | OK |  |
| 1123 | gogpu__naga | https://github.com/gogpu/naga | 1e4453c933 | 2026-06-17 | 1.25 | 0/0/0 | EMPTY_GT |  |
| 1124 | gogpu__systray | https://github.com/gogpu/systray | 46016e5977 | 2026-07-12 | 1.25.0 | 4/1/1 | OK |  |
| 1125 | gogpu__ui | https://github.com/gogpu/ui | 796b71c884 | 2026-07-17 | 1.25.0 | 16/11/11 | OK |  |
| 1126 | gogpu__wgpu | https://github.com/gogpu/wgpu | e0e587a4ef | 2026-07-16 | 1.25.0 | 7/5/5 | OK |  |
| 1127 | gographics__imagick | https://github.com/gographics/imagick | 290ac30ec5 | 2026-02-17 | 1.23 | 2/1/1 | OK |  |
| 1128 | goioc__di | https://github.com/goioc/di | 0ccac80090 | 2024-11-25 | 1.20 | 9/2/6 | OK |  |
| 1129 | goioc__retro | https://github.com/goioc/retro | d1adb317b3 | 2024-01-28 | 1.21 | 10/1/6 | OK |  |
| 1130 | goiot__devices | https://github.com/goiot/devices | 09d1226fc8 | 2016-07-08 |  | 0/0/0 | EMPTY_GT |  |
| 1131 | gojek__darkroom | https://github.com/gojek/darkroom | cd57945161 | 2023-10-02 | 1.18 | 275/55/55 | OK |  |
| 1132 | gojektech__heimdall | https://github.com/gojektech/heimdall | ecba1e80c4 | 2026-07-01 | 1.25 | 8/6/6 | OK |  |
| 1133 | goji__goji | https://github.com/goji/goji | 490b001d03 | 2019-01-26 |  | 0/0/0 | EMPTY_GT |  |
| 1134 | gojuno__go-zooz | https://github.com/gojuno/go-zooz | 9b1604f62b | 2018-06-05 |  | 0/0/0 | EMPTY_GT |  |
| 1135 | gojuno__minimock | https://github.com/gojuno/minimock | c1c4acef76 | 2026-07-14 | 1.23.0 | 39/10/12 | OK |  |
| 1136 | golang-design__clipboard | https://github.com/golang-design/clipboard | a60465b4ed | 2026-06-07 | 1.24 | 14/3/3 | OK |  |
| 1137 | golang-jwt__jwt | https://github.com/golang-jwt/jwt | 1a11d3724e | 2026-07-06 | 1.21 | 1/0/0 | EMPTY_GT |  |
| 1138 | golang-migrate__migrate | https://github.com/golang-migrate/migrate | 18966c755f | 2026-07-05 | 1.25.0 | 503/175/183 | OK |  |
| 1139 | golang-module__dongle | https://github.com/golang-module/dongle | a95277f3be | 2026-05-31 | 1.23.0 | 12/2/6 | OK |  |
| 1140 | golang-standards__project-layout | https://github.com/golang-standards/project-layout | a9d6fae701 | 2026-04-28 | 1.19 | 0/0/0 | EMPTY_GT |  |
| 1141 | golang-templates__seed | https://github.com/golang-templates/seed | f6571c1091 | 2026-07-20 | 1.26.4 | 0/0/0 | EMPTY_GT |  |
| 1142 | golang__geo | https://github.com/golang/geo | 857a528af6 | 2026-07-13 | 1.23.0 | 3/1/2 | OK |  |
| 1143 | golang__glog | https://github.com/golang/glog | 2b790ef785 | 2025-04-29 | 1.19 | 2/0/1 | EMPTY_GT |  |
| 1144 | golang__go | https://github.com/golang/go | 1c3a1bac8b | 2026-07-20 |  | 0/0/0 | EMPTY_GT |  |
| 1145 | golang__groupcache | https://github.com/golang/groupcache | 2c02b8208c | 2024-11-29 | 1.20 | 5/2/2 | OK |  |
| 1146 | golang__oauth2 | https://github.com/golang/oauth2 | 4d954e69a8 | 2026-02-11 | 1.25.0 | 2/1/1 | OK |  |
| 1147 | golang__protobuf | https://github.com/golang/protobuf | 75de7c059e | 2024-03-06 | 1.17 | 4/1/2 | OK |  |
| 1148 | golang__tools | https://github.com/golang/tools | a2c572e032 | 2026-07-20 | 1.25.0 | 11/5/6 | OK |  |
| 1149 | golang__vscode-go | https://github.com/golang/vscode-go | e1869f7701 | 2026-07-20 | 1.23.1 | 8/2/2 | OK |  |
| 1150 | golangci__golangci-lint | https://github.com/golangci/golangci-lint | d5de4e14c8 | 2026-07-14 | 1.25.0 | 400/209/215 | OK |  |
| 1151 | golobby__config | https://github.com/golobby/config | 9c34056b45 | 2023-01-05 | 1.16 | 17/5/8 | OK |  |
| 1152 | golobby__container | https://github.com/golobby/container | db9e9cf04a | 2023-08-30 | 1.17 | 0/0/0 | EMPTY_GT |  |
| 1153 | golobby__orm | https://github.com/golobby/orm | aa0a1c4602 | 2026-06-22 | 1.18 | 46/14/19 | OK |  |
| 1154 | golobby__router | https://github.com/golobby/router | aaaa31548f | 2022-03-30 | 1.17 | 7/0/4 | EMPTY_GT |  |
| 1155 | goml__gobrain | https://github.com/goml/gobrain | 2e2d98ca82 | 2020-12-12 | 1.13 | 0/0/0 | EMPTY_GT |  |
| 1156 | gomlx__gomlx | https://github.com/gomlx/gomlx | 07ec0dfa97 | 2026-07-20 | 1.26 | 127/39/48 | OK |  |
| 1157 | gomodule__redigo | https://github.com/gomodule/redigo | 57c8b99ccb | 2025-11-02 | 1.17 | 7/0/4 | EMPTY_GT |  |
| 1158 | gomutex__godocx | https://github.com/gomutex/godocx | aefd2d814c | 2025-08-12 | 1.18 | 7/0/4 | EMPTY_GT |  |
| 1159 | gone-io__gone | https://github.com/gone-io/gone | cd32441cf7 | 2025-11-13 | 1.24 | 10/1/1 | OK |  |
| 1160 | gontainer__gontainer | https://github.com/gontainer/gontainer | 4cef5a4fb4 | 2024-04-16 | 1.21 | 62/12/15 | OK |  |
| 1161 | gontainer__reflectpro | https://github.com/gontainer/reflectpro | b4dc24fe0b | 2024-10-02 | 1.14 | 8/1/5 | OK |  |
| 1162 | gonum__gonum | https://github.com/gonum/gonum | 4c98f5a7fc | 2026-05-04 | 1.25.9 | 39/10/12 | OK |  |
| 1163 | gonum__plot | https://github.com/gonum/plot | d56745857d | 2026-04-22 | 1.25.0 | 39/9/11 | OK |  |
| 1164 | gonutz__d3d9 | https://github.com/gonutz/d3d9 | 64e3f095c7 | 2025-06-28 | 1.11 | 1/0/0 | EMPTY_GT |  |
| 1165 | gonutz__prototype | https://github.com/gonutz/prototype | d3732ae42e | 2025-08-05 | 1.16 | 7/2/2 | OK |  |
| 1166 | goodsign__libtextcat | https://github.com/goodsign/libtextcat | 2438f99844 | 2012-12-27 |  | 0/0/0 | EMPTY_GT |  |
| 1167 | goodsign__snowball | https://github.com/goodsign/snowball | 4619f991af | 2012-12-11 |  | 0/0/0 | EMPTY_GT |  |
| 1168 | google__cayley | https://github.com/google/cayley | 81dcd7d73e | 2024-07-06 | 1.22 | 441/91/93 | OK |  |
| 1169 | google__cel-go | https://github.com/google/cel-go | 82a222f469 | 2026-07-17 | 1.23.0 | 18/8/9 | OK |  |
| 1170 | google__gnxi | https://github.com/google/gnxi | 987664c754 | 2026-03-30 | 1.13 | 402/50/50 | OK |  |
| 1171 | google__go-cmp | https://github.com/google/go-cmp | b133f1f193 | 2026-06-18 | 1.21 | 0/0/0 | EMPTY_GT |  |
| 1172 | google__go-gcm | https://github.com/google/go-gcm | f387343038 | 2017-02-14 |  | 0/0/0 | EMPTY_GT |  |
| 1173 | google__go-github | https://github.com/google/go-github | f15206a0a1 | 2026-07-20 | 1.25.0 | 3/1/2 | OK |  |
| 1174 | google__go-querystring | https://github.com/google/go-querystring | d39ef06364 | 2026-07-06 | 1.13 | 0/0/0 | EMPTY_GT |  |
| 1175 | google__google-api-go-client | https://github.com/google/google-api-go-client | 153c78e85b | 2026-07-20 | 1.25.0 | 101/28/29 | OK |  |
| 1176 | google__gopacket | https://github.com/google/gopacket | b7d9dbd15a | 2025-03-19 | 1.12 | 7/2/4 | OK |  |
| 1177 | google__ko | https://github.com/google/ko | 4c8d972687 | 2026-07-17 | 1.26.3 | 512/158/158 | OK |  |
| 1178 | google__leveldb | https://github.com/google/leveldb | 7ee830d02b | 2026-03-10 |  | 0/0/0 | EMPTY_GT |  |
| 1179 | google__starlark-go | https://github.com/google/starlark-go | 5395d018f0 | 2026-07-08 | 1.25.0 | 9/4/5 | OK |  |
| 1180 | google__uuid | https://github.com/google/uuid | 2d3c2a9cc5 | 2024-11-14 |  | 1/0/0 | EMPTY_GT |  |
| 1181 | gookit__color | https://github.com/gookit/color | 289d54c447 | 2026-06-04 | 1.18 | 5/1/2 | OK |  |
| 1182 | gookit__config | https://github.com/gookit/config | 0edfefc8d9 | 2026-07-04 | 1.21.0 | 19/13/13 | OK |  |
| 1183 | gookit__filter | https://github.com/gookit/filter | 6970c5b209 | 2026-07-16 | 1.19 | 8/2/4 | OK |  |
| 1184 | gookit__rux | https://github.com/gookit/rux | a218e0b245 | 2026-07-10 | 1.23 | 9/6/6 | OK |  |
| 1185 | gookit__slog | https://github.com/gookit/slog | 51310d7042 | 2026-07-17 | 1.19 | 15/10/10 | OK |  |
| 1186 | gookit__validate | https://github.com/gookit/validate | 62c7313da4 | 2026-07-17 | 1.21 | 9/3/6 | OK |  |
| 1187 | gopherjs__gopherjs | https://github.com/gopherjs/gopherjs | 45844b5c72 | 2026-06-26 | 1.21 | 28/13/15 | OK |  |
| 1188 | gopherlibs__appindicator | https://github.com/gopherlibs/appindicator | a9aaaca208 | 2025-02-18 | 1.24.0 | 2/1/1 | OK |  |
| 1189 | gopinath-langote__1build | https://github.com/gopinath-langote/1build | 9149747908 | 2026-03-03 | 1.24.0 | 107/22/22 | OK |  |
| 1190 | goptics__varmq | https://github.com/goptics/varmq | 1f9d9b588f | 2026-07-04 | 1.24.0 | 7/0/4 | EMPTY_GT |  |
| 1191 | goptics__vizb | https://github.com/goptics/vizb | 354caeef8a | 2026-07-21 | 1.26.5 | 82/24/24 | OK |  |
| 1192 | gopxl__beep | https://github.com/gopxl/beep | 0ca406a247 | 2025-07-16 | 1.21 | 38/21/22 | OK |  |
| 1193 | gopxl__pixel | https://github.com/gopxl/pixel | 61f9c42d3c | 2025-03-07 | 1.21 | 21/8/13 | OK |  |
| 1194 | goradd__got | https://github.com/goradd/got | b5b2a831cd | 2026-01-28 | 1.20 | 12/1/5 | OK |  |
| 1195 | goradd__html5tag | https://github.com/goradd/html5tag | f92bdbe5b1 | 2023-12-10 | 1.16 | 0/0/0 | EMPTY_GT |  |
| 1196 | goradd__maps | https://github.com/goradd/maps | e9dafc6608 | 2026-01-07 | 1.23 | 7/0/4 | EMPTY_GT |  |
| 1197 | goravel__goravel | https://github.com/goravel/goravel | 31651f646c | 2026-07-05 | 1.25.0 | 240/137/137 | OK |  |
| 1198 | goraz__onion | https://github.com/goraz/onion | e201628c9d | 2021-08-22 | 1.17 | 176/15/18 | OK |  |
| 1199 | gordonklaus__portaudio | https://github.com/gordonklaus/portaudio | 765aa7dfa6 | 2026-02-03 | 1.18 | 2/1/1 | OK |  |
| 1200 | goreleaser__goreleaser | https://github.com/goreleaser/goreleaser | ae4debbe43 | 2026-07-15 | 1.26.5 | 934/336/363 | OK |  |
| 1201 | gorgonia__gorgonia | https://github.com/gorgonia/gorgonia | d7a3ce27c9 | 2023-10-13 | 1.16 | 124/27/31 | OK |  |
| 1202 | gorilla__csrf | https://github.com/gorilla/csrf | 9dd6af1f6d | 2025-01-23 | 1.20 | 3/1/1 | OK |  |
| 1203 | gorilla__mux | https://github.com/gorilla/mux | db9d1d0073 | 2024-06-19 | 1.20 | 1/0/0 | EMPTY_GT |  |
| 1204 | goroute__route | https://github.com/goroute/route | 7a574211b2 | 2019-12-23 | 1.13 | 0/0/0 | EMPTY_GT |  |
| 1205 | goschtalt__approx | https://github.com/goschtalt/approx | 22c3b27b5c | 2026-07-01 | 1.18 | 1/0/0 | EMPTY_GT |  |
| 1206 | gosimple__slug | https://github.com/gosimple/slug | 62efd7f93a | 2024-12-23 | 1.11 | 2/1/1 | OK |  |
| 1207 | gosuri__go-store | https://github.com/gosuri/go-store | 4449165852 | 2017-02-23 |  | 0/0/0 | EMPTY_GT |  |
| 1208 | gosuri__uilive | https://github.com/gosuri/uilive | 11a6ee751a | 2020-01-03 | 1.10 | 0/0/0 | EMPTY_GT |  |
| 1209 | gosuri__uiprogress | https://github.com/gosuri/uiprogress | 484b9f69ea | 2021-03-17 | 1.15 | 4/1/1 | OK |  |
| 1210 | gosuri__uitable | https://github.com/gosuri/uitable | c2124e6a03 | 2022-08-26 |  | 0/0/0 | EMPTY_GT |  |
| 1211 | gotestyourself__gotest.tools | https://github.com/gotestyourself/gotest.tools | 0b81523ff2 | 2024-09-04 | 1.17 | 8/4/4 | OK |  |
| 1212 | gotidy__copy | https://github.com/gotidy/copy | 4a79fb1f37 | 2020-12-28 | 1.15 | 2/1/1 | OK |  |
| 1213 | gotidy__ptr | https://github.com/gotidy/ptr | 4164798414 | 2021-12-19 | 1.18 | 1/0/0 | EMPTY_GT |  |
| 1214 | gotk3__gotk3 | https://github.com/gotk3/gotk3 | e7a9e823ca | 2025-11-24 | 1.14 | 1/0/0 | EMPTY_GT |  |
| 1215 | gotranspile__cxgo | https://github.com/gotranspile/cxgo | e682671cd3 | 2025-03-16 | 1.20 | 23/12/15 | OK |  |
| 1216 | govalues__decimal | https://github.com/govalues/decimal | 377e9df603 | 2025-01-19 | 1.22 | 1/0/0 | EMPTY_GT |  |
| 1217 | govalues__money | https://github.com/govalues/money | 159fd14549 | 2025-01-26 | 1.22 | 2/1/1 | OK |  |
| 1218 | gowebapi__webapi | https://github.com/gowebapi/webapi | 41cedfc27a | 2022-12-21 | 1.17 | 1/0/0 | EMPTY_GT |  |
| 1219 | gowww__router | https://github.com/gowww/router | d165dfe15c | 2023-09-11 | 1.14 | 1/0/0 | EMPTY_GT |  |
| 1220 | goxjs__gl | https://github.com/goxjs/gl | 37525f4d9d | 2023-07-04 | 1.19 | 11/1/2 | OK |  |
| 1221 | goxjs__glfw | https://github.com/goxjs/glfw | 622eb27e27 | 2023-07-04 | 1.19 | 2/1/1 | OK |  |
| 1222 | goyek__goyek | https://github.com/goyek/goyek | c7da11395f | 2026-07-20 | 1.16 | 0/0/0 | EMPTY_GT |  |
| 1223 | grafana__k6 | https://github.com/grafana/k6 | 99d25c3685 | 2026-07-20 | 1.25.0 | 175/89/89 | OK |  |
| 1224 | graphql-go__graphql | https://github.com/graphql-go/graphql | 6acef3563f | 2026-06-22 | 1.21 | 0/0/0 | EMPTY_GT |  |
| 1225 | greencoda__confiq | https://github.com/greencoda/confiq | 844aa81142 | 2026-04-13 | 1.22.0 | 10/8/8 | OK |  |
| 1226 | gregdel__pushover | https://github.com/gregdel/pushover | 5cc53243a4 | 2025-09-22 | 1.14 | 1/0/0 | EMPTY_GT |  |
| 1227 | grijul__otpgen | https://github.com/grijul/otpgen | 2e2e90b7fa | 2021-08-06 | 1.16 | 1/0/0 | EMPTY_GT |  |
| 1228 | groovili__gogtrends | https://github.com/groovili/gogtrends | 4950e38d46 | 2022-06-14 | 1.14 | 12/4/8 | OK |  |
| 1229 | grpc__grpc-go | https://github.com/grpc/grpc-go | 75f3c0bb28 | 2026-07-17 | 1.25.0 | 86/39/40 | OK |  |
| 1230 | gsamokovarov__jump | https://github.com/gsamokovarov/jump | 0df9afdbcc | 2026-07-18 | 1.21 | 2/0/1 | EMPTY_GT |  |
| 1231 | guiferpa__gody | https://github.com/guiferpa/gody | 6cb7c3199b | 2025-05-29 | 1.23.5 | 1/0/0 | EMPTY_GT |  |
| 1232 | gulien__orbit | https://github.com/gulien/orbit | 2fd5fb2060 | 2021-01-18 |  | 0/0/0 | EMPTY_GT |  |
| 1233 | guptarohit__asciigraph | https://github.com/guptarohit/asciigraph | 3934c9cdf7 | 2026-06-21 | 1.11 | 0/0/0 | EMPTY_GT |  |
| 1234 | gurkankaymak__hocon | https://github.com/gurkankaymak/hocon | 988f64563c | 2025-11-19 |  | 0/0/0 | EMPTY_GT |  |
| 1235 | gurukami__typ | https://github.com/gurukami/typ | 618b2e0562 | 2021-10-15 | 1.12 | 1/0/0 | EMPTY_GT |  |
| 1236 | guumaster__hostctl | https://github.com/guumaster/hostctl | d6d96999f8 | 2023-08-20 | 1.20 | 106/25/28 | OK |  |
| 1237 | gyozatech__noodlog | https://github.com/gyozatech/noodlog | 81ff5e09e9 | 2023-04-19 | 1.16 | 1/0/0 | EMPTY_GT |  |
| 1238 | gyuho__goraph | https://github.com/gyuho/goraph | ad625acf7a | 2022-04-10 |  | 0/0/0 | EMPTY_GT |  |
| 1239 | h2non__baloo | https://github.com/h2non/baloo | f0f8a3baab | 2022-08-09 |  | 0/0/0 | EMPTY_GT |  |
| 1240 | h2non__bimg | https://github.com/h2non/bimg | a14e08d560 | 2024-03-08 |  | 0/0/0 | EMPTY_GT |  |
| 1241 | h2non__filetype | https://github.com/h2non/filetype | a9c74ba9f5 | 2026-07-01 | 1.13 | 1/0/0 | EMPTY_GT |  |
| 1242 | h2non__gentleman | https://github.com/h2non/gentleman | 94efe30d59 | 2023-12-17 |  | 0/0/0 | EMPTY_GT |  |
| 1243 | h2non__imaginary | https://github.com/h2non/imaginary | 6a274b4887 | 2025-11-08 | 1.12 | 45/5/5 | OK |  |
| 1244 | hackebrot__turtle | https://github.com/hackebrot/turtle | 30f91c6aef | 2021-10-04 | 1.14 | 101/2/4 | OK |  |
| 1245 | hailocab__go-geoindex | https://github.com/hailocab/go-geoindex | 64631bfe97 |  |  | 0/0/0 | EMPTY_GT |  |
| 1246 | hajimehoshi__ebiten | https://github.com/hajimehoshi/ebiten | 8731d165ff | 2026-07-21 | 1.25.0 | 33/23/23 | OK |  |
| 1247 | hajimehoshi__oto | https://github.com/hajimehoshi/oto | 9b83714cfe | 2026-06-14 | 1.25.0 | 4/2/2 | OK |  |
| 1248 | hako__durafmt | https://github.com/hako/durafmt | 5c1018a4e1 | 2021-06-08 | 1.11 | 1/0/0 | EMPTY_GT |  |
| 1249 | hamed-yousefi__gowl | https://github.com/hamed-yousefi/gowl | c359fc4ea3 | 2023-10-19 | 1.17 | 7/0/4 | EMPTY_GT |  |
| 1250 | hapijs__joi | https://github.com/hapijs/joi | c86ddc0b61 | 2026-06-17 |  | 0/0/0 | EMPTY_GT |  |
| 1251 | happy-sdk__happy | https://github.com/happy-sdk/happy | 3e74bb75fb | 2026-07-20 | 1.27rc2 | 103/21/22 | OK |  |
| 1252 | harkaitz__go-faketime | https://github.com/harkaitz/go-faketime | f6651dfaa7 | 2024-12-05 | 1.21.1 | 1/0/0 | EMPTY_GT |  |
| 1253 | harrytran103__7_days_of_go | https://github.com/harrytran103/7_days_of_go | b8374882db | 2026-04-04 |  | 0/0/0 | EMPTY_GT |  |
| 1254 | harshaneel__localaik | https://github.com/harshaneel/localaik | 4538828144 | 2026-06-01 | 1.25 | 84/22/22 | OK |  |
| 1255 | hashicorp__cli | https://github.com/hashicorp/cli | 865558803b | 2026-06-12 | 1.23 | 36/20/20 | OK |  |
| 1256 | hashicorp__go-cleanhttp | https://github.com/hashicorp/go-cleanhttp | 78ad103482 | 2026-07-16 | 1.24 | 0/0/0 | EMPTY_GT |  |
| 1257 | hashicorp__go-dbw | https://github.com/hashicorp/go-dbw | eed3ee0c61 | 2026-07-10 | 1.25.0 | 91/27/28 | OK |  |
| 1258 | hashicorp__go-getter | https://github.com/hashicorp/go-getter | e5628776f2 | 2026-07-20 | 1.25.8 | 241/73/73 | OK |  |
| 1259 | hashicorp__go-multierror | https://github.com/hashicorp/go-multierror | 6d4d48630d | 2026-04-01 | 1.13 | 1/0/0 | EMPTY_GT |  |
| 1260 | hashicorp__go-retryablehttp | https://github.com/hashicorp/go-retryablehttp | fd004584a4 | 2026-04-14 | 1.23 | 13/1/6 | OK |  |
| 1261 | hashicorp__logutils | https://github.com/hashicorp/logutils | ac8b318eab | 2026-01-23 |  | 1/0/0 | EMPTY_GT |  |
| 1262 | hashicorp__mdns | https://github.com/hashicorp/mdns | fdf95184ab | 2026-07-20 | 1.25.0 | 13/3/3 | OK |  |
| 1263 | hashicorp__mql | https://github.com/hashicorp/mql | 4dffe89733 | 2026-05-25 | 1.24.0 | 21/1/5 | OK |  |
| 1264 | hashicorp__raft | https://github.com/hashicorp/raft | dd30865f16 | 2026-07-20 | 1.25 | 78/10/14 | OK |  |
| 1265 | hashmap-kz__relimpact | https://github.com/hashmap-kz/relimpact | b9f4c8443b | 2026-07-13 | 1.25.0 | 15/7/7 | OK |  |
| 1266 | hatchet-dev__hatchet | https://github.com/hatchet-dev/hatchet | 82adce8505 | 2026-07-20 | 1.26 | 431/246/249 | OK |  |
| 1267 | hawx__img | https://github.com/hawx/img | 6cd0f2a93f | 2015-05-01 |  | 0/0/0 | EMPTY_GT |  |
| 1268 | haxpax__gosms | https://github.com/haxpax/gosms | 1cb89c41d4 | 2020-07-07 |  | 0/0/0 | EMPTY_GT |  |
| 1269 | hbagdi__go-unsplash | https://github.com/hbagdi/go-unsplash | e86e018a5d | 2025-12-23 | 1.23.0 | 11/1/6 | OK |  |
| 1270 | hbollon__go-edlib | https://github.com/hbollon/go-edlib | 952af74185 | 2025-08-19 | 1.13 | 1/0/0 | EMPTY_GT |  |
| 1271 | hdt3213__godis | https://github.com/hdt3213/godis | f13d9cb9d6 | 2025-09-14 | 1.18 | 98/19/19 | OK |  |
| 1272 | heartwilltell__log | https://github.com/heartwilltell/log | 1397cc8fb3 | 2022-12-06 | 1.18 | 1/0/0 | EMPTY_GT |  |
| 1273 | hectane__hectane | https://github.com/hectane/hectane | 6053d33bf8 | 2019-08-21 |  | 0/0/0 | EMPTY_GT |  |
| 1274 | hedhyw__gherkingen | https://github.com/hedhyw/gherkingen | e110885222 | 2025-11-03 | 1.23.0 | 23/6/10 | OK |  |
| 1275 | hedhyw__json-log-viewer | https://github.com/hedhyw/json-log-viewer | d89367f6ea | 2026-06-15 | 1.24.0 | 60/34/34 | OK |  |
| 1276 | hedhyw__otelinji | https://github.com/hedhyw/otelinji | 0b9836b51e | 2026-03-01 | 1.22 | 40/11/18 | OK |  |
| 1277 | hedhyw__rex | https://github.com/hedhyw/rex | b844209bcd | 2025-12-01 | 1.18 | 0/0/0 | EMPTY_GT |  |
| 1278 | hedzr__cmdr | https://github.com/hedzr/cmdr | 112993243e | 2026-07-08 | 1.25.0 | 21/12/12 | OK |  |
| 1279 | hedzr__store | https://github.com/hedzr/store | 3cab747144 | 2026-07-14 | 1.26 | 0/0/0 | EMPTY_GT |  |
| 1280 | heetch__confita | https://github.com/heetch/confita | 17dd7b177a | 2025-12-08 | 1.23.0 | 132/34/38 | OK |  |
| 1281 | henvic__httpretty | https://github.com/henvic/httpretty | 3b8d127828 | 2024-09-24 | 1.22 | 0/0/0 | EMPTY_GT |  |
| 1282 | hexdigest__execpool | https://github.com/hexdigest/execpool |  |  |  | 0/0/0 | EMPTY_GT |  |
| 1283 | hexdigest__gounit-vim | https://github.com/hexdigest/gounit-vim | 69ba1afa31 | 2018-10-29 |  | 0/0/0 | EMPTY_GT |  |
| 1284 | hexdigest__gounit | https://github.com/hexdigest/gounit | f1874d3307 | 2018-08-17 |  | 0/0/0 | EMPTY_GT |  |
| 1285 | hexdigest__gowrap | https://github.com/hexdigest/gowrap | 3da5386b41 | 2026-07-02 | 1.24.0 | 78/16/21 | OK |  |
| 1286 | hexdigest__prep | https://github.com/hexdigest/prep | 029cd9151f | 2017-12-19 |  | 0/0/0 | EMPTY_GT |  |
| 1287 | hibiken__asynq | https://github.com/hibiken/asynq | d135f1439b | 2026-06-12 | 1.24.0 | 24/10/11 | OK |  |
| 1288 | hidevopsio__hiboot | https://github.com/hidevopsio/hiboot | 118a0f39ed | 2026-06-08 | 1.24.2 | 204/91/91 | OK |  |
| 1289 | hillu__go-yara | https://github.com/hillu/go-yara | 50b5a022de | 2025-07-01 | 1.10 | 1/0/0 | EMPTY_GT |  |
| 1290 | hishamkaram__geoserver | https://github.com/hishamkaram/geoserver | 43629f2f5a | 2026-05-04 | 1.25 | 0/0/0 | EMPTY_GT |  |
| 1291 | hishamkaram__gismanager | https://github.com/hishamkaram/gismanager | 3ead0cf1ca | 2026-05-07 | 1.25.0 | 404/92/95 | OK |  |
| 1292 | hjson__hjson-go | https://github.com/hjson/hjson-go | 23908b1b28 | 2026-01-25 | 1.12 | 1/0/0 | EMPTY_GT |  |
| 1293 | hlandau__acme | https://github.com/hlandau/acme | d3428cff26 | 2023-01-08 |  | 0/0/0 | EMPTY_GT |  |
| 1294 | hlandau__passlib | https://github.com/hlandau/passlib | 45ceed2af3 | 2021-03-23 |  | 0/0/0 | EMPTY_GT |  |
| 1295 | hmdsefi__gograph | https://github.com/hmdsefi/gograph | 84cf0a5cb8 | 2026-07-19 | 1.24.2 | 0/0/0 | EMPTY_GT |  |
| 1296 | homedepot__flop | https://github.com/homedepot/flop |  |  | 1.14 | 6/1/5 | OK |  |
| 1297 | hpcloud__tail | https://github.com/hpcloud/tail | a1dbeea552 | 2018-05-14 |  | 0/0/0 | EMPTY_GT |  |
| 1298 | hprose__hprose-golang | https://github.com/hprose/hprose-golang | ee50718842 | 2024-02-18 | 1.13 | 27/12/16 | OK |  |
| 1299 | hrygo__hotplex | https://github.com/hrygo/hotplex | b6b9108b69 | 2026-07-21 | 1.26 | 303/124/129 | OK |  |
| 1300 | hscells__doi | https://github.com/hscells/doi | 1a5819c7d5 | 2017-08-21 |  | 0/0/0 | EMPTY_GT |  |
| 1301 | hsluoyz__casbin | https://github.com/hsluoyz/casbin | 95656679ea | 2026-07-01 | 1.13 | 4/3/3 | OK |  |
| 1302 | htcat__htcat | https://github.com/htcat/htcat | 2e876d1aa1 |  |  | 0/0/0 | EMPTY_GT |  |
| 1303 | huandu__facebook | https://github.com/huandu/facebook | 708a5c56d6 | 2025-06-17 | 1.13 | 0/0/0 | EMPTY_GT |  |
| 1304 | huandu__go-sqlbuilder | https://github.com/huandu/go-sqlbuilder | 345b646003 | 2026-06-21 | 1.18 | 10/2/4 | OK |  |
| 1305 | huandu__xstrings | https://github.com/huandu/xstrings | 1040c040a8 | 2024-06-06 | 1.12 | 0/0/0 | EMPTY_GT |  |
| 1306 | hugocarreira__go-decent-copy | https://github.com/hugocarreira/go-decent-copy | adc1459d61 | 2020-01-03 | 1.12 | 0/0/0 | EMPTY_GT |  |
| 1307 | husobee__vestigo | https://github.com/husobee/vestigo | d1524ea594 | 2020-10-08 |  | 0/0/0 | EMPTY_GT |  |
| 1308 | huydang284__fixedwidth | https://github.com/huydang284/fixedwidth | 65aef34bf0 | 2019-12-12 | 1.12 | 2/0/1 | EMPTY_GT |  |
| 1309 | hybridgroup__gobot | https://github.com/hybridgroup/gobot | 798be8ce07 | 2025-10-18 | 1.24.0 | 74/25/29 | OK |  |
| 1310 | hybridgroup__gocv | https://github.com/hybridgroup/gocv | 274ac8a2d6 | 2026-01-05 | 1.21 | 15/4/5 | OK |  |
| 1311 | hyfather__pipeline | https://github.com/hyfather/pipeline | 4e49541d31 | 2018-08-30 |  | 0/0/0 | EMPTY_GT |  |
| 1312 | hypebeast__go-osc | https://github.com/hypebeast/go-osc | cec5a8a1e5 | 2022-03-09 | 1.16 | 0/0/0 | EMPTY_GT |  |
| 1313 | hyperboloide__lk | https://github.com/hyperboloide/lk | b291812e32 | 2025-12-20 | 1.17 | 11/3/7 | OK |  |
| 1314 | hyperboloide__pdfgen | https://github.com/hyperboloide/pdfgen | bc40f41fd8 | 2018-02-19 |  | 0/0/0 | EMPTY_GT |  |
| 1315 | hyperledger__fabric | https://github.com/hyperledger/fabric | ef2166e6a4 | 2026-07-19 | 1.26.4 | 499/111/115 | OK |  |
| 1316 | hyperonym__ratus | https://github.com/hyperonym/ratus | 1c50f8d736 | 2025-03-05 | 1.22.2 | 83/40/40 | OK |  |
| 1317 | i-love-flamingo__dingo | https://github.com/i-love-flamingo/dingo | 921a6dd9ee | 2026-06-25 | 1.25.8 | 25/1/5 | OK |  |
| 1318 | i-love-flamingo__flamingo-commerce | https://github.com/i-love-flamingo/flamingo-commerce | 0b3c5be991 | 2026-07-02 | 1.25.0 | 355/120/161 | OK |  |
| 1319 | i-love-flamingo__flamingo | https://github.com/i-love-flamingo/flamingo | 3de17d54fe | 2026-07-13 | 1.25.8 | 231/63/64 | OK |  |
| 1320 | i25959341__orderbook | https://github.com/i25959341/orderbook | 0d883ab115 | 2025-04-04 | 1.22.1 | 3/2/2 | OK |  |
| 1321 | ian-kent__go-log | https://github.com/ian-kent/go-log | 5731446c36 | 2016-01-13 |  | 0/0/0 | EMPTY_GT |  |
| 1322 | ian-kent__linkio | https://github.com/ian-kent/linkio | 97566b8728 | 2017-08-07 |  | 0/0/0 | EMPTY_GT |  |
| 1323 | ian-kent__purl | https://github.com/ian-kent/purl | 3fd32ca66a | 2014-12-07 |  | 0/0/0 | EMPTY_GT |  |
| 1324 | iancmcc__bingo | https://github.com/iancmcc/bingo | 849920622a | 2024-12-09 | 1.20 | 11/1/4 | OK |  |
| 1325 | ianlopshire__go-fixedwidth | https://github.com/ianlopshire/go-fixedwidth | df11b76214 | 2024-02-08 | 1.18 | 1/0/0 | EMPTY_GT |  |
| 1326 | ianlopshire__go-ssm-config | https://github.com/ianlopshire/go-ssm-config | 04abb80513 | 2023-10-09 | 1.11 | 14/3/3 | OK |  |
| 1327 | icelain__jokeapi | https://github.com/icelain/jokeapi | cc3912b85e | 2024-12-26 | 1.16 | 0/0/0 | EMPTY_GT |  |
| 1328 | ichiban__prolog | https://github.com/ichiban/prolog | 6375564ab3 | 2024-10-15 | 1.19 | 14/2/7 | OK |  |
| 1329 | icza__backscanner | https://github.com/icza/backscanner | dff01ac502 | 2024-11-24 | 1.13 | 0/0/0 | EMPTY_GT |  |
| 1330 | icza__bitio | https://github.com/icza/bitio | 708ad1b61b | 2023-03-30 | 1.13 | 2/0/1 | EMPTY_GT |  |
| 1331 | icza__minquery | https://github.com/icza/minquery | 1e53665e37 | 2023-03-31 | 1.13 | 7/1/2 | OK |  |
| 1332 | icza__session | https://github.com/icza/session | 9d7186b56f | 2024-08-24 | 1.23.0 | 0/0/0 | EMPTY_GT |  |
| 1333 | igrmk__treemap | https://github.com/igrmk/treemap | c69857c24f | 2022-03-22 |  | 0/0/0 | EMPTY_GT |  |
| 1334 | ihebu__dsu | https://github.com/ihebu/dsu | 2b177e0243 | 2022-01-29 | 1.16 | 1/0/0 | EMPTY_GT |  |
| 1335 | ijt__go-anytime | https://github.com/ijt/go-anytime | 3183858dff | 2023-01-17 | 1.19 | 10/1/6 | OK |  |
| 1336 | ik5__gostrutils | https://github.com/ik5/gostrutils | a00f6b59c6 | 2023-03-25 | 1.14 | 11/1/1 | OK |  |
| 1337 | ikawaha__kagome | https://github.com/ikawaha/kagome | e3145d8014 | 2026-07-21 | 1.24.0 | 5/3/3 | OK |  |
| 1338 | ikeikeikeike__go-sitemap-generator | https://github.com/ikeikeikeike/go-sitemap-generator | c473e35ca5 | 2019-03-27 | 1.9 | 4/2/3 | OK |  |
| 1339 | ilyakaznacheev__cleanenv | https://github.com/ilyakaznacheev/cleanenv | fbd44b4eb2 | 2025-09-15 | 1.13 | 6/4/4 | OK |  |
| 1340 | imdario__mergo | https://github.com/imdario/mergo | bd2790490a | 2026-03-23 | 1.18 | 1/0/0 | EMPTY_GT |  |
| 1341 | immortal__immortal | https://github.com/immortal/immortal | 35afc96faa | 2026-07-10 | 1.22 | 8/6/6 | OK |  |
| 1342 | imroc__req | https://github.com/imroc/req | d34ebe528d | 2026-07-16 | 1.25.0 | 30/11/11 | OK |  |
| 1343 | in-toto__in-toto-golang | https://github.com/in-toto/in-toto-golang | 36d782ffb2 | 2026-05-04 | 1.24.0 | 62/21/22 | OK |  |
| 1344 | inancgumus__learngo | https://github.com/inancgumus/learngo | 3c475a78e5 | 2025-06-24 | 1.13 | 13/10/10 | OK |  |
| 1345 | inconshreveable__gonative | https://github.com/inconshreveable/gonative | 1c70352219 | 2016-07-21 |  | 0/0/0 | EMPTY_GT |  |
| 1346 | inconshreveable__log15 | https://github.com/inconshreveable/log15 | e4019e44be | 2026-05-13 | 1.24.0 | 4/3/3 | OK |  |
| 1347 | incu6us__goimports-reviser | https://github.com/incu6us/goimports-reviser | fa5587e51b | 2026-02-24 | 1.25.0 | 19/4/8 | OK |  |
| 1348 | indeedeng__iwf | https://github.com/indeedeng/iwf | e048e1617a | 2026-07-08 | 1.24.0 | 239/93/93 | OK |  |
| 1349 | influxdb__influxdb | https://github.com/influxdb/influxdb | 15130156df | 2026-07-15 |  | 0/0/0 | EMPTY_GT |  |
| 1350 | innogames__slack-bot | https://github.com/innogames/slack-bot | 2701842568 | 2026-07-01 | 1.25.0 | 276/73/75 | OK |  |
| 1351 | insidieux__inizio | https://github.com/insidieux/inizio | bdac1fb542 | 2022-06-20 | 1.18 | 155/51/55 | OK |  |
| 1352 | integrii__flaggy | https://github.com/integrii/flaggy | e0a0096c5f | 2025-10-03 | 1.25 | 0/0/0 | EMPTY_GT |  |
| 1353 | intel-go__nff-go | https://github.com/intel-go/nff-go | 3fcc11eab4 | 2022-11-22 |  | 0/0/0 | EMPTY_GT |  |
| 1354 | invopop__ctxi18n | https://github.com/invopop/ctxi18n | 95a38ee644 | 2024-12-04 | 1.21 | 38/2/5 | OK |  |
| 1355 | invopop__gobl | https://github.com/invopop/gobl | 43ca3676ed | 2026-07-20 | 1.25.0 | 65/15/19 | OK |  |
| 1356 | ip2location__ip2location-io-go | https://github.com/ip2location/ip2location-io-go | 228eff8789 | 2026-04-27 | 1.18 | 7/2/2 | OK |  |
| 1357 | ipfs__kubo | https://github.com/ipfs/kubo | d07245b6f5 | 2026-07-17 | 1.26.4 | 586/255/260 | OK |  |
| 1358 | ironsmile__euterpe | https://github.com/ironsmile/euterpe | 1a3bf30733 | 2026-01-01 | 1.24.0 | 92/16/18 | OK |  |
| 1359 | isacikgoz__gitbatch | https://github.com/isacikgoz/gitbatch | 23e5445179 | 2023-01-17 | 1.18 | 154/45/45 | OK |  |
| 1360 | isbm__textwrap | https://github.com/isbm/textwrap | 22edad10bd | 2019-07-29 |  | 0/0/0 | EMPTY_GT |  |
| 1361 | italolelis__outboxer | https://github.com/italolelis/outboxer | 73a984850b | 2023-11-06 | 1.20 | 179/25/27 | OK |  |
| 1362 | itchyny__bed | https://github.com/itchyny/bed | 506f3317fa | 2024-12-01 | 1.23 | 16/8/8 | OK |  |
| 1363 | ivanilves__lstags | https://github.com/ivanilves/lstags | 7a8f8d8f21 | 2023-03-24 | 1.13 | 41/21/24 | OK |  |
| 1364 | ivpusic__grpool | https://github.com/ivpusic/grpool | 28957a27c9 | 2017-08-04 |  | 0/0/0 | EMPTY_GT |  |
| 1365 | ivpusic__rerun | https://github.com/ivpusic/rerun | adc8acf148 | 2017-03-31 |  | 0/0/0 | EMPTY_GT |  |
| 1366 | iwanbk__bcache | https://github.com/iwanbk/bcache | 92331d3ef6 | 2019-05-01 |  | 0/0/0 | EMPTY_GT |  |
| 1367 | iyashjayesh__goscaf | https://github.com/iyashjayesh/goscaf | 710f8779ee | 2026-04-08 | 1.25.0 | 32/11/11 | OK |  |
| 1368 | iyashjayesh__monigo | https://github.com/iyashjayesh/monigo | dd3becde1d | 2026-04-22 | 1.24.0 | 94/42/42 | OK |  |
| 1369 | jackc__pgx | https://github.com/jackc/pgx | 140be86592 | 2026-07-18 | 1.25.0 | 20/5/9 | OK |  |
| 1370 | jaegertracing__jaeger | https://github.com/jaegertracing/jaeger | 7a7e1f91c3 | 2026-07-20 | 1.26.0 | 590/316/320 | OK |  |
| 1371 | jaffee__commandeer | https://github.com/jaffee/commandeer | 9ec81c97a2 | 2022-09-20 | 1.12 | 95/2/2 | OK |  |
| 1372 | jaisonerick__macwifi | https://github.com/jaisonerick/macwifi | a6c9259613 | 2026-04-22 | 1.26.1 | 0/0/0 | EMPTY_GT |  |
| 1373 | jakehl__goid | https://github.com/jakehl/goid | 1c471182dc | 2019-02-18 |  | 0/0/0 | EMPTY_GT |  |
| 1374 | james-bowman__nlp | https://github.com/james-bowman/nlp | 26d441fa0d | 2021-05-11 |  | 0/0/0 | EMPTY_GT |  |
| 1375 | james-bowman__sparse | https://github.com/james-bowman/sparse | 495ee4f84d | 2026-02-16 | 1.14 | 23/1/2 | OK |  |
| 1376 | jameycribbs__hare | https://github.com/jameycribbs/hare | 1e37662981 | 2021-02-24 | 1.15 | 0/0/0 | EMPTY_GT |  |
| 1377 | jandelgado__rabtap | https://github.com/jandelgado/rabtap | e9f4c4698b | 2026-07-20 | 1.25.0 | 24/16/16 | OK |  |
| 1378 | janiltonmaciel__statiks | https://github.com/janiltonmaciel/statiks | e0f1bd6468 | 2025-02-27 | 1.23 | 67/7/41 | OK |  |
| 1379 | janpfeifer__gonb | https://github.com/janpfeifer/gonb | c24b51a42f | 2026-06-07 | 1.24.4 | 59/31/35 | OK |  |
| 1380 | jarcoal__httpmock | https://github.com/jarcoal/httpmock | a796508986 | 2026-07-04 | 1.18 | 0/0/0 | EMPTY_GT |  |
| 1381 | jaredfolkins__badactor | https://github.com/jaredfolkins/badactor | 1d1f4105dd | 2020-05-28 | 1.14 | 1/0/0 | EMPTY_GT |  |
| 1382 | jaschaephraim__lrserver | https://github.com/jaschaephraim/lrserver | afed386b36 | 2024-03-06 | 1.22.0 | 26/2/7 | OK |  |
| 1383 | jasonlvhit__gocron | https://github.com/jasonlvhit/gocron | b58ecb26a8 | 2021-08-23 | 1.13 | 0/0/0 | EMPTY_GT |  |
| 1384 | jawher__mow.cli | https://github.com/jawher/mow.cli | d9d0f2e822 | 2021-07-25 | 1.13 | 0/0/0 | EMPTY_GT |  |
| 1385 | jaypipes__ghw | https://github.com/jaypipes/ghw | fedd4fe4a3 | 2026-07-14 | 1.21 | 0/0/0 | EMPTY_GT |  |
| 1386 | jbrodriguez__mlog | https://github.com/jbrodriguez/mlog | cbd5ae8e9c | 2018-08-05 |  | 0/0/0 | EMPTY_GT |  |
| 1387 | jbrukh__bayesian | https://github.com/jbrukh/bayesian | 5f3ee86459 | 2025-12-07 | 1.22 | 1/0/0 | EMPTY_GT |  |
| 1388 | jcla1__gisp | https://github.com/jcla1/gisp | 6382efb764 | 2014-06-29 |  | 0/0/0 | EMPTY_GT |  |
| 1389 | jcuga__golongpoll | https://github.com/jcuga/golongpoll | 223792742f | 2023-08-20 |  | 2/1/1 | OK |  |
| 1390 | jeffail__leaps | https://github.com/jeffail/leaps | 66b39e5485 | 2021-02-22 | 1.12 | 93/14/14 | OK |  |
| 1391 | jellydator__newsapi-go | https://github.com/jellydator/newsapi-go | a503d50672 | 2025-09-16 | 1.17 | 0/0/0 | EMPTY_GT |  |
| 1392 | jellydator__ttlcache | https://github.com/jellydator/ttlcache | 2445e4d88a | 2026-07-19 | 1.25.0 | 12/1/6 | OK |  |
| 1393 | jenkins-zh__jenkins-cli | https://github.com/jenkins-zh/jenkins-cli | c926d60cb6 | 2025-01-16 | 1.23 | 423/67/80 | OK |  |
| 1394 | jeroenrinzema__commander | https://github.com/jeroenrinzema/commander | 8553e17ecf | 2021-04-28 | 1.12 | 369/12/12 | OK |  |
| 1395 | jeroenrinzema__psql-wire | https://github.com/jeroenrinzema/psql-wire | d7ea0edf32 | 2026-07-19 | 1.25.0 | 29/10/11 | OK |  |
| 1396 | jessevdk__go-flags | https://github.com/jessevdk/go-flags | 8eae68f0a7 | 2024-06-17 | 1.20 | 12/1/2 | OK |  |
| 1397 | jexia__semaphore | https://github.com/jexia/semaphore | 182a82a458 | 2021-06-04 | 1.14 | 231/47/52 | OK |  |
| 1398 | jf-tech__omniparser | https://github.com/jf-tech/omniparser | d4371ab77a | 2025-02-22 | 1.16 | 127/21/24 | OK |  |
| 1399 | jfcg__sorty | https://github.com/jfcg/sorty | 0be58083f3 | 2026-05-22 | 1.25 | 4/1/2 | OK |  |
| 1400 | jfcg__yell | https://github.com/jfcg/yell | 9036b4c699 | 2022-03-02 | 1.15 | 0/0/0 | EMPTY_GT |  |
| 1401 | jfeliu007__goplantuml | https://github.com/jfeliu007/goplantuml | 81d136b30c | 2025-09-16 | 1.17 | 79/2/2 | OK |  |
| 1402 | jferrl__go-githubauth | https://github.com/jferrl/go-githubauth | 3d8cba2e65 | 2026-06-30 | 1.25.0 | 4/2/2 | OK |  |
| 1403 | jfilipczyk__gomatch | https://github.com/jfilipczyk/gomatch | 1eac4d5522 | 2021-01-15 | 1.15 | 6/1/4 | OK |  |
| 1404 | jfrog__froggit-go | https://github.com/jfrog/froggit-go | cb67bc2784 | 2026-07-19 | 1.25.7 | 125/39/43 | OK |  |
| 1405 | jgroeneveld__schema | https://github.com/jgroeneveld/schema | c5dd015ecb | 2019-10-13 |  | 0/0/0 | EMPTY_GT |  |
| 1406 | jgroeneveld__trial | https://github.com/jgroeneveld/trial | a82530ee05 | 2022-10-05 | 1.19 | 2/1/1 | OK |  |
| 1407 | jidicula__go-fuzz-action | https://github.com/jidicula/go-fuzz-action | ca499a56cc | 2026-07-20 |  | 0/0/0 | EMPTY_GT |  |
| 1408 | jimlambrt__gldap | https://github.com/jimlambrt/gldap | 8f791d94f5 | 2024-08-29 | 1.21.13 | 49/16/16 | OK |  |
| 1409 | jimrobinson__kvbench | https://github.com/jimrobinson/kvbench | 03e31ef0f5 | 2019-09-28 |  | 0/0/0 | EMPTY_GT |  |
| 1410 | jinzhu__now | https://github.com/jinzhu/now | 23677734df | 2025-06-08 | 1.12 | 0/0/0 | EMPTY_GT |  |
| 1411 | jirenius__go-res | https://github.com/jirenius/go-res | cb6d0567f6 | 2026-03-06 | 1.18 | 61/20/20 | OK |  |
| 1412 | jkaninda__goma-gateway | https://github.com/jkaninda/goma-gateway | 2e7d80be9b | 2026-07-19 | 1.26.2 | 309/63/66 | OK |  |
| 1413 | jlaffaye__ftp | https://github.com/jlaffaye/ftp | a226bf78ff | 2026-07-20 | 1.20 | 0/0/0 | EMPTY_GT |  |
| 1414 | jltorresm__otpgo | https://github.com/jltorresm/otpgo | 07ddbab2c1 | 2021-02-27 | 1.14 | 2/1/1 | OK |  |
| 1415 | jmattheis__goverter | https://github.com/jmattheis/goverter | 8ee671150d | 2026-07-19 | 1.23.0 | 23/4/8 | OK |  |
| 1416 | jmcvetta__neoism | https://github.com/jmcvetta/neoism | fe83b5b656 | 2020-02-16 |  | 0/0/0 | EMPTY_GT |  |
| 1417 | jmhodges__levigo | https://github.com/jmhodges/levigo | ed89ec741d | 2019-12-14 | 1.13 | 1/0/0 | EMPTY_GT |  |
| 1418 | jmoiron__sqlx | https://github.com/jmoiron/sqlx | 41dac167fd | 2024-05-30 | 1.10 | 0/0/0 | EMPTY_GT |  |
| 1419 | jmorganca__ollama | https://github.com/jmorganca/ollama | e2c2edcc27 | 2026-07-20 | 1.26.0 | 177/71/75 | OK |  |
| 1420 | joakimcarlsson__ai | https://github.com/joakimcarlsson/ai | 5e11c71269 | 2026-07-15 |  | 0/0/0 | EMPTY_GT |  |
| 1421 | joakimcarlsson__bonk | https://github.com/joakimcarlsson/bonk | 2cabe8aa13 | 2026-07-12 | 1.26.0 | 24/12/12 | OK |  |
| 1422 | joeig__go-powerdns | https://github.com/joeig/go-powerdns | f38f41d06a | 2026-06-05 | 1.22.7 | 0/0/0 | EMPTY_GT |  |
| 1423 | joerdav__xc | https://github.com/joerdav/xc | 5dc73db31b | 2026-07-17 | 1.25 | 49/25/25 | OK |  |
| 1424 | joetifa2003__mm-go | https://github.com/joetifa2003/mm-go | 5b551998c1 | 2024-12-27 | 1.23 | 8/1/5 | OK |  |
| 1425 | johnfercher__maroto | https://github.com/johnfercher/maroto | aa2645f5ec | 2026-04-06 | 1.26.1 | 32/21/21 | OK |  |
| 1426 | joho__godotenv | https://github.com/joho/godotenv | 97a2850142 | 2026-05-25 | 1.13 | 1/0/0 | EMPTY_GT |  |
| 1427 | jokruger__dec128 | https://github.com/jokruger/dec128 | 88e31ef8cf | 2026-03-10 | 1.24 | 1/0/0 | EMPTY_GT |  |
| 1428 | jolestar__go-commons-pool | https://github.com/jolestar/go-commons-pool | ba63d65ee6 | 2023-05-06 | 1.13 | 0/0/0 | EMPTY_GT |  |
| 1429 | jon-codes__getopt | https://github.com/jon-codes/getopt | 9d3469574c | 2026-02-18 | 1.23.1 | 0/0/0 | EMPTY_GT |  |
| 1430 | jonathanslenders__python-prompt-toolkit | https://github.com/jonathanslenders/python-prompt-toolkit | 236bfb7c15 | 2026-05-14 |  | 0/0/0 | EMPTY_GT |  |
| 1431 | jonbaldie__go-mutesting | https://github.com/jonbaldie/go-mutesting | a529f0f035 | 2026-07-13 | 1.26.3 | 35/21/21 | OK |  |
| 1432 | jonboulle__clockwork | https://github.com/jonboulle/clockwork | 6d8d032a18 | 2024-11-29 | 1.21 | 0/0/0 | EMPTY_GT |  |
| 1433 | jonchun__pathtype | https://github.com/jonchun/pathtype | 7f32b73f17 | 2021-08-12 | 1.16 | 0/0/0 | EMPTY_GT |  |
| 1434 | jonoton__scout | https://github.com/jonoton/scout | 3d5e53a741 | 2026-06-30 | 1.26.1 | 89/56/56 | OK |  |
| 1435 | jonreiter__govader | https://github.com/jonreiter/govader | f6505c8d03 | 2025-04-29 | 1.14 | 12/1/1 | OK |  |
| 1436 | joomcode__errorx | https://github.com/joomcode/errorx | 3280086cb5 | 2024-11-08 | 1.11 | 0/0/0 | EMPTY_GT |  |
| 1437 | jordan-wright__email | https://github.com/jordan-wright/email | 943e75fe52 | 2021-01-08 |  | 0/0/0 | EMPTY_GT |  |
| 1438 | jorelosorio__spellingcorrector | https://github.com/jorelosorio/spellingcorrector | eadde8636a | 2022-03-23 | 1.17 | 1/0/0 | EMPTY_GT |  |
| 1439 | jorelosorio__web-mercator-projection | https://github.com/jorelosorio/web-mercator-projection | 99e158023f | 2022-03-24 | 1.17 | 0/0/0 | EMPTY_GT |  |
| 1440 | josa42__coc-go | https://github.com/josa42/coc-go | 20c30ffd61 | 2024-10-22 |  | 0/0/0 | EMPTY_GT |  |
| 1441 | joshmedeski__sesh | https://github.com/joshmedeski/sesh | bf5adc733e | 2026-07-17 | 1.25.0 | 53/36/36 | OK |  |
| 1442 | jovandeginste__payme | https://github.com/jovandeginste/payme | 2cde037050 | 2026-01-01 | 1.25 | 39/19/23 | OK |  |
| 1443 | jroimartin__gocui | https://github.com/jroimartin/gocui | 0e75b37a4c | 2025-05-01 | 1.16 | 3/2/2 | OK |  |
| 1444 | jschoedt__go-firestorm | https://github.com/jschoedt/go-firestorm | e89522d7ce | 2021-12-14 |  | 33/15/16 | OK |  |
| 1445 | jsgilmore__gostorm | https://github.com/jsgilmore/gostorm | 2ce8e60043 | 2017-10-09 |  | 0/0/0 | EMPTY_GT |  |
| 1446 | json-iterator__go | https://github.com/json-iterator/go | 71ac16282d | 2022-09-16 | 1.12 | 10/2/7 | OK |  |
| 1447 | jszwec__csvutil | https://github.com/jszwec/csvutil | b9b8496590 | 2025-03-15 | 1.18 | 1/0/0 | EMPTY_GT |  |
| 1448 | jszwedko__go-circleci | https://github.com/jszwedko/go-circleci | d8811681b6 | 2024-01-27 | 1.21.6 | 1/0/0 | EMPTY_GT |  |
| 1449 | juicedata__juicefs | https://github.com/juicedata/juicefs | 605ff4c5dd | 2026-07-20 | 1.25.0 | 714/305/317 | OK |  |
| 1450 | julienschmidt__go-http-routing-benchmark | https://github.com/julienschmidt/go-http-routing-benchmark | d8f3b85899 | 2020-07-26 | 1.13 | 135/82/82 | OK |  |
| 1451 | julienschmidt__httprouter | https://github.com/julienschmidt/httprouter | 4840180164 | 2024-01-30 | 1.7 | 0/0/0 | EMPTY_GT |  |
| 1452 | junegunn__fzf | https://github.com/junegunn/fzf | 235a726fae | 2026-07-20 | 1.23.0 | 19/6/6 | OK |  |
| 1453 | junevm__cdns | https://github.com/junevm/cdns | 237fd65cbf | 2026-05-31 | 1.26 | 66/40/45 | OK |  |
| 1454 | junioryono__godi | https://github.com/junioryono/godi | dfe4756785 | 2026-07-18 | 1.26.0 | 7/0/4 | EMPTY_GT |  |
| 1455 | junk1tm__env | https://github.com/junk1tm/env | b3e58183a8 | 2024-05-03 | 1.20 | 0/0/0 | EMPTY_GT |  |
| 1456 | justinas__alice | https://github.com/justinas/alice | 56ac5b678a | 2024-04-06 | 1.12 | 0/0/0 | EMPTY_GT |  |
| 1457 | justinas__nosurf | https://github.com/justinas/nosurf | ec9bb776d8 | 2025-05-13 | 1.12 | 1/0/0 | EMPTY_GT |  |
| 1458 | jutkko__copy-pasta | https://github.com/jutkko/copy-pasta | a916a98f58 | 2020-06-20 | 1.13 | 30/10/18 | OK |  |
| 1459 | jvcoutinho__lit | https://github.com/jvcoutinho/lit | 1b71356b22 | 2024-02-26 | 1.21 | 13/3/7 | OK |  |
| 1460 | jxskiss__mcli | https://github.com/jxskiss/mcli | 8943960560 | 2026-01-28 | 1.18 | 8/1/5 | OK |  |
| 1461 | jyotiska__go-webcolors | https://github.com/jyotiska/go-webcolors | d3232ed694 | 2015-08-21 |  | 0/0/0 | EMPTY_GT |  |
| 1462 | k-capehart__go-salesforce | https://github.com/k-capehart/go-salesforce | d78427b1c2 | 2026-07-13 | 1.25.0 | 34/6/6 | OK |  |
| 1463 | k0kubun__pp | https://github.com/k0kubun/pp | 893195cf61 | 2026-07-15 | 1.25.0 | 8/4/4 | OK |  |
| 1464 | k0sproject__k0s | https://github.com/k0sproject/k0s | 07d9367904 | 2026-07-20 | 1.26.3 | 609/267/274 | OK |  |
| 1465 | k3d-io__k3d | https://github.com/k3d-io/k3d | 46f3480daa | 2026-06-12 | 1.26.3 | 0/0/0 | EMPTY_GT |  |
| 1466 | k3s-io__k3s | https://github.com/k3s-io/k3s | 654c6e3031 | 2026-07-20 | 1.26.2 | 1113/419/419 | OK |  |
| 1467 | k8gb-io__k8gb | https://github.com/k8gb-io/k8gb | a74a5c97d0 | 2026-07-17 | 1.26.5 | 314/99/100 | OK |  |
| 1468 | kahoon__pending | https://github.com/kahoon/pending | 069e7238cd | 2026-04-19 | 1.25.0 | 0/0/0 | EMPTY_GT |  |
| 1469 | kak-tus__ami | https://github.com/kak-tus/ami | e33dc9b211 | 2020-04-03 | 1.13 | 34/3/10 | OK |  |
| 1470 | kak-tus__nan | https://github.com/kak-tus/nan | 3a108dd710 | 2023-07-06 | 1.16 | 22/9/13 | OK |  |
| 1471 | kamildrazkiewicz__go-flow | https://github.com/kamildrazkiewicz/go-flow | 2a1d885f8c | 2017-09-19 |  | 0/0/0 | EMPTY_GT |  |
| 1472 | kamilsk__breaker | https://github.com/kamilsk/breaker | 616ede0d05 | 2021-05-11 | 1.11 | 0/0/0 | EMPTY_GT |  |
| 1473 | kamilsk__retry | https://github.com/kamilsk/retry | 0f199afc6b | 2021-02-23 | 1.11 | 1/0/0 | EMPTY_GT |  |
| 1474 | kamilsk__semaphore | https://github.com/kamilsk/semaphore | 91c10c6c3c | 2020-04-16 | 1.11 | 5/0/3 | EMPTY_GT |  |
| 1475 | kamilsk__tracer | https://github.com/kamilsk/tracer | 6a33365c0a | 2020-06-05 | 1.11 | 0/0/0 | EMPTY_GT |  |
| 1476 | kamva__mgm | https://github.com/kamva/mgm | aff6e8d7b4 | 2023-09-12 | 1.17 | 27/16/17 | OK |  |
| 1477 | karl-cardenas-coding__go-lambda-cleanup | https://github.com/karl-cardenas-coding/go-lambda-cleanup | 2404f78bad | 2026-06-19 | 1.26.1 | 112/24/67 | OK |  |
| 1478 | karlseguin__the-little-go-book | https://github.com/karlseguin/the-little-go-book | 2b487a22a5 | 2026-06-14 |  | 0/0/0 | EMPTY_GT |  |
| 1479 | kazhuravlev__database-gateway | https://github.com/kazhuravlev/database-gateway | db9d248e8d | 2026-07-03 | 1.26.1 | 236/83/83 | OK |  |
| 1480 | kazhuravlev__git-tools | https://github.com/kazhuravlev/git-tools | 7b955b352b | 2026-04-11 | 1.26.0 | 55/24/24 | OK |  |
| 1481 | kazhuravlev__healthcheck | https://github.com/kazhuravlev/healthcheck | 72eb7aeeaf | 2026-04-12 | 1.24.0 | 44/10/15 | OK |  |
| 1482 | kazhuravlev__just | https://github.com/kazhuravlev/just | 0af05cd693 | 2026-02-15 | 1.24 | 13/2/6 | OK |  |
| 1483 | kazhuravlev__optional | https://github.com/kazhuravlev/optional | b1af8e2dbe | 2026-02-15 | 1.21 | 7/1/4 | OK |  |
| 1484 | kazhuravlev__options-gen | https://github.com/kazhuravlev/options-gen | dce2fffd14 | 2026-06-28 | 1.24.0 | 24/11/15 | OK |  |
| 1485 | kazu__loncha | https://github.com/kazu/loncha | ecd95e681a | 2022-07-03 | 1.18 | 321/7/11 | OK |  |
| 1486 | kcmvp__gob | https://github.com/kcmvp/gob | 29e4ae2223 | 2025-02-18 | 1.22.2 | 40/19/19 | OK |  |
| 1487 | kdomanski__iso9660 | https://github.com/kdomanski/iso9660 | 08dd38cef6 | 2023-12-21 | 1.19 | 7/0/4 | EMPTY_GT |  |
| 1488 | keilerkonzept__topk | https://github.com/keilerkonzept/topk | ad255afb4b | 2025-05-01 | 1.23 | 4/1/3 | OK |  |
| 1489 | kelindar__bitmap | https://github.com/kelindar/bitmap | bfabcc8285 | 2026-03-07 | 1.24.0 | 10/2/6 | OK |  |
| 1490 | kelindar__column | https://github.com/kelindar/column | b35d478cda | 2025-06-28 | 1.19 | 22/13/17 | OK |  |
| 1491 | kelindar__tile | https://github.com/kelindar/tile | c3a5eaf85e | 2025-08-18 | 1.25 | 9/2/6 | OK |  |
| 1492 | kelseyhightower__confd | https://github.com/kelseyhightower/confd | 919444eb6c | 2023-12-08 | 1.19 | 262/51/51 | OK |  |
| 1493 | kelseyhightower__envconfig | https://github.com/kelseyhightower/envconfig | 7834011875 | 2025-06-27 | 1.20 | 0/0/0 | EMPTY_GT |  |
| 1494 | keploy__keploy | https://github.com/keploy/keploy | 18df45c11c | 2026-07-17 | 1.26.0 | 638/171/171 | OK |  |
| 1495 | kevinburke__nacl | https://github.com/kevinburke/nacl | abc3ed9d36 | 2026-05-04 | 1.25.0 | 8/1/3 | OK |  |
| 1496 | kevincobain2000__gobrew | https://github.com/kevincobain2000/gobrew | b159aee4de | 2026-06-15 | 1.26.0 | 29/15/19 | OK |  |
| 1497 | keygx__Go-gopher-Vector | https://github.com/keygx/Go-gopher-Vector | fe01b92048 | 2018-03-04 |  | 0/0/0 | EMPTY_GT |  |
| 1498 | khaiql__dbcleaner | https://github.com/khaiql/dbcleaner | 99dc00d010 | 2021-11-10 |  | 0/0/0 | EMPTY_GT |  |
| 1499 | khezen__avro | https://github.com/khezen/avro | 2053f2298a | 2024-07-15 | 1.14 | 5/3/4 | OK |  |
| 1500 | khezen__evoli | https://github.com/khezen/evoli | 7b3f7f9277 | 2021-10-27 | 1.14 | 0/0/0 | EMPTY_GT |  |
| 1501 | khezen__rootfinding | https://github.com/khezen/rootfinding | da54a28a86 | 2020-03-22 | 1.14 | 1/0/0 | EMPTY_GT |  |
| 1502 | kilgaloon__leprechaun | https://github.com/kilgaloon/leprechaun | 7f46b55f1f | 2022-07-12 | 1.13 | 38/18/21 | OK |  |
| 1503 | kinbiko__jsonassert | https://github.com/kinbiko/jsonassert |  |  |  | 0/0/0 | EMPTY_GT |  |
| 1504 | kirillDanshin__avgRating | https://github.com/kirillDanshin/avgRating | 3b8cc7bb8f | 2017-08-05 |  | 0/0/0 | EMPTY_GT |  |
| 1505 | kirillDanshin__dlog | https://github.com/kirillDanshin/dlog | 97d876b12b | 2017-07-28 |  | 0/0/0 | EMPTY_GT |  |
| 1506 | kirillDanshin__llb | https://github.com/kirillDanshin/llb | 0d26b5cf4b | 2016-04-04 |  | 0/0/0 | EMPTY_GT |  |
| 1507 | kisielk__errcheck | https://github.com/kisielk/errcheck | 6e4cd893c1 | 2026-05-12 | 1.25.0 | 9/3/3 | OK |  |
| 1508 | kitabisa__teler-waf | https://github.com/kitabisa/teler-waf | cf8eee0997 | 2025-02-21 | 1.22 | 609/164/167 | OK |  |
| 1509 | kjkrol__goke | https://github.com/kjkrol/goke | 55aca30456 | 2026-06-25 | 1.26.4 | 8/1/5 | OK |  |
| 1510 | kkyr__fig | https://github.com/kkyr/fig | 650a93045a | 2025-06-03 | 1.21 | 9/3/3 | OK |  |
| 1511 | kkyr__go-recipe | https://github.com/kkyr/go-recipe | f89e0c28b8 | 2023-03-16 | 1.20 | 19/8/8 | OK |  |
| 1512 | knadh__koanf | https://github.com/knadh/koanf | 31dd449122 | 2026-07-08 | 1.23.0 | 222/4/4 | OK |  |
| 1513 | knbr13__gitcs | https://github.com/knbr13/gitcs | c41bdc46a7 | 2026-04-18 | 1.25.5 | 58/27/27 | OK |  |
| 1514 | knights-analytics__hugot | https://github.com/knights-analytics/hugot | c30aa0f09a | 2026-06-05 | 1.26 | 94/24/24 | OK |  |
| 1515 | kniren__gota | https://github.com/kniren/gota | f705409528 | 2021-10-10 | 1.16 | 38/2/2 | OK |  |
| 1516 | knocknote__octillery | https://github.com/knocknote/octillery | 0299444426 | 2021-01-04 | 1.12 | 28/15/15 | OK |  |
| 1517 | knq__chromedp | https://github.com/knq/chromedp | 7963c203ed | 2026-07-15 | 1.26 | 10/6/8 | OK |  |
| 1518 | knq__usql | https://github.com/knq/usql | f7d0fbe808 | 2026-04-01 | 1.26.1 | 730/303/333 | OK |  |
| 1519 | knq__xo | https://github.com/knq/xo | a164ace287 | 2026-03-30 | 1.26 | 80/33/33 | OK |  |
| 1520 | koffeinsource__go-imgur | https://github.com/koffeinsource/go-imgur | 430c11fbfc | 2024-07-03 | 1.14 | 15/4/8 | OK |  |
| 1521 | kolesa-team__go-webp | https://github.com/kolesa-team/go-webp | bf7924d9a4 | 2026-01-24 | 1.10 | 7/0/4 | EMPTY_GT |  |
| 1522 | koltyakov__gosip | https://github.com/koltyakov/gosip | 7389cdb9c5 | 2026-01-05 | 1.19 | 34/17/17 | OK |  |
| 1523 | koofr__graval | https://github.com/koofr/graval | aba28f8a73 | 2020-10-02 | 1.13 | 26/5/16 | OK |  |
| 1524 | kool-dev__kool | https://github.com/kool-dev/kool | f2d9701be3 | 2026-04-22 | 1.25.0 | 92/35/37 | OK |  |
| 1525 | korandiz__v4l | https://github.com/korandiz/v4l | d2cdfa06a2 | 2021-12-29 | 1.15 | 0/0/0 | EMPTY_GT |  |
| 1526 | koss-null__FuncFrog | https://github.com/koss-null/FuncFrog | 5b2c25b626 | 2025-10-25 | 1.18 | 19/1/5 | OK |  |
| 1527 | koss-null__list | https://github.com/koss-null/list | 35f1f6a551 | 2025-10-25 | 1.23 | 1/0/0 | EMPTY_GT |  |
| 1528 | koyachi__go-nude | https://github.com/koyachi/go-nude | 699a88f336 | 2015-04-10 |  | 0/0/0 | EMPTY_GT |  |
| 1529 | kpango__glg | https://github.com/kpango/glg | d303ca943b | 2024-09-18 | 1.21.1 | 15/2/6 | OK |  |
| 1530 | kpfaulkner__borders | https://github.com/kpfaulkner/borders | 1b62cb2655 | 2026-05-23 | 1.24.0 | 3/1/1 | OK |  |
| 1531 | krayzpipes__cronticker | https://github.com/krayzpipes/cronticker | 6674fa04a7 | 2021-01-01 | 1.15 | 2/1/1 | OK |  |
| 1532 | krotik__dudeldu | https://github.com/krotik/dudeldu | 154b491ed4 | 2019-09-22 | 1.12 | 2/1/1 | OK |  |
| 1533 | krotik__ecal | https://github.com/krotik/ecal | 1a5bf4c77f | 2021-05-23 | 1.12 | 2/1/1 | OK |  |
| 1534 | krotik__eliasdb | https://github.com/krotik/eliasdb | 88a1da66df | 2022-08-14 | 1.12 | 4/3/3 | OK |  |
| 1535 | kslamph__tronlib | https://github.com/kslamph/tronlib | a41013fe2d | 2026-04-05 | 1.25.0 | 202/17/21 | OK |  |
| 1536 | ktr0731__evans | https://github.com/ktr0731/evans | 5efe5f55fb | 2023-12-02 | 1.20 | 561/55/65 | OK |  |
| 1537 | kubenetworks__kubevpn | https://github.com/kubenetworks/kubevpn | 91b3888d6f | 2026-07-21 | 1.26.3 | 779/244/244 | OK |  |
| 1538 | kubernetes-sigs__kind | https://github.com/kubernetes-sigs/kind | 3a8597e98e | 2026-07-20 | 1.17 | 24/11/11 | OK |  |
| 1539 | kubernetes__kubernetes | https://github.com/kubernetes/kubernetes | 54581ce5b0 | 2026-07-21 | 1.26.0 | 0/195/195 | OK |  |
| 1540 | kubernetes__minikube | https://github.com/kubernetes/minikube | 09462d622e | 2026-07-20 | 1.26.0 | 529/219/222 | OK |  |
| 1541 | kubeservice-stack__common | https://github.com/kubeservice-stack/common | 5b04095af4 | 2026-07-20 | 1.26.0 | 533/117/152 | OK |  |
| 1542 | kubeshark__kubeshark | https://github.com/kubeshark/kubeshark | f3b2b205f1 | 2026-07-14 | 1.24.0 | 351/129/129 | OK |  |
| 1543 | kubevela__kubevela | https://github.com/kubevela/kubevela | a1860544f0 | 2026-07-17 | 1.23.8 | 829/284/289 | OK |  |
| 1544 | kyleconroy__sqlc | https://github.com/kyleconroy/sqlc | e209d86584 | 2026-07-15 | 1.26.0 | 90/37/40 | OK |  |
| 1545 | kyoh86__richgo | https://github.com/kyoh86/richgo | 3b71ea1fb9 | 2026-07-18 | 1.17 | 14/7/11 | OK |  |
| 1546 | kyuff__anchor | https://github.com/kyuff/anchor | d0bb140881 | 2026-04-18 | 1.25.0 | 11/1/1 | OK |  |
| 1547 | kzahedi__goent | https://github.com/kzahedi/goent | 49773660fa | 2019-04-03 |  | 0/0/0 | EMPTY_GT |  |
| 1548 | lab210-dev__async-job | https://github.com/lab210-dev/async-job | 142966bca2 | 2022-05-30 |  | 0/0/0 | EMPTY_GT |  |
| 1549 | labstack__echo | https://github.com/labstack/echo | 5a43c9b6d0 | 2026-07-16 | 1.25.0 | 16/1/7 | OK |  |
| 1550 | labstack__gommon | https://github.com/labstack/gommon | 2659cdaeb9 | 2026-04-19 | 1.23.0 | 12/5/9 | OK |  |
| 1551 | lacion__cookiecutter-golang | https://github.com/lacion/cookiecutter-golang | d8e034b722 | 2023-10-07 |  | 0/0/0 | EMPTY_GT |  |
| 1552 | lajosbencz__glo | https://github.com/lajosbencz/glo | 9488513614 | 2019-01-23 |  | 0/0/0 | EMPTY_GT |  |
| 1553 | lalamove__konfig | https://github.com/lalamove/konfig | 5b61527a91 | 2020-05-13 | 1.14 | 246/51/65 | OK |  |
| 1554 | lampctl__go-sse | https://github.com/lampctl/go-sse | ed577125a5 | 2025-04-18 | 1.18 | 0/0/0 | EMPTY_GT |  |
| 1555 | lana__go-commandbus | https://github.com/lana/go-commandbus | ba06cc9b43 | 2020-04-21 | 1.13 | 25/4/4 | OK |  |
| 1556 | lane-c-wagner__go-password-validator | https://github.com/lane-c-wagner/go-password-validator | 7bffd5ea9d | 2022-08-30 | 1.16 | 0/0/0 | EMPTY_GT |  |
| 1557 | larapulse__migrator | https://github.com/larapulse/migrator | cfcb45ce8b | 2025-04-24 | 1.13 | 8/0/5 | EMPTY_GT |  |
| 1558 | lawzava__go-pg-migrate | https://github.com/lawzava/go-pg-migrate | ecac52d968 | 2023-10-09 | 1.21 | 33/5/12 | OK |  |
| 1559 | lazynop__lazyenv | https://github.com/lazynop/lazyenv | e1ad3ff6e2 | 2026-06-13 | 1.26.0 | 41/21/25 | OK |  |
| 1560 | leaanthony__clir | https://github.com/leaanthony/clir | a8d9462bce | 2024-06-11 | 1.12 | 1/0/0 | EMPTY_GT |  |
| 1561 | leaanthony__debme | https://github.com/leaanthony/debme | ccc0401f87 | 2021-06-06 | 1.16 | 0/0/0 | EMPTY_GT |  |
| 1562 | leaanthony__slicer | https://github.com/leaanthony/slicer | 33c619aa00 | 2021-08-08 | 1.13 | 0/0/0 | EMPTY_GT |  |
| 1563 | leandro-lugaresi__hub | https://github.com/leandro-lugaresi/hub | f875ca5364 | 2026-07-16 | 1.13 | 0/0/0 | EMPTY_GT |  |
| 1564 | leberKleber__go-mpris | https://github.com/leberKleber/go-mpris | 7bd44c8dd1 | 2024-10-27 | 1.21 | 8/1/5 | OK |  |
| 1565 | leebenson__conform | https://github.com/leebenson/conform | e227ef3922 | 2023-12-23 | 1.13 | 17/1/7 | OK |  |
| 1566 | leekchan__accounting | https://github.com/leekchan/accounting | 2e09117338 | 2022-01-06 | 1.13 | 5/3/3 | OK |  |
| 1567 | leekchan__timeutil | https://github.com/leekchan/timeutil | 28917288c4 | 2015-08-02 |  | 0/0/0 | EMPTY_GT |  |
| 1568 | leodido__structcli | https://github.com/leodido/structcli | d42e3b3603 | 2026-07-06 | 1.24.0 | 75/19/35 | OK |  |
| 1569 | leodip__goiabada | https://github.com/leodip/goiabada | 96c0bb9117 | 2026-07-14 |  | 0/0/0 | EMPTY_GT |  |
| 1570 | leonelquinteros__gotext | https://github.com/leonelquinteros/gotext | 2a3f89acc7 | 2026-06-01 | 1.25 | 9/3/3 | OK |  |
| 1571 | leozz37__hare | https://github.com/leozz37/hare | a3d3dc7781 | 2022-08-07 | 1.15 | 5/4/4 | OK |  |
| 1572 | leporo__sqlf | https://github.com/leporo/sqlf | 18710aa85c | 2025-02-24 | 1.13 | 9/1/6 | OK |  |
| 1573 | lesismal__arpc | https://github.com/lesismal/arpc | 9d43164a6d | 2026-07-05 | 1.22 | 1/0/0 | EMPTY_GT |  |
| 1574 | lesismal__nbio | https://github.com/lesismal/nbio | 8ad01e6461 | 2026-07-15 | 1.16 | 8/3/3 | OK |  |
| 1575 | lestrrat-go__jwx | https://github.com/lestrrat-go/jwx | a07e5b6209 | 2026-07-17 | 1.26.0 | 21/8/8 | OK |  |
| 1576 | levigross__grequests | https://github.com/levigross/grequests | 05add15eea | 2025-06-06 | 1.21 | 15/2/6 | OK |  |
| 1577 | lf-edge__ekuiper | https://github.com/lf-edge/ekuiper | f536109b04 | 2026-07-17 | 1.25.4 | 924/151/155 | OK |  |
| 1578 | lib4u__fake-useragent | https://github.com/lib4u/fake-useragent | 1ea74507b2 | 2026-02-16 | 1.23.4 | 6/1/1 | OK |  |
| 1579 | lib4u__grequest | https://github.com/lib4u/grequest | 952c8bfc77 | 2025-01-31 | 1.23.4 | 0/0/0 | EMPTY_GT |  |
| 1580 | lib__pq | https://github.com/lib/pq | d70e69988c | 2026-07-11 | 1.23 | 1/0/0 | EMPTY_GT |  |
| 1581 | libgit2__git2go | https://github.com/libgit2/git2go | 4b14d29c20 | 2022-10-04 | 1.13 | 7/1/2 | OK |  |
| 1582 | liftbridge-io__liftbridge | https://github.com/liftbridge-io/liftbridge | af2a662695 | 2026-07-15 | 1.25.6 | 361/64/68 | OK |  |
| 1583 | lightningnetwork__lnd | https://github.com/lightningnetwork/lnd | 046356759a | 2026-07-17 | 1.25.11 | 530/127/127 | OK |  |
| 1584 | lim-yoona__tcpack | https://github.com/lim-yoona/tcpack | 7439f2addb | 2023-10-16 | 1.20 | 0/0/0 | EMPTY_GT |  |
| 1585 | limiu82214__gojmapr | https://github.com/limiu82214/gojmapr | 59f43a298b | 2023-06-21 | 1.19 | 12/1/8 | OK |  |
| 1586 | lindb__lindb | https://github.com/lindb/lindb | 612070e1dc | 2024-08-16 | 1.22 | 483/161/162 | OK |  |
| 1587 | lingrino__vaku | https://github.com/lingrino/vaku | 59b5cde9a4 | 2026-07-13 | 1.26.0 | 171/25/67 | OK |  |
| 1588 | linkedin__goavro | https://github.com/linkedin/goavro | c69e26ce46 | 2026-01-21 | 1.12 | 8/1/5 | OK |  |
| 1589 | linvon__cuckoo-filter | https://github.com/linvon/cuckoo-filter | 92f5275991 | 2021-10-10 | 1.14 | 2/1/1 | OK |  |
| 1590 | linxGnu__goseaweedfs | https://github.com/linxGnu/goseaweedfs | dc717016bd | 2022-11-11 |  | 7/0/4 | EMPTY_GT |  |
| 1591 | linxGnu__mssqlx | https://github.com/linxGnu/mssqlx | add4490634 | 2024-03-12 | 1.17 | 14/6/10 | OK |  |
| 1592 | liudng__dogo | https://github.com/liudng/dogo | 7887b849de | 2016-11-02 |  | 0/0/0 | EMPTY_GT |  |
| 1593 | liujianping__job | https://github.com/liujianping/job | 7050ac0d3c | 2020-06-30 | 1.14 | 116/25/25 | OK |  |
| 1594 | liweiyi88__onedump | https://github.com/liweiyi88/onedump | 7d4e2bd7d3 | 2026-07-11 | 1.25.2 | 149/73/79 | OK |  |
| 1595 | liyue201__gostl | https://github.com/liyue201/gostl | 0c36bfb68a | 2025-01-03 | 1.18 | 0/0/0 | EMPTY_GT |  |
| 1596 | llir__llvm | https://github.com/llir/llvm | f0912dd3be | 2024-12-06 | 1.13 | 19/5/6 | OK |  |
| 1597 | lmittmann__tint | https://github.com/lmittmann/tint | 42bfdacc64 | 2026-07-12 | 1.21 | 1/0/0 | EMPTY_GT |  |
| 1598 | lni__dragonboat | https://github.com/lni/dragonboat | 076c7f6497 | 2025-07-24 | 1.23.0 | 222/36/40 | OK |  |
| 1599 | logpacker__PayPal-Go-SDK | https://github.com/logpacker/PayPal-Go-SDK | 55d332e02f | 2025-10-05 | 1.25.1 | 435/3/3 | OK |  |
| 1600 | logrange__linker | https://github.com/logrange/linker | 5a47cc9a56 | 2025-01-08 | 1.13 | 1/0/0 | EMPTY_GT |  |
| 1601 | logrusorgru__aurora | https://github.com/logrusorgru/aurora | 24c528a74b | 2025-01-07 | 1.19 | 7/0/4 | EMPTY_GT |  |
| 1602 | lonng__nano | https://github.com/lonng/nano | dbf22c701d | 2026-02-26 | 1.12 | 69/14/20 | OK |  |
| 1603 | loom-go__loom | https://github.com/loom-go/loom | 6343b2dad0 | 2026-03-28 | 1.25.5 | 9/2/6 | OK |  |
| 1604 | loov__lensm | https://github.com/loov/lensm | 7c6d405f3a | 2026-07-06 | 1.26 | 40/13/13 | OK |  |
| 1605 | lopezator__migrator | https://github.com/lopezator/migrator | 09f72601e8 | 2023-10-30 | 1.18 | 66/0/0 | EMPTY_GT |  |
| 1606 | loveleshsharma__gohive | https://github.com/loveleshsharma/gohive | f98e85308c | 2023-11-19 | 1.21.3 | 0/0/0 | EMPTY_GT |  |
| 1607 | lqs__sqlingo | https://github.com/lqs/sqlingo | 99a6d5b37a | 2026-04-01 |  | 0/0/0 | EMPTY_GT |  |
| 1608 | lrita__cmap | https://github.com/lrita/cmap | 73727988b5 | 2026-04-16 | 1.19 | 0/0/0 | EMPTY_GT |  |
| 1609 | lrita__numa | https://github.com/lrita/numa | 29f8890596 | 2024-10-31 | 1.12 | 6/1/4 | OK |  |
| 1610 | lucas-clemente__quic-go | https://github.com/lucas-clemente/quic-go | 4e52cbd14e | 2026-07-20 | 1.25.0 | 29/7/12 | OK |  |
| 1611 | lucasepe__tbd | https://github.com/lucasepe/tbd | 6b34a435d2 | 2021-08-29 | 1.16 | 50/21/26 | OK |  |
| 1612 | lucasgomide__snitch | https://github.com/lucasgomide/snitch | 3e266163bd | 2018-07-23 |  | 0/0/0 | EMPTY_GT |  |
| 1613 | lucassscaravelli__ej | https://github.com/lucassscaravelli/ej | ef66601323 | 2020-04-06 | 1.12 | 12/0/5 | EMPTY_GT |  |
| 1614 | lucmq__go-shelve | https://github.com/lucmq/go-shelve | 3a4208d81d | 2025-08-10 | 1.22.0 | 1/0/0 | EMPTY_GT |  |
| 1615 | lukasz-madon__awesome-remote-job | https://github.com/lukasz-madon/awesome-remote-job | e23424e403 | 2026-05-09 |  | 0/0/0 | EMPTY_GT |  |
| 1616 | luno__workflow | https://github.com/luno/workflow | 2f70c64c32 | 2026-07-19 | 1.26.0 | 43/15/16 | OK |  |
| 1617 | luraproject__lura | https://github.com/luraproject/lura | fa34acf92c | 2026-07-10 | 1.25.0 | 62/26/26 | OK |  |
| 1618 | lvyahui8__goenum | https://github.com/lvyahui8/goenum | 5667ddf7c8 | 2024-09-22 | 1.18 | 7/0/4 | EMPTY_GT |  |
| 1619 | lxn__walk | https://github.com/lxn/walk | c389da54e7 | 2021-01-12 |  | 0/0/0 | EMPTY_GT |  |
| 1620 | lxzan__gws | https://github.com/lxzan/gws | 0af2f74278 | 2026-07-10 | 1.20 | 8/1/5 | OK |  |
| 1621 | lycheeverse__lychee | https://github.com/lycheeverse/lychee | af73b4e027 | 2026-07-09 |  | 0/0/0 | EMPTY_GT |  |
| 1622 | lynxbase__lynxdb | https://github.com/lynxbase/lynxdb | 3689c87829 | 2026-06-26 | 1.26.0 | 233/90/91 | OK |  |
| 1623 | lyonnee__hmap | https://github.com/lyonnee/hmap | 256bc1cbfa | 2025-01-23 |  | 0/0/0 | EMPTY_GT |  |
| 1624 | lyonnee__hvalid | https://github.com/lyonnee/hvalid | 34f94fc3cc | 2025-06-05 | 1.20 | 0/0/0 | EMPTY_GT |  |
| 1625 | m-zajac__json2go | https://github.com/m-zajac/json2go | e70dc0304a | 2026-03-01 | 1.24 | 10/3/7 | OK |  |
| 1626 | m1__go-generate-password | https://github.com/m1/go-generate-password | 7318bf6597 | 2022-04-17 | 1.18 | 13/2/6 | OK |  |
| 1627 | maargenton__go-testpredicate | https://github.com/maargenton/go-testpredicate | d4d7ad7aa1 | 2026-02-22 | 1.23.0 | 9/3/3 | OK |  |
| 1628 | maddevsio__fcm | https://github.com/maddevsio/fcm | 4bd97f86ac | 2020-03-06 |  | 0/0/0 | EMPTY_GT |  |
| 1629 | madflojo__tasks | https://github.com/madflojo/tasks | b235c1ba9b | 2026-06-13 | 1.18 | 2/1/1 | OK |  |
| 1630 | madflojo__testcerts | https://github.com/madflojo/testcerts | 208b98f752 | 2026-06-07 | 1.20 | 1/0/0 | EMPTY_GT |  |
| 1631 | mafredri__cdp | https://github.com/mafredri/cdp | 715c982e8f | 2025-12-08 | 1.23.0 | 14/5/8 | OK |  |
| 1632 | mafulong__godal | https://github.com/mafulong/godal | d3896c9dbd | 2021-10-23 | 1.16 | 181/10/14 | OK |  |
| 1633 | magefile__mage | https://github.com/magefile/mage | 0953947c16 | 2026-04-22 | 1.18 | 0/0/0 | EMPTY_GT |  |
| 1634 | magic003__alice | https://github.com/magic003/alice | 2087f83811 | 2017-04-25 |  | 0/0/0 | EMPTY_GT |  |
| 1635 | maguro__pbf | https://github.com/maguro/pbf | f91edfbad7 | 2026-04-23 | 1.23 | 39/14/18 | OK |  |
| 1636 | mailchain__mailchain | https://github.com/mailchain/mailchain | 88570004f7 | 2022-04-01 |  | 0/0/0 | EMPTY_GT |  |
| 1637 | mailgun__mailgun-go | https://github.com/mailgun/mailgun-go | d7f2dd4369 | 2026-07-18 | 1.24.0 | 78/3/7 | OK |  |
| 1638 | mailhog__MailHog | https://github.com/mailhog/MailHog | e6fa06877e | 2022-08-02 |  | 0/0/0 | EMPTY_GT |  |
| 1639 | mailhog__smtp | https://github.com/mailhog/smtp | 0c4e9b7e06 | 2016-11-19 |  | 0/0/0 | EMPTY_GT |  |
| 1640 | mainak55512__stto | https://github.com/mainak55512/stto | 5f25cc6e21 | 2025-11-26 | 1.22.5 | 5/3/3 | OK |  |
| 1641 | maja42__goval | https://github.com/maja42/goval | 1613c838b2 | 2025-02-19 | 1.18 | 7/0/4 | EMPTY_GT |  |
| 1642 | malaschitz__randomForest | https://github.com/malaschitz/randomForest | 7c30b8b21d | 2025-11-01 | 1.13 | 245/2/2 | OK |  |
| 1643 | mamal72__golyrics | https://github.com/mamal72/golyrics | e037d2377b | 2018-06-30 |  | 0/0/0 | EMPTY_GT |  |
| 1644 | mantil-io__mantil | https://github.com/mantil-io/mantil | 89d864c4ca | 2022-11-07 | 1.16 | 238/85/90 | OK |  |
| 1645 | manuelbcd__go-openproject | https://github.com/manuelbcd/go-openproject | 4f574ff532 | 2022-11-22 | 1.19 | 16/5/5 | OK |  |
| 1646 | marekm4__color-extractor | https://github.com/marekm4/color-extractor | 66b5a2d809 | 2023-07-19 | 1.13 | 1/0/0 | EMPTY_GT |  |
| 1647 | mariocandela__beelzebub | https://github.com/mariocandela/beelzebub | b6c8f1866d | 2026-07-20 | 1.25.9 | 69/29/37 | OK |  |
| 1648 | mariomac__gostream | https://github.com/mariomac/gostream | b95be58eb7 | 2026-06-19 | 1.25.0 | 14/1/5 | OK |  |
| 1649 | markbates__goth | https://github.com/markbates/goth | 9c7a2826a6 | 2026-02-11 | 1.24.0 | 45/19/25 | OK |  |
| 1650 | markfarnan__go-canvas | https://github.com/markfarnan/go-canvas | 6971ccd007 | 2020-07-23 | 1.13 | 8/3/3 | OK |  |
| 1651 | markphelps__flipt | https://github.com/markphelps/flipt | 2ba7835319 | 2026-07-17 | 1.26.0 | 731/302/309 | OK |  |
| 1652 | marlow__marlow | https://github.com/marlow/marlow | 09f77bdfd9 | 2020-08-18 | 1.14 | 3/1/2 | OK |  |
| 1653 | marrow16__valix | https://github.com/marrow16/valix | 0d39089457 | 2025-04-03 | 1.19 | 17/4/8 | OK |  |
| 1654 | maruel__panicparse | https://github.com/maruel/panicparse | 4d9f9d5644 | 2026-07-13 | 1.23.0 | 6/4/5 | OK |  |
| 1655 | marusama__cyclicbarrier | https://github.com/marusama/cyclicbarrier | 1717099fdc | 2020-06-30 | 1.11 | 0/0/0 | EMPTY_GT |  |
| 1656 | marusama__semaphore | https://github.com/marusama/semaphore | 2d3c1eaa05 | 2021-03-28 | 1.11 | 0/0/0 | EMPTY_GT |  |
| 1657 | marwanhawari__stew | https://github.com/marwanhawari/stew | 8a9a3eab1f | 2025-05-06 | 1.22 | 56/25/25 | OK |  |
| 1658 | masterzen__winrm-cli | https://github.com/masterzen/winrm-cli | af1d5d0dfd | 2020-05-15 | 1.13 | 15/10/13 | OK |  |
| 1659 | masterzen__winrm | https://github.com/masterzen/winrm | 5570be7f80 | 2026-04-07 | 1.21 | 40/19/22 | OK |  |
| 1660 | matcornic__hermes | https://github.com/matcornic/hermes | db8901938b | 2025-04-04 | 1.24.2 | 44/24/28 | OK |  |
| 1661 | matm__go-nowpayments | https://github.com/matm/go-nowpayments | 56cf2fc582 | 2023-01-24 | 1.18 | 8/6/6 | OK |  |
| 1662 | matryer__gopherize.me | https://github.com/matryer/gopherize.me | 01e8a6e84a | 2021-08-23 | 1.16 | 101/20/20 | OK |  |
| 1663 | matryer__is | https://github.com/matryer/is | 0d9f7ec708 | 2023-05-03 | 1.14 | 1/0/0 | EMPTY_GT |  |
| 1664 | matryer__moq | https://github.com/matryer/moq | 1b3799f1e7 | 2026-03-20 | 1.26 | 10/3/4 | OK |  |
| 1665 | mattbaird__elastigo | https://github.com/mattbaird/elastigo | 2fe47fd29e | 2017-01-23 |  | 0/0/0 | EMPTY_GT |  |
| 1666 | mattcunningham__gumblr | https://github.com/mattcunningham/gumblr | e85a4712e6 | 2016-10-30 |  | 0/0/0 | EMPTY_GT |  |
| 1667 | mattn__anko | https://github.com/mattn/anko | 5c7bed551d | 2026-07-10 | 1.13 | 1/0/0 | EMPTY_GT |  |
| 1668 | mattn__go-adodb | https://github.com/mattn/go-adodb | e13b436f27 | 2026-07-10 | 1.14 | 6/2/2 | OK |  |
| 1669 | mattn__go-colorable | https://github.com/mattn/go-colorable | 8bf39a204f | 2026-05-29 | 1.18 | 3/2/2 | OK |  |
| 1670 | mattn__go-isatty | https://github.com/mattn/go-isatty | 4bc9b75fc8 | 2026-07-16 | 1.20 | 2/1/1 | OK |  |
| 1671 | mattn__go-oci8 | https://github.com/mattn/go-oci8 | e2cb162a93 | 2026-07-08 | 1.13 | 1/0/0 | EMPTY_GT |  |
| 1672 | mattn__go-runewidth | https://github.com/mattn/go-runewidth | 0383c20520 | 2026-05-29 | 1.20 | 2/1/1 | OK |  |
| 1673 | mattn__go-sqlite3 | https://github.com/mattn/go-sqlite3 | 0cfec60306 | 2026-07-13 | 1.21 | 1/0/0 | EMPTY_GT |  |
| 1674 | mattn__goveralls | https://github.com/mattn/goveralls | 3c566820b1 | 2026-03-29 | 1.13 | 11/2/2 | OK |  |
| 1675 | matzefriedrich__parsley | https://github.com/matzefriedrich/parsley | 9ec9a992d5 | 2026-07-17 | 1.26.4 | 17/8/12 | OK |  |
| 1676 | mavihq__persian | https://github.com/mavihq/persian | 3e779b10be | 2023-10-20 |  | 0/0/0 | EMPTY_GT |  |
| 1677 | maxatome__go-testdeep | https://github.com/maxatome/go-testdeep | 2f6154847f | 2026-07-04 | 1.18 | 1/0/0 | EMPTY_GT |  |
| 1678 | maxatome__go-vitotrol | https://github.com/maxatome/go-vitotrol | a7d5568551 | 2025-11-21 | 1.18 | 3/0/2 | EMPTY_GT |  |
| 1679 | maxbolgarin__abstract | https://github.com/maxbolgarin/abstract | 600a39f997 | 2026-07-16 | 1.23 | 2/1/1 | OK |  |
| 1680 | maxbolgarin__contem | https://github.com/maxbolgarin/contem | 1cb42b6b60 | 2026-07-16 | 1.21 | 0/0/0 | EMPTY_GT |  |
| 1681 | maxbolgarin__lang | https://github.com/maxbolgarin/lang | a4abc1867b | 2026-07-16 | 1.21 | 1/0/0 | EMPTY_GT |  |
| 1682 | maxbrunsfeld__counterfeiter | https://github.com/maxbrunsfeld/counterfeiter | 12304d656a | 2026-07-14 | 1.25.0 | 20/4/9 | OK |  |
| 1683 | maxclaus__gaper | https://github.com/maxclaus/gaper | c44dd59952 | 2023-04-27 | 1.13 | 21/9/14 | OK |  |
| 1684 | maypok86__otter | https://github.com/maypok86/otter | 8c52630755 | 2025-12-24 | 1.24.0 | 7/4/4 | OK |  |
| 1685 | mbndr__logo | https://github.com/mbndr/logo | 913ba85c52 | 2020-12-27 | 1.15 | 0/0/0 | EMPTY_GT |  |
| 1686 | mbrostami__consistenthash | https://github.com/mbrostami/consistenthash | 3ebd2354dc | 2026-06-05 | 1.18 | 1/0/0 | EMPTY_GT |  |
| 1687 | mccoyst__validate | https://github.com/mccoyst/validate | b523a6fb45 | 2023-08-18 | 1.19 | 0/0/0 | EMPTY_GT |  |
| 1688 | mccutchen__go-httpbin | https://github.com/mccutchen/go-httpbin | 25a9144d40 | 2026-07-14 | 1.25.0 | 0/0/0 | EMPTY_GT |  |
| 1689 | mdaliyan__icache | https://github.com/mdaliyan/icache | 2e21ca19e7 | 2025-01-09 | 1.18 | 0/0/0 | EMPTY_GT |  |
| 1690 | mdempsky__unconvert | https://github.com/mdempsky/unconvert | 4a038b3d31 | 2025-02-16 | 1.23.0 | 10/4/4 | OK |  |
| 1691 | mdlayher__arp | https://github.com/mdlayher/arp | 93566ba168 | 2026-05-28 | 1.23.0 | 13/7/7 | OK |  |
| 1692 | mdlayher__dhcp6 | https://github.com/mdlayher/dhcp6 | 2a67805d7d | 2019-03-11 | 1.12 | 2/1/1 | OK |  |
| 1693 | mdlayher__ethernet | https://github.com/mdlayher/ethernet | 529eae5b61 | 2022-02-21 | 1.12 | 11/6/6 | OK |  |
| 1694 | megaease__easegress | https://github.com/megaease/easegress | 3bdb1923a2 | 2026-07-01 | 1.26.0 | 770/320/348 | OK |  |
| 1695 | megaease__easeprobe | https://github.com/megaease/easeprobe | 5396580193 | 2026-06-29 | 1.24.0 | 159/94/97 | OK |  |
| 1696 | mehanizm__airtable | https://github.com/mehanizm/airtable | b19a753f7a | 2025-03-14 | 1.23 | 2/1/1 | OK |  |
| 1697 | mehanizm__iuliia-go | https://github.com/mehanizm/iuliia-go | 2a2e9aba91 | 2025-01-08 | 1.23 | 0/0/0 | EMPTY_GT |  |
| 1698 | mehdihadeli__Go-MediatR | https://github.com/mehdihadeli/Go-MediatR | 259e2610a2 | 2025-05-09 | 1.24 | 14/1/5 | OK |  |
| 1699 | mehdipourfar__webp-server | https://github.com/mehdipourfar/webp-server | 5e6b447e30 | 2021-01-14 | 1.15 | 16/7/8 | OK |  |
| 1700 | mehrdadrad__mylg | https://github.com/mehrdadrad/mylg | faba8672ef | 2020-02-26 | 1.12 | 37/20/21 | OK |  |
| 1701 | mehrdadrad__tcpdog | https://github.com/mehrdadrad/tcpdog | 5dc2fe1147 | 2021-07-21 | 1.15 | 100/42/44 | OK |  |
| 1702 | meloalright__guora | https://github.com/meloalright/guora | d1df46e018 | 2023-01-31 | 1.13 | 230/38/61 | OK |  |
| 1703 | melvinodsa__go-iam | https://github.com/melvinodsa/go-iam | 99115a90b0 | 2026-04-22 | 1.23 | 98/60/60 | OK |  |
| 1704 | mengzhuo__cookiestxt | https://github.com/mengzhuo/cookiestxt | ee32a1d20f | 2026-01-12 | 1.20 | 0/0/0 | EMPTY_GT |  |
| 1705 | mennanov__limiters | https://github.com/mennanov/limiters | afb7890a35 | 2026-07-05 | 1.25.9 | 189/55/69 | OK |  |
| 1706 | metacall__core | https://github.com/metacall/core | 061064c77c | 2026-07-20 |  | 0/0/0 | EMPTY_GT |  |
| 1707 | metalfm__transactor | https://github.com/metalfm/transactor | abefa27167 | 2026-05-25 | 1.26 | 0/0/0 | EMPTY_GT |  |
| 1708 | mewkiz__flac | https://github.com/mewkiz/flac | f26319f6af | 2025-08-18 | 1.23.2 | 10/3/3 | OK |  |
| 1709 | mfridman__tparse | https://github.com/mfridman/tparse | 2416b4b7d3 | 2025-11-27 | 1.23.0 | 25/14/18 | OK |  |
| 1710 | mgechev__revive | https://github.com/mgechev/revive | f2dec195b4 | 2026-07-14 | 1.25.0 | 19/14/14 | OK |  |
| 1711 | mgtv-tech__jetcache-go | https://github.com/mgtv-tech/jetcache-go | 1dc55c639f | 2026-02-24 | 1.21 | 62/14/28 | OK |  |
| 1712 | mgutz__logxi | https://github.com/mgutz/logxi | aebf8a7d67 | 2016-10-27 |  | 0/0/0 | EMPTY_GT |  |
| 1713 | mhmtszr__concurrent-swiss-map | https://github.com/mhmtszr/concurrent-swiss-map | cc88ae5042 | 2026-03-19 | 1.18 | 0/0/0 | EMPTY_GT |  |
| 1714 | mholt__archives | https://github.com/mholt/archives | 8957137421 | 2026-05-26 | 1.25.0 | 82/19/19 | OK |  |
| 1715 | mibk__dupl | https://github.com/mibk/dupl | 8836f5c0e8 | 2026-03-04 | 1.14 | 1/0/0 | EMPTY_GT |  |
| 1716 | michiwend__gomusicbrainz | https://github.com/michiwend/gomusicbrainz | 6c07e13dd3 | 2018-10-12 |  | 0/0/0 | EMPTY_GT |  |
| 1717 | michiwend__goplaceholder | https://github.com/michiwend/goplaceholder | 8ec86e1c9f | 2016-01-17 |  | 0/0/0 | EMPTY_GT |  |
| 1718 | mickep76__encdec | https://github.com/mickep76/encdec |  |  |  | 0/0/0 | CLONE_FAIL |  |
| 1719 | mickep76__mapslice-json | https://github.com/mickep76/mapslice-json | 22c8edf578 | 2021-07-20 | 1.16 | 16/0/0 | EMPTY_GT |  |
| 1720 | micro__go-micro | https://github.com/micro/go-micro | 9d306dcfc1 | 2026-07-20 | 1.25.0 | 228/78/92 | OK |  |
| 1721 | micro__micro | https://github.com/micro/micro |  |  |  | 0/0/0 | CLONE_FAIL |  |
| 1722 | microcosm-cc__bluemonday | https://github.com/microcosm-cc/bluemonday | aba082a57c | 2025-04-04 | 1.19 | 8/3/3 | OK |  |
| 1723 | miekg__dns | https://github.com/miekg/dns | 24ce5ef354 | 2026-07-09 | 1.25.0 | 12/2/3 | OK |  |
| 1724 | miguelmota__golang-for-nodejs-developers | https://github.com/miguelmota/golang-for-nodejs-developers | 26bfd24d0c | 2022-11-18 | 1.13 | 197/9/9 | OK |  |
| 1725 | miguelpragier__handy | https://github.com/miguelpragier/handy | d70fcca135 | 2020-09-29 | 1.13 | 0/0/0 | EMPTY_GT |  |
| 1726 | mikekonan__go-countries | https://github.com/mikekonan/go-countries | ee81007717 | 2020-12-17 | 1.15 | 1/0/0 | EMPTY_GT |  |
| 1727 | mikekonan__go-types | https://github.com/mikekonan/go-types | 5f215be833 | 2026-07-01 | 1.20 | 13/4/4 | OK |  |
| 1728 | mikespook__gorbac | https://github.com/mikespook/gorbac | c7dff02c34 | 2026-05-17 | 1.24 | 0/0/0 | EMPTY_GT |  |
| 1729 | mikestefanello__backlite | https://github.com/mikestefanello/backlite | e95e2eab6c | 2026-07-19 | 1.25.0 | 36/8/11 | OK |  |
| 1730 | mikestefanello__pagoda | https://github.com/mikestefanello/pagoda | dfefe65ec0 | 2025-12-14 | 1.24.6 | 98/55/57 | OK |  |
| 1731 | miku__zek | https://github.com/miku/zek | 50daab3c49 | 2026-04-23 | 1.25.0 | 10/3/3 | OK |  |
| 1732 | milad-abbasi__gonfig | https://github.com/milad-abbasi/gonfig | a72a885357 | 2021-08-03 | 1.15 | 9/3/6 | OK |  |
| 1733 | miladibra10__vjson | https://github.com/miladibra10/vjson | 44bc7b3a48 | 2025-07-31 | 1.17 | 14/7/11 | OK |  |
| 1734 | milosgajdos__go-estimate | https://github.com/milosgajdos/go-estimate | 3866350679 | 2025-01-19 | 1.22 | 53/13/17 | OK |  |
| 1735 | milvus-io__milvus | https://github.com/milvus-io/milvus | bf674af67b | 2026-07-20 | 1.26.5 | 807/274/279 | OK |  |
| 1736 | mingard__sitemap-format | https://github.com/mingard/sitemap-format | 6b9ddcb700 | 2022-11-16 | 1.19 | 0/0/0 | EMPTY_GT |  |
| 1737 | mingrammer__commonregex | https://github.com/mingrammer/commonregex | 16880c65af | 2019-11-12 |  | 4/0/3 | EMPTY_GT |  |
| 1738 | minio__mc | https://github.com/minio/mc | 77f82e18b5 | 2025-11-06 | 1.24.0 | 542/101/105 | OK |  |
| 1739 | minio__minio-go | https://github.com/minio/minio-go | ab51b38e91 | 2026-07-19 | 1.25.0 | 406/18/18 | OK |  |
| 1740 | minio__minio | https://github.com/minio/minio | 7aac2a2c5b | 2026-02-12 | 1.24.0 | 600/241/243 | OK |  |
| 1741 | miniscruff__changie | https://github.com/miniscruff/changie | 791a4f73e5 | 2026-07-20 | 1.25.0 | 63/43/43 | OK |  |
| 1742 | minus5__gofreetds | https://github.com/minus5/gofreetds | 6705a38c49 | 2020-08-26 |  | 0/0/0 | EMPTY_GT |  |
| 1743 | miolini__datacounter | https://github.com/miolini/datacounter | b60bff8712 | 2023-04-13 | 1.11 | 1/0/0 | EMPTY_GT |  |
| 1744 | miolini__jsonf | https://github.com/miolini/jsonf | a3217d4ac9 | 2020-12-13 |  | 0/0/0 | EMPTY_GT |  |
| 1745 | mirecl__catboost-cgo | https://github.com/mirecl/catboost-cgo | 1e3793b7ce | 2026-06-21 | 1.22 | 7/0/4 | EMPTY_GT |  |
| 1746 | mitchellh__packer | https://github.com/mitchellh/packer | 65f0fb3ff2 | 2026-07-10 | 1.25.11 | 860/376/376 | OK |  |
| 1747 | mjibson__go-dsp | https://github.com/mjibson/go-dsp | 7ac7bf171b | 2026-01-28 | 1.25.5 | 1/0/0 | EMPTY_GT |  |
| 1748 | mjl-__mox | https://github.com/mjl-/mox | 9bbad6af30 | 2026-07-21 | 1.25.0 | 68/23/23 | OK |  |
| 1749 | mk-5__fjira | https://github.com/mk-5/fjira | 5d89211375 | 2026-07-07 | 1.25.0 | 38/16/19 | OK |  |
| 1750 | mkchoi212__fac | https://github.com/mkchoi212/fac | d232b05149 | 2023-12-29 | 1.21 | 14/7/7 | OK |  |
| 1751 | mkideal__cli | https://github.com/mkideal/cli | 53df0924b3 | 2023-03-06 | 1.13 | 24/8/12 | OK |  |
| 1752 | mlange-42__ark | https://github.com/mlange-42/ark | f00c5d744e | 2026-06-01 | 1.24 | 1/0/0 | EMPTY_GT |  |
| 1753 | mlimaloureiro__golog | https://github.com/mlimaloureiro/golog | fcc04962f8 | 2016-07-03 |  | 0/0/0 | EMPTY_GT |  |
| 1754 | mmadfox__go-geojson2h3 | https://github.com/mmadfox/go-geojson2h3 | 8e05497dcc | 2026-05-15 | 1.22 | 11/8/8 | OK |  |
| 1755 | mmadfox__go-h3geo-dist | https://github.com/mmadfox/go-h3geo-dist | 35ba0ae1b2 | 2022-05-11 | 1.18 | 8/1/1 | OK |  |
| 1756 | mmalcek__bafi | https://github.com/mmalcek/bafi | 5c5cb9dcf9 | 2025-11-17 | 1.23 | 32/10/10 | OK |  |
| 1757 | mmcdole__gofeed | https://github.com/mmcdole/gofeed | e010ca02e0 | 2026-07-13 | 1.25.0 | 21/6/10 | OK |  |
| 1758 | moby__moby | https://github.com/moby/moby | 722d76e76b | 2026-07-20 | 1.26.3 | 826/280/285 | OK |  |
| 1759 | mochi-co__mqtt | https://github.com/mochi-co/mqtt | 5b7f94bde4 | 2025-03-01 | 1.21 | 192/40/47 | OK |  |
| 1760 | mocktools__go-smtp-mock | https://github.com/mocktools/go-smtp-mock | ac1cbd2398 | 2026-04-09 | 1.24 | 7/0/5 | EMPTY_GT |  |
| 1761 | mojocn__base64Captcha | https://github.com/mojocn/base64Captcha | 74e19a0404 | 2025-09-29 | 1.16 | 15/2/2 | OK |  |
| 1762 | monaco-io__request | https://github.com/monaco-io/request | 2585084d4e | 2025-11-24 | 1.16 | 7/1/1 | OK |  |
| 1763 | mongodb__mongo-go-driver | https://github.com/mongodb/mongo-go-driver | eb51cca8d1 | 2026-07-20 | 1.19 | 124/8/9 | OK |  |
| 1764 | monmohan__xferspdy | https://github.com/monmohan/xferspdy | 78545d0900 | 2020-12-03 |  | 0/0/0 | EMPTY_GT |  |
| 1765 | monoculum__formam | https://github.com/monoculum/formam | 6a93f49ac1 | 2022-11-06 | 1.12 | 0/0/0 | EMPTY_GT |  |
| 1766 | montanaflynn__stats | https://github.com/montanaflynn/stats | 771d439c1b | 2026-07-17 | 1.13 | 0/0/0 | EMPTY_GT |  |
| 1767 | moov-io__ach | https://github.com/moov-io/ach | 7dc72bbf41 | 2026-07-20 | 1.25.0 | 195/31/31 | OK |  |
| 1768 | moovweb__gvm | https://github.com/moovweb/gvm | dd652539fa | 2023-08-14 |  | 0/0/0 | EMPTY_GT |  |
| 1769 | mosajjal__dnsmonster | https://github.com/mosajjal/dnsmonster | dee88b600d | 2026-07-15 | 1.25.0 | 277/79/79 | OK |  |
| 1770 | moshebe__gebug | https://github.com/moshebe/gebug | 3a1b96fe1c | 2026-04-03 | 1.25.0 | 81/38/38 | OK |  |
| 1771 | motrboat__hotcoal | https://github.com/motrboat/hotcoal | 9a57ccec15 | 2023-12-23 | 1.13 | 0/0/0 | EMPTY_GT |  |
| 1772 | mouuff__go-rocket-update | https://github.com/mouuff/go-rocket-update | f0393ca3ca | 2026-02-22 | 1.12 | 1/0/0 | EMPTY_GT |  |
| 1773 | mozillazg__go-httpheader | https://github.com/mozillazg/go-httpheader | 00e0d97353 | 2023-06-29 | 1.11 | 0/0/0 | EMPTY_GT |  |
| 1774 | mozillazg__go-pinyin | https://github.com/mozillazg/go-pinyin | 0562d652b8 | 2025-07-19 | 1.11 | 0/0/0 | EMPTY_GT |  |
| 1775 | mozillazg__go-slugify | https://github.com/mozillazg/go-slugify | 591116de2d | 2016-08-13 |  | 0/0/0 | EMPTY_GT |  |
| 1776 | mozillazg__go-unidecode | https://github.com/mozillazg/go-unidecode | 4c02613f7f | 2023-05-14 | 1.12 | 0/0/0 | EMPTY_GT |  |
| 1777 | mozillazg__request | https://github.com/mozillazg/request | f66876a1e3 | 2017-10-23 |  | 0/0/0 | EMPTY_GT |  |
| 1778 | mr-linch__go-tg | https://github.com/mr-linch/go-tg | c5bde352db | 2026-02-18 | 1.21 | 14/2/7 | OK |  |
| 1779 | mrLSD__go-benchmark-app | https://github.com/mrLSD/go-benchmark-app | ccb3770d39 | 2017-03-17 |  | 0/0/0 | EMPTY_GT |  |
| 1780 | mrbenosborne__tripadvisor-golang | https://github.com/mrbenosborne/tripadvisor-golang | 7ce5720e0c | 2019-08-12 |  | 0/0/0 | EMPTY_GT |  |
| 1781 | msempere__golarm | https://github.com/msempere/golarm | bcbb8a387d | 2015-08-24 |  | 0/0/0 | EMPTY_GT |  |
| 1782 | msoap__go-carpet | https://github.com/msoap/go-carpet | ebd5df8ddd | 2025-08-22 | 1.19 | 17/7/7 | OK |  |
| 1783 | msoap__shell2http | https://github.com/msoap/shell2http | 378e7516c7 | 2026-02-28 | 1.18 | 25/2/2 | OK |  |
| 1784 | msyrus__vscode-go-doc | https://github.com/msyrus/vscode-go-doc | 73e31cca02 | 2026-04-17 |  | 0/0/0 | EMPTY_GT |  |
| 1785 | mszostok__version | https://github.com/mszostok/version | a69cf43b34 | 2023-05-06 | 1.19 | 56/29/32 | OK |  |
| 1786 | mudler__LocalAI | https://github.com/mudler/LocalAI | d0401f9bb4 | 2026-07-20 | 1.26.0 | 1126/456/469 | OK |  |
| 1787 | mudler__anagent | https://github.com/mudler/anagent | 626d9ac35e | 2018-08-10 |  | 0/0/0 | EMPTY_GT |  |
| 1788 | muesli__cache2go | https://github.com/muesli/cache2go | 518229cd80 | 2022-10-12 | 1.15 | 1/0/0 | EMPTY_GT |  |
| 1789 | muesli__regommend | https://github.com/muesli/regommend | ee89be7688 | 2019-08-07 |  | 0/0/0 | EMPTY_GT |  |
| 1790 | muesli__smartcrop | https://github.com/muesli/smartcrop | f1935b108c | 2023-03-16 | 1.12 | 13/2/2 | OK |  |
| 1791 | muesli__termenv | https://github.com/muesli/termenv | 368a3572b8 | 2025-09-22 | 1.17 | 6/5/5 | OK |  |
| 1792 | muir__libschema | https://github.com/muir/libschema | ec1f63edff | 2026-05-06 | 1.24.0 | 20/10/12 | OK |  |
| 1793 | muir__nchi | https://github.com/muir/nchi | 6668ca2640 | 2026-04-18 | 1.20 | 55/7/11 | OK |  |
| 1794 | muir__nfigure | https://github.com/muir/nfigure | 2f04ef9944 | 2026-05-20 | 1.23.0 | 28/7/20 | OK |  |
| 1795 | muir__nject | https://github.com/muir/nject | d062964154 | 2026-04-20 | 1.18 | 9/2/6 | OK |  |
| 1796 | muir__reflectutils | https://github.com/muir/reflectutils | fea86d78ed | 2026-03-21 | 1.20 | 14/2/6 | OK |  |
| 1797 | mum4k__termdash | https://github.com/mum4k/termdash | 4b322f4b5f | 2026-06-09 | 1.24.0 | 21/11/11 | OK |  |
| 1798 | murlokswarm__app | https://github.com/murlokswarm/app | 80decd8c0f | 2026-06-04 | 1.26.0 | 23/6/10 | OK |  |
| 1799 | mus-format__mus-go | https://github.com/mus-format/mus-go | 7d3c5a8140 | 2026-05-07 | 1.24 | 9/4/4 | OK |  |
| 1800 | mustafaturan__bus | https://github.com/mustafaturan/bus | ea436a8ebd | 2023-05-13 | 1.16 | 7/0/4 | EMPTY_GT |  |
| 1801 | muyo__sno | https://github.com/muyo/sno | a5437136ba | 2021-11-12 | 1.14 | 0/0/0 | EMPTY_GT |  |
| 1802 | mvdan__sh | https://github.com/mvdan/sh | 3aa596e52c | 2026-07-19 | 1.25.0 | 18/5/11 | OK |  |
| 1803 | mvdan__xurls | https://github.com/mvdan/xurls | 6fcda1fd6d | 2026-03-27 | 1.25.0 | 10/1/3 | OK |  |
| 1804 | mvmaasakkers__certificates | https://github.com/mvmaasakkers/certificates | dd7ff0f3ed | 2022-12-27 | 1.18 | 45/13/13 | OK |  |
| 1805 | mvmaasakkers__go-problemdetails | https://github.com/mvmaasakkers/go-problemdetails | b32ebd7449 | 2020-02-17 | 1.13 | 1/0/0 | EMPTY_GT |  |
| 1806 | mvrilo__go-redoc | https://github.com/mvrilo/go-redoc | 3a15e2c085 | 2025-02-09 | 1.17 | 0/0/0 | EMPTY_GT |  |
| 1807 | mxpv__patreon-go | https://github.com/mxpv/patreon-go | 646111f1d9 | 2019-09-16 |  | 0/0/0 | EMPTY_GT |  |
| 1808 | mxschmitt__playwright-go | https://github.com/mxschmitt/playwright-go | 9af13144a6 | 2026-07-16 | 1.22 | 33/3/13 | OK |  |
| 1809 | mymmrac__telego | https://github.com/mymmrac/telego | 168c444ccd | 2026-07-20 | 1.25.7 | 31/7/11 | OK |  |
| 1810 | naegelejd__brewerydb | https://github.com/naegelejd/brewerydb | 37520b5dd2 | 2015-06-18 |  | 0/0/0 | EMPTY_GT |  |
| 1811 | nakagami__firebirdsql | https://github.com/nakagami/firebirdsql | 79cc1c6e1f | 2026-06-09 | 1.22.0 | 14/4/8 | OK |  |
| 1812 | nalgeon__redka | https://github.com/nalgeon/redka | d3c353f024 | 2026-02-04 | 1.23.0 | 7/5/6 | OK |  |
| 1813 | name5566__leaf | https://github.com/name5566/leaf | af71eb082c | 2022-10-21 |  | 0/0/0 | EMPTY_GT |  |
| 1814 | nanomsg__mangos | https://github.com/nanomsg/mangos | fc690cb7c2 | 2026-07-16 | 1.22 | 8/2/2 | OK |  |
| 1815 | nanovms__ops | https://github.com/nanovms/ops | 3fe4dd34e5 | 2026-06-14 | 1.26.0 | 522/196/201 | OK |  |
| 1816 | nao1215__gup | https://github.com/nao1215/gup | 6dcd038ded | 2026-07-20 | 1.25.0 | 39/14/16 | OK |  |
| 1817 | napalu__goopt | https://github.com/napalu/goopt | f0eb55e26a | 2026-06-30 | 1.18 | 20/7/11 | OK |  |
| 1818 | napsy__go-css | https://github.com/napsy/go-css | 580a1b4bf5 | 2025-06-03 | 1.19 | 0/0/0 | EMPTY_GT |  |
| 1819 | nar10z__go-accumulator | https://github.com/nar10z/go-accumulator | 638ebe0d0c | 2026-06-08 | 1.26 | 10/2/7 | OK |  |
| 1820 | nasermirzaei89__env | https://github.com/nasermirzaei89/env | 383d57ff96 | 2026-05-23 | 1.21 | 0/0/0 | EMPTY_GT |  |
| 1821 | natefinch__lumberjack | https://github.com/natefinch/lumberjack | 4cb27fcfbb | 2023-02-06 | 1.13 | 0/0/0 | EMPTY_GT |  |
| 1822 | nathan-osman__go-sunrise | https://github.com/nathan-osman/go-sunrise | c8f9f1eb86 | 2022-08-27 | 1.13 | 0/0/0 | EMPTY_GT |  |
| 1823 | nats-io__nats-server | https://github.com/nats-io/nats-server | 146b0be65b | 2026-07-16 | 1.25.0 | 24/9/10 | OK |  |
| 1824 | nats-io__nats.go | https://github.com/nats-io/nats.go | 77e280d0b1 | 2026-07-01 | 1.25.0 | 25/6/12 | OK |  |
| 1825 | naughtygopher__currency | https://github.com/naughtygopher/currency | 58d5afa076 | 2025-09-23 | 1.14 | 0/0/0 | EMPTY_GT |  |
| 1826 | naughtygopher__errors | https://github.com/naughtygopher/errors | 0ab8955a65 | 2025-09-23 | 1.23.0 | 37/2/2 | OK |  |
| 1827 | naughtygopher__goapp | https://github.com/naughtygopher/goapp | e000688808 | 2025-09-23 | 1.23.0 | 96/49/49 | OK |  |
| 1828 | naughtygopher__nibbler | https://github.com/naughtygopher/nibbler | a8599c1472 | 2025-12-11 | 1.23.1 | 0/0/0 | EMPTY_GT |  |
| 1829 | naughtygopher__pocache | https://github.com/naughtygopher/pocache | 28be2ad874 | 2025-09-23 | 1.22 | 8/1/5 | OK |  |
| 1830 | naughtygopher__webgo | https://github.com/naughtygopher/webgo | 8ee6c6e23f | 2025-09-23 | 1.22 | 0/0/0 | EMPTY_GT |  |
| 1831 | navidys__gopensky | https://github.com/navidys/gopensky | 25bfa9e13a | 2026-06-13 | 1.25.6 | 50/4/17 | OK |  |
| 1832 | nazar256__parapipe | https://github.com/nazar256/parapipe | 5b758b2e48 | 2024-12-13 |  | 0/0/0 | EMPTY_GT |  |
| 1833 | nbari__violetear | https://github.com/nbari/violetear | df20784409 | 2022-09-27 | 1.16 | 2/0/1 | EMPTY_GT |  |
| 1834 | ncruces__go-sqlite3 | https://github.com/ncruces/go-sqlite3 | e5bb5cc6c4 | 2026-07-17 | 1.25.0 | 18/10/12 | OK |  |
| 1835 | ncruces__zenity | https://github.com/ncruces/zenity | 04c3387123 | 2026-07-08 | 1.25.0 | 16/1/2 | OK |  |
| 1836 | ndabAP__entitydebs | https://github.com/ndabAP/entitydebs | a31f474ea4 | 2025-11-03 | 1.25.3 | 80/29/30 | OK |  |
| 1837 | neelance__graphql-go | https://github.com/neelance/graphql-go | 4fb3f75369 | 2026-07-02 | 1.25.0 | 19/8/8 | OK |  |
| 1838 | neilotoole__errgroup | https://github.com/neilotoole/errgroup | 4c23cf5ed8 | 2023-01-10 | 1.14 | 0/0/0 | EMPTY_GT |  |
| 1839 | neilotoole__jsoncolor | https://github.com/neilotoole/jsoncolor | 5eb8b58dfb | 2026-05-25 | 1.25.0 | 15/5/12 | OK |  |
| 1840 | neilotoole__sq | https://github.com/neilotoole/sq | b150f01778 | 2026-07-21 | 1.26.3 | 505/124/130 | OK |  |
| 1841 | netresearch__go-cron | https://github.com/netresearch/go-cron | 2d84b012e8 | 2026-07-19 | 1.25 | 1/0/0 | EMPTY_GT |  |
| 1842 | netresearch__ofelia | https://github.com/netresearch/ofelia | 60e930f152 | 2026-07-19 | 1.26 | 91/43/48 | OK |  |
| 1843 | neuronlabs__errors | https://github.com/neuronlabs/errors | 8a0fb4eedd | 2019-08-01 | 1.12 | 6/1/4 | OK |  |
| 1844 | neurosnap__sentences | https://github.com/neurosnap/sentences | 43d1bdbe68 | 2024-02-27 | 1.18 | 1/0/0 | EMPTY_GT |  |
| 1845 | nexcode__rpcplatform | https://github.com/nexcode/rpcplatform | 4935b971ca | 2026-03-30 | 1.24.0 | 0/0/0 | EMPTY_GT |  |
| 1846 | ngamux__ngamux | https://github.com/ngamux/ngamux | 388219a778 | 2026-07-18 | 1.24.0 | 0/0/0 | EMPTY_GT |  |
| 1847 | nicklaw5__go-respond | https://github.com/nicklaw5/go-respond | 82f97ac85a | 2021-09-25 |  | 0/0/0 | EMPTY_GT |  |
| 1848 | nicksnyder__go-i18n | https://github.com/nicksnyder/go-i18n | 94f5f67df9 | 2026-07-06 | 1.24.0 | 8/3/3 | OK |  |
| 1849 | nicobistolfi__go-postgres-s3-backup | https://github.com/nicobistolfi/go-postgres-s3-backup | 771caacbd7 | 2026-05-27 | 1.24.5 | 27/20/20 | OK |  |
| 1850 | nicola-strappazzon__password-manager | https://github.com/nicola-strappazzon/password-manager | 5b7de5bb11 | 2026-07-14 | 1.24.0 | 42/12/16 | OK |  |
| 1851 | nikepan__clickhouse-bulk | https://github.com/nikepan/clickhouse-bulk | 0b4056bb7a | 2026-07-15 | 1.26.5 | 50/19/23 | OK |  |
| 1852 | nikhilsaraf__go-tools | https://github.com/nikhilsaraf/go-tools | 3aa526612e | 2019-03-27 |  | 0/0/0 | EMPTY_GT |  |
| 1853 | nikogura__dbt | https://github.com/nikogura/dbt | 9b9cea6341 | 2026-05-06 | 1.24.0 | 137/61/64 | OK |  |
| 1854 | nikogura__gomason | https://github.com/nikogura/gomason | 4ffa529178 | 2026-02-10 | 1.22 | 31/13/14 | OK |  |
| 1855 | nikolaydubina__calendarheatmap | https://github.com/nikolaydubina/calendarheatmap | 178c02f023 | 2024-11-12 | 1.16 | 14/2/2 | OK |  |
| 1856 | nikolaydubina__fpdecimal | https://github.com/nikolaydubina/fpdecimal | 6b5d661b38 | 2026-06-07 | 1.21 | 0/0/0 | EMPTY_GT |  |
| 1857 | nikolaydubina__fpmoney | https://github.com/nikolaydubina/fpmoney | b14cc5504b | 2026-06-07 | 1.24 | 2/0/0 | OK |  |
| 1858 | nikolaydubina__go-enum-encoding | https://github.com/nikolaydubina/go-enum-encoding | c749c3e5a8 | 2026-06-07 | 1.25 | 1/0/0 | EMPTY_GT |  |
| 1859 | nikolaydubina__go-instrument | https://github.com/nikolaydubina/go-instrument | d25129795c | 2026-06-07 | 1.24 | 9/1/1 | OK |  |
| 1860 | nikolaydubina__go-ml-benchmarks | https://github.com/nikolaydubina/go-ml-benchmarks | 2656e80bce | 2026-06-07 |  | 0/0/0 | EMPTY_GT |  |
| 1861 | nikolaydubina__htmljson | https://github.com/nikolaydubina/htmljson | 5a88718f3d | 2026-06-07 | 1.20 | 1/0/0 | EMPTY_GT |  |
| 1862 | nikolaydubina__htmlyaml | https://github.com/nikolaydubina/htmlyaml | 72e10cd4e1 | 2026-06-07 | 1.20 | 1/0/0 | EMPTY_GT |  |
| 1863 | nikolaydubina__jsonl-graph | https://github.com/nikolaydubina/jsonl-graph | 2b1ae0f982 | 2026-01-31 | 1.17 | 2/1/1 | OK |  |
| 1864 | nikolaydubina__watchhttp | https://github.com/nikolaydubina/watchhttp | 017e525504 | 2026-06-07 | 1.20 | 10/3/4 | OK |  |
| 1865 | nil-go__konf | https://github.com/nil-go/konf | e90325e6ff | 2026-07-20 | 1.24.0 | 0/0/0 | EMPTY_GT |  |
| 1866 | nilpoona__leakhound | https://github.com/nilpoona/leakhound | 493bc1dbae | 2026-06-01 | 1.26 | 11/4/4 | OK |  |
| 1867 | nilpoona__zerohand | https://github.com/nilpoona/zerohand | 0b8ed1e5d5 | 2026-05-03 | 1.25.1 | 9/3/3 | OK |  |
| 1868 | ninedraft__gocryforhelp | https://github.com/ninedraft/gocryforhelp | b83de1d077 | 2017-09-23 |  | 0/0/0 | EMPTY_GT |  |
| 1869 | nishanths__go-xkcd | https://github.com/nishanths/go-xkcd | 72f5251a24 | 2022-10-23 | 1.14 | 0/0/0 | EMPTY_GT |  |
| 1870 | nitishm__go-rejson | https://github.com/nitishm/go-rejson | d2aa875760 | 2023-03-31 | 1.14 | 14/4/4 | OK |  |
| 1871 | nkmr-jp__zl | https://github.com/nkmr-jp/zl | e74d40cf71 | 2026-04-03 | 1.26 | 18/7/10 | OK |  |
| 1872 | nlpodyssey__spago | https://github.com/nlpodyssey/spago | 3130dda657 | 2025-04-01 | 1.21 | 14/1/5 | OK |  |
| 1873 | no-src__gofs | https://github.com/no-src/gofs | 6edaa74f38 | 2025-12-18 | 1.24.4 | 183/83/84 | OK |  |
| 1874 | no-src__log | https://github.com/no-src/log | 35de3561c2 | 2025-11-24 | 1.19 | 3/1/1 | OK |  |
| 1875 | no-src__nscache | https://github.com/no-src/nscache | a4adccf1ad | 2026-03-05 | 1.24.0 | 105/41/41 | OK |  |
| 1876 | noelyahan__mergi | https://github.com/noelyahan/mergi | 221cd737ac | 2024-11-05 |  | 0/0/0 | EMPTY_GT |  |
| 1877 | nofeaturesonlybugs__set | https://github.com/nofeaturesonlybugs/set | efdaca5279 | 2022-06-12 | 1.16 | 7/0/4 | EMPTY_GT |  |
| 1878 | noneback__go-taskflow | https://github.com/noneback/go-taskflow | fa25657f5b | 2026-06-27 | 1.21.6 | 0/0/0 | EMPTY_GT |  |
| 1879 | norunners__vert | https://github.com/norunners/vert | 106a353d42 | 2022-12-02 | 1.16 | 0/0/0 | EMPTY_GT |  |
| 1880 | nottechdm__notnet | https://github.com/nottechdm/notnet | 0d432fff00 | 2026-05-03 | 1.25 | 1/0/0 | EMPTY_GT |  |
| 1881 | novalagung__gubrak | https://github.com/novalagung/gubrak | b516a7e51d | 2026-05-02 | 1.18 | 8/0/5 | EMPTY_GT |  |
| 1882 | nproc__parseargs-go | https://github.com/nproc/parseargs-go | 4cb98496e5 | 2017-01-24 |  | 0/0/0 | EMPTY_GT |  |
| 1883 | nsf__gocode | https://github.com/nsf/gocode | 91e26af1d2 | 2026-02-07 |  | 0/0/0 | EMPTY_GT |  |
| 1884 | nsf__termbox-go | https://github.com/nsf/termbox-go | bc970d5a0a | 2026-06-23 | 1.23.0 | 4/3/3 | OK |  |
| 1885 | nsqio__go-nsq | https://github.com/nsqio/go-nsq | 7188fbbac4 | 2025-07-23 | 1.17 | 2/1/1 | OK |  |
| 1886 | nstratos__go-myanimelist | https://github.com/nstratos/go-myanimelist | 34cf2da87a | 2026-05-31 | 1.23.0 | 4/1/1 | OK |  |
| 1887 | nullism__bqb | https://github.com/nullism/bqb | 1583ab94ae | 2025-02-11 | 1.20 | 0/0/0 | EMPTY_GT |  |
| 1888 | nullne__evaluator | https://github.com/nullne/evaluator | bae92dd254 | 2021-07-25 | 1.14 | 1/0/0 | EMPTY_GT |  |
| 1889 | num30__config | https://github.com/num30/config | 79100d7549 | 2025-02-23 | 1.19 | 193/23/27 | OK |  |
| 1890 | number571__go-peer | https://github.com/number571/go-peer | e121fcc699 | 2026-06-03 | 1.23 | 11/5/5 | OK |  |
| 1891 | nwillc__genfuncs | https://github.com/nwillc/genfuncs | 217050bf17 | 2022-08-07 | 1.19 | 13/1/5 | OK |  |
| 1892 | nxdir-s__pipelines | https://github.com/nxdir-s/pipelines | 76e8aceea0 | 2026-06-23 | 1.26 | 1/0/0 | EMPTY_GT |  |
| 1893 | nyaosorg__go-readline-ny | https://github.com/nyaosorg/go-readline-ny | 56999586c2 | 2026-05-10 | 1.18 | 13/9/9 | OK |  |
| 1894 | nytlabs__streamtools | https://github.com/nytlabs/streamtools | e8f4fe069f | 2015-04-01 |  | 0/0/0 | EMPTY_GT |  |
| 1895 | o1egl__fwencoder | https://github.com/o1egl/fwencoder | 2c45044a2d | 2025-02-11 | 1.23 | 7/0/4 | EMPTY_GT |  |
| 1896 | o1egl__govatar | https://github.com/o1egl/govatar | 31618c34a7 | 2022-07-29 | 1.16 | 13/4/8 | OK |  |
| 1897 | o1egl__paseto | https://github.com/o1egl/paseto | 0757ff684e | 2022-09-05 | 1.14 | 13/4/8 | OK |  |
| 1898 | oaStuff__clusteredBigCache | https://github.com/oaStuff/clusteredBigCache | 638bef3e20 | 2018-01-22 |  | 0/0/0 | EMPTY_GT |  |
| 1899 | oagudo__outbox | https://github.com/oagudo/outbox | f4d803590f | 2026-03-03 | 1.24.3 | 2/1/1 | OK |  |
| 1900 | oakmound__oak | https://github.com/oakmound/oak | f41daa3321 | 2025-01-19 | 1.18 | 31/14/14 | OK |  |
| 1901 | oaswrap__spec | https://github.com/oaswrap/spec | 30aa75affd | 2026-05-12 | 1.22 | 198/7/7 | OK |  |
| 1902 | objectbox__objectbox-go | https://github.com/objectbox/objectbox-go | affbf00644 | 2025-03-12 | 1.12 | 3/2/2 | OK |  |
| 1903 | oblq__swap | https://github.com/oblq/swap | 512dd3d5df | 2025-04-04 | 1.14 | 13/2/6 | OK |  |
| 1904 | ockam-network__did | https://github.com/ockam-network/did | 02ae01ce06 | 2021-01-03 |  | 0/0/0 | EMPTY_GT |  |
| 1905 | ocornut__imgui | https://github.com/ocornut/imgui | 295385ff96 | 2026-07-20 |  | 0/0/0 | EMPTY_GT |  |
| 1906 | octago__sflags | https://github.com/octago/sflags | 680a267d4b | 2026-01-06 | 1.21.5 | 25/13/16 | OK |  |
| 1907 | octomation__go-module | https://github.com/octomation/go-module | efe80d1057 | 2023-12-28 | 1.11 | 2/1/1 | OK |  |
| 1908 | odeke-em__drive | https://github.com/odeke-em/drive | bede608f25 | 2021-02-08 | 1.16 | 99/38/38 | OK |  |
| 1909 | offen__docker-volume-backup | https://github.com/offen/docker-volume-backup | e5ca9d22ef | 2026-07-14 | 1.26 | 396/88/88 | OK |  |
| 1910 | ohler55__ojg | https://github.com/ohler55/ojg | 7af949d0cd | 2026-07-05 | 1.18 | 1/0/0 | EMPTY_GT |  |
| 1911 | oklahomer__go-sarah | https://github.com/oklahomer/go-sarah | d93affd7f0 | 2026-02-07 | 1.23 | 20/11/11 | OK |  |
| 1912 | oklog__ulid | https://github.com/oklog/ulid | 96c4edf226 | 2024-04-13 | 1.15 | 2/1/1 | OK |  |
| 1913 | olahol__melody | https://github.com/olahol/melody | f26c4a5d8c | 2025-10-28 | 1.19 | 8/1/5 | OK |  |
| 1914 | olebedev__emitter | https://github.com/olebedev/emitter | 349169dec2 | 2023-04-11 |  | 0/0/0 | EMPTY_GT |  |
| 1915 | olebedev__when | https://github.com/olebedev/when | aa16b8beab | 2025-03-03 | 1.19 | 7/2/5 | OK |  |
| 1916 | olivere__elastic | https://github.com/olivere/elastic | 4cdb89f6e6 | 2024-08-08 | 1.17 | 54/13/15 | OK |  |
| 1917 | oluwajubelo1__otellix | https://github.com/oluwajubelo1/otellix | a2db3850a0 | 2026-05-05 | 1.23.0 | 304/64/64 | OK |  |
| 1918 | olvrng__ujson | https://github.com/olvrng/ujson | 772b59d231 | 2025-01-04 | 1.19 | 2/0/1 | EMPTY_GT |  |
| 1919 | omeid__uconfig | https://github.com/omeid/uconfig | 4872b09388 | 2026-06-18 | 1.22 | 7/2/3 | OK |  |
| 1920 | onatm__clockwerk | https://github.com/onatm/clockwerk | 0dc39eb207 | 2024-11-05 | 1.12 | 1/0/0 | EMPTY_GT |  |
| 1921 | onllm-dev__onWatch | https://github.com/onllm-dev/onWatch | fcc8d272eb | 2026-06-19 | 1.25.7 | 170/23/23 | OK |  |
| 1922 | onrik__ethrpc | https://github.com/onrik/ethrpc | c02e7c03ec | 2023-06-27 | 1.19 | 0/0/0 | EMPTY_GT |  |
| 1923 | onrik__micha | https://github.com/onrik/micha | 8a3e847af1 | 2026-03-19 | 1.22 | 0/0/0 | EMPTY_GT |  |
| 1924 | openfga__openfga | https://github.com/openfga/openfga | 4539162281 | 2026-07-20 | 1.25.7 | 295/134/139 | OK |  |
| 1925 | openrundev__openrun | https://github.com/openrundev/openrun | f49a3fa7d8 | 2026-07-20 | 1.26.5 | 480/213/213 | OK |  |
| 1926 | opensaucerer__barf | https://github.com/opensaucerer/barf | af0325054a | 2023-12-09 | 1.18 | 1/0/0 | EMPTY_GT |  |
| 1927 | openshift__osin | https://github.com/openshift/osin | 0f4d38c6e5 | 2022-03-17 | 1.15 | 14/7/7 | OK |  |
| 1928 | openziti-test-kitchen__zssh | https://github.com/openziti-test-kitchen/zssh | da691cf262 | 2026-02-06 | 1.25.3 | 362/107/107 | OK |  |
| 1929 | openziti__sdk-golang | https://github.com/openziti/sdk-golang | 317dc7c6aa | 2026-07-02 | 1.25.0 | 249/76/80 | OK |  |
| 1930 | openziti__ziti | https://github.com/openziti/ziti | 4a8b63d99d | 2026-07-07 | 1.26.4 | 547/180/182 | OK |  |
| 1931 | opnlabs__dot | https://github.com/opnlabs/dot | 67cf6f958f | 2024-04-19 | 1.21.3 | 55/29/32 | OK |  |
| 1932 | optimus-hft__go-ipmux | https://github.com/optimus-hft/go-ipmux | 90404d59b7 | 2024-03-06 | 1.21 | 101/15/19 | OK |  |
| 1933 | opus-domini__fast-shot | https://github.com/opus-domini/fast-shot | db8e0e30ba | 2026-07-08 | 1.25.8 | 1/0/0 | EMPTY_GT |  |
| 1934 | oracle__coherence-go-client | https://github.com/oracle/coherence-go-client | 1516804273 | 2026-04-27 | 1.23.0 | 41/7/7 | OK |  |
| 1935 | oras-project__oras | https://github.com/oras-project/oras | 475edeed36 | 2026-07-20 | 1.25.7 | 42/22/22 | OK |  |
| 1936 | oriser__regroup | https://github.com/oriser/regroup | f6bb0e0828 | 2024-09-25 | 1.18 | 12/1/5 | OK |  |
| 1937 | orlangure__gnomock | https://github.com/orlangure/gnomock | 5ce19d18d8 | 2026-04-13 | 1.24.0 | 275/127/134 | OK |  |
| 1938 | orneryd__NornicDB | https://github.com/orneryd/NornicDB | 0fbc577dcc | 2026-07-20 | 1.26.4 | 389/115/115 | OK |  |
| 1939 | ory__keto | https://github.com/ory/keto | 57bdd80ddb | 2026-07-20 | 1.26 | 472/166/169 | OK |  |
| 1940 | osamingo__checkdigit | https://github.com/osamingo/checkdigit | 5504ad3530 | 2025-03-28 | 1.24 | 1/0/0 | EMPTY_GT |  |
| 1941 | osamingo__gaurun-client | https://github.com/osamingo/gaurun-client | 800644a698 | 2018-07-23 |  | 0/0/0 | EMPTY_GT |  |
| 1942 | osamingo__gosh | https://github.com/osamingo/gosh | 5229d132c5 | 2025-03-22 | 1.24 | 0/0/0 | EMPTY_GT |  |
| 1943 | osamingo__indigo | https://github.com/osamingo/indigo | 573512b18f | 2025-03-23 | 1.24 | 3/2/2 | OK |  |
| 1944 | osamingo__jsonrpc | https://github.com/osamingo/jsonrpc | b454ff845b | 2025-03-28 | 1.24 | 14/7/10 | OK |  |
| 1945 | osamingo__shamoji | https://github.com/osamingo/shamoji | 04f83aa0e7 | 2025-03-23 | 1.24 | 10/6/6 | OK |  |
| 1946 | osrg__gobgp | https://github.com/osrg/gobgp | 3e854ce8f6 | 2026-07-20 | 1.25.0 | 129/45/51 | OK |  |
| 1947 | ostafen__clover | https://github.com/ostafen/clover | de2a323975 | 2025-09-09 | 1.23 | 63/17/22 | OK |  |
| 1948 | osteele__liquid | https://github.com/osteele/liquid | 5d9c036f52 | 2026-02-27 | 1.25.0 | 374/2/6 | OK |  |
| 1949 | osteele__tuesday | https://github.com/osteele/tuesday | 32b7b2c682 | 2026-02-26 | 1.25 | 0/0/0 | EMPTY_GT |  |
| 1950 | ostrost__ostent | https://github.com/ostrost/ostent |  |  |  | 0/0/0 | EMPTY_GT |  |
| 1951 | otiai10__copy | https://github.com/otiai10/copy | 5ef5923d6f | 2025-01-05 | 1.18 | 4/2/3 | OK |  |
| 1952 | otiai10__gosseract | https://github.com/otiai10/gosseract | a3b1d1fad7 | 2026-01-17 | 1.21 | 0/0/0 | EMPTY_GT |  |
| 1953 | otiai10__ocrserver | https://github.com/otiai10/ocrserver | e41110606c | 2021-05-29 | 1.12 | 11/2/3 | OK |  |
| 1954 | otiai10__openaigo | https://github.com/otiai10/openaigo | 12adbec3b2 | 2024-05-14 | 1.18 | 2/0/1 | EMPTY_GT |  |
| 1955 | ovh__cds | https://github.com/ovh/cds | 31a3c343e1 | 2026-07-17 | 1.25.5 | 766/313/316 | OK |  |
| 1956 | ovh__utask | https://github.com/ovh/utask | 0a8f5b9109 | 2026-04-07 | 1.24.0 | 161/84/85 | OK |  |
| 1957 | owenthereal__upterm | https://github.com/owenthereal/upterm | 1a8b11e43b | 2026-07-12 | 1.26 | 337/118/124 | OK |  |
| 1958 | owulveryck__onnx-go | https://github.com/owulveryck/onnx-go | 5befeb8701 | 2024-09-01 | 1.19 | 130/36/36 | OK |  |
| 1959 | oxyno-zeta__s3-proxy | https://github.com/oxyno-zeta/s3-proxy | 830281cdda | 2026-05-05 | 1.26.0 | 132/65/65 | OK |  |
| 1960 | ozankasikci__dockerfile-generator | https://github.com/ozankasikci/dockerfile-generator | 1d8270ff07 | 2022-05-23 | 1.13 | 36/3/7 | OK |  |
| 1961 | ozgio__strutil | https://github.com/ozgio/strutil | 6e091d33fe | 2021-10-26 | 1.15 | 1/0/0 | EMPTY_GT |  |
| 1962 | ozontech__testo | https://github.com/ozontech/testo | 3510acd281 | 2026-07-17 | 1.24 | 0/0/0 | EMPTY_GT |  |
| 1963 | pancsta__asyncmachine-go | https://github.com/pancsta/asyncmachine-go | c5987e0f7e | 2026-07-03 | 1.25.0 | 552/232/270 | OK |  |
| 1964 | panjf2000__ants | https://github.com/panjf2000/ants | 107e376781 | 2026-07-04 | 1.19 | 8/1/5 | OK |  |
| 1965 | panjf2000__gnet | https://github.com/panjf2000/gnet | 441457f079 | 2026-07-03 | 1.20 | 17/7/11 | OK |  |
| 1966 | pantrif__s2-geojson | https://github.com/pantrif/s2-geojson | 8e7ca4bf00 | 2024-08-16 | 1.13 | 27/13/16 | OK |  |
| 1967 | pantrif__url-shortener | https://github.com/pantrif/url-shortener | 5dadc9e73d | 2023-02-06 | 1.19 | 4/2/3 | OK |  |
| 1968 | paololazzari__play | https://github.com/paololazzari/play | 755a88754c | 2025-03-28 | 1.18 | 32/14/14 | OK |  |
| 1969 | paranoidguy__databunker | https://github.com/paranoidguy/databunker | 0588df696d | 2026-07-09 |  | 0/0/0 | EMPTY_GT |  |
| 1970 | pardnchiu__go-jwt | https://github.com/pardnchiu/go-jwt | 5e1f455736 | 2026-07-13 | 1.24.3 | 53/20/20 | OK |  |
| 1971 | pardnchiu__go-scheduler | https://github.com/pardnchiu/go-scheduler | c62a9e53d2 | 2026-07-18 | 1.23 | 7/0/4 | EMPTY_GT |  |
| 1972 | pariz__gountries | https://github.com/pariz/gountries | 5b3573f492 | 2024-06-04 | 1.17 | 7/1/4 | OK |  |
| 1973 | parsyl__parquet | https://github.com/parsyl/parquet | 92fcb6db37 | 2025-04-17 | 1.20 | 11/3/8 | OK |  |
| 1974 | pascaldekloe__colfer | https://github.com/pascaldekloe/colfer | 6365466e2d | 2026-02-26 | 1.18 | 15/3/4 | OK |  |
| 1975 | pascaldekloe__jwt | https://github.com/pascaldekloe/jwt |  |  |  | 0/0/0 | EMPTY_GT |  |
| 1976 | pascaldekloe__metrics | https://github.com/pascaldekloe/metrics | b8fd78f9c1 | 2023-03-22 | 1.19 | 0/0/0 | EMPTY_GT |  |
| 1977 | pashagolub__pgxmock | https://github.com/pashagolub/pgxmock | c777857f7b | 2026-07-17 | 1.25.0 | 20/6/10 | OK |  |
| 1978 | patrickhener__goshs | https://github.com/patrickhener/goshs | 76e625165d | 2026-07-20 | 1.26.4 | 331/96/96 | OK |  |
| 1979 | patrikeh__go-deep | https://github.com/patrikeh/go-deep | a2775168ab | 2023-04-27 | 1.13 | 4/0/3 | EMPTY_GT |  |
| 1980 | paulmach__orb | https://github.com/paulmach/orb | a12a48ea0c | 2026-03-30 | 1.18 | 24/3/3 | OK |  |
| 1981 | paulmach__osm | https://github.com/paulmach/osm | 4f398c4aa9 | 2026-06-21 | 1.23 | 40/5/6 | OK |  |
| 1982 | pavlo__gosuite | https://github.com/pavlo/gosuite | d5a3671820 | 2016-10-18 |  | 0/0/0 | EMPTY_GT |  |
| 1983 | paypal__gatt | https://github.com/paypal/gatt | 4ae819d591 | 2015-10-11 |  | 0/0/0 | EMPTY_GT |  |
| 1984 | pdfcpu__pdfcpu | https://github.com/pdfcpu/pdfcpu | 7bde99e930 | 2026-07-01 | 1.25.0 | 24/12/12 | OK |  |
| 1985 | pdupub__go-pdu | https://github.com/pdupub/go-pdu | 624ddd093d | 2025-01-20 | 1.23.4 | 443/138/138 | OK |  |
| 1986 | peak__s5cmd | https://github.com/peak/s5cmd | 54d6a8a955 | 2025-06-13 | 1.20 | 61/29/30 | OK |  |
| 1987 | pebbe__textcat | https://github.com/pebbe/textcat | f236d69afd | 2024-12-06 | 1.16 | 2/1/1 | OK |  |
| 1988 | pebbe__zmq2 | https://github.com/pebbe/zmq2 | 5575c42586 | 2025-05-11 | 1.16 | 1/0/0 | EMPTY_GT |  |
| 1989 | pebbe__zmq3 | https://github.com/pebbe/zmq3 | 814bc49746 | 2025-05-11 | 1.16 | 1/0/0 | EMPTY_GT |  |
| 1990 | pebbe__zmq4 | https://github.com/pebbe/zmq4 | 17bb8b5152 | 2025-07-06 | 1.16 | 0/0/0 | EMPTY_GT |  |
| 1991 | peco__peco | https://github.com/peco/peco | c3f424413e | 2026-07-12 | 1.25.0 | 29/13/17 | OK |  |
| 1992 | peczenyj__structalign | https://github.com/peczenyj/structalign | 237f811ce2 | 2026-06-03 | 1.25.0 | 26/18/18 | OK |  |
| 1993 | peczenyj__xpool | https://github.com/peczenyj/xpool | 371a6d4bd6 | 2026-07-06 | 1.18 | 7/0/4 | EMPTY_GT |  |
| 1994 | pelletier__go-toml | https://github.com/pelletier/go-toml | 686c980c47 | 2026-07-18 | 1.21.0 | 1/0/0 | EMPTY_GT |  |
| 1995 | pemistahl__lingua-go | https://github.com/pemistahl/lingua-go | a440fc12f1 | 2024-12-17 | 1.18 | 16/3/7 | OK |  |
| 1996 | percolate__charlatan | https://github.com/percolate/charlatan | bae969735a | 2023-03-16 |  | 0/0/0 | EMPTY_GT |  |
| 1997 | percolate__retry | https://github.com/percolate/retry | 4b5d811bf1 | 2023-03-16 |  | 0/0/0 | EMPTY_GT |  |
| 1998 | pesos__grofer | https://github.com/pesos/grofer | 2346617648 | 2022-01-11 | 1.16 | 381/42/42 | OK |  |
| 1999 | peterbourgon__diskv | https://github.com/peterbourgon/diskv | 2566386005 | 2021-11-10 | 1.12 | 2/1/1 | OK |  |
| 2000 | peterh__liner | https://github.com/peterh/liner | 58a158787c | 2022-01-14 |  | 3/1/1 | OK |  |
| 2001 | peterstace__simplefeatures | https://github.com/peterstace/simplefeatures | 9e03a2bbab | 2026-03-30 | 1.18 | 4/2/2 | OK |  |
| 2002 | pgrwl__pgrwl | https://github.com/pgrwl/pgrwl | 09bb82a7a6 | 2026-07-16 | 1.25.0 | 78/48/48 | OK |  |
| 2003 | phelmkamp__valor | https://github.com/phelmkamp/valor | 86455b2420 | 2022-10-18 | 1.19 | 0/0/0 | EMPTY_GT |  |
| 2004 | philipjkim__goreadability | https://github.com/philipjkim/goreadability | 0f3b4a11b3 | 2019-04-22 |  | 0/0/0 | EMPTY_GT |  |
| 2005 | philippgille__chromem-go | https://github.com/philippgille/chromem-go | fbeda8ab2b | 2026-05-17 | 1.21 | 0/0/0 | EMPTY_GT |  |
| 2006 | philippgille__gokv | https://github.com/philippgille/gokv | c96b6b6bc3 | 2025-06-29 | 1.20 | 0/0/0 | EMPTY_GT |  |
| 2007 | philippgille__ln-paywall | https://github.com/philippgille/ln-paywall | 78fd1dfbf1 | 2018-10-07 |  | 0/0/0 | EMPTY_GT |  |
| 2008 | philips-labs__spiffe-vault | https://github.com/philips-labs/spiffe-vault | cacaad40a7 | 2026-07-06 | 1.25.0 | 92/24/28 | OK |  |
| 2009 | phoenix-tui__phoenix | https://github.com/phoenix-tui/phoenix | 1b34fceb05 | 2026-03-05 | 1.25.1 | 15/9/9 | OK |  |
| 2010 | phuslu__log | https://github.com/phuslu/log |  |  |  | 0/0/0 | EMPTY_GT |  |
| 2011 | piaohao__godis | https://github.com/piaohao/godis | 72d439c918 | 2020-05-12 |  | 7/1/4 | OK |  |
| 2012 | pieterclaerhout__go-finance | https://github.com/pieterclaerhout/go-finance | 9a622687f0 | 2025-09-01 | 1.13 | 8/1/5 | OK |  |
| 2013 | pieterclaerhout__go-log | https://github.com/pieterclaerhout/go-log | 0155f0a2e2 | 2026-04-07 | 1.25 | 20/7/11 | OK |  |
| 2014 | pieterclaerhout__go-waitgroup | https://github.com/pieterclaerhout/go-waitgroup | 0969bb4d15 | 2025-09-03 | 1.13 | 8/0/5 | EMPTY_GT |  |
| 2015 | piglig__go-qr | https://github.com/piglig/go-qr | 832517b8dd | 2026-05-29 | 1.21 | 7/0/4 | EMPTY_GT |  |
| 2016 | pikoci__pikoci | https://github.com/pikoci/pikoci | 487e2ef5ed | 2026-07-17 | 1.25.1 | 185/64/67 | OK |  |
| 2017 | pilosa__go-pilosa | https://github.com/pilosa/go-pilosa | 17aa03ae34 | 2022-09-27 | 1.12 | 168/5/5 | OK |  |
| 2018 | pingcap__failpoint | https://github.com/pingcap/failpoint | e764293531 | 2026-05-21 | 1.18 | 17/3/8 | OK |  |
| 2019 | pingcap__tidb | https://github.com/pingcap/tidb | b4d328faa5 | 2026-07-20 | 1.25.10 | 884/299/334 | OK |  |
| 2020 | pions__webrtc | https://github.com/pions/webrtc | 21f6d7ad2c | 2026-07-17 | 1.24.0 | 51/21/25 | OK |  |
| 2021 | pioz__countries | https://github.com/pioz/countries | 15a7eb915b | 2025-12-04 | 1.19 | 7/1/4 | OK |  |
| 2022 | pioz__faker | https://github.com/pioz/faker | bad7946682 | 2023-10-06 | 1.14 | 0/0/0 | EMPTY_GT |  |
| 2023 | pipe-cd__pipecd | https://github.com/pipe-cd/pipecd | 83568d8510 | 2026-07-20 | 1.26.2 | 555/172/198 | OK |  |
| 2024 | pixie-labs__pixie | https://github.com/pixie-labs/pixie | 77e8d9e04a | 2026-06-22 | 1.24.6 | 648/261/263 | OK |  |
| 2025 | pjebs__optimus-go | https://github.com/pjebs/optimus-go | c9dc21dd96 | 2020-05-04 |  | 0/0/0 | EMPTY_GT |  |
| 2026 | pkg__errors | https://github.com/pkg/errors | 87f8819acf | 2026-03-27 |  | 0/0/0 | EMPTY_GT |  |
| 2027 | pkg__profile | https://github.com/pkg/profile | 1ac3e9a1c6 | 2022-10-20 | 1.13 | 14/2/2 | OK |  |
| 2028 | pkg__sftp | https://github.com/pkg/sftp | fc82c354c0 | 2026-07-12 | 1.25.0 | 13/2/6 | OK |  |
| 2029 | plandem__xlsx | https://github.com/plandem/xlsx | 89ef34338a | 2019-11-02 | 1.12 | 7/1/4 | OK |  |
| 2030 | plar__go-adaptive-radix-tree | https://github.com/plar/go-adaptive-radix-tree | bdbea33ddf | 2025-11-21 | 1.18 | 7/0/4 | EMPTY_GT |  |
| 2031 | playlyfe__playlyfe-go-sdk | https://github.com/playlyfe/playlyfe-go-sdk | 882e7ae37e | 2016-03-06 |  | 0/0/0 | EMPTY_GT |  |
| 2032 | plusvic__yara | https://github.com/plusvic/yara | ed0c4a5f0c | 2020-03-13 |  | 0/0/0 | EMPTY_GT |  |
| 2033 | pocketbase__pocketbase | https://github.com/pocketbase/pocketbase | cc4e857090 | 2026-07-19 | 1.25.0 | 79/38/38 | OK |  |
| 2034 | pointlander__peg | https://github.com/pointlander/peg | 792d23c3bf | 2026-05-24 | 1.25 | 0/0/0 | EMPTY_GT |  |
| 2035 | pokanop__nostromo | https://github.com/pokanop/nostromo | 28c93b7cda | 2026-07-20 | 1.16 | 328/54/54 | OK |  |
| 2036 | polaris1119__The-Golang-Standard-Library-by-Example | https://github.com/polaris1119/The-Golang-Standard-Library-by-Example | c466fcc58c | 2022-03-06 |  | 0/0/0 | EMPTY_GT |  |
| 2037 | polera__gonameparts | https://github.com/polera/gonameparts | bfbc98e246 | 2024-09-02 | 1.23.0 | 1/0/0 | EMPTY_GT |  |
| 2038 | polera__publicip | https://github.com/polera/publicip | f0cc6bdc61 | 2016-12-28 |  | 0/0/0 | EMPTY_GT |  |
| 2039 | pomerium__pomerium | https://github.com/pomerium/pomerium | 6a8c8ccccc | 2026-07-20 | 1.26.3 | 821/308/335 | OK |  |
| 2040 | posener__client-timing | https://github.com/posener/client-timing | 693d229b26 | 2018-02-26 |  | 0/0/0 | EMPTY_GT |  |
| 2041 | posener__cmd | https://github.com/posener/cmd | 74170b4e3d | 2020-09-27 | 1.13 | 13/5/9 | OK |  |
| 2042 | posener__complete | https://github.com/posener/complete | 9a4745ac49 | 2020-12-08 | 1.13 | 9/2/6 | OK |  |
| 2043 | posener__ctxutil | https://github.com/posener/ctxutil | a8b16032bf | 2019-08-02 | 1.12 | 0/0/0 | EMPTY_GT |  |
| 2044 | posener__wstest | https://github.com/posener/wstest | 61dfd9c693 | 2020-12-30 | 1.13 | 8/1/5 | OK |  |
| 2045 | prashantgupta24__activity-tracker | https://github.com/prashantgupta24/activity-tracker | 015844e456 | 2023-10-13 | 1.21.0 | 39/18/22 | OK |  |
| 2046 | prashantgupta24__firewalld-rest | https://github.com/prashantgupta24/firewalld-rest | 1148023113 | 2020-09-03 | 1.14 | 3/2/2 | OK |  |
| 2047 | prashantgupta24__go-clip | https://github.com/prashantgupta24/go-clip | be5e51bff4 | 2021-02-05 | 1.14 | 48/21/25 | OK |  |
| 2048 | prashantgupta24__mac-sleep-notifier | https://github.com/prashantgupta24/mac-sleep-notifier | 4660ee7037 | 2019-06-17 |  | 5/0/3 | EMPTY_GT |  |
| 2049 | pravj__geopattern | https://github.com/pravj/geopattern | fe9aff9dff | 2017-05-10 |  | 0/0/0 | EMPTY_GT |  |
| 2050 | presbrey__go-multiproxy | https://github.com/presbrey/go-multiproxy | aa14babfcc | 2025-07-03 | 1.22.5 | 14/2/7 | OK |  |
| 2051 | presbrey__ollamafarm | https://github.com/presbrey/ollamafarm | 862d7f6211 | 2026-06-23 | 1.24.1 | 105/8/8 | OK |  |
| 2052 | preslavmihaylov__todocheck | https://github.com/preslavmihaylov/todocheck | 2cccefeb60 | 2026-06-13 | 1.21 | 12/8/8 | OK |  |
| 2053 | pressly__goose | https://github.com/pressly/goose | a443d13636 | 2026-06-30 | 1.25.7 | 209/75/75 | OK |  |
| 2054 | pressly__sup | https://github.com/pressly/sup | 17c751e8ca | 2022-01-21 | 1.13 | 13/5/5 | OK |  |
| 2055 | prest__prest | https://github.com/prest/prest | e158f89cfb | 2026-07-17 | 1.26.0 | 85/47/48 | OK |  |
| 2056 | primetalk__goio | https://github.com/primetalk/goio | 790da30619 | 2023-06-29 | 1.18 | 14/3/7 | OK |  |
| 2057 | prisma__prisma-client-go | https://github.com/prisma/prisma-client-go | cde7c21a18 | 2025-06-19 | 1.21 | 0/0/0 | EMPTY_GT |  |
| 2058 | profe-ajedrez__obreron | https://github.com/profe-ajedrez/obreron | a05e498faf | 2025-10-21 | 1.20 | 1/0/0 | EMPTY_GT |  |
| 2059 | progrium__darwinkit | https://github.com/progrium/darwinkit | 61b9e31a12 | 2024-07-15 | 1.18 | 2/1/1 | OK |  |
| 2060 | prometheus__prometheus | https://github.com/prometheus/prometheus | 2cf3239889 | 2026-07-18 | 1.25.8 | 0/0/0 | EMPTY_GT |  |
| 2061 | psampaz__go-mod-outdated | https://github.com/psampaz/go-mod-outdated | bb79367d10 | 2023-02-19 | 1.18 | 4/3/3 | OK |  |
| 2062 | psampaz__gothanks | https://github.com/psampaz/gothanks | 4de29d56c2 | 2023-02-18 | 1.13 | 33/5/5 | OK |  |
| 2063 | psampaz__slice | https://github.com/psampaz/slice | c5bd6e8e53 | 2020-04-09 | 1.13 | 0/0/0 | EMPTY_GT |  |
| 2064 | pterm__pterm | https://github.com/pterm/pterm | bacb2fc434 | 2026-07-11 | 1.26.0 | 30/10/14 | OK |  |
| 2065 | pupizoid__ormlite | https://github.com/pupizoid/ormlite | 52ede1f566 | 2023-01-30 | 1.19 | 8/4/7 | OK |  |
| 2066 | qeesung__image2ascii | https://github.com/qeesung/image2ascii | 4db5ededbe | 2022-07-18 |  | 0/0/0 | EMPTY_GT |  |
| 2067 | qiniu__checkstyle | https://github.com/qiniu/checkstyle | e47d31cae3 | 2018-11-22 |  | 0/0/0 | EMPTY_GT |  |
| 2068 | qiniu__goc | https://github.com/qiniu/goc | ef2d99243f | 2026-05-03 | 1.13 | 493/42/47 | OK |  |
| 2069 | qiniu__qmgo | https://github.com/qiniu/qmgo | e33480f020 | 2025-07-05 | 1.16 | 33/16/21 | OK |  |
| 2070 | qmuntal__gltf | https://github.com/qmuntal/gltf | 12f8bef4da | 2026-05-28 | 1.20 | 2/0/1 | EMPTY_GT |  |
| 2071 | qmuntal__opc | https://github.com/qmuntal/opc | 8cd781bb17 | 2023-12-01 | 1.13 | 5/0/4 | EMPTY_GT |  |
| 2072 | qmuntal__stateless | https://github.com/qmuntal/stateless | baed0e5053 | 2026-02-10 | 1.24 | 0/0/0 | EMPTY_GT |  |
| 2073 | quagmt__udecimal | https://github.com/quagmt/udecimal | c9f302d60a | 2026-06-12 | 1.23 | 0/0/0 | EMPTY_GT |  |
| 2074 | quantumcycle__metaerr | https://github.com/quantumcycle/metaerr | 1ee9b6df5e | 2026-06-15 |  | 0/0/0 | EMPTY_GT |  |
| 2075 | quii__learn-go-with-tests | https://github.com/quii/learn-go-with-tests | dc00c650f6 | 2026-05-09 | 1.24 | 4/2/3 | OK |  |
| 2076 | quii__mockingjay-server | https://github.com/quii/mockingjay-server | 7b93ee8a98 | 2021-01-15 |  | 0/0/0 | EMPTY_GT |  |
| 2077 | qustavo__sqlhooks | https://github.com/qustavo/sqlhooks | 7875602513 | 2022-04-01 | 1.13 | 21/2/8 | OK |  |
| 2078 | qvcloud__broker | https://github.com/qvcloud/broker | 4db00b70eb | 2026-01-22 | 1.24.0 | 268/75/80 | OK |  |
| 2079 | rabbitmq__amqp091-go | https://github.com/rabbitmq/amqp091-go | 1b0bfd8836 | 2026-07-17 | 1.20 | 8/0/0 | EMPTY_GT |  |
| 2080 | raeperd__kickstart.go | https://github.com/raeperd/kickstart.go | b58db9e851 | 2026-05-06 | 1.26 | 0/0/0 | EMPTY_GT |  |
| 2081 | rafael-santiago__cherry | https://github.com/rafael-santiago/cherry | 8ea42c6e96 | 2016-12-14 |  | 0/0/0 | EMPTY_GT |  |
| 2082 | rafaelespinoza__godfish | https://github.com/rafaelespinoza/godfish | 1af08d6bff | 2026-07-19 | 1.25.0 | 69/23/23 | OK |  |
| 2083 | rafaeljesus__nsq-event-bus | https://github.com/rafaeljesus/nsq-event-bus | 952354276b | 2018-02-15 |  | 0/0/0 | EMPTY_GT |  |
| 2084 | rafaeljesus__parallel-fn | https://github.com/rafaeljesus/parallel-fn | ef08331b38 | 2018-01-01 |  | 0/0/0 | EMPTY_GT |  |
| 2085 | rafaeljesus__rabbus | https://github.com/rafaeljesus/rabbus | 166a1aadf4 | 2019-07-23 |  | 0/0/0 | EMPTY_GT |  |
| 2086 | rafaeljesus__retry-go | https://github.com/rafaeljesus/retry-go | 5981a380a8 | 2017-12-14 |  | 0/0/0 | EMPTY_GT |  |
| 2087 | rafaeljesus__tempdb | https://github.com/rafaeljesus/tempdb | f0a50446b5 | 2018-02-14 |  | 0/0/0 | EMPTY_GT |  |
| 2088 | rainu__go-command-chain | https://github.com/rainu/go-command-chain | ae77396a5a | 2025-07-19 | 1.23.0 | 23/1/6 | OK |  |
| 2089 | rajnandan1__go-tripper | https://github.com/rajnandan1/go-tripper | 8d58e4f6df | 2024-04-21 | 1.15 | 0/0/0 | EMPTY_GT |  |
| 2090 | rakyll__hey | https://github.com/rakyll/hey | 5626f79b86 | 2026-01-10 | 1.24.0 | 9/2/2 | OK |  |
| 2091 | rapito__go-shopify | https://github.com/rapito/go-shopify | c35d080379 | 2020-12-03 |  | 0/0/0 | EMPTY_GT |  |
| 2092 | rapito__go-spotify | https://github.com/rapito/go-spotify | d2e340e7d1 | 2024-09-09 | 1.21.0 | 136/21/25 | OK |  |
| 2093 | raszia__gotiny | https://github.com/raszia/gotiny | 74c123087d | 2024-01-16 | 1.19 | 2/1/1 | OK |  |
| 2094 | raviqqe__muffet | https://github.com/raviqqe/muffet | 6efd92e073 | 2026-07-20 | 1.25.0 | 36/17/22 | OK |  |
| 2095 | ravsii__textra | https://github.com/ravsii/textra | 396e8f09ee | 2023-04-30 | 1.11 | 1/0/0 | EMPTY_GT |  |
| 2096 | razonyang__fastrouter | https://github.com/razonyang/fastrouter | 4fe39d269c | 2017-11-02 |  | 0/0/0 | EMPTY_GT |  |
| 2097 | rbmuller__datatrax | https://github.com/rbmuller/datatrax | 49566baf72 | 2026-05-01 | 1.21 | 1/0/0 | EMPTY_GT |  |
| 2098 | rbrahul__exception | https://github.com/rbrahul/exception | 78764b6b70 | 2022-11-21 | 1.16 | 0/0/0 | EMPTY_GT |  |
| 2099 | rbrahul__gofp | https://github.com/rbrahul/gofp | f9e8b9c247 | 2021-02-23 | 1.12 | 0/0/0 | EMPTY_GT |  |
| 2100 | rbretecher__go-postman-collection | https://github.com/rbretecher/go-postman-collection | 093c43487f | 2022-09-20 | 1.16 | 10/0/4 | EMPTY_GT |  |
| 2101 | rdrdr__hamcrest | https://github.com/rdrdr/hamcrest | a7d1dd0747 | 2021-01-07 |  | 0/0/0 | EMPTY_GT |  |
| 2102 | reaganiwadha__grapher | https://github.com/reaganiwadha/grapher | e314017681 | 2023-07-21 | 1.18 | 27/1/12 | OK |  |
| 2103 | recoilme__pudge | https://github.com/recoilme/pudge | da7284d192 | 2020-04-13 | 1.13 | 1/0/0 | EMPTY_GT |  |
| 2104 | recolude__unitpacking | https://github.com/recolude/unitpacking | a8c8274cb2 | 2021-04-17 | 1.15 | 10/2/6 | OK |  |
| 2105 | redis__go-redis | https://github.com/redis/go-redis | 24a75d0c51 | 2026-07-20 | 1.24 | 12/4/6 | OK |  |
| 2106 | reedom__convergen | https://github.com/reedom/convergen | fffd19dbd6 | 2025-09-20 | 1.24.0 | 16/4/9 | OK |  |
| 2107 | reeflective__console | https://github.com/reeflective/console | 738e5de256 | 2026-07-18 | 1.25.0 | 34/11/11 | OK |  |
| 2108 | reeflective__readline | https://github.com/reeflective/readline | d3aedcb78a | 2026-07-06 | 1.25.0 | 13/2/4 | OK |  |
| 2109 | rekby__fastuuid | https://github.com/rekby/fastuuid | fa245d94bd | 2023-02-28 | 1.20 | 8/1/5 | OK |  |
| 2110 | rekby__fixenv | https://github.com/rekby/fixenv | 26396019f0 | 2025-10-25 | 1.18 | 0/0/0 | EMPTY_GT |  |
| 2111 | rekby__lets-proxy2 | https://github.com/rekby/lets-proxy2 | 0c9cbf03c2 | 2024-04-01 | 1.18 | 125/43/43 | OK |  |
| 2112 | rekby__objwalker | https://github.com/rekby/objwalker | 5a696cd984 | 2022-03-04 | 1.17 | 7/0/4 | EMPTY_GT |  |
| 2113 | rekurt__go-propisyu | https://github.com/rekurt/go-propisyu | 70e75e2b71 | 2026-05-21 | 1.22.0 | 8/1/5 | OK |  |
| 2114 | rekurt__gost-crypto | https://github.com/rekurt/gost-crypto | af0b48e285 | 2026-04-10 | 1.22 | 0/0/0 | EMPTY_GT |  |
| 2115 | rekurt__ymsdk | https://github.com/rekurt/ymsdk | e2844cec25 | 2026-04-08 | 1.25.1 | 9/2/2 | OK |  |
| 2116 | relvacode__iso8601 | https://github.com/relvacode/iso8601 | 4ccd8a875d | 2025-09-12 | 1.13 | 1/0/0 | EMPTY_GT |  |
| 2117 | repeale__fp-go | https://github.com/repeale/fp-go | 5ac218abab | 2022-12-01 | 1.18 | 0/0/0 | EMPTY_GT |  |
| 2118 | restic__restic | https://github.com/restic/restic | d4088aa09b | 2026-07-15 | 1.25.8 | 285/85/86 | OK |  |
| 2119 | reugn__async | https://github.com/reugn/async | 533dc33a7b | 2026-01-23 | 1.23.0 | 1/0/0 | EMPTY_GT |  |
| 2120 | reugn__equalizer | https://github.com/reugn/equalizer | 11d4adaf94 | 2024-03-14 | 1.19 | 0/0/0 | EMPTY_GT |  |
| 2121 | reugn__go-quartz | https://github.com/reugn/go-quartz | 139dd89318 | 2026-01-20 | 1.21 | 1/0/0 | EMPTY_GT |  |
| 2122 | reugn__go-streams | https://github.com/reugn/go-streams | 86444ed50e | 2026-01-14 | 1.21.0 | 1/0/0 | EMPTY_GT |  |
| 2123 | reugn__wifiqr | https://github.com/reugn/wifiqr | a506070cf7 | 2025-12-06 | 1.18 | 14/5/5 | OK |  |
| 2124 | revel__revel | https://github.com/revel/revel | b053175279 | 2022-04-12 | 1.17 | 28/17/21 | OK |  |
| 2125 | rexrun-dev__rex | https://github.com/rexrun-dev/rex | 1c4c5c7646 | 2026-05-29 | 1.23 | 1/0/0 | EMPTY_GT |  |
| 2126 | rezmoss__axios4go | https://github.com/rezmoss/axios4go | 21204c8246 | 2026-07-16 | 1.22.5 | 0/0/0 | EMPTY_GT |  |
| 2127 | rfberaldo__sqlz | https://github.com/rfberaldo/sqlz | 3015f2d14b | 2026-07-08 | 1.24 | 25/0/13 | EMPTY_GT |  |
| 2128 | rhnvrm__simples3 | https://github.com/rhnvrm/simples3 | 57fa0ece6f | 2026-01-23 | 1.25.0 | 1/0/0 | EMPTY_GT |  |
| 2129 | rhosocial__go-dag | https://github.com/rhosocial/go-dag | f315808775 | 2024-08-15 | 1.20 | 0/0/0 | EMPTY_GT |  |
| 2130 | rhymond__go-money | https://github.com/rhymond/go-money | b43ce49343 | 2025-04-30 | 1.13 | 1/0/0 | EMPTY_GT |  |
| 2131 | ricardolonga__jsongo | https://github.com/ricardolonga/jsongo | 459112a802 | 2016-12-15 |  | 0/0/0 | EMPTY_GT |  |
| 2132 | richardwilkes__unison | https://github.com/richardwilkes/unison | 6ca859a7e0 | 2026-07-12 | 1.26.0 | 25/14/14 | OK |  |
| 2133 | rickb777__date | https://github.com/rickb777/date | 28fb6ebb48 | 2026-06-04 | 1.25.0 | 11/4/4 | OK |  |
| 2134 | rinchsan__device-check-go | https://github.com/rinchsan/device-check-go | 57eb89b7b3 | 2023-09-24 | 1.21 | 7/2/2 | OK |  |
| 2135 | rjNemo__underscore | https://github.com/rjNemo/underscore | a29f64b700 | 2025-11-16 | 1.24.2 | 7/0/4 | EMPTY_GT |  |
| 2136 | rjeczalik__interfaces | https://github.com/rjeczalik/interfaces | 4586dfff9f | 2025-06-03 | 1.18 | 7/1/1 | OK |  |
| 2137 | rjeczalik__notify | https://github.com/rjeczalik/notify | 6f12d5684f | 2026-06-01 | 1.26 | 2/1/1 | OK |  |
| 2138 | rjohnsondev__golibstemmer | https://github.com/rjohnsondev/golibstemmer | 1bbcbebdf6 | 2014-06-17 |  | 0/0/0 | EMPTY_GT |  |
| 2139 | rjohnsondev__vim-compiler-go | https://github.com/rjohnsondev/vim-compiler-go | 4aad97aad2 | 2016-06-29 |  | 0/0/0 | EMPTY_GT |  |
| 2140 | rk__go-cron | https://github.com/rk/go-cron | e0dd106ca1 | 2020-02-10 |  | 0/0/0 | EMPTY_GT |  |
| 2141 | rkoesters__xdg | https://github.com/rkoesters/xdg | 7fe7ddaf8d | 2025-12-28 | 1.13 | 1/0/0 | EMPTY_GT |  |
| 2142 | rlmcpherson__s3gof3r | https://github.com/rlmcpherson/s3gof3r | 864ae0bf7c | 2017-02-09 |  | 0/0/0 | EMPTY_GT |  |
| 2143 | rluders__canery | https://github.com/rluders/canery | 7ad684e3bb | 2026-06-09 | 1.24.2 | 1/0/0 | EMPTY_GT |  |
| 2144 | rluders__httpsuite | https://github.com/rluders/httpsuite | 9b55b5ec3e | 2026-04-30 | 1.23 | 0/0/0 | EMPTY_GT |  |
| 2145 | robfig__bind | https://github.com/robfig/bind | 2e935d3717 | 2014-08-16 |  | 0/0/0 | EMPTY_GT |  |
| 2146 | robfig__soy | https://github.com/robfig/soy | c50f1b6ba7 | 2024-03-19 | 1.12 | 26/4/8 | OK |  |
| 2147 | robinjoseph08__go-pg-migrations | https://github.com/robinjoseph08/go-pg-migrations | 90f793c832 | 2024-10-17 | 1.23 | 75/11/15 | OK |  |
| 2148 | robinjoseph08__redisqueue | https://github.com/robinjoseph08/redisqueue | 195b427f6d | 2020-10-15 | 1.12 | 41/2/6 | OK |  |
| 2149 | roblaszczak__go-cleanarch | https://github.com/roblaszczak/go-cleanarch | 03b96056c4 | 2021-11-08 | 1.11 | 0/0/0 | EMPTY_GT |  |
| 2150 | roblillack__spot | https://github.com/roblillack/spot | c3aafeeacd | 2024-12-19 | 1.21 | 4/1/1 | OK |  |
| 2151 | rocketlaunchr__dataframe-go | https://github.com/rocketlaunchr/dataframe-go | a103044415 | 2021-10-25 | 1.15 | 198/45/48 | OK |  |
| 2152 | rocketlaunchr__dbq | https://github.com/rocketlaunchr/dbq | edab5e1151 | 2021-02-23 | 1.12 | 78/5/7 | OK |  |
| 2153 | rocketlaunchr__igo | https://github.com/rocketlaunchr/igo | 5a545e806e | 2020-04-06 |  | 0/0/0 | EMPTY_GT |  |
| 2154 | rogeralsing__gophers | https://github.com/rogeralsing/gophers | 29f32b14c6 | 2020-08-06 |  | 0/0/0 | EMPTY_GT |  |
| 2155 | rogerwelin__cassowary | https://github.com/rogerwelin/cassowary | a5d2be1dc5 | 2025-07-21 | 1.24 | 134/33/33 | OK |  |
| 2156 | romshark__jscan | https://github.com/romshark/jscan | 6712838b7a | 2024-01-19 | 1.21 | 11/0/4 | EMPTY_GT |  |
| 2157 | romshark__sched | https://github.com/romshark/sched | 4f9dc6985c | 2025-02-01 | 1.23 | 16/3/7 | OK |  |
| 2158 | romshark__yamagiconf | https://github.com/romshark/yamagiconf | d8dd75d3d5 | 2026-07-11 | 1.25.0 | 24/9/12 | OK |  |
| 2159 | rookie-ninja__rk-boot | https://github.com/rookie-ninja/rk-boot | 4649c40d1f | 2024-10-04 | 1.18 | 169/34/37 | OK |  |
| 2160 | rookie-ninja__rk-gin | https://github.com/rookie-ninja/rk-gin | 0d3710f191 | 2024-04-09 | 1.18 | 213/67/70 | OK |  |
| 2161 | rookie-ninja__rk-grpc | https://github.com/rookie-ninja/rk-grpc | 5518537a36 | 2023-10-31 | 1.18 | 432/61/65 | OK |  |
| 2162 | rookii__paicehusk | https://github.com/rookii/paicehusk | d62367ab30 | 2013-06-19 |  | 0/0/0 | EMPTY_GT |  |
| 2163 | root-gg__plik | https://github.com/root-gg/plik | 8dd88a8827 | 2026-07-07 | 1.26.1 | 349/113/113 | OK |  |
| 2164 | roseduan__rosedb | https://github.com/roseduan/rosedb | bcb43052ad | 2026-02-09 | 1.21 | 18/6/10 | OK |  |
| 2165 | rotisserie__eris | https://github.com/rotisserie/eris | d09d47a03c | 2025-04-03 | 1.18 | 1/0/0 | EMPTY_GT |  |
| 2166 | roylee0704__gron | https://github.com/roylee0704/gron | e78485adab | 2016-06-21 |  | 0/0/0 | EMPTY_GT |  |
| 2167 | rqlite__gorqlite | https://github.com/rqlite/gorqlite | 50d445fd0a | 2026-05-04 | 1.17 | 1/0/0 | EMPTY_GT |  |
| 2168 | rqlite__rqlite | https://github.com/rqlite/rqlite | 3fcb681520 | 2026-07-20 | 1.26 | 212/84/84 | OK |  |
| 2169 | rs__cors | https://github.com/rs/cors | 2f30c9cf77 | 2026-06-04 | 1.23.0 | 1/0/0 | EMPTY_GT |  |
| 2170 | rs__formjson | https://github.com/rs/formjson | 2efca5adca | 2015-12-17 |  | 0/0/0 | EMPTY_GT |  |
| 2171 | rs__xid | https://github.com/rs/xid | 643d1614ad | 2026-03-08 | 1.16 | 0/0/0 | EMPTY_GT |  |
| 2172 | rs__xlog | https://github.com/rs/xlog | 131980fab9 | 2017-12-27 |  | 0/0/0 | EMPTY_GT |  |
| 2173 | rs__xmux | https://github.com/rs/xmux | d379109ea9 | 2017-06-09 |  | 0/0/0 | EMPTY_GT |  |
| 2174 | rs__zerolog | https://github.com/rs/zerolog | 5e6bfa3a05 | 2026-07-20 | 1.23 | 8/6/6 | OK |  |
| 2175 | rsjethani__secret | https://github.com/rsjethani/secret | 7d759130a9 | 2024-08-16 | 1.16 | 1/0/0 | EMPTY_GT |  |
| 2176 | rsteube__carapace-bin | https://github.com/rsteube/carapace-bin | 9436d98f2f | 2026-07-20 | 1.26.2 | 28/17/17 | OK |  |
| 2177 | rsteube__carapace-spec | https://github.com/rsteube/carapace-spec | 0146365d8f | 2026-07-13 | 1.24 | 21/5/5 | OK |  |
| 2178 | rsteube__carapace | https://github.com/rsteube/carapace | 344f1881bf | 2026-07-17 | 1.24 | 12/4/4 | OK |  |
| 2179 | rubenv__sql-migrate | https://github.com/rubenv/sql-migrate | 66d85c159f | 2026-07-14 | 1.25.0 | 72/30/34 | OK |  |
| 2180 | rubyist__circuitbreaker | https://github.com/rubyist/circuitbreaker | aa1899571b | 2024-05-15 | 1.21.6 | 4/2/3 | OK |  |
| 2181 | rueian__rueidis | https://github.com/rueian/rueidis | 256d25aa96 | 2026-07-19 | 1.25.0 | 38/1/6 | OK |  |
| 2182 | rulego__rulego | https://github.com/rulego/rulego | 06ea606ab6 | 2026-07-13 | 1.20 | 38/18/18 | OK |  |
| 2183 | rulego__streamsql | https://github.com/rulego/streamsql | a323fe7a73 | 2026-07-14 | 1.18 | 8/1/5 | OK |  |
| 2184 | rushteam__gosql | https://github.com/rushteam/gosql | 9f102bdc06 | 2021-06-21 | 1.13 | 3/1/2 | OK |  |
| 2185 | russross__blackfriday | https://github.com/russross/blackfriday | e96880f42b | 2020-10-26 | 1.13 | 0/0/0 | EMPTY_GT |  |
| 2186 | ryanbressler__CloudForest | https://github.com/ryanbressler/CloudForest |  |  |  | 0/0/0 | EMPTY_GT |  |
| 2187 | rylans__getlang | https://github.com/rylans/getlang | 9e7f44ff8a | 2020-12-26 |  | 0/0/0 | EMPTY_GT |  |
| 2188 | s0ders__go-semver-release | https://github.com/s0ders/go-semver-release | 81e437961f | 2026-04-23 | 1.25.3 | 71/36/39 | OK |  |
| 2189 | s0rg__crawley | https://github.com/s0rg/crawley | abf09cdfa9 | 2026-06-12 | 1.26 | 10/4/4 | OK |  |
| 2190 | s0rg__decompose | https://github.com/s0rg/decompose | de6c01882f | 2026-06-13 | 1.26 | 70/26/26 | OK |  |
| 2191 | s0rg__fantasyname | https://github.com/s0rg/fantasyname | 1a63cadab4 | 2025-10-26 | 1.25 | 5/1/1 | OK |  |
| 2192 | s0rg__grid | https://github.com/s0rg/grid | d740b2d8c9 | 2025-12-09 | 1.25 | 13/6/6 | OK |  |
| 2193 | s0rg__quadtree | https://github.com/s0rg/quadtree | 97508e2359 | 2025-04-25 | 1.24 | 1/0/0 | EMPTY_GT |  |
| 2194 | sadlil__go-trigger | https://github.com/sadlil/go-trigger | cfc3d83007 | 2017-03-28 |  | 0/0/0 | EMPTY_GT |  |
| 2195 | safedep__vet | https://github.com/safedep/vet | 7517804791 | 2026-07-03 | 1.26.2 | 1133/437/437 | OK |  |
| 2196 | sagikazarmark__modern-go-application | https://github.com/sagikazarmark/modern-go-application | 468a20bc42 | 2023-04-06 | 1.17 | 290/82/86 | OK |  |
| 2197 | saivedant169__AegisFlow | https://github.com/saivedant169/AegisFlow | 21815608d1 | 2026-07-09 | 1.26.5 | 166/69/72 | OK |  |
| 2198 | sajjadrabiee__go-constant | https://github.com/sajjadrabiee/go-constant | c56b7f09db | 2026-05-18 | 1.18 | 1/0/0 | EMPTY_GT |  |
| 2199 | sakirsensoy__genv | https://github.com/sakirsensoy/genv | ef5a961969 | 2026-01-27 | 1.12 | 1/0/0 | EMPTY_GT |  |
| 2200 | saleh-rahimzadeh__go-words | https://github.com/saleh-rahimzadeh/go-words | cc5e48be53 | 2024-02-26 | 1.18 | 0/0/0 | EMPTY_GT |  |
| 2201 | samber__do | https://github.com/samber/do | 3e69e7e612 | 2026-07-20 | 1.18 | 88/1/6 | OK |  |
| 2202 | samber__lo | https://github.com/samber/lo | bb6e455184 | 2026-07-16 | 1.18 | 19/1/7 | OK |  |
| 2203 | samber__mo | https://github.com/samber/mo | fd7b19869f | 2026-07-02 | 1.18 | 17/4/5 | OK |  |
| 2204 | samber__oops | https://github.com/samber/oops | 74199a37e4 | 2026-07-05 | 1.21 | 77/5/10 | OK |  |
| 2205 | samber__ro | https://github.com/samber/ro | 5128dcf4bc | 2026-07-05 | 1.18 | 128/3/8 | OK |  |
| 2206 | samber__slog-formatter | https://github.com/samber/slog-formatter | d94259276f | 2026-07-01 | 1.22 | 19/4/10 | OK |  |
| 2207 | samber__slog-multi | https://github.com/samber/slog-multi | 496352db98 | 2026-07-01 | 1.22 | 29/3/8 | OK |  |
| 2208 | samuelcouch__clarifai | https://github.com/samuelcouch/clarifai |  |  |  | 0/0/0 | CLONE_FAIL |  |
| 2209 | sanathp__statusok | https://github.com/sanathp/statusok | da193355ee | 2020-01-31 |  | 0/0/0 | EMPTY_GT |  |
| 2210 | sanbornm__go-selfupdate | https://github.com/sanbornm/go-selfupdate | e1c03e3d6a | 2023-07-14 | 1.15 | 2/1/1 | OK |  |
| 2211 | sanbornm__mp | https://github.com/sanbornm/mp | 9d110a3ca6 | 2016-05-11 |  | 0/0/0 | EMPTY_GT |  |
| 2212 | sanketplus__go-mysql-lock | https://github.com/sanketplus/go-mysql-lock | db609c2b69 | 2024-03-31 | 1.13 | 21/0/6 | EMPTY_GT |  |
| 2213 | sashabaranov__go-openai | https://github.com/sashabaranov/go-openai | 5d7a276f4c | 2025-10-21 | 1.18 | 1/0/0 | EMPTY_GT |  |
| 2214 | sashamelentyev__usestdlibvars | https://github.com/sashamelentyev/usestdlibvars | 34f2c0b85e | 2025-05-24 | 1.23.0 | 9/3/3 | OK |  |
| 2215 | savsgio__atreugo | https://github.com/savsgio/atreugo | fcff521521 | 2025-01-02 | 1.21 | 15/7/8 | OK |  |
| 2216 | sbabiv__rmqconn | https://github.com/sbabiv/rmqconn | b2da70fe09 | 2020-01-27 |  | 0/0/0 | EMPTY_GT |  |
| 2217 | sbabiv__xml2map | https://github.com/sbabiv/xml2map | 4e66bcede1 | 2021-12-07 | 1.17 | 0/0/0 | EMPTY_GT |  |
| 2218 | sbstjn__allot | https://github.com/sbstjn/allot | 1f2349af5c | 2016-10-25 |  | 0/0/0 | EMPTY_GT |  |
| 2219 | scaleway__scaleway-cli | https://github.com/scaleway/scaleway-cli | 281b05c92f | 2026-07-20 | 1.26.0 | 653/194/194 | OK |  |
| 2220 | schigh__circuit | https://github.com/schigh/circuit | efb5b52049 | 2026-03-29 | 1.22 | 1/0/0 | EMPTY_GT |  |
| 2221 | schigh__health | https://github.com/schigh/health | fabf7b6902 | 2026-03-29 | 1.22.0 | 1/0/0 | EMPTY_GT |  |
| 2222 | schigh__str | https://github.com/schigh/str | 935c86c997 | 2026-03-29 | 1.24 | 1/0/0 | EMPTY_GT |  |
| 2223 | schollz__croc | https://github.com/schollz/croc | 64230d7c22 | 2026-07-20 | 1.25.0 | 49/25/29 | OK |  |
| 2224 | schollz__peerdiscovery | https://github.com/schollz/peerdiscovery | e0ee252378 | 2025-01-09 | 1.13 | 19/2/6 | OK |  |
| 2225 | schollz__progressbar | https://github.com/schollz/progressbar | 87dbc50586 | 2026-07-17 | 1.25.0 | 15/5/11 | OK |  |
| 2226 | schuyler__neural-go | https://github.com/schuyler/neural-go | cc57accbc7 | 2013-10-18 |  | 0/0/0 | EMPTY_GT |  |
| 2227 | scigolib__hdf5 | https://github.com/scigolib/hdf5 | 8223748b68 | 2026-06-25 | 1.25 | 7/0/4 | EMPTY_GT |  |
| 2228 | scigolib__matlab | https://github.com/scigolib/matlab | 9bab1cf936 | 2026-04-05 | 1.25 | 8/1/5 | OK |  |
| 2229 | sciter-sdk__go-sciter | https://github.com/sciter-sdk/go-sciter | 7f18ada7f2 | 2022-04-04 |  | 0/0/0 | EMPTY_GT |  |
| 2230 | scraly__gophers | https://github.com/scraly/gophers | 94a42e5dae | 2024-03-24 |  | 0/0/0 | EMPTY_GT |  |
| 2231 | scryinfo__dp | https://github.com/scryinfo/dp | f60bf89138 | 2021-06-22 | 1.12 | 155/0/0 | EMPTY_GT |  |
| 2232 | sdcoffey__techan | https://github.com/sdcoffey/techan | 308e0506aa | 2026-05-29 | 1.21 | 8/5/5 | OK |  |
| 2233 | sdqri__effdsl | https://github.com/sdqri/effdsl | 05b936e577 | 2026-02-12 | 1.18 | 7/0/4 | EMPTY_GT |  |
| 2234 | sdrapkin__guid | https://github.com/sdrapkin/guid | 11de455242 | 2026-07-08 | 1.24 | 2/1/1 | OK |  |
| 2235 | seanhagen__bradleyterry | https://github.com/seanhagen/bradleyterry | b73d7e0599 | 2019-05-02 |  | 0/0/0 | EMPTY_GT |  |
| 2236 | sebest__logrusly | https://github.com/sebest/logrusly | 3235eccb8e | 2018-03-15 |  | 0/0/0 | EMPTY_GT |  |
| 2237 | sebest__xff | https://github.com/sebest/xff | 671bd2870b | 2021-01-05 |  | 0/0/0 | EMPTY_GT |  |
| 2238 | seborama__fuego | https://github.com/seborama/fuego | 2a4f136156 | 2024-04-13 | 1.20 | 12/3/7 | OK |  |
| 2239 | seborama__govcr | https://github.com/seborama/govcr | bb8afa156d | 2026-04-25 | 1.25.0 | 34/16/28 | OK |  |
| 2240 | segmentio__golines | https://github.com/segmentio/golines | b3563a8030 | 2025-12-19 | 1.23.0 | 48/18/21 | OK |  |
| 2241 | seiflotfy__count-min-log | https://github.com/seiflotfy/count-min-log | 8f4a18cb3e | 2025-03-04 | 1.23.4 | 2/1/1 | OK |  |
| 2242 | seiflotfy__cuckoofilter | https://github.com/seiflotfy/cuckoofilter | a2f2c23f17 | 2024-07-15 | 1.15 | 8/1/5 | OK |  |
| 2243 | seiflotfy__skizze | https://github.com/seiflotfy/skizze |  |  |  | 0/0/0 | CLONE_FAIL |  |
| 2244 | semihalev__sdns | https://github.com/semihalev/sdns | 6f745fef3c | 2026-07-19 | 1.26.0 | 113/64/66 | OK |  |
| 2245 | sendgrid__sendgrid-go | https://github.com/sendgrid/sendgrid-go | 0f2bb79e71 | 2025-05-29 |  | 0/0/0 | EMPTY_GT |  |
| 2246 | senselogic__GENERIS | https://github.com/senselogic/GENERIS | 4af7d2827a | 2022-02-22 |  | 0/0/0 | EMPTY_GT |  |
| 2247 | sensepost__gowitness | https://github.com/sensepost/gowitness | 4f562901bc | 2026-04-22 | 1.26 | 152/89/89 | OK |  |
| 2248 | sensorbee__sensorbee | https://github.com/sensorbee/sensorbee | 0ca330a68d | 2019-11-04 |  | 0/0/0 | EMPTY_GT |  |
| 2249 | sergiotapia__smitego | https://github.com/sergiotapia/smitego | 9654c6fc47 | 2014-07-18 |  | 0/0/0 | EMPTY_GT |  |
| 2250 | sethgrid__pester | https://github.com/sethgrid/pester | 32a1beba19 | 2022-02-09 | 1.14 | 1/0/0 | EMPTY_GT |  |
| 2251 | sgreben__flagvar | https://github.com/sgreben/flagvar | d9853b6c1b | 2024-09-26 | 1.23 | 2/1/1 | OK |  |
| 2252 | sgreben__piecewiselinear | https://github.com/sgreben/piecewiselinear | 2e5d3add2f | 2023-12-10 | 1.15 | 0/0/0 | EMPTY_GT |  |
| 2253 | sgrodriguez__ddt | https://github.com/sgrodriguez/ddt | e7992d4767 | 2021-01-24 | 1.15 | 0/0/0 | EMPTY_GT |  |
| 2254 | shabbyrobe__xmlwriter | https://github.com/shabbyrobe/xmlwriter | 2fcb527632 | 2025-11-28 | 1.13 | 3/1/1 | OK |  |
| 2255 | shady831213__algorithms | https://github.com/shady831213/algorithms | 393222b971 | 2019-04-03 |  | 1/0/0 | EMPTY_GT |  |
| 2256 | shafreeck__retry | https://github.com/shafreeck/retry | ed002877bb | 2020-02-11 | 1.12 | 1/0/0 | EMPTY_GT |  |
| 2257 | shaj13__go-guardian | https://github.com/shaj13/go-guardian | c25c80fad8 | 2024-07-25 | 1.13 | 95/19/25 | OK |  |
| 2258 | shalakhin__gophericons | https://github.com/shalakhin/gophericons | 7eeaebf0e2 | 2018-03-24 |  | 0/0/0 | EMPTY_GT |  |
| 2259 | shenwei356__taxonkit | https://github.com/shenwei356/taxonkit | 3f5c671524 | 2026-07-16 | 1.25.5 | 75/31/31 | OK |  |
| 2260 | sherifabdlnaby__configuro | https://github.com/sherifabdlnaby/configuro | 3fd2d377fb | 2022-09-25 |  | 116/23/23 | OK |  |
| 2261 | shettyh__threadpool | https://github.com/shettyh/threadpool | b99fd8aaa9 | 2020-03-23 | 1.14 | 1/0/0 | EMPTY_GT |  |
| 2262 | shinagawa-web__gomarklint | https://github.com/shinagawa-web/gomarklint | 180c7a8274 | 2026-07-17 | 1.25.0 | 13/4/4 | OK |  |
| 2263 | shirou__gopsutil | https://github.com/shirou/gopsutil | 80c6e48e61 | 2026-07-21 | 1.24.0 | 17/3/7 | OK |  |
| 2264 | shockerli__cvt | https://github.com/shockerli/cvt | 147e4a498d | 2024-11-30 | 1.13 | 1/0/0 | EMPTY_GT |  |
| 2265 | shomali11__gridder | https://github.com/shomali11/gridder | 5f3b82d745 | 2021-09-30 | 1.14 | 11/3/7 | OK |  |
| 2266 | shomali11__util | https://github.com/shomali11/util | f0771b7094 | 2022-07-17 | 1.14 | 5/1/4 | OK |  |
| 2267 | shomali11__xredis | https://github.com/shomali11/xredis | 0b54a6bbf4 | 2019-06-08 |  | 7/2/6 | OK |  |
| 2268 | shoobyban__sshman | https://github.com/shoobyban/sshman | 8a5e7edacf | 2026-06-27 | 1.25.0 | 177/9/13 | OK |  |
| 2269 | shopify__toxiproxy | https://github.com/shopify/toxiproxy | 91b151c73c | 2026-07-15 | 1.23.0 | 53/21/21 | OK |  |
| 2270 | shopspring__decimal | https://github.com/shopspring/decimal | 3090cc487f | 2026-06-29 | 1.10 | 0/0/0 | EMPTY_GT |  |
| 2271 | shoriwe__fullproxy | https://github.com/shoriwe/fullproxy | 79d8f0925a | 2023-06-12 | 1.20 | 64/38/38 | OK |  |
| 2272 | shpota__goxygen | https://github.com/shpota/goxygen | 47ce691cfa | 2024-12-18 | 1.21 | 1/0/0 | EMPTY_GT |  |
| 2273 | shubhamzanwar__design-patterns | https://github.com/shubhamzanwar/design-patterns | 943e6136ba | 2023-01-03 |  | 0/0/0 | EMPTY_GT |  |
| 2274 | shurcooL__Go-Package-Store | https://github.com/shurcooL/Go-Package-Store | d13d54834e | 2023-07-10 | 1.19 | 1/0/0 | EMPTY_GT |  |
| 2275 | shurcooL__githubql | https://github.com/shurcooL/githubql | 2402fdf4a9 | 2026-02-08 | 1.19 | 4/2/2 | OK |  |
| 2276 | shurcooL__gostatus | https://github.com/shurcooL/gostatus | bc14c17aeb | 2025-05-18 | 1.19 | 7/6/6 | OK |  |
| 2277 | shurcooL__trayhost | https://github.com/shurcooL/trayhost | e0155a1cc8 | 2023-07-12 | 1.19 | 0/0/0 | EMPTY_GT |  |
| 2278 | shurcooL__vfsgen | https://github.com/shurcooL/vfsgen | 0000e147ea | 2023-07-04 | 1.19 | 13/1/5 | OK |  |
| 2279 | siddontang__go-log | https://github.com/siddontang/go-log | 1e957dd83b | 2019-02-21 |  | 0/0/0 | EMPTY_GT |  |
| 2280 | siddontang__go-mysql | https://github.com/siddontang/go-mysql | ad661cb5b8 | 2026-07-15 | 1.25.0 | 42/21/22 | OK |  |
| 2281 | siddontang__ledisdb | https://github.com/siddontang/ledisdb | d35789ec47 | 2020-05-10 | 1.12 | 35/13/13 | OK |  |
| 2282 | sideshow__apns2 | https://github.com/sideshow/apns2 | 65966ee917 | 2025-07-22 | 1.18 | 19/7/11 | OK |  |
| 2283 | sigstore__cosign | https://github.com/sigstore/cosign | d6857f227c | 2026-07-20 | 1.26.0 | 788/258/262 | OK |  |
| 2284 | sillecelik__go-gopher | https://github.com/sillecelik/go-gopher | 30186d3e08 | 2025-01-28 |  | 0/0/0 | EMPTY_GT |  |
| 2285 | simonnilsson__ask | https://github.com/simonnilsson/ask | 1373413dac | 2026-07-04 | 1.17 | 1/0/0 | EMPTY_GT |  |
| 2286 | simukti__sqldb-logger | https://github.com/simukti/sqldb-logger | 646c1a0755 | 2023-01-08 | 1.17 | 0/0/0 | EMPTY_GT |  |
| 2287 | sindresorhus__awesome | https://github.com/sindresorhus/awesome | 7cb5c8371c | 2026-06-30 |  | 0/0/0 | EMPTY_GT |  |
| 2288 | sinhashubham95__bleep | https://github.com/sinhashubham95/bleep | 69630fa8d4 | 2021-01-06 | 1.15 | 2/1/1 | OK |  |
| 2289 | sinhashubham95__go-actuator | https://github.com/sinhashubham95/go-actuator | 9ad6b9e3ab | 2025-03-19 | 1.16 | 11/3/7 | OK |  |
| 2290 | sinhashubham95__jsonic | https://github.com/sinhashubham95/jsonic | ce3f9dde43 | 2021-01-15 | 1.15 | 11/0/4 | EMPTY_GT |  |
| 2291 | sinhashubham95__moxy | https://github.com/sinhashubham95/moxy | d0dd21806f | 2022-05-17 | 1.16 | 40/21/25 | OK |  |
| 2292 | sipin__gorazor | https://github.com/sipin/gorazor | ce27319e59 | 2026-06-01 | 1.12 | 0/0/0 | EMPTY_GT |  |
| 2293 | sirnewton01__godbg | https://github.com/sirnewton01/godbg | 46f41e62cb | 2018-07-09 |  | 0/0/0 | EMPTY_GT |  |
| 2294 | sixafter__aes-ctr-drbg | https://github.com/sixafter/aes-ctr-drbg | 1fd57164d9 | 2026-06-29 | 1.26 | 8/0/5 | EMPTY_GT |  |
| 2295 | sj14__dbbench | https://github.com/sj14/dbbench | b723fecc90 | 2026-07-02 | 1.25.8 | 248/62/67 | OK |  |
| 2296 | sjwhitworth__golearn | https://github.com/sjwhitworth/golearn | 74ae077eaf | 2022-12-28 | 1.15 | 0/0/0 | EMPTY_GT |  |
| 2297 | skanehira__gjo | https://github.com/skanehira/gjo | 15ee8be380 | 2020-04-23 | 1.12 | 1/0/0 | EMPTY_GT |  |
| 2298 | skeema__skeema | https://github.com/skeema/skeema | 926b4786aa | 2026-07-18 | 1.25.0 | 15/9/9 | OK |  |
| 2299 | skelterjohn__geom | https://github.com/skelterjohn/geom | 96f3e8a219 | 2018-01-03 |  | 0/0/0 | EMPTY_GT |  |
| 2300 | skibish__ddns | https://github.com/skibish/ddns | 4f19dd5467 | 2025-05-01 | 1.24 | 120/17/18 | OK |  |
| 2301 | skovtunenko__graterm | https://github.com/skovtunenko/graterm | a294de03ba | 2025-02-23 | 1.20 | 8/0/1 | EMPTY_GT |  |
| 2302 | slack-go__slack | https://github.com/slack-go/slack | 03b520326d | 2026-07-20 | 1.25 | 9/1/6 | OK |  |
| 2303 | slack-io__slacker | https://github.com/slack-io/slacker | 15e051adfa | 2024-11-15 | 1.21 | 13/5/5 | OK |  |
| 2304 | slipros__roamer | https://github.com/slipros/roamer | 0fd2ae550a | 2026-05-27 | 1.23.0 | 18/11/11 | OK |  |
| 2305 | slotix__dataflowkit | https://github.com/slotix/dataflowkit | d33463d173 | 2020-06-12 | 1.13 | 52/32/35 | OK |  |
| 2306 | smallnest__go-web-framework-benchmark | https://github.com/smallnest/go-web-framework-benchmark | 30dd41275b | 2026-07-14 | 1.26.5 | 278/128/128 | OK |  |
| 2307 | smallnest__langgraphgo | https://github.com/smallnest/langgraphgo | 8babee09de | 2026-07-16 | 1.25.0 | 351/50/56 | OK |  |
| 2308 | smallnest__rpcx | https://github.com/smallnest/rpcx | 397d85be7f | 2026-07-07 | 1.26.0 | 187/49/55 | OK |  |
| 2309 | smancke__guble | https://github.com/smancke/guble | 83e654d595 | 2017-10-31 |  | 0/0/0 | EMPTY_GT |  |
| 2310 | smartystreets__goconvey | https://github.com/smartystreets/goconvey | a50310f1e3 | 2024-03-05 | 1.21.7 | 25/4/4 | OK |  |
| 2311 | snwfdhmp__errlog | https://github.com/snwfdhmp/errlog | cdffd0ba9e | 2023-06-27 |  | 0/0/0 | EMPTY_GT |  |
| 2312 | socifi__jazz | https://github.com/socifi/jazz | de41804008 | 2019-03-20 |  | 0/0/0 | EMPTY_GT |  |
| 2313 | solher__arangolite | https://github.com/solher/arangolite | 5401eeb0ec | 2021-03-10 | 1.16 | 0/0/0 | EMPTY_GT |  |
| 2314 | songgao__ether | https://github.com/songgao/ether | 9fe60a3d78 | 2016-04-04 |  | 0/0/0 | EMPTY_GT |  |
| 2315 | songgao__water | https://github.com/songgao/water | 2b4b6d7c09 | 2020-03-17 |  | 0/0/0 | EMPTY_GT |  |
| 2316 | sonh__qs | https://github.com/sonh/qs |  |  |  | 0/0/0 | EMPTY_GT |  |
| 2317 | soniah__awsenv | https://github.com/soniah/awsenv | fcd6d06ac8 | 2018-07-18 |  | 0/0/0 | EMPTY_GT |  |
| 2318 | soniah__evaler | https://github.com/soniah/evaler | 227e5c8edc | 2018-07-27 |  | 0/0/0 | EMPTY_GT |  |
| 2319 | soniah__gosnmp | https://github.com/soniah/gosnmp | 646a881490 | 2026-04-02 | 1.24.0 | 18/1/5 | OK |  |
| 2320 | sosedoff__pgweb | https://github.com/sosedoff/pgweb | e4858a16d8 | 2026-07-03 | 1.25 | 87/35/39 | OK |  |
| 2321 | sostronk__go-steam | https://github.com/sostronk/go-steam | 1e32cd58ef | 2018-03-13 |  | 0/0/0 | EMPTY_GT |  |
| 2322 | sourcegraph__conc | https://github.com/sourcegraph/conc | 5f936abd7a | 2024-01-21 | 1.20 | 0/0/0 | EMPTY_GT |  |
| 2323 | sourcegraph__go-vcs | https://github.com/sourcegraph/go-vcs | ca41431d1b | 2023-07-17 |  | 0/0/0 | EMPTY_GT |  |
| 2324 | sourcegraph__zoekt | https://github.com/sourcegraph/zoekt | 3c8b39b1ef | 2026-07-17 | 1.25.9 | 388/121/131 | OK |  |
| 2325 | soypat__godesim | https://github.com/soypat/godesim | b778946abe | 2022-06-04 | 1.15 | 38/2/2 | OK |  |
| 2326 | soypat__natiu-mqtt | https://github.com/soypat/natiu-mqtt | c4d5dc1395 | 2026-06-30 | 1.19 | 1/0/0 | EMPTY_GT |  |
| 2327 | soypat__rebed | https://github.com/soypat/rebed | b5b7dcdade | 2022-02-18 | 1.16 | 0/0/0 | EMPTY_GT |  |
| 2328 | spatial-go__geoos | https://github.com/spatial-go/geoos | 770e5d7275 | 2024-04-23 | 1.19 | 7/2/2 | OK |  |
| 2329 | speedata__go-lua | https://github.com/speedata/go-lua | 99d26311cd | 2026-05-18 | 1.22 | 1/0/0 | EMPTY_GT |  |
| 2330 | spf13__afero | https://github.com/spf13/afero | 768f1fb0e5 | 2026-06-09 | 1.25.0 | 5/1/1 | OK |  |
| 2331 | spf13__cobra | https://github.com/spf13/cobra | adbc881390 | 2026-07-10 | 1.15 | 7/4/4 | OK |  |
| 2332 | spf13__pflag | https://github.com/spf13/pflag | 5fdac2d16c | 2026-07-03 | 1.12 | 1/0/0 | EMPTY_GT |  |
| 2333 | spf13__viper | https://github.com/spf13/viper | 528f7416c4 | 2025-10-15 | 1.23.0 | 26/11/15 | OK |  |
| 2334 | spiffe__spire | https://github.com/spiffe/spire | dbe7b01e35 | 2026-07-19 | 1.26.4 | 801/307/308 | OK |  |
| 2335 | spiral__roadrunner | https://github.com/spiral/roadrunner | 6aef5710cb | 2026-07-18 | 1.26.4 | 538/201/201 | OK |  |
| 2336 | spyzhov__ajson | https://github.com/spyzhov/ajson | 1f0ecf9280 | 2024-11-25 | 1.16 | 1/0/0 | EMPTY_GT |  |
| 2337 | sqs__goreturns | https://github.com/sqs/goreturns | 16fc3d8edd | 2023-10-30 | 1.14 | 10/3/3 | OK |  |
| 2338 | src-d__hercules | https://github.com/src-d/hercules | 68bb211faa | 2022-11-29 | 1.12 | 88/49/53 | OK |  |
| 2339 | srfrog__dict | https://github.com/srfrog/dict | 1ce666229c | 2026-02-14 | 1.15 | 7/0/4 | EMPTY_GT |  |
| 2340 | ssgreg__journald | https://github.com/ssgreg/journald | acf944d4c1 | 2021-03-05 |  | 5/1/4 | OK |  |
| 2341 | ssgreg__repeat | https://github.com/ssgreg/repeat | 803b320219 | 2020-02-13 |  | 5/0/3 | EMPTY_GT |  |
| 2342 | ssgreg__stl | https://github.com/ssgreg/stl | 5668d21a04 | 2019-10-01 |  | 0/0/0 | EMPTY_GT |  |
| 2343 | ssh-vault__ssh-vault | https://github.com/ssh-vault/ssh-vault | d2255f531a | 2026-07-20 |  | 0/0/0 | EMPTY_GT |  |
| 2344 | stabbycutyou__buffstreams | https://github.com/stabbycutyou/buffstreams | 20679e9ca3 | 2016-04-16 |  | 0/0/0 | EMPTY_GT |  |
| 2345 | stackerzzq__xj2go | https://github.com/stackerzzq/xj2go | 51f89335ba | 2021-10-13 | 1.13 | 6/2/2 | OK |  |
| 2346 | stacktower-io__stacktower | https://github.com/stacktower-io/stacktower | 69ff074300 | 2026-06-25 | 1.25.11 | 55/35/35 | OK |  |
| 2347 | stanipetrosyan__go-eventbus | https://github.com/stanipetrosyan/go-eventbus | dd2424f03e | 2025-05-05 | 1.23 | 0/0/0 | EMPTY_GT |  |
| 2348 | starwalkn__kono | https://github.com/starwalkn/kono | 859c492f4b | 2026-07-18 | 1.26.3 | 129/54/61 | OK |  |
| 2349 | staskobzar__goagi | https://github.com/staskobzar/goagi | 849352c222 | 2024-06-20 | 1.20 | 0/0/0 | EMPTY_GT |  |
| 2350 | staskobzar__goami2 | https://github.com/staskobzar/goami2 | fc1da78324 | 2026-02-02 | 1.21 | 0/0/0 | EMPTY_GT |  |
| 2351 | steambap__captcha | https://github.com/steambap/captcha | 6d6fc6be16 | 2025-08-20 | 1.21 | 4/2/2 | OK |  |
| 2352 | steevin__neuron-cli | https://github.com/steevin/neuron-cli | 0c7c26b576 | 2026-06-27 | 1.26.3 | 119/69/69 | OK |  |
| 2353 | stefanprodan__podinfo | https://github.com/stefanprodan/podinfo | 46b93c8700 | 2026-07-13 | 1.26.0 | 136/76/76 | OK |  |
| 2354 | stephenafamo__bob | https://github.com/stephenafamo/bob | e48b781d0c | 2026-07-20 | 1.24.0 | 186/101/103 | OK |  |
| 2355 | stephens2424__muxchain | https://github.com/stephens2424/muxchain | 8216302e99 | 2019-02-20 |  | 0/0/0 | EMPTY_GT |  |
| 2356 | stesla__gospecify | https://github.com/stesla/gospecify | 1d9f7e3e6a | 2011-06-18 |  | 0/0/0 | EMPTY_GT |  |
| 2357 | stianeikeland__go-rpio | https://github.com/stianeikeland/go-rpio | d8d85b3536 | 2021-12-02 | 1.15 | 0/0/0 | EMPTY_GT |  |
| 2358 | stoewer__go-week | https://github.com/stoewer/go-week | 6ef9129583 | 2021-11-15 | 1.11 | 10/1/6 | OK |  |
| 2359 | stretchr__testify | https://github.com/stretchr/testify | 001eb7946b | 2026-06-10 | 1.17 | 4/2/2 | OK |  |
| 2360 | striker2000__petrovich | https://github.com/striker2000/petrovich | 090c9a15e6 | 2023-11-30 | 1.13 | 4/0/3 | EMPTY_GT |  |
| 2361 | stripe__stripe-go | https://github.com/stripe/stripe-go | 753fae1dfa | 2026-07-15 | 1.22 | 7/4/4 | OK |  |
| 2362 | structy__log | https://github.com/structy/log | 1f766c8d0b | 2022-01-26 | 1.17 | 4/3/3 | OK |  |
| 2363 | studiosol__async | https://github.com/studiosol/async | 190eda1d64 | 2020-11-19 | 1.13 | 0/0/0 | EMPTY_GT |  |
| 2364 | stv0g__gont | https://github.com/stv0g/gont |  |  |  | 0/0/0 | CLONE_FAIL |  |
| 2365 | subchen__go-log | https://github.com/subchen/go-log | f16df80d3e | 2018-05-19 |  | 0/0/0 | EMPTY_GT |  |
| 2366 | subchen__go-trylock | https://github.com/subchen/go-trylock | 6894780a9a | 2021-05-07 | 1.13 | 1/0/0 | EMPTY_GT |  |
| 2367 | subosito__gotenv | https://github.com/subosito/gotenv | d24eb16ed8 | 2025-09-13 | 1.22 | 11/1/5 | OK |  |
| 2368 | subpop__go-ini | https://github.com/subpop/go-ini | 9ad655d20c | 2026-07-01 | 1.21 | 2/0/1 | EMPTY_GT |  |
| 2369 | sunary__sqlize | https://github.com/sunary/sqlize | a7b548e181 | 2026-03-01 | 1.25.0 | 341/36/36 | OK |  |
| 2370 | sunwxg__goshark | https://github.com/sunwxg/goshark | 531381e87f | 2017-10-24 |  | 0/0/0 | EMPTY_GT |  |
| 2371 | superwhiskers__crunch | https://github.com/superwhiskers/crunch | 7ad82f4e85 | 2023-01-13 |  | 0/0/0 | EMPTY_GT |  |
| 2372 | surenderthakran__gomind | https://github.com/surenderthakran/gomind | a31b8878d7 | 2018-07-31 |  | 0/0/0 | EMPTY_GT |  |
| 2373 | surrealdb__surrealdb.go | https://github.com/surrealdb/surrealdb.go | 2a8a1f1edd | 2026-07-14 | 1.23 | 21/11/12 | OK |  |
| 2374 | surullabs__lint | https://github.com/surullabs/lint | f90256a823 | 2017-10-03 |  | 0/0/0 | EMPTY_GT |  |
| 2375 | suzuki-shunsuke__flute | https://github.com/suzuki-shunsuke/flute | d1dffad686 | 2026-07-18 | 1.25 | 21/5/6 | OK |  |
| 2376 | switchupcb__copygen | https://github.com/switchupcb/copygen | 5c067b055f | 2025-03-06 | 1.23 | 17/6/6 | OK |  |
| 2377 | switchupcb__disgo | https://github.com/switchupcb/disgo | 0fba102862 | 2025-03-14 | 1.23 | 0/0/0 | EMPTY_GT |  |
| 2378 | swithek__sessionup | https://github.com/swithek/sessionup | c4a6ab676b | 2025-03-20 | 1.12 | 4/3/3 | OK |  |
| 2379 | sybrexsys__RapidMQ | https://github.com/sybrexsys/RapidMQ | 5f189530e8 | 2017-12-07 |  | 0/0/0 | EMPTY_GT |  |
| 2380 | syndtr__goleveldb | https://github.com/syndtr/goleveldb | 126854af5e | 2022-07-21 | 1.14 | 36/10/14 | OK |  |
| 2381 | syntaqx__cookie | https://github.com/syntaqx/cookie | cec4ed2ee0 | 2026-05-08 | 1.24 | 0/0/0 | EMPTY_GT |  |
| 2382 | syntaqx__env | https://github.com/syntaqx/env | 8d7cbb975e | 2026-07-02 | 1.22.3 | 0/0/0 | EMPTY_GT |  |
| 2383 | syntaqx__serve | https://github.com/syntaqx/serve | cd8b328e99 | 2026-07-20 | 1.24 | 0/0/0 | EMPTY_GT |  |
| 2384 | syst3mctl__godoclive | https://github.com/syst3mctl/godoclive | 547c6f7ccd | 2026-07-09 | 1.25.0 | 18/8/8 | OK |  |
| 2385 | szyhf__go-excel | https://github.com/szyhf/go-excel | 098cb67b11 | 2025-10-01 | 1.24 | 2/1/1 | OK |  |
| 2386 | szyhf__go-gcache | https://github.com/szyhf/go-gcache | 08bafd4289 | 2025-05-26 | 1.18 | 1/0/0 | EMPTY_GT |  |
| 2387 | tal-tech__go-zero | https://github.com/tal-tech/go-zero | 394ffcc19a | 2026-07-20 | 1.24.0 | 223/120/125 | OK |  |
| 2388 | tarent__loginsrv | https://github.com/tarent/loginsrv | eb0ac26828 | 2021-02-11 | 1.14 | 66/34/39 | OK |  |
| 2389 | tarmac-project__tarmac | https://github.com/tarmac-project/tarmac | ad0e89ece2 | 2026-06-14 | 1.24.0 | 334/115/117 | OK |  |
| 2390 | taskctl__taskctl | https://github.com/taskctl/taskctl | e77ca83f63 | 2026-07-19 | 1.26 | 64/40/40 | OK |  |
| 2391 | taubyte__tau | https://github.com/taubyte/tau | 9d8b189f8c | 2026-07-19 | 1.26 | 824/298/300 | OK |  |
| 2392 | tchayen__triangolatte | https://github.com/tchayen/triangolatte | 8b66c3824e | 2021-08-04 |  | 0/0/0 | EMPTY_GT |  |
| 2393 | tdewolff__canvas | https://github.com/tdewolff/canvas | 248e24504c | 2026-07-14 | 1.25.0 | 152/63/64 | OK |  |
| 2394 | tdewolff__minify | https://github.com/tdewolff/minify | bb3e8ba578 | 2026-07-14 | 1.25.0 | 15/8/9 | OK |  |
| 2395 | tealeg__xlsx | https://github.com/tealeg/xlsx | c4b90f0272 | 2025-08-13 | 1.18 | 20/10/11 | OK |  |
| 2396 | technohippy__go-glmatrix | https://github.com/technohippy/go-glmatrix | 036d96591b | 2021-02-05 |  | 0/0/0 | EMPTY_GT |  |
| 2397 | tejo__boxed | https://github.com/tejo/boxed | 35c0b0e250 | 2018-08-09 |  | 0/0/0 | EMPTY_GT |  |
| 2398 | tejzpr__ordered-concurrently | https://github.com/tejzpr/ordered-concurrently | 51e061f8dd | 2023-04-24 | 1.12 | 0/0/0 | EMPTY_GT |  |
| 2399 | temporalio__sdk-go | https://github.com/temporalio/sdk-go | f34dc3da35 | 2026-07-20 | 1.25.4 | 71/24/25 | OK |  |
| 2400 | tendermint__tendermint | https://github.com/tendermint/tendermint | 9d1be86031 | 2025-03-06 | 1.18 | 693/65/77 | OK |  |
| 2401 | tenntenn__gopher-stickers | https://github.com/tenntenn/gopher-stickers | 6fa428fa62 | 2016-08-23 |  | 0/0/0 | EMPTY_GT |  |
| 2402 | tenntenn__gpath | https://github.com/tenntenn/gpath | 3e6e957a39 | 2017-06-04 |  | 0/0/0 | EMPTY_GT |  |
| 2403 | teris-io__cli | https://github.com/teris-io/cli | c0636ab108 | 2021-05-09 |  | 0/0/0 | EMPTY_GT |  |
| 2404 | teris-io__log | https://github.com/teris-io/log | 040ae886f9 | 2017-12-04 |  | 0/0/0 | EMPTY_GT |  |
| 2405 | teris-io__shortid | https://github.com/teris-io/shortid | 71ec9f2aa5 | 2022-06-17 | 1.18 | 0/0/0 | EMPTY_GT |  |
| 2406 | testcontainers__testcontainers-go | https://github.com/testcontainers/testcontainers-go | ea854ecb16 | 2026-07-17 | 1.25.0 | 79/43/44 | OK |  |
| 2407 | tg123__go-htpasswd | https://github.com/tg123/go-htpasswd | 6bf1434edc | 2026-06-03 | 1.24.0 | 13/2/6 | OK |  |
| 2408 | the4thamigo-uk__conflate | https://github.com/the4thamigo-uk/conflate | ae7f5c1814 | 2023-07-26 | 1.14 | 12/7/10 | OK |  |
| 2409 | theckman__yacspin | https://github.com/theckman/yacspin | 94bad55b33 | 2022-01-02 | 1.17 | 9/6/7 | OK |  |
| 2410 | thedevsaddam__gojsonq | https://github.com/thedevsaddam/gojsonq | 626651d72d | 2021-03-22 | 1.13 | 0/0/0 | EMPTY_GT |  |
| 2411 | thedevsaddam__govalidator | https://github.com/thedevsaddam/govalidator | 410bf76327 | 2020-04-12 |  | 0/0/0 | EMPTY_GT |  |
| 2412 | thedevsaddam__renderer | https://github.com/thedevsaddam/renderer | ec217d774d | 2026-04-22 | 1.25.0 | 1/0/0 | EMPTY_GT |  |
| 2413 | thedevsaddam__retry | https://github.com/thedevsaddam/retry | 2587ef9bef |  |  | 0/0/0 | EMPTY_GT |  |
| 2414 | thedevsir__gosuccinctly | https://github.com/thedevsir/gosuccinctly | 103b97ed2f | 2018-10-03 |  | 0/0/0 | EMPTY_GT |  |
| 2415 | therecipe__qt | https://github.com/therecipe/qt | c0c124a577 | 2020-09-04 |  | 16/6/9 | OK |  |
| 2416 | thestrukture__ide | https://github.com/thestrukture/ide | 3abcce24dc | 2022-11-24 | 1.18 | 93/20/20 | OK |  |
| 2417 | thevxn__dish | https://github.com/thevxn/dish | 612b9605fb | 2026-06-04 | 1.26.2 | 0/0/0 | EMPTY_GT |  |
| 2418 | thewhitetulip__web-dev-golang-anti-textbook | https://github.com/thewhitetulip/web-dev-golang-anti-textbook | e249852897 | 2025-09-30 |  | 0/0/0 | EMPTY_GT |  |
| 2419 | thoas__go-funk | https://github.com/thoas/go-funk | 045ef11f8f | 2023-06-20 | 1.13 | 7/0/4 | EMPTY_GT |  |
| 2420 | thoas__picfit | https://github.com/thoas/picfit | c6137c244a | 2026-07-15 | 1.25.0 | 380/81/81 | OK |  |
| 2421 | thoas__stats | https://github.com/thoas/stats | 965cb2de16 | 2019-04-07 |  | 0/0/0 | EMPTY_GT |  |
| 2422 | thoj__go-galib | https://github.com/thoj/go-galib | babb0d627a | 2015-12-28 |  | 0/0/0 | EMPTY_GT |  |
| 2423 | thomaspoignant__go-feature-flag | https://github.com/thomaspoignant/go-feature-flag | cfb7f6cdc8 | 2026-07-21 | 1.26.5 | 727/256/284 | OK |  |
| 2424 | tibcosoftware__flogo | https://github.com/tibcosoftware/flogo | 0143f748e9 | 2024-04-24 |  | 0/0/0 | EMPTY_GT |  |
| 2425 | tickstem__cron | https://github.com/tickstem/cron | 432872e95b | 2026-04-25 | 1.26.1 | 18/6/10 | OK |  |
| 2426 | tickstem__heartbeat | https://github.com/tickstem/heartbeat | 0a3c3e8b5e | 2026-05-03 | 1.26.1 | 0/0/0 | EMPTY_GT |  |
| 2427 | tickstem__uptime | https://github.com/tickstem/uptime | b175e64e31 | 2026-05-05 | 1.22 | 7/0/4 | EMPTY_GT |  |
| 2428 | tickstem__verify | https://github.com/tickstem/verify | 301932359e | 2026-04-22 | 1.22 | 7/0/4 | EMPTY_GT |  |
| 2429 | tidwall__buntdb | https://github.com/tidwall/buntdb | 0dbc8c1845 | 2026-05-19 | 1.18 | 10/7/9 | OK |  |
| 2430 | tidwall__gjson | https://github.com/tidwall/gjson | 7d8b3821e9 | 2026-05-14 | 1.23 | 3/2/2 | OK |  |
| 2431 | tidwall__sjson | https://github.com/tidwall/sjson | 3a21ce7b0c | 2026-05-19 | 1.14 | 4/3/3 | OK |  |
| 2432 | tidwall__tile38 | https://github.com/tidwall/tile38 | 7caa4c810c | 2026-07-15 | 1.25.0 | 316/118/120 | OK |  |
| 2433 | tiendc__autowire | https://github.com/tiendc/autowire | 470575e999 | 2024-09-11 | 1.18 | 7/0/4 | EMPTY_GT |  |
| 2434 | tiendc__go-csvlib | https://github.com/tiendc/go-csvlib | bdfff11100 | 2024-09-11 | 1.18 | 11/4/8 | OK |  |
| 2435 | tiendc__go-deepcopy | https://github.com/tiendc/go-deepcopy | a5141d30af | 2025-11-29 | 1.18 | 0/0/0 | EMPTY_GT |  |
| 2436 | tiendc__go-validator | https://github.com/tiendc/go-validator | 1daa3228ce | 2024-11-27 | 1.20 | 13/6/10 | OK |  |
| 2437 | tiendc__gofn | https://github.com/tiendc/gofn | 0a9fe61aee | 2026-04-15 | 1.20 | 8/1/5 | OK |  |
| 2438 | timandy__routine | https://github.com/timandy/routine | ba2051642e | 2026-05-12 | 1.18 | 0/0/0 | EMPTY_GT |  |
| 2439 | timbray__quamina | https://github.com/timbray/quamina | 81f5b73013 | 2026-06-26 | 1.22.0 | 1/0/0 | EMPTY_GT |  |
| 2440 | timdp__lwc | https://github.com/timdp/lwc | 3330928c9d | 2022-07-26 | 1.18 | 4/3/3 | OK |  |
| 2441 | timkaye11__goRecommend | https://github.com/timkaye11/goRecommend | ed6478706f | 2014-07-28 |  | 0/0/0 | EMPTY_GT |  |
| 2442 | timothyye__godns | https://github.com/timothyye/godns | 2928d08d66 | 2026-07-18 | 1.26.0 | 67/33/33 | OK |  |
| 2443 | timsolov__rest-query-parser | https://github.com/timsolov/rest-query-parser | 4a509f35d5 | 2023-04-28 | 1.13 | 12/1/7 | OK |  |
| 2444 | tinygo-org__tinygo | https://github.com/tinygo-org/tinygo | 2602d4c25d | 2026-07-20 | 1.25.0 | 90/15/17 | OK |  |
| 2445 | tirthpatell__threads-go | https://github.com/tirthpatell/threads-go | 13898cee5f | 2026-07-04 | 1.21 | 1/0/0 | EMPTY_GT |  |
| 2446 | tj__mmake | https://github.com/tj/mmake | c7cc9d9726 | 2020-03-02 | 1.13 | 45/6/6 | OK |  |
| 2447 | tkrop__go-testing | https://github.com/tkrop/go-testing | 0233732c2e | 2026-06-05 | 1.26.3 | 26/10/12 | OK |  |
| 2448 | tmc__langchaingo | https://github.com/tmc/langchaingo | 8fea3de636 | 2026-01-11 | 1.24.4 | 884/246/280 | OK |  |
| 2449 | tmrts__boilr | https://github.com/tmrts/boilr | 8f51ad7884 | 2017-07-19 |  | 0/0/0 | EMPTY_GT |  |
| 2450 | tmrts__go-patterns | https://github.com/tmrts/go-patterns | f978e42036 | 2017-07-19 |  | 0/0/0 | EMPTY_GT |  |
| 2451 | tobyhede__go-underscore | https://github.com/tobyhede/go-underscore | d9938588b5 | 2023-02-28 |  | 0/0/0 | EMPTY_GT |  |
| 2452 | tockins__realize | https://github.com/tockins/realize | 498ce46d1b | 2020-05-04 | 1.14 | 28/19/19 | OK |  |
| 2453 | todotxt__todo.txt | https://github.com/todotxt/todo.txt | 1d90c08653 | 2026-06-28 |  | 0/0/0 | EMPTY_GT |  |
| 2454 | tomarrell__wrapcheck | https://github.com/tomarrell/wrapcheck | c058da1005 | 2025-11-24 | 1.24.0 | 121/19/22 | OK |  |
| 2455 | tomcraven__goga | https://github.com/tomcraven/goga | f4ca47f4d4 | 2022-04-13 | 1.17 | 0/0/0 | EMPTY_GT |  |
| 2456 | tomlazar__table | https://github.com/tomlazar/table | 858d4b646d | 2022-09-20 | 1.15 | 13/6/10 | OK |  |
| 2457 | tomodian__release | https://github.com/tomodian/release | a9ada4d8b2 | 2026-03-11 | 1.26.1 | 30/14/18 | OK |  |
| 2458 | tomwright__dasel | https://github.com/tomwright/dasel | 008b0ed9ca | 2026-06-27 | 1.25 | 66/33/33 | OK |  |
| 2459 | tomwright__queryparam | https://github.com/tomwright/queryparam | 349c90f3ed | 2020-09-23 | 1.13 | 0/0/0 | EMPTY_GT |  |
| 2460 | toorop__go-dkim | https://github.com/toorop/go-dkim | 9025cce958 | 2025-02-26 |  | 0/0/0 | EMPTY_GT |  |
| 2461 | topfreegames__apm | https://github.com/topfreegames/apm | c69cfc8190 | 2016-11-24 |  | 0/0/0 | EMPTY_GT |  |
| 2462 | topfreegames__pitaya | https://github.com/topfreegames/pitaya | eaacc47ff6 | 2026-06-09 | 1.25.4 | 0/0/0 | EMPTY_GT |  |
| 2463 | tosone__minimp3 | https://github.com/tosone/minimp3 | 751efad24a | 2023-08-02 | 1.18 | 0/0/0 | EMPTY_GT |  |
| 2464 | tricksterproxy__trickster | https://github.com/tricksterproxy/trickster | 1530013d90 | 2026-07-18 | 1.26.4 | 543/57/65 | OK |  |
| 2465 | trivago__gollum | https://github.com/trivago/gollum | eebd68e5a2 | 2025-10-02 | 1.16 | 251/0/0 | EMPTY_GT |  |
| 2466 | trpc-group__trpc-go | https://github.com/trpc-group/trpc-go | 9b5c63e5de | 2026-06-26 | 1.18 | 68/37/42 | OK |  |
| 2467 | truemail-rb__truemail-go | https://github.com/truemail-rb/truemail-go | f1057bd058 | 2024-08-30 | 1.22 | 23/12/12 | OK |  |
| 2468 | tsenart__vegeta | https://github.com/tsenart/vegeta | cf58112690 | 2026-02-16 | 1.22 | 217/20/31 | OK |  |
| 2469 | tucnak__climax | https://github.com/tucnak/climax | 9f87fd172d | 2020-09-05 | 1.15 | 1/0/0 | EMPTY_GT |  |
| 2470 | tucnak__telebot | https://github.com/tucnak/telebot | ee8708cd2a | 2026-06-17 | 1.16 | 187/20/23 | OK |  |
| 2471 | tuupola__branca-spec | https://github.com/tuupola/branca-spec | c8b0ba5e22 | 2025-05-06 |  | 0/0/0 | EMPTY_GT |  |
| 2472 | tuvistavie__structomap | https://github.com/tuvistavie/structomap | 700b2732d5 | 2019-05-16 |  | 0/0/0 | EMPTY_GT |  |
| 2473 | tuxychandru__pubsub | https://github.com/tuxychandru/pubsub | b6f7af9f05 | 2024-05-22 | 1.18 | 0/0/0 | EMPTY_GT |  |
| 2474 | tv42__mockhttp | https://github.com/tv42/mockhttp | c323b80d6f | 2014-10-29 |  | 0/0/0 | EMPTY_GT |  |
| 2475 | twharmon__golamb | https://github.com/twharmon/golamb |  |  |  | 0/0/0 | CLONE_FAIL |  |
| 2476 | twharmon__gosql | https://github.com/twharmon/gosql | f2e5229d97 | 2022-04-12 | 1.18 | 4/1/3 | OK |  |
| 2477 | twharmon__gouid | https://github.com/twharmon/gouid | b5f2a69ba9 | 2026-02-06 | 1.25 | 0/0/0 | EMPTY_GT |  |
| 2478 | twharmon__govalid | https://github.com/twharmon/govalid | d5ff9153b2 | 2026-06-05 | 1.26 | 1/0/0 | EMPTY_GT |  |
| 2479 | twharmon__slices | https://github.com/twharmon/slices | 051e49e40b | 2022-07-08 | 1.18 | 0/0/0 | EMPTY_GT |  |
| 2480 | two__tspool | https://github.com/two/tspool | 92bc4a518b | 2018-10-29 |  | 0/0/0 | EMPTY_GT |  |
| 2481 | txn2__kubefwd | https://github.com/txn2/kubefwd | c5803e33de | 2026-07-19 | 1.26.0 | 198/105/105 | OK |  |
| 2482 | tyler-smith__golang-sql-benchmark | https://github.com/tyler-smith/golang-sql-benchmark |  |  |  | 0/0/0 | CLONE_FAIL |  |
| 2483 | tylertreat__BoomFilters | https://github.com/tylertreat/BoomFilters | 53813c36cc | 2025-11-17 |  | 0/0/0 | EMPTY_GT |  |
| 2484 | tylertreat__Comcast | https://github.com/tylertreat/Comcast | 145d02155c | 2025-03-20 | 1.15 | 1/0/0 | EMPTY_GT |  |
| 2485 | tylertreat__go-benchmarks | https://github.com/tylertreat/go-benchmarks | bb67a98aa8 | 2016-02-24 |  | 0/0/0 | EMPTY_GT |  |
| 2486 | tylerwince__godbg | https://github.com/tylerwince/godbg | 6f94eff46b | 2019-04-19 |  | 0/0/0 | EMPTY_GT |  |
| 2487 | tylfin__dynatomic | https://github.com/tylfin/dynatomic | e805d58a9e | 2020-11-03 |  | 0/0/0 | EMPTY_GT |  |
| 2488 | uadmin__uadmin | https://github.com/uadmin/uadmin | 517df8958c | 2026-07-13 | 1.17 | 48/27/27 | OK |  |
| 2489 | uber-go__cadence-client | https://github.com/uber-go/cadence-client | dc6de20f3f | 2026-07-10 | 1.23 | 148/48/52 | OK |  |
| 2490 | uber-go__dig | https://github.com/uber-go/dig | 7709124870 | 2025-05-13 | 1.20 | 7/4/4 | OK |  |
| 2491 | uber-go__fx | https://github.com/uber-go/fx | d5da5b04ac | 2025-12-27 | 1.24 | 16/4/9 | OK |  |
| 2492 | uber-go__guide | https://github.com/uber-go/guide | 1d60a91aa5 | 2026-04-15 |  | 0/0/0 | EMPTY_GT |  |
| 2493 | uber-go__mock | https://github.com/uber-go/mock | 349aac6606 | 2025-12-17 | 1.23.0 | 15/4/8 | OK |  |
| 2494 | uber-go__multierr | https://github.com/uber-go/multierr | cf4b2327ce | 2024-04-29 | 1.20 | 0/0/0 | EMPTY_GT |  |
| 2495 | uber-go__zap | https://github.com/uber-go/zap | 5b81b37b81 | 2026-04-27 | 1.19 | 13/1/7 | OK |  |
| 2496 | uber__h3-go | https://github.com/uber/h3-go |  |  |  | 0/0/0 | EMPTY_GT |  |
| 2497 | ubgo__lock | https://github.com/ubgo/lock | 0f133b784a | 2026-05-05 | 1.24 | 0/0/0 | EMPTY_GT |  |
| 2498 | udhos__jazigo | https://github.com/udhos/jazigo | 60be4d11b1 | 2023-11-02 | 1.20 | 25/8/8 | OK |  |
| 2499 | ufoscout__go-up | https://github.com/ufoscout/go-up | 789343e133 | 2020-01-14 | 1.13 | 0/0/0 | EMPTY_GT |  |
| 2500 | ugorji__go | https://github.com/ugorji/go | 580b3cf57e | 2026-05-11 |  | 0/0/0 | EMPTY_GT |  |
| 2501 | ulikunitz__xz | https://github.com/ulikunitz/xz | 024f909297 | 2026-07-20 | 1.20 | 1/0/0 | EMPTY_GT |  |
| 2502 | ulovecode__gdcache | https://github.com/ulovecode/gdcache | efffe2595c | 2021-10-15 | 1.11 | 1/0/0 | EMPTY_GT |  |
| 2503 | ulule__deepcopier | https://github.com/ulule/deepcopier | 45decc6639 | 2020-04-30 | 1.14 | 0/0/0 | EMPTY_GT |  |
| 2504 | ulule__limiter | https://github.com/ulule/limiter | f0ada6cb8f | 2024-10-14 | 1.17 | 51/27/27 | OK |  |
| 2505 | ungerik__go-cairo | https://github.com/ungerik/go-cairo | 56fbbeeb67 | 2026-04-28 | 1.13 | 1/0/0 | EMPTY_GT |  |
| 2506 | ungerik__go-dry | https://github.com/ungerik/go-dry | 076d5065bb | 2025-10-17 | 1.23 | 1/0/0 | EMPTY_GT |  |
| 2507 | ungerik__go3d | https://github.com/ungerik/go3d | 1bde1320d4 | 2025-10-20 | 1.23 | 2/1/1 | OK |  |
| 2508 | unidoc__unioffice | https://github.com/unidoc/unioffice | 0e541a0347 | 2026-06-29 | 1.24.0 | 47/28/28 | OK |  |
| 2509 | unilibs__uniwidth | https://github.com/unilibs/uniwidth | 899895c959 | 2026-03-03 | 1.25.1 | 1/0/0 | EMPTY_GT |  |
| 2510 | unionj-cloud__go-doudou | https://github.com/unionj-cloud/go-doudou | 5f95e48629 | 2026-05-02 | 1.25.0 | 757/254/260 | OK |  |
| 2511 | uniplaces__carbon | https://github.com/uniplaces/carbon | cacaeb006f | 2024-01-17 | 1.16 | 4/0/3 | EMPTY_GT |  |
| 2512 | uniqush__uniqush-push | https://github.com/uniqush/uniqush-push | 0805cb3332 | 2020-04-09 | 1.14 | 25/6/6 | OK |  |
| 2513 | unit-io__unitd | https://github.com/unit-io/unitd | 53883ab13f | 2020-09-17 |  | 0/0/0 | EMPTY_GT |  |
| 2514 | unit-io__unitdb | https://github.com/unit-io/unitdb | 2a4e641b8a | 2021-10-28 | 1.16 | 52/13/13 | OK |  |
| 2515 | unix4fun__naclpipe | https://github.com/unix4fun/naclpipe | 16bedffb6b | 2018-11-18 |  | 3/2/2 | OK |  |
| 2516 | unki2aut__go-mpd | https://github.com/unki2aut/go-mpd | 8336a8d84e | 2025-06-10 | 1.20 | 11/1/4 | OK |  |
| 2517 | unrolled__render | https://github.com/unrolled/render | 46bc606efe | 2026-05-01 | 1.25.0 | 3/2/2 | OK |  |
| 2518 | unrolled__secure | https://github.com/unrolled/secure | 740abc8d09 | 2026-05-01 | 1.13 | 0/0/0 | EMPTY_GT |  |
| 2519 | updatecli__updatecli | https://github.com/updatecli/updatecli | 96b16303e6 | 2026-07-19 | 1.26.5 | 760/311/333 | OK |  |
| 2520 | upper__db | https://github.com/upper/db | dd97b4b4d5 | 2025-12-06 | 1.23.0 | 107/45/47 | OK |  |
| 2521 | uptrace__bun | https://github.com/uptrace/bun | 44c54f2420 | 2026-07-17 | 1.24.0 | 23/9/13 | OK |  |
| 2522 | urfave__cli | https://github.com/urfave/cli | 4937c163f8 | 2026-07-03 | 1.22 | 7/0/4 | EMPTY_GT |  |
| 2523 | urfave__negroni | https://github.com/urfave/negroni | 1af389b71c | 2025-05-03 | 1.17 | 0/0/0 | EMPTY_GT |  |
| 2524 | ursiform__sleuth | https://github.com/ursiform/sleuth | 3afe97f5dd | 2023-07-09 |  | 0/0/0 | EMPTY_GT |  |
| 2525 | us__den | https://github.com/us/den | b4d049f6b3 | 2026-06-17 | 1.25.7 | 127/57/61 | OK |  |
| 2526 | usk81__generic | https://github.com/usk81/generic | f9cc29a82d | 2020-08-23 | 1.12 | 0/0/0 | EMPTY_GT |  |
| 2527 | utahta__go-cronowriter | https://github.com/utahta/go-cronowriter | 3d036dc1ce | 2020-11-25 | 1.11 | 11/2/2 | OK |  |
| 2528 | utekaravinash__gopaapi5 | https://github.com/utekaravinash/gopaapi5 | de0660bcff | 2020-04-03 | 1.12 | 0/0/0 | EMPTY_GT |  |
| 2529 | vadiminshakov__committer | https://github.com/vadiminshakov/committer | 43fb42ea8e | 2026-07-15 | 1.25.0 | 112/24/28 | OK |  |
| 2530 | vaelen__iot | https://github.com/vaelen/iot | 4859fc7ef4 | 2019-11-09 |  | 0/0/0 | EMPTY_GT |  |
| 2531 | vahiiiid__go-rest-api-boilerplate | https://github.com/vahiiiid/go-rest-api-boilerplate | 092a625f06 | 2026-05-25 | 1.24.0 | 289/60/65 | OK |  |
| 2532 | valord577__mailx | https://github.com/valord577/mailx | a9cfa3297e | 2026-03-17 | 1.16 | 1/0/0 | EMPTY_GT |  |
| 2533 | valyala__fasthttp | https://github.com/valyala/fasthttp | f1ad91d519 | 2026-07-18 | 1.25.0 | 13/7/7 | OK |  |
| 2534 | valyala__fastjson | https://github.com/valyala/fastjson | d652a1b190 | 2026-02-21 | 1.24 | 1/0/0 | EMPTY_GT |  |
| 2535 | valyala__fasttemplate | https://github.com/valyala/fasttemplate | 2a2d1afada | 2022-10-18 | 1.12 | 2/1/1 | OK |  |
| 2536 | valyala__gorpc | https://github.com/valyala/gorpc | 908281bef7 | 2016-05-19 |  | 0/0/0 | EMPTY_GT |  |
| 2537 | valyala__quicktemplate | https://github.com/valyala/quicktemplate | 4d619e27ca | 2024-07-05 | 1.17 | 10/4/4 | OK |  |
| 2538 | vanng822__go-premailer | https://github.com/vanng822/go-premailer | d1561b3e1b | 2026-06-06 | 1.25.0 | 35/17/21 | OK |  |
| 2539 | vardius__gocontainer | https://github.com/vardius/gocontainer | b5673b6d29 | 2020-03-23 | 1.12 | 1/0/0 | EMPTY_GT |  |
| 2540 | vardius__gollback | https://github.com/vardius/gollback | 8de3a12684 | 2023-02-16 | 1.14 | 1/0/0 | EMPTY_GT |  |
| 2541 | vardius__gorouter | https://github.com/vardius/gorouter | 572992b359 | 2024-09-05 | 1.20 | 10/4/4 | OK |  |
| 2542 | vardius__message-bus | https://github.com/vardius/message-bus | 5afc216fc0 | 2021-01-15 | 1.12 | 1/0/0 | EMPTY_GT |  |
| 2543 | vardius__worker-pool | https://github.com/vardius/worker-pool | 997d6fc9f1 | 2021-01-17 | 1.13 | 1/0/0 | EMPTY_GT |  |
| 2544 | vbauerster__mpb | https://github.com/vbauerster/mpb | e1c42ec0f8 | 2026-07-18 | 1.25.0 | 13/5/5 | OK |  |
| 2545 | vcaesar__tt | https://github.com/vcaesar/tt | 5bc4244c84 | 2026-03-30 | 1.17 | 1/0/0 | EMPTY_GT |  |
| 2546 | vdobler__chart | https://github.com/vdobler/chart | e4c9d5b5d3 | 2021-06-03 |  | 9/4/4 | OK |  |
| 2547 | veandco__go-sdl2 | https://github.com/veandco/go-sdl2 | 7f43f67a3a | 2025-02-20 | 1.15 | 15/2/2 | OK |  |
| 2548 | vectaport__flowgraph | https://github.com/vectaport/flowgraph | bfc7fcbbb4 | 2026-07-19 | 1.20 | 7/3/3 | OK |  |
| 2549 | vektra__mockery | https://github.com/vektra/mockery | 2b06a82bbd | 2026-07-20 | 1.25.5 | 408/38/38 | OK |  |
| 2550 | verdverm__frisby | https://github.com/verdverm/frisby | b16556248a | 2017-06-04 |  | 0/0/0 | EMPTY_GT |  |
| 2551 | verifid__vl-go | https://github.com/verifid/vl-go | c17ea1b48e | 2021-05-30 |  | 0/0/0 | EMPTY_GT |  |
| 2552 | viant__afs | https://github.com/viant/afs | 0373fe4ae4 | 2026-07-07 | 1.17 | 80/5/11 | OK |  |
| 2553 | viant__asc | https://github.com/viant/asc | e805e6de78 | 2024-09-20 |  | 0/0/0 | EMPTY_GT |  |
| 2554 | viant__bgc | https://github.com/viant/bgc | c2bffce101 | 2024-03-17 | 1.21.5 | 103/31/37 | OK |  |
| 2555 | viant__dsc | https://github.com/viant/dsc | 15e4e79625 | 2025-12-31 | 1.21 | 339/13/23 | OK |  |
| 2556 | viant__dsunit | https://github.com/viant/dsunit | dbf3d8db33 | 2025-12-31 |  | 0/0/0 | EMPTY_GT |  |
| 2557 | viant__endly | https://github.com/viant/endly | 5254bd067d | 2026-04-16 | 1.25.1 | 631/204/208 | OK |  |
| 2558 | viant__ptrie | https://github.com/viant/ptrie | 98c1314805 | 2024-04-02 | 1.21.7 | 0/0/0 | EMPTY_GT |  |
| 2559 | viant__toolbox | https://github.com/viant/toolbox | da0b3fd58b | 2026-01-07 |  | 0/0/0 | EMPTY_GT |  |
| 2560 | vibridi__gomock | https://github.com/vibridi/gomock | 6c01d928d0 | 2026-04-23 | 1.26.2 | 12/4/8 | OK |  |
| 2561 | viccon__sturdyc | https://github.com/viccon/sturdyc | 97fc006bbf | 2025-04-04 | 1.22 | 3/1/2 | OK |  |
| 2562 | vimeda__pletter | https://github.com/vimeda/pletter | f1d5882b4d | 2023-03-27 | 1.17 | 5/2/2 | OK |  |
| 2563 | viney-shih__go-cache | https://github.com/viney-shih/go-cache | 49f7681178 | 2023-01-26 | 1.18 | 49/10/14 | OK |  |
| 2564 | viney-shih__go-lock | https://github.com/viney-shih/go-lock | 2f19fd8ce3 | 2022-06-18 | 1.16 | 8/1/5 | OK |  |
| 2565 | vinod-morya__fibersse | https://github.com/vinod-morya/fibersse | 2a4a0c3af7 | 2026-05-02 | 1.25.0 | 29/16/16 | OK |  |
| 2566 | vinta__awesome-python | https://github.com/vinta/awesome-python | ca8ca17fbe | 2026-07-20 |  | 0/0/0 | EMPTY_GT |  |
| 2567 | visionmedia__debug | https://github.com/visionmedia/debug | f405ade8a4 | 2026-04-01 |  | 0/0/0 | EMPTY_GT |  |
| 2568 | visualfc__liteide | https://github.com/visualfc/liteide | f3ed6c205f | 2026-05-19 |  | 0/0/0 | EMPTY_GT |  |
| 2569 | vivek-ng__concurrency-limiter | https://github.com/vivek-ng/concurrency-limiter | cd7a4d1642 | 2026-03-29 | 1.14 | 0/0/0 | EMPTY_GT |  |
| 2570 | vkuznet__x509proxy | https://github.com/vkuznet/x509proxy | 6d33b8ccbe | 2025-01-19 | 1.16 | 0/0/0 | EMPTY_GT |  |
| 2571 | vladopajic__go-actor | https://github.com/vladopajic/go-actor | 6e83de660c | 2026-07-20 | 1.22 | 12/1/6 | OK |  |
| 2572 | vladopajic__go-test-coverage | https://github.com/vladopajic/go-test-coverage | 9846990d0c | 2026-07-20 | 1.26 | 65/15/20 | OK |  |
| 2573 | vodolaz095__dqueue | https://github.com/vodolaz095/dqueue | f7830e7f32 | 2026-04-26 | 1.26 | 0/0/0 | EMPTY_GT |  |
| 2574 | volatiletech__authboss | https://github.com/volatiletech/authboss | e94e98622f | 2025-11-24 | 1.24.0 | 17/5/6 | OK |  |
| 2575 | volatiletech__sqlboiler | https://github.com/volatiletech/sqlboiler | f9c1451122 | 2026-07-12 | 1.24.0 | 177/44/49 | OK |  |
| 2576 | volodymyrprokopyuk__go-blockchain | https://github.com/volodymyrprokopyuk/go-blockchain | 3f6e941df1 | 2025-08-17 | 1.23.0 | 49/10/10 | OK |  |
| 2577 | vorlif__spreak | https://github.com/vorlif/spreak | 347c9ddfc3 | 2025-09-28 | 1.23.0 | 11/1/5 | OK |  |
| 2578 | vrecan__death | https://github.com/vrecan/death | 88275e7df6 | 2024-12-16 | 1.18 | 0/0/0 | EMPTY_GT |  |
| 2579 | vrischmann__envconfig | https://github.com/vrischmann/envconfig | 33ff9a8a63 | 2025-01-31 | 1.13 | 0/0/0 | EMPTY_GT |  |
| 2580 | vtopc__epoch | https://github.com/vtopc/epoch | 9f7a07abc4 | 2024-02-25 | 1.21 | 0/0/0 | EMPTY_GT |  |
| 2581 | wI2L__jettison | https://github.com/wI2L/jettison | c70014c641 | 2023-01-06 | 1.18 | 14/0/6 | EMPTY_GT |  |
| 2582 | wI2L__jsondiff | https://github.com/wI2L/jsondiff | cc662875ff | 2026-04-01 | 1.24 | 5/4/4 | OK |  |
| 2583 | wa-lang__wa | https://github.com/wa-lang/wa | 68289efad0 | 2026-04-27 | 1.17 | 0/0/0 | EMPTY_GT |  |
| 2584 | wabarc__wayback | https://github.com/wabarc/wayback | 7807f929db | 2026-07-05 | 1.26 | 409/140/140 | OK |  |
| 2585 | wagoodman__dive | https://github.com/wagoodman/dive | d6c691947f | 2025-05-16 | 1.24 | 149/83/98 | OK |  |
| 2586 | wajox__gobase | https://github.com/wajox/gobase | 7fde5c427e | 2023-06-21 | 1.17 | 93/39/43 | OK |  |
| 2587 | wangyoucao577__go-project-layout | https://github.com/wangyoucao577/go-project-layout | 7677aa2986 | 2021-05-16 | 1.13 | 3/2/2 | OK |  |
| 2588 | webhookx-io__webhookx | https://github.com/webhookx-io/webhookx | d30d51a2ff | 2026-07-21 | 1.26.2 | 411/132/141 | OK |  |
| 2589 | webriots__rate | https://github.com/webriots/rate | ab7935fccf | 2025-08-11 | 1.23.0 | 1/0/0 | EMPTY_GT |  |
| 2590 | wellington__go-libsass | https://github.com/wellington/go-libsass | e1cda02735 | 2023-02-26 | 1.18 | 5/0/0 | EMPTY_GT |  |
| 2591 | wellington__wellington | https://github.com/wellington/wellington | efca34b007 | 2020-09-07 | 1.11 | 106/10/10 | OK |  |
| 2592 | wendigo__go-bind-plugin | https://github.com/wendigo/go-bind-plugin | 1892f67fe0 | 2019-08-29 |  | 0/0/0 | EMPTY_GT |  |
| 2593 | wenerme__go-req | https://github.com/wenerme/go-req | 5bff1aa58f | 2026-03-28 | 1.24 | 7/0/4 | EMPTY_GT |  |
| 2594 | wesovilabs__koazee | https://github.com/wesovilabs/koazee | b41b2b4240 | 2019-11-04 | 1.12 | 10/0/4 | EMPTY_GT |  |
| 2595 | wesql__wescale | https://github.com/wesql/wescale | e1b754ebba | 2025-03-07 | 1.23 | 587/189/200 | OK |  |
| 2596 | wgliang__goreporter | https://github.com/wgliang/goreporter | df1b20f7c5 | 2018-09-02 |  | 0/0/0 | EMPTY_GT |  |
| 2597 | whitaker-io__machine | https://github.com/whitaker-io/machine | bc97670541 | 2024-04-29 | 1.22.1 | 2/1/1 | OK |  |
| 2598 | white-pony__go-fann | https://github.com/white-pony/go-fann | 4baa018785 | 2015-02-03 |  | 0/0/0 | EMPTY_GT |  |
| 2599 | wisp-trading__wisp | https://github.com/wisp-trading/wisp | 1f3bb36d59 | 2026-04-08 | 1.24.2 | 314/120/126 | OK |  |
| 2600 | wit-ai__wit-go | https://github.com/wit-ai/wit-go | f9c0e77db1 | 2025-09-08 | 1.22 | 0/0/0 | EMPTY_GT |  |
| 2601 | wkhere__bcl | https://github.com/wkhere/bcl | b3ce8cb713 | 2026-06-17 | 1.21.0 | 3/1/2 | OK |  |
| 2602 | wlbr__feiertage | https://github.com/wlbr/feiertage | c76f7e5680 | 2026-05-18 | 1.25 | 1/0/0 | EMPTY_GT |  |
| 2603 | wlevene__ini | https://github.com/wlevene/ini | c8a2ece439 | 2025-03-13 | 1.16 | 3/2/2 | OK |  |
| 2604 | wneessen__go-hibp | https://github.com/wneessen/go-hibp | 001684d3fc | 2025-10-04 | 1.18 | 2/1/1 | OK |  |
| 2605 | wneessen__go-mail | https://github.com/wneessen/go-mail | 46f4d6f78b | 2026-07-19 | 1.25.0 | 9/2/2 | OK |  |
| 2606 | woodpecker-ci__woodpecker | https://github.com/woodpecker-ci/woodpecker | 2c1ebe7dca | 2026-07-20 | 1.26.0 | 414/201/206 | OK |  |
| 2607 | workanator__go-ataman | https://github.com/workanator/go-ataman | 503c6ff9de | 2020-12-23 |  | 0/0/0 | EMPTY_GT |  |
| 2608 | workanator__go-floc | https://github.com/workanator/go-floc | 7b5c7e5e8c | 2021-08-10 | 1.12 | 0/0/0 | EMPTY_GT |  |
| 2609 | wroge__scan | https://github.com/wroge/scan | 8c98e6fdb2 | 2024-03-08 | 1.21 | 0/0/0 | EMPTY_GT |  |
| 2610 | wroge__wgs84 | https://github.com/wroge/wgs84 | f58a846cc7 | 2026-06-25 | 1.26.4 | 1/0/0 | EMPTY_GT |  |
| 2611 | wzshiming__ctc | https://github.com/wzshiming/ctc | 8a6743fb38 | 2026-05-15 | 1.13 | 3/1/1 | OK |  |
| 2612 | wzshiming__gotype | https://github.com/wzshiming/gotype | 48e87de58e | 2026-07-10 | 1.18 | 0/0/0 | EMPTY_GT |  |
| 2613 | wzshiming__httpproxy | https://github.com/wzshiming/httpproxy | df42621b74 | 2026-07-10 | 1.25.0 | 9/0/2 | EMPTY_GT |  |
| 2614 | x-mod__routine | https://github.com/x-mod/routine | 3c831356db | 2026-05-19 | 1.14 | 35/7/7 | OK |  |
| 2615 | x1unix__docker-go-mingw | https://github.com/x1unix/docker-go-mingw | e69bfc5174 | 2026-06-08 |  | 0/0/0 | EMPTY_GT |  |
| 2616 | xaionaro-go__secureio | https://github.com/xaionaro-go/secureio | e0fcfedace | 2025-07-18 | 1.13 | 31/14/20 | OK |  |
| 2617 | xcodersun__eywa | https://github.com/xcodersun/eywa | 92eb8d4c46 | 2017-04-12 |  | 0/0/0 | EMPTY_GT |  |
| 2618 | xfxdev__xlog | https://github.com/xfxdev/xlog | 8752a01938 | 2019-01-15 |  | 0/0/0 | EMPTY_GT |  |
| 2619 | xfxdev__xtcp | https://github.com/xfxdev/xtcp | 2a44c141a8 | 2020-03-01 | 1.14 | 1/0/0 | EMPTY_GT |  |
| 2620 | xgzlucario__rotom | https://github.com/xgzlucario/rotom | 348f69f0e8 | 2024-12-15 | 1.23 | 130/32/39 | OK |  |
| 2621 | xhd2015__xgo | https://github.com/xhd2015/xgo | 0c2fa4679e | 2026-07-08 | 1.18 | 2/1/1 | OK |  |
| 2622 | xhit__go-simple-mail | https://github.com/xhit/go-simple-mail | a5ceaf25be | 2024-04-04 | 1.13 | 9/1/1 | OK |  |
| 2623 | xhit__go-str2duration | https://github.com/xhit/go-str2duration | f6c18de4fc | 2023-10-13 | 1.13 | 1/0/0 | EMPTY_GT |  |
| 2624 | xiaonanln__goworld | https://github.com/xiaonanln/goworld | 71ff877f1b | 2022-08-14 | 1.17 | 56/33/36 | OK |  |
| 2625 | xiaoxin01__typeregistry | https://github.com/xiaoxin01/typeregistry | e916fcd173 | 2020-02-20 | 1.13 | 0/0/0 | EMPTY_GT |  |
| 2626 | xis__baraka | https://github.com/xis/baraka | 2e837c2481 | 2022-09-30 | 1.14 | 0/0/0 | EMPTY_GT |  |
| 2627 | xitonix__trubka | https://github.com/xitonix/trubka | dcc4956329 | 2025-04-19 | 1.24.2 | 125/45/45 | OK |  |
| 2628 | xjasonlyu__tun2socks | https://github.com/xjasonlyu/tun2socks | 8dda19e8e4 | 2026-07-12 | 1.26.3 | 151/21/24 | OK |  |
| 2629 | xml-comp__xml-comp | https://github.com/xml-comp/xml-comp | 292fe466b9 | 2018-07-19 |  | 0/0/0 | EMPTY_GT |  |
| 2630 | xorcare__pointer | https://github.com/xorcare/pointer | 0e9027d886 | 2026-04-28 | 1.26 | 1/0/0 | EMPTY_GT |  |
| 2631 | xta__okrun | https://github.com/xta/okrun | 58675775e4 | 2014-10-05 |  | 0/0/0 | EMPTY_GT |  |
| 2632 | xtaci__gaio | https://github.com/xtaci/gaio | d260d35ac0 | 2026-02-19 | 1.21 | 2/1/1 | OK |  |
| 2633 | xtaci__gonet | https://github.com/xtaci/gonet | b8bfb19688 | 2024-07-25 |  | 0/0/0 | EMPTY_GT |  |
| 2634 | xtaci__kcp-go | https://github.com/xtaci/kcp-go | f3f1bbd9b9 | 2026-05-15 | 1.24.0 | 41/8/13 | OK |  |
| 2635 | xtaci__kcptun | https://github.com/xtaci/kcptun |  |  |  | 0/0/0 | CLONE_FAIL |  |
| 2636 | xujiajun__godbal | https://github.com/xujiajun/godbal | 77f3316e02 | 2019-01-30 |  | 0/0/0 | EMPTY_GT |  |
| 2637 | xujiajun__gorouter | https://github.com/xujiajun/gorouter |  |  |  | 0/0/0 | EMPTY_GT |  |
| 2638 | xujiajun__gotokenizer | https://github.com/xujiajun/gotokenizer | 2184aa574e | 2019-04-10 |  | 0/0/0 | EMPTY_GT |  |
| 2639 | xujiajun__nutsdb | https://github.com/xujiajun/nutsdb | 5ee3eaf904 | 2026-06-13 | 1.24.0 | 21/13/13 | OK |  |
| 2640 | xuri__aurora | https://github.com/xuri/aurora | 8ddad1a3ff | 2021-08-20 | 1.16 | 3/1/2 | OK |  |
| 2641 | xuri__excelize | https://github.com/xuri/excelize | 495311569d | 2026-07-15 | 1.25.0 | 21/8/13 | OK |  |
| 2642 | xuri__xgen | https://github.com/xuri/xgen | c9cf3fcb4a | 2026-05-24 | 1.23.0 | 15/2/6 | OK |  |
| 2643 | xwjdsh__awesome-go-extra | https://github.com/xwjdsh/awesome-go-extra | b47d586f1a | 2022-08-25 | 1.16 | 95/9/9 | OK |  |
| 2644 | xwjdsh__manssh | https://github.com/xwjdsh/manssh | a7b987ecdb | 2022-02-11 | 1.17 | 11/5/8 | OK |  |
| 2645 | xxjwxc__ginrpc | https://github.com/xxjwxc/ginrpc | 1d0f30c90f | 2025-07-06 | 1.20 | 309/28/28 | OK |  |
| 2646 | xxjwxc__gofal | https://github.com/xxjwxc/gofal | 7b4349ad56 | 2019-10-08 | 1.12 | 24/0/0 | EMPTY_GT |  |
| 2647 | xxjwxc__gormt | https://github.com/xxjwxc/gormt | 5dd065bb26 | 2026-02-12 | 1.24.0 | 325/48/48 | OK |  |
| 2648 | xxjwxc__gowp | https://github.com/xxjwxc/gowp | 5be68d2223 | 2024-09-29 | 1.13 | 150/12/12 | OK |  |
| 2649 | xybor-x__xylog | https://github.com/xybor-x/xylog | 132e292278 | 2023-01-13 | 1.18 | 5/4/4 | OK |  |
| 2650 | xyproto__algernon | https://github.com/xyproto/algernon | 64ad80dd0d | 2026-07-18 | 1.26 | 223/111/111 | OK |  |
| 2651 | xyproto__permissions | https://github.com/xyproto/permissions | 3a8f863654 | 2026-07-06 | 1.25.0 | 21/11/11 | OK |  |
| 2652 | yaa110__go-persian-calendar | https://github.com/yaa110/go-persian-calendar | 9018e8e266 | 2025-09-28 | 1.20 | 1/0/0 | EMPTY_GT |  |
| 2653 | yaa110__goterator | https://github.com/yaa110/goterator | 8a992be8d1 |  |  | 0/0/0 | EMPTY_GT |  |
| 2654 | yahoo__vssh | https://github.com/yahoo/vssh | bfa903e660 | 2020-11-21 | 1.14 | 15/1/3 | OK |  |
| 2655 | yaitoo__async | https://github.com/yaitoo/async | 74db4a9f48 | 2024-03-18 | 1.18 | 7/0/4 | EMPTY_GT |  |
| 2656 | yaitoo__xun | https://github.com/yaitoo/xun | 942ac62d22 | 2026-07-10 | 1.24.0 | 23/11/15 | OK |  |
| 2657 | yanyiwu__gojieba | https://github.com/yanyiwu/gojieba | a487e26092 | 2026-07-20 | 1.17 | 1/0/0 | EMPTY_GT |  |
| 2658 | yaronn__blessed-contrib | https://github.com/yaronn/blessed-contrib | 45a7db64c8 | 2026-05-01 |  | 0/0/0 | EMPTY_GT |  |
| 2659 | yaronsumel__filler | https://github.com/yaronsumel/filler | 2d383ee0c6 | 2017-04-10 |  | 0/0/0 | EMPTY_GT |  |
| 2660 | yaronsumel__grapes | https://github.com/yaronsumel/grapes | 88727b5743 | 2025-04-18 | 1.15 | 16/3/3 | OK |  |
| 2661 | yassinebenaid__bunster | https://github.com/yassinebenaid/bunster | e6cacb463f | 2026-04-28 | 1.23.0 | 16/5/5 | OK |  |
| 2662 | yassinebenaid__godump | https://github.com/yassinebenaid/godump | 1ec5d7b4db | 2025-05-16 | 1.21.0 | 1/0/0 | EMPTY_GT |  |
| 2663 | yazgazan__jaydiff | https://github.com/yazgazan/jaydiff | 822d6a2b1b | 2026-04-21 | 1.10 | 9/8/8 | OK |  |
| 2664 | ybbus__httpretry | https://github.com/ybbus/httpretry | 3adfad4cb8 | 2023-02-23 | 1.19 | 0/0/0 | EMPTY_GT |  |
| 2665 | ybbus__jsonrpc | https://github.com/ybbus/jsonrpc | 85c0ab1b5a | 2025-10-26 | 1.21 | 0/0/0 | EMPTY_GT |  |
| 2666 | ydb-platform__ydb-go-sdk | https://github.com/ydb-platform/ydb-go-sdk | 55002b8521 | 2026-07-20 | 1.24.0 | 77/17/17 | OK |  |
| 2667 | yeqown__go-qrcode | https://github.com/yeqown/go-qrcode | 04fcf59314 | 2026-05-28 | 1.19 | 35/2/6 | OK |  |
| 2668 | yl2chen__cidranger | https://github.com/yl2chen/cidranger | d1cb2c52f3 | 2021-09-27 | 1.13 | 0/0/0 | EMPTY_GT |  |
| 2669 | yookoala__restit | https://github.com/yookoala/restit | f53d8d5bf8 | 2024-06-02 | 1.18 | 9/2/2 | OK |  |
| 2670 | yourbasic__bit | https://github.com/yourbasic/bit | 45a4409f40 | 2018-03-13 |  | 0/0/0 | EMPTY_GT |  |
| 2671 | yourbasic__bloom | https://github.com/yourbasic/bloom | 04a87e707a | 2017-06-02 |  | 0/0/0 | EMPTY_GT |  |
| 2672 | yourbasic__graph | https://github.com/yourbasic/graph | 8ecfec1c28 | 2021-06-06 |  | 0/0/0 | EMPTY_GT |  |
| 2673 | yourbasic__radix | https://github.com/yourbasic/radix | cbe1cc82e9 | 2018-03-08 |  | 0/0/0 | EMPTY_GT |  |
| 2674 | youthlin__stream | https://github.com/youthlin/stream | cefbf400c1 | 2024-02-08 | 1.15 | 0/0/0 | EMPTY_GT |  |
| 2675 | youthlin__t | https://github.com/youthlin/t | e1a570bbea | 2026-06-26 | 1.23.0 | 35/4/7 | OK |  |
| 2676 | youtube__vitess | https://github.com/youtube/vitess | 8d4af4d2b6 | 2026-07-20 | 1.26.5 | 491/201/207 | OK |  |
| 2677 | ysmood__got | https://github.com/ysmood/got | 67c8c4d452 | 2026-06-29 | 1.21 | 4/1/1 | OK |  |
| 2678 | yudppp__throttle | https://github.com/yudppp/throttle | 98088593f0 | 2021-08-25 | 1.16 | 0/0/0 | EMPTY_GT |  |
| 2679 | yuin__goldmark | https://github.com/yuin/goldmark | 50ba9fc8cb | 2026-07-12 | 1.22 | 0/0/0 | EMPTY_GT |  |
| 2680 | yuin__gopher-lua | https://github.com/yuin/gopher-lua | 75f497656b | 2026-04-01 | 1.23 | 5/1/1 | OK |  |
| 2681 | yunabe__lgo | https://github.com/yunabe/lgo | 42c42d410f | 2019-07-09 |  | 0/0/0 | EMPTY_GT |  |
| 2682 | yuroyoro__goast-viewer | https://github.com/yuroyoro/goast-viewer | 3d08b047cb | 2019-05-31 | 1.12 | 0/0/0 | EMPTY_GT |  |
| 2683 | yuseferi__envyaml | https://github.com/yuseferi/envyaml | 31858191fa | 2025-12-25 | 1.25 | 8/2/5 | OK |  |
| 2684 | yuseferi__gocache | https://github.com/yuseferi/gocache | eab12741df | 2025-12-18 | 1.25 | 1/0/0 | EMPTY_GT |  |
| 2685 | yuseferi__scheduler | https://github.com/yuseferi/scheduler | 930561ee74 | 2026-04-04 | 1.26.1 | 122/4/52 | OK |  |
| 2686 | yuseferi__zax | https://github.com/yuseferi/zax | 70f8f98005 | 2026-04-05 | 1.26.1 | 11/2/6 | OK |  |
| 2687 | yusufcanb__tlm | https://github.com/yusufcanb/tlm | 9183330362 | 2026-02-22 | 1.22 | 154/42/42 | OK |  |
| 2688 | yvasiyarov__php_session_decoder | https://github.com/yvasiyarov/php_session_decoder | a065a3b0b7 | 2018-08-03 |  | 0/0/0 | EMPTY_GT |  |
| 2689 | z5labs__bedrock | https://github.com/z5labs/bedrock | ab02f729e1 | 2026-07-16 | 1.25.0 | 86/37/41 | OK |  |
| 2690 | z7zmey__php-parser | https://github.com/z7zmey/php-parser | 367eff9de6 | 2021-02-13 | 1.13 | 7/2/5 | OK |  |
| 2691 | zRedShift__mimemagic | https://github.com/zRedShift/mimemagic | 5028b726e7 | 2023-02-27 | 1.16 | 11/2/2 | OK |  |
| 2692 | zach-klippenstein__goregen | https://github.com/zach-klippenstein/goregen | 795b5e3961 | 2016-03-03 |  | 0/0/0 | EMPTY_GT |  |
| 2693 | zc2638__swag | https://github.com/zc2638/swag | 9b1f0c8d2b | 2024-04-07 | 1.16 | 14/1/5 | OK |  |
| 2694 | zcalusic__sysinfo | https://github.com/zcalusic/sysinfo | 64129099fd | 2024-12-09 | 1.23 | 2/1/1 | OK |  |
| 2695 | zegl__goriak | https://github.com/zegl/goriak | 853c1d1c26 | 2018-12-28 |  | 12/4/8 | OK |  |
| 2696 | zekroTJA__timedmap | https://github.com/zekroTJA/timedmap | 65747566e4 | 2024-05-05 | 1.19 | 0/0/0 | EMPTY_GT |  |
| 2697 | zendev-sh__goai | https://github.com/zendev-sh/goai | eea8799e34 | 2026-07-20 | 1.25.0 | 10/2/3 | OK |  |
| 2698 | zendev-sh__zenflow | https://github.com/zendev-sh/zenflow | 7136bee1c7 | 2026-06-20 | 1.25.0 | 64/12/13 | OK |  |
| 2699 | zenthangplus__go-workerpool | https://github.com/zenthangplus/go-workerpool | 5ef8570414 | 2022-08-20 | 1.14 | 8/1/5 | OK |  |
| 2700 | zenthangplus__goccm | https://github.com/zenthangplus/goccm |  |  |  | 0/0/0 | EMPTY_GT |  |
| 2701 | zeromq__libzmq | https://github.com/zeromq/libzmq | ba63f03727 | 2026-07-04 |  | 0/0/0 | EMPTY_GT |  |
| 2702 | zerosnake0__go-json-benchmark | https://github.com/zerosnake0/go-json-benchmark | 89dede3cfa | 2020-10-08 | 1.15 | 31/17/18 | OK |  |
| 2703 | zerosnake0__goctx | https://github.com/zerosnake0/goctx | 74eeded162 | 2020-11-24 | 1.15 | 9/1/6 | OK |  |
| 2704 | zerosnake0__jzon | https://github.com/zerosnake0/jzon | 3558d4ef71 | 2022-08-03 | 1.15 | 0/0/0 | EMPTY_GT |  |
| 2705 | zhenghaoz__gorse | https://github.com/zhenghaoz/gorse |  |  |  | 0/0/0 | CLONE_FAIL |  |
| 2706 | zhenjl__bloom | https://github.com/zhenjl/bloom | e24b032dcc | 2015-10-26 |  | 0/0/0 | EMPTY_GT |  |
| 2707 | zhenjl__porter2 | https://github.com/zhenjl/porter2 | 56e4718818 | 2015-08-29 |  | 0/0/0 | EMPTY_GT |  |
| 2708 | zhuangsirui__binpacker | https://github.com/zhuangsirui/binpacker | 146476ded2 | 2021-07-13 |  | 0/0/0 | EMPTY_GT |  |
| 2709 | zhufuyi__sponge | https://github.com/zhufuyi/sponge | beef9eecdc | 2025-12-14 | 1.23.0 | 498/210/212 | OK |  |
| 2710 | zhulongcheng__testsql | https://github.com/zhulongcheng/testsql | 75d045b177 | 2019-09-26 |  | 0/0/0 | EMPTY_GT |  |
| 2711 | zimmski__tavor | https://github.com/zimmski/tavor | 9f3410897a | 2018-10-31 |  | 0/0/0 | EMPTY_GT |  |
| 2712 | zitadel__oidc | https://github.com/zitadel/oidc | b308f568f7 | 2026-07-15 | 1.25.0 | 49/25/31 | OK |  |
| 2713 | zitadel__passwap | https://github.com/zitadel/passwap | 2385e0522e | 2026-07-09 | 1.25.0 | 6/2/2 | OK |  |
| 2714 | zitryss__go-sample | https://github.com/zitryss/go-sample | 889bbede3c | 2019-01-25 |  | 4/3/3 | OK |  |
| 2715 | ziutek__emgo | https://github.com/ziutek/emgo | 168ccc21e6 | 2021-12-05 | 1.16 | 5/1/1 | OK |  |
| 2716 | zoharbabin__web-researcher-mcp | https://github.com/zoharbabin/web-researcher-mcp | 4f4550126e | 2026-07-17 | 1.25.12 | 445/34/36 | OK |  |
| 2717 | zoomio__tagify | https://github.com/zoomio/tagify | 3d6a68cc3c | 2024-07-18 | 1.22 | 34/15/19 | OK |  |
| 2718 | zoumo__goset | https://github.com/zoumo/goset | 8dc59739a7 | 2020-12-11 | 1.12 | 0/0/0 | EMPTY_GT |  |
| 2719 | zpatrick__rclient | https://github.com/zpatrick/rclient | 00dfceed50 | 2019-11-27 |  | 0/0/0 | EMPTY_GT |  |
| 2720 | zserge__webview | https://github.com/zserge/webview | cbbdee44af | 2026-03-09 |  | 0/0/0 | EMPTY_GT |  |
| 2721 | ztrue__shutdown | https://github.com/ztrue/shutdown | a67115d31c | 2022-01-15 |  | 1/0/0 | EMPTY_GT |  |
| 2722 | ztrue__tracerr | https://github.com/ztrue/tracerr | 9e268b231b | 2026-04-01 |  | 0/0/0 | EMPTY_GT |  |
| 2723 | zubairhamed__canopus | https://github.com/zubairhamed/canopus | e374f5b1a0 | 2018-02-07 |  | 0/0/0 | EMPTY_GT |  |
