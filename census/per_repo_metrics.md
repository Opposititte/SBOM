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
| C2FO__vfs | syft | 131/9/137 | 64.2 | 87/53/0 | 76.7 | 94/46/0 | 80.3 | 63.6/75.3/79.0 |
| C2FO__vfs | trivy | 97/6/171 | 52.3 | 87/16/0 | 91.6 | 94/9/0 | 95.4 | 52.3/91.6/95.4 |
| C2FO__vfs | cdxgen | 90/3/178 | 49.9 | 87/6/0 | 96.7 | 89/4/5 | 95.2 | 49.9/96.7/95.2 |
| C2FO__vfs | cyclonedx-gomod | 87/0/181 | 49.0 | 86/1/1 | 98.9 | 86/1/8 | 95.0 | 49.0/98.9/95.0 |
| Eyevinn__hls-m3u8 | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| FreeLeh__GoFreeDB | syft | 29/0/64 | 47.5 | 16/13/0 | 71.1 | 22/7/0 | 86.3 | 47.5/71.1/86.3 |
| FreeLeh__GoFreeDB | trivy | 23/0/70 | 39.7 | 16/7/0 | 82.1 | 22/1/0 | 97.8 | 39.7/82.1/97.8 |
| FreeLeh__GoFreeDB | cdxgen | 16/0/77 | 29.4 | 16/0/0 | 100.0 | 16/0/6 | 84.2 | 29.4/100.0/84.2 |
| FreeLeh__GoFreeDB | cyclonedx-gomod | 17/0/76 | 30.9 | 16/1/0 | 97.0 | 16/1/6 | 82.1 | 30.9/97.0/82.1 |
| VividCortex__robustly | syft | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| VividCortex__robustly | trivy | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| VividCortex__robustly | cdxgen | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| VividCortex__robustly | cyclonedx-gomod | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| Workiva__go-datastructures | syft | 8/0/10 | 61.5 | 7/1/0 | 93.3 | 7/1/0 | 93.3 | 61.5/93.3/93.3 |
| Workiva__go-datastructures | trivy | 18/0/0 | 100.0 | 7/11/0 | 56.0 | 7/11/0 | 56.0 | 100.0/56.0/56.0 |
| Workiva__go-datastructures | cdxgen | 7/0/11 | 56.0 | 7/0/0 | 100.0 | 7/0/0 | 100.0 | 56.0/100.0/100.0 |
| Workiva__go-datastructures | cyclonedx-gomod | 6/0/12 | 50.0 | 6/0/1 | 92.3 | 6/0/1 | 92.3 | 50.0/92.3/92.3 |
| Yiling-J__theine-go | syft | 11/0/3 | 88.0 | 3/8/0 | 42.9 | 8/3/0 | 84.2 | 88.0/42.9/84.2 |
| Yiling-J__theine-go | trivy | 10/0/4 | 83.3 | 3/7/0 | 46.2 | 8/2/0 | 88.9 | 83.3/46.2/88.9 |
| Yiling-J__theine-go | cdxgen | 3/0/11 | 35.3 | 3/0/0 | 100.0 | 3/0/5 | 54.5 | 35.3/100.0/54.5 |
| Yiling-J__theine-go | cyclonedx-gomod | 3/0/11 | 35.3 | 3/0/0 | 100.0 | 3/0/5 | 54.5 | 35.3/100.0/54.5 |
| apsdehal__go-logger | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| araddon__dateparse | syft | 8/0/1 | 94.1 | 3/5/0 | 54.5 | 7/1/0 | 93.3 | 94.1/54.5/93.3 |
| araddon__dateparse | trivy | 9/0/0 | 100.0 | 3/6/0 | 50.0 | 7/2/0 | 87.5 | 100.0/50.0/87.5 |
| araddon__dateparse | cdxgen | 3/0/6 | 50.0 | 3/0/0 | 100.0 | 3/0/4 | 60.0 | 50.0/100.0/60.0 |
| araddon__dateparse | cyclonedx-gomod | 3/0/6 | 50.0 | 3/0/0 | 100.0 | 3/0/4 | 60.0 | 50.0/100.0/60.0 |
| arceus-7__chroma16 | syft | 14/0/2 | 93.3 | 13/1/0 | 96.3 | 13/1/0 | 96.3 | 93.3/96.3/96.3 |
| arceus-7__chroma16 | trivy | 13/0/3 | 89.7 | 13/0/0 | 100.0 | 13/0/0 | 100.0 | 89.7/100.0/100.0 |
| arceus-7__chroma16 | cdxgen | 13/0/3 | 89.7 | 13/0/0 | 100.0 | 13/0/0 | 100.0 | 89.7/100.0/100.0 |
| arceus-7__chroma16 | cyclonedx-gomod | 13/0/3 | 89.7 | 13/0/0 | 100.0 | 13/0/0 | 100.0 | 89.7/100.0/100.0 |
| charmbracelet__bubbles | syft | 26/0/4 | 92.9 | 21/5/0 | 89.4 | 24/2/0 | 96.0 | 92.9/89.4/96.0 |
| charmbracelet__bubbles | trivy | 24/0/6 | 88.9 | 21/3/0 | 93.3 | 24/0/0 | 100.0 | 88.9/93.3/100.0 |
| charmbracelet__bubbles | cdxgen | 21/0/9 | 82.4 | 21/0/0 | 100.0 | 21/0/3 | 93.3 | 82.4/100.0/93.3 |
| charmbracelet__bubbles | cyclonedx-gomod | 21/0/9 | 82.4 | 21/0/0 | 100.0 | 21/0/3 | 93.3 | 82.4/100.0/93.3 |
| chmike__securecookie | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| chyroc__lark | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| golobby__container | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| goodsign__snowball | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| google__uuid | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| hlandau__acme | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| huandu__xstrings | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| kamva__mgm | syft | 20/0/6 | 87.0 | 16/4/0 | 88.9 | 17/3/0 | 91.9 | 87.0/88.9/91.9 |
| kamva__mgm | trivy | 17/0/9 | 79.1 | 16/1/0 | 97.0 | 17/0/0 | 100.0 | 79.1/97.0/100.0 |
| kamva__mgm | cdxgen | 16/0/10 | 76.2 | 16/0/0 | 100.0 | 16/0/1 | 97.0 | 76.2/100.0/97.0 |
| kamva__mgm | cyclonedx-gomod | 13/0/13 | 66.7 | 13/0/3 | 89.7 | 13/0/4 | 86.7 | 66.7/89.7/86.7 |
| karlseguin__the-little-go-book | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| kazhuravlev__git-tools | syft | 42/0/12 | 87.5 | 24/18/0 | 72.7 | 24/18/0 | 72.7 | 87.5/72.7/72.7 |
| kazhuravlev__git-tools | trivy | 26/0/28 | 65.0 | 24/2/0 | 96.0 | 24/2/0 | 96.0 | 65.0/96.0/96.0 |
| kazhuravlev__git-tools | cdxgen | 24/0/30 | 61.5 | 24/0/0 | 100.0 | 24/0/0 | 100.0 | 61.5/100.0/100.0 |
| kazhuravlev__git-tools | cyclonedx-gomod | 25/0/29 | 63.3 | 24/1/0 | 98.0 | 24/1/0 | 98.0 | 63.3/98.0/98.0 |
| kinbiko__jsonassert | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| kirillDanshin__dlog | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| kubeservice-stack__common | syft | 199/0/333 | 54.4 | 117/82/0 | 74.1 | 152/47/0 | 86.6 | 54.2/73.4/86.0 |
| kubeservice-stack__common | trivy | 161/0/371 | 46.5 | 117/44/0 | 84.2 | 152/9/0 | 97.1 | 46.2/83.5/96.5 |
| kubeservice-stack__common | cdxgen | 117/0/415 | 36.1 | 117/0/0 | 100.0 | 117/0/35 | 87.0 | 36.1/100.0/87.0 |
| kubeservice-stack__common | cyclonedx-gomod | 113/0/419 | 35.0 | 113/0/4 | 98.3 | 113/0/39 | 85.3 | 34.7/97.4/84.5 |
| kyleconroy__sqlc | syft | 63/22/26 | 72.4 | 37/48/0 | 60.7 | 40/45/0 | 64.0 | 68.2/58.3/61.5 |
| kyleconroy__sqlc | trivy | 48/18/41 | 61.9 | 37/29/0 | 71.8 | 40/26/0 | 75.5 | 56.6/69.2/72.7 |
| kyleconroy__sqlc | cdxgen | 40/17/49 | 54.8 | 37/20/0 | 78.7 | 37/20/3 | 76.3 | 49.3/75.5/73.3 |
| kyleconroy__sqlc | cyclonedx-gomod | 40/0/49 | 62.0 | 37/3/0 | 96.1 | 37/3/3 | 92.5 | 62.0/96.1/92.5 |
| kyuff__anchor | syft | 6/0/4 | 75.0 | 1/5/0 | 28.6 | 1/5/0 | 28.6 | 75.0/28.6/28.6 |
| kyuff__anchor | trivy | 4/0/6 | 57.1 | 1/3/0 | 40.0 | 1/3/0 | 40.0 | 57.1/40.0/40.0 |
| kyuff__anchor | cdxgen | 1/0/9 | 18.2 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 18.2/100.0/100.0 |
| kyuff__anchor | cyclonedx-gomod | 4/0/6 | 57.1 | 1/3/0 | 40.0 | 1/3/0 | 40.0 | 57.1/40.0/40.0 |
| DisposaBoy__GoSublime | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| Hossiy21__razify | syft | 8/0/4 | 80.0 | 6/2/0 | 85.7 | 6/2/0 | 85.7 | 80.0/85.7/85.7 |
| Hossiy21__razify | trivy | 8/0/4 | 80.0 | 6/2/0 | 85.7 | 6/2/0 | 85.7 | 80.0/85.7/85.7 |
| Hossiy21__razify | cdxgen | 6/0/6 | 66.7 | 6/0/0 | 100.0 | 6/0/0 | 100.0 | 66.7/100.0/100.0 |
| Hossiy21__razify | cyclonedx-gomod | 7/0/5 | 73.7 | 6/1/0 | 92.3 | 6/1/0 | 92.3 | 73.7/92.3/92.3 |
| ITcathyh__conexec | syft | 2/0/0 | 100.0 | 1/1/0 | 66.7 | 2/0/0 | 100.0 | 100.0/66.7/100.0 |
| ITcathyh__conexec | trivy | 2/0/0 | 100.0 | 1/1/0 | 66.7 | 2/0/0 | 100.0 | 100.0/66.7/100.0 |
| ITcathyh__conexec | cdxgen | 1/0/1 | 66.7 | 1/0/0 | 100.0 | 1/0/1 | 66.7 | 66.7/100.0/66.7 |
| ITcathyh__conexec | cyclonedx-gomod | 1/0/1 | 66.7 | 1/0/0 | 100.0 | 1/0/1 | 66.7 | 66.7/100.0/66.7 |
| MarvinJWendt__testza | syft | 19/0/9 | 80.9 | 16/3/0 | 91.4 | 16/3/0 | 91.4 | 80.9/91.4/91.4 |
| MarvinJWendt__testza | trivy | 16/0/12 | 72.7 | 16/0/0 | 100.0 | 16/0/0 | 100.0 | 72.7/100.0/100.0 |
| MarvinJWendt__testza | cdxgen | 16/0/12 | 72.7 | 16/0/0 | 100.0 | 16/0/0 | 100.0 | 72.7/100.0/100.0 |
| MarvinJWendt__testza | cyclonedx-gomod | 16/0/12 | 72.7 | 16/0/0 | 100.0 | 16/0/0 | 100.0 | 72.7/100.0/100.0 |
| afjoseph__RAKE.Go | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| agilira__argus | syft | 6/12/0 | 50.0 | 5/13/0 | 43.5 | 5/13/0 | 43.5 | 35.3/30.3/30.3 |
| agilira__argus | trivy | 6/22/0 | 35.3 | 5/23/0 | 30.3 | 5/23/0 | 30.3 | 27.9/23.8/23.8 |
| agilira__argus | cdxgen | NA | | NA | | NA | | |
| agilira__argus | cyclonedx-gomod | 5/0/1 | 90.9 | 5/0/0 | 100.0 | 5/0/0 | 100.0 | 90.9/100.0/100.0 |
| agoalofalife__event | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| asciimoo__colly | syft | 22/0/11 | 80.0 | 18/4/0 | 90.0 | 18/4/0 | 90.0 | 80.0/90.0/90.0 |
| asciimoo__colly | trivy | 19/0/14 | 73.1 | 18/1/0 | 97.3 | 18/1/0 | 97.3 | 73.1/97.3/97.3 |
| asciimoo__colly | cdxgen | 18/0/15 | 70.6 | 18/0/0 | 100.0 | 18/0/0 | 100.0 | 70.6/100.0/100.0 |
| asciimoo__colly | cyclonedx-gomod | 18/0/15 | 70.6 | 18/0/0 | 100.0 | 18/0/0 | 100.0 | 70.6/100.0/100.0 |
| asdine__storm | syft | 14/0/5 | 84.8 | 5/9/0 | 52.6 | 8/6/0 | 72.7 | 84.8/52.6/72.7 |
| asdine__storm | trivy | 19/0/0 | 100.0 | 5/14/0 | 41.7 | 8/11/0 | 59.3 | 100.0/41.7/59.3 |
| asdine__storm | cdxgen | 5/0/14 | 41.7 | 5/0/0 | 100.0 | 5/0/3 | 76.9 | 41.7/100.0/76.9 |
| asdine__storm | cyclonedx-gomod | 9/0/10 | 64.3 | 5/4/0 | 71.4 | 5/4/3 | 58.8 | 64.3/71.4/58.8 |
| astaxie__build-web-application-with-golang | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| danielgtaylor__huma | syft | 73/3/20 | 86.4 | 48/28/0 | 77.4 | 52/24/0 | 81.3 | 86.4/77.4/81.3 |
| danielgtaylor__huma | trivy | 66/3/27 | 81.5 | 48/21/0 | 82.1 | 52/17/0 | 86.0 | 81.5/82.1/86.0 |
| danielgtaylor__huma | cdxgen | 48/2/45 | 67.1 | 48/2/0 | 98.0 | 48/2/4 | 94.1 | 67.1/98.0/94.1 |
| danielgtaylor__huma | cyclonedx-gomod | 59/0/34 | 77.6 | 47/12/1 | 87.9 | 47/12/5 | 84.7 | 77.6/87.9/84.7 |
| davidbyttow__govips | syft | 10/0/8 | 71.4 | 3/7/0 | 46.2 | 7/3/0 | 82.4 | 71.4/46.2/82.4 |
| davidbyttow__govips | trivy | 9/0/9 | 66.7 | 3/6/0 | 50.0 | 7/2/0 | 87.5 | 66.7/50.0/87.5 |
| davidbyttow__govips | cdxgen | 3/0/15 | 28.6 | 3/0/0 | 100.0 | 3/0/4 | 60.0 | 28.6/100.0/60.0 |
| davidbyttow__govips | cyclonedx-gomod | 3/0/15 | 28.6 | 3/0/0 | 100.0 | 3/0/4 | 60.0 | 28.6/100.0/60.0 |
| ddymko__go-jsonerror | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| eduncan911__podcast | syft | 6/0/1 | 92.3 | 1/5/0 | 28.6 | 5/1/0 | 90.9 | 92.3/28.6/90.9 |
| eduncan911__podcast | trivy | 7/0/0 | 100.0 | 1/6/0 | 25.0 | 5/2/0 | 83.3 | 93.3/22.2/76.9 |
| eduncan911__podcast | cdxgen | 5/0/2 | 83.3 | 1/4/0 | 33.3 | 5/0/0 | 100.0 | 83.3/33.3/100.0 |
| eduncan911__podcast | cyclonedx-gomod | 1/0/6 | 25.0 | 1/0/0 | 100.0 | 1/0/4 | 33.3 | 25.0/100.0/33.3 |
| i-love-flamingo__dingo | syft | 6/0/18 | 40.0 | 1/5/0 | 28.6 | 5/1/0 | 90.9 | 40.0/28.6/90.9 |
| i-love-flamingo__dingo | trivy | 5/0/19 | 34.5 | 1/4/0 | 33.3 | 5/0/0 | 100.0 | 34.5/33.3/100.0 |
| i-love-flamingo__dingo | cdxgen | 1/0/23 | 8.0 | 1/0/0 | 100.0 | 1/0/4 | 33.3 | 8.0/100.0/33.3 |
| i-love-flamingo__dingo | cyclonedx-gomod | 1/0/23 | 8.0 | 1/0/0 | 100.0 | 1/0/4 | 33.3 | 8.0/100.0/33.3 |
| jonoton__scout | syft | 66/0/22 | 85.7 | 56/10/0 | 91.8 | 56/10/0 | 91.8 | 85.7/91.8/91.8 |
| jonoton__scout | trivy | 59/0/29 | 80.3 | 56/3/0 | 97.4 | 56/3/0 | 97.4 | 80.3/97.4/97.4 |
| jonoton__scout | cdxgen | 56/0/32 | 77.8 | 56/0/0 | 100.0 | 56/0/0 | 100.0 | 77.8/100.0/100.0 |
| jonoton__scout | cyclonedx-gomod | 57/0/31 | 78.6 | 56/1/0 | 99.1 | 56/1/0 | 99.1 | 78.6/99.1/99.1 |
| json-iterator__go | syft | 8/0/1 | 94.1 | 2/6/0 | 40.0 | 7/1/0 | 93.3 | 94.1/40.0/93.3 |
| json-iterator__go | trivy | 9/0/0 | 100.0 | 2/7/0 | 36.4 | 7/2/0 | 87.5 | 100.0/36.4/87.5 |
| json-iterator__go | cdxgen | 2/0/7 | 36.4 | 2/0/0 | 100.0 | 2/0/5 | 44.4 | 36.4/100.0/44.4 |
| json-iterator__go | cyclonedx-gomod | 2/0/7 | 36.4 | 2/0/0 | 100.0 | 2/0/5 | 44.4 | 36.4/100.0/44.4 |
| jxskiss__mcli | syft | 6/0/1 | 92.3 | 1/5/0 | 28.6 | 5/1/0 | 90.9 | 92.3/28.6/90.9 |
| jxskiss__mcli | trivy | 5/0/2 | 83.3 | 1/4/0 | 33.3 | 5/0/0 | 100.0 | 83.3/33.3/100.0 |
| jxskiss__mcli | cdxgen | 1/0/6 | 25.0 | 1/0/0 | 100.0 | 1/0/4 | 33.3 | 25.0/100.0/33.3 |
| jxskiss__mcli | cyclonedx-gomod | 1/0/6 | 25.0 | 1/0/0 | 100.0 | 1/0/4 | 33.3 | 25.0/100.0/33.3 |
| kisielk__errcheck | syft | 4/0/4 | 66.7 | 3/1/0 | 85.7 | 3/1/0 | 85.7 | 66.7/85.7/85.7 |
| kisielk__errcheck | trivy | 3/0/5 | 54.5 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 54.5/100.0/100.0 |
| kisielk__errcheck | cdxgen | 3/0/5 | 54.5 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 54.5/100.0/100.0 |
| kisielk__errcheck | cyclonedx-gomod | 3/0/5 | 54.5 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 54.5/100.0/100.0 |
| kpfaulkner__borders | syft | 1/0/1 | 66.7 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 66.7/100.0/100.0 |
| kpfaulkner__borders | trivy | 1/0/1 | 66.7 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 66.7/100.0/100.0 |
| kpfaulkner__borders | cdxgen | 1/0/1 | 66.7 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 66.7/100.0/100.0 |
| kpfaulkner__borders | cyclonedx-gomod | 1/0/1 | 66.7 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 66.7/100.0/100.0 |
| krotik__eliasdb | syft | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 100.0/100.0/100.0 |
| krotik__eliasdb | trivy | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 100.0/100.0/100.0 |
| krotik__eliasdb | cdxgen | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 100.0/100.0/100.0 |
| krotik__eliasdb | cyclonedx-gomod | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 100.0/100.0/100.0 |
| ktr0731__evans | syft | 213/0/347 | 55.1 | 55/158/0 | 41.0 | 65/148/0 | 46.8 | 55.1/41.0/46.8 |
| ktr0731__evans | trivy | 202/0/358 | 53.0 | 55/147/0 | 42.8 | 65/137/0 | 48.7 | 53.0/42.8/48.7 |
| ktr0731__evans | cdxgen | 55/0/505 | 17.9 | 55/0/0 | 100.0 | 55/0/10 | 91.7 | 17.9/100.0/91.7 |
| ktr0731__evans | cyclonedx-gomod | 190/0/370 | 50.7 | 55/135/0 | 44.9 | 56/134/9 | 43.9 | 50.7/44.9/43.9 |
| leekchan__accounting | syft | 4/0/0 | 100.0 | 3/1/0 | 85.7 | 3/1/0 | 85.7 | 100.0/85.7/85.7 |
| leekchan__accounting | trivy | 4/0/0 | 100.0 | 3/1/0 | 85.7 | 3/1/0 | 85.7 | 100.0/85.7/85.7 |
| leekchan__accounting | cdxgen | 3/0/1 | 85.7 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 85.7/100.0/100.0 |
| leekchan__accounting | cyclonedx-gomod | 3/0/1 | 85.7 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 85.7/100.0/100.0 |
| leodido__structcli | syft | 54/0/20 | 84.4 | 19/35/0 | 52.1 | 35/19/0 | 78.7 | 76.8/45.8/70.7 |
| leodido__structcli | trivy | 45/0/29 | 75.6 | 19/26/0 | 59.4 | 35/10/0 | 87.5 | 68.2/51.4/77.8 |
| leodido__structcli | cdxgen | 32/0/42 | 60.4 | 19/13/0 | 74.5 | 31/1/4 | 92.5 | 60.4/74.5/92.5 |
| leodido__structcli | cyclonedx-gomod | 41/0/33 | 71.3 | 19/22/0 | 63.3 | 31/10/4 | 81.6 | 71.3/63.3/81.6 |
| leonelquinteros__gotext | syft | 4/0/4 | 66.7 | 3/1/0 | 85.7 | 3/1/0 | 85.7 | 66.7/85.7/85.7 |
| leonelquinteros__gotext | trivy | 3/0/5 | 54.5 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 54.5/100.0/100.0 |
| leonelquinteros__gotext | cdxgen | 3/0/5 | 54.5 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 54.5/100.0/100.0 |
| leonelquinteros__gotext | cyclonedx-gomod | 3/0/5 | 54.5 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 54.5/100.0/100.0 |
| GuilhermeCaruso__kair | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| MonaxGT__parsefields | syft | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| MonaxGT__parsefields | trivy | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| MonaxGT__parsefields | cdxgen | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| MonaxGT__parsefields | cyclonedx-gomod | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| PhakornKiong__go-pattern-match | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| alibaba__opentelemetry-go-auto-instrumentation | syft | 117/660/13 | 25.8 | 52/725/0 | 12.5 | 54/723/0 | 13.0 | 17.3/8.3/8.6 |
| alibaba__opentelemetry-go-auto-instrumentation | trivy | 109/668/21 | 24.0 | 52/725/0 | 12.5 | 54/723/0 | 13.0 | 14.0/8.4/8.7 |
| alibaba__opentelemetry-go-auto-instrumentation | cdxgen | NA | | NA | | NA | | |
| alibaba__opentelemetry-go-auto-instrumentation | cyclonedx-gomod | 57/0/73 | 61.0 | 50/7/2 | 91.7 | 50/7/4 | 90.1 | 61.0/91.7/90.1 |
| alixaxel__genex | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| alouche__rodent | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| awsong__MMSEGO | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| axiomhq__hyperloglog | syft | 10/0/5 | 80.0 | 2/8/0 | 33.3 | 6/4/0 | 75.0 | 80.0/33.3/75.0 |
| axiomhq__hyperloglog | trivy | 9/0/6 | 75.0 | 2/7/0 | 36.4 | 6/3/0 | 80.0 | 75.0/36.4/80.0 |
| axiomhq__hyperloglog | cdxgen | 2/0/13 | 23.5 | 2/0/0 | 100.0 | 2/0/4 | 50.0 | 23.5/100.0/50.0 |
| axiomhq__hyperloglog | cyclonedx-gomod | 2/0/13 | 23.5 | 2/0/0 | 100.0 | 2/0/4 | 50.0 | 23.5/100.0/50.0 |
| axzilla__templui | syft | 30/0/9 | 87.0 | 7/23/0 | 37.8 | 7/23/0 | 37.8 | 87.0/37.8/37.8 |
| axzilla__templui | trivy | 28/0/11 | 83.6 | 7/21/0 | 40.0 | 7/21/0 | 40.0 | 83.6/40.0/40.0 |
| axzilla__templui | cdxgen | 28/0/11 | 83.6 | 7/21/0 | 40.0 | 7/21/0 | 40.0 | 83.6/40.0/40.0 |
| axzilla__templui | cyclonedx-gomod | 21/0/18 | 70.0 | 7/14/0 | 50.0 | 7/14/0 | 50.0 | 70.0/50.0/50.0 |
| elgohr__go-localstack | syft | 0/81/0 | 0.0 | 62/19/0 | 86.7 | 67/14/0 | 90.5 | 0.0/86.7/90.5 |
| elgohr__go-localstack | trivy | 0/81/0 | 0.0 | 62/19/0 | 86.7 | 67/14/0 | 90.5 | 0.0/86.7/90.5 |
| elgohr__go-localstack | cdxgen | 0/81/0 | 0.0 | 62/19/0 | 86.7 | 67/14/0 | 90.5 | 0.0/86.7/90.5 |
| elgohr__go-localstack | cyclonedx-gomod | 0/68/0 | 0.0 | 62/6/0 | 95.4 | 62/6/5 | 91.9 | 0.0/95.4/91.9 |
| emersion__go-vcard | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| gen2brain__go-unarr | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| ggicci__httpin | syft | 19/0/6 | 86.4 | 11/8/0 | 73.3 | 18/1/0 | 97.3 | 86.4/73.3/97.3 |
| ggicci__httpin | trivy | 18/0/7 | 83.7 | 11/7/0 | 75.9 | 18/0/0 | 100.0 | 83.7/75.9/100.0 |
| ggicci__httpin | cdxgen | 11/0/14 | 61.1 | 11/0/0 | 100.0 | 11/0/7 | 75.9 | 61.1/100.0/75.9 |
| ggicci__httpin | cyclonedx-gomod | 11/0/14 | 61.1 | 11/0/0 | 100.0 | 11/0/7 | 75.9 | 61.1/100.0/75.9 |
| glycerine__go-capnproto | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| lane-c-wagner__go-password-validator | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| lawzava__go-pg-migrate | syft | 16/0/16 | 66.7 | 5/11/0 | 47.6 | 12/4/0 | 85.7 | 66.7/47.6/85.7 |
| lawzava__go-pg-migrate | trivy | 14/0/18 | 60.9 | 5/9/0 | 52.6 | 12/2/0 | 92.3 | 60.9/52.6/92.3 |
| lawzava__go-pg-migrate | cdxgen | 5/0/27 | 27.0 | 5/0/0 | 100.0 | 5/0/7 | 58.8 | 27.0/100.0/58.8 |
| lawzava__go-pg-migrate | cyclonedx-gomod | 5/0/27 | 27.0 | 5/0/0 | 100.0 | 5/0/7 | 58.8 | 27.0/100.0/58.8 |
| leaanthony__slicer | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| lindb__lindb | syft | 246/0/236 | 67.6 | 161/85/0 | 79.1 | 162/84/0 | 79.4 | 67.6/79.1/79.4 |
| lindb__lindb | trivy | 178/0/304 | 53.9 | 161/17/0 | 95.0 | 162/16/0 | 95.3 | 53.9/95.0/95.3 |
| lindb__lindb | cdxgen | 161/0/321 | 50.1 | 161/0/0 | 100.0 | 161/0/1 | 99.7 | 50.1/100.0/99.7 |
| lindb__lindb | cyclonedx-gomod | 173/0/309 | 52.8 | 157/16/4 | 94.0 | 157/16/5 | 93.7 | 52.8/94.0/93.7 |
| linkedin__goavro | syft | 5/0/2 | 83.3 | 1/4/0 | 33.3 | 5/0/0 | 100.0 | 83.3/33.3/100.0 |
| linkedin__goavro | trivy | 7/0/0 | 100.0 | 1/6/0 | 25.0 | 5/2/0 | 83.3 | 100.0/25.0/83.3 |
| linkedin__goavro | cdxgen | 1/0/6 | 25.0 | 1/0/0 | 100.0 | 1/0/4 | 33.3 | 25.0/100.0/33.3 |
| linkedin__goavro | cyclonedx-gomod | 1/0/6 | 25.0 | 1/0/0 | 100.0 | 1/0/4 | 33.3 | 25.0/100.0/33.3 |
| linxGnu__goseaweedfs | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| liudng__dogo | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| lni__dragonboat | syft | 50/0/171 | 36.9 | 36/14/0 | 83.7 | 40/10/0 | 88.9 | 36.9/83.7/88.9 |
| lni__dragonboat | trivy | 42/0/179 | 31.9 | 36/6/0 | 92.3 | 40/2/0 | 97.6 | 31.9/92.3/97.6 |
| lni__dragonboat | cdxgen | 36/0/185 | 28.0 | 36/0/0 | 100.0 | 36/0/4 | 94.7 | 28.0/100.0/94.7 |
| lni__dragonboat | cyclonedx-gomod | 33/0/188 | 26.0 | 32/1/4 | 92.8 | 32/1/8 | 87.7 | 26.0/92.8/87.7 |
| lrita__numa | syft | 4/0/1 | 88.9 | 1/3/0 | 40.0 | 4/0/0 | 100.0 | 88.9/40.0/100.0 |
| lrita__numa | trivy | 5/0/0 | 100.0 | 1/4/0 | 33.3 | 4/1/0 | 88.9 | 100.0/33.3/88.9 |
| lrita__numa | cdxgen | 1/0/4 | 33.3 | 1/0/0 | 100.0 | 1/0/3 | 40.0 | 33.3/100.0/40.0 |
| lrita__numa | cyclonedx-gomod | 1/0/4 | 33.3 | 1/0/0 | 100.0 | 1/0/3 | 40.0 | 33.3/100.0/40.0 |
| lucas-clemente__quic-go | syft | 20/2/8 | 80.0 | 7/15/0 | 48.3 | 12/10/0 | 70.6 | 80.0/48.3/70.6 |
| lucas-clemente__quic-go | trivy | 19/2/9 | 77.6 | 7/14/0 | 50.0 | 12/9/0 | 72.7 | 77.6/50.0/72.7 |
| lucas-clemente__quic-go | cdxgen | 7/0/21 | 40.0 | 7/0/0 | 100.0 | 7/0/5 | 73.7 | 40.0/100.0/73.7 |
| lucas-clemente__quic-go | cyclonedx-gomod | 10/0/18 | 52.6 | 7/3/0 | 82.4 | 7/3/5 | 63.6 | 52.6/82.4/63.6 |
| lucasepe__tbd | syft | 36/0/13 | 84.7 | 21/15/0 | 73.7 | 26/10/0 | 83.9 | 84.7/73.7/83.9 |
| lucasepe__tbd | trivy | 49/0/0 | 100.0 | 21/28/0 | 60.0 | 26/23/0 | 69.3 | 100.0/60.0/69.3 |
| lucasepe__tbd | cdxgen | 21/0/28 | 60.0 | 21/0/0 | 100.0 | 21/0/5 | 89.4 | 60.0/100.0/89.4 |
| lucasepe__tbd | cyclonedx-gomod | 23/0/26 | 63.9 | 21/2/0 | 95.5 | 21/2/5 | 85.7 | 63.9/95.5/85.7 |
| Konstantin8105__f4go | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| Qntfy__kazaam | syft | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 100.0/100.0/100.0 |
| Qntfy__kazaam | trivy | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 100.0/100.0/100.0 |
| Qntfy__kazaam | cdxgen | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 100.0/100.0/100.0 |
| Qntfy__kazaam | cyclonedx-gomod | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 100.0/100.0/100.0 |
| SonicRoshan__scope | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| StudioSol__set | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| antchfx__antch | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| antham__chyle | syft | 60/0/13 | 90.2 | 36/24/1 | 74.2 | 42/18/1 | 81.6 | 89.6/73.5/80.8 |
| antham__chyle | trivy | 45/0/28 | 76.3 | 36/9/1 | 87.8 | 42/3/1 | 95.5 | 74.6/85.4/93.2 |
| antham__chyle | cdxgen | 37/0/36 | 67.3 | 37/0/0 | 100.0 | 37/0/6 | 92.5 | 67.3/100.0/92.5 |
| antham__chyle | cyclonedx-gomod | 38/0/35 | 68.5 | 36/2/1 | 96.0 | 36/2/7 | 88.9 | 67.9/94.7/87.8 |
| antham__strumt | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| artyom__autoflags | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| beatlabs__patron | syft | 0/80/0 | 0.0 | 76/4/0 | 97.4 | 77/3/0 | 98.1 | 0.0/97.4/98.1 |
| beatlabs__patron | trivy | 0/80/0 | 0.0 | 76/4/0 | 97.4 | 77/3/0 | 98.1 | 0.0/97.4/98.1 |
| beatlabs__patron | cdxgen | 0/80/0 | 0.0 | 76/4/0 | 97.4 | 77/3/0 | 98.1 | 0.0/97.4/98.1 |
| beatlabs__patron | cyclonedx-gomod | 0/77/0 | 0.0 | 76/1/0 | 99.3 | 76/1/1 | 98.7 | 0.0/99.3/98.7 |
| becheran__roumon | syft | 10/0/2 | 90.9 | 5/5/0 | 66.7 | 9/1/0 | 94.7 | 90.9/66.7/94.7 |
| becheran__roumon | trivy | 9/0/3 | 85.7 | 5/4/0 | 71.4 | 9/0/0 | 100.0 | 85.7/71.4/100.0 |
| becheran__roumon | cdxgen | 5/0/7 | 58.8 | 5/0/0 | 100.0 | 5/0/4 | 71.4 | 58.8/100.0/71.4 |
| becheran__roumon | cyclonedx-gomod | 5/0/7 | 58.8 | 5/0/0 | 100.0 | 5/0/4 | 71.4 | 58.8/100.0/71.4 |
| beefsack__go-rate | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| blind-oracle__cortex-tenant | syft | 291/0/287 | 67.0 | 191/100/0 | 79.3 | 191/100/0 | 79.3 | 67.0/79.3/79.3 |
| blind-oracle__cortex-tenant | trivy | 200/0/378 | 51.4 | 191/9/0 | 97.7 | 191/9/0 | 97.7 | 51.4/97.7/97.7 |
| blind-oracle__cortex-tenant | cdxgen | 191/0/387 | 49.7 | 191/0/0 | 100.0 | 191/0/0 | 100.0 | 49.7/100.0/100.0 |
| blind-oracle__cortex-tenant | cyclonedx-gomod | 195/0/383 | 50.5 | 187/8/4 | 96.9 | 187/8/4 | 96.9 | 50.5/96.9/96.9 |
| golang__oauth2 | syft | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| golang__oauth2 | trivy | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| golang__oauth2 | cdxgen | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| golang__oauth2 | cyclonedx-gomod | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| gone-io__gone | syft | 1/1/8 | 18.2 | 1/1/0 | 66.7 | 1/1/0 | 66.7 | 18.2/66.7/66.7 |
| gone-io__gone | trivy | 1/1/8 | 18.2 | 1/1/0 | 66.7 | 1/1/0 | 66.7 | 18.2/66.7/66.7 |
| gone-io__gone | cdxgen | 1/1/8 | 18.2 | 1/1/0 | 66.7 | 1/1/0 | 66.7 | 18.2/66.7/66.7 |
| gone-io__gone | cyclonedx-gomod | 1/0/8 | 20.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 20.0/100.0/100.0 |
| google__go-github | syft | 2/205/0 | 1.9 | 1/206/0 | 1.0 | 2/205/0 | 1.9 | 1.8/0.9/1.8 |
| google__go-github | trivy | 2/101/0 | 3.8 | 1/102/0 | 1.9 | 2/101/0 | 3.8 | 3.6/1.8/3.6 |
| google__go-github | cdxgen | 1/91/1 | 2.1 | 1/91/0 | 2.2 | 1/91/1 | 2.1 | 2.0/2.1/2.0 |
| google__go-github | cyclonedx-gomod | 1/0/1 | 66.7 | 1/0/0 | 100.0 | 1/0/1 | 66.7 | 66.7/100.0/66.7 |
| libgit2__git2go | syft | 4/0/2 | 80.0 | 1/3/0 | 40.0 | 2/2/0 | 66.7 | 80.0/40.0/66.7 |
| libgit2__git2go | trivy | 6/0/0 | 100.0 | 1/5/0 | 28.6 | 2/4/0 | 50.0 | 100.0/28.6/50.0 |
| libgit2__git2go | cdxgen | 1/0/5 | 28.6 | 1/0/0 | 100.0 | 1/0/1 | 66.7 | 28.6/100.0/66.7 |
| libgit2__git2go | cyclonedx-gomod | 2/0/4 | 50.0 | 1/1/0 | 66.7 | 1/1/1 | 50.0 | 50.0/66.7/50.0 |
| lightningnetwork__lnd | syft | 244/186/285 | 50.9 | 127/303/0 | 45.6 | 127/303/0 | 45.6 | 43.8/36.9/36.9 |
| lightningnetwork__lnd | trivy | 215/172/314 | 46.9 | 127/260/0 | 49.4 | 127/260/0 | 49.4 | 41.1/41.0/41.0 |
| lightningnetwork__lnd | cdxgen | NA | | NA | | NA | | |
| lightningnetwork__lnd | cyclonedx-gomod | 191/1/338 | 53.0 | 126/66/1 | 79.0 | 126/66/1 | 79.0 | 50.5/73.4/73.4 |
| limiu82214__gojmapr | syft | 9/0/2 | 90.0 | 1/8/0 | 20.0 | 8/1/0 | 94.1 | 90.0/20.0/94.1 |
| limiu82214__gojmapr | trivy | 8/0/3 | 84.2 | 1/7/0 | 22.2 | 8/0/0 | 100.0 | 84.2/22.2/100.0 |
| limiu82214__gojmapr | cdxgen | 1/0/10 | 16.7 | 1/0/0 | 100.0 | 1/0/7 | 22.2 | 16.7/100.0/22.2 |
| limiu82214__gojmapr | cyclonedx-gomod | 1/0/10 | 16.7 | 1/0/0 | 100.0 | 1/0/7 | 22.2 | 16.7/100.0/22.2 |
| lucassscaravelli__ej | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| madflojo__testcerts | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| mafulong__godal | syft | 17/0/163 | 17.3 | 10/7/0 | 74.1 | 14/3/0 | 90.3 | 17.3/74.1/90.3 |
| mafulong__godal | trivy | 180/0/0 | 100.0 | 10/170/0 | 10.5 | 14/166/0 | 14.4 | 100.0/10.5/14.4 |
| mafulong__godal | cdxgen | 10/0/170 | 10.5 | 10/0/0 | 100.0 | 10/0/4 | 83.3 | 10.5/100.0/83.3 |
| mafulong__godal | cyclonedx-gomod | 10/0/170 | 10.5 | 10/0/0 | 100.0 | 10/0/4 | 83.3 | 10.5/100.0/83.3 |
| magic003__alice | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| mgutz__logxi | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| miguelmota__golang-for-nodejs-developers | syft | 12/0/52 | 31.6 | 9/3/0 | 85.7 | 9/3/0 | 85.7 | 31.2/81.8/81.8 |
| miguelmota__golang-for-nodejs-developers | trivy | 64/0/0 | 100.0 | 9/55/0 | 24.7 | 9/55/0 | 24.7 | 99.2/24.3/24.3 |
| miguelmota__golang-for-nodejs-developers | cdxgen | 5/0/59 | 14.5 | 4/1/5 | 57.1 | 4/1/5 | 57.1 | 14.5/57.1/57.1 |
| miguelmota__golang-for-nodejs-developers | cyclonedx-gomod | NA | | NA | | NA | | |
| mingard__sitemap-format | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| Allenxuxu__gev | syft | 31/0/32 | 66.0 | 19/12/0 | 76.0 | 23/8/0 | 85.2 | 66.0/76.0/85.2 |
| Allenxuxu__gev | trivy | 63/0/0 | 100.0 | 19/44/0 | 46.3 | 23/40/0 | 53.5 | 100.0/46.3/53.5 |
| Allenxuxu__gev | cdxgen | 19/0/44 | 46.3 | 19/0/0 | 100.0 | 19/0/4 | 90.5 | 46.3/100.0/90.5 |
| Allenxuxu__gev | cyclonedx-gomod | 19/0/44 | 46.3 | 19/0/0 | 100.0 | 19/0/4 | 90.5 | 46.3/100.0/90.5 |
| Clivern__Beaver | syft | 60/0/112 | 51.7 | 41/19/0 | 81.2 | 41/19/0 | 81.2 | 51.7/81.2/81.2 |
| Clivern__Beaver | trivy | 55/0/117 | 48.5 | 41/14/0 | 85.4 | 41/14/0 | 85.4 | 48.5/85.4/85.4 |
| Clivern__Beaver | cdxgen | 41/0/131 | 38.5 | 41/0/0 | 100.0 | 41/0/0 | 100.0 | 38.5/100.0/100.0 |
| Clivern__Beaver | cyclonedx-gomod | 51/0/121 | 45.7 | 41/10/0 | 89.1 | 41/10/0 | 89.1 | 45.7/89.1/89.1 |
| HouzuoGuo__tiedot | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| Omibranch__gitty | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| VictoriaMetrics__VictoriaMetrics | syft | 0/172/0 | 0.0 | 170/2/0 | 99.4 | 170/2/0 | 99.4 | 0.0/99.4/99.4 |
| VictoriaMetrics__VictoriaMetrics | trivy | 0/172/0 | 0.0 | 170/2/0 | 99.4 | 170/2/0 | 99.4 | 0.0/99.4/99.4 |
| VictoriaMetrics__VictoriaMetrics | cdxgen | 0/171/0 | 0.0 | 170/1/0 | 99.7 | 170/1/0 | 99.7 | 0.0/99.7/99.7 |
| VictoriaMetrics__VictoriaMetrics | cyclonedx-gomod | 0/171/0 | 0.0 | 170/1/0 | 99.7 | 170/1/0 | 99.7 | 0.0/99.7/99.7 |
| asafschers__goscore | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| bart6114__cheek | syft | 45/0/69 | 56.6 | 29/16/0 | 78.4 | 33/12/0 | 84.6 | 56.6/78.4/84.6 |
| bart6114__cheek | trivy | 37/0/77 | 49.0 | 29/8/0 | 87.9 | 33/4/0 | 94.3 | 49.0/87.9/94.3 |
| bart6114__cheek | cdxgen | 29/0/85 | 40.6 | 29/0/0 | 100.0 | 29/0/4 | 93.5 | 40.6/100.0/93.5 |
| bart6114__cheek | cyclonedx-gomod | 31/0/83 | 42.8 | 29/2/0 | 96.7 | 29/2/4 | 90.6 | 42.8/96.7/90.6 |
| bdjimmy__gbind | syft | 22/0/13 | 77.2 | 6/16/0 | 42.9 | 17/5/0 | 87.2 | 77.2/42.9/87.2 |
| bdjimmy__gbind | trivy | 35/0/0 | 100.0 | 6/29/0 | 29.3 | 17/18/0 | 65.4 | 100.0/29.3/65.4 |
| bdjimmy__gbind | cdxgen | 6/0/29 | 29.3 | 6/0/0 | 100.0 | 6/0/11 | 52.2 | 29.3/100.0/52.2 |
| bdjimmy__gbind | cyclonedx-gomod | 7/0/28 | 33.3 | 6/1/0 | 92.3 | 7/0/10 | 58.3 | 33.3/92.3/58.3 |
| blind-oracle__psql-streamer | syft | 38/0/82 | 48.1 | 33/5/0 | 93.0 | 36/2/0 | 97.3 | 48.1/93.0/97.3 |
| blind-oracle__psql-streamer | trivy | 120/0/0 | 100.0 | 33/87/0 | 43.1 | 36/84/0 | 46.2 | 100.0/43.1/46.2 |
| blind-oracle__psql-streamer | cdxgen | 33/0/87 | 43.1 | 33/0/0 | 100.0 | 33/0/3 | 95.7 | 43.1/100.0/95.7 |
| blind-oracle__psql-streamer | cyclonedx-gomod | 33/0/87 | 43.1 | 33/0/0 | 100.0 | 33/0/3 | 95.7 | 43.1/100.0/95.7 |
| blinklabs-io__nview | syft | 38/0/26 | 74.5 | 22/16/0 | 73.3 | 22/16/0 | 73.3 | 74.5/73.3/73.3 |
| blinklabs-io__nview | trivy | 31/0/33 | 65.3 | 22/9/0 | 83.0 | 22/9/0 | 83.0 | 65.3/83.0/83.0 |
| blinklabs-io__nview | cdxgen | 22/0/42 | 51.2 | 22/0/0 | 100.0 | 22/0/0 | 100.0 | 51.2/100.0/100.0 |
| blinklabs-io__nview | cyclonedx-gomod | 27/0/37 | 59.3 | 22/5/0 | 89.8 | 22/5/0 | 89.8 | 59.3/89.8/89.8 |
| bogdanfinn__tls-client | syft | 25/1/7 | 86.2 | 15/11/0 | 73.2 | 19/7/0 | 84.4 | 86.2/73.2/84.4 |
| bogdanfinn__tls-client | trivy | 20/1/12 | 75.5 | 15/6/0 | 83.3 | 19/2/0 | 95.0 | 75.5/83.3/95.0 |
| bogdanfinn__tls-client | cdxgen | 15/0/17 | 63.8 | 15/0/0 | 100.0 | 15/0/4 | 88.2 | 63.8/100.0/88.2 |
| bogdanfinn__tls-client | cyclonedx-gomod | 15/0/17 | 63.8 | 15/0/0 | 100.0 | 15/0/4 | 88.2 | 63.8/100.0/88.2 |
| bojanz__address | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| bokwoon95__go-structured-query | syft | 12/0/96 | 20.0 | 9/3/0 | 85.7 | 12/0/0 | 100.0 | 20.0/85.7/100.0 |
| bokwoon95__go-structured-query | trivy | 108/0/0 | 100.0 | 9/99/0 | 15.4 | 12/96/0 | 20.0 | 100.0/15.4/20.0 |
| bokwoon95__go-structured-query | cdxgen | 9/0/99 | 15.4 | 9/0/0 | 100.0 | 9/0/3 | 85.7 | 15.4/100.0/85.7 |
| bokwoon95__go-structured-query | cyclonedx-gomod | 10/0/98 | 16.9 | 9/1/0 | 94.7 | 9/1/3 | 81.8 | 16.9/94.7/81.8 |
| hibiken__asynq | syft | 23/41/0 | 52.9 | 10/54/0 | 27.0 | 11/53/0 | 29.3 | 41.2/22.5/24.4 |
| hibiken__asynq | trivy | 12/36/11 | 33.8 | 10/38/0 | 34.5 | 11/37/0 | 37.3 | 26.5/28.6/31.0 |
| hibiken__asynq | cdxgen | 11/34/12 | 32.4 | 10/35/0 | 36.4 | 10/35/1 | 35.7 | 25.6/30.8/30.3 |
| hibiken__asynq | cyclonedx-gomod | 10/0/13 | 60.6 | 10/0/0 | 100.0 | 10/0/1 | 95.2 | 60.6/100.0/95.2 |
| hrygo__hotplex | syft | 187/1/115 | 76.3 | 124/64/0 | 79.5 | 129/59/0 | 81.4 | 76.2/79.2/81.1 |
| hrygo__hotplex | trivy | NA | | NA | | NA | | |
| hrygo__hotplex | cdxgen | 133/2/169 | 60.9 | 124/11/0 | 95.8 | 129/6/0 | 97.7 | 60.9/95.8/97.7 |
| hrygo__hotplex | cyclonedx-gomod | 128/0/174 | 59.5 | 124/4/0 | 98.4 | 124/4/5 | 96.5 | 59.5/98.4/96.5 |
| hyfather__pipeline | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| lonng__nano | syft | 22/0/46 | 48.9 | 14/8/0 | 77.8 | 20/2/0 | 95.2 | 48.9/77.8/95.2 |
| lonng__nano | trivy | 68/0/0 | 100.0 | 14/54/0 | 34.1 | 20/48/0 | 45.5 | 100.0/34.1/45.5 |
| lonng__nano | cdxgen | 14/0/54 | 34.1 | 14/0/0 | 100.0 | 14/0/6 | 82.4 | 34.1/100.0/82.4 |
| lonng__nano | cyclonedx-gomod | 14/0/54 | 34.1 | 14/0/0 | 100.0 | 14/0/6 | 82.4 | 34.1/100.0/82.4 |
| loov__lensm | syft | 20/0/19 | 67.8 | 13/7/0 | 78.8 | 13/7/0 | 78.8 | 67.8/78.8/78.8 |
| loov__lensm | trivy | 14/0/25 | 52.8 | 13/1/0 | 96.3 | 13/1/0 | 96.3 | 52.8/96.3/96.3 |
| loov__lensm | cdxgen | 13/0/26 | 50.0 | 13/0/0 | 100.0 | 13/0/0 | 100.0 | 50.0/100.0/100.0 |
| loov__lensm | cyclonedx-gomod | 14/0/25 | 52.8 | 13/1/0 | 96.3 | 13/1/0 | 96.3 | 52.8/96.3/96.3 |
| loveleshsharma__gohive | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| markphelps__flipt | syft | 398/15/332 | 69.6 | 302/111/0 | 84.5 | 309/104/0 | 85.6 | 66.5/79.4/80.5 |
| markphelps__flipt | trivy | 339/13/391 | 62.7 | 302/50/0 | 92.4 | 309/43/0 | 93.5 | 60.2/88.3/89.4 |
| markphelps__flipt | cdxgen | NA | | NA | | NA | | |
| markphelps__flipt | cyclonedx-gomod | 321/0/409 | 61.1 | 300/21/2 | 96.3 | 300/21/9 | 95.2 | 59.9/94.4/93.3 |
| marrow16__valix | syft | 8/0/8 | 66.7 | 4/4/0 | 66.7 | 8/0/0 | 100.0 | 66.7/66.7/100.0 |
| marrow16__valix | trivy | 8/0/8 | 66.7 | 4/4/0 | 66.7 | 8/0/0 | 100.0 | 66.7/66.7/100.0 |
| marrow16__valix | cdxgen | 8/0/8 | 66.7 | 4/4/0 | 66.7 | 8/0/0 | 100.0 | 66.7/66.7/100.0 |
| marrow16__valix | cyclonedx-gomod | NA | | NA | | NA | | |
| marusama__cyclicbarrier | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| neilotoole__errgroup | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| nicola-strappazzon__password-manager | syft | 28/0/13 | 81.2 | 12/16/0 | 60.0 | 16/12/0 | 72.7 | 81.2/60.0/72.7 |
| nicola-strappazzon__password-manager | trivy | 27/0/14 | 79.4 | 12/15/0 | 61.5 | 16/11/0 | 74.4 | 79.4/61.5/74.4 |
| nicola-strappazzon__password-manager | cdxgen | 12/0/29 | 45.3 | 12/0/0 | 100.0 | 12/0/4 | 85.7 | 45.3/100.0/85.7 |
| nicola-strappazzon__password-manager | cyclonedx-gomod | 20/0/21 | 65.6 | 12/8/0 | 75.0 | 12/8/4 | 66.7 | 65.6/75.0/66.7 |
| nikolaydubina__htmlyaml | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| SebastiaanKlippert__go-wkhtmltopdf | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| ThomasObenaus__go-conf | syft | 29/0/132 | 30.5 | 19/10/0 | 79.2 | 22/7/0 | 86.3 | 30.5/79.2/86.3 |
| ThomasObenaus__go-conf | trivy | 22/0/139 | 24.0 | 19/3/0 | 92.7 | 22/0/0 | 100.0 | 24.0/92.7/100.0 |
| ThomasObenaus__go-conf | cdxgen | 19/0/142 | 21.1 | 19/0/0 | 100.0 | 19/0/3 | 92.7 | 21.1/100.0/92.7 |
| ThomasObenaus__go-conf | cyclonedx-gomod | 19/0/142 | 21.1 | 19/0/0 | 100.0 | 19/0/3 | 92.7 | 21.1/100.0/92.7 |
| aarzilli__golua | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| abhimanyu003__sttr | syft | 54/0/10 | 91.5 | 42/12/0 | 87.5 | 42/12/0 | 87.5 | 91.5/87.5/87.5 |
| abhimanyu003__sttr | trivy | 46/0/18 | 83.6 | 42/4/0 | 95.5 | 42/4/0 | 95.5 | 83.6/95.5/95.5 |
| abhimanyu003__sttr | cdxgen | 42/0/22 | 79.2 | 42/0/0 | 100.0 | 42/0/0 | 100.0 | 79.2/100.0/100.0 |
| abhimanyu003__sttr | cyclonedx-gomod | 45/0/19 | 82.6 | 42/3/0 | 96.6 | 42/3/0 | 96.6 | 82.6/96.6/96.6 |
| bobg__hashsplit | syft | 3/0/3 | 66.7 | 1/2/0 | 50.0 | 1/2/0 | 50.0 | 66.7/50.0/50.0 |
| bobg__hashsplit | trivy | 3/0/3 | 66.7 | 1/2/0 | 50.0 | 1/2/0 | 50.0 | 66.7/50.0/50.0 |
| bobg__hashsplit | cdxgen | 1/0/5 | 28.6 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 28.6/100.0/100.0 |
| bobg__hashsplit | cyclonedx-gomod | 1/0/5 | 28.6 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 28.6/100.0/100.0 |
| bobg__modver | syft | 47/3/13 | 85.5 | 27/23/0 | 70.1 | 27/23/0 | 70.1 | 85.5/70.1/70.1 |
| bobg__modver | trivy | 28/3/32 | 61.5 | 27/4/0 | 93.1 | 27/4/0 | 93.1 | 61.5/93.1/93.1 |
| bobg__modver | cdxgen | 27/2/33 | 60.7 | 27/2/0 | 96.4 | 27/2/0 | 96.4 | 60.7/96.4/96.4 |
| bobg__modver | cyclonedx-gomod | 28/0/32 | 63.6 | 27/1/0 | 98.2 | 27/1/0 | 98.2 | 63.6/98.2/98.2 |
| buaazp__fasthttprouter | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| buraksezer__consistent | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| johnfercher__maroto | syft | 22/0/9 | 83.0 | 21/1/0 | 97.7 | 21/1/0 | 97.7 | 83.0/97.7/97.7 |
| johnfercher__maroto | trivy | 21/0/10 | 80.8 | 21/0/0 | 100.0 | 21/0/0 | 100.0 | 80.8/100.0/100.0 |
| johnfercher__maroto | cdxgen | 21/0/10 | 80.8 | 21/0/0 | 100.0 | 21/0/0 | 100.0 | 80.8/100.0/100.0 |
| johnfercher__maroto | cyclonedx-gomod | 21/0/10 | 80.8 | 21/0/0 | 100.0 | 21/0/0 | 100.0 | 80.8/100.0/100.0 |
| josa42__coc-go | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| junioryono__godi | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| lyonnee__hmap | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| m-zajac__json2go | syft | 8/0/1 | 94.1 | 3/5/0 | 54.5 | 7/1/0 | 93.3 | 94.1/54.5/93.3 |
| m-zajac__json2go | trivy | 7/0/2 | 87.5 | 3/4/0 | 60.0 | 7/0/0 | 100.0 | 87.5/60.0/100.0 |
| m-zajac__json2go | cdxgen | 3/0/6 | 50.0 | 3/0/0 | 100.0 | 3/0/4 | 60.0 | 50.0/100.0/60.0 |
| m-zajac__json2go | cyclonedx-gomod | 3/0/6 | 50.0 | 3/0/0 | 100.0 | 3/0/4 | 60.0 | 50.0/100.0/60.0 |
| maargenton__go-testpredicate | syft | 4/0/4 | 66.7 | 3/1/0 | 85.7 | 3/1/0 | 85.7 | 66.7/85.7/85.7 |
| maargenton__go-testpredicate | trivy | 3/0/5 | 54.5 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 54.5/100.0/100.0 |
| maargenton__go-testpredicate | cdxgen | 3/0/5 | 54.5 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 54.5/100.0/100.0 |
| maargenton__go-testpredicate | cyclonedx-gomod | 3/0/5 | 54.5 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 54.5/100.0/100.0 |
| malaschitz__randomForest | syft | 5/0/239 | 4.0 | 2/3/0 | 57.1 | 2/3/0 | 57.1 | 4.0/57.1/57.1 |
| malaschitz__randomForest | trivy | 244/0/0 | 100.0 | 2/242/0 | 1.6 | 2/242/0 | 1.6 | 100.0/1.6/1.6 |
| malaschitz__randomForest | cdxgen | 2/0/242 | 1.6 | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 1.6/100.0/100.0 |
| malaschitz__randomForest | cyclonedx-gomod | 2/0/242 | 1.6 | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 1.6/100.0/100.0 |
| mantil-io__mantil | syft | 109/0/128 | 63.0 | 85/24/0 | 87.6 | 90/19/0 | 90.5 | 63.0/87.6/90.5 |
| mantil-io__mantil | trivy | 237/0/0 | 100.0 | 85/152/0 | 52.8 | 90/147/0 | 55.0 | 100.0/52.8/55.0 |
| mantil-io__mantil | cdxgen | 48/0/189 | 33.7 | 45/3/40 | 67.7 | 47/1/43 | 68.1 | 33.7/67.7/68.1 |
| mantil-io__mantil | cyclonedx-gomod | 91/0/146 | 55.5 | 85/6/0 | 96.6 | 85/6/5 | 93.9 | 55.5/96.6/93.9 |
| mattn__go-runewidth | syft | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| mattn__go-runewidth | trivy | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| mattn__go-runewidth | cdxgen | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| mattn__go-runewidth | cyclonedx-gomod | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| mattn__goveralls | syft | 4/0/6 | 57.1 | 2/2/0 | 66.7 | 2/2/0 | 66.7 | 57.1/66.7/66.7 |
| mattn__goveralls | trivy | 10/0/0 | 100.0 | 2/8/0 | 33.3 | 2/8/0 | 33.3 | 100.0/33.3/33.3 |
| mattn__goveralls | cdxgen | 2/0/8 | 33.3 | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 33.3/100.0/100.0 |
| mattn__goveralls | cyclonedx-gomod | 2/0/8 | 33.3 | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 33.3/100.0/100.0 |
| mavihq__persian | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| panjf2000__gnet | syft | 12/0/4 | 85.7 | 7/5/0 | 73.7 | 11/1/0 | 95.7 | 85.7/73.7/95.7 |
| panjf2000__gnet | trivy | 11/0/5 | 81.5 | 7/4/0 | 77.8 | 11/0/0 | 100.0 | 81.5/77.8/100.0 |
| panjf2000__gnet | cdxgen | 7/0/9 | 60.9 | 7/0/0 | 100.0 | 7/0/4 | 77.8 | 60.9/100.0/77.8 |
| panjf2000__gnet | cyclonedx-gomod | 7/0/9 | 60.9 | 7/0/0 | 100.0 | 7/0/4 | 77.8 | 60.9/100.0/77.8 |
| patrickhener__goshs | syft | 128/0/202 | 55.9 | 96/32/0 | 85.7 | 96/32/0 | 85.7 | 55.9/85.7/85.7 |
| patrickhener__goshs | trivy | 108/0/222 | 49.3 | 96/12/0 | 94.1 | 96/12/0 | 94.1 | 49.3/94.1/94.1 |
| patrickhener__goshs | cdxgen | 96/0/234 | 45.1 | 96/0/0 | 100.0 | 96/0/0 | 100.0 | 45.1/100.0/100.0 |
| patrickhener__goshs | cyclonedx-gomod | 108/0/222 | 49.3 | 96/12/0 | 94.1 | 96/12/0 | 94.1 | 49.3/94.1/94.1 |
| peco__peco | syft | 18/0/10 | 78.3 | 13/5/0 | 83.9 | 17/1/0 | 97.1 | 78.3/83.9/97.1 |
| peco__peco | trivy | 17/0/11 | 75.6 | 13/4/0 | 86.7 | 17/0/0 | 100.0 | 75.6/86.7/100.0 |
| peco__peco | cdxgen | 13/0/15 | 63.4 | 13/0/0 | 100.0 | 13/0/4 | 86.7 | 63.4/100.0/86.7 |
| peco__peco | cyclonedx-gomod | 14/0/14 | 66.7 | 13/1/0 | 96.3 | 14/0/3 | 90.3 | 66.7/96.3/90.3 |
| rafaelespinoza__godfish | syft | 57/0/11 | 91.2 | 24/33/0 | 59.3 | 24/33/0 | 59.3 | 91.2/59.3/59.3 |
| rafaelespinoza__godfish | trivy | 26/0/42 | 55.3 | 24/2/0 | 96.0 | 24/2/0 | 96.0 | 55.3/96.0/96.0 |
| rafaelespinoza__godfish | cdxgen | 24/0/44 | 52.2 | 24/0/0 | 100.0 | 24/0/0 | 100.0 | 52.2/100.0/100.0 |
| rafaelespinoza__godfish | cyclonedx-gomod | 26/0/42 | 55.3 | 24/2/0 | 96.0 | 24/2/0 | 96.0 | 55.3/96.0/96.0 |
| raviqqe__muffet | syft | 27/0/8 | 87.1 | 17/10/0 | 77.3 | 22/5/0 | 89.8 | 87.1/77.3/89.8 |
| raviqqe__muffet | trivy | 25/0/10 | 83.3 | 17/8/0 | 81.0 | 22/3/0 | 93.6 | 83.3/81.0/93.6 |
| raviqqe__muffet | cdxgen | 17/0/18 | 65.4 | 17/0/0 | 100.0 | 17/0/5 | 87.2 | 65.4/100.0/87.2 |
| raviqqe__muffet | cyclonedx-gomod | 17/0/18 | 65.4 | 17/0/0 | 100.0 | 17/0/5 | 87.2 | 65.4/100.0/87.2 |
| reeflective__console | syft | 20/0/13 | 75.5 | 11/9/0 | 71.0 | 11/9/0 | 71.0 | 75.5/71.0/71.0 |
| reeflective__console | trivy | 13/0/20 | 56.5 | 11/2/0 | 91.7 | 11/2/0 | 91.7 | 56.5/91.7/91.7 |
| reeflective__console | cdxgen | 11/0/22 | 50.0 | 11/0/0 | 100.0 | 11/0/0 | 100.0 | 50.0/100.0/100.0 |
| reeflective__console | cyclonedx-gomod | 12/0/21 | 53.3 | 11/1/0 | 95.7 | 11/1/0 | 95.7 | 53.3/95.7/95.7 |
| Xamber__Varis | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| adrg__xdg | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| adrianosela__sslmgr | syft | 59/0/139 | 45.9 | 46/13/0 | 87.6 | 49/10/0 | 90.7 | 45.9/87.6/90.7 |
| adrianosela__sslmgr | trivy | 50/0/148 | 40.3 | 46/4/0 | 95.8 | 49/1/0 | 99.0 | 40.3/95.8/99.0 |
| adrianosela__sslmgr | cdxgen | 46/0/152 | 37.7 | 46/0/0 | 100.0 | 46/0/3 | 96.8 | 37.7/100.0/96.8 |
| adrianosela__sslmgr | cyclonedx-gomod | 46/0/152 | 37.7 | 46/0/0 | 100.0 | 46/0/3 | 96.8 | 37.7/100.0/96.8 |
| ahmedakef__gotutor | syft | 28/18/15 | 62.9 | 14/32/0 | 46.7 | 14/32/0 | 46.7 | 55.1/40.6/40.6 |
| ahmedakef__gotutor | trivy | 22/10/21 | 58.7 | 14/18/0 | 60.9 | 14/18/0 | 60.9 | 46.9/53.8/53.8 |
| ahmedakef__gotutor | cdxgen | 17/8/26 | 50.0 | 14/11/0 | 71.8 | 14/11/0 | 71.8 | 43.8/63.6/63.6 |
| ahmedakef__gotutor | cyclonedx-gomod | 15/0/28 | 51.7 | 14/1/0 | 96.6 | 14/1/0 | 96.6 | 51.7/96.6/96.6 |
| ahmetalpbalkan__go-linq | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| c-bata__go-prompt | syft | 5/0/2 | 83.3 | 3/2/0 | 75.0 | 3/2/0 | 75.0 | 83.3/75.0/75.0 |
| c-bata__go-prompt | trivy | 7/0/0 | 100.0 | 3/4/0 | 60.0 | 3/4/0 | 60.0 | 100.0/60.0/60.0 |
| c-bata__go-prompt | cdxgen | 3/0/4 | 60.0 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 60.0/100.0/100.0 |
| c-bata__go-prompt | cyclonedx-gomod | 6/0/1 | 92.3 | 3/3/0 | 66.7 | 3/3/0 | 66.7 | 92.3/66.7/66.7 |
| caarlos0__log | syft | 17/0/4 | 89.5 | 16/1/0 | 97.0 | 16/1/0 | 97.0 | 89.5/97.0/97.0 |
| caarlos0__log | trivy | 16/0/5 | 86.5 | 16/0/0 | 100.0 | 16/0/0 | 100.0 | 86.5/100.0/100.0 |
| caarlos0__log | cdxgen | 16/0/5 | 86.5 | 16/0/0 | 100.0 | 16/0/0 | 100.0 | 86.5/100.0/100.0 |
| caarlos0__log | cyclonedx-gomod | 16/0/5 | 86.5 | 16/0/0 | 100.0 | 16/0/0 | 100.0 | 86.5/100.0/100.0 |
| caddyserver__certmagic | syft | 27/0/5 | 91.5 | 13/14/0 | 65.0 | 13/14/0 | 65.0 | 91.5/65.0/65.0 |
| caddyserver__certmagic | trivy | 16/0/16 | 66.7 | 13/3/0 | 89.7 | 13/3/0 | 89.7 | 66.7/89.7/89.7 |
| caddyserver__certmagic | cdxgen | 13/0/19 | 57.8 | 13/0/0 | 100.0 | 13/0/0 | 100.0 | 57.8/100.0/100.0 |
| caddyserver__certmagic | cyclonedx-gomod | 16/0/16 | 66.7 | 13/3/0 | 89.7 | 13/3/0 | 89.7 | 66.7/89.7/89.7 |
| camgraff__protoxy | syft | 18/0/94 | 27.7 | 9/9/0 | 66.7 | 12/6/0 | 80.0 | 27.7/66.7/80.0 |
| camgraff__protoxy | trivy | 112/0/0 | 100.0 | 9/103/0 | 14.9 | 12/100/0 | 19.4 | 100.0/14.9/19.4 |
| camgraff__protoxy | cdxgen | 9/0/103 | 14.9 | 9/0/0 | 100.0 | 9/0/3 | 85.7 | 14.9/100.0/85.7 |
| camgraff__protoxy | cyclonedx-gomod | 11/0/101 | 17.9 | 9/2/0 | 90.0 | 9/2/3 | 78.3 | 17.9/90.0/78.3 |
| carbocation__interpose | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| carlescere__scheduler | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| centerorbit__depcharge | syft | 8/0/7 | 69.6 | 4/4/0 | 66.7 | 7/1/0 | 93.3 | 69.6/66.7/93.3 |
| centerorbit__depcharge | trivy | 15/0/0 | 100.0 | 4/11/0 | 42.1 | 7/8/0 | 63.6 | 100.0/42.1/63.6 |
| centerorbit__depcharge | cdxgen | 4/0/11 | 42.1 | 4/0/0 | 100.0 | 4/0/3 | 72.7 | 42.1/100.0/72.7 |
| centerorbit__depcharge | cyclonedx-gomod | 4/0/11 | 42.1 | 4/0/0 | 100.0 | 4/0/3 | 72.7 | 42.1/100.0/72.7 |
| chaindead__modup | syft | 37/0/7 | 91.4 | 27/10/0 | 84.4 | 27/10/0 | 84.4 | 91.4/84.4/84.4 |
| chaindead__modup | trivy | 31/0/13 | 82.7 | 27/4/0 | 93.1 | 27/4/0 | 93.1 | 82.7/93.1/93.1 |
| chaindead__modup | cdxgen | 27/0/17 | 76.1 | 27/0/0 | 100.0 | 27/0/0 | 100.0 | 76.1/100.0/100.0 |
| chaindead__modup | cyclonedx-gomod | 30/0/14 | 81.1 | 27/3/0 | 94.7 | 27/3/0 | 94.7 | 81.1/94.7/94.7 |
| chanify__chanify | syft | 65/0/102 | 56.0 | 42/23/0 | 78.5 | 43/22/0 | 79.6 | 56.0/78.5/79.6 |
| chanify__chanify | trivy | 62/0/105 | 54.1 | 42/20/0 | 80.8 | 43/19/0 | 81.9 | 54.1/80.8/81.9 |
| chanify__chanify | cdxgen | 42/0/125 | 40.2 | 42/0/0 | 100.0 | 42/0/1 | 98.8 | 40.2/100.0/98.8 |
| chanify__chanify | cyclonedx-gomod | 61/0/106 | 53.5 | 42/19/0 | 81.6 | 42/19/1 | 80.8 | 53.5/81.6/80.8 |
| leekchan__timeutil | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| lib4u__grequest | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| marekm4__color-extractor | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| matm__go-nowpayments | syft | 7/0/0 | 100.0 | 6/1/0 | 92.3 | 6/1/0 | 92.3 | 100.0/92.3/92.3 |
| matm__go-nowpayments | trivy | 6/0/1 | 92.3 | 6/0/0 | 100.0 | 6/0/0 | 100.0 | 92.3/100.0/100.0 |
| matm__go-nowpayments | cdxgen | 6/0/1 | 92.3 | 6/0/0 | 100.0 | 6/0/0 | 100.0 | 92.3/100.0/100.0 |
| matm__go-nowpayments | cyclonedx-gomod | 5/0/2 | 83.3 | 5/0/1 | 90.9 | 5/0/1 | 90.9 | 83.3/90.9/90.9 |
| matryer__is | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| mattn__go-isatty | syft | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| mattn__go-isatty | trivy | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| mattn__go-isatty | cdxgen | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| mattn__go-isatty | cyclonedx-gomod | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| mdlayher__arp | syft | 8/0/4 | 80.0 | 7/1/0 | 93.3 | 7/1/0 | 93.3 | 80.0/93.3/93.3 |
| mdlayher__arp | trivy | 7/0/5 | 73.7 | 7/0/0 | 100.0 | 7/0/0 | 100.0 | 73.7/100.0/100.0 |
| mdlayher__arp | cdxgen | 7/0/5 | 73.7 | 7/0/0 | 100.0 | 7/0/0 | 100.0 | 73.7/100.0/100.0 |
| mdlayher__arp | cyclonedx-gomod | 7/0/5 | 73.7 | 7/0/0 | 100.0 | 7/0/0 | 100.0 | 73.7/100.0/100.0 |
| mdlayher__ethernet | syft | 8/0/2 | 88.9 | 6/2/0 | 85.7 | 6/2/0 | 85.7 | 88.9/85.7/85.7 |
| mdlayher__ethernet | trivy | 10/0/0 | 100.0 | 6/4/0 | 75.0 | 6/4/0 | 75.0 | 100.0/75.0/75.0 |
| mdlayher__ethernet | cdxgen | 6/0/4 | 75.0 | 6/0/0 | 100.0 | 6/0/0 | 100.0 | 75.0/100.0/100.0 |
| mdlayher__ethernet | cyclonedx-gomod | 6/0/4 | 75.0 | 6/0/0 | 100.0 | 6/0/0 | 100.0 | 75.0/100.0/100.0 |
| mewkiz__flac | syft | 4/0/5 | 61.5 | 3/1/0 | 85.7 | 3/1/0 | 85.7 | 61.5/85.7/85.7 |
| mewkiz__flac | trivy | 3/0/6 | 50.0 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 50.0/100.0/100.0 |
| mewkiz__flac | cdxgen | 3/0/6 | 50.0 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 50.0/100.0/100.0 |
| mewkiz__flac | cyclonedx-gomod | 3/0/6 | 50.0 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 50.0/100.0/100.0 |
| saleh-rahimzadeh__go-words | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| sanketplus__go-mysql-lock | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| EchoVault__EchoVault | syft | 40/0/56 | 58.8 | 30/10/0 | 85.7 | 31/9/0 | 87.3 | 58.8/85.7/87.3 |
| EchoVault__EchoVault | trivy | 31/0/65 | 48.8 | 30/1/0 | 98.4 | 31/0/0 | 100.0 | 48.8/98.4/100.0 |
| EchoVault__EchoVault | cdxgen | 30/0/66 | 47.6 | 30/0/0 | 100.0 | 30/0/1 | 98.4 | 47.6/100.0/98.4 |
| EchoVault__EchoVault | cyclonedx-gomod | 30/0/66 | 47.6 | 30/0/0 | 100.0 | 30/0/1 | 98.4 | 47.6/100.0/98.4 |
| Kachit__appstore-sdk-go | syft | 8/0/1 | 94.1 | 2/6/0 | 40.0 | 7/1/0 | 93.3 | 94.1/40.0/93.3 |
| Kachit__appstore-sdk-go | trivy | 9/0/0 | 100.0 | 2/7/0 | 36.4 | 7/2/0 | 87.5 | 100.0/36.4/87.5 |
| Kachit__appstore-sdk-go | cdxgen | 2/0/7 | 36.4 | 2/0/0 | 100.0 | 2/0/5 | 44.4 | 36.4/100.0/44.4 |
| Kachit__appstore-sdk-go | cyclonedx-gomod | 2/0/7 | 36.4 | 2/0/0 | 100.0 | 2/0/5 | 44.4 | 36.4/100.0/44.4 |
| Mutasem-mk4__procscope | syft | 69/0/32 | 81.2 | 50/19/0 | 84.0 | 50/19/0 | 84.0 | 81.2/84.0/84.0 |
| Mutasem-mk4__procscope | trivy | 51/0/50 | 67.1 | 50/1/0 | 99.0 | 50/1/0 | 99.0 | 67.1/99.0/99.0 |
| Mutasem-mk4__procscope | cdxgen | 51/0/50 | 67.1 | 50/1/0 | 99.0 | 50/1/0 | 99.0 | 67.1/99.0/99.0 |
| Mutasem-mk4__procscope | cyclonedx-gomod | 51/0/50 | 67.1 | 50/1/0 | 99.0 | 50/1/0 | 99.0 | 67.1/99.0/99.0 |
| SharkByteSoftware__go-snk | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| SimonBaeumer__commander | syft | 0/39/0 | 0.0 | 28/11/0 | 83.6 | 30/9/0 | 87.0 | 0.0/83.6/87.0 |
| SimonBaeumer__commander | trivy | 0/39/0 | 0.0 | 28/11/0 | 83.6 | 30/9/0 | 87.0 | 0.0/83.6/87.0 |
| SimonBaeumer__commander | cdxgen | 0/39/0 | 0.0 | 28/11/0 | 83.6 | 30/9/0 | 87.0 | 0.0/83.6/87.0 |
| SimonBaeumer__commander | cyclonedx-gomod | 0/29/0 | 0.0 | 25/4/3 | 87.7 | 25/4/5 | 84.7 | 0.0/87.7/84.7 |
| TheTannerRyan__ring | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| abdullahselek__go-here | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| adlio__schema | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| albrow__forms | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| alecthomas__kingpin | syft | 7/1/1 | 87.5 | 2/6/0 | 40.0 | 6/2/0 | 85.7 | 82.4/36.4/80.0 |
| alecthomas__kingpin | trivy | 6/2/2 | 75.0 | 2/6/0 | 40.0 | 6/2/0 | 85.7 | 70.6/36.4/80.0 |
| alecthomas__kingpin | cdxgen | NA | | NA | | NA | | |
| alecthomas__kingpin | cyclonedx-gomod | 2/0/6 | 40.0 | 2/0/0 | 100.0 | 2/0/4 | 50.0 | 40.0/100.0/50.0 |
| alexliesenfeld__health | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| cep21__circuit | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| charmbracelet__lipgloss | syft | 18/13/5 | 66.7 | 15/16/0 | 65.2 | 17/14/0 | 70.8 | 62.1/60.0/65.4 |
| charmbracelet__lipgloss | trivy | 18/13/5 | 66.7 | 15/16/0 | 65.2 | 17/14/0 | 70.8 | 62.1/60.0/65.4 |
| charmbracelet__lipgloss | cdxgen | NA | | NA | | NA | | |
| charmbracelet__lipgloss | cyclonedx-gomod | 15/0/8 | 78.9 | 15/0/0 | 100.0 | 15/0/2 | 93.8 | 78.9/100.0/93.8 |
| checkr__flagr | syft | 205/0/306 | 57.3 | 160/45/0 | 87.7 | 164/41/0 | 88.9 | 57.3/87.7/88.9 |
| checkr__flagr | trivy | 171/0/340 | 50.1 | 160/11/0 | 96.7 | 164/7/0 | 97.9 | 50.1/96.7/97.9 |
| checkr__flagr | cdxgen | 160/0/351 | 47.7 | 160/0/0 | 100.0 | 160/0/4 | 98.8 | 47.7/100.0/98.8 |
| checkr__flagr | cyclonedx-gomod | 166/0/345 | 49.0 | 160/6/0 | 98.2 | 160/6/4 | 97.0 | 49.0/98.2/97.0 |
| chrispassas__nfdump | syft | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| chrispassas__nfdump | trivy | 1/1/0 | 66.7 | 1/1/0 | 66.7 | 1/1/0 | 66.7 | 66.7/66.7/66.7 |
| chrispassas__nfdump | cdxgen | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| chrispassas__nfdump | cyclonedx-gomod | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| cihangir__neo4j | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| mdaliyan__icache | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| micro__micro | CLONE_FAIL | NA | | NA | | NA | | |
| miekg__dns | syft | 5/0/6 | 62.5 | 2/3/0 | 57.1 | 3/2/0 | 75.0 | 62.5/57.1/75.0 |
| miekg__dns | trivy | 5/0/6 | 62.5 | 2/3/0 | 57.1 | 3/2/0 | 75.0 | 62.5/57.1/75.0 |
| miekg__dns | cdxgen | 2/0/9 | 30.8 | 2/0/0 | 100.0 | 2/0/1 | 80.0 | 30.8/100.0/80.0 |
| miekg__dns | cyclonedx-gomod | 5/0/6 | 62.5 | 2/3/0 | 57.1 | 3/2/0 | 75.0 | 62.5/57.1/75.0 |
| mjl-__mox | syft | 0/28/0 | 0.0 | 23/5/0 | 90.2 | 23/5/0 | 90.2 | 0.0/90.2/90.2 |
| mjl-__mox | trivy | 0/28/0 | 0.0 | 23/5/0 | 90.2 | 23/5/0 | 90.2 | 0.0/90.2/90.2 |
| mjl-__mox | cdxgen | 0/28/0 | 0.0 | 23/5/0 | 90.2 | 23/5/0 | 90.2 | 0.0/90.2/90.2 |
| mjl-__mox | cyclonedx-gomod | 0/28/0 | 0.0 | 23/5/0 | 90.2 | 23/5/0 | 90.2 | 0.0/90.2/90.2 |
| mocktools__go-smtp-mock | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| siddontang__ledisdb | syft | 33/0/1 | 98.5 | 13/20/0 | 56.5 | 13/20/0 | 56.5 | 98.5/56.5/56.5 |
| siddontang__ledisdb | trivy | 34/0/0 | 100.0 | 13/21/0 | 55.3 | 13/21/0 | 55.3 | 100.0/55.3/55.3 |
| siddontang__ledisdb | cdxgen | 13/0/21 | 55.3 | 13/0/0 | 100.0 | 13/0/0 | 100.0 | 55.3/100.0/100.0 |
| siddontang__ledisdb | cyclonedx-gomod | 13/0/21 | 55.3 | 13/0/0 | 100.0 | 13/0/0 | 100.0 | 55.3/100.0/100.0 |
| sirnewton01__godbg | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| surullabs__lint | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| szyhf__go-gcache | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| agilira__orpheus | syft | 5/19/0 | 34.5 | 5/19/0 | 34.5 | 5/19/0 | 34.5 | 32.3/32.3/32.3 |
| agilira__orpheus | trivy | 5/20/0 | 33.3 | 5/20/0 | 33.3 | 5/20/0 | 33.3 | 32.3/32.3/32.3 |
| agilira__orpheus | cdxgen | 5/0/0 | 100.0 | 5/0/0 | 100.0 | 5/0/0 | 100.0 | 100.0/100.0/100.0 |
| agilira__orpheus | cyclonedx-gomod | 5/0/0 | 100.0 | 5/0/0 | 100.0 | 5/0/0 | 100.0 | 100.0/100.0/100.0 |
| alajmo__mani | syft | 37/0/15 | 83.1 | 25/12/0 | 80.6 | 28/9/0 | 86.2 | 83.1/80.6/86.2 |
| alajmo__mani | trivy | 30/0/22 | 73.2 | 25/5/0 | 90.9 | 28/2/0 | 96.6 | 73.2/90.9/96.6 |
| alajmo__mani | cdxgen | 25/0/27 | 64.9 | 25/0/0 | 100.0 | 25/0/3 | 94.3 | 64.9/100.0/94.3 |
| alajmo__mani | cyclonedx-gomod | 26/0/26 | 66.7 | 25/1/0 | 98.0 | 25/1/3 | 92.6 | 66.7/98.0/92.6 |
| alfiankan__crab-config-files-templating | syft | 0/7/0 | 0.0 | 2/5/0 | 44.4 | 6/1/0 | 92.3 | 0.0/44.4/92.3 |
| alfiankan__crab-config-files-templating | trivy | 0/7/0 | 0.0 | 2/5/0 | 44.4 | 6/1/0 | 92.3 | 0.0/44.4/92.3 |
| alfiankan__crab-config-files-templating | cdxgen | 0/7/0 | 0.0 | 2/5/0 | 44.4 | 6/1/0 | 92.3 | 0.0/44.4/92.3 |
| alfiankan__crab-config-files-templating | cyclonedx-gomod | 0/3/0 | 0.0 | 2/1/0 | 80.0 | 2/1/4 | 44.4 | 0.0/80.0/44.4 |
| alwindoss__morse | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| amimof__huego | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| chrislusf__gleam | syft | 96/0/182 | 51.3 | 68/28/0 | 82.9 | 68/28/0 | 82.9 | 51.3/82.9/82.9 |
| chrislusf__gleam | trivy | 70/0/208 | 40.2 | 68/2/0 | 98.6 | 68/2/0 | 98.6 | 40.2/98.6/98.6 |
| chrislusf__gleam | cdxgen | 68/0/210 | 39.3 | 68/0/0 | 100.0 | 68/0/0 | 100.0 | 39.3/100.0/100.0 |
| chrislusf__gleam | cyclonedx-gomod | 69/0/209 | 39.8 | 68/1/0 | 99.3 | 68/1/0 | 99.3 | 39.8/99.3/99.3 |
| chrislusf__seaweedfs | syft | 562/9/601 | 64.8 | 318/253/0 | 71.5 | 322/249/0 | 72.1 | 60.6/63.4/64.0 |
| chrislusf__seaweedfs | trivy | NA | | NA | | NA | | |
| chrislusf__seaweedfs | cdxgen | NA | | NA | | NA | | |
| chrislusf__seaweedfs | cyclonedx-gomod | 469/0/694 | 57.5 | 315/154/3 | 80.1 | 315/154/7 | 79.6 | 57.5/80.1/79.6 |
| circa10a__go-aws-news | syft | 40/0/8 | 90.9 | 32/8/0 | 88.9 | 36/4/0 | 94.7 | 90.9/88.9/94.7 |
| circa10a__go-aws-news | trivy | 39/0/9 | 89.7 | 32/7/0 | 90.1 | 36/3/0 | 96.0 | 89.7/90.1/96.0 |
| circa10a__go-aws-news | cdxgen | 32/0/16 | 80.0 | 32/0/0 | 100.0 | 32/0/4 | 94.1 | 80.0/100.0/94.1 |
| circa10a__go-aws-news | cyclonedx-gomod | 32/0/16 | 80.0 | 32/0/0 | 100.0 | 32/0/4 | 94.1 | 80.0/100.0/94.1 |
| claygod__Bxog | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| cockroachdb__pebble | syft | 65/8/173 | 41.8 | 50/23/0 | 81.3 | 54/19/0 | 85.0 | 38.9/76.3/80.0 |
| cockroachdb__pebble | trivy | 58/7/180 | 38.3 | 50/15/0 | 87.0 | 54/11/0 | 90.8 | 35.8/84.0/87.8 |
| cockroachdb__pebble | cdxgen | 51/1/187 | 35.2 | 50/2/0 | 98.0 | 50/2/4 | 94.3 | 34.1/95.2/91.7 |
| cockroachdb__pebble | cyclonedx-gomod | 48/0/190 | 33.6 | 47/1/3 | 95.9 | 47/1/7 | 92.2 | 33.6/95.9/92.2 |
| codemodus__chain | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| coregx__signals | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| cosiner__argv | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| mengzhuo__cookiestxt | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| metacall__core | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| mickep76__mapslice-json | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| minio__mc | syft | 320/0/221 | 74.3 | 101/219/0 | 48.0 | 105/215/0 | 49.4 | 74.3/48.0/49.4 |
| minio__mc | trivy | 288/0/253 | 69.5 | 101/187/0 | 51.9 | 105/183/0 | 53.4 | 69.5/51.9/53.4 |
| minio__mc | cdxgen | 101/0/440 | 31.5 | 101/0/0 | 100.0 | 101/0/4 | 98.1 | 31.5/100.0/98.1 |
| minio__mc | cyclonedx-gomod | 284/0/257 | 68.8 | 101/183/0 | 52.5 | 102/182/3 | 52.4 | 68.8/52.5/52.4 |
| mkideal__cli | syft | 13/0/10 | 72.2 | 8/5/0 | 76.2 | 12/1/0 | 96.0 | 72.2/76.2/96.0 |
| mkideal__cli | trivy | 23/0/0 | 100.0 | 8/15/0 | 51.6 | 12/11/0 | 68.6 | 100.0/51.6/68.6 |
| mkideal__cli | cdxgen | 8/0/15 | 51.6 | 8/0/0 | 100.0 | 8/0/4 | 80.0 | 51.6/100.0/80.0 |
| mkideal__cli | cyclonedx-gomod | 8/0/15 | 51.6 | 8/0/0 | 100.0 | 8/0/4 | 80.0 | 51.6/100.0/80.0 |
| mlimaloureiro__golog | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| openziti-test-kitchen__zssh | syft | 141/0/220 | 56.2 | 107/34/0 | 86.3 | 107/34/0 | 86.3 | 55.8/85.5/85.5 |
| openziti-test-kitchen__zssh | trivy | 121/0/240 | 50.2 | 107/14/0 | 93.9 | 107/14/0 | 93.9 | 49.8/93.0/93.0 |
| openziti-test-kitchen__zssh | cdxgen | 107/0/254 | 45.7 | 107/0/0 | 100.0 | 107/0/0 | 100.0 | 45.7/100.0/100.0 |
| openziti-test-kitchen__zssh | cyclonedx-gomod | 117/0/244 | 49.0 | 104/13/3 | 92.9 | 104/13/3 | 92.9 | 48.5/92.0/92.0 |
| osamingo__checkdigit | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| truemail-rb__truemail-go | syft | 16/0/6 | 84.2 | 12/4/0 | 85.7 | 12/4/0 | 85.7 | 84.2/85.7/85.7 |
| truemail-rb__truemail-go | trivy | 15/0/7 | 81.1 | 12/3/0 | 88.9 | 12/3/0 | 88.9 | 81.1/88.9/88.9 |
| truemail-rb__truemail-go | cdxgen | 12/0/10 | 70.6 | 12/0/0 | 100.0 | 12/0/0 | 100.0 | 70.6/100.0/100.0 |
| truemail-rb__truemail-go | cyclonedx-gomod | 15/0/7 | 81.1 | 12/3/0 | 88.9 | 12/3/0 | 88.9 | 81.1/88.9/88.9 |
| two__tspool | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| viney-shih__go-lock | syft | 6/0/1 | 92.3 | 1/5/0 | 28.6 | 5/1/0 | 90.9 | 92.3/28.6/90.9 |
| viney-shih__go-lock | trivy | 7/0/0 | 100.0 | 1/6/0 | 25.0 | 5/2/0 | 83.3 | 100.0/25.0/83.3 |
| viney-shih__go-lock | cdxgen | 1/0/6 | 25.0 | 1/0/0 | 100.0 | 1/0/4 | 33.3 | 25.0/100.0/33.3 |
| viney-shih__go-lock | cyclonedx-gomod | 1/0/6 | 25.0 | 1/0/0 | 100.0 | 1/0/4 | 33.3 | 25.0/100.0/33.3 |
| volodymyrprokopyuk__go-blockchain | syft | 22/0/26 | 62.9 | 10/12/0 | 62.5 | 10/12/0 | 62.5 | 62.9/62.5/62.5 |
| volodymyrprokopyuk__go-blockchain | trivy | 11/0/37 | 37.3 | 10/1/0 | 95.2 | 10/1/0 | 95.2 | 37.3/95.2/95.2 |
| volodymyrprokopyuk__go-blockchain | cdxgen | 10/0/38 | 34.5 | 10/0/0 | 100.0 | 10/0/0 | 100.0 | 34.5/100.0/100.0 |
| volodymyrprokopyuk__go-blockchain | cyclonedx-gomod | 11/0/37 | 37.3 | 10/1/0 | 95.2 | 10/1/0 | 95.2 | 37.3/95.2/95.2 |
| aalpar__deheap | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| adamluzsi__testcase | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| alexeyco__simpletable | syft | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 100.0/100.0/100.0 |
| alexeyco__simpletable | trivy | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 100.0/100.0/100.0 |
| alexeyco__simpletable | cdxgen | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 100.0/100.0/100.0 |
| alexeyco__simpletable | cyclonedx-gomod | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 100.0/100.0/100.0 |
| andrewstuart__goq | syft | 7/0/5 | 73.7 | 3/4/0 | 60.0 | 6/1/0 | 92.3 | 73.7/60.0/92.3 |
| andrewstuart__goq | trivy | 12/0/0 | 100.0 | 3/9/0 | 40.0 | 6/6/0 | 66.7 | 100.0/40.0/66.7 |
| andrewstuart__goq | cdxgen | 3/0/9 | 40.0 | 3/0/0 | 100.0 | 3/0/3 | 66.7 | 40.0/100.0/66.7 |
| andrewstuart__goq | cyclonedx-gomod | 3/0/9 | 40.0 | 3/0/0 | 100.0 | 3/0/3 | 66.7 | 40.0/100.0/66.7 |
| andy2046__tik | syft | 3/0/19 | 24.0 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 24.0/100.0/100.0 |
| andy2046__tik | trivy | 22/0/0 | 100.0 | 3/19/0 | 24.0 | 3/19/0 | 24.0 | 100.0/24.0/24.0 |
| andy2046__tik | cdxgen | 3/0/19 | 24.0 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 24.0/100.0/100.0 |
| andy2046__tik | cyclonedx-gomod | 3/0/19 | 24.0 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 24.0/100.0/100.0 |
| ansd__lastpass-go | syft | 11/0/23 | 48.9 | 1/10/0 | 16.7 | 10/1/0 | 95.2 | 48.9/16.7/95.2 |
| ansd__lastpass-go | trivy | 34/0/0 | 100.0 | 1/33/0 | 5.7 | 10/24/0 | 45.5 | 100.0/5.7/45.5 |
| ansd__lastpass-go | cdxgen | 1/0/33 | 5.7 | 1/0/0 | 100.0 | 1/0/9 | 18.2 | 5.7/100.0/18.2 |
| ansd__lastpass-go | cyclonedx-gomod | 1/0/33 | 5.7 | 1/0/0 | 100.0 | 1/0/9 | 18.2 | 5.7/100.0/18.2 |
| antchfx__xmlquery | syft | 4/0/10 | 44.4 | 4/0/0 | 100.0 | 4/0/0 | 100.0 | 44.4/100.0/100.0 |
| antchfx__xmlquery | trivy | 14/0/0 | 100.0 | 4/10/0 | 44.4 | 4/10/0 | 44.4 | 100.0/44.4/44.4 |
| antchfx__xmlquery | cdxgen | 4/0/10 | 44.4 | 4/0/0 | 100.0 | 4/0/0 | 100.0 | 44.4/100.0/100.0 |
| antchfx__xmlquery | cyclonedx-gomod | 4/0/10 | 44.4 | 4/0/0 | 100.0 | 4/0/0 | 100.0 | 44.4/100.0/100.0 |
| cloudwego__netpoll | syft | 3/0/9 | 40.0 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 40.0/100.0/100.0 |
| cloudwego__netpoll | trivy | 7/0/5 | 73.7 | 3/4/0 | 60.0 | 3/4/0 | 60.0 | 73.7/60.0/60.0 |
| cloudwego__netpoll | cdxgen | 3/0/9 | 40.0 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 40.0/100.0/100.0 |
| cloudwego__netpoll | cyclonedx-gomod | 3/0/9 | 40.0 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 40.0/100.0/100.0 |
| cmd-stream__cmd-stream-go | syft | 7/0/4 | 77.8 | 7/0/0 | 100.0 | 7/0/0 | 100.0 | 77.8/100.0/100.0 |
| cmd-stream__cmd-stream-go | trivy | 7/0/4 | 77.8 | 7/0/0 | 100.0 | 7/0/0 | 100.0 | 77.8/100.0/100.0 |
| cmd-stream__cmd-stream-go | cdxgen | 7/0/4 | 77.8 | 7/0/0 | 100.0 | 7/0/0 | 100.0 | 77.8/100.0/100.0 |
| cmd-stream__cmd-stream-go | cyclonedx-gomod | 7/0/4 | 77.8 | 7/0/0 | 100.0 | 7/0/0 | 100.0 | 77.8/100.0/100.0 |
| codingsince1985__checksum | syft | 3/0/3 | 66.7 | 2/1/0 | 80.0 | 3/0/0 | 100.0 | 66.7/80.0/100.0 |
| codingsince1985__checksum | trivy | 3/0/3 | 66.7 | 2/1/0 | 80.0 | 3/0/0 | 100.0 | 66.7/80.0/100.0 |
| codingsince1985__checksum | cdxgen | 2/0/4 | 50.0 | 2/0/0 | 100.0 | 2/0/1 | 80.0 | 50.0/100.0/80.0 |
| codingsince1985__checksum | cyclonedx-gomod | 2/0/4 | 50.0 | 2/0/0 | 100.0 | 2/0/1 | 80.0 | 50.0/100.0/80.0 |
| cybergarage__go-job | syft | 74/0/63 | 70.1 | 48/26/0 | 78.7 | 48/26/0 | 78.7 | 70.1/78.7/78.7 |
| cybergarage__go-job | trivy | 50/0/87 | 53.5 | 48/2/0 | 98.0 | 48/2/0 | 98.0 | 53.5/98.0/98.0 |
| cybergarage__go-job | cdxgen | 48/0/89 | 51.9 | 48/0/0 | 100.0 | 48/0/0 | 100.0 | 51.9/100.0/100.0 |
| cybergarage__go-job | cyclonedx-gomod | 49/0/88 | 52.7 | 48/1/0 | 99.0 | 48/1/0 | 99.0 | 52.7/99.0/99.0 |
| cyucelen__marker | syft | 9/0/1 | 94.7 | 4/5/0 | 61.5 | 8/1/0 | 94.1 | 94.7/61.5/94.1 |
| cyucelen__marker | trivy | 10/0/0 | 100.0 | 4/6/0 | 57.1 | 8/2/0 | 88.9 | 100.0/57.1/88.9 |
| cyucelen__marker | cdxgen | 4/0/6 | 57.1 | 4/0/0 | 100.0 | 4/0/4 | 66.7 | 57.1/100.0/66.7 |
| cyucelen__marker | cyclonedx-gomod | 4/0/6 | 57.1 | 4/0/0 | 100.0 | 4/0/4 | 66.7 | 57.1/100.0/66.7 |
| db47h__decimal | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| ddelizia__channelify | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| milosgajdos__go-estimate | syft | 23/0/29 | 61.3 | 13/10/0 | 72.2 | 17/6/0 | 85.0 | 61.3/72.2/85.0 |
| milosgajdos__go-estimate | trivy | 18/0/34 | 51.4 | 13/5/0 | 83.9 | 17/1/0 | 97.1 | 51.4/83.9/97.1 |
| milosgajdos__go-estimate | cdxgen | 13/0/39 | 40.0 | 13/0/0 | 100.0 | 13/0/4 | 86.7 | 40.0/100.0/86.7 |
| milosgajdos__go-estimate | cyclonedx-gomod | 14/0/38 | 42.4 | 13/1/0 | 96.3 | 13/1/4 | 83.9 | 42.4/96.3/83.9 |
| montanaflynn__stats | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| moovweb__gvm | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| msempere__golarm | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| msoap__shell2http | syft | 9/0/15 | 54.5 | 2/7/0 | 36.4 | 2/7/0 | 36.4 | 54.5/36.4/36.4 |
| msoap__shell2http | trivy | 24/0/0 | 100.0 | 2/22/0 | 15.4 | 2/22/0 | 15.4 | 100.0/15.4/15.4 |
| msoap__shell2http | cdxgen | 2/0/22 | 15.4 | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 15.4/100.0/100.0 |
| msoap__shell2http | cyclonedx-gomod | 2/0/22 | 15.4 | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 15.4/100.0/100.0 |
| pioz__faker | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| pointlander__peg | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| rekurt__gost-crypto | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| rfberaldo__sqlz | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| yl2chen__cidranger | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| yuroyoro__goast-viewer | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| Aorioli__gcm | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| HereMobilityDevelopers__mediary | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| alioygur__gores | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| alpeb__go-finance | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| andlabs__ui | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| antst__go-apispec | syft | 13/121/3 | 17.3 | 4/130/0 | 5.8 | 9/125/0 | 12.6 | 13.6/5.3/11.6 |
| antst__go-apispec | trivy | 12/120/4 | 16.2 | 4/128/0 | 5.9 | 9/123/0 | 12.8 | 12.7/5.5/11.9 |
| antst__go-apispec | cdxgen | 12/46/4 | 32.4 | 4/54/0 | 12.9 | 9/49/0 | 26.9 | 23.8/11.1/23.4 |
| antst__go-apispec | cyclonedx-gomod | 4/0/12 | 40.0 | 4/0/0 | 100.0 | 4/0/5 | 61.5 | 40.0/100.0/61.5 |
| apache__calcite-avatica-go | syft | 19/0/13 | 74.5 | 12/7/0 | 77.4 | 12/7/0 | 77.4 | 74.5/77.4/77.4 |
| apache__calcite-avatica-go | trivy | 12/0/20 | 54.5 | 12/0/0 | 100.0 | 12/0/0 | 100.0 | 54.5/100.0/100.0 |
| apache__calcite-avatica-go | cdxgen | 12/0/20 | 54.5 | 12/0/0 | 100.0 | 12/0/0 | 100.0 | 54.5/100.0/100.0 |
| apache__calcite-avatica-go | cyclonedx-gomod | 12/0/20 | 54.5 | 12/0/0 | 100.0 | 12/0/0 | 100.0 | 54.5/100.0/100.0 |
| bitfield__uptimerobot | syft | 26/0/220 | 19.1 | 16/10/0 | 76.2 | 17/9/0 | 79.1 | 19.1/76.2/79.1 |
| bitfield__uptimerobot | trivy | 246/0/0 | 100.0 | 16/230/0 | 12.2 | 17/229/0 | 12.9 | 100.0/12.2/12.9 |
| bitfield__uptimerobot | cdxgen | 16/0/230 | 12.2 | 16/0/0 | 100.0 | 16/0/1 | 97.0 | 12.2/100.0/97.0 |
| bitfield__uptimerobot | cyclonedx-gomod | 19/0/227 | 14.3 | 16/3/0 | 91.4 | 16/3/1 | 88.9 | 14.3/91.4/88.9 |
| bmf-san__goblin | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| codingsince1985__geo-golang | syft | 6/0/1 | 92.3 | 1/5/0 | 28.6 | 5/1/0 | 90.9 | 92.3/28.6/90.9 |
| codingsince1985__geo-golang | trivy | 5/0/2 | 83.3 | 1/4/0 | 33.3 | 5/0/0 | 100.0 | 83.3/33.3/100.0 |
| codingsince1985__geo-golang | cdxgen | 1/0/6 | 25.0 | 1/0/0 | 100.0 | 1/0/4 | 33.3 | 25.0/100.0/33.3 |
| codingsince1985__geo-golang | cyclonedx-gomod | 1/0/6 | 25.0 | 1/0/0 | 100.0 | 1/0/4 | 33.3 | 25.0/100.0/33.3 |
| corbym__gogiven | syft | 2/0/0 | 100.0 | 1/1/0 | 66.7 | 2/0/0 | 100.0 | 100.0/66.7/100.0 |
| corbym__gogiven | trivy | 2/0/0 | 100.0 | 1/1/0 | 66.7 | 2/0/0 | 100.0 | 100.0/66.7/100.0 |
| corbym__gogiven | cdxgen | 1/0/1 | 66.7 | 1/0/0 | 100.0 | 1/0/1 | 66.7 | 66.7/100.0/66.7 |
| corbym__gogiven | cyclonedx-gomod | 1/0/1 | 66.7 | 1/0/0 | 100.0 | 1/0/1 | 66.7 | 66.7/100.0/66.7 |
| coregx__fursy | syft | 2/74/0 | 5.1 | 2/74/0 | 5.1 | 2/74/0 | 5.1 | 4.9/4.9/4.9 |
| coregx__fursy | trivy | 2/50/0 | 7.4 | 2/50/0 | 7.4 | 2/50/0 | 7.4 | 7.1/7.1/7.1 |
| coregx__fursy | cdxgen | 2/51/0 | 7.3 | 2/51/0 | 7.3 | 2/51/0 | 7.3 | 7.0/7.0/7.0 |
| coregx__fursy | cyclonedx-gomod | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 100.0/100.0/100.0 |
| dghubble__gologin | syft | 47/7/27 | 73.4 | 34/20/0 | 77.3 | 34/20/0 | 77.3 | 62.3/61.3/61.3 |
| dghubble__gologin | trivy | 37/6/37 | 63.2 | 34/9/0 | 88.3 | 34/9/0 | 88.3 | 53.3/71.6/71.6 |
| dghubble__gologin | cdxgen | 37/5/37 | 63.8 | 34/8/0 | 89.5 | 34/8/0 | 89.5 | 53.7/72.3/72.3 |
| dghubble__gologin | cyclonedx-gomod | 34/0/40 | 63.0 | 34/0/0 | 100.0 | 34/0/0 | 100.0 | 63.0/100.0/100.0 |
| dgraph-io__ristretto | syft | 9/0/1 | 94.7 | 3/6/0 | 50.0 | 8/1/0 | 94.1 | 94.7/50.0/94.1 |
| dgraph-io__ristretto | trivy | 8/0/2 | 88.9 | 3/5/0 | 54.5 | 8/0/0 | 100.0 | 88.9/54.5/100.0 |
| dgraph-io__ristretto | cdxgen | 3/0/7 | 46.2 | 3/0/0 | 100.0 | 3/0/5 | 54.5 | 46.2/100.0/54.5 |
| dgraph-io__ristretto | cyclonedx-gomod | 3/0/7 | 46.2 | 3/0/0 | 100.0 | 3/0/5 | 54.5 | 46.2/100.0/54.5 |
| muir__reflectutils | syft | 7/0/6 | 70.0 | 2/5/0 | 44.4 | 6/1/0 | 92.3 | 70.0/44.4/92.3 |
| muir__reflectutils | trivy | 7/0/6 | 70.0 | 2/5/0 | 44.4 | 6/1/0 | 92.3 | 70.0/44.4/92.3 |
| muir__reflectutils | cdxgen | 2/0/11 | 26.7 | 2/0/0 | 100.0 | 2/0/4 | 50.0 | 26.7/100.0/50.0 |
| muir__reflectutils | cyclonedx-gomod | 2/0/11 | 26.7 | 2/0/0 | 100.0 | 2/0/4 | 50.0 | 26.7/100.0/50.0 |
| murlokswarm__app | syft | 11/0/11 | 66.7 | 6/5/0 | 70.6 | 10/1/0 | 95.2 | 66.7/70.6/95.2 |
| murlokswarm__app | trivy | 10/0/12 | 62.5 | 6/4/0 | 75.0 | 10/0/0 | 100.0 | 62.5/75.0/100.0 |
| murlokswarm__app | cdxgen | 6/0/16 | 42.9 | 6/0/0 | 100.0 | 6/0/4 | 75.0 | 42.9/100.0/75.0 |
| murlokswarm__app | cyclonedx-gomod | 6/0/16 | 42.9 | 6/0/0 | 100.0 | 6/0/4 | 75.0 | 42.9/100.0/75.0 |
| nakagami__firebirdsql | syft | 9/0/4 | 81.8 | 4/5/0 | 61.5 | 8/1/0 | 94.1 | 81.8/61.5/94.1 |
| nakagami__firebirdsql | trivy | 8/0/5 | 76.2 | 4/4/0 | 66.7 | 8/0/0 | 100.0 | 76.2/66.7/100.0 |
| nakagami__firebirdsql | cdxgen | 4/0/9 | 47.1 | 4/0/0 | 100.0 | 4/0/4 | 66.7 | 47.1/100.0/66.7 |
| nakagami__firebirdsql | cyclonedx-gomod | 4/0/9 | 47.1 | 4/0/0 | 100.0 | 4/0/4 | 66.7 | 47.1/100.0/66.7 |
| phoenix-tui__phoenix | syft | 14/30/0 | 48.3 | 9/35/0 | 34.0 | 9/35/0 | 34.0 | 27.1/14.8/14.8 |
| phoenix-tui__phoenix | trivy | 14/28/0 | 50.0 | 9/33/0 | 35.3 | 9/33/0 | 35.3 | 28.1/15.4/15.4 |
| phoenix-tui__phoenix | cdxgen | 9/5/5 | 64.3 | 9/5/0 | 78.3 | 9/5/0 | 78.3 | 64.3/78.3/78.3 |
| phoenix-tui__phoenix | cyclonedx-gomod | 9/0/5 | 78.3 | 9/0/0 | 100.0 | 9/0/0 | 100.0 | 34.8/44.4/44.4 |
| piaohao__godis | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| pixie-labs__pixie | syft | 325/9/322 | 66.3 | 261/73/0 | 87.7 | 263/71/0 | 88.1 | 61.8/81.6/82.0 |
| pixie-labs__pixie | trivy | 288/1/359 | 61.5 | 260/29/1 | 94.5 | 262/27/1 | 94.9 | 59.0/90.5/90.9 |
| pixie-labs__pixie | cdxgen | 261/0/386 | 57.5 | 261/0/0 | 100.0 | 261/0/2 | 99.6 | 57.5/100.0/99.6 |
| pixie-labs__pixie | cyclonedx-gomod | 279/1/368 | 60.2 | 259/21/2 | 95.7 | 259/21/4 | 95.4 | 57.6/91.7/91.3 |
| pkg__errors | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| samber__slog-formatter | syft | 13/0/5 | 83.9 | 4/9/0 | 47.1 | 10/3/0 | 87.0 | 83.9/47.1/87.0 |
| samber__slog-formatter | trivy | 11/0/7 | 75.9 | 4/7/0 | 53.3 | 10/1/0 | 95.2 | 75.9/53.3/95.2 |
| samber__slog-formatter | cdxgen | 4/0/14 | 36.4 | 4/0/0 | 100.0 | 4/0/6 | 57.1 | 36.4/100.0/57.1 |
| samber__slog-formatter | cyclonedx-gomod | 4/0/14 | 36.4 | 4/0/0 | 100.0 | 4/0/6 | 57.1 | 36.4/100.0/57.1 |
| scaleway__scaleway-cli | syft | 256/0/396 | 56.4 | 194/62/0 | 86.2 | 194/62/0 | 86.2 | 56.4/86.2/86.2 |
| scaleway__scaleway-cli | trivy | 212/0/440 | 49.1 | 194/18/0 | 95.6 | 194/18/0 | 95.6 | 49.1/95.6/95.6 |
| scaleway__scaleway-cli | cdxgen | 194/0/458 | 45.9 | 194/0/0 | 100.0 | 194/0/0 | 100.0 | 45.9/100.0/100.0 |
| scaleway__scaleway-cli | cyclonedx-gomod | 212/0/440 | 49.1 | 194/18/0 | 95.6 | 194/18/0 | 95.6 | 49.1/95.6/95.6 |
| skelterjohn__geom | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| snwfdhmp__errlog | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| AaronJan__Hunch | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| SimonWaldherr__golang-benchmarks | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| ankorstore__yokai | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| antonmedv__expr | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| arch-go__arch-go | syft | 42/0/60 | 58.3 | 26/16/0 | 76.5 | 27/15/0 | 78.3 | 58.3/76.5/78.3 |
| arch-go__arch-go | trivy | 36/0/66 | 52.2 | 26/10/0 | 83.9 | 27/9/0 | 85.7 | 52.2/83.9/85.7 |
| arch-go__arch-go | cdxgen | 26/0/76 | 40.6 | 26/0/0 | 100.0 | 26/0/1 | 98.1 | 40.6/100.0/98.1 |
| arch-go__arch-go | cyclonedx-gomod | 27/0/75 | 41.9 | 24/3/2 | 90.6 | 24/3/3 | 88.9 | 41.9/90.6/88.9 |
| arunsworld__nursery | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| asaskevich__EventBus | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| couchbase__goforestdb | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| cpmech__gosl | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| ctreminiom__go-atlassian | syft | 13/0/0 | 100.0 | 11/2/0 | 91.7 | 11/2/0 | 91.7 | 100.0/91.7/91.7 |
| ctreminiom__go-atlassian | trivy | 11/0/2 | 91.7 | 11/0/0 | 100.0 | 11/0/0 | 100.0 | 91.7/100.0/100.0 |
| ctreminiom__go-atlassian | cdxgen | 11/0/2 | 91.7 | 11/0/0 | 100.0 | 11/0/0 | 100.0 | 91.7/100.0/100.0 |
| ctreminiom__go-atlassian | cyclonedx-gomod | 10/0/3 | 87.0 | 10/0/1 | 95.2 | 10/0/1 | 95.2 | 87.0/95.2/95.2 |
| cucumber__godog | syft | 17/5/6 | 75.6 | 12/10/0 | 70.6 | 12/10/0 | 70.6 | 72.3/66.7/66.7 |
| cucumber__godog | trivy | 23/15/0 | 75.4 | 12/26/0 | 48.0 | 12/26/0 | 48.0 | 69.8/46.2/46.2 |
| cucumber__godog | cdxgen | NA | | NA | | NA | | |
| cucumber__godog | cyclonedx-gomod | 10/0/13 | 60.6 | 9/1/3 | 81.8 | 9/1/3 | 81.8 | 60.6/81.8/81.8 |
| cyucelen__walker | syft | 21/0/24 | 63.6 | 3/18/0 | 25.0 | 20/1/0 | 97.6 | 63.6/25.0/97.6 |
| cyucelen__walker | trivy | 20/0/25 | 61.5 | 3/17/0 | 26.1 | 20/0/0 | 100.0 | 61.5/26.1/100.0 |
| cyucelen__walker | cdxgen | 3/0/42 | 12.5 | 3/0/0 | 100.0 | 3/0/17 | 26.1 | 12.5/100.0/26.1 |
| cyucelen__walker | cyclonedx-gomod | 3/0/42 | 12.5 | 3/0/0 | 100.0 | 3/0/17 | 26.1 | 12.5/100.0/26.1 |
| datastream__libsvm | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| dnaeon__go-vcr | syft | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| dnaeon__go-vcr | trivy | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| dnaeon__go-vcr | cdxgen | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| dnaeon__go-vcr | cyclonedx-gomod | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 100.0/100.0/100.0 |
| dnnrly__wait-for | syft | 28/0/38 | 59.6 | 10/18/0 | 52.6 | 22/6/0 | 88.0 | 59.6/52.6/88.0 |
| dnnrly__wait-for | trivy | 66/0/0 | 100.0 | 10/56/0 | 26.3 | 22/44/0 | 50.0 | 100.0/26.3/50.0 |
| dnnrly__wait-for | cdxgen | 10/0/56 | 26.3 | 10/0/0 | 100.0 | 10/0/12 | 62.5 | 26.3/100.0/62.5 |
| dnnrly__wait-for | cyclonedx-gomod | 10/0/56 | 26.3 | 10/0/0 | 100.0 | 10/0/12 | 62.5 | 26.3/100.0/62.5 |
| dunglas__mercure | syft | 70/170/13 | 43.3 | 28/212/0 | 20.9 | 34/206/0 | 24.8 | 40.2/20.9/24.8 |
| dunglas__mercure | trivy | 61/127/22 | 45.0 | 28/160/0 | 25.9 | 34/154/0 | 30.6 | 41.3/25.9/30.6 |
| dunglas__mercure | cdxgen | 50/123/33 | 39.1 | 28/145/0 | 27.9 | 34/139/0 | 32.9 | 36.7/27.9/32.9 |
| dunglas__mercure | cyclonedx-gomod | 41/0/42 | 66.1 | 24/17/4 | 69.6 | 24/17/10 | 64.0 | 66.1/69.6/64.0 |
| dvyukov__go-fuzz | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| name5566__leaf | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| naughtygopher__errors | syft | 5/0/31 | 24.4 | 2/3/0 | 57.1 | 2/3/0 | 57.1 | 24.4/57.1/57.1 |
| naughtygopher__errors | trivy | 2/0/34 | 10.5 | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 10.5/100.0/100.0 |
| naughtygopher__errors | cdxgen | 2/0/34 | 10.5 | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 10.5/100.0/100.0 |
| naughtygopher__errors | cyclonedx-gomod | 2/0/34 | 10.5 | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 10.5/100.0/100.0 |
| naughtygopher__nibbler | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| pomerium__pomerium | syft | 486/0/334 | 74.4 | 308/178/0 | 77.6 | 335/151/0 | 81.6 | 74.3/77.3/81.3 |
| pomerium__pomerium | trivy | 422/0/398 | 68.0 | 308/114/0 | 84.4 | 335/87/0 | 88.5 | 67.8/84.0/88.2 |
| pomerium__pomerium | cdxgen | NA | | NA | | NA | | |
| pomerium__pomerium | cyclonedx-gomod | 383/0/437 | 63.7 | 302/81/6 | 87.4 | 302/81/33 | 84.1 | 63.7/87.4/84.1 |
| posener__cmd | syft | 10/0/2 | 90.9 | 5/5/0 | 66.7 | 9/1/0 | 94.7 | 90.9/66.7/94.7 |
| posener__cmd | trivy | 12/0/0 | 100.0 | 5/7/0 | 58.8 | 9/3/0 | 85.7 | 100.0/58.8/85.7 |
| posener__cmd | cdxgen | 5/0/7 | 58.8 | 5/0/0 | 100.0 | 5/0/4 | 71.4 | 58.8/100.0/71.4 |
| posener__cmd | cyclonedx-gomod | 5/0/7 | 58.8 | 5/0/0 | 100.0 | 5/0/4 | 71.4 | 58.8/100.0/71.4 |
| pressly__sup | syft | 9/0/3 | 85.7 | 5/4/0 | 71.4 | 5/4/0 | 71.4 | 85.7/71.4/71.4 |
| pressly__sup | trivy | 12/0/0 | 100.0 | 5/7/0 | 58.8 | 5/7/0 | 58.8 | 100.0/58.8/58.8 |
| pressly__sup | cdxgen | 5/0/7 | 58.8 | 5/0/0 | 100.0 | 5/0/0 | 100.0 | 58.8/100.0/100.0 |
| pressly__sup | cyclonedx-gomod | 6/0/6 | 66.7 | 5/1/0 | 90.9 | 5/1/0 | 90.9 | 66.7/90.9/90.9 |
| tchayen__triangolatte | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| teris-io__log | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| Allra-Fintech__mdv | syft | 9/0/6 | 75.0 | 6/3/0 | 80.0 | 6/3/0 | 80.0 | 75.0/80.0/80.0 |
| Allra-Fintech__mdv | trivy | 6/0/9 | 57.1 | 6/0/0 | 100.0 | 6/0/0 | 100.0 | 57.1/100.0/100.0 |
| Allra-Fintech__mdv | cdxgen | 6/0/9 | 57.1 | 6/0/0 | 100.0 | 6/0/0 | 100.0 | 57.1/100.0/100.0 |
| Allra-Fintech__mdv | cyclonedx-gomod | 6/0/9 | 57.1 | 6/0/0 | 100.0 | 6/0/0 | 100.0 | 57.1/100.0/100.0 |
| EngoEngine__engo | syft | 31/0/14 | 81.6 | 17/14/0 | 70.8 | 21/10/0 | 80.8 | 81.6/70.8/80.8 |
| EngoEngine__engo | trivy | 31/0/14 | 81.6 | 17/14/0 | 70.8 | 21/10/0 | 80.8 | 81.6/70.8/80.8 |
| EngoEngine__engo | cdxgen | 17/0/28 | 54.8 | 17/0/0 | 100.0 | 17/0/4 | 89.5 | 54.8/100.0/89.5 |
| EngoEngine__engo | cyclonedx-gomod | 24/0/21 | 69.6 | 17/7/0 | 82.9 | 17/7/4 | 75.6 | 69.6/82.9/75.6 |
| augmentable-dev__tickgit | syft | 39/0/86 | 47.6 | 19/20/0 | 65.5 | 19/20/0 | 65.5 | 47.6/65.5/65.5 |
| augmentable-dev__tickgit | trivy | 125/0/0 | 100.0 | 19/106/0 | 26.4 | 19/106/0 | 26.4 | 100.0/26.4/26.4 |
| augmentable-dev__tickgit | cdxgen | 19/0/106 | 26.4 | 19/0/0 | 100.0 | 19/0/0 | 100.0 | 26.4/100.0/100.0 |
| augmentable-dev__tickgit | cyclonedx-gomod | 21/0/104 | 28.8 | 19/2/0 | 95.0 | 19/2/0 | 95.0 | 28.8/95.0/95.0 |
| avahidi__interpol | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| aybabtme__portproxy | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| aytechnet__decimal | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| dakera-ai__dakera-go | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| daneharrigan__hipchat | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| daveshanley__vacuum | syft | 129/2/113 | 69.2 | 94/37/0 | 83.6 | 95/36/0 | 84.1 | 67.9/81.0/81.5 |
| daveshanley__vacuum | trivy | 98/1/144 | 57.5 | 94/5/0 | 97.4 | 95/4/0 | 97.9 | 56.5/94.5/95.0 |
| daveshanley__vacuum | cdxgen | 95/0/147 | 56.4 | 94/1/0 | 99.5 | 94/1/1 | 98.9 | 55.4/96.4/95.9 |
| daveshanley__vacuum | cyclonedx-gomod | 96/0/146 | 56.8 | 94/2/0 | 98.9 | 94/2/1 | 98.4 | 56.8/98.9/98.4 |
| drone__drone | syft | 289/1/512 | 53.0 | 217/73/0 | 85.6 | 222/68/0 | 86.7 | 53.0/85.6/86.7 |
| drone__drone | trivy | 229/0/572 | 44.5 | 217/12/0 | 97.3 | 222/7/0 | 98.4 | 44.5/97.3/98.4 |
| drone__drone | cdxgen | 229/1/572 | 44.4 | 217/13/0 | 97.1 | 222/8/0 | 98.2 | 44.4/97.1/98.2 |
| drone__drone | cyclonedx-gomod | 223/0/578 | 43.6 | 216/7/1 | 98.2 | 216/7/6 | 97.1 | 43.6/98.2/97.1 |
| elastic__go-freelru | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| elgopher__pi | syft | 22/0/20 | 68.8 | 10/12/0 | 62.5 | 14/8/0 | 77.8 | 68.8/62.5/77.8 |
| elgopher__pi | trivy | 21/0/21 | 66.7 | 10/11/0 | 64.5 | 14/7/0 | 80.0 | 66.7/64.5/80.0 |
| elgopher__pi | cdxgen | 10/0/32 | 38.5 | 10/0/0 | 100.0 | 10/0/4 | 83.3 | 38.5/100.0/83.3 |
| elgopher__pi | cyclonedx-gomod | 15/0/27 | 52.6 | 10/5/0 | 80.0 | 10/5/4 | 69.0 | 52.6/80.0/69.0 |
| enetx__tg | syft | 8/0/3 | 84.2 | 7/1/0 | 93.3 | 7/1/0 | 93.3 | 84.2/93.3/93.3 |
| enetx__tg | trivy | 7/0/4 | 77.8 | 7/0/0 | 100.0 | 7/0/0 | 100.0 | 77.8/100.0/100.0 |
| enetx__tg | cdxgen | 7/0/4 | 77.8 | 7/0/0 | 100.0 | 7/0/0 | 100.0 | 77.8/100.0/100.0 |
| enetx__tg | cyclonedx-gomod | 7/0/4 | 77.8 | 7/0/0 | 100.0 | 7/0/0 | 100.0 | 77.8/100.0/100.0 |
| erni27__imcache | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| netresearch__go-cron | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| neuronlabs__errors | syft | 4/0/1 | 88.9 | 1/3/0 | 40.0 | 4/0/0 | 100.0 | 88.9/40.0/100.0 |
| neuronlabs__errors | trivy | 5/0/0 | 100.0 | 1/4/0 | 33.3 | 4/1/0 | 88.9 | 100.0/33.3/88.9 |
| neuronlabs__errors | cdxgen | 1/0/4 | 33.3 | 1/0/0 | 100.0 | 1/0/3 | 40.0 | 33.3/100.0/40.0 |
| neuronlabs__errors | cyclonedx-gomod | 1/0/4 | 33.3 | 1/0/0 | 100.0 | 1/0/3 | 40.0 | 33.3/100.0/40.0 |
| nikolaydubina__fpdecimal | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| nikolaydubina__go-enum-encoding | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| primetalk__goio | syft | 8/0/5 | 76.2 | 3/5/0 | 54.5 | 7/1/0 | 93.3 | 76.2/54.5/93.3 |
| primetalk__goio | trivy | 7/0/6 | 70.0 | 3/4/0 | 60.0 | 7/0/0 | 100.0 | 70.0/60.0/100.0 |
| primetalk__goio | cdxgen | 3/0/10 | 37.5 | 3/0/0 | 100.0 | 3/0/4 | 60.0 | 37.5/100.0/60.0 |
| primetalk__goio | cyclonedx-gomod | 3/0/10 | 37.5 | 3/0/0 | 100.0 | 3/0/4 | 60.0 | 37.5/100.0/60.0 |
| qiniu__qmgo | syft | 24/0/8 | 85.7 | 16/8/0 | 80.0 | 21/3/0 | 93.3 | 85.7/80.0/93.3 |
| qiniu__qmgo | trivy | 32/0/0 | 100.0 | 16/16/0 | 66.7 | 21/11/0 | 79.2 | 100.0/66.7/79.2 |
| qiniu__qmgo | cdxgen | 16/0/16 | 66.7 | 16/0/0 | 100.0 | 16/0/5 | 86.5 | 66.7/100.0/86.5 |
| qiniu__qmgo | cyclonedx-gomod | 16/0/16 | 66.7 | 16/0/0 | 100.0 | 16/0/5 | 86.5 | 66.7/100.0/86.5 |
| qmuntal__opc | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| tylfin__dynatomic | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| ugorji__go | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| wI2L__jsondiff | syft | 4/0/0 | 100.0 | 4/0/0 | 100.0 | 4/0/0 | 100.0 | 100.0/100.0/100.0 |
| wI2L__jsondiff | trivy | 4/0/0 | 100.0 | 4/0/0 | 100.0 | 4/0/0 | 100.0 | 100.0/100.0/100.0 |
| wI2L__jsondiff | cdxgen | 4/0/0 | 100.0 | 4/0/0 | 100.0 | 4/0/0 | 100.0 | 100.0/100.0/100.0 |
| wI2L__jsondiff | cyclonedx-gomod | 4/0/0 | 100.0 | 4/0/0 | 100.0 | 4/0/0 | 100.0 | 100.0/100.0/100.0 |
| wesovilabs__koazee | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| MUlt1mate__protoc-gen-httpgo | syft | 9/75/1 | 19.1 | 2/82/0 | 4.7 | 3/81/0 | 6.9 | 5.7/4.1/6.1 |
| MUlt1mate__protoc-gen-httpgo | trivy | 9/57/1 | 23.7 | 2/64/0 | 5.9 | 3/63/0 | 8.7 | 9.5/5.3/7.8 |
| MUlt1mate__protoc-gen-httpgo | cdxgen | 8/44/2 | 25.8 | 2/50/0 | 7.4 | 3/49/0 | 10.9 | 5.8/6.6/6.5 |
| MUlt1mate__protoc-gen-httpgo | cyclonedx-gomod | 2/0/8 | 33.3 | 2/0/0 | 100.0 | 2/0/1 | 80.0 | 33.3/100.0/80.0 |
| Masterminds__squirrel | syft | 5/7/0 | 58.8 | 2/10/0 | 28.6 | 5/7/0 | 58.8 | 55.6/26.7/55.6 |
| Masterminds__squirrel | trivy | 5/14/0 | 41.7 | 2/17/0 | 19.0 | 5/14/0 | 41.7 | 40.0/18.2/40.0 |
| Masterminds__squirrel | cdxgen | 2/0/3 | 57.1 | 2/0/0 | 100.0 | 2/0/3 | 57.1 | 57.1/100.0/57.1 |
| Masterminds__squirrel | cyclonedx-gomod | 2/0/3 | 57.1 | 2/0/0 | 100.0 | 2/0/3 | 57.1 | 57.1/100.0/57.1 |
| PuerkitoBio__gocostmodel | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| atelpis__enflag | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| beatlabs__harvester | syft | 0/27/0 | 0.0 | 20/7/0 | 85.1 | 24/3/0 | 94.1 | 0.0/85.1/94.1 |
| beatlabs__harvester | trivy | 0/27/0 | 0.0 | 20/7/0 | 85.1 | 24/3/0 | 94.1 | 0.0/85.1/94.1 |
| beatlabs__harvester | cdxgen | 0/27/0 | 0.0 | 20/7/0 | 85.1 | 24/3/0 | 94.1 | 0.0/85.1/94.1 |
| beatlabs__harvester | cyclonedx-gomod | 0/21/0 | 0.0 | 20/1/0 | 97.6 | 20/1/4 | 88.9 | 0.0/97.6/88.9 |
| bitfield__script | syft | 10/0/13 | 60.6 | 3/7/0 | 46.2 | 6/4/0 | 75.0 | 60.6/46.2/75.0 |
| bitfield__script | trivy | 7/0/16 | 46.7 | 3/4/0 | 60.0 | 6/1/0 | 92.3 | 46.7/60.0/92.3 |
| bitfield__script | cdxgen | 3/0/20 | 23.1 | 3/0/0 | 100.0 | 3/0/3 | 66.7 | 23.1/100.0/66.7 |
| bitfield__script | cyclonedx-gomod | 3/0/20 | 23.1 | 3/0/0 | 100.0 | 3/0/3 | 66.7 | 23.1/100.0/66.7 |
| bobg__htree | syft | 5/0/5 | 66.7 | 2/3/0 | 57.1 | 4/1/0 | 88.9 | 66.7/57.1/88.9 |
| bobg__htree | trivy | 5/0/5 | 66.7 | 2/3/0 | 57.1 | 4/1/0 | 88.9 | 66.7/57.1/88.9 |
| bobg__htree | cdxgen | 2/0/8 | 33.3 | 2/0/0 | 100.0 | 2/0/2 | 66.7 | 33.3/100.0/66.7 |
| bobg__htree | cyclonedx-gomod | 2/0/8 | 33.3 | 2/0/0 | 100.0 | 2/0/2 | 66.7 | 33.3/100.0/66.7 |
| daviddengcn__go-colortext | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| deatil__go-datebin | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| deatil__go-jwt | syft | 2/0/3 | 57.1 | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 57.1/100.0/100.0 |
| deatil__go-jwt | trivy | 2/0/3 | 57.1 | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 57.1/100.0/100.0 |
| deatil__go-jwt | cdxgen | 2/0/3 | 57.1 | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 57.1/100.0/100.0 |
| deatil__go-jwt | cyclonedx-gomod | 2/0/3 | 57.1 | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 57.1/100.0/100.0 |
| fergusstrange__embedded-postgres | syft | 8/12/4 | 50.0 | 2/18/0 | 18.2 | 7/13/0 | 51.9 | 50.0/18.2/51.9 |
| fergusstrange__embedded-postgres | trivy | 8/8/4 | 57.1 | 2/14/0 | 22.2 | 7/9/0 | 60.9 | 57.1/22.2/60.9 |
| fergusstrange__embedded-postgres | cdxgen | 2/0/10 | 28.6 | 2/0/0 | 100.0 | 2/0/5 | 44.4 | 28.6/100.0/44.4 |
| fergusstrange__embedded-postgres | cyclonedx-gomod | 2/0/10 | 28.6 | 2/0/0 | 100.0 | 2/0/5 | 44.4 | 28.6/100.0/44.4 |
| firasdarwish__ore | syft | 4/3/2 | 61.5 | 4/3/0 | 72.7 | 4/3/0 | 72.7 | 61.5/72.7/72.7 |
| firasdarwish__ore | trivy | 4/3/2 | 61.5 | 4/3/0 | 72.7 | 4/3/0 | 72.7 | 61.5/72.7/72.7 |
| firasdarwish__ore | cdxgen | 4/2/2 | 66.7 | 4/2/0 | 80.0 | 4/2/0 | 80.0 | 66.7/80.0/80.0 |
| firasdarwish__ore | cyclonedx-gomod | 4/0/2 | 80.0 | 4/0/0 | 100.0 | 4/0/0 | 100.0 | 80.0/100.0/100.0 |
| fish-tennis__gnet | syft | 3/0/1 | 85.7 | 2/1/0 | 80.0 | 2/1/0 | 80.0 | 85.7/80.0/80.0 |
| fish-tennis__gnet | trivy | 3/0/1 | 85.7 | 2/1/0 | 80.0 | 2/1/0 | 80.0 | 85.7/80.0/80.0 |
| fish-tennis__gnet | cdxgen | 2/0/2 | 66.7 | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 66.7/100.0/100.0 |
| fish-tennis__gnet | cyclonedx-gomod | 2/0/2 | 66.7 | 2/0/0 | 100.0 | 2/0/0 | 100.0 | 66.7/100.0/100.0 |
| fortio__fortio | syft | 48/0/26 | 78.7 | 28/20/0 | 73.7 | 31/17/0 | 78.5 | 78.7/73.7/78.5 |
| fortio__fortio | trivy | 31/0/43 | 59.0 | 28/3/0 | 94.9 | 31/0/0 | 100.0 | 59.0/94.9/100.0 |
| fortio__fortio | cdxgen | 28/0/46 | 54.9 | 28/0/0 | 100.0 | 28/0/3 | 94.9 | 54.9/100.0/94.9 |
| fortio__fortio | cyclonedx-gomod | 28/0/46 | 54.9 | 28/0/0 | 100.0 | 28/0/3 | 94.9 | 54.9/100.0/94.9 |
| go-kod__kod | syft | 70/21/23 | 76.1 | 52/39/0 | 72.7 | 55/36/0 | 75.3 | 75.3/71.7/74.3 |
| go-kod__kod | trivy | 62/21/31 | 70.5 | 52/31/0 | 77.0 | 55/28/0 | 79.7 | 68.9/76.5/79.1 |
| go-kod__kod | cdxgen | 53/10/40 | 67.9 | 52/11/0 | 90.4 | 52/11/3 | 88.1 | 66.2/89.7/87.4 |
| go-kod__kod | cyclonedx-gomod | 55/0/38 | 74.3 | 49/6/3 | 91.6 | 49/6/6 | 89.1 | 74.3/91.6/89.1 |
| go-playground__pure | syft | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 100.0/100.0/100.0 |
| go-playground__pure | trivy | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 100.0/100.0/100.0 |
| go-playground__pure | cdxgen | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 100.0/100.0/100.0 |
| go-playground__pure | cyclonedx-gomod | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 100.0/100.0/100.0 |
| nkmr-jp__zl | syft | 12/15/5 | 54.5 | 7/20/0 | 41.2 | 10/17/0 | 54.1 | 48.0/35.0/46.5 |
| nkmr-jp__zl | trivy | 10/11/7 | 52.6 | 7/14/0 | 50.0 | 10/11/0 | 64.5 | 47.6/43.8/57.1 |
| nkmr-jp__zl | cdxgen | 7/9/10 | 42.4 | 7/9/0 | 60.9 | 7/9/3 | 53.8 | 37.8/51.9/46.7 |
| nkmr-jp__zl | cyclonedx-gomod | 7/0/10 | 58.3 | 7/0/0 | 100.0 | 7/0/3 | 82.4 | 58.3/100.0/82.4 |
| no-src__gofs | syft | 120/0/62 | 79.5 | 83/37/0 | 81.8 | 84/36/0 | 82.4 | 79.5/81.8/82.4 |
| no-src__gofs | trivy | 92/0/90 | 67.2 | 83/9/0 | 94.9 | 84/8/0 | 95.5 | 67.2/94.9/95.5 |
| no-src__gofs | cdxgen | 83/0/99 | 62.6 | 83/0/0 | 100.0 | 83/0/1 | 99.4 | 62.6/100.0/99.4 |
| no-src__gofs | cyclonedx-gomod | 91/0/91 | 66.7 | 83/8/0 | 95.4 | 83/8/1 | 94.9 | 66.7/95.4/94.9 |
| rafaeljesus__parallel-fn | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| rafaeljesus__retry-go | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| rbretecher__go-postman-collection | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| reaganiwadha__grapher | syft | 18/0/8 | 81.8 | 1/17/0 | 10.5 | 12/6/0 | 80.0 | 81.8/10.5/80.0 |
| reaganiwadha__grapher | trivy | 13/0/13 | 66.7 | 1/12/0 | 14.3 | 12/1/0 | 96.0 | 66.7/14.3/96.0 |
| reaganiwadha__grapher | cdxgen | 1/0/25 | 7.4 | 1/0/0 | 100.0 | 1/0/11 | 15.4 | 7.4/100.0/15.4 |
| reaganiwadha__grapher | cyclonedx-gomod | 1/0/25 | 7.4 | 1/0/0 | 100.0 | 1/0/11 | 15.4 | 7.4/100.0/15.4 |
| roblillack__spot | syft | 2/0/1 | 80.0 | 1/1/0 | 66.7 | 1/1/0 | 66.7 | 80.0/66.7/66.7 |
| roblillack__spot | trivy | 2/0/1 | 80.0 | 1/1/0 | 66.7 | 1/1/0 | 66.7 | 80.0/66.7/66.7 |
| roblillack__spot | cdxgen | 1/0/2 | 50.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 50.0/100.0/100.0 |
| roblillack__spot | cyclonedx-gomod | 1/0/2 | 50.0 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 50.0/100.0/100.0 |
| z5labs__bedrock | syft | 58/0/27 | 81.1 | 37/21/0 | 77.9 | 41/17/0 | 82.8 | 81.1/77.9/82.8 |
| z5labs__bedrock | trivy | 41/0/44 | 65.1 | 37/4/0 | 94.9 | 41/0/0 | 100.0 | 65.1/94.9/100.0 |
| z5labs__bedrock | cdxgen | 37/0/48 | 60.7 | 37/0/0 | 100.0 | 37/0/4 | 94.9 | 60.7/100.0/94.9 |
| z5labs__bedrock | cyclonedx-gomod | 37/0/48 | 60.7 | 37/0/0 | 100.0 | 37/0/4 | 94.9 | 60.7/100.0/94.9 |
| zerosnake0__goctx | syft | 7/0/1 | 93.3 | 1/6/0 | 25.0 | 6/1/0 | 92.3 | 93.3/25.0/92.3 |
| zerosnake0__goctx | trivy | 8/0/0 | 100.0 | 1/7/0 | 22.2 | 6/2/0 | 85.7 | 100.0/22.2/85.7 |
| zerosnake0__goctx | cdxgen | 1/0/7 | 22.2 | 1/0/0 | 100.0 | 1/0/5 | 28.6 | 22.2/100.0/28.6 |
| zerosnake0__goctx | cyclonedx-gomod | 1/0/7 | 22.2 | 1/0/0 | 100.0 | 1/0/5 | 28.6 | 22.2/100.0/28.6 |
| MonaxGT__gomalshare | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| PaddleHQ__go-aws-ssm | syft | 7/0/4 | 77.8 | 3/4/0 | 60.0 | 3/4/0 | 60.0 | 77.8/60.0/60.0 |
| PaddleHQ__go-aws-ssm | trivy | 4/0/7 | 53.3 | 3/1/0 | 85.7 | 3/1/0 | 85.7 | 53.3/85.7/85.7 |
| PaddleHQ__go-aws-ssm | cdxgen | 3/0/8 | 42.9 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 42.9/100.0/100.0 |
| PaddleHQ__go-aws-ssm | cyclonedx-gomod | 3/0/8 | 42.9 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 42.9/100.0/100.0 |
| amjadjibon__memsh | syft | 94/1/21 | 89.5 | 55/40/1 | 72.8 | 55/40/1 | 72.8 | 89.5/72.8/72.8 |
| amjadjibon__memsh | trivy | 59/1/56 | 67.4 | 55/5/1 | 94.8 | 55/5/1 | 94.8 | 67.4/94.8/94.8 |
| amjadjibon__memsh | cdxgen | 56/0/59 | 65.5 | 56/0/0 | 100.0 | 56/0/0 | 100.0 | 65.5/100.0/100.0 |
| amjadjibon__memsh | cyclonedx-gomod | 59/1/56 | 67.4 | 55/5/1 | 94.8 | 55/5/1 | 94.8 | 67.4/94.8/94.8 |
| axllent__mailpit | syft | 78/0/9 | 94.5 | 55/23/0 | 82.7 | 55/23/0 | 82.7 | 94.5/82.7/82.7 |
| axllent__mailpit | trivy | 57/0/30 | 79.2 | 55/2/0 | 98.2 | 55/2/0 | 98.2 | 79.2/98.2/98.2 |
| axllent__mailpit | cdxgen | 55/0/32 | 77.5 | 55/0/0 | 100.0 | 55/0/0 | 100.0 | 77.5/100.0/100.0 |
| axllent__mailpit | cyclonedx-gomod | 57/0/30 | 79.2 | 55/2/0 | 98.2 | 55/2/0 | 98.2 | 79.2/98.2/98.2 |
| bcicen__ctop | syft | 63/0/41 | 75.4 | 43/20/0 | 81.1 | 43/20/0 | 81.1 | 75.4/81.1/81.1 |
| bcicen__ctop | trivy | 55/0/49 | 69.2 | 43/12/0 | 87.8 | 43/12/0 | 87.8 | 69.2/87.8/87.8 |
| bcicen__ctop | cdxgen | 43/0/61 | 58.5 | 43/0/0 | 100.0 | 43/0/0 | 100.0 | 58.5/100.0/100.0 |
| bcicen__ctop | cyclonedx-gomod | 51/0/53 | 65.8 | 43/8/0 | 91.5 | 43/8/0 | 91.5 | 65.8/91.5/91.5 |
| bits-and-blooms__bloom | syft | 2/0/0 | 100.0 | 1/1/0 | 66.7 | 2/0/0 | 100.0 | 100.0/66.7/100.0 |
| bits-and-blooms__bloom | trivy | 2/0/0 | 100.0 | 1/1/0 | 66.7 | 2/0/0 | 100.0 | 100.0/66.7/100.0 |
| bits-and-blooms__bloom | cdxgen | 1/0/1 | 66.7 | 1/0/0 | 100.0 | 1/0/1 | 66.7 | 66.7/100.0/66.7 |
| bits-and-blooms__bloom | cyclonedx-gomod | 1/0/1 | 66.7 | 1/0/0 | 100.0 | 1/0/1 | 66.7 | 66.7/100.0/66.7 |
| bobg__combo | syft | 7/0/2 | 87.5 | 5/2/0 | 83.3 | 5/2/0 | 83.3 | 87.5/83.3/83.3 |
| bobg__combo | trivy | 5/0/4 | 71.4 | 5/0/0 | 100.0 | 5/0/0 | 100.0 | 71.4/100.0/100.0 |
| bobg__combo | cdxgen | 5/0/4 | 71.4 | 5/0/0 | 100.0 | 5/0/0 | 100.0 | 71.4/100.0/100.0 |
| bobg__combo | cyclonedx-gomod | 5/0/4 | 71.4 | 5/0/0 | 100.0 | 5/0/0 | 100.0 | 71.4/100.0/100.0 |
| chrislusf__vasto | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| desertbit__glue | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| detectlanguage__detectlanguage-go | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| didi__gendry | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| diegomarangoni__typenv | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| fxsjy__jieba | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| gabrie30__ghorg | syft | 0/66/0 | 0.0 | 53/13/0 | 89.1 | 53/13/0 | 89.1 | 0.0/79.1/79.1 |
| gabrie30__ghorg | trivy | 0/61/0 | 0.0 | 53/8/0 | 93.0 | 53/8/0 | 93.0 | 0.0/86.2/86.2 |
| gabrie30__ghorg | cdxgen | 0/55/0 | 0.0 | 53/2/0 | 98.1 | 53/2/0 | 98.1 | 0.0/90.6/90.6 |
| gabrie30__ghorg | cyclonedx-gomod | 0/55/0 | 0.0 | 53/2/0 | 98.1 | 53/2/0 | 98.1 | 0.0/98.1/98.1 |
| georgebuilds__anneal | syft | 40/0/12 | 87.0 | 23/17/0 | 73.0 | 32/8/0 | 88.9 | 87.0/73.0/88.9 |
| georgebuilds__anneal | trivy | 37/0/15 | 83.1 | 23/14/0 | 76.7 | 32/5/0 | 92.8 | 83.1/76.7/92.8 |
| georgebuilds__anneal | cdxgen | 23/0/29 | 61.3 | 23/0/0 | 100.0 | 23/0/9 | 83.6 | 61.3/100.0/83.6 |
| georgebuilds__anneal | cyclonedx-gomod | 27/0/25 | 68.4 | 23/4/0 | 92.0 | 23/4/9 | 78.0 | 68.4/92.0/78.0 |
| getfider__fider | syft | 247/0/118 | 80.7 | 40/207/0 | 27.9 | 40/207/0 | 27.9 | 80.7/27.9/27.9 |
| getfider__fider | trivy | 240/0/125 | 79.3 | 40/200/0 | 28.6 | 40/200/0 | 28.6 | 79.3/28.6/28.6 |
| getfider__fider | cdxgen | 40/0/325 | 19.8 | 40/0/0 | 100.0 | 40/0/0 | 100.0 | 19.8/100.0/100.0 |
| getfider__fider | cyclonedx-gomod | 240/0/125 | 79.3 | 40/200/0 | 28.6 | 40/200/0 | 28.6 | 79.3/28.6/28.6 |
| gookit__validate | syft | 6/6/2 | 60.0 | 3/9/0 | 40.0 | 6/6/0 | 66.7 | 52.2/33.3/57.1 |
| gookit__validate | trivy | 6/7/2 | 57.1 | 3/10/0 | 37.5 | 6/7/0 | 63.2 | 50.0/31.6/54.5 |
| gookit__validate | cdxgen | 3/0/5 | 54.5 | 3/0/0 | 100.0 | 3/0/3 | 66.7 | 54.5/100.0/66.7 |
| gookit__validate | cyclonedx-gomod | 3/0/5 | 54.5 | 3/0/0 | 100.0 | 3/0/3 | 66.7 | 54.5/100.0/66.7 |
| gorilla__mux | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| hyperboloide__lk | syft | 8/0/2 | 88.9 | 3/5/0 | 54.5 | 7/1/0 | 93.3 | 88.9/54.5/93.3 |
| hyperboloide__lk | trivy | 7/0/3 | 82.4 | 3/4/0 | 60.0 | 7/0/0 | 100.0 | 82.4/60.0/100.0 |
| hyperboloide__lk | cdxgen | 3/0/7 | 46.2 | 3/0/0 | 100.0 | 3/0/4 | 60.0 | 46.2/100.0/60.0 |
| hyperboloide__lk | cyclonedx-gomod | 3/0/7 | 46.2 | 3/0/0 | 100.0 | 3/0/4 | 60.0 | 46.2/100.0/60.0 |
| relvacode__iso8601 | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| restic__restic | syft | 122/0/162 | 60.1 | 85/37/0 | 82.1 | 86/36/0 | 82.7 | 60.1/82.1/82.7 |
| restic__restic | trivy | 93/0/191 | 49.3 | 85/8/0 | 95.5 | 86/7/0 | 96.1 | 49.3/95.5/96.1 |
| restic__restic | cdxgen | 85/0/199 | 46.1 | 85/0/0 | 100.0 | 85/0/1 | 99.4 | 46.1/100.0/99.4 |
| restic__restic | cyclonedx-gomod | 92/0/192 | 48.9 | 85/7/0 | 96.0 | 85/7/1 | 95.5 | 48.9/96.0/95.5 |
| rickb777__date | syft | 7/0/3 | 82.4 | 4/3/0 | 72.7 | 4/3/0 | 72.7 | 82.4/72.7/72.7 |
| rickb777__date | trivy | 5/0/5 | 66.7 | 4/1/0 | 88.9 | 4/1/0 | 88.9 | 66.7/88.9/88.9 |
| rickb777__date | cdxgen | 4/0/6 | 57.1 | 4/0/0 | 100.0 | 4/0/0 | 100.0 | 57.1/100.0/100.0 |
| rickb777__date | cyclonedx-gomod | 5/0/5 | 66.7 | 4/1/0 | 88.9 | 4/1/0 | 88.9 | 66.7/88.9/88.9 |
| rocketlaunchr__dbq | syft | 35/2/42 | 61.4 | 5/32/0 | 23.8 | 7/30/0 | 31.8 | 60.3/22.7/30.4 |
| rocketlaunchr__dbq | trivy | 77/2/0 | 98.7 | 5/74/0 | 11.9 | 7/72/0 | 16.3 | 97.5/11.6/15.9 |
| rocketlaunchr__dbq | cdxgen | 5/1/72 | 12.0 | 5/1/0 | 90.9 | 5/1/2 | 76.9 | 12.0/90.9/76.9 |
| rocketlaunchr__dbq | cyclonedx-gomod | 5/0/72 | 12.2 | 5/0/0 | 100.0 | 5/0/2 | 83.3 | 12.2/100.0/83.3 |
| rotisserie__eris | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| rqlite__gorqlite | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| AshvinBambhaniya__autopool | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| MauriceGit__skiplist | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| Pixboost__transformimgs | syft | 3/2/0 | 75.0 | 3/2/0 | 75.0 | 3/2/0 | 75.0 | 75.0/75.0/75.0 |
| Pixboost__transformimgs | trivy | 3/2/0 | 75.0 | 3/2/0 | 75.0 | 3/2/0 | 75.0 | 75.0/75.0/75.0 |
| Pixboost__transformimgs | cdxgen | 3/1/0 | 85.7 | 3/1/0 | 85.7 | 3/1/0 | 85.7 | 85.7/85.7/85.7 |
| Pixboost__transformimgs | cyclonedx-gomod | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 3/0/0 | 100.0 | 100.0/100.0/100.0 |
| asticode__go-astitodo | syft | 6/0/1 | 92.3 | 1/5/0 | 28.6 | 5/1/0 | 90.9 | 92.3/28.6/90.9 |
| asticode__go-astitodo | trivy | 5/0/2 | 83.3 | 1/4/0 | 33.3 | 5/0/0 | 100.0 | 83.3/33.3/100.0 |
| asticode__go-astitodo | cdxgen | 1/0/6 | 25.0 | 1/0/0 | 100.0 | 1/0/4 | 33.3 | 25.0/100.0/33.3 |
| asticode__go-astitodo | cyclonedx-gomod | 1/0/6 | 25.0 | 1/0/0 | 100.0 | 1/0/4 | 33.3 | 25.0/100.0/33.3 |
| biter777__countries | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| boot-go__boot | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| brunomvsouza__ynab.go | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| btnguyen2k__olaf | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| danieldk__go2vec | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| disintegration__imaging | syft | 1/0/1 | 66.7 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 66.7/100.0/100.0 |
| disintegration__imaging | trivy | 2/0/0 | 100.0 | 1/1/0 | 66.7 | 1/1/0 | 66.7 | 100.0/66.7/66.7 |
| disintegration__imaging | cdxgen | 1/0/1 | 66.7 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 66.7/100.0/100.0 |
| disintegration__imaging | cyclonedx-gomod | 1/0/1 | 66.7 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 66.7/100.0/100.0 |
| distatus__battery | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| donatj__mpo | syft | 1/0/1 | 66.7 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 66.7/100.0/100.0 |
| donatj__mpo | trivy | 1/0/1 | 66.7 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 66.7/100.0/100.0 |
| donatj__mpo | cdxgen | 1/0/1 | 66.7 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 66.7/100.0/100.0 |
| donatj__mpo | cyclonedx-gomod | 1/0/1 | 66.7 | 1/0/0 | 100.0 | 1/0/0 | 100.0 | 66.7/100.0/100.0 |
| dundee__gdu | syft | 65/0/13 | 90.9 | 39/26/0 | 75.0 | 42/23/0 | 78.5 | 90.9/75.0/78.5 |
| dundee__gdu | trivy | 44/0/34 | 72.1 | 39/5/0 | 94.0 | 42/2/0 | 97.7 | 72.1/94.0/97.7 |
| dundee__gdu | cdxgen | 39/0/39 | 66.7 | 39/0/0 | 100.0 | 39/0/3 | 96.3 | 66.7/100.0/96.3 |
| dundee__gdu | cyclonedx-gomod | 41/0/37 | 68.9 | 39/2/0 | 97.5 | 39/2/3 | 94.0 | 68.9/97.5/94.0 |
| eaigner__shield | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| go-ego__gse | syft | 2/0/0 | 100.0 | 1/1/0 | 66.7 | 2/0/0 | 100.0 | 100.0/66.7/100.0 |
| go-ego__gse | trivy | 2/0/0 | 100.0 | 1/1/0 | 66.7 | 2/0/0 | 100.0 | 100.0/66.7/100.0 |
| go-ego__gse | cdxgen | 1/0/1 | 66.7 | 1/0/0 | 100.0 | 1/0/1 | 66.7 | 66.7/100.0/66.7 |
| go-ego__gse | cyclonedx-gomod | 1/0/1 | 66.7 | 1/0/0 | 100.0 | 1/0/1 | 66.7 | 66.7/100.0/66.7 |
| go-external-config__vault | syft | 36/0/23 | 75.8 | 22/14/0 | 75.9 | 22/14/0 | 75.9 | 75.8/75.9/75.9 |
| go-external-config__vault | trivy | 29/0/30 | 65.9 | 22/7/0 | 86.3 | 22/7/0 | 86.3 | 65.9/86.3/86.3 |
| go-external-config__vault | cdxgen | 22/0/37 | 54.3 | 22/0/0 | 100.0 | 22/0/0 | 100.0 | 54.3/100.0/100.0 |
| go-external-config__vault | cyclonedx-gomod | 24/0/35 | 57.8 | 22/2/0 | 95.7 | 22/2/0 | 95.7 | 57.8/95.7/95.7 |
| go-playground__lars | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| jmcvetta__neoism | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| jonchun__pathtype | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| rjNemo__underscore | TIMEOUT_OR_EMPTY | NA | | NA | | NA | | |
| robinjoseph08__redisqueue | syft | 30/0/10 | 85.7 | 2/28/0 | 12.5 | 6/24/0 | 33.3 | 85.7/12.5/33.3 |
| robinjoseph08__redisqueue | trivy | 40/0/0 | 100.0 | 2/38/0 | 9.5 | 6/34/0 | 26.1 | 100.0/9.5/26.1 |
| robinjoseph08__redisqueue | cdxgen | 2/0/38 | 9.5 | 2/0/0 | 100.0 | 2/0/4 | 50.0 | 9.5/100.0/50.0 |
| robinjoseph08__redisqueue | cyclonedx-gomod | 17/0/23 | 59.6 | 2/15/0 | 21.1 | 3/14/3 | 26.1 | 59.6/21.1/26.1 |
| rubyist__circuitbreaker | syft | 3/0/0 | 100.0 | 2/1/0 | 80.0 | 3/0/0 | 100.0 | 100.0/80.0/100.0 |
| rubyist__circuitbreaker | trivy | 3/0/0 | 100.0 | 2/1/0 | 80.0 | 3/0/0 | 100.0 | 100.0/80.0/100.0 |
| rubyist__circuitbreaker | cdxgen | 2/0/1 | 80.0 | 2/0/0 | 100.0 | 2/0/1 | 80.0 | 80.0/100.0/80.0 |
| rubyist__circuitbreaker | cyclonedx-gomod | 2/0/1 | 80.0 | 2/0/0 | 100.0 | 2/0/1 | 80.0 | 80.0/100.0/80.0 |
| rulego__rulego | syft | 26/240/11 | 17.2 | 18/248/0 | 12.7 | 18/248/0 | 12.7 | 13.4/11.6/11.6 |
| rulego__rulego | trivy | 22/229/15 | 15.3 | 18/233/0 | 13.4 | 18/233/0 | 13.4 | 12.7/12.2/12.2 |
| rulego__rulego | cdxgen | 19/15/18 | 53.5 | 18/16/0 | 69.2 | 18/16/0 | 69.2 | 42.4/54.5/54.5 |
| rulego__rulego | cyclonedx-gomod | 19/0/18 | 67.9 | 18/1/0 | 97.3 | 18/1/0 | 97.3 | 67.9/97.3/97.3 |
| safedep__vet | syft | 572/1/560 | 67.1 | 437/136/0 | 86.5 | 437/136/0 | 86.5 | 67.1/86.5/86.5 |
| safedep__vet | trivy | NA | | NA | | NA | | |
| safedep__vet | cdxgen | 437/0/695 | 55.7 | 437/0/0 | 100.0 | 437/0/0 | 100.0 | 55.7/100.0/100.0 |
| safedep__vet | cyclonedx-gomod | 479/0/653 | 59.5 | 437/42/0 | 95.4 | 437/42/0 | 95.4 | 59.5/95.4/95.4 |
| saivedant169__AegisFlow | syft | 94/7/71 | 70.7 | 69/32/0 | 81.2 | 72/29/0 | 83.2 | 70.7/81.2/83.2 |
| saivedant169__AegisFlow | trivy | 72/7/93 | 59.0 | 69/10/0 | 93.2 | 72/7/0 | 95.4 | 59.0/93.2/95.4 |
| saivedant169__AegisFlow | cdxgen | 69/1/96 | 58.7 | 69/1/0 | 99.3 | 69/1/3 | 97.2 | 58.7/99.3/97.2 |
| saivedant169__AegisFlow | cyclonedx-gomod | 68/0/97 | 58.4 | 68/0/1 | 99.3 | 68/0/4 | 97.1 | 58.4/99.3/97.1 |
