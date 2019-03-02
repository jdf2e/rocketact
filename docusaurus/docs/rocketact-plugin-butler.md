---
id: rocketact-plugin-butler
title: rocketact-plugin-butler
---

Rocketact support the project bundle which developed with @jdcfe/butler. The `rocketact-plugin-butler` make this happen.

It just does one important thing that makes `Rocketact` understand the project entry with @jdcfe/butler.

Diff between Rocketact and Butler:

```diff
# @jdcfe/butler
 .
 ├── src
 │   ├── css
-│   ├── html
-│   └── js
 │       ├── pages

# Rocketact
 .
 └── src
!│   ├── pages
```
