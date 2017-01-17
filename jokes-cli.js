#! /usr/bin/env node
const jokes      = require('jokes.dz')
const inquirer   = require('inquirer')

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
        case "help":
            printHelp()
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
            throw new Error('Unknown Command ~ use "jokes-cli help" command')
            break

    }
}

/**
 * Get all jokes and printing them
 */
let all = () => {
    let result = jokes.all
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
    let result = jokes.count;
    console.log('Jokes count : ' + result)
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
    console.log("Jokes-cli : help")
    console.log("It's your typical Algeria Jokes now residing on your own terminal")
    console.log("Arguments : ")
    console.log(" - all\t: get all jokes")
    console.log(" - random\t: get a random joke")
    console.log(" - count\t: get number of jokes")
    console.log(" - search\t: find jokes by a regular expression 'jokes-cli search regex'")
    console.log(" - filter-by-lang\t: filter jokes by language 'jokes-cli filter-by-lang fr'")
    console.log(" - filter-by-tag\t: filter jokes by tag 'jokes-cli filter-by-tag tag1 tag2'")
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