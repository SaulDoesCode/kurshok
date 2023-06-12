import chokidar from 'chokidar'
import express from 'express'
import compression from 'compression'
import {minify} from 'terser'
import {optimize} from 'svgo'
import path from 'path'
import fs from 'fs'
import {transform} from 'lightningcss'
import htmlnano from 'htmlnano'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)


const args = process.argv.slice(2)
const watchMode = args.includes('--watch')

const ignoredFileParts = '.png .ico media'.split(' ')

const cleanupDist = (windowsOnly = true) => {
    if (process.platform !== 'win32' || windowsOnly) return
    fs.readdir('./dist', (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }
        files.forEach((file) => {
            if (ignoredFileParts.some(i => file.includes(i))) return
            const filePath = path.join('./dist', file);
            fs.unlink(filePath, err => err && console.error('Error deleting file:', filePath, err))
        })
    })
}

cleanupDist()

const handles = {
    async js(name, c) {
        try {
            return (await minify(c, {sourceMap: true})).code
        } catch(e) {
            console.error('Error minifying JavaScript:', e)
            return c
        }
    },
    async css(filename, c) {
        try {
            return transform({filename, code: Buffer.from(c), minify: true, sourceMap: false}).code
        } catch(e) {
            console.error('Error minifying CSS:', e)
            return c
        }
    },
    async html(name, c) {
        const options = {
            removeEmptyAttributes: false, // Disable the module "removeEmptyAttributes"
            collapseWhitespace: 'conservative' // Pass options to the module "collapseWhitespace"
        }
        // posthtml, posthtml-render, and posthtml-parse options
        const postHtmlOptions = {
            // sync: true, // https://github.com/posthtml/posthtml#usage
            // lowerCaseTags: true, // https://github.com/posthtml/posthtml-parser#options
            // quoteAllAttributes: false, // https://github.com/posthtml/posthtml-render#options
        }
        try {
            return (await htmlnano.process(c, options, postHtmlOptions)).html
        } catch(e) {
            console.error('Error minifying HTML:', e)
            return c
        }
    },
    async svg(path, c) {
        try {
            return optimize(c, {path, multipass: true}).data
        } catch(e) {
            console.error('Error minifying SVG:', e)
            return c
        }
    },
    async other(name, c, ext) {
        return c
    }
}

async function handleFileContents(filePath, {js, html, css, svg, other}, contents) {
  const ext = path.extname(filePath).toLowerCase()
  const fileName = path.basename(filePath)
  let result = null
  try {
    switch (ext) {
        case '.html':
        console.log('Handling HTML file:', filePath);
        result = await html(fileName, contents)
        break;
        case '.css':
        console.log('Handling CSS file:', filePath);
        result = await css('./src/' + fileName + ext, contents)
        break;
        case '.js':
        console.log('Handling JavaScript file:', filePath);
        result = await js(fileName, contents)
        break;
        case '.svg':
        console.log('Handling SVG file:', filePath);
        result = await svg('./src/' + fileName + ext, contents)
        break;
        default:
        console.log('Handling other file:', filePath);
        result = await other(fileName, contents, ext)
        break;
    }
  } catch (e) {
    console.error('Error handling file:', filePath, e)
  }
  if (result != null) {
    writeFile('./dist/' + fileName, result)
  }
}

function readDirectory(directoryPath, handles) {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);

      fs.readFile(filePath, 'utf8', (err, contents) => {
        if (err) {
          console.error('Error reading file:', filePath, err);
          return;
        }

        handleFileContents(filePath, handles, contents);
      });
    });
  });
}

function writeFile(filePath, contents) {
    fs.writeFile(filePath, contents, 'utf8', err =>
        err ? console.error('Error writing file:', filePath, err) : console.log('Successfully wrote file:', filePath)
    )
}

readDirectory('./src', handles)


if (watchMode) {
    console.log('Watching for changes...')
    ;(function watchDirectory(directoryPath) {
        const watcher = chokidar.watch(directoryPath);
      
        watcher.on('add', (filePath) => {
          fs.readFile(filePath, 'utf8', (err, contents) => {
            if (err) {
              console.error('Error reading file:', filePath, err);
              return;
            }
      
            handleFileContents(filePath, handles, contents);
          });
        });
      
        watcher.on('change', (filePath) => {
          fs.readFile(filePath, 'utf8', (err, contents) => {
            if (err) {
              console.error('Error reading file:', filePath, err);
              return;
            }
      
            handleFileContents(filePath, handles, contents)
          })
        })
      }
    )('./src')

    const app = express()
    const port = 1234
    app.use(compression({level: 9})).use(express.static(path.join(__dirname, 'dist')))
    
    app.listen(port, () => {
        console.log(`Server is up and running on port ${port}`)
    })
}

