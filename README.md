
## Install

全局引入
```bash
npm i @wont/utils -S
```

```js
import utils from '@wont/utils'

utils.getUrlParam()
```

按需引入（推荐）

```js
import { getUrlParam } from '@wont/utils'

getUrlParam()
```

## script
> 如需使用script，需要自行打包上传

```html
<script src="xxx.js" type="text/javascript"></script>

<script>
    window.onload = function () {
        wontUtils.getUrlParam()
    }
</script>
```

## Links

- [Documentation](https://wont-org.github.io/utils/)
- [Changelog](https://wont-org.github.io/utils/common/CHANGELOG.html)

## LICENSE

[MIT](https://en.wikipedia.org/wiki/MIT_License)