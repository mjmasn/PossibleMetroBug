# Possible Metro Bug
I will never get these past three weeks of my life back.

## React Native Info
```
  React Native Environment Info:
    System:
      OS: Linux 4.15 Ubuntu 16.04.5 LTS (Xenial Xerus)
      CPU: x64 Intel(R) Core(TM) i7-7700 CPU @ 3.60GHz
      Memory: 1.04 GB / 15.54 GB
      Shell: 4.3.48 - /bin/bash
    Binaries:
      Node: 8.11.0 - ~/.nvm/versions/node/v8.11.0/bin/node
      Yarn: 1.9.4 - /usr/bin/yarn
      npm: 5.6.0 - ~/.nvm/versions/node/v8.11.0/bin/npm
      Watchman: 4.9.0 - /usr/local/bin/watchman
    SDKs:
      Android SDK:
        Build Tools: 23.0.1, 26.0.1, 26.0.2, 26.0.3, 27.0.0, 27.0.3
        API Levels: 16, 19, 22, 23, 26, 27
    IDEs:
      Android Studio: 3.1 AI-173.4670197
    npmPackages:
      react: 16.4.1 => 16.4.1 
      react-native: 0.56.0 => 0.56.0 
    npmGlobalPackages:
      create-react-native-app: 1.0.0
      react-native-cli: 2.0.1
      react-native-git-upgrade: 0.2.7
```

<s>This bug seems to occur in all bundle outputs, however somehow only crashes on iOS in Release mode. I do not understand but I do have a reproduction:</s> This crashes in release mode for both iOS and Android.

[This commit](https://github.com/mjmasn/PossibleMetroBug/commit/5304d2ec365f04a03a21a96293d1243bae5e01f2) breaks the generated code.

Seems like using Platform.OS checks somehow causes an imported variable to be shadowed by the child function's params.

**Expected output:**
```
A2 = {default:{styles:{}};
B = function (A) {
  return function B() {
    console.log(A2.default.styles) // {}
  }
}(A2.default);
```

**Actual output:**
```
A = {default:{styles:{}};
B = function (A) {
  return function B() {
    console.log(A.default.styles) // undefined
  }
}(A.default);
```

**bundle.js (working):**
```
  var _Parent2 = babelHelpers.interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));

  var Child = function (_Parent) {
```

**bundle2.js (not working):**
```
  var _Parent = babelHelpers.interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));

  var Child = function (_Parent) {
```
