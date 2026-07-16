# census — per-repo メトリクス（全リポジトリ × 4ツール）

各行 = 1リポジトリ × 1ツール。GT定義は **all**=`go list -m all` / **imp**=`go list -deps`（root・linux・非test）/ **impT**=imp＋test。
数値は **name一致**の tp/fp/fn と F1(%)。version一致F1も併記。NA=そのツールが出力を出せず失敗。

| repo | tool | all tp/fp/fn | all F1 | imp tp/fp/fn | imp F1 | impT tp/fp/fn | impT F1 | verF1(all/imp/impT) |
|------|------|---|--:|---|--:|---|--:|--:|
| 0xcafed00d__joystick | syft | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 100.0/100.0/100.0 |
| 0xcafed00d__joystick | trivy | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 100.0/100.0/100.0 |
| 0xcafed00d__joystick | cdxgen | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 100.0/100.0/100.0 |
| 0xcafed00d__joystick | cyclonedx-gomod | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 100.0/100.0/100.0 |
| 1set__cronrange | syft | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| 1set__cronrange | trivy | 1/1/0 | 66.7 | 1/1/0 | 66.7 | 1/1/0 | 66.7 | 66.7/66.7/66.7 |
| 1set__cronrange | cdxgen | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| 1set__cronrange | cyclonedx-gomod | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| Antonboom__testifylint | syft | 5/12/3 | 40.0 | 3/14/0 | 30.0 | 3/14/0 | 30.0 | 30.8/28.6/28.6 |
| Antonboom__testifylint | trivy | 4/12/4 | 33.3 | 3/13/0 | 31.6 | 3/13/0 | 31.6 | 24.0/30.0/30.0 |
| Antonboom__testifylint | cdxgen | 4/11/4 | 34.8 | 3/12/0 | 33.3 | 3/12/0 | 33.3 | 25.0/31.6/31.6 |
| Antonboom__testifylint | cyclonedx-gomod | 2/0/6 | 40.0 | 2/0/1 | 80.0 | 2/0/1 | 80.0 | 40.0/80.0/80.0 |
| Antonito__gfile | syft | 40/0/11 | 87.9 | 31/9/0 | 87.3 | 35/5/0 | 93.3 | 87.9/87.3/93.3 |
| Antonito__gfile | trivy | 36/0/15 | 82.8 | 31/5/0 | 92.5 | 35/1/0 | 98.6 | 82.8/92.5/98.6 |
| Antonito__gfile | cdxgen | 31/0/20 | 75.6 | 31/0/0 | 100.0 | 31/0/4 | 93.9 | 75.6/100.0/93.9 |
| Antonito__gfile | cyclonedx-gomod | 32/0/19 | 77.1 | 31/1/0 | 98.4 | 31/1/4 | 92.5 | 77.1/98.4/92.5 |
| BrianLeishman__go-imap | syft | 30/0/7 | 89.6 | 26/4/0 | 92.9 | 26/4/0 | 92.9 | 89.6/92.9/92.9 |
| BrianLeishman__go-imap | trivy | 26/0/11 | 82.5 | 26/0/0 | 100.0 | 26/0/0 | 100.0 | 82.5/100.0/100.0 |
| BrianLeishman__go-imap | cdxgen | 26/0/11 | 82.5 | 26/0/0 | 100.0 | 26/0/0 | 100.0 | 82.5/100.0/100.0 |
| BrianLeishman__go-imap | cyclonedx-gomod | 26/0/11 | 82.5 | 26/0/0 | 100.0 | 26/0/0 | 100.0 | 82.5/100.0/100.0 |
| DavidGamba__go-getoptions | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| DeRuina__timberjack | syft | 2/0/0 | 100.0 | 1/1/0 | 66.7 | 2/0/0 | 100.0 | 100.0/66.7/100.0 |
| DeRuina__timberjack | trivy | 2/0/0 | 100.0 | 1/1/0 | 66.7 | 2/0/0 | 100.0 | 100.0/66.7/100.0 |
| DeRuina__timberjack | cdxgen | 1/0/1 | 66.7 | 1/0/0 | 100.0 | 1/0/1 | 66.7 | 66.7/100.0/66.7 |
| DeRuina__timberjack | cyclonedx-gomod | 1/0/1 | 66.7 | 1/0/0 | 100.0 | 1/0/1 | 66.7 | 66.7/100.0/66.7 |
| DiceDB__dice | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| Dynom__TySug | syft | 13/0/3 | 89.7 | 8/5/0 | 76.2 | 9/4/0 | 81.8 | 89.7/76.2/81.8 |
| Dynom__TySug | trivy | 10/0/6 | 76.9 | 8/2/0 | 88.9 | 9/1/0 | 94.7 | 76.9/88.9/94.7 |
| Dynom__TySug | cdxgen | 8/0/8 | 66.7 | 8/0/0 | 100.0 | 8/0/1 | 94.1 | 66.7/100.0/94.1 |
| Dynom__TySug | cyclonedx-gomod | 9/0/7 | 72.0 | 8/1/0 | 94.1 | 8/1/1 | 88.9 | 72.0/94.1/88.9 |
| Edgenesis__shifu | syft | 166/0/269 | 55.2 | 126/40/0 | 86.3 | 134/32/0 | 89.3 | 55.2/86.3/89.3 |
| Edgenesis__shifu | trivy | 137/0/298 | 47.9 | 126/11/0 | 95.8 | 134/3/0 | 98.9 | 47.9/95.8/98.9 |
| Edgenesis__shifu | cdxgen | 126/0/309 | 44.9 | 126/0/0 | 100.0 | 126/0/8 | 96.9 | 44.9/100.0/96.9 |
| Edgenesis__shifu | cyclonedx-gomod | 119/0/316 | 43.0 | 118/1/8 | 96.3 | 118/1/16 | 93.3 | 43.0/96.3/93.3 |
| Eun__go-convert | syft | 0/6/0 | 0.0 | 5/1/0 | 90.9 | 5/1/0 | 90.9 | 0.0/90.9/90.9 |
| Eun__go-convert | trivy | 0/7/0 | 0.0 | 5/2/0 | 83.3 | 5/2/0 | 83.3 | 0.0/76.9/76.9 |
| Eun__go-convert | cdxgen | 0/5/0 | 0.0 | 5/0/0 | 100.0 | 5/0/0 | 100.0 | 0.0/100.0/100.0 |
| Eun__go-convert | cyclonedx-gomod | 0/5/0 | 0.0 | 5/0/0 | 100.0 | 5/0/0 | 100.0 | 0.0/100.0/100.0 |
| Evertras__bubble-table | syft | 27/0/8 | 87.1 | 19/8/0 | 82.6 | 23/4/0 | 92.0 | 87.1/82.6/92.0 |
| Evertras__bubble-table | trivy | 23/0/12 | 79.3 | 19/4/0 | 90.5 | 23/0/0 | 100.0 | 79.3/90.5/100.0 |
| Evertras__bubble-table | cdxgen | 19/0/16 | 70.4 | 19/0/0 | 100.0 | 19/0/4 | 90.5 | 70.4/100.0/90.5 |
| Evertras__bubble-table | cyclonedx-gomod | 19/0/16 | 70.4 | 19/0/0 | 100.0 | 19/0/4 | 90.5 | 70.4/100.0/90.5 |
| Eyevinn__mp4ff | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| Fs02__grimoire | syft | 12/0/0 | 100.0 | 11/1/0 | 95.7 | 12/0/0 | 100.0 | 100.0/95.7/100.0 |
| Fs02__grimoire | trivy | 12/0/0 | 100.0 | 11/1/0 | 95.7 | 12/0/0 | 100.0 | 100.0/95.7/100.0 |
| Fs02__grimoire | cdxgen | 11/0/1 | 95.7 | 11/0/0 | 100.0 | 11/0/1 | 95.7 | 95.7/100.0/95.7 |
| Fs02__grimoire | cyclonedx-gomod | 11/0/1 | 95.7 | 11/0/0 | 100.0 | 11/0/1 | 95.7 | 95.7/100.0/95.7 |
| Fs02__wire | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| GolangUA__gopher-logos | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| Guitarbum722__align | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| Haraj-backend__hex-monscape | syft | 28/0/25 | 69.1 | 16/12/0 | 72.7 | 20/8/0 | 83.3 | 69.1/72.7/83.3 |
| Haraj-backend__hex-monscape | trivy | 22/0/31 | 58.7 | 16/6/0 | 84.2 | 20/2/0 | 95.2 | 58.7/84.2/95.2 |
| Haraj-backend__hex-monscape | cdxgen | 16/0/37 | 46.4 | 16/0/0 | 100.0 | 16/0/4 | 88.9 | 46.4/100.0/88.9 |
| Haraj-backend__hex-monscape | cyclonedx-gomod | 16/0/37 | 46.4 | 16/0/0 | 100.0 | 16/0/4 | 88.9 | 46.4/100.0/88.9 |
| Henry-Sarabia__blank | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| Henry-Sarabia__sliceconv | syft | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| Henry-Sarabia__sliceconv | trivy | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| Henry-Sarabia__sliceconv | cdxgen | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| Henry-Sarabia__sliceconv | cyclonedx-gomod | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| Jacobbrewer1__patcher | syft | 0/35/0 | 0.0 | 6/29/0 | 29.3 | 6/29/0 | 29.3 | 0.0/29.3/29.3 |
| Jacobbrewer1__patcher | trivy | 0/35/0 | 0.0 | 6/29/0 | 29.3 | 6/29/0 | 29.3 | 0.0/29.3/29.3 |
| Jacobbrewer1__patcher | cdxgen | 0/35/0 | 0.0 | 6/29/0 | 29.3 | 6/29/0 | 29.3 | 0.0/29.3/29.3 |
| Jacobbrewer1__patcher | cyclonedx-gomod | 0/35/0 | 0.0 | 6/29/0 | 29.3 | 6/29/0 | 29.3 | 0.0/29.3/29.3 |
| JoelOtter__termloop | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| JoshuaDoes__gofuckyourself | syft | 1/0/3 | 40.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 40.0/100.0/100.0 |
| JoshuaDoes__gofuckyourself | trivy | 1/0/3 | 40.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 40.0/100.0/100.0 |
| JoshuaDoes__gofuckyourself | cdxgen | 1/0/3 | 40.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 40.0/100.0/100.0 |
| JoshuaDoes__gofuckyourself | cyclonedx-gomod | 1/0/3 | 40.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 40.0/100.0/100.0 |
| Kachit__dusupay-sdk-go | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| Kachit__gorm-seeder | syft | 29/0/38 | 60.4 | 3/26/0 | 18.8 | 19/10/0 | 79.2 | 60.4/18.8/79.2 |
| Kachit__gorm-seeder | trivy | 67/0/0 | 100.0 | 3/64/0 | 8.6 | 19/48/0 | 44.2 | 100.0/8.6/44.2 |
| Kachit__gorm-seeder | cdxgen | 3/0/64 | 8.6 | 3/0/0 | 100.0 | 3/0/16 | 27.3 | 8.6/100.0/27.3 |
| Kachit__gorm-seeder | cyclonedx-gomod | 3/0/64 | 8.6 | 3/0/0 | 100.0 | 3/0/16 | 27.3 | 8.6/100.0/27.3 |
| go-external-config__go | syft | 8/0/1 | 94.1 | 4/4/0 | 66.7 | 7/1/0 | 93.3 | 94.1/66.7/93.3 |
| go-external-config__go | trivy | 7/0/2 | 87.5 | 4/3/0 | 72.7 | 7/0/0 | 100.0 | 87.5/72.7/100.0 |
| go-external-config__go | cdxgen | 4/0/5 | 61.5 | 4/0/0 | 100.0 | 4/0/3 | 72.7 | 61.5/100.0/72.7 |
| go-external-config__go | cyclonedx-gomod | 4/0/5 | 61.5 | 4/0/0 | 100.0 | 4/0/3 | 72.7 | 61.5/100.0/72.7 |
| go-ffmt__ffmt | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| go-furnace__go-furnace | syft | 42/0/24 | 77.8 | 34/8/0 | 89.5 | 34/8/0 | 89.5 | 77.8/89.5/89.5 |
| go-furnace__go-furnace | trivy | 66/0/0 | 100.0 | 34/32/0 | 68.0 | 34/32/0 | 68.0 | 100.0/68.0/68.0 |
| go-furnace__go-furnace | cdxgen | 34/0/32 | 68.0 | 34/0/0 | 100.0 | 34/0/0 | 100.0 | 68.0/100.0/100.0 |
| go-furnace__go-furnace | cyclonedx-gomod | 35/0/31 | 69.3 | 34/1/0 | 98.6 | 34/1/0 | 98.6 | 69.3/98.6/98.6 |
| go-gitea__gitea | syft | 335/0/372 | 64.3 | 258/77/0 | 87.0 | 258/77/0 | 87.0 | 63.5/85.7/85.7 |
| go-gitea__gitea | trivy | 268/0/439 | 55.0 | 258/10/0 | 98.1 | 258/10/0 | 98.1 | 54.2/96.6/96.6 |
| go-gitea__gitea | cdxgen | 258/0/449 | 53.5 | 258/0/0 | 100.0 | 258/0/0 | 100.0 | 53.5/100.0/100.0 |
| go-gitea__gitea | cyclonedx-gomod | 267/0/440 | 54.8 | 258/9/0 | 98.3 | 258/9/0 | 98.3 | 54.0/96.8/96.8 |
| go-ole__go-ole | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| go-ozzo__ozzo-log | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| go-ozzo__ozzo-validation | syft | 6/0/1 | 92.3 | 1/5/0 | 28.6 | 5/1/0 | 90.9 | 92.3/28.6/90.9 |
| go-ozzo__ozzo-validation | trivy | 7/0/0 | 100.0 | 1/6/0 | 25.0 | 5/2/0 | 83.3 | 100.0/25.0/83.3 |
| go-ozzo__ozzo-validation | cdxgen | 1/0/6 | 25.0 | 1/0/0 | 100.0 | 1/0/4 | 33.3 | 25.0/100.0/33.3 |
| go-ozzo__ozzo-validation | cyclonedx-gomod | 1/0/6 | 25.0 | 1/0/0 | 100.0 | 1/0/4 | 33.3 | 25.0/100.0/33.3 |
| go-playground__assert | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| go-spring__spring-core | syft | 23/0/18 | 71.9 | 15/8/0 | 78.9 | 15/8/0 | 78.9 | 71.9/78.9/78.9 |
| go-spring__spring-core | trivy | 17/0/24 | 58.6 | 15/2/0 | 93.8 | 15/2/0 | 93.8 | 58.6/93.8/93.8 |
| go-spring__spring-core | cdxgen | 15/0/26 | 53.6 | 15/0/0 | 100.0 | 15/0/0 | 100.0 | 53.6/100.0/100.0 |
| go-spring__spring-core | cyclonedx-gomod | 17/0/24 | 58.6 | 15/2/0 | 93.8 | 15/2/0 | 93.8 | 58.6/93.8/93.8 |
| go-sql-driver__mysql | syft | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| go-sql-driver__mysql | trivy | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| go-sql-driver__mysql | cdxgen | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| go-sql-driver__mysql | cyclonedx-gomod | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| go-task__task | syft | 127/0/260 | 49.4 | 123/4/0 | 98.4 | 125/2/0 | 99.2 | 49.4/98.4/99.2 |
| go-task__task | trivy | 127/0/260 | 49.4 | 123/4/0 | 98.4 | 125/2/0 | 99.2 | 49.4/98.4/99.2 |
| go-task__task | cdxgen | 123/0/264 | 48.2 | 123/0/0 | 100.0 | 123/0/2 | 99.2 | 48.2/100.0/99.2 |
| go-task__task | cyclonedx-gomod | NA | | NA | | NA | | |
| go-telegram__bot | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| godbus__dbus | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| gofiber__fiber | syft | 24/0/5 | 90.6 | 17/7/0 | 82.9 | 22/2/0 | 95.7 | 90.6/82.9/95.7 |
| gofiber__fiber | trivy | 22/0/7 | 86.3 | 17/5/0 | 87.2 | 22/0/0 | 100.0 | 86.3/87.2/100.0 |
| gofiber__fiber | cdxgen | 17/0/12 | 73.9 | 17/0/0 | 100.0 | 17/0/5 | 87.2 | 73.9/100.0/87.2 |
| gofiber__fiber | cyclonedx-gomod | 17/0/12 | 73.9 | 17/0/0 | 100.0 | 17/0/5 | 87.2 | 73.9/100.0/87.2 |
| gofr-dev__gofr | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| gogf__gf | syft | 42/213/1 | 28.2 | 27/228/0 | 19.1 | 27/228/0 | 19.1 | 23.3/16.5/16.5 |
| gogf__gf | trivy | 35/181/8 | 27.0 | 27/189/0 | 22.2 | 27/189/0 | 22.2 | 22.1/19.1/19.1 |
| gogf__gf | cdxgen | NA | | NA | | NA | | |
| gogf__gf | cyclonedx-gomod | 27/0/16 | 77.1 | 27/0/0 | 100.0 | 27/0/0 | 100.0 | 77.1/100.0/100.0 |
| golang-jwt__jwt | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| golang-module__dongle | syft | 7/0/4 | 77.8 | 2/5/0 | 44.4 | 6/1/0 | 92.3 | 77.8/44.4/92.3 |
| golang-module__dongle | trivy | 6/0/5 | 70.6 | 2/4/0 | 50.0 | 6/0/0 | 100.0 | 70.6/50.0/100.0 |
| golang-module__dongle | cdxgen | 2/0/9 | 30.8 | 2/0/0 | 100.0 | 2/0/4 | 50.0 | 30.8/100.0/50.0 |
| golang-module__dongle | cyclonedx-gomod | 2/0/9 | 30.8 | 2/0/0 | 100.0 | 2/0/4 | 50.0 | 30.8/100.0/50.0 |
| inancgumus__learngo | syft | 10/0/2 | 90.9 | 10/0/0 | 100.0 | 10/0/0 | 100.0 | 90.9/100.0/100.0 |
| inancgumus__learngo | trivy | 12/0/0 | 100.0 | 10/2/0 | 90.9 | 10/2/0 | 90.9 | 100.0/90.9/90.9 |
| inancgumus__learngo | cdxgen | 6/0/6 | 66.7 | 6/0/4 | 75.0 | 6/0/4 | 75.0 | 66.7/75.0/75.0 |
| inancgumus__learngo | cyclonedx-gomod | 10/0/2 | 90.9 | 10/0/0 | 100.0 | 10/0/0 | 100.0 | 90.9/100.0/100.0 |
| inconshreveable__log15 | syft | 3/2/0 | 75.0 | 3/2/0 | 75.0 | 3/2/0 | 75.0 | 75.0/75.0/75.0 |
| inconshreveable__log15 | trivy | 3/2/0 | 75.0 | 3/2/0 | 75.0 | 3/2/0 | 75.0 | 75.0/75.0/75.0 |
| inconshreveable__log15 | cdxgen | 3/1/0 | 85.7 | 3/1/0 | 85.7 | 3/1/0 | 85.7 | 85.7/85.7/85.7 |
| inconshreveable__log15 | cyclonedx-gomod | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 100.0/100.0/100.0 |
| indeedeng__iwf | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| ivpusic__rerun | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| panjf2000__ants | syft | 6/0/1 | 92.3 | 1/5/0 | 28.6 | 5/1/0 | 90.9 | 92.3/28.6/90.9 |
| panjf2000__ants | trivy | 5/0/2 | 83.3 | 1/4/0 | 33.3 | 5/0/0 | 100.0 | 83.3/33.3/100.0 |
| panjf2000__ants | cdxgen | 1/0/6 | 25.0 | 1/0/0 | 100.0 | 1/0/4 | 33.3 | 25.0/100.0/33.3 |
| panjf2000__ants | cyclonedx-gomod | 1/0/6 | 25.0 | 1/0/0 | 100.0 | 1/0/4 | 33.3 | 25.0/100.0/33.3 |
| pascaldekloe__colfer | syft | 5/0/9 | 52.6 | 3/2/0 | 75.0 | 4/1/0 | 88.9 | 45.5/54.5/66.7 |
| pascaldekloe__colfer | trivy | NA | | NA | | NA | | |
| pascaldekloe__colfer | cdxgen | 3/0/11 | 35.3 | 3/0/0 | 100.0 | 3/0/1 | 85.7 | 35.3/100.0/85.7 |
| pascaldekloe__colfer | cyclonedx-gomod | 3/0/11 | 35.3 | 3/0/0 | 100.0 | 3/0/1 | 85.7 | 35.3/100.0/85.7 |
| pdfcpu__pdfcpu | syft | 14/0/9 | 75.7 | 12/2/0 | 92.3 | 12/2/0 | 92.3 | 75.7/92.3/92.3 |
| pdfcpu__pdfcpu | trivy | 13/0/10 | 72.2 | 12/1/0 | 96.0 | 12/1/0 | 96.0 | 72.2/96.0/96.0 |
| pdfcpu__pdfcpu | cdxgen | 12/0/11 | 68.6 | 12/0/0 | 100.0 | 12/0/0 | 100.0 | 68.6/100.0/100.0 |
| pdfcpu__pdfcpu | cyclonedx-gomod | 13/0/10 | 72.2 | 12/1/0 | 96.0 | 12/1/0 | 96.0 | 72.2/96.0/96.0 |
| pelletier__go-toml | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| rbrahul__gofp | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| rekby__fastuuid | syft | 6/9/1 | 54.5 | 1/14/0 | 12.5 | 5/10/0 | 50.0 | 52.2/11.8/47.6 |
| rekby__fastuuid | trivy | 6/7/1 | 60.0 | 1/12/0 | 14.3 | 5/8/0 | 55.6 | 50.0/14.3/55.6 |
| rekby__fastuuid | cdxgen | 1/0/6 | 25.0 | 1/0/0 | 100.0 | 1/0/4 | 33.3 | 25.0/100.0/33.3 |
| rekby__fastuuid | cyclonedx-gomod | 1/0/6 | 25.0 | 1/0/0 | 100.0 | 1/0/4 | 33.3 | 25.0/100.0/33.3 |
| reugn__async | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| rhosocial__go-dag | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| sashamelentyev__usestdlibvars | syft | 4/0/4 | 66.7 | 3/1/0 | 85.7 | 3/1/0 | 85.7 | 66.7/85.7/85.7 |
| sashamelentyev__usestdlibvars | trivy | 3/0/5 | 54.5 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 54.5/100.0/100.0 |
| sashamelentyev__usestdlibvars | cdxgen | 3/0/5 | 54.5 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 54.5/100.0/100.0 |
| sashamelentyev__usestdlibvars | cyclonedx-gomod | 2/0/6 | 40.0 | 2/0/1 | 80.0 | 2/0/1 | 80.0 | 40.0/80.0/80.0 |
| schollz__peerdiscovery | syft | 8/4/10 | 53.3 | 2/10/0 | 28.6 | 6/6/0 | 66.7 | 42.4/23.5/57.1 |
| schollz__peerdiscovery | trivy | 18/7/0 | 83.7 | 2/23/0 | 14.8 | 6/19/0 | 38.7 | 72.0/11.8/31.6 |
| schollz__peerdiscovery | cdxgen | 4/4/14 | 30.8 | 2/6/0 | 40.0 | 3/5/3 | 42.9 | 21.4/33.3/37.5 |
| schollz__peerdiscovery | cyclonedx-gomod | 2/0/16 | 20.0 | 2/0/0 | 100.0 | 2/0/4 | 50.0 | 20.0/100.0/50.0 |
| sdrapkin__guid | syft | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| sdrapkin__guid | trivy | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| sdrapkin__guid | cdxgen | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| sdrapkin__guid | cyclonedx-gomod | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| tuupola__branca-spec | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| txn2__kubefwd | syft | 139/2/58 | 82.2 | 105/36/0 | 85.4 | 105/36/0 | 85.4 | 82.2/85.4/85.4 |
| txn2__kubefwd | trivy | 116/3/81 | 73.4 | 105/14/0 | 93.8 | 105/14/0 | 93.8 | 73.4/93.8/93.8 |
| txn2__kubefwd | cdxgen | 105/2/92 | 69.1 | 105/2/0 | 99.1 | 105/2/0 | 99.1 | 69.1/99.1/99.1 |
| txn2__kubefwd | cyclonedx-gomod | 115/0/82 | 73.7 | 104/11/1 | 94.5 | 104/11/1 | 94.5 | 73.7/94.5/94.5 |
| uber-go__fx | syft | 13/6/2 | 76.5 | 4/15/0 | 34.8 | 9/10/0 | 64.3 | 66.7/32.0/60.0 |
| uber-go__fx | trivy | 10/5/5 | 66.7 | 4/11/0 | 42.1 | 9/6/0 | 75.0 | 58.1/40.0/72.0 |
| uber-go__fx | cdxgen | 9/2/6 | 69.2 | 4/7/0 | 53.3 | 8/3/1 | 80.0 | 61.5/53.3/80.0 |
| uber-go__fx | cyclonedx-gomod | 4/0/11 | 42.1 | 4/0/0 | 100.0 | 4/0/5 | 61.5 | 42.1/100.0/61.5 |
| ulikunitz__xz | syft | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| ulikunitz__xz | trivy | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| ulikunitz__xz | cdxgen | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| ulikunitz__xz | cyclonedx-gomod | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| woodpecker-ci__woodpecker | syft | 278/0/135 | 80.5 | 201/77/0 | 83.9 | 206/72/0 | 85.1 | 80.5/83.9/85.1 |
| woodpecker-ci__woodpecker | trivy | 239/0/174 | 73.3 | 201/38/0 | 91.4 | 206/33/0 | 92.6 | 73.3/91.4/92.6 |
| woodpecker-ci__woodpecker | cdxgen | 239/0/174 | 73.3 | 201/38/0 | 91.4 | 206/33/0 | 92.6 | 73.3/91.4/92.6 |
| woodpecker-ci__woodpecker | cyclonedx-gomod | 228/0/185 | 71.1 | 199/29/2 | 92.8 | 199/29/7 | 91.7 | 71.1/92.8/91.7 |
| xaionaro-go__secureio | syft | 22/0/8 | 84.6 | 14/8/0 | 77.8 | 20/2/0 | 95.2 | 84.6/77.8/95.2 |
| xaionaro-go__secureio | trivy | 30/0/0 | 100.0 | 14/16/0 | 63.6 | 20/10/0 | 80.0 | 100.0/63.6/80.0 |
| xaionaro-go__secureio | cdxgen | 14/0/16 | 63.6 | 14/0/0 | 100.0 | 14/0/6 | 82.4 | 63.6/100.0/82.4 |
| xaionaro-go__secureio | cyclonedx-gomod | 14/0/16 | 63.6 | 14/0/0 | 100.0 | 14/0/6 | 82.4 | 63.6/100.0/82.4 |
| xis__baraka | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| xta__okrun | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| xtaci__gonet | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| xtaci__kcptun | CLONE_FAIL | NA | | NA | | NA | | |
| xujiajun__godbal | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| xujiajun__gorouter | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| yaronn__blessed-contrib | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| yaronsumel__grapes | syft | 3/0/5 | 54.5 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 54.5/100.0/100.0 |
| yaronsumel__grapes | trivy | 8/7/0 | 69.6 | 3/12/0 | 33.3 | 3/12/0 | 33.3 | 60.9/33.3/33.3 |
| yaronsumel__grapes | cdxgen | 3/0/5 | 54.5 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 54.5/100.0/100.0 |
| yaronsumel__grapes | cyclonedx-gomod | NA | | NA | | NA | | |
| yassinebenaid__godump | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| yuin__goldmark | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| yunabe__lgo | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| yuseferi__envyaml | syft | 6/0/1 | 92.3 | 2/4/0 | 50.0 | 5/1/0 | 90.9 | 92.3/50.0/90.9 |
| yuseferi__envyaml | trivy | 5/0/2 | 83.3 | 2/3/0 | 57.1 | 5/0/0 | 100.0 | 83.3/57.1/100.0 |
| yuseferi__envyaml | cdxgen | 2/0/5 | 44.4 | 2/0/0 | 100.0 | 2/0/3 | 57.1 | 44.4/100.0/57.1 |
| yuseferi__envyaml | cyclonedx-gomod | 2/0/5 | 44.4 | 2/0/0 | 100.0 | 2/0/3 | 57.1 | 44.4/100.0/57.1 |
| SaiNageswarS__go-api-boot | syft | 111/0/197 | 53.0 | 92/19/0 | 90.6 | 92/19/0 | 90.6 | 53.0/90.6/90.6 |
| SaiNageswarS__go-api-boot | trivy | 93/0/215 | 46.4 | 92/1/0 | 99.5 | 92/1/0 | 99.5 | 46.4/99.5/99.5 |
| SaiNageswarS__go-api-boot | cdxgen | 92/0/216 | 46.0 | 92/0/0 | 100.0 | 92/0/0 | 100.0 | 46.0/100.0/100.0 |
| SaiNageswarS__go-api-boot | cyclonedx-gomod | 88/0/220 | 44.4 | 87/1/5 | 96.7 | 87/1/5 | 96.7 | 44.4/96.7/96.7 |
| golang-templates__seed | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| HnH__qry | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| LimeChain__gosemble | syft | 0/81/0 | 0.0 | 26/55/0 | 48.6 | 26/55/0 | 48.6 | 0.0/48.6/48.6 |
| LimeChain__gosemble | trivy | 0/78/0 | 0.0 | 26/52/0 | 50.0 | 26/52/0 | 50.0 | 0.0/50.0/50.0 |
| LimeChain__gosemble | cdxgen | 0/85/0 | 0.0 | 26/59/0 | 46.8 | 26/59/0 | 46.8 | 0.0/46.8/46.8 |
| LimeChain__gosemble | cyclonedx-gomod | NA | | NA | | NA | | |
| MatProGo-dev__MatProInterface.go | syft | 2/0/16 | 20.0 | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 20.0/100.0/100.0 |
| MatProGo-dev__MatProInterface.go | trivy | 2/0/16 | 20.0 | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 20.0/100.0/100.0 |
| MatProGo-dev__MatProInterface.go | cdxgen | 2/0/16 | 20.0 | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 20.0/100.0/100.0 |
| MatProGo-dev__MatProInterface.go | cyclonedx-gomod | 2/0/16 | 20.0 | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 20.0/100.0/100.0 |
| MaxHalford__eaopt | syft | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| MaxHalford__eaopt | trivy | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| MaxHalford__eaopt | cdxgen | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| MaxHalford__eaopt | cyclonedx-gomod | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| Melkeydev__go-blueprint | syft | 22/0/11 | 80.0 | 20/2/0 | 95.2 | 20/2/0 | 95.2 | 80.0/95.2/95.2 |
| Melkeydev__go-blueprint | trivy | 22/0/11 | 80.0 | 20/2/0 | 95.2 | 20/2/0 | 95.2 | 80.0/95.2/95.2 |
| Melkeydev__go-blueprint | cdxgen | 20/0/13 | 75.5 | 20/0/0 | 100.0 | 20/0/0 | 100.0 | 75.5/100.0/100.0 |
| Melkeydev__go-blueprint | cyclonedx-gomod | 22/0/11 | 80.0 | 20/2/0 | 95.2 | 20/2/0 | 95.2 | 80.0/95.2/95.2 |
| MonaxGT__gosddl | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| SimonWaldherr__golang-examples | syft | 61/35/84 | 50.6 | 39/57/0 | 57.8 | 42/54/0 | 60.9 | 49.0/57.8/60.9 |
| SimonWaldherr__golang-examples | trivy | 52/32/93 | 45.4 | 39/45/0 | 63.4 | 42/42/0 | 66.7 | 39.3/60.9/64.1 |
| SimonWaldherr__golang-examples | cdxgen | 41/18/104 | 40.2 | 39/20/0 | 79.6 | 39/20/3 | 77.2 | 38.2/79.6/77.2 |
| SimonWaldherr__golang-examples | cyclonedx-gomod | 41/0/104 | 44.1 | 39/2/0 | 97.5 | 39/2/3 | 94.0 | 44.1/97.5/94.0 |
| TeaEntityLab__fpGo | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| alajmo__sake | syft | 32/0/12 | 84.2 | 19/13/0 | 74.5 | 21/11/0 | 79.2 | 84.2/74.5/79.2 |
| alajmo__sake | trivy | 28/0/16 | 77.8 | 19/9/0 | 80.9 | 21/7/0 | 85.7 | 77.8/80.9/85.7 |
| alajmo__sake | cdxgen | 19/0/25 | 60.3 | 19/0/0 | 100.0 | 19/0/2 | 95.0 | 60.3/100.0/95.0 |
| alajmo__sake | cyclonedx-gomod | 20/0/24 | 62.5 | 19/1/0 | 97.4 | 19/1/2 | 92.7 | 62.5/97.4/92.7 |
| alesr__redact | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| alexsniffin__gosd | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| gomutex__godocx | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| gontainer__gontainer | syft | 19/0/42 | 47.5 | 12/7/0 | 77.4 | 15/4/0 | 88.2 | 47.5/77.4/88.2 |
| gontainer__gontainer | trivy | 16/0/45 | 41.6 | 12/4/0 | 85.7 | 15/1/0 | 96.8 | 41.6/85.7/96.8 |
| gontainer__gontainer | cdxgen | 12/0/49 | 32.9 | 12/0/0 | 100.0 | 12/0/3 | 88.9 | 32.9/100.0/88.9 |
| gontainer__gontainer | cyclonedx-gomod | 13/0/48 | 35.1 | 12/1/0 | 96.0 | 12/1/3 | 85.7 | 35.1/96.0/85.7 |
| gonum__gonum | syft | 21/0/17 | 71.2 | 10/11/0 | 64.5 | 12/9/0 | 72.7 | 71.2/64.5/72.7 |
| gonum__gonum | trivy | 18/0/20 | 64.3 | 10/8/0 | 71.4 | 12/6/0 | 80.0 | 64.3/71.4/80.0 |
| gonum__gonum | cdxgen | 10/0/28 | 41.7 | 10/0/0 | 100.0 | 10/0/2 | 90.9 | 41.7/100.0/90.9 |
| gonum__gonum | cyclonedx-gomod | 16/0/22 | 59.3 | 10/6/0 | 76.9 | 10/6/2 | 71.4 | 59.3/76.9/71.4 |
| iyashjayesh__goscaf | syft | 19/0/12 | 76.0 | 11/8/0 | 73.3 | 11/8/0 | 73.3 | 71.7/66.7/66.7 |
| iyashjayesh__goscaf | trivy | 12/0/19 | 55.8 | 11/1/0 | 95.7 | 11/1/0 | 95.7 | 55.8/95.7/95.7 |
| iyashjayesh__goscaf | cdxgen | 11/0/20 | 52.4 | 11/0/0 | 100.0 | 11/0/0 | 100.0 | 52.4/100.0/100.0 |
| iyashjayesh__goscaf | cyclonedx-gomod | 12/0/19 | 55.8 | 11/1/0 | 95.7 | 11/1/0 | 95.7 | 55.8/95.7/95.7 |
| jackc__pgx | syft | 13/0/6 | 81.3 | 5/8/0 | 55.6 | 9/4/0 | 81.8 | 81.3/55.6/81.8 |
| jackc__pgx | trivy | 11/0/8 | 73.3 | 5/6/0 | 62.5 | 9/2/0 | 90.0 | 73.3/62.5/90.0 |
| jackc__pgx | cdxgen | 5/0/14 | 41.7 | 5/0/0 | 100.0 | 5/0/4 | 71.4 | 41.7/100.0/71.4 |
| jackc__pgx | cyclonedx-gomod | 4/0/15 | 34.8 | 4/0/1 | 88.9 | 4/0/5 | 61.5 | 34.8/88.9/61.5 |
| jbrodriguez__mlog | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| jcla1__gisp | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| jeffail__leaps | syft | 27/0/64 | 45.8 | 14/13/0 | 68.3 | 14/13/0 | 68.3 | 45.8/68.3/68.3 |
| jeffail__leaps | trivy | 91/0/0 | 100.0 | 14/77/0 | 26.7 | 14/77/0 | 26.7 | 100.0/26.7/26.7 |
| jeffail__leaps | cdxgen | 14/0/77 | 26.7 | 14/0/0 | 100.0 | 14/0/0 | 100.0 | 26.7/100.0/100.0 |
| jeffail__leaps | cyclonedx-gomod | 32/0/59 | 52.0 | 14/18/0 | 60.9 | 14/18/0 | 60.9 | 52.0/60.9/60.9 |
| soniah__gosnmp | syft | 8/3/9 | 57.1 | 1/10/0 | 16.7 | 5/6/0 | 62.5 | 42.9/16.7/62.5 |
| soniah__gosnmp | trivy | 7/3/10 | 51.9 | 1/9/0 | 18.2 | 5/5/0 | 66.7 | 37.0/18.2/66.7 |
| soniah__gosnmp | cdxgen | 1/0/16 | 11.1 | 1/0/0 | 100.0 | 1/0/4 | 33.3 | 11.1/100.0/33.3 |
| soniah__gosnmp | cyclonedx-gomod | 1/0/16 | 11.1 | 1/0/0 | 100.0 | 1/0/4 | 33.3 | 11.1/100.0/33.3 |
| speedata__go-lua | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| srfrog__dict | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| zenthangplus__goccm | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| zerosnake0__go-json-benchmark | syft | 19/0/11 | 77.6 | 17/2/0 | 94.4 | 18/1/0 | 97.3 | 77.6/94.4/97.3 |
| zerosnake0__go-json-benchmark | trivy | 30/0/0 | 100.0 | 17/13/0 | 72.3 | 18/12/0 | 75.0 | 100.0/72.3/75.0 |
| zerosnake0__go-json-benchmark | cdxgen | 17/0/13 | 72.3 | 17/0/0 | 100.0 | 17/0/1 | 97.1 | 72.3/100.0/97.1 |
| zerosnake0__go-json-benchmark | cyclonedx-gomod | 17/0/13 | 72.3 | 17/0/0 | 100.0 | 17/0/1 | 97.1 | 72.3/100.0/97.1 |
| zerosnake0__jzon | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| Jeffail__tunny | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| Knuspii__kepfi | CLONE_FAIL | NA | | NA | | NA | | |
| NodePassProject__nodepass | syft | 16/0/9 | 78.0 | 10/6/0 | 76.9 | 10/6/0 | 76.9 | 78.0/76.9/76.9 |
| NodePassProject__nodepass | trivy | 10/0/15 | 57.1 | 10/0/0 | 100.0 | 10/0/0 | 100.0 | 57.1/100.0/100.0 |
| NodePassProject__nodepass | cdxgen | 10/0/15 | 57.1 | 10/0/0 | 100.0 | 10/0/0 | 100.0 | 57.1/100.0/100.0 |
| NodePassProject__nodepass | cyclonedx-gomod | 10/0/15 | 57.1 | 10/0/0 | 100.0 | 10/0/0 | 100.0 | 57.1/100.0/100.0 |
| OldPanda__bloomfilter | syft | 6/0/14 | 46.2 | 2/4/0 | 50.0 | 2/4/0 | 50.0 | 46.2/50.0/50.0 |
| OldPanda__bloomfilter | trivy | 20/0/0 | 100.0 | 2/18/0 | 18.2 | 2/18/0 | 18.2 | 100.0/18.2/18.2 |
| OldPanda__bloomfilter | cdxgen | 2/0/18 | 18.2 | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 18.2/100.0/100.0 |
| OldPanda__bloomfilter | cyclonedx-gomod | 2/0/18 | 18.2 | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 18.2/100.0/100.0 |
| One-com__gone | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| Oudwins__zog | syft | 8/0/4 | 80.0 | 5/3/0 | 76.9 | 6/2/0 | 85.7 | 80.0/76.9/85.7 |
| Oudwins__zog | trivy | 6/0/6 | 66.7 | 5/1/0 | 90.9 | 6/0/0 | 100.0 | 66.7/90.9/100.0 |
| Oudwins__zog | cdxgen | 5/0/7 | 58.8 | 5/0/0 | 100.0 | 5/0/1 | 90.9 | 58.8/100.0/90.9 |
| Oudwins__zog | cyclonedx-gomod | 5/0/7 | 58.8 | 5/0/0 | 100.0 | 5/0/1 | 90.9 | 58.8/100.0/90.9 |
| PuerkitoBio__goquery | syft | 2/0/4 | 50.0 | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 50.0/100.0/100.0 |
| PuerkitoBio__goquery | trivy | 2/0/4 | 50.0 | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 50.0/100.0/100.0 |
| PuerkitoBio__goquery | cdxgen | 2/0/4 | 50.0 | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 50.0/100.0/100.0 |
| PuerkitoBio__goquery | cyclonedx-gomod | 2/0/4 | 50.0 | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 50.0/100.0/100.0 |
| arl__statsviz | syft | 6/122/4 | 8.7 | 1/127/0 | 1.6 | 3/125/0 | 4.6 | 4.9/1.3/3.8 |
| arl__statsviz | trivy | 5/92/5 | 9.3 | 1/96/0 | 2.0 | 3/94/0 | 6.0 | 6.5/1.8/5.2 |
| arl__statsviz | cdxgen | 3/68/7 | 7.4 | 1/70/0 | 2.8 | 1/70/2 | 2.7 | 4.2/2.3/2.3 |
| arl__statsviz | cyclonedx-gomod | 1/0/9 | 18.2 | 1/0/0 | 100.0 | 1/0/2 | 50.0 | 18.2/100.0/50.0 |
| askeladdk__prattle | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| aurelien-rainone__go-rquad | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| aws__aws-sdk-go-v2 | syft | 1/474/0 | 0.4 | 1/474/0 | 0.4 | 1/474/0 | 0.4 | 0.4/0.4/0.4 |
| aws__aws-sdk-go-v2 | trivy | 1/473/0 | 0.4 | 1/473/0 | 0.4 | 1/473/0 | 0.4 | 0.4/0.4/0.4 |
| aws__aws-sdk-go-v2 | cdxgen | 1/22/0 | 8.3 | 1/22/0 | 8.3 | 1/22/0 | 8.3 | 8.3/8.3/8.3 |
| aws__aws-sdk-go-v2 | cyclonedx-gomod | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| google__starlark-go | syft | 7/0/1 | 93.3 | 4/3/0 | 72.7 | 5/2/0 | 83.3 | 93.3/72.7/83.3 |
| google__starlark-go | trivy | 7/0/1 | 93.3 | 4/3/0 | 72.7 | 5/2/0 | 83.3 | 93.3/72.7/83.3 |
| google__starlark-go | cdxgen | 4/0/4 | 66.7 | 4/0/0 | 100.0 | 4/0/1 | 88.9 | 66.7/100.0/88.9 |
| google__starlark-go | cyclonedx-gomod | 4/0/4 | 66.7 | 4/0/0 | 100.0 | 4/0/1 | 88.9 | 66.7/100.0/88.9 |
| gookit__color | syft | 4/7/0 | 53.3 | 1/10/0 | 16.7 | 2/9/0 | 30.8 | 53.3/16.7/30.8 |
| gookit__color | trivy | 4/7/0 | 53.3 | 1/10/0 | 16.7 | 2/9/0 | 30.8 | 53.3/16.7/30.8 |
| gookit__color | cdxgen | 2/6/2 | 33.3 | 1/7/0 | 22.2 | 1/7/1 | 20.0 | 33.3/22.2/20.0 |
| gookit__color | cyclonedx-gomod | 2/0/2 | 66.7 | 1/1/0 | 66.7 | 1/1/1 | 50.0 | 66.7/66.7/50.0 |
| gookit__filter | syft | 4/0/3 | 72.7 | 2/2/0 | 66.7 | 4/0/0 | 100.0 | 72.7/66.7/100.0 |
| gookit__filter | trivy | 4/0/3 | 72.7 | 2/2/0 | 66.7 | 4/0/0 | 100.0 | 72.7/66.7/100.0 |
| gookit__filter | cdxgen | 2/0/5 | 44.4 | 2/0/0 | 100.0 | 2/0/2 | 66.7 | 44.4/100.0/66.7 |
| gookit__filter | cyclonedx-gomod | 2/0/5 | 44.4 | 2/0/0 | 100.0 | 2/0/2 | 66.7 | 44.4/100.0/66.7 |
| goreleaser__goreleaser | syft | 463/3/470 | 66.2 | 336/130/0 | 83.8 | 363/103/0 | 87.6 | 66.2/83.8/87.6 |
| goreleaser__goreleaser | trivy | 372/4/561 | 56.8 | 336/40/0 | 94.4 | 363/13/0 | 98.2 | 56.8/94.4/98.2 |
| goreleaser__goreleaser | cdxgen | 336/1/597 | 52.9 | 336/1/0 | 99.9 | 336/1/27 | 96.0 | 52.9/99.9/96.0 |
| goreleaser__goreleaser | cyclonedx-gomod | 340/0/593 | 53.4 | 332/8/4 | 98.2 | 332/8/31 | 94.5 | 53.4/98.2/94.5 |
| jidicula__go-fuzz-action | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| jimrobinson__kvbench | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| jirenius__go-res | syft | 29/0/31 | 65.2 | 20/9/0 | 81.6 | 20/9/0 | 81.6 | 65.2/81.6/81.6 |
| jirenius__go-res | trivy | 21/0/39 | 51.9 | 20/1/0 | 97.6 | 20/1/0 | 97.6 | 51.9/97.6/97.6 |
| jirenius__go-res | cdxgen | 20/0/40 | 50.0 | 20/0/0 | 100.0 | 20/0/0 | 100.0 | 50.0/100.0/100.0 |
| jirenius__go-res | cyclonedx-gomod | 20/0/40 | 50.0 | 20/0/0 | 100.0 | 20/0/0 | 100.0 | 50.0/100.0/100.0 |
| tibcosoftware__flogo | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| tiendc__go-csvlib | syft | 9/0/1 | 94.7 | 4/5/0 | 61.5 | 8/1/0 | 94.1 | 94.7/61.5/94.1 |
| tiendc__go-csvlib | trivy | 8/0/2 | 88.9 | 4/4/0 | 66.7 | 8/0/0 | 100.0 | 88.9/66.7/100.0 |
| tiendc__go-csvlib | cdxgen | 4/0/6 | 57.1 | 4/0/0 | 100.0 | 4/0/4 | 66.7 | 57.1/100.0/66.7 |
| tiendc__go-csvlib | cyclonedx-gomod | 4/0/6 | 57.1 | 4/0/0 | 100.0 | 4/0/4 | 66.7 | 57.1/100.0/66.7 |
| tinygo-org__tinygo | syft | 51/14/38 | 66.2 | 16/49/0 | 39.5 | 18/47/0 | 43.4 | 65.8/39.0/42.9 |
| tinygo-org__tinygo | trivy | 44/12/45 | 60.7 | 16/40/0 | 44.4 | 18/38/0 | 48.6 | 60.3/43.8/48.0 |
| tinygo-org__tinygo | cdxgen | 44/7/45 | 62.9 | 16/35/0 | 47.8 | 18/33/0 | 52.2 | 62.4/47.1/51.4 |
| tinygo-org__tinygo | cyclonedx-gomod | 41/0/48 | 63.1 | 16/25/0 | 56.1 | 16/25/2 | 54.2 | 63.1/56.1/54.2 |
| vadiminshakov__committer | syft | 34/0/77 | 46.9 | 24/10/0 | 82.8 | 28/6/0 | 90.3 | 46.9/82.8/90.3 |
| vadiminshakov__committer | trivy | 28/0/83 | 40.3 | 24/4/0 | 92.3 | 28/0/0 | 100.0 | 40.3/92.3/100.0 |
| vadiminshakov__committer | cdxgen | 24/0/87 | 35.6 | 24/0/0 | 100.0 | 24/0/4 | 92.3 | 35.6/100.0/92.3 |
| vadiminshakov__committer | cyclonedx-gomod | 24/0/87 | 35.6 | 24/0/0 | 100.0 | 24/0/4 | 92.3 | 35.6/100.0/92.3 |
| vardius__gocontainer | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| ztrue__shutdown | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| zubairhamed__canopus | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| Mutasem-mk4__gspy | syft | 32/0/23 | 73.6 | 17/15/0 | 69.4 | 17/15/0 | 69.4 | 73.6/69.4/69.4 |
| Mutasem-mk4__gspy | trivy | 21/0/34 | 55.3 | 17/4/0 | 89.5 | 17/4/0 | 89.5 | 55.3/89.5/89.5 |
| Mutasem-mk4__gspy | cdxgen | 17/0/38 | 47.2 | 17/0/0 | 100.0 | 17/0/0 | 100.0 | 47.2/100.0/100.0 |
| Mutasem-mk4__gspy | cyclonedx-gomod | 20/0/35 | 53.3 | 17/3/0 | 91.9 | 17/3/0 | 91.9 | 53.3/91.9/91.9 |
| NVIDIA__gontainer | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| NicoNex__jet | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| OTA-Insight__bqwriter | syft | 43/0/159 | 35.1 | 35/8/0 | 89.7 | 35/8/0 | 89.7 | 35.1/89.7/89.7 |
| OTA-Insight__bqwriter | trivy | 43/0/159 | 35.1 | 35/8/0 | 89.7 | 35/8/0 | 89.7 | 35.1/89.7/89.7 |
| OTA-Insight__bqwriter | cdxgen | 35/0/167 | 29.5 | 35/0/0 | 100.0 | 35/0/0 | 100.0 | 29.5/100.0/100.0 |
| OTA-Insight__bqwriter | cyclonedx-gomod | 42/0/160 | 34.4 | 35/7/0 | 90.9 | 35/7/0 | 90.9 | 34.4/90.9/90.9 |
| RezaSi__go-interview-practice | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| SimonBaeumer__cmd | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| Sirupsen__logrus | syft | 6/0/1 | 92.3 | 5/1/0 | 90.9 | 5/1/0 | 90.9 | 92.3/90.9/90.9 |
| Sirupsen__logrus | trivy | 5/0/2 | 83.3 | 5/0/0 | 100.0 | 5/0/0 | 100.0 | 83.3/100.0/100.0 |
| Sirupsen__logrus | cdxgen | 5/0/2 | 83.3 | 5/0/0 | 100.0 | 5/0/0 | 100.0 | 83.3/100.0/100.0 |
| Sirupsen__logrus | cyclonedx-gomod | 2/0/5 | 44.4 | 2/0/3 | 57.1 | 2/0/3 | 57.1 | 44.4/57.1/57.1 |
| ashwingopalsamy__uuidcheck | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| assafmo__joincap | syft | 5/0/7 | 58.8 | 5/0/0 | 100.0 | 5/0/0 | 100.0 | 58.8/100.0/100.0 |
| assafmo__joincap | trivy | 12/0/0 | 100.0 | 5/7/0 | 58.8 | 5/7/0 | 58.8 | 100.0/58.8/58.8 |
| assafmo__joincap | cdxgen | 5/0/7 | 58.8 | 5/0/0 | 100.0 | 5/0/0 | 100.0 | 58.8/100.0/100.0 |
| assafmo__joincap | cyclonedx-gomod | 5/0/7 | 58.8 | 5/0/0 | 100.0 | 5/0/0 | 100.0 | 58.8/100.0/100.0 |
| asticode__go-astiav | syft | 6/0/1 | 92.3 | 1/5/0 | 28.6 | 5/1/0 | 90.9 | 92.3/28.6/90.9 |
| asticode__go-astiav | trivy | 5/0/2 | 83.3 | 1/4/0 | 33.3 | 5/0/0 | 100.0 | 83.3/33.3/100.0 |
| asticode__go-astiav | cdxgen | 1/0/6 | 25.0 | 1/0/0 | 100.0 | 1/0/4 | 33.3 | 25.0/100.0/33.3 |
| asticode__go-astiav | cyclonedx-gomod | 1/0/6 | 25.0 | 1/0/0 | 100.0 | 1/0/4 | 33.3 | 25.0/100.0/33.3 |
| bwmarrin__discordgo | syft | 1/14/0 | 12.5 | 1/14/0 | 12.5 | 1/14/0 | 12.5 | 12.5/12.5/12.5 |
| bwmarrin__discordgo | trivy | 1/22/0 | 8.3 | 1/22/0 | 8.3 | 1/22/0 | 8.3 | 7.7/7.7/7.7 |
| bwmarrin__discordgo | cdxgen | 1/7/0 | 22.2 | 1/7/0 | 22.2 | 1/7/0 | 22.2 | 22.2/22.2/22.2 |
| bwmarrin__discordgo | cyclonedx-gomod | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| cabify__logrusiowriter | syft | 7/0/1 | 93.3 | 2/5/0 | 44.4 | 2/5/0 | 44.4 | 93.3/44.4/44.4 |
| cabify__logrusiowriter | trivy | 8/0/0 | 100.0 | 2/6/0 | 40.0 | 2/6/0 | 40.0 | 100.0/40.0/40.0 |
| cabify__logrusiowriter | cdxgen | 2/0/6 | 40.0 | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 40.0/100.0/100.0 |
| cabify__logrusiowriter | cyclonedx-gomod | 2/0/6 | 40.0 | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 40.0/100.0/100.0 |
| carlmjohnson__requests | syft | 1/0/4 | 33.3 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 33.3/100.0/100.0 |
| carlmjohnson__requests | trivy | 1/0/4 | 33.3 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 33.3/100.0/100.0 |
| carlmjohnson__requests | cdxgen | 1/0/4 | 33.3 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 33.3/100.0/100.0 |
| carlmjohnson__requests | cyclonedx-gomod | 1/0/4 | 33.3 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 33.3/100.0/100.0 |
| gorilla__csrf | syft | 0/5/0 | 0.0 | 1/4/0 | 33.3 | 1/4/0 | 33.3 | 0.0/28.6/28.6 |
| gorilla__csrf | trivy | 0/8/0 | 0.0 | 1/7/0 | 22.2 | 1/7/0 | 22.2 | 0.0/20.0/20.0 |
| gorilla__csrf | cdxgen | 0/5/0 | 0.0 | 1/4/0 | 33.3 | 1/4/0 | 33.3 | 0.0/28.6/28.6 |
| gorilla__csrf | cyclonedx-gomod | 0/1/0 | 0.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 0.0/100.0/100.0 |
| goroute__route | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| goxjs__glfw | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| grafana__k6 | syft | 0/103/0 | 0.0 | 89/14/0 | 92.7 | 89/14/0 | 92.7 | 0.0/82.4/82.4 |
| grafana__k6 | trivy | 0/100/0 | 0.0 | 89/11/0 | 94.2 | 89/11/0 | 94.2 | 0.0/84.8/84.8 |
| grafana__k6 | cdxgen | NA | | NA | | NA | | |
| grafana__k6 | cyclonedx-gomod | 0/90/0 | 0.0 | 89/1/0 | 99.4 | 89/1/0 | 99.4 | 0.0/99.4/99.4 |
| greencoda__confiq | syft | 9/0/0 | 100.0 | 8/1/0 | 94.1 | 8/1/0 | 94.1 | 100.0/94.1/94.1 |
| greencoda__confiq | trivy | 8/0/1 | 94.1 | 8/0/0 | 100.0 | 8/0/0 | 100.0 | 94.1/100.0/100.0 |
| greencoda__confiq | cdxgen | 8/0/1 | 94.1 | 8/0/0 | 100.0 | 8/0/0 | 100.0 | 94.1/100.0/100.0 |
| greencoda__confiq | cyclonedx-gomod | 8/0/1 | 94.1 | 8/0/0 | 100.0 | 8/0/0 | 100.0 | 94.1/100.0/100.0 |
| jolestar__go-commons-pool | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| jonathanslenders__python-prompt-toolkit | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| jonboulle__clockwork | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| vektra__mockery | syft | 259/2/148 | 77.5 | 38/223/0 | 25.4 | 38/223/0 | 25.4 | 75.1/24.1/24.1 |
| vektra__mockery | trivy | 249/2/158 | 75.7 | 38/213/0 | 26.3 | 38/213/0 | 26.3 | 73.4/25.0/25.0 |
| vektra__mockery | cdxgen | 247/0/160 | 75.5 | 38/209/0 | 26.7 | 38/209/0 | 26.7 | 73.6/25.2/25.2 |
| vektra__mockery | cyclonedx-gomod | 241/0/166 | 74.4 | 38/203/0 | 27.2 | 38/203/0 | 27.2 | 74.4/27.2/27.2 |
| xtaci__kcp-go | syft | 14/0/26 | 51.9 | 8/6/0 | 72.7 | 13/1/0 | 96.3 | 51.9/72.7/96.3 |
| xtaci__kcp-go | trivy | 13/0/27 | 49.1 | 8/5/0 | 76.2 | 13/0/0 | 100.0 | 49.1/76.2/100.0 |
| xtaci__kcp-go | cdxgen | 8/0/32 | 33.3 | 8/0/0 | 100.0 | 8/0/5 | 76.2 | 33.3/100.0/76.2 |
| xtaci__kcp-go | cyclonedx-gomod | 8/0/32 | 33.3 | 8/0/0 | 100.0 | 8/0/5 | 76.2 | 33.3/100.0/76.2 |
| xwjdsh__manssh | syft | 10/0/0 | 100.0 | 5/5/0 | 66.7 | 8/2/0 | 88.9 | 100.0/66.7/88.9 |
| xwjdsh__manssh | trivy | 9/0/1 | 94.7 | 5/4/0 | 71.4 | 8/1/0 | 94.1 | 94.7/71.4/94.1 |
| xwjdsh__manssh | cdxgen | 5/0/5 | 66.7 | 5/0/0 | 100.0 | 5/0/3 | 76.9 | 66.7/100.0/76.9 |
| xwjdsh__manssh | cyclonedx-gomod | 6/0/4 | 75.0 | 5/1/0 | 90.9 | 5/1/3 | 71.4 | 75.0/90.9/71.4 |
| yahoo__vssh | syft | 3/0/11 | 35.3 | 1/2/0 | 50.0 | 3/0/0 | 100.0 | 35.3/50.0/100.0 |
| yahoo__vssh | trivy | 14/0/0 | 100.0 | 1/13/0 | 13.3 | 3/11/0 | 35.3 | 100.0/13.3/35.3 |
| yahoo__vssh | cdxgen | 1/0/13 | 13.3 | 1/0/0 | 100.0 | 1/0/2 | 50.0 | 13.3/100.0/50.0 |
| yahoo__vssh | cyclonedx-gomod | NA | | NA | | NA | | |
| Andrew-M-C__go.jsonvalue | syft | 4/0/6 | 57.1 | 1/3/0 | 40.0 | 4/0/0 | 100.0 | 57.1/40.0/100.0 |
| Andrew-M-C__go.jsonvalue | trivy | 10/0/0 | 100.0 | 1/9/0 | 18.2 | 4/6/0 | 57.1 | 100.0/18.2/57.1 |
| Andrew-M-C__go.jsonvalue | cdxgen | 1/0/9 | 18.2 | 1/0/0 | 100.0 | 1/0/3 | 40.0 | 18.2/100.0/40.0 |
| Andrew-M-C__go.jsonvalue | cyclonedx-gomod | 1/0/9 | 18.2 | 1/0/0 | 100.0 | 1/0/3 | 40.0 | 18.2/100.0/40.0 |
| AsaiYusuke__jsonpath | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| Parquery__gocontracts | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| PaulRosset__go-hacknews | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| RibbonFilter__ribbonGo | syft | 4/0/0 | 100.0 | 2/2/0 | 66.7 | 2/2/0 | 66.7 | 100.0/66.7/66.7 |
| RibbonFilter__ribbonGo | trivy | 3/0/1 | 85.7 | 2/1/0 | 80.0 | 2/1/0 | 80.0 | 85.7/80.0/80.0 |
| RibbonFilter__ribbonGo | cdxgen | 2/0/2 | 66.7 | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 66.7/100.0/100.0 |
| RibbonFilter__ribbonGo | cyclonedx-gomod | 3/0/1 | 85.7 | 2/1/0 | 80.0 | 2/1/0 | 80.0 | 85.7/80.0/80.0 |
| SeldonIO__goven | syft | 39/0/42 | 65.0 | 4/35/0 | 18.6 | 21/18/0 | 70.0 | 65.0/18.6/70.0 |
| SeldonIO__goven | trivy | 21/0/60 | 41.2 | 4/17/0 | 32.0 | 21/0/0 | 100.0 | 41.2/32.0/100.0 |
| SeldonIO__goven | cdxgen | 4/0/77 | 9.4 | 4/0/0 | 100.0 | 4/0/17 | 32.0 | 9.4/100.0/32.0 |
| SeldonIO__goven | cyclonedx-gomod | 4/0/77 | 9.4 | 4/0/0 | 100.0 | 4/0/17 | 32.0 | 9.4/100.0/32.0 |
| Sherifabdlnaby__gpool | syft | 0/2/0 | 0.0 | 1/1/0 | 66.7 | 1/1/0 | 66.7 | 0.0/66.7/66.7 |
| Sherifabdlnaby__gpool | trivy | 0/2/0 | 0.0 | 1/1/0 | 66.7 | 1/1/0 | 66.7 | 0.0/66.7/66.7 |
| Sherifabdlnaby__gpool | cdxgen | 0/2/0 | 0.0 | 1/1/0 | 66.7 | 1/1/0 | 66.7 | 0.0/66.7/66.7 |
| Sherifabdlnaby__gpool | cyclonedx-gomod | 0/1/0 | 0.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 0.0/100.0/100.0 |
| Shopify__sarama | syft | 25/14/12 | 65.8 | 14/25/0 | 52.8 | 18/21/0 | 63.2 | 62.5/49.1/59.0 |
| Shopify__sarama | trivy | 22/22/15 | 54.3 | 14/30/0 | 48.3 | 18/26/0 | 58.1 | 51.8/45.2/54.5 |
| Shopify__sarama | cdxgen | NA | | NA | | NA | | |
| Shopify__sarama | cyclonedx-gomod | 14/0/23 | 54.9 | 14/0/0 | 100.0 | 14/0/4 | 87.5 | 54.9/100.0/87.5 |
| ThePaw__go-gt | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| TimothyYe__skm | syft | 9/0/0 | 100.0 | 7/2/0 | 87.5 | 7/2/0 | 87.5 | 100.0/87.5/87.5 |
| TimothyYe__skm | trivy | 7/0/2 | 87.5 | 7/0/0 | 100.0 | 7/0/0 | 100.0 | 87.5/100.0/100.0 |
| TimothyYe__skm | cdxgen | 7/0/2 | 87.5 | 7/0/0 | 100.0 | 7/0/0 | 100.0 | 87.5/100.0/100.0 |
| TimothyYe__skm | cyclonedx-gomod | 7/0/2 | 87.5 | 7/0/0 | 100.0 | 7/0/0 | 100.0 | 87.5/100.0/100.0 |
| VictoriaMetrics__fastcache | syft | 0/6/0 | 0.0 | 3/3/0 | 66.7 | 4/2/0 | 80.0 | 0.0/66.7/80.0 |
| VictoriaMetrics__fastcache | trivy | 0/6/0 | 0.0 | 3/3/0 | 66.7 | 4/2/0 | 80.0 | 0.0/66.7/80.0 |
| VictoriaMetrics__fastcache | cdxgen | 0/6/0 | 0.0 | 3/3/0 | 66.7 | 4/2/0 | 80.0 | 0.0/66.7/80.0 |
| VictoriaMetrics__fastcache | cyclonedx-gomod | 0/3/0 | 0.0 | 3/0/0 | 100.0 | 3/0/1 | 85.7 | 0.0/100.0/85.7 |
| VividCortex__multitick | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| Voxray-AI__Voxray | syft | 192/1/171 | 69.1 | 149/44/0 | 87.1 | 149/44/0 | 87.1 | 69.1/87.1/87.1 |
| Voxray-AI__Voxray | trivy | 152/0/211 | 59.0 | 149/3/0 | 99.0 | 149/3/0 | 99.0 | 59.0/99.0/99.0 |
| Voxray-AI__Voxray | cdxgen | 149/0/214 | 58.2 | 149/0/0 | 100.0 | 149/0/0 | 100.0 | 58.2/100.0/100.0 |
| Voxray-AI__Voxray | cyclonedx-gomod | 152/0/211 | 59.0 | 149/3/0 | 99.0 | 149/3/0 | 99.0 | 59.0/99.0/99.0 |
| awalterschulze__goderive | syft | 0/3/0 | 0.0 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 0.0/100.0/100.0 |
| awalterschulze__goderive | trivy | 0/3/0 | 0.0 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 0.0/100.0/100.0 |
| awalterschulze__goderive | cdxgen | 0/3/0 | 0.0 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 0.0/100.0/100.0 |
| awalterschulze__goderive | cyclonedx-gomod | 0/3/0 | 0.0 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 0.0/100.0/100.0 |
| awnumar__memguard | syft | 4/0/3 | 72.7 | 4/0/0 | 100.0 | 4/0/0 | 100.0 | 72.7/100.0/100.0 |
| awnumar__memguard | trivy | 4/0/3 | 72.7 | 4/0/0 | 100.0 | 4/0/0 | 100.0 | 72.7/100.0/100.0 |
| awnumar__memguard | cdxgen | 4/0/3 | 72.7 | 4/0/0 | 100.0 | 4/0/0 | 100.0 | 72.7/100.0/100.0 |
| awnumar__memguard | cyclonedx-gomod | 4/0/3 | 72.7 | 4/0/0 | 100.0 | 4/0/0 | 100.0 | 72.7/100.0/100.0 |
| balinomad__go-mockfs | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| barasher__go-exiftool | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| bartventer__gorm-multitenancy | syft | 12/171/2 | 12.2 | 9/174/0 | 9.4 | 9/174/0 | 9.4 | 11.5/8.8/8.8 |
| bartventer__gorm-multitenancy | trivy | 10/147/4 | 11.7 | 9/148/0 | 10.8 | 9/148/0 | 10.8 | 11.4/10.5/10.5 |
| bartventer__gorm-multitenancy | cdxgen | 10/107/4 | 15.3 | 9/108/0 | 14.3 | 9/108/0 | 14.3 | 15.3/14.3/14.3 |
| bartventer__gorm-multitenancy | cyclonedx-gomod | 9/0/5 | 78.3 | 9/0/0 | 100.0 | 9/0/0 | 100.0 | 78.3/100.0/100.0 |
| coregx__ahocorasick | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| cossacklabs__acra | syft | 146/0/221 | 56.9 | 110/36/0 | 85.9 | 110/36/0 | 85.9 | 56.9/85.9/85.9 |
| cossacklabs__acra | trivy | 125/0/242 | 50.8 | 110/15/0 | 93.6 | 110/15/0 | 93.6 | 50.8/93.6/93.6 |
| cossacklabs__acra | cdxgen | 110/0/257 | 46.1 | 110/0/0 | 100.0 | 110/0/0 | 100.0 | 46.1/100.0/100.0 |
| cossacklabs__acra | cyclonedx-gomod | 120/0/247 | 49.3 | 110/10/0 | 95.7 | 110/10/0 | 95.7 | 49.3/95.7/95.7 |
| juicedata__juicefs | syft | 378/11/335 | 68.6 | 295/94/10 | 85.0 | 307/82/10 | 87.0 | 68.6/85.0/87.0 |
| juicedata__juicefs | trivy | NA | | NA | | NA | | |
| juicedata__juicefs | cdxgen | 305/0/408 | 59.9 | 305/0/0 | 100.0 | 305/0/12 | 98.1 | 59.9/100.0/98.1 |
| juicedata__juicefs | cyclonedx-gomod | 311/10/402 | 60.2 | 293/28/12 | 93.6 | 293/28/24 | 91.8 | 60.2/93.6/91.8 |
| julienschmidt__httprouter | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| kevincobain2000__gobrew | syft | 23/0/5 | 90.2 | 15/8/0 | 78.9 | 19/4/0 | 90.5 | 90.2/78.9/90.5 |
| kevincobain2000__gobrew | trivy | 19/0/9 | 80.9 | 15/4/0 | 88.2 | 19/0/0 | 100.0 | 80.9/88.2/100.0 |
| kevincobain2000__gobrew | cdxgen | 15/0/13 | 69.8 | 15/0/0 | 100.0 | 15/0/4 | 88.2 | 69.8/100.0/88.2 |
| kevincobain2000__gobrew | cyclonedx-gomod | 15/0/13 | 69.8 | 15/0/0 | 100.0 | 15/0/4 | 88.2 | 69.8/100.0/88.2 |
| khaiql__dbcleaner | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| khezen__evoli | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| AppsFlyer__go-sundheit | syft | 10/5/1 | 76.9 | 1/14/0 | 12.5 | 7/8/0 | 63.6 | 71.4/11.1/58.3 |
| AppsFlyer__go-sundheit | trivy | 9/3/2 | 78.3 | 1/11/0 | 15.4 | 7/5/0 | 73.7 | 75.0/14.3/70.0 |
| AppsFlyer__go-sundheit | cdxgen | 1/1/10 | 15.4 | 1/1/0 | 66.7 | 1/1/6 | 22.2 | 15.4/66.7/22.2 |
| AppsFlyer__go-sundheit | cyclonedx-gomod | 1/0/10 | 16.7 | 1/0/0 | 100.0 | 1/0/6 | 25.0 | 16.7/100.0/25.0 |
| StabbyCutyou__moldova | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| VividCortex__siesta | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| Wissance__stringFormatter | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| adam-hanna__sessions | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| adhocore__gronx | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| adrg__libvlc-go | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| agnivade__levenshtein | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| ajstarks__svgo | syft | 3/0/11 | 35.3 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 35.3/100.0/100.0 |
| ajstarks__svgo | trivy | 14/0/0 | 100.0 | 3/11/0 | 35.3 | 3/11/0 | 35.3 | 100.0/35.3/35.3 |
| ajstarks__svgo | cdxgen | 3/0/11 | 35.3 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 35.3/100.0/100.0 |
| ajstarks__svgo | cyclonedx-gomod | 3/0/11 | 35.3 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 35.3/100.0/100.0 |
| alecthomas__go_serialization_benchmarks | syft | 71/0/161 | 46.9 | 48/23/0 | 80.7 | 48/23/0 | 80.7 | 46.9/80.7/80.7 |
| alecthomas__go_serialization_benchmarks | trivy | 55/0/177 | 38.3 | 48/7/0 | 93.2 | 48/7/0 | 93.2 | 38.3/93.2/93.2 |
| alecthomas__go_serialization_benchmarks | cdxgen | 48/0/184 | 34.3 | 48/0/0 | 100.0 | 48/0/0 | 100.0 | 34.3/100.0/100.0 |
| alecthomas__go_serialization_benchmarks | cyclonedx-gomod | 50/0/182 | 35.5 | 48/2/0 | 98.0 | 48/2/0 | 98.0 | 35.5/98.0/98.0 |
| beyang__hgo | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| bhope__hedge | syft | 19/3/20 | 62.3 | 6/16/0 | 42.9 | 6/16/0 | 42.9 | 62.3/42.9/42.9 |
| bhope__hedge | trivy | 6/3/33 | 25.0 | 6/3/0 | 80.0 | 6/3/0 | 80.0 | 25.0/80.0/80.0 |
| bhope__hedge | cdxgen | 6/1/33 | 26.1 | 6/1/0 | 92.3 | 6/1/0 | 92.3 | 26.1/92.3/92.3 |
| bhope__hedge | cyclonedx-gomod | 6/0/33 | 26.7 | 6/0/0 | 100.0 | 6/0/0 | 100.0 | 26.7/100.0/100.0 |
| bitfield__gotestdox | syft | 8/0/4 | 80.0 | 5/3/0 | 76.9 | 8/0/0 | 100.0 | 80.0/76.9/100.0 |
| bitfield__gotestdox | trivy | 8/0/4 | 80.0 | 5/3/0 | 76.9 | 8/0/0 | 100.0 | 80.0/76.9/100.0 |
| bitfield__gotestdox | cdxgen | 5/0/7 | 58.8 | 5/0/0 | 100.0 | 5/0/3 | 76.9 | 58.8/100.0/76.9 |
| bitfield__gotestdox | cyclonedx-gomod | 5/0/7 | 58.8 | 5/0/0 | 100.0 | 5/0/3 | 76.9 | 58.8/100.0/76.9 |
| dimiro1__banner | syft | 4/0/0 | 100.0 | 4/0/0 | 100.0 | 4/0/0 | 100.0 | 100.0/100.0/100.0 |
| dimiro1__banner | trivy | 4/0/0 | 100.0 | 4/0/0 | 100.0 | 4/0/0 | 100.0 | 100.0/100.0/100.0 |
| dimiro1__banner | cdxgen | 4/0/0 | 100.0 | 4/0/0 | 100.0 | 4/0/0 | 100.0 | 100.0/100.0/100.0 |
| dimiro1__banner | cyclonedx-gomod | 4/0/0 | 100.0 | 4/0/0 | 100.0 | 4/0/0 | 100.0 | 100.0/100.0/100.0 |
| dixonwille__wlog | syft | 9/0/1 | 94.7 | 1/8/0 | 20.0 | 5/4/0 | 71.4 | 94.7/20.0/71.4 |
| dixonwille__wlog | trivy | 10/0/0 | 100.0 | 1/9/0 | 18.2 | 5/5/0 | 66.7 | 100.0/18.2/66.7 |
| dixonwille__wlog | cdxgen | 1/0/9 | 18.2 | 1/0/0 | 100.0 | 1/0/4 | 33.3 | 18.2/100.0/33.3 |
| dixonwille__wlog | cyclonedx-gomod | 1/0/9 | 18.2 | 1/0/0 | 100.0 | 1/0/4 | 33.3 | 18.2/100.0/33.3 |
| dominikh__go-tools | syft | 8/1/4 | 76.2 | 7/2/0 | 87.5 | 8/1/0 | 94.1 | 76.2/87.5/94.1 |
| dominikh__go-tools | trivy | 8/1/4 | 76.2 | 7/2/0 | 87.5 | 8/1/0 | 94.1 | 76.2/87.5/94.1 |
| dominikh__go-tools | cdxgen | 7/0/5 | 73.7 | 7/0/0 | 100.0 | 7/0/1 | 93.3 | 73.7/100.0/93.3 |
| dominikh__go-tools | cyclonedx-gomod | 7/0/5 | 73.7 | 7/0/0 | 100.0 | 7/0/1 | 93.3 | 73.7/100.0/93.3 |
| faceair__jio | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| feyeleanor__GoSpeed | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| kahoon__pending | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| kak-tus__nan | syft | 18/0/3 | 92.3 | 9/9/0 | 66.7 | 13/5/0 | 83.9 | 92.3/66.7/83.9 |
| kak-tus__nan | trivy | 21/0/0 | 100.0 | 9/12/0 | 60.0 | 13/8/0 | 76.5 | 100.0/60.0/76.5 |
| kak-tus__nan | cdxgen | 9/0/12 | 60.0 | 9/0/0 | 100.0 | 9/0/4 | 81.8 | 60.0/100.0/81.8 |
| kak-tus__nan | cyclonedx-gomod | 9/0/12 | 60.0 | 9/0/0 | 100.0 | 9/0/4 | 81.8 | 60.0/100.0/81.8 |
| kamilsk__breaker | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| kelindar__bitmap | syft | 8/0/1 | 94.1 | 2/6/0 | 40.0 | 6/2/0 | 85.7 | 94.1/40.0/85.7 |
| kelindar__bitmap | trivy | 7/0/2 | 87.5 | 2/5/0 | 44.4 | 6/1/0 | 92.3 | 87.5/44.4/92.3 |
| kelindar__bitmap | cdxgen | 2/0/7 | 36.4 | 2/0/0 | 100.0 | 2/0/4 | 50.0 | 36.4/100.0/50.0 |
| kelindar__bitmap | cyclonedx-gomod | 3/0/6 | 50.0 | 2/1/0 | 80.0 | 2/1/4 | 44.4 | 50.0/80.0/44.4 |
| knq__chromedp | syft | 9/0/0 | 100.0 | 6/3/0 | 80.0 | 8/1/0 | 94.1 | 100.0/80.0/94.1 |
| knq__chromedp | trivy | 9/0/0 | 100.0 | 6/3/0 | 80.0 | 8/1/0 | 94.1 | 100.0/80.0/94.1 |
| knq__chromedp | cdxgen | 6/0/3 | 80.0 | 6/0/0 | 100.0 | 6/0/2 | 85.7 | 80.0/100.0/85.7 |
| knq__chromedp | cyclonedx-gomod | 7/0/2 | 87.5 | 6/1/0 | 92.3 | 6/1/2 | 80.0 | 87.5/92.3/80.0 |
| knq__xo | syft | 52/0/27 | 79.4 | 33/19/0 | 77.6 | 33/19/0 | 77.6 | 79.4/77.6/77.6 |
| knq__xo | trivy | 33/0/46 | 58.9 | 33/0/0 | 100.0 | 33/0/0 | 100.0 | 58.9/100.0/100.0 |
| knq__xo | cdxgen | 33/0/46 | 58.9 | 33/0/0 | 100.0 | 33/0/0 | 100.0 | 58.9/100.0/100.0 |
| knq__xo | cyclonedx-gomod | 33/0/46 | 58.9 | 33/0/0 | 100.0 | 33/0/0 | 100.0 | 58.9/100.0/100.0 |
| kolesa-team__go-webp | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| ChristopherRabotin__ode | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| Jeffail__gabs | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| PerimeterX__marshmallow | syft | 4/0/1 | 88.9 | 2/2/0 | 66.7 | 4/0/0 | 100.0 | 88.9/66.7/100.0 |
| PerimeterX__marshmallow | trivy | 4/0/1 | 88.9 | 2/2/0 | 66.7 | 4/0/0 | 100.0 | 88.9/66.7/100.0 |
| PerimeterX__marshmallow | cdxgen | 2/0/3 | 57.1 | 2/0/0 | 100.0 | 2/0/2 | 66.7 | 57.1/100.0/66.7 |
| PerimeterX__marshmallow | cyclonedx-gomod | 2/0/3 | 57.1 | 2/0/0 | 100.0 | 2/0/2 | 66.7 | 57.1/100.0/66.7 |
| abahmed__kwatch | syft | 70/0/20 | 87.5 | 57/13/0 | 89.8 | 59/11/0 | 91.5 | 87.5/89.8/91.5 |
| abahmed__kwatch | trivy | 61/0/29 | 80.8 | 57/4/0 | 96.6 | 59/2/0 | 98.3 | 80.8/96.6/98.3 |
| abahmed__kwatch | cdxgen | 57/0/33 | 77.6 | 57/0/0 | 100.0 | 57/0/2 | 98.3 | 77.6/100.0/98.3 |
| abahmed__kwatch | cyclonedx-gomod | 55/0/35 | 75.9 | 54/1/3 | 96.4 | 54/1/5 | 94.7 | 75.9/96.4/94.7 |
| abice__go-enum | syft | 39/0/10 | 88.6 | 23/16/0 | 74.2 | 29/10/0 | 85.3 | 88.6/74.2/85.3 |
| abice__go-enum | trivy | 34/0/15 | 81.9 | 23/11/0 | 80.7 | 29/5/0 | 92.1 | 81.9/80.7/92.1 |
| abice__go-enum | cdxgen | 23/0/26 | 63.9 | 23/0/0 | 100.0 | 23/0/6 | 88.5 | 63.9/100.0/88.5 |
| abice__go-enum | cyclonedx-gomod | 27/0/22 | 71.1 | 23/4/0 | 92.0 | 24/3/5 | 85.7 | 71.1/92.0/85.7 |
| adnanh__webhook | syft | 0/14/0 | 0.0 | 10/4/0 | 83.3 | 10/4/0 | 83.3 | 0.0/83.3/83.3 |
| adnanh__webhook | trivy | 0/14/0 | 0.0 | 10/4/0 | 83.3 | 10/4/0 | 83.3 | 0.0/83.3/83.3 |
| adnanh__webhook | cdxgen | 0/14/0 | 0.0 | 10/4/0 | 83.3 | 10/4/0 | 83.3 | 0.0/83.3/83.3 |
| adnanh__webhook | cyclonedx-gomod | 0/11/0 | 0.0 | 10/1/0 | 95.2 | 10/1/0 | 95.2 | 0.0/95.2/95.2 |
| aldor007__mort | syft | 132/0/194 | 57.6 | 95/37/0 | 83.7 | 105/27/0 | 88.6 | 57.6/83.7/88.6 |
| aldor007__mort | trivy | 107/0/219 | 49.4 | 95/12/0 | 94.1 | 105/2/0 | 99.1 | 49.4/94.1/99.1 |
| aldor007__mort | cdxgen | 95/0/231 | 45.1 | 95/0/0 | 100.0 | 95/0/10 | 95.0 | 45.1/100.0/95.0 |
| aldor007__mort | cyclonedx-gomod | 97/0/229 | 45.9 | 95/2/0 | 99.0 | 95/2/10 | 94.1 | 45.9/99.0/94.1 |
| alecthomas__kong | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| asaskevich__govalidator | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| asticode__go-astits | syft | 7/0/1 | 93.3 | 2/5/0 | 44.4 | 6/1/0 | 92.3 | 93.3/44.4/92.3 |
| asticode__go-astits | trivy | 6/0/2 | 85.7 | 2/4/0 | 50.0 | 6/0/0 | 100.0 | 85.7/50.0/100.0 |
| asticode__go-astits | cdxgen | 2/0/6 | 40.0 | 2/0/0 | 100.0 | 2/0/4 | 50.0 | 40.0/100.0/50.0 |
| asticode__go-astits | cyclonedx-gomod | 2/0/6 | 40.0 | 2/0/0 | 100.0 | 2/0/4 | 50.0 | 40.0/100.0/50.0 |
| bmf-san__ggc | syft | 6/0/3 | 80.0 | 4/2/0 | 80.0 | 5/1/0 | 90.9 | 80.0/80.0/90.9 |
| bmf-san__ggc | trivy | 6/0/3 | 80.0 | 4/2/0 | 80.0 | 5/1/0 | 90.9 | 80.0/80.0/90.9 |
| bmf-san__ggc | cdxgen | 4/0/5 | 61.5 | 4/0/0 | 100.0 | 4/0/1 | 88.9 | 61.5/100.0/88.9 |
| bmf-san__ggc | cyclonedx-gomod | 4/0/5 | 61.5 | 4/0/0 | 100.0 | 4/0/1 | 88.9 | 61.5/100.0/88.9 |
| bmf-san__gondola | syft | 3/1/0 | 85.7 | 2/2/0 | 66.7 | 2/2/0 | 66.7 | 85.7/66.7/66.7 |
| bmf-san__gondola | trivy | 3/1/0 | 85.7 | 2/2/0 | 66.7 | 2/2/0 | 66.7 | 85.7/66.7/66.7 |
| bmf-san__gondola | cdxgen | 2/0/1 | 80.0 | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 80.0/100.0/100.0 |
| bmf-san__gondola | cyclonedx-gomod | 2/0/1 | 80.0 | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 80.0/100.0/100.0 |
| bndr__gotabulate | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| fogleman__gg | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| go-kivik__kivik | syft | 157/0/223 | 58.5 | 32/125/0 | 33.9 | 38/119/0 | 39.0 | 53.2/28.2/32.6 |
| go-kivik__kivik | trivy | 126/0/254 | 49.8 | 32/94/0 | 40.5 | 38/88/0 | 46.3 | 44.8/34.0/39.2 |
| go-kivik__kivik | cdxgen | 84/0/296 | 36.2 | 32/52/0 | 55.2 | 32/52/6 | 52.5 | 36.2/55.2/52.5 |
| go-kivik__kivik | cyclonedx-gomod | 102/0/278 | 42.3 | 32/70/0 | 47.8 | 32/70/6 | 45.7 | 42.3/47.8/45.7 |
| go-perfstat__go | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| go-reform__reform | syft | 23/172/2 | 20.9 | 10/185/0 | 9.8 | 15/180/0 | 14.3 | 17.9/9.6/14.0 |
| go-reform__reform | trivy | 22/173/3 | 20.0 | 10/185/0 | 9.8 | 15/180/0 | 14.3 | 17.0/9.6/14.0 |
| go-reform__reform | cdxgen | 17/172/8 | 15.9 | 10/179/0 | 10.1 | 14/175/1 | 13.7 | 11.1/10.0/11.7 |
| go-reform__reform | cyclonedx-gomod | 9/0/16 | 52.9 | 9/0/1 | 94.7 | 9/0/6 | 75.0 | 52.9/94.7/75.0 |
| kelindar__tile | syft | 7/0/1 | 93.3 | 2/5/0 | 44.4 | 6/1/0 | 92.3 | 93.3/44.4/92.3 |
| kelindar__tile | trivy | 6/0/2 | 85.7 | 2/4/0 | 50.0 | 6/0/0 | 100.0 | 85.7/50.0/100.0 |
| kelindar__tile | cdxgen | 2/0/6 | 40.0 | 2/0/0 | 100.0 | 2/0/4 | 50.0 | 40.0/100.0/50.0 |
| kelindar__tile | cyclonedx-gomod | 2/0/6 | 40.0 | 2/0/0 | 100.0 | 2/0/4 | 50.0 | 40.0/100.0/50.0 |
| kelseyhightower__envconfig | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| kkyr__fig | syft | 7/1/1 | 87.5 | 3/5/0 | 54.5 | 3/5/0 | 54.5 | 87.5/54.5/54.5 |
| kkyr__fig | trivy | 8/2/0 | 88.9 | 3/7/0 | 46.2 | 3/7/0 | 46.2 | 88.9/46.2/46.2 |
| kkyr__fig | cdxgen | 3/1/5 | 50.0 | 3/1/0 | 85.7 | 3/1/0 | 85.7 | 50.0/85.7/85.7 |
| kkyr__fig | cyclonedx-gomod | 3/0/5 | 54.5 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 54.5/100.0/100.0 |
| knadh__koanf | syft | 146/39/75 | 71.9 | 4/181/0 | 4.2 | 4/181/0 | 4.2 | 54.5/2.8/2.8 |
| knadh__koanf | trivy | 122/28/99 | 65.8 | 4/146/0 | 5.2 | 4/146/0 | 5.2 | 47.9/3.5/3.5 |
| knadh__koanf | cdxgen | NA | | NA | | NA | | |
| knadh__koanf | cyclonedx-gomod | 98/0/123 | 61.4 | 4/94/0 | 7.8 | 4/94/0 | 7.8 | 61.4/7.8/7.8 |
| knights-analytics__hugot | syft | 57/0/36 | 76.0 | 24/33/0 | 59.3 | 24/33/0 | 59.3 | 76.0/59.3/59.3 |
| knights-analytics__hugot | trivy | 29/0/64 | 47.5 | 24/5/0 | 90.6 | 24/5/0 | 90.6 | 47.5/90.6/90.6 |
| knights-analytics__hugot | cdxgen | 24/0/69 | 41.0 | 24/0/0 | 100.0 | 24/0/0 | 100.0 | 41.0/100.0/100.0 |
| knights-analytics__hugot | cyclonedx-gomod | 29/0/64 | 47.5 | 24/5/0 | 90.6 | 24/5/0 | 90.6 | 47.5/90.6/90.6 |
| kubernetes-sigs__kind | syft | 20/388/3 | 9.3 | 11/397/0 | 5.3 | 11/397/0 | 5.3 | 8.2/4.9/4.9 |
| kubernetes-sigs__kind | trivy | 20/387/3 | 9.3 | 11/396/0 | 5.3 | 11/396/0 | 5.3 | 7.8/4.9/4.9 |
| kubernetes-sigs__kind | cdxgen | 18/384/5 | 8.5 | 11/391/0 | 5.3 | 11/391/0 | 5.3 | 7.0/5.0/5.0 |
| kubernetes-sigs__kind | cyclonedx-gomod | 12/0/11 | 68.6 | 11/1/0 | 95.7 | 11/1/0 | 95.7 | 68.6/95.7/95.7 |
| kubernetes__minikube | syft | 280/36/248 | 66.4 | 219/97/0 | 81.9 | 222/94/0 | 82.5 | 58.9/70.1/70.7 |
| kubernetes__minikube | trivy | 250/26/278 | 62.2 | 219/57/0 | 88.5 | 222/54/0 | 89.2 | 57.1/78.2/78.9 |
| kubernetes__minikube | cdxgen | 227/20/301 | 58.6 | 219/28/0 | 94.0 | 219/28/3 | 93.4 | 53.8/83.0/82.5 |
| kubernetes__minikube | cyclonedx-gomod | 229/0/299 | 60.5 | 214/15/5 | 95.5 | 214/15/8 | 94.9 | 60.5/95.5/94.9 |
| kubeshark__kubeshark | syft | 211/0/139 | 75.2 | 129/82/0 | 75.9 | 129/82/0 | 75.9 | 75.2/75.9/75.9 |
| kubeshark__kubeshark | trivy | 132/0/218 | 54.8 | 129/3/0 | 98.9 | 129/3/0 | 98.9 | 54.8/98.9/98.9 |
| kubeshark__kubeshark | cdxgen | 129/0/221 | 53.9 | 129/0/0 | 100.0 | 129/0/0 | 100.0 | 53.9/100.0/100.0 |
| kubeshark__kubeshark | cyclonedx-gomod | 131/0/219 | 54.5 | 129/2/0 | 99.2 | 129/2/0 | 99.2 | 54.5/99.2/99.2 |
| a2800276__porter | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| adrianosela__multikey | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| ahmadraza100__dotlock | syft | 40/0/18 | 81.6 | 32/8/0 | 88.9 | 32/8/0 | 88.9 | 81.6/88.9/88.9 |
| ahmadraza100__dotlock | trivy | 36/0/22 | 76.6 | 32/4/0 | 94.1 | 32/4/0 | 94.1 | 76.6/94.1/94.1 |
| ahmadraza100__dotlock | cdxgen | 32/0/26 | 71.1 | 32/0/0 | 100.0 | 32/0/0 | 100.0 | 71.1/100.0/100.0 |
| ahmadraza100__dotlock | cyclonedx-gomod | 36/0/22 | 76.6 | 32/4/0 | 94.1 | 32/4/0 | 94.1 | 76.6/94.1/94.1 |
| amit-davidson__LibraDB | syft | 6/0/1 | 92.3 | 5/1/0 | 90.9 | 5/1/0 | 90.9 | 92.3/90.9/90.9 |
| amit-davidson__LibraDB | trivy | 5/0/2 | 83.3 | 5/0/0 | 100.0 | 5/0/0 | 100.0 | 83.3/100.0/100.0 |
| amit-davidson__LibraDB | cdxgen | 5/0/2 | 83.3 | 5/0/0 | 100.0 | 5/0/0 | 100.0 | 83.3/100.0/100.0 |
| amit-davidson__LibraDB | cyclonedx-gomod | 5/0/2 | 83.3 | 5/0/0 | 100.0 | 5/0/0 | 100.0 | 83.3/100.0/100.0 |
| anacrolix__dht | syft | 90/0/265 | 40.4 | 71/19/0 | 88.2 | 80/10/0 | 94.1 | 40.4/88.2/94.1 |
| anacrolix__dht | trivy | 84/0/271 | 38.3 | 71/13/0 | 91.6 | 80/4/0 | 97.6 | 38.3/91.6/97.6 |
| anacrolix__dht | cdxgen | 71/0/284 | 33.3 | 71/0/0 | 100.0 | 71/0/9 | 94.0 | 33.3/100.0/94.0 |
| anacrolix__dht | cyclonedx-gomod | 75/0/280 | 34.9 | 71/4/0 | 97.3 | 71/4/9 | 91.6 | 34.9/97.3/91.6 |
| anatol__luks.go | syft | 15/0/4 | 88.2 | 5/10/0 | 50.0 | 13/2/0 | 92.9 | 88.2/50.0/92.9 |
| anatol__luks.go | trivy | 13/0/6 | 81.3 | 5/8/0 | 55.6 | 13/0/0 | 100.0 | 81.3/55.6/100.0 |
| anatol__luks.go | cdxgen | 5/0/14 | 41.7 | 5/0/0 | 100.0 | 5/0/8 | 55.6 | 41.7/100.0/55.6 |
| anatol__luks.go | cyclonedx-gomod | 5/0/14 | 41.7 | 5/0/0 | 100.0 | 5/0/8 | 55.6 | 41.7/100.0/55.6 |
| bolknote__go-gd | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| borderstech__artifex | syft | 5/0/0 | 100.0 | 1/4/0 | 33.3 | 4/1/0 | 88.9 | 100.0/33.3/88.9 |
| borderstech__artifex | trivy | 5/0/0 | 100.0 | 1/4/0 | 33.3 | 4/1/0 | 88.9 | 100.0/33.3/88.9 |
| borderstech__artifex | cdxgen | 1/0/4 | 33.3 | 1/0/0 | 100.0 | 1/0/3 | 40.0 | 33.3/100.0/40.0 |
| borderstech__artifex | cyclonedx-gomod | 1/0/4 | 33.3 | 1/0/0 | 100.0 | 1/0/3 | 40.0 | 33.3/100.0/40.0 |
| bouk__gonerics | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| boxesandglue__bagme | syft | 17/0/5 | 87.2 | 17/0/0 | 100.0 | 17/0/0 | 100.0 | 87.2/100.0/100.0 |
| boxesandglue__bagme | trivy | 17/0/5 | 87.2 | 17/0/0 | 100.0 | 17/0/0 | 100.0 | 87.2/100.0/100.0 |
| boxesandglue__bagme | cdxgen | 17/0/5 | 87.2 | 17/0/0 | 100.0 | 17/0/0 | 100.0 | 87.2/100.0/100.0 |
| boxesandglue__bagme | cyclonedx-gomod | 17/0/5 | 87.2 | 17/0/0 | 100.0 | 17/0/0 | 100.0 | 87.2/100.0/100.0 |
| bsm__redislock | syft | 10/0/1 | 95.2 | 3/7/0 | 46.2 | 3/7/0 | 46.2 | 95.2/46.2/46.2 |
| bsm__redislock | trivy | 3/0/8 | 42.9 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 42.9/100.0/100.0 |
| bsm__redislock | cdxgen | 3/0/8 | 42.9 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 42.9/100.0/100.0 |
| bsm__redislock | cyclonedx-gomod | 3/0/8 | 42.9 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 42.9/100.0/100.0 |
| c-bata__goptuna | syft | 32/24/22 | 58.2 | 19/37/0 | 50.7 | 19/37/0 | 50.7 | 53.6/49.4/49.4 |
| c-bata__goptuna | trivy | 23/21/31 | 46.9 | 19/25/0 | 60.3 | 19/25/0 | 60.3 | 42.9/60.3/60.3 |
| c-bata__goptuna | cdxgen | NA | | NA | | NA | | |
| c-bata__goptuna | cyclonedx-gomod | 20/0/34 | 54.1 | 19/1/0 | 97.4 | 19/1/0 | 97.4 | 54.1/97.4/97.4 |
| codingconcepts__env | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| containers__podman-tui | syft | 0/143/0 | 0.0 | 128/15/0 | 94.5 | 135/8/0 | 97.1 | 0.0/94.5/97.1 |
| containers__podman-tui | trivy | 0/143/0 | 0.0 | 128/15/0 | 94.5 | 135/8/0 | 97.1 | 0.0/94.5/97.1 |
| containers__podman-tui | cdxgen | 0/143/0 | 0.0 | 128/15/0 | 94.5 | 135/8/0 | 97.1 | 0.0/94.5/97.1 |
| containers__podman-tui | cyclonedx-gomod | 0/133/0 | 0.0 | 127/6/1 | 97.3 | 127/6/8 | 94.8 | 0.0/97.3/94.8 |
| gookit__config | syft | 16/0/2 | 94.1 | 13/3/0 | 89.7 | 13/3/0 | 89.7 | 94.1/89.7/89.7 |
| gookit__config | trivy | 13/0/5 | 83.9 | 13/0/0 | 100.0 | 13/0/0 | 100.0 | 83.9/100.0/100.0 |
| gookit__config | cdxgen | 13/0/5 | 83.9 | 13/0/0 | 100.0 | 13/0/0 | 100.0 | 83.9/100.0/100.0 |
| gookit__config | cyclonedx-gomod | 13/0/5 | 83.9 | 13/0/0 | 100.0 | 13/0/0 | 100.0 | 83.9/100.0/100.0 |
| goradd__got | syft | 6/0/5 | 70.6 | 1/5/0 | 28.6 | 5/1/0 | 90.9 | 70.6/28.6/90.9 |
| goradd__got | trivy | 5/0/6 | 62.5 | 1/4/0 | 33.3 | 5/0/0 | 100.0 | 62.5/33.3/100.0 |
| goradd__got | cdxgen | 1/0/10 | 16.7 | 1/0/0 | 100.0 | 1/0/4 | 33.3 | 16.7/100.0/33.3 |
| goradd__got | cyclonedx-gomod | 1/0/10 | 16.7 | 1/0/0 | 100.0 | 1/0/4 | 33.3 | 16.7/100.0/33.3 |
| gosimple__slug | syft | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| gosimple__slug | trivy | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| gosimple__slug | cdxgen | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| gosimple__slug | cyclonedx-gomod | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| krayzpipes__cronticker | syft | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| krayzpipes__cronticker | trivy | 1/1/0 | 66.7 | 1/1/0 | 66.7 | 1/1/0 | 66.7 | 66.7/66.7/66.7 |
| krayzpipes__cronticker | cdxgen | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| krayzpipes__cronticker | cyclonedx-gomod | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| krotik__ecal | syft | 1/3/0 | 40.0 | 1/3/0 | 40.0 | 1/3/0 | 40.0 | 40.0/40.0/40.0 |
| krotik__ecal | trivy | 1/1/0 | 66.7 | 1/1/0 | 66.7 | 1/1/0 | 66.7 | 66.7/66.7/66.7 |
| krotik__ecal | cdxgen | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| krotik__ecal | cyclonedx-gomod | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| lazynop__lazyenv | syft | 32/0/8 | 88.9 | 21/11/0 | 79.2 | 25/7/0 | 87.7 | 88.9/79.2/87.7 |
| lazynop__lazyenv | trivy | 25/0/15 | 76.9 | 21/4/0 | 91.3 | 25/0/0 | 100.0 | 76.9/91.3/100.0 |
| lazynop__lazyenv | cdxgen | 21/0/19 | 68.9 | 21/0/0 | 100.0 | 21/0/4 | 91.3 | 68.9/100.0/91.3 |
| lazynop__lazyenv | cyclonedx-gomod | 21/0/19 | 68.9 | 21/0/0 | 100.0 | 21/0/4 | 91.3 | 68.9/100.0/91.3 |
| leaanthony__debme | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| leandro-lugaresi__hub | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| lib__pq | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
