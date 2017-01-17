#! /usr/bin/env node
const jokes      = require('./jokes.js')
const inquirer  = require('inquirer')

/**
 * Parse Arguments to get command and executing it
 */
let parseCommand = () => {
    
    /** remove two first arguments filename, path **/
    var arguments = process.argv.slice(2)

    /** If there is no argument print help **/
    if (arguments.length == 0) {
        printHelp()
        process.exit()
    }

    /** Get Command from the first argument **/
    switch (arguments[0]) {
        case "add":
            // TODO : add joke (after add firebase)
            break
        case "all":
            all()
            break
        case "random":
            random()
            break
        case "count":
            count()
            break
        case "search":
            search(arguments[1])
            break
        case "filter-by-lang":
            filterByLang(arguments[1])
            break
        case "filter-by-tag":
           filterByTag(arguments.slice(1))
            break
        default:
            // TODO : Unknown Arguments Error Msg
            break

    }
}

/**
 * Adding a joke process (feature)
 */
let add = () => {
    inquirer.prompt({
            type    : 'list',
            name    : 'lang',
            message : 'What is the language of your joke ?',
            choices : ['ar', 'fr', 'en']
        },{
            type    : 'input',
            name    : 'joke',
            message : 'tape your joke : '  
        },{
            type    : 'input',
            name    : 'img',
            message : 'image (url) : '  
        },{
            type    : 'input',
            name    : 'tags',
            message : 'tags : '  

    }).then(function (answers) {
        console.log('your answer is : ' + answers.joke)
    })    
}

/**
 * Get all jokes and printing them
 */
let all = () => {
    let result = jokes.all()
    printJson(result)
}

/**
 * Get a random joke and printing it
 */
let random = () => {
    let  result = jokes.random()
    printJson(result)
}

/**
 * Get count jokes and print it
 */
let count = () => {
    let result = jokes.count();
    console.log(result)
}

/**
 * filter jokes by tags and printing them
 * @param {RegExp} "." => all if there is no arguement
 */
let search = (regx = ".") => {
    let result = jokes.search(regx)
    printJson(result)
}

/**
 * filter jokes by lang and printing them
 * @param {String}
 */
let filterByLang = (lang = "") => {
    let result = jokes.filterByLang(lang)
    printJson(result)
}

/**
 * filter jokes by tags and printing them
 * @param {Array}
 */
let filterByTag = (tags = []) => {
    if (tags.length < 1) {
        // TODO : Error Msg
        process.exit()
    }
    let result = jokes.filterByTag(tags)
    printJson(result)
}

/**
 * Print Help
 */
let printHelp = () => {
    console.log("HEEEEEEELP")
    // TODO: more help
}

/**
 * Print pretty json
 */
let printJson = (obj) => {
    console.log(JSON.stringify(obj, null, 4));
}

/** Start Executing **/
parseCommand()