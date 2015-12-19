# I Support Jolla #

I Support Jolla is an initiative and website to support, as a community, Jolla!

## Open Source ##

Open source is integral to Sailors around the world. Jolla prides itself on being transparent and it only makes sense for us to do the same. I Support Jolla is licensed under Apache 2.0!

## Contributing ##

I Support Jolla is built using [LESS](http://lesscss.org) and [TypeScript](http://typescriptlang.org), as well as leverage [CodeUtils](https://github.com/StroblIndustries/CodeUtils). You can set up LESS and TypeScript via NPM and CodeUtils via the instructions on its repo.

You contribute, you will first need to set up CodeUtils on your local system and symlinking the `compiler` utility to `build/compiler` (*in this project*).

### Building ###

#### HTML ####

Work on HTML is done at `src/html`. After making changes, run `build/compiler html` to copy the HTML file.

#### LESS ####

In addition to LESS, you also need:

- [less-plugin-clean-css](https://www.npmjs.com/package/less-plugin-clean-css)
- [less-plugin-glob](https://www.npmjs.com/package/less-plugin-glob)

Work on LESS is done at `src/less`. After making changes, run `build/compiler less`. It will attempt to compile and, if successful, store compress CSS in `build/` as well as `tests/design/css`.

#### TypeScript ####

In addition to TypeScript, you also need:

- [Google Closure Compiler](https://www.npmjs.com/package/closurecompiler).
- [Zopfli](https://github.com/google/zopfli)

Work on TypeScript is done at `src/typescript`. After making changes, run `build/compiler typescript`. It will attempt to compile and, if successful, store compress JS in `build/` as well as `tests/design/js`

## TODO ##

1. Automate (likely in CodeUtils) LibreJS license info adding.
2. Favicon maybe? Designers welcome.
3. Ability to submit letters of support via site and not just email.
4. Multi-language, translation support and backend.
5. Community section will resources such as blogs, developer documentation, etc.
6. New landing page at some point.