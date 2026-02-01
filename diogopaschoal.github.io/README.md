# diogopaschoal.github.io

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

---

## Patch: `progress-webpack-plugin` 🔧

This project applies a local patch to `progress-webpack-plugin` to ensure compatibility with the webpack version used by `@vue/cli-service` in this repo.

- Patch file: `patches/progress-webpack-plugin+1.0.16.patch`
- Applied automatically by `patch-package` via the `postinstall` script in `package.json`.

Why: the original package passes options that fail webpack's schema validation and uses hook interception behavior that can be incompatible with certain tapable/webpack versions. The patch removes unsupported options and adds compatibility fallbacks so the dev server runs reliably.

When updating dependencies: run `npm install` to reapply patches. If you change files in `node_modules` and want to persist the change, run `npx patch-package <pkg>` to regenerate the patch.
