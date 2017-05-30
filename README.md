# ManuScrip.ts
ManuScripts is a lightweight application for science journal publications.

## Setup
You must have Node.js installed

```sh
$ npm install
$ npm start
```

**Note: User inputs must use single quotes when entering a multi-word arguments**

## Author Registration
To register as an author, simply supply the author's username, first name, last name, email address, affiliation, and address. For example:
```
$ => register author yusufO Yusuf Olokoba olokobayusuf@gmail.com 'Dartmouth College' 'Hinman box 2982, Hanover, NH'
```
You will then be shown a welcome message and given the ability to use the author UI. Note that when in authentication mode, you will be prompted for a password for your account.

## Editor Registration
To register as an editor, simply supply a username, first and last names:
```
$ => register editor kfarmer Kevin Farmer
```
You will then be shown a welcome message and given the ability to use the editor UI. Note that when in authentication mode, you will be prompted for a password for your account.

## Reviewer Registration
To register as a reviewer, simply supply your username, first name, last name, email, affiliation and between one and three RI codes:
```
$ => register reviewer ccpalmer Chris Palmer chris@gmail.com 'Dartmouth College' 1 2 3
```
You will then be shown a welcome message and given the ability to use the reviewer UI. Note that when in authentication mode, you will be prompted for a password for your account. Also note that you must provide the appropriate number of RI codes.

## Logging In
To login, use the `login` command with your username:

```
$ => login kfarmer
```
You will then be shown a welcome message and given the ability to use the UI that corresponds to your user type.


## Logging Out and Exiting

To logout, use the `logout` command:

```
$ => logout
```

To exit the app, you must first log out. Once logged out, you can use either the `exit` or `quit` commands to exit:

```
$ => exit
$ => quit
```

### When logged in as an author:

```
$ submit <title> <RICode> (author2) (author3) (author4)
```

```
$ status
```

```
$ retract <manu#>
```


### When logged in as an editor:

```
$ status
```

```
$ list reviewers
```

```
$ list issue
```

```
$ assign <manu#> <reviewer id>
```

```
$ reject <manu#>
```

```
$ accept <manu#>
```

```
$ typeset <manu#> <pages>
```

```
$ schedule <manu#> <issue>
```

```
$ publish <issue>
```

### When logged in as a reviewer:

```
$ resign
```

```
$ status
```

```
$ accept <manu#> <appropriateness> <clarity> <methodology> <contribution>
```

```
$ reject <manu#> <appropriateness> <clarity> <methodology> <contribution>
```


## Performing Tasks
See the [ManuScripts Specification](http://www.cs.dartmouth.edu/~cs61/Labs/Lab%203/).


## Dependencies
- Node.js

## Credits
- [Kevin Farmer](mailto:kevin.r.farmer.18@dartmouth.edu)
- [Yusuf Olokoba](mailto:olokobayusuf@gmail.com)
