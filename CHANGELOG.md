## [1.2.9](https://github.com/acouvreur/twitch-channel-points-hackathon/compare/v1.2.8...v1.2.9) (2021-03-24)


### Bug Fixes

* add git config eol lf because WINDOWS ([e8105d8](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/e8105d899ba63517c2436926782765a51988a9c0))


### Features

* add app icon, name and description ([8205d10](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/8205d101eba68a3aeb208171ffd5b4175022c9b8))
* use config with default values ([2e245ef](https://github.com/acouvreur/twitch-channel-points-hackathon/commit/2e245ef3398724ef12e1fc62ce31f172794a3d76))

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
