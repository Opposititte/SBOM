# SBOM精度評価: 3つの正解(all/imported/imported+test) × name一致・version一致

全 awesome-go 1489 repo を対象に計測（取得不可15件＋ツール出力欠落を除外）。値は repo 単位 macro 平均の F1/precision/recall(%)。

有効評価 repo 数: syft=1474, trivy=1468, cdxgen=1451, cyclonedx-gomod=1464

## name 一致

| ツール | precision (all/imp/impT) | recall (all/imp/impT) | f1 (all/imp/impT) |
|---|---|---|---|
| syft | 91.8 / 56.5 / 65.8 | 66.6 / 99.9 / 95.3 | **72.3 / 67.9 / 74.9** |
| trivy | 91.4 / 58.8 / 68.5 | 68.2 / 99.9 / 95.2 | **73.0 / 68.2 / 75.1** |
| cdxgen | 94.0 / 92.7 / 88.2 | 42.1 / 99.8 / 78.1 | **52.5 / 94.3 / 78.2** |
| cyclonedx-gomod | 99.0 / 93.6 / 88.6 | 43.2 / 99.2 / 77.0 | **56.0 / 95.5 / 78.5** |

## version 一致

| ツール | precision (all/imp/impT) | recall (all/imp/impT) | f1 (all/imp/impT) |
|---|---|---|---|
| syft | 90.4 / 55.8 / 58.3 | 66.0 / 99.8 / 84.8 | **71.4 / 67.2 / 66.3** |
| trivy | 90.1 / 58.2 / 60.6 | 67.5 / 99.8 / 84.8 | **72.0 / 67.6 / 66.5** |
| cdxgen | 93.0 / 92.0 / 77.6 | 41.7 / 99.7 / 68.3 | **51.9 / 93.8 / 68.5** |
| cyclonedx-gomod | 98.9 / 93.5 / 78.4 | 43.1 / 99.1 / 67.3 | **55.9 / 95.4 / 69.1** |

