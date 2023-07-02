#!/usr/bin/env node

const { cosmiconfig } = require( "cosmiconfig" );
const chalk = require( "chalk" );
const path = require('path');
const fs = require('fs');


const { info } = console;

/**
 * Paths
 */

const root = './';
const helperIndex = path.resolve(root, 'node_modules/kotion/helpers/index.js');

/**
* ----------------------------------------------------------
*/

const filterConfig = ( config ) => {
  if ( typeof( config ) === "string" ) {
    return config.split( " " );
  }
  return config;
};

const displayError = ( title ) => {
  info( chalk.red( ">" ), chalk.bold.red( title ) );
};

/**
 * @param {string} newToken
 */
const replaceNotionToken = ( newToken ) => {
  fs.readFile(helperIndex, 'utf-8', (error, data) => {
    if (error) throw error;

    fs.writeFile(helperIndex, data.replace(/auth: (.)*,/g, `auth: "${newToken}",`), (wError) => { if (wError) throw wError });
  })
};


/**
 * ---------
 */
const runScript = () => {
  // Script start message
  info( chalk.gray( "> kotion" ) );

  const explorer = cosmiconfig( "kotion" );

  explorer.search()
    .then( ( result ) => {
      if ( result === null ) {
        return displayError( "missing \"kotion\" key in package.json" );
      }

      const packageConfig = filterConfig( result.config );

      if (typeof packageConfig.token !== "string") {
        return displayError( "missing \"kotion.token\" key in package.json" );
      }

      replaceNotionToken(packageConfig.token);

    } )
    .catch( ( error ) => {
      info( chalk.red( error ) );
    } );
};

runScript();