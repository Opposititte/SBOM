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
