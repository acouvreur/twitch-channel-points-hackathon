## [1.4.1](https://github.com/acouvreur/twitch-channel-points-hackathon/compare/v1.4.0...v1.4.1) (2021-03-29)


### Bug Fixes

* remove extra midi message types ([d8eaab3](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/d8eaab323a90ab98fc413930a20871b2e63b1d05))

# [1.4.0](https://github.com/acouvreur/twitch-channel-points-hackathon/compare/v1.3.0...v1.4.0) (2021-03-29)


### Bug Fixes

* add promise parameter to waitForAuthentication ([d820ad7](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/d820ad7318164802ef8cd21277cc0dffaf2b9932))
* fix backend errors ([bea9d4f](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/bea9d4f52c1c6bd816d03f9c8306294c07695249))


### Features

* require all needed scope on startup ([25648a5](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/25648a59ea08a2bcc54de23fa70f783ac99bc7fe))

# [1.3.0](https://github.com/acouvreur/twitch-channel-points-hackathon/compare/v1.2.9...v1.3.0) (2021-03-27)


### Bug Fixes

* add small description on potion amplifier ([846d204](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/846d2040e23aa9ccc0f633e49786756f0cb881c8))
* change game reward filtering description ([c7bcaba](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/c7bcaba40d98ea287ca9ba8d983ba84a31778062))
* correct minor typo ([2ce45f6](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/2ce45f662abf1a1da0b012c2634ad79b937e4223))
* correct text field input as number ([1aa17a0](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/1aa17a08cbcabc7437f8193ff277e871ea332209))
* remove user input required option as we do not handle user input for now ([a75c9cb](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/a75c9cb870aa41a11477928c1fa17b49bf22d5d2))
* set default value for potions settings ([ce2798a](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/ce2798a0c808ed091192735c1c489eb3c2f209f0))
* set port to 8080 ([1a1cf7a](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/1a1cf7a3779da86f3327808500665889ed0f143f))


### Features

* add app icon, name and description ([5741123](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/5741123a61e9af68dfe0d1c2defba6bfaee56391))
* add logging to show config used ([bec239d](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/bec239d2302d061bd294637a303b2c9e0569595d))
* add version in start log ([b2c6745](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/b2c67453d7727bdfe64f3f46a45b5f13fc263703))
* use a select for potions amplifier ([8f2cfea](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/8f2cfeae86a7bb10dc45b12266318d61bd02bc1b))
* use config with default values ([a0be1ab](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/a0be1abac19388720b2c3fcb3fabd06a3d8b3196))



## [1.2.8](https://github.com/acouvreur/twitch-channel-points-hackathon/compare/v1.2.7...v1.2.8) (2021-03-24)


### Bug Fixes

* add cross-env because WINDOWS ([c29fcb1](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/c29fcb1cd54905c4616c2e2d18ac714966feec88))

## [1.2.7](https://github.com/acouvreur/twitch-channel-points-hackathon/compare/v1.2.6...v1.2.7) (2021-03-24)


### Bug Fixes

* set CI=false because windows CRLF ([09b93dd](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/09b93dd8be4a8e2acbf88d0fd185d8ab6b69f47e))

## [1.2.6](https://github.com/acouvreur/twitch-channel-points-hackathon/compare/v1.2.5...v1.2.6) (2021-03-24)


### Bug Fixes

* run build before release ([3c02144](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/3c021446eef9d4bf3caa279d69362f8ef21bc70f))
* use cd to install in frontend and backend ([16c7afd](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/16c7afd3e08d8af57b7873778aef118ee65796a4))

## [1.2.6](https://github.com/acouvreur/twitch-channel-points-hackathon/compare/v1.2.5...v1.2.6) (2021-03-24)


### Bug Fixes

* use cd to install in frontend and backend ([16c7afd](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/16c7afd3e08d8af57b7873778aef118ee65796a4))

## [1.2.5](https://github.com/acouvreur/twitch-channel-points-hackathon/compare/v1.2.4...v1.2.5) (2021-03-23)


### Bug Fixes

* remove electron-rebuild path ([93c4c16](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/93c4c1662555fd6fd55cb7696ef6277b3068a30f))

## [1.2.4](https://github.com/acouvreur/twitch-channel-points-hackathon/compare/v1.2.3...v1.2.4) (2021-03-23)


### Bug Fixes

* use --cwd option with --prefix to avoid issue on windows ([61c4b0a](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/61c4b0a130718f00a95243f24b110412299884ab))


### Reverts

* Revert "fix: remove preinstall to avoid windows issue with --prefix option" ([c8538f8](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/c8538f81d22568762850d235011c3adb8359fd5d))

## [1.2.3](https://github.com/acouvreur/twitch-channel-points-hackathon/compare/v1.2.2...v1.2.3) (2021-03-23)


### Bug Fixes

* remove preinstall to avoid windows issue with --prefix option ([388964b](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/388964b78872f5f85931cf0d6e8bd48b68a3ebdf))

## [1.2.2](https://github.com/acouvreur/twitch-channel-points-hackathon/compare/v1.2.1...v1.2.2) (2021-03-23)


### Bug Fixes

* remove unused variable ([8268386](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/8268386371b7377b38bbfb97ac4614a8e66a808e))

## [1.2.1](https://github.com/acouvreur/twitch-channel-points-hackathon/compare/v1.2.0...v1.2.1) (2021-03-23)


### Bug Fixes

* correct startsWith expression ([beb61fd](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/beb61fd9f4a48d2237b01ce1ca2e50d7bb22e4c7))

# [1.2.0](https://github.com/acouvreur/twitch-channel-points-hackathon/compare/v1.1.0...v1.2.0) (2021-03-23)


### Features

* relase using PAT to trigger electron release ([a469a1c](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/a469a1c1a45e4d44f4e0e860a1adc0ebfc83894a))

# [1.1.0](https://github.com/acouvreur/twitch-channel-points-hackathon/compare/v1.0.0...v1.1.0) (2021-03-23)


### Features

* trigger electron release on tag ([f6ba538](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/f6ba5381452f638f1d2726c86e94c6b3cd4aca20))

# 1.0.0 (2021-03-23)


### Bug Fixes

* avoid exiting server if midi output is not found ([2b519c3](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/2b519c36a7c2a542753a0a4d5651315b94f51f51))
* pass redemption message and params to plugins ([60a1b91](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/60a1b91a469b6e6597da232b21f3c2fa93537a11))
* update reward was attempting to create a new one ([c2f6a80](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/c2f6a80785e5c3eea0c0033601733ae09740ea1b))
* wait for authentication before instantiating apiClient and do not crash if token.json does not exist ([ac9db6a](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/ac9db6ab9329ff3290872d406689d368dbab34ff))


### Features

* add electron ([d75318f](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/d75318f5f5fd7d064a26bedf479d81e3a98b49b0))
* add version in window title ([0188562](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/0188562e4d733c3ceba13ecf5975cc02557fe705))
* add weather api integration ([bf8b8a4](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/bf8b8a495204c84fe602f2a48ebb85d5e1ff6a0f))
* add weather form ([827adda](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/827adda1dfd6962c0930fda8723053789a35782f))
* fulfill or cancel redemptions ([b8ada7e](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/b8ada7e0a63b47a12d7912e6768fe0558a9dfd20))
* Project setup ([761d0b7](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/761d0b7e969d9bf6a4ff7f5c64ddc2482f3496e4))
* support MIDI on windows and unix platforms ([497da8d](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/497da8d76ff48e93698da1626c6efb0c8acacccf))
